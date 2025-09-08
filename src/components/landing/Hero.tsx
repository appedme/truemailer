import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Email Validation Made Simple</h1>
          <p className="hero-description">
            Verify email addresses in real-time with our fast, accurate, and reliable email validation service.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-large">
              Start Free Trial
              <ArrowRight className="icon-right" size={20} />
            </button>
            <button className="btn btn-outline btn-large">View Demo</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="placeholder-box">
            <span>Email Validation Dashboard</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;