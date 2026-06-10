/* =============================================
   RJ HOLIDAYS – GALLERY PAGE JAVASCRIPT
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

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ── Gallery filter functionality ──
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter gallery items with animation
    galleryItems.forEach((item, index) => {
      const itemCategory = item.getAttribute('data-filter');
      const isMatch = filter === 'all' || itemCategory === filter;

      if (isMatch) {
        setTimeout(() => {
          item.classList.remove('hidden');
          item.style.animation = 'none';
          setTimeout(() => {
            item.style.animation = 'fadeInUp 0.5s ease forwards';
          }, 10);
        }, index * 50);
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Add fade-in animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideDown {
    from {
      max-height: 0;
      opacity: 0;
    }
    to {
      max-height: 2000px;
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// ── Package accordion functionality ──
function togglePackage(headerElement) {
  const item = headerElement.closest('.pkg-accordion-item');
  const isOpen = item.classList.contains('open');

  // Close all other items
  document.querySelectorAll('.pkg-accordion-item').forEach(el => {
    if (el !== item) {
      el.classList.remove('open');
    }
  });

  // Toggle current item
  item.classList.toggle('open');

  // Smooth scroll into view
  if (!isOpen) {
    setTimeout(() => {
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

// ── Back to top button ──
const backToTop = document.getElementById('backToTop');
if (backToTop) {
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
}

// ── Footer year ──
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Intersection Observer – fade-in on scroll ──
const fadeEls = document.querySelectorAll(
  '.testimonial-card, .pkg-accordion-item, .cta-content'
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

// ── Lazy load images ──
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported
} else {
  // Fallback
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

// ── Lightbox configuration ──
lightbox.option({
  'resizeDuration': 200,
  'wrapAround': true,
  'albumLabel': 'Image %1 of %2',
  'disableScrolling': false,
  'positionFromTop': 50,
  'showImageNumberLabel': true,
  'alwaysShowNavOnTouchDevices': false,
});

// ── WhatsApp float pulse animation ──
const waFloat = document.querySelector('.whatsapp-float');
if (waFloat) {
  const pulseStyle = document.createElement('style');
  pulseStyle.textContent = `
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
  document.head.appendChild(pulseStyle);
}

// ── Active nav link highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length > 0) {
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
}

// ── Accessibility: keyboard navigation for accordion ──
document.querySelectorAll('.pkg-accordion-header').forEach(header => {
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePackage(header);
    }
  });
});

// ── Toast notification function ──
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
