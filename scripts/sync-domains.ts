#!/usr/bin/env bun

import { syncAllDomainSources, getDomainStats } from '../src/lib/db/domain-sync';

async function main() {
  console.log('🚀 Starting disposable email domain synchronization...\n');
  
  try {
    // Show current stats before sync
    console.log('📊 Current database stats:');
    const beforeStats = await getDomainStats();
    console.log(`- Total domains: ${beforeStats.total}`);
    console.log(`- Active domains: ${beforeStats.active}`);
    console.log(`- High risk: ${beforeStats.high_risk}`);
    console.log(`- Medium risk: ${beforeStats.medium_risk}`);
    console.log(`- Low risk: ${beforeStats.low_risk}\n`);

    // Perform the sync
    const results = await syncAllDomainSources();
    
    // Show results
    console.log('📋 Sync Results by Source:');
    results.forEach(result => {
      console.log(`\n${result.source}:`);
      console.log(`  ✅ Total domains: ${result.totalDomains}`);
      console.log(`  🆕 New domains: ${result.newDomains}`);
      console.log(`  🔄 Updated domains: ${result.updatedDomains}`);
      if (result.errors.length > 0) {
        console.log(`  ❌ Errors: ${result.errors.length}`);
        result.errors.slice(0, 5).forEach(error => {
          console.log(`     - ${error}`);
        });
        if (result.errors.length > 5) {
          console.log(`     ... and ${result.errors.length - 5} more errors`);
        }
      }
    });

    // Show final stats
    console.log('\n📊 Final database stats:');
    const afterStats = await getDomainStats();
    console.log(`- Total domains: ${afterStats.total} (+${afterStats.total - beforeStats.total})`);
    console.log(`- Active domains: ${afterStats.active} (+${afterStats.active - beforeStats.active})`);
    console.log(`- High risk: ${afterStats.high_risk} (+${afterStats.high_risk - beforeStats.high_risk})`);
    console.log(`- Medium risk: ${afterStats.medium_risk} (+${afterStats.medium_risk - beforeStats.medium_risk})`);
    console.log(`- Low risk: ${afterStats.low_risk} (+${afterStats.low_risk - beforeStats.low_risk})`);

    console.log('\n✅ Domain synchronization completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Domain synchronization failed:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⚠️  Sync interrupted by user');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Sync terminated');
  process.exit(1);
});

main();