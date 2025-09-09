import { Hono } from "hono";
import { loadDisposableDomains, isDisposableEmail } from "./utils/disposable";
import { isValidEmailSyntax, domainExists, hasMXRecord } from "./utils/validate";
import { calculateSpamScore, getVerdict } from "./utils/spam";

type Bindings = {
  // Add any bindings you might need here
};

const app = new Hono<{ Bindings: Bindings }>();

// Load disposable domains when the worker starts
loadDisposableDomains().catch(error => {
  console.error("Failed to load disposable domains:", error);
});

// Email validation endpoint
app.get("/validate", async (c) => {
  const email = c.req.query("email");
  
  if (!email) {
    return c.json({ error: "Email parameter is required" }, 400);
  }

  // Syntax validation
  const valid_syntax = isValidEmailSyntax(email);
  if (!valid_syntax) {
    return c.json({
      email,
      valid_syntax: false,
      domain_exists: false,
      is_disposable: false,
      spam_score: 100,
      verdict: "likely_spam"
    });
  }

  // Extract domain
  const domain = email.split("@")[1];
  
  // Domain and MX record checks
  const domain_exists = await domainExists(domain);
  const has_mx = await hasMXRecord(domain);
  
  // Disposable email check
  const is_disposable = isDisposableEmail(email);
  
  // Spam score calculation
  const spam_score = calculateSpamScore(email);
  
  // Verdict based on spam score
  const verdict = getVerdict(spam_score);
  
  return c.json({
    email,
    valid_syntax: true,
    domain_exists: domain_exists && has_mx,
    is_disposable,
    spam_score,
    verdict
  });
});

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

export default app;