/* ==========================================
   SITHAVAN S - PORTFOLIO INTERACTIVE APP
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initSkillFilters();
  initResumeModal();
  initContactForm();
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
          card.style.animation = 'fadeIn 0.4s ease';
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

/* Contact Form Feedback */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      
      showToast(`Thank you ${name}! Your message has been sent successfully.`);
      contactForm.reset();
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
