import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db/index';
import { userAllowlist } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const addAllowlistSchema = z.object({
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

    const allowlist = await db
      .select({
        id: userAllowlist.id,
        domain: userAllowlist.domain,
        reason: userAllowlist.reason,
        isActive: userAllowlist.isActive,
        createdAt: userAllowlist.createdAt,
      })
      .from(userAllowlist)
      .where(eq(userAllowlist.userId, user.id))
      .orderBy(desc(userAllowlist.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      allowlist,
      pagination: {
        limit,
        offset,
        hasMore: allowlist.length === limit,
      },
    });

  } catch (error) {
    console.error('Allowlist fetch error:', error);
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
    const validation = addAllowlistSchema.safeParse(body);
    
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

    // Check if domain already exists in user's allowlist
    const existing = await db
      .select()
      .from(userAllowlist)
      .where(and(
        eq(userAllowlist.userId, user.id),
        eq(userAllowlist.domain, domain)
      ))
      .limit(1);

    if (existing.length > 0) {
      if (existing[0].isActive) {
        return NextResponse.json(
          { error: 'Domain already in your allowlist' },
          { status: 409 }
        );
      } else {
        // Reactivate existing entry
        const updated = await db
          .update(userAllowlist)
          .set({ 
            isActive: true, 
            reason: reason || existing[0].reason,
            createdAt: new Date(),
          })
          .where(eq(userAllowlist.id, existing[0].id))
          .returning();

        return NextResponse.json({
          message: 'Domain reactivated in your allowlist',
          entry: updated[0],
        });
      }
    }

    // Add new domain to allowlist
    const newEntry = await db
      .insert(userAllowlist)
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
      message: 'Domain added to your allowlist',
      entry: newEntry[0],
    });

  } catch (error) {
    console.error('Allowlist add error:', error);
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
        eq(userAllowlist.userId, user.id),
        eq(userAllowlist.id, entryId)
      );
    } else {
      whereClause = and(
        eq(userAllowlist.userId, user.id),
        eq(userAllowlist.domain, domain!)
      );
    }

    const result = await db
      .update(userAllowlist)
      .set({ isActive: false })
      .where(whereClause)
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Domain not found in your allowlist' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Domain removed from your allowlist',
    });

  } catch (error) {
    console.error('Allowlist remove error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}