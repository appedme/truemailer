import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { syncAllDomainSources, syncDomainsFromSource, getDomainStats } from '@/lib/db/domain-sync';

// Admin-only endpoint for syncing domains
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // TODO: Add admin role check here
    // For now, any authenticated user can trigger sync (you should add proper admin checks)
    
    const body = await request.json().catch(() => ({}));
    const { source } = body;

    let results;
    
    if (source && ['mailchecker', 'disposable_blocklist', 'disposable_allowlist'].includes(source)) {
      // Sync specific source
      console.log(`Admin ${user.id} triggered sync for source: ${source}`);
      results = [await syncDomainsFromSource(source as any)];
    } else {
      // Sync all sources
      console.log(`Admin ${user.id} triggered full domain sync`);
      results = await syncAllDomainSources();
    }

    // Get updated stats
    const stats = await getDomainStats();

    return NextResponse.json({
      message: 'Domain sync completed successfully',
      results,
      stats,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Domain sync API error:', error);
    return NextResponse.json(
      { error: 'Domain sync failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get current domain statistics
    const stats = await getDomainStats();

    return NextResponse.json({
      stats,
      sources: {
        mailchecker: {
          name: 'FGRibreau/mailchecker',
          url: 'https://github.com/FGRibreau/mailchecker',
          description: 'Comprehensive list of disposable email domains',
          estimated_domains: '55,000+',
        },
        disposable_blocklist: {
          name: 'disposable-email-domains/blocklist',
          url: 'https://github.com/disposable-email-domains/disposable-email-domains',
          description: 'Curated blocklist of disposable email domains',
          estimated_domains: '4,500+',
        },
        disposable_allowlist: {
          name: 'disposable-email-domains/allowlist',
          url: 'https://github.com/disposable-email-domains/disposable-email-domains',
          description: 'Legitimate domains that might be falsely flagged',
          estimated_domains: '200+',
        },
      },
      last_updated: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Domain stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to get domain statistics' },
      { status: 500 }
    );
  }
}