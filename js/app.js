/**
 * FORGELUX — HARDWARE • PAINTS • BUILDING MATERIALS
 * Core Application Logic: Theme, RTL, Dropdowns, Mobile Nav, Guide Visualizer, Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initDropdown();
  initMobileNav();
  initStickyHeader();
  initPaintGuide();
  initProductFilter();
  initQuoteModal();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('forgelux-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  setTheme(currentTheme);

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('forgelux-theme', theme);
    updateThemeIcons(theme);
  }

  function updateThemeIcons(theme) {
    const isDark = theme === 'dark';
    const buttons = [themeToggle, mobileThemeToggle].filter(Boolean);

    buttons.forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.innerHTML = isDark
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
    });
  }

  function toggleTheme() {
    const active = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(active);
    showToast(active === 'dark' ? 'Dark theme enabled' : 'Light theme enabled');
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
}

/* ==========================================================================
   2. RTL Toggle Management
   ========================================================================== */
function initRTL() {
  const rtlToggle = document.getElementById('rtlToggle');
  const mobileRtlToggle = document.getElementById('mobileRtlToggle');
  const html = document.documentElement;

  const savedDir = localStorage.getItem('forgelux-dir') || 'ltr';
  setDirection(savedDir);

  function setDirection(dir) {
    html.setAttribute('dir', dir);
    localStorage.setItem('forgelux-dir', dir);
    const label = dir === 'rtl' ? 'LTR' : 'RTL';
    const aria = dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout';

    [rtlToggle, mobileRtlToggle].filter(Boolean).forEach(btn => {
      btn.setAttribute('aria-label', aria);
      const textSpan = btn.querySelector('.rtl-indicator');
      if (textSpan) {
        textSpan.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
    });
  }

  function toggleDirection() {
    const current = html.getAttribute('dir') || 'ltr';
    const next = current === 'rtl' ? 'ltr' : 'rtl';
    setDirection(next);
    showToast(next === 'rtl' ? 'RTL layout active' : 'LTR layout active');
  }

  if (rtlToggle) rtlToggle.addEventListener('click', toggleDirection);
  if (mobileRtlToggle) mobileRtlToggle.addEventListener('click', toggleDirection);
}

/* ==========================================================================
   3. Accessible Home 1 Dropdown
   ========================================================================== */
function initDropdown() {
  const dropdownToggle = document.getElementById('homeDropdownToggle');
  const dropdownMenu = document.getElementById('homeDropdownMenu');

  if (!dropdownToggle || !dropdownMenu) return;

  function openDropdown() {
    dropdownToggle.setAttribute('aria-expanded', 'true');
    dropdownMenu.classList.add('is-open');
  }

  function closeDropdown() {
    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdownMenu.classList.remove('is-open');
  }

  function toggleDropdown() {
    const expanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // Hover support for mouse desktop
  const parentItem = dropdownToggle.closest('.nav-item');
  if (parentItem) {
    parentItem.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1000) openDropdown();
    });
    parentItem.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1000) closeDropdown();
    });
  }

  // Keyboard navigation
  dropdownToggle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDropdown();
      const firstLink = dropdownMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
    if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  dropdownMenu.addEventListener('keydown', (e) => {
    const items = Array.from(dropdownMenu.querySelectorAll('a'));
    const index = items.indexOf(document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % items.length;
      items[next].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + items.length) % items.length;
      items[prev].focus();
    } else if (e.key === 'Escape') {
      closeDropdown();
      dropdownToggle.focus();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
      closeDropdown();
    }
  });
}

/* ==========================================================================
   4. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const navToggle = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const backdrop = document.getElementById('mobileBackdrop');

  if (!navToggle || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    navToggle.focus();
  }

  navToggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Close drawer when clicking a mobile nav link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* ==========================================================================
   5. Sticky Header Scroll Effect
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   6. Interactive Paint Shade Guide & Wall Simulator
   ========================================================================== */
function initPaintGuide() {
  const swatchButtons = document.querySelectorAll('.swatch-btn');
  const finishButtons = document.querySelectorAll('.finish-tab-btn');
  const canvas = document.getElementById('roomCanvas');
  const shadeName = document.getElementById('roomShadeName');
  const shadeHex = document.getElementById('roomShadeHex');
  const finishLabel = document.getElementById('roomFinishLabel');

  if (!canvas || !swatchButtons.length) return;

  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const color = btn.dataset.color || '#B45309';
      const name = btn.dataset.name || 'Copper Umber';
      const hex = btn.dataset.hex || '#B45309';

      canvas.style.backgroundColor = color;
      if (shadeName) shadeName.textContent = name;
      if (shadeHex) shadeHex.textContent = hex;
    });
  });

  finishButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      finishButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const finish = btn.dataset.finish || 'Eggshell Finish';
      if (finishLabel) finishLabel.textContent = finish;

      // Adjust subtle gloss texture
      if (btn.dataset.finish === 'Metallic Copper Luster') {
        canvas.style.boxShadow = 'inset 0 0 80px rgba(245, 158, 11, 0.4)';
      } else {
        canvas.style.boxShadow = 'none';
      }
    });
  });
}

/* ==========================================================================
   7. Product Filtering
   ========================================================================== */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterBtns.length || !productCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. Quote Modal & Real-Time Estimator
   ========================================================================== */
function initQuoteModal() {
  const modalBackdrop = document.getElementById('quoteModalBackdrop');
  const modalClose = document.getElementById('quoteModalClose');
  const openButtons = document.querySelectorAll('.open-quote-modal');
  const quoteForm = document.getElementById('quoteForm');
  const quoteEstValue = document.getElementById('quoteEstimatedValue');

  if (!modalBackdrop) return;

  function openModal() {
    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const firstInput = modalBackdrop.querySelector('input, select');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal() {
    modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Calculate live estimate preview
  function updateEstimate() {
    if (!quoteEstValue) return;
    const catSelect = document.getElementById('quoteCategory');
    const sqftInput = document.getElementById('quoteQuantity');
    const tierSelect = document.getElementById('quoteGrade');

    const cat = catSelect ? catSelect.value : 'hardware';
    const qty = sqftInput && Number(sqftInput.value) > 0 ? Number(sqftInput.value) : 100;
    const gradeMult = tierSelect && tierSelect.value === 'trade' ? 0.85 : (tierSelect && tierSelect.value === 'architectural' ? 1.4 : 1.0);

    let baseRate = 18;
    if (cat === 'paint') baseRate = 24;
    if (cat === 'tools') baseRate = 65;
    if (cat === 'bulk') baseRate = 12;

    const total = Math.round(qty * baseRate * gradeMult);
    quoteEstValue.textContent = `$${total.toLocaleString()}`;
  }

  ['quoteCategory', 'quoteQuantity', 'quoteGrade'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateEstimate);
      el.addEventListener('change', updateEstimate);
    }
  });

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Quotation request submitted! Our architectural specialist will contact you shortly.');
      quoteForm.reset();
      updateEstimate();
    });
  }
}

/* ==========================================================================
   9. Contact Form
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thank you for contacting FORGELUX. An expert advisor will reply within 2 hours.');
    contactForm.reset();
  });
}

/* ==========================================================================
   10. Toast Notification
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}
