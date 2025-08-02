import { db } from './index';
import { disposableProviders } from './schema';
import { eq, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

// External domain list sources
const DOMAIN_SOURCES = {
  mailchecker: {
    url: 'https://raw.githubusercontent.com/FGRibreau/mailchecker/master/list.txt',
    name: 'FGRibreau/mailchecker',
    riskLevel: 'high' as const,
  },
  disposable_blocklist: {
    url: 'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/main/disposable_email_blocklist.conf',
    name: 'disposable-email-domains/blocklist',
    riskLevel: 'high' as const,
  },
  disposable_allowlist: {
    url: 'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/main/allowlist.conf',
    name: 'disposable-email-domains/allowlist',
    riskLevel: 'low' as const, // These are legitimate domains that might be falsely flagged
  },
};

interface SyncResult {
  source: string;
  totalDomains: number;
  newDomains: number;
  updatedDomains: number;
  errors: string[];
}

export async function fetchDomainList(url: string): Promise<string[]> {
  try {
    console.log(`Fetching domains from: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const text = await response.text();
    
    // Split by lines, trim whitespace, filter empty lines and comments
    const domains = text
      .split('\n')
      .map(line => line.trim().toLowerCase())
      .filter(line => line && !line.startsWith('#') && !line.startsWith('//'))
      .filter(line => {
        // Basic domain validation
        const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
        return domainRegex.test(line);
      });
    
    console.log(`Fetched ${domains.length} valid domains from ${url}`);
    return domains;
    
  } catch (error) {
    console.error(`Error fetching domains from ${url}:`, error);
    throw error;
  }
}

export async function syncDomainsFromSource(
  sourceKey: keyof typeof DOMAIN_SOURCES
): Promise<SyncResult> {
  const source = DOMAIN_SOURCES[sourceKey];
  const result: SyncResult = {
    source: source.name,
    totalDomains: 0,
    newDomains: 0,
    updatedDomains: 0,
    errors: [],
  };

  try {
    // Fetch domains from the source
    const domains = await fetchDomainList(source.url);
    result.totalDomains = domains.length;

    if (domains.length === 0) {
      result.errors.push('No valid domains found in source');
      return result;
    }

    // Process domains in batches to avoid overwhelming the database
    const batchSize = 100;
    const batches = [];
    
    for (let i = 0; i < domains.length; i += batchSize) {
      batches.push(domains.slice(i, i + batchSize));
    }

    console.log(`Processing ${batches.length} batches of domains...`);

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      
      try {
        await processDomainBatch(batch, source, result);
        
        // Log progress every 10 batches
        if ((batchIndex + 1) % 10 === 0) {
          console.log(`Processed ${batchIndex + 1}/${batches.length} batches`);
        }
      } catch (error) {
        result.errors.push(`Batch ${batchIndex + 1} failed: ${error}`);
        console.error(`Error processing batch ${batchIndex + 1}:`, error);
      }
    }

    console.log(`Sync completed for ${source.name}:`, {
      total: result.totalDomains,
      new: result.newDomains,
      updated: result.updatedDomains,
      errors: result.errors.length,
    });

  } catch (error) {
    result.errors.push(`Source sync failed: ${error}`);
    console.error(`Error syncing from ${source.name}:`, error);
  }

  return result;
}

async function processDomainBatch(
  domains: string[],
  source: typeof DOMAIN_SOURCES[keyof typeof DOMAIN_SOURCES],
  result: SyncResult
): Promise<void> {
  for (const domain of domains) {
    try {
      // Check if domain already exists
      const existing = await db
        .select()
        .from(disposableProviders)
        .where(eq(disposableProviders.domain, domain))
        .limit(1);

      const now = new Date();

      if (existing.length === 0) {
        // Insert new domain
        await db.insert(disposableProviders).values({
          id: nanoid(),
          domain,
          isActive: true,
          riskLevel: source.riskLevel,
          detectedAt: now,
          lastSeenAt: now,
          source: source.name,
        });
        result.newDomains++;
      } else {
        // Update existing domain
        await db
          .update(disposableProviders)
          .set({
            lastSeenAt: now,
            isActive: true,
            // Only update risk level if current is lower priority
            riskLevel: source.riskLevel === 'high' ? 'high' : existing[0].riskLevel,
            source: `${existing[0].source || ''}, ${source.name}`.replace(/^, /, ''),
          })
          .where(eq(disposableProviders.domain, domain));
        result.updatedDomains++;
      }
    } catch (error) {
      result.errors.push(`Failed to process domain ${domain}: ${error}`);
    }
  }
}

export async function syncAllDomainSources(): Promise<SyncResult[]> {
  console.log('Starting full domain sync from all sources...');
  const startTime = Date.now();
  
  const results: SyncResult[] = [];
  
  for (const sourceKey of Object.keys(DOMAIN_SOURCES) as Array<keyof typeof DOMAIN_SOURCES>) {
    try {
      console.log(`\n--- Syncing from ${DOMAIN_SOURCES[sourceKey].name} ---`);
      const result = await syncDomainsFromSource(sourceKey);
      results.push(result);
    } catch (error) {
      console.error(`Failed to sync from ${sourceKey}:`, error);
      results.push({
        source: DOMAIN_SOURCES[sourceKey].name,
        totalDomains: 0,
        newDomains: 0,
        updatedDomains: 0,
        errors: [`Source sync failed: ${error}`],
      });
    }
  }

  // Mark domains as inactive if they haven't been seen in the last sync
  try {
    const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    await db
      .update(disposableProviders)
      .set({ isActive: false })
      .where(sql`${disposableProviders.lastSeenAt} < ${cutoffDate.getTime()}`);
  } catch (error) {
    console.error('Error marking old domains as inactive:', error);
  }

  const totalTime = Date.now() - startTime;
  const summary = results.reduce(
    (acc, result) => ({
      totalDomains: acc.totalDomains + result.totalDomains,
      newDomains: acc.newDomains + result.newDomains,
      updatedDomains: acc.updatedDomains + result.updatedDomains,
      totalErrors: acc.totalErrors + result.errors.length,
    }),
    { totalDomains: 0, newDomains: 0, updatedDomains: 0, totalErrors: 0 }
  );

  console.log('\n=== SYNC SUMMARY ===');
  console.log(`Total time: ${(totalTime / 1000).toFixed(2)}s`);
  console.log(`Total domains processed: ${summary.totalDomains}`);
  console.log(`New domains added: ${summary.newDomains}`);
  console.log(`Existing domains updated: ${summary.updatedDomains}`);
  console.log(`Total errors: ${summary.totalErrors}`);
  console.log('====================\n');

  return results;
}

export async function getDomainStats() {
  try {
    const stats = await db
      .select({
        total: sql<number>`count(*)`,
        active: sql<number>`sum(case when ${disposableProviders.isActive} = 1 then 1 else 0 end)`,
        high_risk: sql<number>`sum(case when ${disposableProviders.riskLevel} = 'high' then 1 else 0 end)`,
        medium_risk: sql<number>`sum(case when ${disposableProviders.riskLevel} = 'medium' then 1 else 0 end)`,
        low_risk: sql<number>`sum(case when ${disposableProviders.riskLevel} = 'low' then 1 else 0 end)`,
      })
      .from(disposableProviders);

    return stats[0];
  } catch (error) {
    console.error('Error getting domain stats:', error);
    throw error;
  }
}

export async function isDisposableDomain(domain: string): Promise<{
  isDisposable: boolean;
  riskLevel?: string;
  source?: string;
}> {
  try {
    const result = await db
      .select({
        riskLevel: disposableProviders.riskLevel,
        source: disposableProviders.source,
      })
      .from(disposableProviders)
      .where(
        sql`${disposableProviders.domain} = ${domain.toLowerCase()} AND ${disposableProviders.isActive} = 1`
      )
      .limit(1);

    if (result.length > 0) {
      return {
        isDisposable: true,
        riskLevel: result[0].riskLevel,
        source: result[0].source || undefined,
      };
    }

    return { isDisposable: false };
  } catch (error) {
    console.error('Error checking disposable domain:', error);
    // Fallback to false if there's an error
    return { isDisposable: false };
  }
}