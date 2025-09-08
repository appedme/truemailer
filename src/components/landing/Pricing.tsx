import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Free Forever",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1,000 validations/month",
        "Basic email validation",
        "Disposable domain detection",
        "Community support",
        "Standard response time"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Premium",
      price: "Coming Soon",
      period: "",
      description: "Advanced features for growing businesses",
      features: [
        "Unlimited validations",
        "Advanced validation features",
        "Priority support",
        "Custom allowlist/blocklist",
        "Detailed analytics",
        "API rate limiting: 1000/min",
        "Webhook notifications"
      ],
      buttonText: "Join Waitlist",
      buttonVariant: "solid" as const,
      popular: true,
    }
  ];

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-description">
            Enjoy our free service with generous limits. Premium plans with advanced features coming soon.
          </p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`} 
              key={index}
            >
              {plan.popular && (
                <div className="popular-badge">Coming Soon</div>
              )}
              <h3 className="pricing-title">{plan.name}</h3>
              <div className="pricing-price">
                <span className="price">{plan.price}</span>
                {plan.period && <span className="period">/{plan.period}</span>}
              </div>
              <p className="pricing-description">{plan.description}</p>
              <ul className="pricing-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <Check className="feature-icon" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`btn btn-${plan.buttonVariant} btn-block`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;