'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  Lock, 
  Cpu, 
  Database, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Shield,
    title: 'Advanced Threat Detection',
    description: 'Identify temporary, disposable, and malicious email addresses with 99.9% accuracy using our proprietary ML algorithms.',
    benefits: ['Blocks fake signups', 'Reduces fraud', 'Improves data quality'],
    color: 'from-red-500 to-orange-500',
    delay: 0.1,
  },
  {
    icon: Zap,
    title: 'Lightning Fast API',
    description: 'Sub-100ms response times with global CDN coverage. Built for high-performance applications that demand speed.',
    benefits: ['< 100ms response', 'Global CDN', '99.99% uptime'],
    color: 'from-yellow-500 to-orange-500',
    delay: 0.2,
  },
  {
    icon: Database,
    title: 'Real-time Database',
    description: 'Our database is updated in real-time with the latest disposable email providers and threat intelligence.',
    benefits: ['Live updates', 'Threat intelligence', 'Always current'],
    color: 'from-blue-500 to-cyan-500',
    delay: 0.3,
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Comprehensive insights into your email validation patterns, success rates, and threat detection metrics.',
    benefits: ['Usage analytics', 'Threat reports', 'Performance metrics'],
    color: 'from-purple-500 to-pink-500',
    delay: 0.4,
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption. Your data security is our top priority.',
    benefits: ['SOC 2 certified', 'End-to-end encryption', 'GDPR compliant'],
    color: 'from-green-500 to-emerald-500',
    delay: 0.5,
  },
  {
    icon: Cpu,
    title: 'Smart Integration',
    description: 'Easy integration with popular platforms and frameworks. Get started in minutes, not hours.',
    benefits: ['RESTful API', 'SDKs available', 'Webhook support'],
    color: 'from-indigo-500 to-purple-500',
    delay: 0.6,
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Validate Emails
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive email validation platform provides enterprise-grade features 
            designed to protect your business and improve your email deliverability.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              className="group"
            >
              <Card className="h-full border-muted/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <CardHeader className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={benefitIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: feature.delay + benefitIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Hover Arrow */}
                  <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                    <span className="text-sm font-medium mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of developers who trust TrueMailer for their email validation needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-muted-foreground/20 rounded-lg font-medium hover:bg-muted/50 transition-colors"
                >
                  View Documentation
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}