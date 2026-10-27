/**
 * FORGELUX — Services Page JavaScript
 * Global header, navigation, theme toggle, RTL, mobile drawer, and quote modal
 * are handled identically across the entire website by index.js.
 * This file provides page-specific smooth scrolling and subtle interactive enhancements.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
});

/* ==========================================================================
   Smooth Scroll for In-Page Anchor Links
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '#quoteModalBackdrop') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
