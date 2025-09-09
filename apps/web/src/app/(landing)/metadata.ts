import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Truemailer - Fast Email Validation API | Real-time Email Verification',
  description: 'Validate emails in real-time with our fast, edge-deployed API. Detect disposable emails, check domain validity, and prevent spam with RFC-compliant validation.',
  keywords: [
    'email validation',
    'email verification',
    'email API',
    'disposable email detection',
    'spam detection',
    'email checker',
    'bulk email validation',
    'RFC compliant',
    'cloudflare workers',
    'hono framework'
  ],
  authors: [{ name: 'Shaswat Raj', url: 'https://sh20raj.github.io' }],
  creator: 'Shaswat Raj',
  publisher: 'Truemailer',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://truemailer.io',
    title: 'Truemailer - Fast Email Validation API',
    description: 'Validate emails in real-time with our fast, edge-deployed API. Detect disposable emails and prevent spam.',
    siteName: 'Truemailer',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Truemailer - Email Validation API',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Truemailer - Fast Email Validation API',
    description: 'Validate emails in real-time with our fast, edge-deployed API.',
    creator: '@sh20raj',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: 'https://truemailer.io',
  },
}
