import { db } from './index';
import { sql } from 'drizzle-orm';

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Create users table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        display_name TEXT,
        profile_image_url TEXT,
        created_at INTEGER DEFAULT (unixepoch()),
        updated_at INTEGER DEFAULT (unixepoch()),
        plan TEXT DEFAULT 'free',
        email_validations_used INTEGER DEFAULT 0,
        email_validations_limit INTEGER DEFAULT 1000,
        is_active INTEGER DEFAULT 1
      )
    `);

    // Create api_keys table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS api_keys (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        key_hash TEXT NOT NULL,
        key_prefix TEXT NOT NULL,
        permissions TEXT NOT NULL DEFAULT 'read,validate',
        is_active INTEGER DEFAULT 1,
        last_used_at INTEGER,
        created_at INTEGER DEFAULT (unixepoch()),
        expires_at INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create email_validations table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS email_validations (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        api_key_id TEXT,
        email TEXT NOT NULL,
        domain TEXT NOT NULL,
        is_valid INTEGER NOT NULL,
        is_disposable INTEGER NOT NULL,
        is_temporal INTEGER NOT NULL,
        confidence REAL NOT NULL,
        syntax_valid INTEGER NOT NULL,
        domain_valid INTEGER NOT NULL,
        mx_record_exists INTEGER NOT NULL,
        response_time INTEGER,
        ip_address TEXT,
        user_agent TEXT,
        created_at INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (api_key_id) REFERENCES api_keys(id) ON DELETE SET NULL
      )
    `);

    // Create disposable_providers table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS disposable_providers (
        id TEXT PRIMARY KEY,
        domain TEXT NOT NULL UNIQUE,
        is_active INTEGER DEFAULT 1,
        risk_level TEXT NOT NULL DEFAULT 'high',
        detected_at INTEGER DEFAULT (unixepoch()),
        last_seen_at INTEGER DEFAULT (unixepoch()),
        source TEXT
      )
    `);

    // Create usage_stats table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS usage_stats (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        date TEXT NOT NULL,
        validations_count INTEGER DEFAULT 0,
        valid_emails_count INTEGER DEFAULT 0,
        disposable_emails_count INTEGER DEFAULT 0,
        invalid_emails_count INTEGER DEFAULT 0,
        avg_response_time REAL,
        created_at INTEGER DEFAULT (unixepoch()),
        updated_at INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create webhooks table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS webhooks (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        url TEXT NOT NULL,
        events TEXT NOT NULL,
        secret TEXT NOT NULL,
        is_active INTEGER DEFAULT 1,
        last_triggered_at INTEGER,
        failure_count INTEGER DEFAULT 0,
        created_at INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create webhook_deliveries table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS webhook_deliveries (
        id TEXT PRIMARY KEY,
        webhook_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        payload TEXT NOT NULL,
        response_status INTEGER,
        response_body TEXT,
        delivered_at INTEGER,
        created_at INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (webhook_id) REFERENCES webhooks(id) ON DELETE CASCADE
      )
    `);

    // Create billing table
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS billing (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        stripe_customer_id TEXT,
        stripe_subscription_id TEXT,
        plan TEXT NOT NULL DEFAULT 'free',
        status TEXT NOT NULL DEFAULT 'active',
        current_period_start INTEGER,
        current_period_end INTEGER,
        cancel_at_period_end INTEGER DEFAULT 0,
        created_at INTEGER DEFAULT (unixepoch()),
        updated_at INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Insert some common disposable email providers
    await db.run(sql`
      INSERT OR IGNORE INTO disposable_providers (id, domain, risk_level, source) VALUES
      ('dp_1', '10minutemail.com', 'high', 'initial_seed'),
      ('dp_2', 'tempmail.org', 'high', 'initial_seed'),
      ('dp_3', 'guerrillamail.com', 'high', 'initial_seed'),
      ('dp_4', 'mailinator.com', 'high', 'initial_seed'),
      ('dp_5', 'temp-mail.org', 'high', 'initial_seed'),
      ('dp_6', 'throwaway.email', 'high', 'initial_seed'),
      ('dp_7', 'yopmail.com', 'high', 'initial_seed'),
      ('dp_8', 'maildrop.cc', 'high', 'initial_seed'),
      ('dp_9', 'sharklasers.com', 'high', 'initial_seed'),
      ('dp_10', 'guerrillamailblock.com', 'high', 'initial_seed')
    `);

    console.log('Database initialized successfully!');
    return true;

  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}