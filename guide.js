/**
 * FORGELUX — Guide Page & Detail Pages Script
 * Interactive Shade Filtering, Precision Project Calculator, FAQ Accordions, and Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initShadeFilter();
  initProjectCalculator();
  initFaqAccordion();
  initGuideSubNav();
  initGuideVisualHover();
});

/* ==========================================================================
   1. Section 01: Paint Shade Guide Category Filtering
   ========================================================================== */
function initShadeFilter() {
  const filterBtns = document.querySelectorAll('.shade-filter-btn');
  const swatchCards = document.querySelectorAll('.swatch-card');

  if (!filterBtns.length || !swatchCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterCategory = btn.dataset.shadeFilter || 'all';

      swatchCards.forEach(card => {
        const cardCategory = card.dataset.category || '';
        if (filterCategory === 'all' || cardCategory.includes(filterCategory)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   2. Section 05: Project Planning & Quantity Calculator
   Formula:
   Paintable Area = (Wall Width × Wall Height × Number of Walls) − Deducted Opening Area
   Estimated Paint Quantity = (Paintable Area × Number of Coats) ÷ Coverage per Litre
   ========================================================================== */
function initProjectCalculator() {
  const widthInput = document.getElementById('calcWallWidth');
  const heightInput = document.getElementById('calcWallHeight');
  const wallsInput = document.getElementById('calcWallCount');
  const deductionInput = document.getElementById('calcDeductions');
  const coverageInput = document.getElementById('calcCoverage');
  const coatPills = document.querySelectorAll('.coat-pill');
  const unitBtns = document.querySelectorAll('.unit-toggle-btn');

  // Outputs
  const grossAreaEl = document.getElementById('calcGrossArea');
  const deductedAreaEl = document.getElementById('calcDeductedArea');
  const netAreaEl = document.getElementById('calcNetPaintableArea');
  const paintQtyEl = document.getElementById('calcEstimatedPaintQty');
  const primerQtyEl = document.getElementById('calcPrimerQty');
  const unitLabels = document.querySelectorAll('.calc-unit-label');
  const volUnitLabels = document.querySelectorAll('.calc-vol-unit');
  const addQuoteBtn = document.getElementById('calcAddToQuote');

  if (!widthInput || !heightInput || !wallsInput || !netAreaEl) return;

  let currentUnit = 'metric'; // 'metric' (m / L) or 'imperial' (ft / Gal)
  let currentCoats = 2;

  function calculate() {
    // 1. Sanitize & Validate inputs
    let w = parseFloat(widthInput.value) || 0;
    let h = parseFloat(heightInput.value) || 0;
    let walls = parseInt(wallsInput.value, 10) || 1;
    let deduct = parseFloat(deductionInput.value) || 0;
    let coverage = parseFloat(coverageInput.value) || (currentUnit === 'metric' ? 12 : 350);

    w = Math.max(0.1, w);
    h = Math.max(0.1, h);
    walls = Math.max(1, walls);
    deduct = Math.max(0, deduct);
    coverage = Math.max(1, coverage);

    // 2. Exact Formula:
    // Gross Area = Width × Height × Number of Walls
    const grossArea = w * h * walls;

    // Deducted opening allowance cannot exceed gross area
    const actualDeduct = Math.min(grossArea * 0.9, deduct);

    // Paintable Area = Gross Area - Deducted Opening Area
    const paintableArea = Math.max(1, grossArea - actualDeduct);

    // Estimated Paint Quantity = (Paintable Area × Number of Coats) ÷ Coverage per Litre
    const totalCoverageNeeded = paintableArea * currentCoats;
    const estimatedPaintQty = Math.ceil((totalCoverageNeeded / coverage) * 10) / 10;

    // Primer volume (single coat bonding over substrate)
    const primerCoverage = currentUnit === 'metric' ? 14 : 400;
    const estimatedPrimerQty = Math.ceil((paintableArea / primerCoverage) * 10) / 10;

    // 3. Update DOM with formatting
    const areaUnitStr = currentUnit === 'metric' ? 'm²' : 'sq ft';
    const volUnitStr = currentUnit === 'metric' ? 'L' : 'Gal';

    if (grossAreaEl) grossAreaEl.textContent = `${grossArea.toFixed(1)} ${areaUnitStr}`;
    if (deductedAreaEl) deductedAreaEl.textContent = `-${actualDeduct.toFixed(1)} ${areaUnitStr}`;
    if (netAreaEl) netAreaEl.textContent = `${paintableArea.toFixed(1)} ${areaUnitStr}`;
    if (paintQtyEl) paintQtyEl.textContent = `${estimatedPaintQty.toFixed(1)} ${volUnitStr}`;
    if (primerQtyEl) primerQtyEl.textContent = `${estimatedPrimerQty.toFixed(1)} ${volUnitStr}`;

    unitLabels.forEach(el => el.textContent = areaUnitStr);
    volUnitLabels.forEach(el => el.textContent = volUnitStr);
  }

  // Real-time input listeners with numeric validation
  [widthInput, heightInput, wallsInput, deductionInput, coverageInput].forEach(inp => {
    inp.addEventListener('input', calculate);
    inp.addEventListener('change', calculate);
  });

  // Configurable coat selector
  coatPills.forEach(pill => {
    pill.addEventListener('click', () => {
      coatPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCoats = parseInt(pill.dataset.coats, 10) || 2;
      calculate();
    });
  });

  // Metric vs Imperial unit toggle
  unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      unitBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const newUnit = btn.dataset.unit || 'metric';

      if (newUnit !== currentUnit) {
        currentUnit = newUnit;
        if (currentUnit === 'imperial') {
          // Convert m to ft
          widthInput.value = (parseFloat(widthInput.value) * 3.28084).toFixed(1);
          heightInput.value = (parseFloat(heightInput.value) * 3.28084).toFixed(1);
          deductionInput.value = (parseFloat(deductionInput.value) * 10.7639).toFixed(1);
          coverageInput.value = '350';
        } else {
          // Convert ft to m
          widthInput.value = (parseFloat(widthInput.value) / 3.28084).toFixed(1);
          heightInput.value = (parseFloat(heightInput.value) / 3.28084).toFixed(1);
          deductionInput.value = (parseFloat(deductionInput.value) / 10.7639).toFixed(1);
          coverageInput.value = '12';
        }
        calculate();
      }
    });
  });

  // Add to Quote Modal integration
  if (addQuoteBtn) {
    addQuoteBtn.addEventListener('click', () => {
      const modalBackdrop = document.getElementById('quoteModalBackdrop');
      const catSelect = document.getElementById('quoteCategory');
      const qtyInput = document.getElementById('quoteQuantity');
      const notesInput = document.getElementById('quoteNotes');

      if (catSelect) catSelect.value = 'paint';
      if (qtyInput && netAreaEl) {
        qtyInput.value = Math.round(parseFloat(netAreaEl.textContent) || 150);
      }
      if (notesInput && paintQtyEl && primerQtyEl) {
        const areaStr = netAreaEl.textContent;
        const paintStr = paintQtyEl.textContent;
        const primerStr = primerQtyEl.textContent;
        notesInput.value = `Calculated Guide Spec: ${areaStr} net paintable surface. Requires approx ${paintStr} finish paint (${currentCoats} coats) + ${primerStr} primer.`;
      }

      if (modalBackdrop) {
        modalBackdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }

      if (typeof showToast === 'function') {
        showToast(`Calculated paint quantity transferred to Project Quote!`);
      }
    });
  }

  // Initial calculation run
  calculate();
}

/* ==========================================================================
   3. FAQ Accordion Functionality
   ========================================================================== */
function initFaqAccordion() {
  const faqCards = document.querySelectorAll('.faq-card');
  if (!faqCards.length) return;

  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');

      // Close other open cards for clean single-view accordion
      faqCards.forEach(c => {
        c.classList.remove('is-open');
        const b = c.querySelector('.faq-question-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        card.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   4. Guide Quick Sub-Navigation Active Scroll Spy
   ========================================================================== */
function initGuideSubNav() {
  const navLinks = document.querySelectorAll('.guide-nav-link');
  if (!navLinks.length) return;

  const sections = Array.from(navLinks)
    .map(link => {
      const id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        return document.querySelector(id);
      }
      return null;
    })
    .filter(Boolean);

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = '#' + sec.id;

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   5. Interactive Subtle 3D Depth Hover on Color Guide Composition
   ========================================================================== */
function initGuideVisualHover() {
  const composition = document.getElementById('guideVisualComposition');
  if (!composition) return;

  const cardPrimary = composition.querySelector('.guide-card-primary');
  const cardSecondary = composition.querySelector('.guide-card-secondary');

  if (cardPrimary) {
    cardPrimary.addEventListener('mouseenter', () => {
      composition.classList.add('hover-primary');
      composition.classList.remove('hover-secondary');
    });
    cardPrimary.addEventListener('mouseleave', () => {
      composition.classList.remove('hover-primary');
    });
  }

  if (cardSecondary) {
    cardSecondary.addEventListener('mouseenter', () => {
      composition.classList.add('hover-secondary');
      composition.classList.remove('hover-primary');
    });
    cardSecondary.addEventListener('mouseleave', () => {
      composition.classList.remove('hover-secondary');
    });
  }

  let rafId = null;

  composition.addEventListener('mousemove', (e) => {
    const rect = composition.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      composition.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
  });

  composition.addEventListener('mouseleave', () => {
    if (rafId) cancelAnimationFrame(rafId);
    composition.classList.remove('hover-primary');
    composition.classList.remove('hover-secondary');
    composition.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    composition.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    setTimeout(() => {
      composition.style.transition = '';
    }, 500);
  });
}
