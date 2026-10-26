/**
 * About.js — Page-specific interactions for the FORGELUX About Us page.
 * Note: Global header, footer, theme toggle, RTL, and modal handlers are preserved in index.js.
 * This file adds subtle, accessible scroll reveals and timeline progressive interactions
 * respecting prefers-reduced-motion.
 */

(function () {
  'use strict';

  // Check user preference for reduced motion
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    // If user prefers reduced motion or IntersectionObserver is not supported, do not apply dynamic transforms
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      return;
    }

    // 1. Subtle Intersection Observer for Timeline Cards
    var timelineCards = document.querySelectorAll('.timeline-v-item, .timeline-card');
    if (timelineCards.length > 0) {
      var timelineObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      timelineCards.forEach(function (card) {
        timelineObserver.observe(card);
      });
    }

    // 2. Subtle Intersection Observer for Team and Benefit Cards
    var revealElements = document.querySelectorAll('.team-card, .benefit-card, .mission-value-card');
    if (revealElements.length > 0) {
      var cardObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          threshold: 0.1,
          rootMargin: '0px 0px -30px 0px'
        }
      );

      revealElements.forEach(function (el) {
        cardObserver.observe(el);
      });
    }

    // 3. Interactive Discipline Filter Pills in Hero Banner
    var disciplinePills = document.querySelectorAll('.hero-discipline-pills .discipline-pill');
    disciplinePills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        disciplinePills.forEach(function (p) {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
      });
    });

    // 4. Smooth anchor scrolling for in-page anchors (e.g. #mission)
    var internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href.length > 1 && href.startsWith('#')) {
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            var headerOffset = 90;
            var elementPosition = target.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
          }
        }
      });
    });
  });
})();
