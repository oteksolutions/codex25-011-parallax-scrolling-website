// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(preloader);

  // Add progress bar for scrolling
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container';
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  progressContainer.appendChild(progressBar);
  document.body.insertBefore(progressContainer, document.body.firstChild);

  // Variables
  const header = document.getElementById('main-header');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const menuItems = document.querySelectorAll('.nav-item');
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  const animatedElements = document.querySelectorAll('.fade-in');
  
  // Hide preloader when page is loaded
  window.addEventListener('load', function() {
    setTimeout(() => {
      preloader.classList.add('loaded');
      // Animation for initial elements
      animateOnScroll();
    }, 500);
  });

  // Handle mobile menu toggle
  mobileMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a menu item is clicked
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Handle scroll events
  window.addEventListener('scroll', function() {
    // Update header style on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Update progress bar
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollableHeight) * 100;
    progressBar.style.width = scrolled + '%';
    
    // Parallax effect on scroll
    parallaxEffect();
    
    // Animate elements on scroll
    animateOnScroll();
  });

  // Create parallax effect
  function parallaxEffect() {
    parallaxElements.forEach(element => {
      let scrollPosition = window.scrollY;
      let parentSection = element.parentElement;
      let sectionOffset = parentSection.offsetTop;
      let sectionHeight = parentSection.offsetHeight;
      
      // Check if section is in viewport
      if (scrollPosition + window.innerHeight > sectionOffset && 
          scrollPosition < sectionOffset + sectionHeight) {
        
        // Calculate parallax amount based on scroll position
        let yOffset = (scrollPosition - sectionOffset) * 0.5;
        element.style.transform = `translateY(${yOffset}px) scale(1.1)`;
      }
    });
  }

  // Animate elements when they come into view
  function animateOnScroll() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 50) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate an API call
      setTimeout(() => {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.style.padding = '15px';
        successMessage.style.marginTop = '20px';
        successMessage.style.backgroundColor = 'rgba(78, 158, 255, 0.1)';
        successMessage.style.color = '#4e9eff';
        successMessage.style.borderRadius = '5px';
        successMessage.style.textAlign = 'center';
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        
        // Insert success message after the form
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        // Reset form
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.style.opacity = '0';
          successMessage.style.transition = 'opacity 0.5s ease';
          setTimeout(() => {
            successMessage.remove();
          }, 500);
        }, 5000);
      }, 1500);
    });
  }

  // Add floating animation to some elements
  document.querySelectorAll('.service-icon').forEach(icon => {
    icon.classList.add('floating');
  });

  // Initialize parallax effect
  parallaxEffect();
});