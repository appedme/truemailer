import React from 'react';
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import EmailValidator from '@/components/EmailValidator';
import Features from '@/components/Features';
import APIDocumentation from '@/components/APIDocumentation';
import StructuredData from '@/components/StructuredData';

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
};

export default function LandingPage() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Interactive Email Validator */}
      <section id="try-now" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <EmailValidator />
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* API Documentation */}
      <section id="documentation">
        <APIDocumentation />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">📧 Truemailer</h3>
              <p className="text-gray-300 mb-4">
                Fast, reliable email validation API built with modern technologies 
                and deployed on the edge for maximum performance.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/appedme/truemailer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://sh20raj.github.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Author
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#try-now" className="hover:text-white transition-colors">Try Now</a></li>
                <li><a href="#documentation" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://github.com/appedme/truemailer" className="hover:text-white transition-colors">Source Code</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Tech Stack</h4>
              <ul className="space-y-2 text-gray-300">
                <li>🔥 Hono Framework</li>
                <li>⚡ Cloudflare Workers</li>
                <li>🚀 Bun Runtime</li>
                <li>📊 DNS Lookups</li>
              </ul>
            </div>
          </div>
          
          <hr className="my-8 border-gray-700" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Truemailer. Built with ❤️ by <a href="https://sh20raj.github.io" className="hover:text-white transition-colors">Shaswat Raj</a></p>
            <p className="mt-2 text-sm">Licensed under MIT License</p>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
