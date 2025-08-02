import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, recordEmailValidation, getUserMonthlyUsage } from '@/lib/db/queries';
import { validateEmail } from '@/lib/email-validation';
import { z } from 'zod';

const validateEmailSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export async function POST(request: NextRequest) {
  try {
    // Get API key from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid API key' },
        { status: 401 }
      );
    }

    const apiKey = authHeader.substring(7);
    
    // Validate API key
    const keyValidation = await validateApiKey(apiKey);
    if (!keyValidation) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    const { user, apiKey: validatedKey } = keyValidation;

    // Check usage limits
    const monthlyUsage = await getUserMonthlyUsage(user.id);
    if (monthlyUsage >= user.emailValidationsLimit) {
      return NextResponse.json(
        { 
          error: 'Monthly validation limit exceeded',
          limit: user.emailValidationsLimit,
          used: monthlyUsage 
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const validation = validateEmailSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Validate the email using our comprehensive system
    const result = await validateEmail(email, user.id);

    // Record the validation
    await recordEmailValidation({
      userId: user.id,
      apiKeyId: validatedKey.id,
      email: result.email,
      domain: result.domain,
      isValid: result.valid,
      isDisposable: result.disposable,
      isTemporal: result.disposable, // Use disposable for temporal
      confidence: result.confidence,
      syntaxValid: result.details.syntax === 'valid',
      domainValid: result.details.domain === 'valid',
      mxRecordExists: result.details.mx_records,
      responseTime: result.response_time_ms,
      ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Email validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'TrueMailer Email Validation API',
    version: '1.0.0',
    documentation: 'https://docs.truemailer.com',
    endpoints: {
      validate: 'POST /api/v1/validate',
    }
  });
}