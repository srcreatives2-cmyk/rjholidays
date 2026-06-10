/* =============================================
   RJ HOLIDAYS – MAIN JAVASCRIPT
   ============================================= */

'use strict';

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
const handleNavbarScroll = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

// ── Mobile hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── Back to top button ──
const backToTop = document.getElementById('backToTop');
const handleBackToTop = () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
};
window.addEventListener('scroll', handleBackToTop, { passive: true });
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Footer year ──
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Contact form (WhatsApp redirect) ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const destination = document.getElementById('destination').value;
    const travellers = document.getElementById('travellers').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone) {
      showToast('Please fill in your name and phone number.', 'error');
      return;
    }

    const waMessage = `Hi RJ Holidays! 🙏

*New Tour Enquiry*
👤 Name: ${name}
📱 Phone: ${phone}
📍 Destination: ${destination || 'Not specified'}
👥 Travellers: ${travellers || 'Not specified'}
💬 Message: ${message || 'No additional message'}

I'd like to know more about your packages!`;

    const encoded = encodeURIComponent(waMessage);
    window.open(`https://wa.me/919317618833?text=${encoded}`, '_blank');

    // Show success state
    const wrap = contactForm.closest('.contact-form-wrap');
    wrap.innerHTML = `
      <div class="form-success">
        <i class="fa-solid fa-circle-check"></i>
        <h3>Redirecting to WhatsApp!</h3>
        <p>Your enquiry has been prepared. Complete it on WhatsApp for an instant response from our travel experts.</p>
      </div>
    `;
  });
}

// ── Toast notification ──
function showToast(message, type = 'info') {
  const existing = document.querySelector('.rj-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'rj-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: ${type === 'error' ? '#C62828' : '#1A2D42'};
    color: #fff;
    padding: 12px 22px;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    opacity: 0;
    max-width: 90vw;
    text-align: center;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── Intersection Observer – fade-in on scroll ──
const fadeEls = document.querySelectorAll(
  '.dest-card, .pkg-card, .why-card, .review-card, .about-grid, .contact-item'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });
}

// ── Lazy load images with native loading attribute fallback ──
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported – already handled via HTML
} else {
  // Fallback for older browsers
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ── Smooth scroll for nav links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Active nav link highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--gold-light)'
          : 'rgba(255,255,255,0.85)';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── WhatsApp float pulse animation ──
const waFloat = document.querySelector('.whatsapp-float');
if (waFloat) {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes wa-pulse {
      0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
      70% { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
      100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
    }
    .whatsapp-float {
      animation: wa-pulse 2.5s infinite;
    }
    .whatsapp-float:hover {
      animation: none;
    }
  `;
  document.head.appendChild(style);
}
