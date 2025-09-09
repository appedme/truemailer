// Fetch and process disposable email domains
let disposableDomains: Set<string> | null = null;

export async function loadDisposableDomains(): Promise<Set<string>> {
  if (disposableDomains) {
    return disposableDomains;
  }

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/refs/heads/main/disposable_email_blocklist.conf"
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch disposable email domains: ${response.status}`);
    }
    
    const text = await response.text();
    const domains = text.split('\n').filter(line => line.trim() !== '');
    disposableDomains = new Set(domains);
    return disposableDomains;
  } catch (error) {
    console.error("Error loading disposable email domains:", error);
    // Return empty set as fallback
    disposableDomains = new Set();
    return disposableDomains;
  }
}

export function isDisposableEmail(email: string): boolean {
  if (!disposableDomains) {
    // If domains haven't been loaded yet, consider it not disposable
    // In a production environment, you might want to handle this differently
    return false;
  }
  
  const domain = email.split('@')[1];
  if (!domain) return false;
  
  return disposableDomains.has(domain.toLowerCase());
}