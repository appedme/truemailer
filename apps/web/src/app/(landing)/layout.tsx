import type { Metadata } from 'next'
import React from 'react'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
    title: 'Truemailer - Fast Email Validation API | Real-time Email Verification',
    description: 'Validate emails in real-time with our fast, edge-deployed API. Detect disposable emails, check domain validity, and prevent spam with RFC-compliant validation.',
}

export default function LandingLayout({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <div>
        <Navigation />
        {children}
    </div>
  )
}
