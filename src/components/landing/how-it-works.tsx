'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Send, 
  Search, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  Code2,
  Zap,
  Database
} from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Send,
    title: 'Send Email for Validation',
    description: 'Submit any email address to our API endpoint with a simple HTTP request.',
    code: `curl -X POST https://api.truemailer.com/v1/validate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com"}'`,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    step: '02',
    icon: Search,
    title: 'Real-time Analysis',
    description: 'Our AI-powered system analyzes the email against our comprehensive database of disposable and temporary email providers.',
    features: ['Syntax validation', 'Domain verification', 'MX record check', 'Disposable detection'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    step: '03',
    icon: Shield,
    title: 'Instant Results',
    description: 'Receive detailed validation results with confidence scores and actionable insights in under 100ms.',
    response: `{
  "email": "user@example.com",
  "valid": true,
  "disposable": false,
  "confidence": 0.98,
  "details": {
    "syntax": "valid",
    "domain": "valid",
    "mx_records": true
  }
}`,
    color: 'from-green-500 to-emerald-500',
  },
];

export function HowItWorksSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Validate Emails in{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process makes email validation effortless. 
            From API call to actionable results in under 100 milliseconds.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Step {step.step}
                    </Badge>
                    <h3 className="text-3xl font-bold">{step.title}</h3>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Features List */}
                {step.features && (
                  <div className="grid grid-cols-2 gap-3">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Arrow to Next Step */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-primary lg:hidden"
                  >
                    <span className="text-sm font-medium">Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                )}
              </div>

              {/* Code/Visual Side */}
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="p-6 bg-card/80 backdrop-blur-sm border-muted/50 shadow-xl">
                    {step.code && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Code2 className="w-5 h-5 text-primary" />
                          <span className="font-medium">API Request</span>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                            {step.code}
                          </pre>
                        </div>
                      </div>
                    )}

                    {step.response && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Database className="w-5 h-5 text-green-500" />
                          <span className="font-medium">API Response</span>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                            {step.response}
                          </pre>
                        </div>
                      </div>
                    )}

                    {step.features && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Search className="w-5 h-5 text-purple-500" />
                          <span className="font-medium">Analysis Process</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {step.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * featureIndex }}
                              viewport={{ once: true }}
                              className="p-3 bg-muted/30 rounded-lg text-center"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-2"></div>
                              <span className="text-xs font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </div>

              {/* Desktop Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                  className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-32"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Card className="max-w-xl mx-auto p-8 bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4">Try It Now</h3>
              <p className="text-muted-foreground mb-6">
                Experience the power of TrueMailer with our free tier. No credit card required.
              </p>
              <Button size="lg" className="group">
                Get API Key
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}