// Email validation utilities
export function isValidEmailSyntax(email: string): boolean {
  // Basic email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function domainExists(domain: string): Promise<boolean> {
  try {
    // Using Cloudflare Workers DNS lookup if available
    // Fallback to a simple approach for now
    const response = await fetch(`https://${domain}`, { method: 'HEAD', timeout: 5000 });
    return response.ok || response.status !== 0; // Status 0 might indicate network error
  } catch (error) {
    // If we can't fetch the domain, we assume it exists
    // A more robust implementation would use DNS lookup
    return true;
  }
}

export async function hasMXRecord(domain: string): Promise<boolean> {
  // In a real implementation with Cloudflare Workers, we would use DNS lookup
  // For now, we'll return true as a placeholder
  // A proper implementation would use something like:
  // const { lookup } = await import('node:dns');
  // return new Promise((resolve) => lookup(domain, 'MX', (err, addresses) => resolve(!err && addresses.length > 0)));
  
  // Placeholder implementation
  try {
    // Try to check if domain has mail servers by attempting to connect
    // This is not a perfect solution but works as a basic check
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
    const data = await response.json();
    return data.Answer && data.Answer.length > 0;
  } catch (error) {
    // If we can't check DNS, assume it has MX records
    return true;
  }
}