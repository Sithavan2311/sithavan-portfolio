/* ==========================================
   SITHAVAN S - 3D INTERACTIVE & SCROLL ANIMATIONS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDirectionalScroll();
  initMobileMenu();
  initSkillFilters();
  initResumeModal();
  initContactForm();
  initScrollReveal();
  init3DTiltEffect();
  initHeroParallax();
});

let lastScrollY = window.scrollY;

/* Directional Scroll Detection & Navbar Auto Hide/Show */
function initDirectionalScroll() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling DOWN
      navbar.classList.add('nav-hidden');
      navbar.classList.remove('nav-visible');
    } else if (currentScrollY < lastScrollY) {
      // Scrolling UP
      navbar.classList.remove('nav-hidden');
      navbar.classList.add('nav-visible');
    }

    lastScrollY = currentScrollY;
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

/* Scroll-Driven Directional In and Out Animations */
function initScrollReveal() {
  // Exclude modal content from scroll reveal
  const targets = document.querySelectorAll('section .glass-card, .section-header, .hero-content, .hero-image-wrapper, .timeline-item');

  targets.forEach((el, index) => {
    el.classList.add('reveal-item', 'hide-below');
    el.style.transitionDelay = `${(index % 3) * 0.12}s`;
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const rect = entry.boundingClientRect;

      if (entry.isIntersecting) {
        entry.target.classList.remove('hide-below', 'hide-above');
        entry.target.classList.add('revealed');
      } else {
        entry.target.classList.remove('revealed');

        if (rect.top > window.innerHeight) {
          entry.target.classList.add('hide-below');
          entry.target.classList.remove('hide-above');
        } else if (rect.bottom < 0) {
          entry.target.classList.add('hide-above');
          entry.target.classList.remove('hide-below');
        }
      }
    });
  }, observerOptions);

  targets.forEach(el => observer.observe(el));
}

/* Dynamic 3D Card Tilt Effect on Mouse Move */
function init3DTiltEffect() {
  // Only target cards inside sections (not inside modal)
  const cards = document.querySelectorAll('section .glass-card');

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

/* Interactive Resume Modal Handler */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.querySelector('#resumeModal .modal-close');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
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
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const message = document.getElementById('senderMessage').value.trim();
      
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
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
            subject: `Portfolio Inquiry from ${name}`
          })
        });

        const data = await response.json();

        if (data.success) {
          showToast(`✓ Thank you ${name}! Your message has been sent to Sithavan.`);
          contactForm.reset();
        } else {
          // Open direct mail client fallback if API key is unverified
          window.location.href = `mailto:sithavan2311@gmail.com?subject=Portfolio Message from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
          showToast(`✓ Thank you ${name}! Opening your email client to send message.`);
          contactForm.reset();
        }
      } catch (err) {
        window.location.href = `mailto:sithavan2311@gmail.com?subject=Portfolio Message from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
        showToast(`✓ Opening email client to send message directly to Sithavan.`);
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
