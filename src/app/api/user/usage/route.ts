import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getUserUsageStats, getUserMonthlyUsage, getEmailValidationHistory } from '@/lib/db/queries';

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
    const period = searchParams.get('period') || 'month';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get current month usage
    const monthlyUsage = await getUserMonthlyUsage(user.id);

    // Get usage stats for the requested period
    let startDate: string;
    let endDate: string;
    const now = new Date();
    
    switch (period) {
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 7);
        startDate = weekStart.toISOString().split('T')[0];
        endDate = now.toISOString().split('T')[0];
        break;
      case 'month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        startDate = monthStart.toISOString().split('T')[0];
        endDate = now.toISOString().split('T')[0];
        break;
      case 'year':
        const yearStart = new Date(now.getFullYear(), 0, 1);
        startDate = yearStart.toISOString().split('T')[0];
        endDate = now.toISOString().split('T')[0];
        break;
      default:
        // Default to current month
        const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1);
        startDate = defaultStart.toISOString().split('T')[0];
        endDate = now.toISOString().split('T')[0];
    }

    const usageStats = await getUserUsageStats(user.id, startDate, endDate);
    const validationHistory = await getEmailValidationHistory(user.id, limit, offset);

    // Calculate summary statistics
    const totalValidations = usageStats.reduce((sum, stat) => sum + (stat.validationsCount || 0), 0);
    const totalValid = usageStats.reduce((sum, stat) => sum + (stat.validEmailsCount || 0), 0);
    const totalDisposable = usageStats.reduce((sum, stat) => sum + (stat.disposableEmailsCount || 0), 0);
    const totalInvalid = usageStats.reduce((sum, stat) => sum + (stat.invalidEmailsCount || 0), 0);
    
    const avgResponseTime = usageStats.length > 0 
      ? usageStats.reduce((sum, stat) => sum + (stat.avgResponseTime || 0), 0) / usageStats.length
      : 0;

    return NextResponse.json({
      summary: {
        period,
        totalValidations,
        monthlyUsage,
        validEmails: totalValid,
        disposableEmails: totalDisposable,
        invalidEmails: totalInvalid,
        avgResponseTime: Math.round(avgResponseTime),
        accuracyRate: totalValidations > 0 ? ((totalValid + totalDisposable) / totalValidations * 100).toFixed(2) : 0,
      },
      dailyStats: usageStats.map(stat => ({
        date: stat.date,
        validations: stat.validationsCount || 0,
        valid: stat.validEmailsCount || 0,
        disposable: stat.disposableEmailsCount || 0,
        invalid: stat.invalidEmailsCount || 0,
        avgResponseTime: stat.avgResponseTime || 0,
      })),
      recentValidations: validationHistory.map(validation => ({
        id: validation.id,
        email: validation.email,
        domain: validation.domain,
        isValid: validation.isValid,
        isDisposable: validation.isDisposable,
        confidence: validation.confidence,
        responseTime: validation.responseTime,
        createdAt: validation.createdAt,
      })),
      pagination: {
        limit,
        offset,
        hasMore: validationHistory.length === limit,
      },
    });

  } catch (error) {
    console.error('Usage stats fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}