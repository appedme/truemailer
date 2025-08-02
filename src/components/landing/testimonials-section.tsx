'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechFlow',
    avatar: '/api/placeholder/40/40',
    rating: 5,
    quote: 'TrueMailer reduced our fake signups by 95%. The API is lightning fast and incredibly reliable. Best investment we made this year.',
    metrics: '95% reduction in fake signups',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Lead Developer',
    company: 'StartupLab',
    avatar: '/api/placeholder/40/40',
    rating: 5,
    quote: 'Integration took less than 30 minutes. The documentation is excellent and the support team is incredibly responsive.',
    metrics: '30-minute integration',
  },
  {
    name: 'Emily Watson',
    role: 'Product Manager',
    company: 'GrowthCorp',
    avatar: '/api/placeholder/40/40',
    rating: 5,
    quote: 'Our email deliverability improved by 40% after implementing TrueMailer. The ROI was immediate and substantial.',
    metrics: '40% better deliverability',
  },
  {
    name: 'David Kim',
    role: 'Engineering Manager',
    company: 'ScaleUp',
    avatar: '/api/placeholder/40/40',
    rating: 5,
    quote: 'The real-time validation is a game-changer. We catch disposable emails instantly and our data quality has never been better.',
    metrics: '99.9% accuracy rate',
  },
  {
    name: 'Lisa Thompson',
    role: 'DevOps Lead',
    company: 'CloudNative',
    avatar: '/api/placeholder/40/40',
    rating: 5,
    quote: 'Sub-100ms response times even during peak traffic. The global CDN ensures consistent performance worldwide.',
    metrics: '<100ms response time',
  },
  {
    name: 'Alex Johnson',
    role: 'Security Engineer',
    company: 'SecureApp',
    avatar: '/api/placeholder/40/40',
    rating: 5,
    quote: 'SOC 2 compliance and enterprise-grade security gave us confidence to use TrueMailer for our most sensitive applications.',
    metrics: 'SOC 2 compliant',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            Customer Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              10,000+ Developers
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how companies worldwide are using TrueMailer to improve their email validation 
            and protect their platforms from fake signups.
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-muted/50 shadow-2xl relative overflow-hidden">
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/20" />
              
              <CardContent className="p-0">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 text-foreground">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Metric Badge */}
                <Badge variant="outline" className="mb-8 px-4 py-2 text-sm">
                  {testimonials[currentIndex].metrics}
                </Badge>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={testimonials[currentIndex].avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-lg">{testimonials[currentIndex].name}</div>
                    <div className="text-muted-foreground">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Testimonial Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => goToTestimonial(index)}
            >
              <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-muted/50 hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                <CardContent className="p-0">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { metric: '10,000+', label: 'Happy Customers' },
              { metric: '99.9%', label: 'Accuracy Rate' },
              { metric: '100M+', label: 'Emails Validated' },
              { metric: '24/7', label: 'Support Available' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.metric}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}