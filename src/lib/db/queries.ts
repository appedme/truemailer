import { db } from './index';
import { users, apiKeys, emailValidations, usageStats, billing } from './schema';
import { eq, and, desc, sql, gte, lte } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { createHash } from 'crypto';

// User operations
export async function createUser(userData: {
  id: string;
  email: string;
  displayName?: string;
  profileImageUrl?: string;
}) {
  return await db.insert(users).values({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
}

export async function getUserById(id: string) {
  return await db.select().from(users).where(eq(users.id, id)).limit(1);
}

export async function getUserByEmail(email: string) {
  return await db.select().from(users).where(eq(users.email, email)).limit(1);
}

export async function updateUser(id: string, updates: Partial<typeof users.$inferInsert>) {
  return await db.update(users)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
}

export async function syncUserFromStackAuth(stackUser: {
  id: string;
  primaryEmail: string;
  displayName?: string;
  profileImageUrl?: string;
}) {
  const existingUser = await getUserById(stackUser.id);
  
  if (existingUser.length === 0) {
    // Create new user
    return await createUser({
      id: stackUser.id,
      email: stackUser.primaryEmail,
      displayName: stackUser.displayName,
      profileImageUrl: stackUser.profileImageUrl,
    });
  } else {
    // Update existing user
    return await updateUser(stackUser.id, {
      email: stackUser.primaryEmail,
      displayName: stackUser.displayName,
      profileImageUrl: stackUser.profileImageUrl,
    });
  }
}

// API Key operations
export async function createApiKey(userId: string, name: string) {
  const rawKey = `tk_${nanoid(32)}`;
  const keyHash = createHash('sha256').update(rawKey).digest('hex');
  const keyPrefix = rawKey.substring(0, 8);
  
  const apiKey = await db.insert(apiKeys).values({
    id: nanoid(),
    userId,
    name,
    keyHash,
    keyPrefix,
    createdAt: new Date(),
  }).returning();

  return { apiKey: apiKey[0], rawKey };
}

export async function getApiKeysByUserId(userId: string) {
  return await db.select({
    id: apiKeys.id,
    name: apiKeys.name,
    keyPrefix: apiKeys.keyPrefix,
    permissions: apiKeys.permissions,
    isActive: apiKeys.isActive,
    lastUsedAt: apiKeys.lastUsedAt,
    createdAt: apiKeys.createdAt,
    expiresAt: apiKeys.expiresAt,
  }).from(apiKeys).where(eq(apiKeys.userId, userId)).orderBy(desc(apiKeys.createdAt));
}

export async function validateApiKey(rawKey: string) {
  const keyHash = createHash('sha256').update(rawKey).digest('hex');
  
  const result = await db.select({
    apiKey: apiKeys,
    user: users,
  })
  .from(apiKeys)
  .innerJoin(users, eq(apiKeys.userId, users.id))
  .where(and(
    eq(apiKeys.keyHash, keyHash),
    eq(apiKeys.isActive, true),
    eq(users.isActive, true)
  ))
  .limit(1);

  if (result.length === 0) return null;

  // Update last used timestamp
  await db.update(apiKeys)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiKeys.id, result[0].apiKey.id));

  return result[0];
}

export async function revokeApiKey(id: string, userId: string) {
  return await db.update(apiKeys)
    .set({ isActive: false })
    .where(and(eq(apiKeys.id, id), eq(apiKeys.userId, userId)))
    .returning();
}

// Email validation operations
export async function recordEmailValidation(data: {
  userId?: string;
  apiKeyId?: string;
  email: string;
  domain: string;
  isValid: boolean;
  isDisposable: boolean;
  isTemporal: boolean;
  confidence: number;
  syntaxValid: boolean;
  domainValid: boolean;
  mxRecordExists: boolean;
  responseTime?: number;
  ipAddress?: string;
  userAgent?: string;
}) {
  return await db.insert(emailValidations).values({
    id: nanoid(),
    ...data,
    createdAt: new Date(),
  }).returning();
}

export async function getEmailValidationHistory(userId: string, limit = 50, offset = 0) {
  return await db.select()
    .from(emailValidations)
    .where(eq(emailValidations.userId, userId))
    .orderBy(desc(emailValidations.createdAt))
    .limit(limit)
    .offset(offset);
}

// Usage statistics operations
export async function updateUsageStats(userId: string, date: string, updates: {
  validationsCount?: number;
  validEmailsCount?: number;
  disposableEmailsCount?: number;
  invalidEmailsCount?: number;
  avgResponseTime?: number;
}) {
  const existing = await db.select()
    .from(usageStats)
    .where(and(eq(usageStats.userId, userId), eq(usageStats.date, date)))
    .limit(1);

  if (existing.length === 0) {
    return await db.insert(usageStats).values({
      id: nanoid(),
      userId,
      date,
      ...updates,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
  } else {
    return await db.update(usageStats)
      .set({ ...updates, updatedAt: new Date() })
      .where(and(eq(usageStats.userId, userId), eq(usageStats.date, date)))
      .returning();
  }
}

export async function getUserUsageStats(userId: string, startDate: string, endDate: string) {
  return await db.select()
    .from(usageStats)
    .where(and(
      eq(usageStats.userId, userId),
      gte(usageStats.date, startDate),
      lte(usageStats.date, endDate)
    ))
    .orderBy(usageStats.date);
}

export async function getUserMonthlyUsage(userId: string) {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const result = await db.select({
    totalValidations: sql<number>`sum(${emailValidations.id})`.mapWith(Number),
  })
  .from(emailValidations)
  .where(and(
    eq(emailValidations.userId, userId),
    gte(emailValidations.createdAt, startOfMonth)
  ));

  return result[0]?.totalValidations || 0;
}

// Billing operations
export async function createOrUpdateBilling(userId: string, billingData: Partial<typeof billing.$inferInsert>) {
  const existing = await db.select()
    .from(billing)
    .where(eq(billing.userId, userId))
    .limit(1);

  if (existing.length === 0) {
    return await db.insert(billing).values({
      id: nanoid(),
      userId,
      ...billingData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
  } else {
    return await db.update(billing)
      .set({ ...billingData, updatedAt: new Date() })
      .where(eq(billing.userId, userId))
      .returning();
  }
}

export async function getUserBilling(userId: string) {
  return await db.select()
    .from(billing)
    .where(eq(billing.userId, userId))
    .limit(1);
}