"use client";

import { useState, useCallback } from 'react';

export interface ValidationResult {
  email: string;
  valid_syntax: boolean;
  domain_exists: boolean;
  is_disposable: boolean;
  spam_score: number;
  verdict: 'good' | 'suspicious' | 'spam';
}

export interface UseEmailValidationReturn {
  result: ValidationResult | null;
  loading: boolean;
  error: string;
  validateEmail: (email: string) => Promise<void>;
  clearResult: () => void;
}

export function useEmailValidation(): UseEmailValidationReturn {
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = useCallback(async (email: string) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://api.truemailer.io/validate?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error('Validation failed');
      }

      const data = await response.json() as ValidationResult;
      setResult(data);
    } catch (err) {
      setError('Failed to validate email. Showing demo response.');
      // Mock response for demo purposes
      const mockResult: ValidationResult = {
        email,
        valid_syntax: email.includes('@') && email.includes('.'),
        domain_exists: !email.includes('invalid') && !email.includes('fake'),
        is_disposable: email.includes('10minute') || email.includes('temp') || email.includes('yopmail'),
        spam_score: Math.floor(Math.random() * 100),
        verdict: email.includes('spam') ? 'spam' : 
                email.includes('suspicious') ? 'suspicious' : 'good'
      };
      setResult(mockResult);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError('');
  }, []);

  return {
    result,
    loading,
    error,
    validateEmail,
    clearResult
  };
}
