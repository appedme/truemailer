import { sqliteTable, text, integer, real, blob } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users table - synced with StackAuth
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // StackAuth user ID
  email: text('email').notNull().unique(),
  displayName: text('display_name'),
  profileImageUrl: text('profile_image_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  // TrueMailer specific fields
  plan: text('plan').default('free'), // free, starter, pro, enterprise
  emailValidationsUsed: integer('email_validations_used').default(0),
  emailValidationsLimit: integer('email_validations_limit').default(200), // monthly limit (free tier)
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

// API Keys table
export const apiKeys = sqliteTable('api_keys', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  keyHash: text('key_hash').notNull(), // hashed API key
  keyPrefix: text('key_prefix').notNull(), // first 8 chars for display
  permissions: text('permissions').notNull().default('read,validate'), // comma-separated permissions
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  lastUsedAt: integer('last_used_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  expiresAt: integer('expires_at', { mode: 'timestamp' }), // optional expiration
});

// Email Validations table
export const emailValidations = sqliteTable('email_validations', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  apiKeyId: text('api_key_id').references(() => apiKeys.id, { onDelete: 'set null' }),
  email: text('email').notNull(),
  domain: text('domain').notNull(),
  isValid: integer('is_valid', { mode: 'boolean' }).notNull(),
  isDisposable: integer('is_disposable', { mode: 'boolean' }).notNull(),
  isTemporal: integer('is_temporal', { mode: 'boolean' }).notNull(),
  confidence: real('confidence').notNull(), // 0.0 to 1.0
  syntaxValid: integer('syntax_valid', { mode: 'boolean' }).notNull(),
  domainValid: integer('domain_valid', { mode: 'boolean' }).notNull(),
  mxRecordExists: integer('mx_record_exists', { mode: 'boolean' }).notNull(),
  responseTime: integer('response_time'), // in milliseconds
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Global Disposable Email Providers table (from GitHub sources)
export const disposableProviders = sqliteTable('disposable_providers', {
  id: text('id').primaryKey(),
  domain: text('domain').notNull().unique(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  riskLevel: text('risk_level').notNull().default('high'), // low, medium, high, critical
  detectedAt: integer('detected_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  lastSeenAt: integer('last_seen_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  source: text('source'), // how we discovered this provider
});

// Global Allowlist table (domains that should never be blocked)
export const globalAllowlist = sqliteTable('global_allowlist', {
  id: text('id').primaryKey(),
  domain: text('domain').notNull().unique(),
  reason: text('reason'), // why this domain is allowed
  addedBy: text('added_by'), // admin who added it
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// User Custom Blocklist table
export const userBlocklist = sqliteTable('user_blocklist', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  domain: text('domain').notNull(),
  reason: text('reason'), // why user blocked this domain
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// User Custom Allowlist table (highest priority)
export const userAllowlist = sqliteTable('user_allowlist', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  domain: text('domain').notNull(),
  reason: text('reason'), // why user allowed this domain
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// User Usage Statistics table
export const usageStats = sqliteTable('usage_stats', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: text('date').notNull(), // YYYY-MM-DD format
  validationsCount: integer('validations_count').default(0),
  validEmailsCount: integer('valid_emails_count').default(0),
  disposableEmailsCount: integer('disposable_emails_count').default(0),
  invalidEmailsCount: integer('invalid_emails_count').default(0),
  avgResponseTime: real('avg_response_time'), // in milliseconds
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Webhooks table
export const webhooks = sqliteTable('webhooks', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  events: text('events').notNull(), // comma-separated event types
  secret: text('secret').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  lastTriggeredAt: integer('last_triggered_at', { mode: 'timestamp' }),
  failureCount: integer('failure_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Webhook Deliveries table
export const webhookDeliveries = sqliteTable('webhook_deliveries', {
  id: text('id').primaryKey(),
  webhookId: text('webhook_id').notNull().references(() => webhooks.id, { onDelete: 'cascade' }),
  eventType: text('event_type').notNull(),
  payload: text('payload').notNull(), // JSON string
  responseStatus: integer('response_status'),
  responseBody: text('response_body'),
  deliveredAt: integer('delivered_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Billing table
export const billing = sqliteTable('billing', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  plan: text('plan').notNull().default('free'),
  status: text('status').notNull().default('active'), // active, canceled, past_due, etc.
  currentPeriodStart: integer('current_period_start', { mode: 'timestamp' }),
  currentPeriodEnd: integer('current_period_end', { mode: 'timestamp' }),
  cancelAtPeriodEnd: integer('cancel_at_period_end', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;
export type EmailValidation = typeof emailValidations.$inferSelect;
export type NewEmailValidation = typeof emailValidations.$inferInsert;
export type DisposableProvider = typeof disposableProviders.$inferSelect;
export type NewDisposableProvider = typeof disposableProviders.$inferInsert;
export type GlobalAllowlist = typeof globalAllowlist.$inferSelect;
export type NewGlobalAllowlist = typeof globalAllowlist.$inferInsert;
export type UserBlocklist = typeof userBlocklist.$inferSelect;
export type NewUserBlocklist = typeof userBlocklist.$inferInsert;
export type UserAllowlist = typeof userAllowlist.$inferSelect;
export type NewUserAllowlist = typeof userAllowlist.$inferInsert;
export type UsageStats = typeof usageStats.$inferSelect;
export type NewUsageStats = typeof usageStats.$inferInsert;
export type Webhook = typeof webhooks.$inferSelect;
export type NewWebhook = typeof webhooks.$inferInsert;
export type WebhookDelivery = typeof webhookDeliveries.$inferSelect;
export type NewWebhookDelivery = typeof webhookDeliveries.$inferInsert;
export type Billing = typeof billing.$inferSelect;
export type NewBilling = typeof billing.$inferInsert;