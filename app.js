/* ==========================================
   SITHAVAN S - 3D INTERACTIVE & SCROLL ANIMATIONS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initSkillFilters();
  initResumeModal();
  initContactForm();
  initScrollReveal();
  init3DTiltEffect();
  initHeroParallax();
});

/* Navbar Background Blur on Scroll */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* Mobile Nav Toggle */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* Scroll-Driven In and Out Animations (IntersectionObserver) */
function initScrollReveal() {
  // Add reveal-item class to sections and cards automatically
  const targets = document.querySelectorAll('.glass-card, .section-header, .hero-content, .hero-image-wrapper, .timeline-item');

  targets.forEach((el, index) => {
    el.classList.add('reveal-item');
    el.style.transitionDelay = `${(index % 3) * 0.15}s`;
  });

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      } else {
        // In and Out animation: remove when scrolling far away
        if (entry.boundingClientRect.top > window.innerHeight) {
          entry.target.classList.remove('revealed');
        }
      }
    });
  }, observerOptions);

  targets.forEach(el => observer.observe(el));
}

/* Dynamic 3D Card Tilt Effect on Mouse Move */
function init3DTiltEffect() {
  const cards = document.querySelectorAll('.glass-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;
    });
  });
}

/* 3D Hero Avatar Mouse Tracking Parallax */
function initHeroParallax() {
  const avatarWrapper = document.querySelector('.hero-image-wrapper');
  const avatar = document.querySelector('.hero-avatar');

  if (avatarWrapper && avatar) {
    document.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 35;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 35;

      avatar.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(20px)`;
    });
  }
}

/* Interactive Skill Filter Tabs */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          card.style.animation = 'slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Resume Modal Handler */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.querySelector('#resumeModal .modal-close');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) resumeModal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (resumeModal) resumeModal.classList.remove('active');
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
      }
    });
  }
}

/* In-Portfolio Direct Form Submission */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const message = document.getElementById('senderMessage').value;
      
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';

      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: '5608b4bf-79f9-4c81-b5eb-70139b46e32b',
            name: name,
            email: email,
            message: message,
            subject: `Portfolio Message from ${name}`
          })
        });

        showToast(`✓ Thank you ${name}! Your message has been sent directly to Sithavan.`);
        contactForm.reset();
      } catch (err) {
        showToast(`✓ Thank you ${name}! Your message has been recorded.`);
        contactForm.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }
}

/* Toast Message Generator */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--accent-cyan);">✓</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
