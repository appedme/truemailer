"use client";

import { Shield, CheckCircle, Mail, Zap, BarChart3, Settings } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Temp Email Detection",
    description: "Identify and block temporary email addresses from popular disposable email providers with 99.9% accuracy."
  },
  {
    icon: CheckCircle,
    title: "Syntax Validation",
    description: "Verify email format and syntax according to RFC standards with real-time validation."
  },
  {
    icon: Mail,
    title: "Mailbox Verification",
    description: "Check if the email address actually exists and can receive emails through SMTP verification."
  },
  {
    icon: Zap,
    title: "Lightning Fast API",
    description: "Sub-100ms response times with global CDN and optimized infrastructure across 6 continents."
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track usage, monitor validation results, and manage your API keys with detailed insights."
  },
  {
    icon: Settings,
    title: "Easy Integration",
    description: "Simple REST API with SDKs for popular programming languages and comprehensive documentation."
  }
];

export function Features() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Enterprise-Grade Email Validation
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need to ensure email quality and protect your platform from fake signups
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}