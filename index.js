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
  initBundleFilter();
  initPaintCalculator();
  initProductFilter();
  initQuoteModal();
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
      if (window.innerWidth > 1024) openDropdown();
    });
    parentItem.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) closeDropdown();
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

  // Auto-close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
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
   6. Everyday Project Bundles Filtering
   ========================================================================== */
function initBundleFilter() {
  const filterBtns = document.querySelectorAll('.bundle-filter-btn');
  const bundleCards = document.querySelectorAll('.bundle-card');

  if (!filterBtns.length || !bundleCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.bundleFilter || 'all';

      bundleCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
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
   9. Paint Coverage Calculator & Job-Pack Estimator
   ========================================================================== */
function initPaintCalculator() {
  const lengthInput = document.getElementById('roomLength');
  const widthInput = document.getElementById('roomWidth');
  const heightInput = document.getElementById('ceilingHeight');
  const doorsSelect = document.getElementById('doorsDeduct');
  const coatRadios = document.querySelectorAll('input[name="coatCount"]');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const sheenPills = document.querySelectorAll('.sheen-pill');

  // Metric outputs
  const netAreaEl = document.getElementById('calcNetArea');
  const paintGalEl = document.getElementById('calcPaintGallons');
  const primerGalEl = document.getElementById('calcPrimerGallons');
  const sheenLabelEl = document.getElementById('calcSheenLabel');
  const paintCostEl = document.getElementById('calcPaintCost');
  const primerCostEl = document.getElementById('calcPrimerCost');
  const discountEl = document.getElementById('calcDiscount');
  const totalCostEl = document.getElementById('calcTotalPrice');
  const transferBtn = document.getElementById('calcTransferBtn');

  if (!lengthInput || !widthInput || !heightInput) return;

  const presets = {
    bedroom: { length: 14, width: 12, height: 9, doors: '2' },
    powder:  { length: 8,  width: 6,  height: 8, doors: '1' },
    suite:   { length: 20, width: 16, height: 10, doors: '3' },
    living:  { length: 25, width: 18, height: 10, doors: '4' }
  };

  let activeSheenPrice = 48;
  let activeSheenName = 'Dead Flat';

  function calculate() {
    const l = Math.max(1, Number(lengthInput.value) || 14);
    const w = Math.max(1, Number(widthInput.value) || 12);
    const h = Math.max(1, Number(heightInput.value) || 9);
    const openings = Number(doorsSelect.value) || 2;

    const checkedCoat = document.querySelector('input[name="coatCount"]:checked');
    const coats = checkedCoat ? Number(checkedCoat.value) : 2;

    // Perimeter * Height - Doors/Windows allowance (20 sq ft per opening)
    const perimeter = 2 * (l + w);
    const grossWallArea = perimeter * h;
    const deductions = openings * 20;
    const netArea = Math.max(40, grossWallArea - deductions);

    // Coverage: 350 sq ft per gallon of wall finish
    // Primer coverage: 400 sq ft per gallon
    const finishGal = Math.max(1, Math.ceil((netArea * coats) / 350));
    const primerGal = Math.max(1, Math.ceil(netArea / 400));

    const paintCost = finishGal * activeSheenPrice;
    const primerCost = primerGal * 34; // $34/gal standard bonding primer
    const toolsCost = 26; // $26 for turnkey prep kit
    const subtotal = paintCost + primerCost + toolsCost;
    const bundleDiscount = Math.round(subtotal * 0.15 * 100) / 100;
    const total = subtotal - bundleDiscount;

    if (netAreaEl) netAreaEl.textContent = `${netArea.toLocaleString()} sq ft`;
    if (paintGalEl) paintGalEl.textContent = `${finishGal} Gal`;
    if (primerGalEl) primerGalEl.textContent = `${primerGal} Gal`;
    if (sheenLabelEl) sheenLabelEl.textContent = activeSheenName;
    if (paintCostEl) paintCostEl.textContent = `$${paintCost.toFixed(2)}`;
    if (primerCostEl) primerCostEl.textContent = `$${primerCost.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-$${bundleDiscount.toFixed(2)}`;
    if (totalCostEl) totalCostEl.textContent = `$${total.toFixed(2)}`;
  }

  // Preset button listeners
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const presetKey = btn.dataset.preset;
      const data = presets[presetKey];
      if (data) {
        lengthInput.value = data.length;
        widthInput.value = data.width;
        heightInput.value = data.height;
        doorsSelect.value = data.doors;
        calculate();
      }
    });
  });

  // Direct dimension inputs
  [lengthInput, widthInput, heightInput, doorsSelect].forEach(input => {
    input.addEventListener('input', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      calculate();
    });
    input.addEventListener('change', calculate);
  });

  // Coat radio buttons
  coatRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.coat-option').forEach(opt => opt.classList.remove('active'));
      const parent = radio.closest('.coat-option');
      if (parent) parent.classList.add('active');
      calculate();
    });
  });

  // Sheen pills
  sheenPills.forEach(pill => {
    pill.addEventListener('click', () => {
      sheenPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      activeSheenPrice = Number(pill.dataset.price) || 48;
      const strongEl = pill.querySelector('strong');
      activeSheenName = strongEl ? strongEl.textContent.split('(')[0].trim() : 'Dead Flat';
      calculate();
    });
  });

  // Transfer to quote modal
  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      const modalBackdrop = document.getElementById('quoteModalBackdrop');
      const catSelect = document.getElementById('quoteCategory');
      const qtyInput = document.getElementById('quoteQuantity');
      const notesInput = document.getElementById('quoteNotes');

      if (catSelect) catSelect.value = 'paint';
      if (qtyInput && netAreaEl) {
        qtyInput.value = parseInt(netAreaEl.textContent, 10) || 450;
      }
      if (notesInput && paintGalEl && primerGalEl) {
        notesInput.value = `Estimated requirements: ${paintGalEl.textContent} ${activeSheenName} finish + ${primerGalEl.textContent} Primer + Prep Caddy. Turnkey Package Estimate: ${totalCostEl ? totalCostEl.textContent : ''}`;
      }

      if (modalBackdrop) {
        modalBackdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }

      showToast(`Package transferred to Quote Schedule (${paintGalEl?.textContent} paint, ${primerGalEl?.textContent} primer)`);
    });
  }

  // Initial calculation run
  calculate();
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
