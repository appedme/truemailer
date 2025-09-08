// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (menuToggle && navList) {
 menuToggle.addEventListener('click', () => {
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
    
    // Add animation effect
    if (navList.style.display === 'flex') {
      navList.style.opacity = '0';
      setTimeout(() => {
        navList.style.transition = 'opacity 0.3s ease';
        navList.style.opacity = '1';
      }, 10);
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !navList.contains(event.target)) {
      navList.style.display = 'none';
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // Check if it's an internal anchor link
    const href = this.getAttribute('href');
    if (href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navList) {
          navList.style.display = 'none';
        }
      }
    }
  });
});

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
    
    // Add shadow when scrolled
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

// Pricing card hover effect enhancement
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Feature card animation
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
  // Add staggered animation delay
  card.style.transitionDelay = `${index * 0.1}s`;
  
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Testimonial card animation
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
 });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in animation to elements
  const fadeElements = document.querySelectorAll('.section-header, .feature-card, .step, .pricing-card, .testimonial-card');
  
  fadeElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Stagger the animations
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 200 + (index * 100));
  });
});