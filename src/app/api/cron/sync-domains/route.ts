import { NextRequest, NextResponse } from 'next/server';
import { syncAllDomainSources, getDomainStats } from '@/lib/db/domain-sync';

// Cron job endpoint for automated domain synchronization
// This can be called by external cron services like Vercel Cron, GitHub Actions, etc.
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from a trusted source (optional)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🔄 Starting automated domain sync...');
    const startTime = Date.now();

    // Get stats before sync
    const beforeStats = await getDomainStats();
    
    // Perform the sync
    const results = await syncAllDomainSources();
    
    // Get stats after sync
    const afterStats = await getDomainStats();
    
    const duration = Date.now() - startTime;
    
    const summary = {
      duration_ms: duration,
      duration_seconds: Math.round(duration / 1000),
      before_stats: beforeStats,
      after_stats: afterStats,
      changes: {
        total_domains_added: afterStats.total - beforeStats.total,
        active_domains_added: afterStats.active - beforeStats.active,
      },
      results,
      timestamp: new Date().toISOString(),
    };

    console.log('✅ Automated domain sync completed:', summary);

    return NextResponse.json({
      success: true,
      message: 'Domain synchronization completed successfully',
      ...summary,
    });

  } catch (error) {
    console.error('❌ Automated domain sync failed:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Domain sync failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check sync status
export async function GET() {
  try {
    const stats = await getDomainStats();
    
    return NextResponse.json({
      message: 'Domain sync endpoint is ready',
      current_stats: stats,
      endpoints: {
        trigger_sync: 'POST /api/cron/sync-domains',
        admin_sync: 'POST /api/admin/sync-domains',
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get domain statistics' },
      { status: 500 }
    );
  }
}