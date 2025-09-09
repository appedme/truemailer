import type { Metadata } from 'next'
import React from 'react'


export const metadata : Metadata = {
    title: 'Truemailer - Email Check & Validation',
    description: 'Truemailer is a powerful email verification and validation tool designed to ensure the accuracy and deliverability of your email lists. With Truemailer, you can easily identify and eliminate invalid, inactive, or risky email addresses, helping you maintain a clean and effective email marketing strategy.',
}



export default function layout({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <div>
        {
            children
        }
    </div>
  )
}
