import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechFlow",
      content: "TrueMailer's accuracy is incredible. We've reduced our fake signup rate by 95% and improved our email deliverability significantly."
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Growth",
      content: "The API is blazing fast and the documentation is excellent. Integration took less than an hour. Highly recommended!"
    },
    {
      name: "Emily Watson",
      role: "Product Manager",
      content: "The real-time updates and comprehensive domain coverage give us confidence in our user validation process."
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Trusted by Developers Worldwide</h2>
          <p className="section-description">
            See what our customers say about TrueMailer
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#ffc107" color="#ffc107" />
                ))}
              </div>
              <p className="testimonial-content">
                "{testimonial.content}"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>{testimonial.name.charAt(0)}</span>
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;