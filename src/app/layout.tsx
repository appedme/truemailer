import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrueMailer - Enterprise Email Validation API | Detect Temporary & Disposable Emails",
  description: "Professional email validation API that detects temporary, disposable, and invalid email addresses. Protect your platform from fake signups with 99.9% accuracy. Free tier available.",
  keywords: ["email validation", "email verification", "temporary email detection", "disposable email", "email API", "fake email detection"],
  authors: [{ name: "TrueMailer" }],
  creator: "TrueMailer",
  publisher: "TrueMailer",
  robots: "index, follow",
  openGraph: {
    title: "TrueMailer - Enterprise Email Validation API",
    description: "Professional email validation API that detects temporary, disposable, and invalid email addresses. Protect your platform from fake signups.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueMailer - Enterprise Email Validation API",
    description: "Professional email validation API that detects temporary, disposable, and invalid email addresses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><StackProvider app={stackServerApp}><StackTheme>
        {children}
      </StackTheme></StackProvider></body>
    </html>
  );
}
