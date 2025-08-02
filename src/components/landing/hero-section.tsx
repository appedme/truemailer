'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Globe, CheckCircle, Play, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const animatedWords = ['Powerful', 'Reliable', 'Secure', 'Fast', 'Professional'];

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Trust Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            Trusted by 10,000+ developers worldwide
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Email Validation That's{' '}
            <span className="relative">
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
              >
                {animatedWords[currentWordIndex]}
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          Protect your platform from fake signups and improve email deliverability with our{' '}
          <span className="text-foreground font-semibold">enterprise-grade email validation API</span>.
          Detect temporary, disposable, and invalid email addresses in real-time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="group px-8 py-6 text-lg font-semibold">
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          {/* <Button variant="outline" size="lg" className="group px-8 py-6 text-lg">
            <Play className="mr-2 w-5 h-5" />
            Schedule Demo
          </Button> */}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: CheckCircle, label: '99.9% Accuracy Rate', color: 'text-green-500' },
            { icon: Zap, label: 'Sub-100ms Response', color: 'text-yellow-500' },
            { icon: Shield, label: 'SOC 2 Compliant', color: 'text-blue-500' },
            { icon: Globe, label: 'Global CDN Coverage', color: 'text-purple-500' },
          ].map((stat, index) => (
            <motion.div key={index} variants={statsVariants}>
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-muted/50 bg-card/50 backdrop-blur-sm">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <p className="font-semibold text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Demo */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Card className="max-w-2xl mx-auto p-8 bg-card/80 backdrop-blur-sm border-muted/50 shadow-2xl">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-sm text-muted-foreground">API Demo</span>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400">POST /api/v1/validate</div>
                <div className="text-muted-foreground mt-2">
                  {`{
  "email": "user@tempmail.com",
  "result": {
    "valid": false,
    "disposable": true,
    "confidence": 0.98
  }
}`}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}