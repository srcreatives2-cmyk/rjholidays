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

// ── RJ Holidays backend integration ──
// Set this to your deployed Render backend URL once live, e.g.
// 'https://rj-holidays-backend.onrender.com'
const RJ_API_BASE = 'https://rjholidays-backend.onrender.com';

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
    referrer_url: document.referrer || '',
    landing_page: window.location.href,
  };
}

// Sends the enquiry to the backend so it gets a Lead ID, shows up in the CRM,
// and triggers admin/customer email notifications. This runs alongside the
// existing WhatsApp redirect below — it never blocks or replaces it, so if the
// backend is briefly unreachable, the WhatsApp flow customers already rely on
// still works exactly as before.
async function submitEnquiryToBackend({ name, phone, email, destination, travellers, message }) {
  const payload = {
    name,
    mobile: phone,
    whatsapp: phone,
    email: email || '',
    destination: destination || 'Not specified',
    adults: 1,
    children: 0,
    special_requirements: [
      travellers ? `Travellers: ${travellers}` : '',
      message || ''
    ].filter(Boolean).join(' | '),
    ...getUtmParams(),
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(`${RJ_API_BASE}/api/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.success) {
      throw new Error(data.error || `Backend returned HTTP ${res.status}`);
    }

    return data;
  } finally {
    clearTimeout(timeout);
  }
}

// ── Contact form (WhatsApp redirect + backend CRM submission) ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
    const destination = document.getElementById('destination').value;
    const travellers = document.getElementById('travellers').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone) {
      showToast('Please fill in your name and phone number.', 'error');
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    }

    const waMessage = `Hi RJ Holidays! 🙏

*New Tour Enquiry*
👤 Name: ${name}
📱 Phone: ${phone}
📍 Destination: ${destination || 'Not specified'}
👥 Travellers: ${travellers || 'Not specified'}
💬 Message: ${message || 'No additional message'}

I'd like to know more about your packages!`;

    try {
      // Save the enquiry first. WhatsApp opens only after the backend confirms success.
      const result = await submitEnquiryToBackend({ name, phone, email, destination, travellers, message });

      const encoded = encodeURIComponent(waMessage);
      window.open(`https://wa.me/919317618833?text=${encoded}`, '_blank');

      const wrap = contactForm.closest('.contact-form-wrap');
      wrap.innerHTML = `
        <div class="form-success">
          <i class="fa-solid fa-circle-check"></i>
          <h3>Enquiry Received!</h3>
          <p>Your enquiry has been saved successfully. Enquiry ID: <strong>${result.enquiry_code || 'Received'}</strong></p>
          <p>WhatsApp is opening now so our travel experts can respond quickly.</p>
        </div>
      `;
    } catch (err) {
      console.error('[RJ Holidays] Enquiry submission failed:', err);

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = submitButton.dataset.originalText || 'Submit Enquiry';
      }

      showToast('We could not save your enquiry. Please try again. You can still contact us on WhatsApp.', 'error');

      // Keep the WhatsApp fallback so the customer is never left without a contact option.
      const encoded = encodeURIComponent(waMessage);
      window.open(`https://wa.me/919317618833?text=${encoded}`, '_blank');
    }
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
// Note: review-card is excluded because those cards are now rendered dynamically
// from real Google review data (see the reviews carousel section below), and
// .carousel-clone excludes the duplicated slides used for seamless looping.
const fadeEls = document.querySelectorAll(
  '.dest-card:not(.carousel-clone), .pkg-card:not(.carousel-clone), .why-card, .about-grid, .contact-item'
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

// WhatsApp float pulse animation now handled via CSS (::after ring, GPU-compositable)

/* =============================================
   AUTO-SLIDING CAROUSELS
   Popular Destinations, Most Loved Packages, Google Reviews.
   Native scroll + scroll-snap gives free touch/swipe support;
   items are cloned once on each side for a seamless infinite loop.
   ============================================= */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initCarousel(trackId, { interval = 4000 } = {}) {
  const track = document.getElementById(trackId);
  if (!track) return null;

  const originalItems = Array.from(track.children);
  if (originalItems.length < 2) return null; // nothing meaningful to slide

  const makeClone = (el) => {
    const clone = el.cloneNode(true);
    clone.classList.add('carousel-clone');
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a, button').forEach(el2 => el2.setAttribute('tabindex', '-1'));
    return clone;
  };

  // Prepend + append one full clone set so we can loop in both directions
  originalItems.slice().reverse().forEach(el => track.insertBefore(makeClone(el), track.firstChild));
  originalItems.forEach(el => track.appendChild(makeClone(el)));

  const setWidth = () => {
    const first = track.children[0];
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
    return (first.getBoundingClientRect().width + gap) * originalItems.length;
  };

  // Jump (no animation) so the visible start is the real first item
  track.style.scrollBehavior = 'auto';
  track.scrollLeft = setWidth();
  requestAnimationFrame(() => { track.style.scrollBehavior = 'smooth'; });

  let autoplayTimer = null;
  let resumeTimer = null;

  const scrollByItems = (n) => {
    const first = track.children[0];
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
    const itemWidth = first.getBoundingClientRect().width + gap;
    track.scrollBy({ left: n * itemWidth, behavior: 'smooth' });
  };

  const checkLoop = () => {
    const total = setWidth();
    if (track.scrollLeft >= total * 2 - 4) {
      track.style.scrollBehavior = 'auto';
      track.scrollLeft -= total;
      requestAnimationFrame(() => { track.style.scrollBehavior = 'smooth'; });
    } else if (track.scrollLeft <= 4) {
      track.style.scrollBehavior = 'auto';
      track.scrollLeft += total;
      requestAnimationFrame(() => { track.style.scrollBehavior = 'smooth'; });
    }
  };

  let scrollEndTimer = null;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(checkLoop, 100);
  }, { passive: true });

  const startAutoplay = () => {
    if (prefersReducedMotion) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => scrollByItems(1), interval);
  };
  const stopAutoplay = () => { if (autoplayTimer) clearInterval(autoplayTimer); };
  const pauseThenResume = () => {
    stopAutoplay();
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(startAutoplay, 4500);
  };

  ['touchstart', 'pointerdown', 'mouseenter'].forEach(evt =>
    track.addEventListener(evt, pauseThenResume, { passive: true })
  );
  track.addEventListener('mouseleave', () => {
    clearTimeout(resumeTimer);
    startAutoplay();
  });

  const wrap = track.closest('.carousel-wrap');
  if (wrap) {
    const prevBtn = wrap.querySelector('.carousel-prev');
    const nextBtn = wrap.querySelector('.carousel-next');
    if (prevBtn) prevBtn.addEventListener('click', () => { pauseThenResume(); scrollByItems(-1); });
    if (nextBtn) nextBtn.addEventListener('click', () => { pauseThenResume(); scrollByItems(1); });
  }

  window.addEventListener('resize', () => {
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = setWidth();
    requestAnimationFrame(() => { track.style.scrollBehavior = 'smooth'; });
  }, { passive: true });

  startAutoplay();

  return { stopAutoplay, startAutoplay };
}

// Destinations & Packages carousels use the existing, unchanged card markup
initCarousel('destCarousel');
initCarousel('pkgCarousel');

/* =============================================
   GOOGLE REVIEWS — genuine reviews only
   No hardcoded/demo reviews are used. Real reviews are fetched from your
   own backend (the same RJ_API_BASE used for enquiries above), which in
   turn calls the official Google Places API server-side so the API key
   is never exposed in this frontend code.
   Expected backend response shape (add a route on your Render backend):
     GET {RJ_API_BASE}/api/google-reviews
     -> { "rating": 4.9, "reviewCount": 124, "reviews": [
            { "author_name": "...", "profile_photo_url": "...",
              "rating": 5, "relative_time_description": "2 months ago",
              "text": "..." }, ... ] }
   Until that endpoint exists, this section shows an honest "not connected
   yet" message instead of fake reviews.
   ============================================= */
async function loadGoogleReviews() {
  const track = document.getElementById('reviewsCarousel');
  const wrap = document.getElementById('reviewsCarouselWrap');
  if (!track || !wrap) return;

  const statusEl = document.getElementById('reviewsStatus');

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`${RJ_API_BASE}/api/google-reviews`, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`Backend returned HTTP ${res.status}`);
    const data = await res.json();
    const reviews = Array.isArray(data.reviews) ? data.reviews : [];

    if (reviews.length === 0) throw new Error('No reviews returned');

    track.innerHTML = '';
    reviews.forEach(r => {
      const card = document.createElement('div');
      card.className = 'review-card';

      const stars = Math.round(r.rating || 5);
      const starsHtml = Array.from({ length: 5 }, (_, i) =>
        `<i class="fa-solid fa-star" style="${i < stars ? '' : 'opacity:0.25'}"></i>`
      ).join('');

      const avatarHtml = r.profile_photo_url
        ? `<img src="${r.profile_photo_url}" alt="${r.author_name || 'Reviewer'}" class="reviewer-photo" referrerpolicy="no-referrer" style="width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;" loading="lazy" />`
        : `<div class="reviewer-avatar">${(r.author_name || '?').trim().charAt(0).toUpperCase()}</div>`;

      card.innerHTML = `
        <div class="review-header">
          ${avatarHtml}
          <div class="reviewer-info">
            <strong>${r.author_name || 'Google User'}</strong>
          </div>
          <div class="review-stars">${starsHtml}</div>
        </div>
        <p>${(r.text || '').trim()}</p>
        <div class="review-footer">
          <img src="https://i.ibb.co/LDvF75yX/Google-Review.png" alt="Google-Review" class="google-logo" loading="lazy" />
          <span>${r.relative_time_description || ''}</span>
        </div>
      `;
      track.appendChild(card);
    });

    if (typeof data.rating === 'number') {
      const scoreEl = document.querySelector('.agg-score');
      if (scoreEl) scoreEl.textContent = `${data.rating.toFixed(1)} / 5`;
    }
    if (typeof data.reviewCount === 'number') {
      const countEl = document.querySelector('.agg-count');
      if (countEl) countEl.textContent = `Based on ${data.reviewCount}+ Google Reviews`;
    }

    wrap.querySelectorAll('.carousel-nav').forEach(btn => btn.hidden = false);
    initCarousel('reviewsCarousel', { interval: 5000 });
  } catch (err) {
    console.warn('[RJ Holidays] Google reviews not connected yet:', err.message);
    if (statusEl) {
      statusEl.textContent = 'Google reviews will appear here once connected — view them directly on Google in the meantime.';
    }
  }
}

loadGoogleReviews();
