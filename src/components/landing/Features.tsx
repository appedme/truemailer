import React from 'react';
import { Zap, Check, Shield, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap size={48} />,
      title: "Lightning Fast",
      description: "Validate emails in real-time with sub-100ms response times."
    },
    {
      icon: <Check size={48} />,
      title: "Highly Accurate",
      description: "Advanced algorithms ensure 99.9% accuracy in validation."
    },
    {
      icon: <Shield size={48} />,
      title: "Secure & Compliant",
      description: "SOC 2 compliant with enterprise-grade security measures."
    },
    {
      icon: <Globe size={48} />,
      title: "Global Coverage",
      description: "Support for international domains and email formats."
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-description">
            Everything you need for accurate email validation
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;