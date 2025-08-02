CREATE TABLE `api_keys` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`key_hash` text NOT NULL,
	`key_prefix` text NOT NULL,
	`permissions` text DEFAULT 'read,validate' NOT NULL,
	`is_active` integer DEFAULT true,
	`last_used_at` integer,
	`created_at` integer DEFAULT (unixepoch()),
	`expires_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `billing` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`stripe_customer_id` text,
	`stripe_subscription_id` text,
	`plan` text DEFAULT 'free' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`current_period_start` integer,
	`current_period_end` integer,
	`cancel_at_period_end` integer DEFAULT false,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `disposable_providers` (
	`id` text PRIMARY KEY NOT NULL,
	`domain` text NOT NULL,
	`is_active` integer DEFAULT true,
	`risk_level` text DEFAULT 'high' NOT NULL,
	`detected_at` integer DEFAULT (unixepoch()),
	`last_seen_at` integer DEFAULT (unixepoch()),
	`source` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `disposable_providers_domain_unique` ON `disposable_providers` (`domain`);--> statement-breakpoint
CREATE TABLE `email_validations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`api_key_id` text,
	`email` text NOT NULL,
	`domain` text NOT NULL,
	`is_valid` integer NOT NULL,
	`is_disposable` integer NOT NULL,
	`is_temporal` integer NOT NULL,
	`confidence` real NOT NULL,
	`syntax_valid` integer NOT NULL,
	`domain_valid` integer NOT NULL,
	`mx_record_exists` integer NOT NULL,
	`response_time` integer,
	`ip_address` text,
	`user_agent` text,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`api_key_id`) REFERENCES `api_keys`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `usage_stats` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`validations_count` integer DEFAULT 0,
	`valid_emails_count` integer DEFAULT 0,
	`disposable_emails_count` integer DEFAULT 0,
	`invalid_emails_count` integer DEFAULT 0,
	`avg_response_time` real,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text,
	`profile_image_url` text,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch()),
	`plan` text DEFAULT 'free',
	`email_validations_used` integer DEFAULT 0,
	`email_validations_limit` integer DEFAULT 1000,
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `webhook_deliveries` (
	`id` text PRIMARY KEY NOT NULL,
	`webhook_id` text NOT NULL,
	`event_type` text NOT NULL,
	`payload` text NOT NULL,
	`response_status` integer,
	`response_body` text,
	`delivered_at` integer,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`webhook_id`) REFERENCES `webhooks`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `webhooks` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`url` text NOT NULL,
	`events` text NOT NULL,
	`secret` text NOT NULL,
	`is_active` integer DEFAULT true,
	`last_triggered_at` integer,
	`failure_count` integer DEFAULT 0,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
