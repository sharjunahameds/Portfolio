/* 
=========================================
  MODERN GLASSMORPHISM PORTFOLIO SCRIPT
  Handles Preloader, Sticky Navigation,
  Intersection Observers (Reveals, Skills, Counters),
  Project Filters, Form Validation, and Scroll-to-Top.
=========================================
*/

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. PRELOADER HIDER
     ========================================= */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });

    // Fallback if window load doesn't trigger quickly
    setTimeout(() => {
      if (preloader.style.display !== 'none') {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }
    }, 2500);
  }


  /* =========================================
     2. MOBILE MENU TOGGLE
     ========================================= */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when navigation links are clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }


  /* =========================================
     3. STICKY HEADER
     ========================================= */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  /* =========================================
     4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ========================================= */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep layout persistent
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* =========================================
     5. STATS COUNTER ANIMATION
     ========================================= */
  const statsSection = document.querySelector('.about-stats');
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedCounters = false;

const animateCounters = () => {
  statNumbers.forEach(num => {
    const target = +num.getAttribute('data-target');
    const increment = target / 50;
    let current = 0;

    const showPlus = num.hasAttribute('data-plus');

    const updateCount = () => {
      if (current < target) {
        current += increment;

        num.innerText =
          Math.ceil(current) + (showPlus ? '+' : '');

        setTimeout(updateCount, 25);
      } else {
        num.innerText =
          target + (showPlus ? '+' : '');
      }
    };

    updateCount();
  });
};

  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedCounters) {
          animateCounters();
          animatedCounters = true;
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }


  /* =========================================
     6. SKILL PROGRESS BARS ANIMATION
     ========================================= */
  const skillsSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-bar');
  let animatedSkills = false;

  const animateSkills = () => {
    skillBars.forEach(bar => {
      const widthValue = bar.getAttribute('data-width');
      bar.style.width = widthValue;
    });
  };

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedSkills) {
          animateSkills();
          animatedSkills = true;
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }


  /* =========================================
     7. PROJECTS FILTERING LOGIC
     ========================================= */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active from other buttons and add to current
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          // Fade-in animations for matched projects
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide animation
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  /* =========================================
     8. ACTIVE NAVIGATION LINK ON SCROLL
     ========================================= */
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 120; // offset header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });


  /* =========================================
     9. SCROLL TO TOP BUTTON
     ========================================= */
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* =========================================
     10. CONTACT FORM VALIDATION & STATES
     ========================================= */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    // Input validation utility helper
    const validateField = (input) => {
      const parent = input.parentElement;
      let isValid = true;

      // Handle custom check based on types
      if (input.required && !input.value.trim()) {
        isValid = false;
      } else if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(input.value.trim());
      }

      if (!isValid) {
        parent.classList.add('error');
      } else {
        parent.classList.remove('error');
      }

      return isValid;
    };

    // Attach dynamic checks on blue/blur
    const inputs = contactForm.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('error')) {
          validateField(input);
        }
      });
    });

    // Form submit check
  contactForm.addEventListener('submit', (e) => {
  let formIsValid = true;

  inputs.forEach(input => {
    const isFieldValid = validateField(input);
    if (!isFieldValid) {
      formIsValid = false;
    }
  });

  if (!formIsValid) {
    e.preventDefault();
  }
});
  }

});
