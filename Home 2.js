/**
 * FORGELUX — HARDWARE & PAINT STORE (HOME 2)
 * Everyday Hardware & Paint Deals
 * Logic: Theme, RTL, Dropdowns, Mobile Nav, Automated Product Carousel, Quote Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initDropdown();
  initMobileNav();
  initStickyHeader();
  initCarousel();
  initQuoteModal();
  initFinishLab();
  initProjectEstimator();
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
   3. Accessible Home Dropdown
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

  const parentItem = dropdownToggle.closest('.nav-item');
  if (parentItem) {
    parentItem.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) openDropdown();
    });
    parentItem.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) closeDropdown();
    });
  }

  document.addEventListener('click', (e) => {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdownMenu.classList.contains('is-open')) {
      closeDropdown();
      dropdownToggle.focus();
    }
  });
}

/* ==========================================================================
   4. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const closeBtn = document.getElementById('mobileDrawerClose');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openMenu() {
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMenu();
      toggleBtn.focus();
    }
  });

  const mobileLinks = drawer.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && drawer.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   5. Sticky Header Effect
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
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
   6. Automated Horizontal Product Carousel (Smooth, Interactive & Accessible)
   ========================================================================== */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const wrapper = document.getElementById('carouselWrapper');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const pauseBtn = document.getElementById('carouselPause');
  const pauseIcon = document.getElementById('carouselPauseIcon');

  if (!track || !wrapper) return;

  let isPaused = false;

  // Check prefers-reduced-motion
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    track.style.animationPlayState = 'paused';
    isPaused = true;
    updatePauseButtonUI(true);
  }

  function setPausedState(pause) {
    isPaused = pause;
    track.style.animationPlayState = pause ? 'paused' : 'running';
    updatePauseButtonUI(pause);
  }

  function updatePauseButtonUI(paused) {
    if (!pauseIcon || !pauseBtn) return;
    if (paused) {
      pauseBtn.setAttribute('aria-label', 'Resume automated scrolling');
      pauseBtn.setAttribute('title', 'Resume Scrolling');
      pauseIcon.innerHTML = `
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      `;
    } else {
      pauseBtn.setAttribute('aria-label', 'Pause automated scrolling');
      pauseBtn.setAttribute('title', 'Pause Scrolling');
      pauseIcon.innerHTML = `
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      `;
    }
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      setPausedState(!isPaused);
      showToast(isPaused ? 'Product showcase paused' : 'Product showcase scrolling');
    });
  }

  // Keyboard controls on Prev / Next
  const cardShiftDistance = 270; // Card width + gap

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      // Pause automatic movement momentarily so user can read shifted items
      setPausedState(true);
      wrapper.scrollBy({ left: -cardShiftDistance, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      setPausedState(true);
      wrapper.scrollBy({ left: cardShiftDistance, behavior: 'smooth' });
    });
  }

  // Touch Swipe Support
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  wrapper.addEventListener('touchstart', (e) => {
    if (!e.touches[0]) return;
    startX = e.touches[0].clientX;
    isSwiping = true;
    track.style.animationPlayState = 'paused';
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    if (!isSwiping || !e.touches[0]) return;
    currentX = e.touches[0].clientX;
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    if (!isSwiping) return;
    const diff = startX - currentX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        wrapper.scrollBy({ left: cardShiftDistance, behavior: 'smooth' });
      } else {
        wrapper.scrollBy({ left: -cardShiftDistance, behavior: 'smooth' });
      }
    }
    isSwiping = false;
    if (!isPaused && !prefersReduced) {
      setTimeout(() => {
        track.style.animationPlayState = 'running';
      }, 1500);
    }
  }, { passive: true });
}

/* ==========================================================================
   7. Quote Modal & Real-Time Estimator
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
      showToast('Quotation request submitted! Our store specialist will contact you shortly.');
      quoteForm.reset();
      updateEstimate();
    });
  }
}

/* ==========================================================================
   8. Toast Notification
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
  }, 4000);
}

/* ==========================================================================
   9. Architectural Finish & Color Formulation Lab
   ========================================================================== */
function initFinishLab() {
  const swatchCards = document.querySelectorAll('.h2-swatch-card');
  const previewTitle = document.getElementById('labFinishTitle');
  const previewDesc = document.getElementById('labFinishDesc');
  const specBadge = document.getElementById('labSpecBadge');
  const textureBlock = document.getElementById('labTextureBlock');
  const textureLabel = document.getElementById('labTextureLabel');
  const lrvVal = document.getElementById('labLrvVal');
  const substrate = document.getElementById('labSubstrate');
  const environments = document.getElementById('labEnvironments');
  const pairings = document.getElementById('labPairings');
  const sampleBtn = document.getElementById('labSampleBtn');
  const quoteModal = document.getElementById('quoteModalBackdrop');
  const quoteFinishSelect = document.getElementById('quoteFinish');
  const quoteNotes = document.getElementById('quoteNotes');

  if (!swatchCards.length) return;

  const finishData = {
    brass: {
      title: 'Unlacquered Satin Brass',
      desc: 'Forged from solid virgin brass, left unsealed to naturally develop a warm, organic patina uniquely conditioned by your building\'s micro-climate and human touch.',
      spec: 'SPEC CODE: FL-SPEC-UB01',
      texture: 'linear-gradient(135deg, #FDE047 0%, #D4AF37 40%, #854D0E 100%)',
      textureLabel: 'METALLIC LIVING PATINA • 44% LRV',
      lrv: '44% (Warm Diffuse Lustre)',
      substrate: 'Solid Forged C36000 Brass',
      env: 'Coastal • High-Traffic Interior',
      pairings: 'Smoked Oak, Venetian Plaster, Calacatta',
      selectValue: 'copper-gold'
    },
    bronze: {
      title: 'Florentine Cocoa Bronze',
      desc: 'Hand-oxidized deep bronze alloy revealing subtle rich copper highlights along burnished edges. Exceptional tactile warmth with silky satin finish.',
      spec: 'SPEC CODE: FL-SPEC-FB02',
      texture: 'linear-gradient(135deg, #8C5523 0%, #5C3A21 50%, #2A1810 100%)',
      textureLabel: 'OXIDIZED COPPER ALLOY • 18% LRV',
      lrv: '18% (Subdued Architectural Shadow)',
      substrate: 'High-Density Architectural Bronze',
      env: 'Fine Residential • Heritage Estates',
      pairings: 'Walnut Joinery, Dark Terrazzo, Aged Linen',
      selectValue: 'copper-brown'
    },
    limewash: {
      title: 'Venetian Lime Wash',
      desc: 'Authentic slaked Italian lime infused with micro-milled Carrara marble particles. Naturally breathable, anti-microbial, and softly diffusing natural sunlight.',
      spec: 'SPEC CODE: FL-SPEC-VL03',
      texture: 'linear-gradient(135deg, #FFFDF8 0%, #E8DEC8 55%, #B8AA90 100%)',
      textureLabel: 'MINERAL SLAKED CHALK • 72% LRV',
      lrv: '72% (High Light Reflectance Velvet)',
      substrate: 'Zero-VOC Slaked Mineral Lime',
      env: 'Interior Drywall • Lime Plaster • Brick',
      pairings: 'Bleached Oak, Travertine, Unlacquered Brass',
      selectValue: 'cream'
    },
    nickel: {
      title: 'Satin Blackened Nickel',
      desc: 'Physical Vapor Deposition (PVD) engineered finish delivering scratch-proof durability with a sleek, contemporary gunmetal-charcoal sheen.',
      spec: 'SPEC CODE: FL-SPEC-BN04',
      texture: 'linear-gradient(135deg, #6B7280 0%, #374151 55%, #111827 100%)',
      textureLabel: 'PVD VAPOR TREATED • 14% LRV',
      lrv: '14% (Deep Industrial Contrast)',
      substrate: 'PVD Coated Stainless Steel 316',
      env: 'Commercial Restrooms • High-Traffic Hospitality',
      pairings: 'Raw Concrete, Matte Black Metalwork, Nero Marquina',
      selectValue: 'charcoal'
    },
    gunmetal: {
      title: 'Raw Architectural Gunmetal',
      desc: 'High-tensile hardened structural carbon steel treated with beeswax and micro-crystalline sealants for an honest, monolithic architectural appearance.',
      spec: 'SPEC CODE: FL-SPEC-GM05',
      texture: 'linear-gradient(135deg, #9CA3AF 0%, #4B5563 55%, #1F2937 100%)',
      textureLabel: 'HARDENED HIGH-TENSILE • 22% LRV',
      lrv: '22% (Brushed Structural Neutral)',
      substrate: 'Architectural Carbon Alloy',
      env: 'Exterior Framing • Structural Joinery • Lofts',
      pairings: 'Rough Sawn Timber, Exposed Brickwork, Industrial Zinc',
      selectValue: 'charcoal'
    },
    sienna: {
      title: 'Artisanal Sienna Ochre',
      desc: 'Refined earth mineral glaze formulated with natural iron oxide pigments. Imparts deep dimensional saturation to timber, cabinetry, and feature facades.',
      spec: 'SPEC CODE: FL-SPEC-SO06',
      texture: 'linear-gradient(135deg, #F59E0B 0%, #B45309 50%, #78350F 100%)',
      textureLabel: 'EARTH MINERAL GLAZE • 36% LRV',
      lrv: '36% (Rich Warm Radiance)',
      substrate: 'Silicate Base Earth Pigment',
      env: 'Facade Features • Bespoke Joinery • Accent Walls',
      pairings: 'Brushed Brass, Terracotta, Honed Basalt',
      selectValue: 'copper-brown'
    }
  };

  swatchCards.forEach(card => {
    card.addEventListener('click', () => {
      const finishKey = card.getAttribute('data-finish');
      const data = finishData[finishKey];
      if (!data) return;

      swatchCards.forEach(c => {
        c.classList.remove('is-active');
        c.setAttribute('aria-selected', 'false');
      });
      card.classList.add('is-active');
      card.setAttribute('aria-selected', 'true');

      if (previewTitle) previewTitle.textContent = data.title;
      if (previewDesc) previewDesc.textContent = data.desc;
      if (specBadge) specBadge.textContent = data.spec;
      if (textureBlock) textureBlock.style.background = data.texture;
      if (textureLabel) textureLabel.textContent = data.textureLabel;
      if (lrvVal) lrvVal.textContent = data.lrv;
      if (substrate) substrate.textContent = data.substrate;
      if (environments) environments.textContent = data.env;
      if (pairings) pairings.textContent = data.pairings;

      if (sampleBtn) {
        sampleBtn.setAttribute('data-target-finish', data.selectValue);
        sampleBtn.setAttribute('data-finish-title', data.title);
      }
    });
  });

  if (sampleBtn) {
    sampleBtn.addEventListener('click', () => {
      const activeCard = document.querySelector('.h2-swatch-card.is-active');
      const finishKey = activeCard ? activeCard.getAttribute('data-finish') : 'brass';
      const data = finishData[finishKey];
      if (quoteFinishSelect && data) {
        quoteFinishSelect.value = data.selectValue;
      }
      if (quoteNotes && data) {
        quoteNotes.value = `Sample Box Request: ${data.title} (${data.spec}). Please dispatch to our studio/job site.`;
      }
      if (quoteModal) {
        quoteModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  }
}

/* ==========================================================================
   10. Interactive Pro Project Estimator & Wholesale Margin Hub
   ========================================================================== */
function initProjectEstimator() {
  const slider = document.getElementById('estAreaSlider');
  const areaDisplay = document.getElementById('estAreaDisplay');
  const typeTabs = document.querySelectorAll('.h2-est-tab-btn');
  const tierBtns = document.querySelectorAll('.h2-tier-btn');
  const paintVol = document.getElementById('estPaintVolume');
  const primerVol = document.getElementById('estPrimerVolume');
  const hardwarePacks = document.getElementById('estHardwarePacks');
  const retailTotal = document.getElementById('estRetailTotal');
  const tradeTotal = document.getElementById('estTradeTotal');
  const savingsPill = document.getElementById('estSavingsPill');
  const ctaBtn = document.getElementById('estCtaBtn');

  const quoteModal = document.getElementById('quoteModalBackdrop');
  const quoteQuantityInput = document.getElementById('quoteQuantity');
  const quoteGradeSelect = document.getElementById('quoteGrade');
  const quoteNotes = document.getElementById('quoteNotes');

  if (!slider) return;

  let currentType = 'resi';
  let currentTier = 'trade';

  const typeMultipliers = {
    resi: { rate: 2.7, paintRate: 60, primerRate: 120, hardwareRatio: 300 },
    comm: { rate: 3.4, paintRate: 50, primerRate: 100, hardwareRatio: 220 },
    ext:  { rate: 3.9, paintRate: 45, primerRate: 90,  hardwareRatio: 200 }
  };

  const tierDiscounts = {
    trade: 0.15,
    commercial: 0.20,
    atelier: 0.25
  };

  function recalculate() {
    const area = Number(slider.value) || 1800;
    const config = typeMultipliers[currentType] || typeMultipliers.resi;
    const discount = tierDiscounts[currentTier] || 0.15;

    if (areaDisplay) {
      areaDisplay.textContent = `${area.toLocaleString()} sq.ft`;
    }

    const paintLitres = (area / config.paintRate).toFixed(1);
    if (paintVol) paintVol.textContent = `${paintLitres} L`;

    const primerLitres = (area / config.primerRate).toFixed(1);
    if (primerVol) primerVol.textContent = `${primerLitres} L`;

    const packs = Math.max(2, Math.ceil(area / config.hardwareRatio));
    if (hardwarePacks) hardwarePacks.textContent = `${packs} Packs`;

    const baseRetail = Math.round(area * config.rate);
    const savings = Math.round(baseRetail * discount);
    const finalTrade = baseRetail - savings;

    if (retailTotal) retailTotal.textContent = `$${baseRetail.toLocaleString()}`;
    if (tradeTotal) tradeTotal.textContent = `$${finalTrade.toLocaleString()}`;
    if (savingsPill) savingsPill.textContent = `Save $${savings.toLocaleString()}`;

    const auditRetail = document.getElementById('estAuditRetail');
    const auditTierDiscount = document.getElementById('estAuditTierDiscount');
    if (auditRetail) auditRetail.textContent = `$${baseRetail.toLocaleString()}`;
    if (auditTierDiscount) {
      const pct = Math.round(discount * 100);
      const tierName = currentTier === 'atelier' ? 'Atelier Tier' : currentTier === 'commercial' ? 'Commercial Tier' : 'Trade Tier';
      auditTierDiscount.textContent = `-${pct}% ($${savings.toLocaleString()} ${tierName})`;
    }
  }

  slider.addEventListener('input', recalculate);

  typeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      typeTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      currentType = tab.getAttribute('data-type') || 'resi';
      recalculate();
    });
  });

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentTier = btn.getAttribute('data-tier') || 'trade';
      recalculate();
    });
  });

  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      const area = slider.value;
      if (quoteQuantityInput) quoteQuantityInput.value = area;
      if (quoteGradeSelect) {
        quoteGradeSelect.value = currentTier === 'atelier' ? 'architectural' : 'trade';
      }
      if (quoteNotes) {
        quoteNotes.value = `Project Estimator Schedule: ${area} sq.ft (${currentType.toUpperCase()}), ${currentTier.toUpperCase()} tier. Please provide formal trade order voucher.`;
      }
      if (quoteModal) {
        quoteModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  recalculate();
}
