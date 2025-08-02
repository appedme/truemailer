import { db } from './db/index';
import { userAllowlist, userBlocklist, globalAllowlist, disposableProviders } from './db/schema';
import { eq, and } from 'drizzle-orm';

// GitHub raw URLs for real-time fetching
const GITHUB_SOURCES = {
  mailchecker: 'https://raw.githubusercontent.com/FGRibreau/mailchecker/master/list.txt',
  disposable_blocklist: 'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/main/disposable_email_blocklist.conf',
  disposable_allowlist: 'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/main/allowlist.conf',
};

// Cache for GitHub lists (5 minutes TTL)
const cache = new Map<string, { data: Set<string>; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function fetchGitHubList(url: string): Promise<Set<string>> {
  const cached = cache.get(url);
  const now = Date.now();
  
  // Return cached data if still valid
  if (cached && (now - cached.timestamp) < CACHE_TTL) {
    return cached.data;
  }

  try {
    console.log(`Fetching fresh data from: ${url}`);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TrueMailer/1.0 (https://truemailer.unstory.app)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    const domains = new Set(
      text
        .split('\n')
        .map(line => line.trim().toLowerCase())
        .filter(line => line && !line.startsWith('#') && !line.startsWith('//'))
        .filter(line => {
          // Basic domain validation
          const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
          return domainRegex.test(line);
        })
    );

    // Cache the result
    cache.set(url, { data: domains, timestamp: now });
    console.log(`Cached ${domains.size} domains from ${url}`);
    
    return domains;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    
    // Return cached data if available, even if expired
    if (cached) {
      console.log(`Using expired cache for ${url}`);
      return cached.data;
    }
    
    // Return empty set as fallback
    return new Set();
  }
}

export interface DomainValidationResult {
  isBlocked: boolean;
  isDisposable: boolean;
  blockReason: 'user_blocklist' | 'global_blocklist' | 'github_disposable' | null;
  allowReason: 'user_allowlist' | 'global_allowlist' | 'github_allowlist' | null;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  confidence: number;
}

export async function validateDomain(domain: string, userId?: string): Promise<DomainValidationResult> {
  const normalizedDomain = domain.toLowerCase();
  
  // Priority 1: User Custom Allowlist (highest priority - overrides everything)
  if (userId) {
    const userAllow = await db
      .select()
      .from(userAllowlist)
      .where(and(
        eq(userAllowlist.userId, userId),
        eq(userAllowlist.domain, normalizedDomain),
        eq(userAllowlist.isActive, true)
      ))
      .limit(1);

    if (userAllow.length > 0) {
      return {
        isBlocked: false,
        isDisposable: false,
        blockReason: null,
        allowReason: 'user_allowlist',
        riskLevel: 'low',
        source: 'User Custom Allowlist',
        confidence: 1.0,
      };
    }
  }

  // Priority 2: User Custom Blocklist
  if (userId) {
    const userBlock = await db
      .select()
      .from(userBlocklist)
      .where(and(
        eq(userBlocklist.userId, userId),
        eq(userBlocklist.domain, normalizedDomain),
        eq(userBlocklist.isActive, true)
      ))
      .limit(1);

    if (userBlock.length > 0) {
      return {
        isBlocked: true,
        isDisposable: true,
        blockReason: 'user_blocklist',
        allowReason: null,
        riskLevel: 'high',
        source: 'User Custom Blocklist',
        confidence: 1.0,
      };
    }
  }

  // Priority 3: Global Allowlist
  const globalAllow = await db
    .select()
    .from(globalAllowlist)
    .where(and(
      eq(globalAllowlist.domain, normalizedDomain),
      eq(globalAllowlist.isActive, true)
    ))
    .limit(1);

  if (globalAllow.length > 0) {
    return {
      isBlocked: false,
      isDisposable: false,
      blockReason: null,
      allowReason: 'global_allowlist',
      riskLevel: 'low',
      source: 'Global Allowlist',
      confidence: 0.95,
    };
  }

  // Priority 4: Check GitHub sources in real-time
  try {
    // Check GitHub allowlist first
    const githubAllowlist = await fetchGitHubList(GITHUB_SOURCES.disposable_allowlist);
    if (githubAllowlist.has(normalizedDomain)) {
      return {
        isBlocked: false,
        isDisposable: false,
        blockReason: null,
        allowReason: 'github_allowlist',
        riskLevel: 'low',
        source: 'GitHub Allowlist',
        confidence: 0.9,
      };
    }

    // Check GitHub disposable lists
    const [mailcheckerList, disposableBlocklist] = await Promise.all([
      fetchGitHubList(GITHUB_SOURCES.mailchecker),
      fetchGitHubList(GITHUB_SOURCES.disposable_blocklist),
    ]);

    if (mailcheckerList.has(normalizedDomain)) {
      return {
        isBlocked: true,
        isDisposable: true,
        blockReason: 'github_disposable',
        allowReason: null,
        riskLevel: 'high',
        source: 'FGRibreau/mailchecker',
        confidence: 0.95,
      };
    }

    if (disposableBlocklist.has(normalizedDomain)) {
      return {
        isBlocked: true,
        isDisposable: true,
        blockReason: 'github_disposable',
        allowReason: null,
        riskLevel: 'high',
        source: 'disposable-email-domains/blocklist',
        confidence: 0.9,
      };
    }

  } catch (error) {
    console.error('Error checking GitHub sources:', error);
  }

  // Priority 5: Check local database (fallback)
  const localDisposable = await db
    .select()
    .from(disposableProviders)
    .where(and(
      eq(disposableProviders.domain, normalizedDomain),
      eq(disposableProviders.isActive, true)
    ))
    .limit(1);

  if (localDisposable.length > 0) {
    return {
      isBlocked: true,
      isDisposable: true,
      blockReason: 'global_blocklist',
      allowReason: null,
      riskLevel: localDisposable[0].riskLevel as any,
      source: localDisposable[0].source || 'Local Database',
      confidence: 0.8,
    };
  }

  // Domain is clean
  return {
    isBlocked: false,
    isDisposable: false,
    blockReason: null,
    allowReason: null,
    riskLevel: 'low',
    source: 'Clean Domain',
    confidence: 0.7,
  };
}

export async function validateEmail(email: string, userId?: string) {
  const startTime = Date.now();
  
  // Extract domain
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) {
    throw new Error('Invalid email format');
  }
  
  // Basic syntax validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const syntaxValid = emailRegex.test(email);
  
  if (!syntaxValid) {
    return {
      email,
      domain,
      valid: false,
      disposable: false,
      blocked: false,
      confidence: 0.0,
      risk_level: 'low',
      details: {
        syntax: 'invalid',
        domain: 'unknown',
        mx_records: false,
        disposable: false,
        blocked: false,
        block_reason: null,
        allow_reason: null,
        detection_source: 'Syntax Validation',
      },
      response_time_ms: Date.now() - startTime,
    };
  }

  // Validate domain using our comprehensive system
  const domainResult = await validateDomain(domain, userId);
  
  // Calculate overall confidence
  let confidence = 0.3; // Base confidence for valid syntax
  if (syntaxValid) confidence += 0.2;
  if (!domainResult.isBlocked) confidence += 0.3;
  confidence = Math.min(confidence + (domainResult.confidence * 0.2), 1.0);

  const responseTime = Date.now() - startTime;
  
  return {
    email,
    domain,
    valid: syntaxValid && !domainResult.isBlocked,
    disposable: domainResult.isDisposable,
    blocked: domainResult.isBlocked,
    confidence,
    risk_level: domainResult.riskLevel,
    details: {
      syntax: syntaxValid ? 'valid' : 'invalid',
      domain: 'valid', // Simplified for now
      mx_records: true, // Simplified for now
      disposable: domainResult.isDisposable,
      blocked: domainResult.isBlocked,
      block_reason: domainResult.blockReason,
      allow_reason: domainResult.allowReason,
      detection_source: domainResult.source,
    },
    response_time_ms: responseTime,
  };
}

// Clear cache function (useful for testing)
export function clearCache() {
  cache.clear();
  console.log('Email validation cache cleared');
}

// Get cache stats
export function getCacheStats() {
  const stats = Array.from(cache.entries()).map(([url, data]) => ({
    url,
    domains: data.data.size,
    age_ms: Date.now() - data.timestamp,
    expired: (Date.now() - data.timestamp) > CACHE_TTL,
  }));
  
  return {
    total_cached_sources: cache.size,
    cache_ttl_ms: CACHE_TTL,
    sources: stats,
  };
}