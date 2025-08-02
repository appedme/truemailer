import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db/index';
import { userBlocklist } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const addBlocklistSchema = z.object({
  domain: z.string().min(1, 'Domain is required').toLowerCase(),
  reason: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const blocklist = await db
      .select({
        id: userBlocklist.id,
        domain: userBlocklist.domain,
        reason: userBlocklist.reason,
        isActive: userBlocklist.isActive,
        createdAt: userBlocklist.createdAt,
      })
      .from(userBlocklist)
      .where(eq(userBlocklist.userId, user.id))
      .orderBy(desc(userBlocklist.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      blocklist,
      pagination: {
        limit,
        offset,
        hasMore: blocklist.length === limit,
      },
    });

  } catch (error) {
    console.error('Blocklist fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = addBlocklistSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { domain, reason } = validation.data;

    // Validate domain format
    const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
    if (!domainRegex.test(domain)) {
      return NextResponse.json(
        { error: 'Invalid domain format' },
        { status: 400 }
      );
    }

    // Check if domain already exists in user's blocklist
    const existing = await db
      .select()
      .from(userBlocklist)
      .where(and(
        eq(userBlocklist.userId, user.id),
        eq(userBlocklist.domain, domain)
      ))
      .limit(1);

    if (existing.length > 0) {
      if (existing[0].isActive) {
        return NextResponse.json(
          { error: 'Domain already in your blocklist' },
          { status: 409 }
        );
      } else {
        // Reactivate existing entry
        const updated = await db
          .update(userBlocklist)
          .set({ 
            isActive: true, 
            reason: reason || existing[0].reason,
            createdAt: new Date(),
          })
          .where(eq(userBlocklist.id, existing[0].id))
          .returning();

        return NextResponse.json({
          message: 'Domain reactivated in your blocklist',
          entry: updated[0],
        });
      }
    }

    // Add new domain to blocklist
    const newEntry = await db
      .insert(userBlocklist)
      .values({
        id: nanoid(),
        userId: user.id,
        domain,
        reason,
        isActive: true,
        createdAt: new Date(),
      })
      .returning();

    return NextResponse.json({
      message: 'Domain added to your blocklist',
      entry: newEntry[0],
    });

  } catch (error) {
    console.error('Blocklist add error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get('id');
    const domain = searchParams.get('domain');

    if (!entryId && !domain) {
      return NextResponse.json(
        { error: 'Entry ID or domain is required' },
        { status: 400 }
      );
    }

    let whereClause;
    if (entryId) {
      whereClause = and(
        eq(userBlocklist.userId, user.id),
        eq(userBlocklist.id, entryId)
      );
    } else {
      whereClause = and(
        eq(userBlocklist.userId, user.id),
        eq(userBlocklist.domain, domain!)
      );
    }

    const result = await db
      .update(userBlocklist)
      .set({ isActive: false })
      .where(whereClause)
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Domain not found in your blocklist' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Domain removed from your blocklist',
    });

  } catch (error) {
    console.error('Blocklist remove error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}