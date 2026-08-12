/* RJ Holidays – Package Pages JS */
(function () {
  'use strict';

  /* Navbar scroll */
  const navbar = document.querySelector('.navbar');
  const stickyCta = document.querySelector('.sticky-cta');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar && navbar.classList.add('scrolled');
      stickyCta && stickyCta.classList.add('visible');
    } else {
      navbar && navbar.classList.remove('scrolled');
      stickyCta && stickyCta.classList.remove('visible');
    }
  }, { passive: true });

  /* Hamburger */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger && hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const ans  = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').classList.remove('open');
      });
      if (!isOpen) {
        item.classList.add('open');
        ans.classList.add('open');
      }
    });
  });

  /* Footer year */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
