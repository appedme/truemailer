import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create an account in seconds with no credit card required."
    },
    {
      number: "2",
      title: "Integrate",
      description: "Add our API to your application with just a few lines of code."
    },
    {
      number: "3",
      title: "Validate",
      description: "Start validating emails in real-time with instant results."
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-description">
            Simple integration, powerful results
          </p>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;