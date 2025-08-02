import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, recordEmailValidation, getUserMonthlyUsage } from '@/lib/db/queries';
import { nanoid } from 'nanoid';

// Email validation logic
function validateEmailSyntax(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function extractDomain(email: string): string {
  return email.split('@')[1]?.toLowerCase() || '';
}

// Mock disposable email detection (in production, use a comprehensive database)
const disposableDomains = new Set([
  '10minutemail.com',
  'tempmail.org',
  'guerrillamail.com',
  'mailinator.com',
  'temp-mail.org',
  'throwaway.email',
  'yopmail.com',
  'maildrop.cc',
  'sharklasers.com',
  'guerrillamailblock.com',
]);

function isDisposableEmail(domain: string): boolean {
  return disposableDomains.has(domain);
}

// Mock MX record check (in production, use DNS lookup)
async function checkMXRecord(domain: string): Promise<boolean> {
  // Simulate MX record check
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'apple.com'];
  return commonDomains.includes(domain) || Math.random() > 0.1;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
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
    const authResult = await validateApiKey(apiKey);
    if (!authResult) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    const { user, apiKey: apiKeyData } = authResult;

    // Check usage limits
    const monthlyUsage = await getUserMonthlyUsage(user.id);
    if (monthlyUsage >= user.emailValidationsLimit) {
      return NextResponse.json(
        { error: 'Monthly validation limit exceeded' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Perform validation
    const domain = extractDomain(email);
    const syntaxValid = validateEmailSyntax(email);
    const isDisposable = isDisposableEmail(domain);
    const mxRecordExists = await checkMXRecord(domain);
    
    const isValid = syntaxValid && mxRecordExists && !isDisposable;
    const confidence = calculateConfidence(syntaxValid, mxRecordExists, isDisposable);
    
    const responseTime = Date.now() - startTime;

    // Record validation in database
    await recordEmailValidation({
      userId: user.id,
      apiKeyId: apiKeyData.id,
      email: email.toLowerCase(),
      domain,
      isValid,
      isDisposable,
      isTemporal: isDisposable, // For now, treating disposable as temporal
      confidence,
      syntaxValid,
      domainValid: mxRecordExists,
      mxRecordExists,
      responseTime,
      ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    // Return validation result
    return NextResponse.json({
      email: email.toLowerCase(),
      valid: isValid,
      disposable: isDisposable,
      temporal: isDisposable,
      confidence,
      details: {
        syntax: syntaxValid ? 'valid' : 'invalid',
        domain: mxRecordExists ? 'valid' : 'invalid',
        mx_records: mxRecordExists,
        disposable: isDisposable,
      },
      response_time_ms: responseTime,
    });

  } catch (error) {
    console.error('Email validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateConfidence(syntaxValid: boolean, mxRecordExists: boolean, isDisposable: boolean): number {
  let confidence = 0;
  
  if (syntaxValid) confidence += 0.3;
  if (mxRecordExists) confidence += 0.4;
  if (!isDisposable) confidence += 0.3;
  
  return Math.round(confidence * 100) / 100;
}