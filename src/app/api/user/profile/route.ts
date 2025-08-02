import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getUserById, updateUser } from '@/lib/db/queries';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user data from our database
    const dbUser = await getUserById(user.id);
    
    if (dbUser.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = dbUser[0];

    return NextResponse.json({
      id: userData.id,
      email: userData.email,
      displayName: userData.displayName,
      profileImageUrl: userData.profileImageUrl,
      plan: userData.plan,
      emailValidationsUsed: userData.emailValidationsUsed,
      emailValidationsLimit: userData.emailValidationsLimit,
      isActive: userData.isActive,
      createdAt: userData.createdAt,
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { displayName } = body;

    // Update user in our database
    const updatedUser = await updateUser(user.id, {
      displayName,
    });

    if (updatedUser.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser[0],
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}