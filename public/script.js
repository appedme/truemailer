// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('nav-open');
    
    // Change icon
    const icon = menuToggle.querySelector('svg');
    if (navList.classList.contains('nav-open')) {
      // Change to close icon (X)
      icon.innerHTML = `
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      `;
    } else {
      // Change to menu icon (hamburger)
      icon.innerHTML = `
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      `;
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !navList.contains(event.target) && navList.classList.contains('nav-open')) {
      navList.classList.remove('nav-open');
      
      // Change icon back to menu
      const icon = menuToggle.querySelector('svg');
      icon.innerHTML = `
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      `;
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
        if (navList && navList.classList.contains('nav-open')) {
          navList.classList.remove('nav-open');
          
          // Change icon back to menu
          const icon = menuToggle.querySelector('svg');
          icon.innerHTML = `
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          `;
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

// Enhanced hover effects for cards
const cards = document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Pricing card special effect for popular plan
const popularCard = document.querySelector('.pricing-card-popular');
if (popularCard) {
  popularCard.addEventListener('mouseenter', () => {
    popularCard.style.transform = 'scale(1.05)';
  });
  
  popularCard.addEventListener('mouseleave', () => {
    popularCard.style.transform = 'scale(1)';
  });
}

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
  
  // Animate hero content
  const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-buttons');
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 300 + (index * 200));
  });
  
  // Animate hero image
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateY(20px)';
    heroImage.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
      heroImage.style.opacity = '1';
      heroImage.style.transform = 'translateY(0)';
    }, 900);
  }
});

// Form validation and submission
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // In a real application, you would send the data to your server here
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });
}