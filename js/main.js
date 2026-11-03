/* Breathiterol — Main JS (performance-optimised, zero forced reflow) */
(function () {
  'use strict';

  /* Mobile nav */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('open');
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((el) => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* Scroll-to-top — rAF throttle, no forced reflow */
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    let ticking = false;
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          if (lastScrollY > 400) { scrollBtn.classList.add('visible'); }
          else { scrollBtn.classList.remove('visible'); }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Smooth anchor scroll */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
})();
