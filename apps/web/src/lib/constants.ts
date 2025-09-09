// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.truemailer.io',
  ENDPOINTS: {
    VALIDATE: '/validate',
  },
  TIMEOUT: 10000, // 10 seconds
} as const;

// Site Information
export const SITE_CONFIG = {
  name: 'Truemailer',
  description: 'Fast, reliable email validation API built with Hono and deployed on Cloudflare Workers',
  url: 'https://truemailer.io',
  ogImage: '/og-image.png',
  twitterImage: '/twitter-image.png',
  author: {
    name: 'Shaswat Raj',
    url: 'https://sh20raj.github.io',
    twitter: '@sh20raj',
  },
  repository: 'https://github.com/appedme/truemailer',
} as const;

// Feature List
export const FEATURES = [
  {
    title: 'RFC-Compliant Validation',
    description: 'Thorough syntax validation ensuring emails meet international standards and best practices.',
    icon: '✅',
  },
  {
    title: 'Domain & MX Verification',
    description: 'Real-time domain existence and mail server checks to ensure deliverability.',
    icon: '🌐',
  },
  {
    title: 'Disposable Email Detection',
    description: 'Blocks temporary email services like 10minutemail, YOPmail, and 500+ others.',
    icon: '🛡️',
  },
  {
    title: 'Smart Spam Scoring',
    description: 'AI-powered heuristic analysis for detecting suspicious and spam email patterns.',
    icon: '⚡',
  },
  {
    title: 'Edge-Deployed & Fast',
    description: 'Powered by Cloudflare Workers for ultra-low latency worldwide performance.',
    icon: '☁️',
  },
  {
    title: 'Developer-Friendly API',
    description: 'Simple REST API with comprehensive documentation and no authentication required.',
    icon: '🔧',
  },
] as const;

// Navigation Items
export const NAVIGATION = {
  items: [
    { key: 'home', label: 'Home', href: '#home' },
    { key: 'try', label: 'Try Now', href: '#try-now' },
    { key: 'features', label: 'Features', href: '#features' },
    { key: 'docs', label: 'API Docs', href: '#documentation' },
  ],
  external: [
    { key: 'github', label: 'GitHub', href: 'https://github.com/appedme/truemailer' },
    { key: 'author', label: 'Author', href: 'https://sh20raj.github.io' },
  ],
} as const;

// Email Validation Scoring
export const VALIDATION_SCORING = {
  good: { min: 0, max: 20, color: 'green', label: '✅ Good' },
  suspicious: { min: 21, max: 60, color: 'orange', label: '⚠️ Suspicious' },
  spam: { min: 61, max: 100, color: 'red', label: '🚫 Likely Spam' },
} as const;

// Tech Stack
export const TECH_STACK = [
  '🔥 Hono Framework',
  '⚡ Cloudflare Workers',
  '🚀 Bun Runtime',
  '📊 DNS Lookups',
] as const;
