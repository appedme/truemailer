// Spam scoring heuristics
export function calculateSpamScore(email: string): number {
  let score = 0;
 const [localPart, domain] = email.split('@');
  
  if (!localPart || !domain) {
    return 100; // Invalid email format
  }
  
  // Check for suspicious patterns in local part
  if (localPart.length > 30) {
    score += 20; // Very long local part
  }
  
  if (localPart.includes('+')) {
    score += 10; // Often used for disposable emails
  }
  
  if (localPart.match(/\d{5,}/)) {
    score += 15; // Long sequences of numbers
  }
  
  if (localPart.match(/\.+/)) {
    score += 5; // Multiple dots
  }
  
  // Check for suspicious patterns in domain
  if (domain.match(/^([a-z0-9\-]{10,})\.([a-z]{2,})$/)) {
    score += 15; // Random-looking domain
  }
  
  if (domain.includes('temp') || domain.includes('disposable') || domain.includes('trash')) {
    score += 30; // Obvious disposable email keywords
  }
  
  // Check for common spam TLDs (simplified)
  const spamTLDs = ['.tk', '.ml', '.ga', '.cf'];
  const tld = '.' + domain.split('.').pop();
  if (spamTLDs.includes(tld)) {
    score += 25;
  }
  
  // Cap the score at 100
  return Math.min(score, 100);
}

export function getVerdict(spamScore: number): string {
  if (spamScore <= 20) {
    return 'good';
  } else if (spamScore <= 60) {
    return 'suspicious';
  } else {
    return 'likely_spam';
  }
}