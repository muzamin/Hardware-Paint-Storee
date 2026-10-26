/**
 * FORGELUX — Pricing Page Script (pricing.js)
 * Billing Cycle Toggle, Dynamic Pricing Updates, Plan-To-Quote Integration, and FAQ Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
  initPricingBillingToggle();
  initPricingPlanSelect();
  initPricingFaqAccordion();
  initPricingVisualHover();
});

/* ==========================================================================
   1. Billing Cycle Toggle (Project / Monthly vs. Annual Retainer - Save 20%)
   ========================================================================== */
function initPricingBillingToggle() {
  const toggleBtn = document.getElementById('pricingBillingToggle');
  const labelMonthly = document.getElementById('labelMonthly');
  const labelAnnual = document.getElementById('labelAnnual');
  const proAmount = document.getElementById('proPlanAmount');
  const proPeriod = document.getElementById('proPlanPeriod');
  const proSavings = document.getElementById('proPlanSavings');
  const entAmount = document.getElementById('entPlanAmount');
  const entPeriod = document.getElementById('entPlanPeriod');
  const entSavings = document.getElementById('entPlanSavings');

  if (!toggleBtn) return;

  let isAnnual = false;

  function updatePricing() {
    if (isAnnual) {
      toggleBtn.classList.add('is-annual');
      toggleBtn.setAttribute('aria-checked', 'true');
      if (labelMonthly) labelMonthly.classList.remove('active');
      if (labelAnnual) labelAnnual.classList.add('active');

      // Pro Plan: $199/mo (billed annually: $2,388/yr, saving $600)
      if (proAmount) proAmount.textContent = '199';
      if (proPeriod) proPeriod.textContent = '/ month, billed annually';
      if (proSavings) proSavings.textContent = '★ Save $600/year with annual trade commitment';

      // Enterprise: $649/mo (billed annually: $7,788/yr, saving $1,800)
      if (entAmount) entAmount.textContent = '649';
      if (entPeriod) entPeriod.textContent = '/ month, billed annually';
      if (entSavings) entSavings.textContent = '★ Save $1,800/year + free site crane staging';
    } else {
      toggleBtn.classList.remove('is-annual');
      toggleBtn.setAttribute('aria-checked', 'false');
      if (labelMonthly) labelMonthly.classList.add('active');
      if (labelAnnual) labelAnnual.classList.remove('active');

      // Pro Plan: $249/mo
      if (proAmount) proAmount.textContent = '249';
      if (proPeriod) proPeriod.textContent = '/ month per active project';
      if (proSavings) proSavings.textContent = 'Flexible project-by-project billing';

      // Enterprise: $799/mo
      if (entAmount) entAmount.textContent = '799';
      if (entPeriod) entPeriod.textContent = '/ month per master contract';
      if (entSavings) entSavings.textContent = 'Includes dedicated field engineering desk';
    }
  }

  toggleBtn.addEventListener('click', () => {
    isAnnual = !isAnnual;
    updatePricing();
  });

  if (labelMonthly) {
    labelMonthly.addEventListener('click', () => {
      isAnnual = false;
      updatePricing();
    });
  }

  if (labelAnnual) {
    labelAnnual.addEventListener('click', () => {
      isAnnual = true;
      updatePricing();
    });
  }
}

/* ==========================================================================
   2. Plan Selection to Project Quote Modal Integration
   ========================================================================== */
function initPricingPlanSelect() {
  const planBtns = document.querySelectorAll('.select-pricing-plan');
  const quoteModal = document.getElementById('quoteModalBackdrop');
  const quoteGradeSelect = document.getElementById('quoteGrade');
  const quoteNotes = document.getElementById('quoteNotes');

  if (!planBtns.length || !quoteModal) return;

  planBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planTier = btn.dataset.planTier || 'trade';
      const planTitle = btn.dataset.planTitle || 'Pro Atelier & Contractor';

      // Set matching dropdown option in Home 1 Quote Modal
      if (quoteGradeSelect) {
        if (planTier === 'residential') {
          quoteGradeSelect.value = 'retail';
        } else if (planTier === 'pro') {
          quoteGradeSelect.value = 'trade';
        } else if (planTier === 'enterprise') {
          quoteGradeSelect.value = 'architectural';
        }
      }

      // Pre-populate project notes
      if (quoteNotes) {
        quoteNotes.value = `Selected Pricing Tier: ${planTitle}. Please prepare customized commercial specification terms and material delivery schedule.`;
      }

      // Open Quote Modal
      quoteModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      const firstInput = quoteModal.querySelector('input, select');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    });
  });
}

/* ==========================================================================
   3. FAQs Accordion Functionality
   ========================================================================== */
function initPricingFaqAccordion() {
  const faqCards = document.querySelectorAll('.pricing-faq-card');
  if (!faqCards.length) return;

  faqCards.forEach(card => {
    const btn = card.querySelector('.pricing-faq-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');

      // Close other cards for clean single accordion view
      faqCards.forEach(c => {
        c.classList.remove('is-open');
        const b = c.querySelector('.pricing-faq-btn');
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
   4. Interactive Subtle 3D Depth Hover on Composition
   ========================================================================== */
function initPricingVisualHover() {
  const showcase = document.getElementById('pricingShowcase');
  if (!showcase) return;

  const cardsTrio = document.getElementById('pricingCardsTrio');
  const tierCards = showcase.querySelectorAll('.pricing-tier-card');

  tierCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      tierCards.forEach(c => {
        if (c !== card) c.style.opacity = '0.82';
      });
    });

    card.addEventListener('mouseleave', () => {
      tierCards.forEach(c => {
        c.style.opacity = '';
      });
    });
  });

  if (cardsTrio) {
    let rafId = null;
    cardsTrio.addEventListener('mousemove', (e) => {
      const rect = cardsTrio.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cardsTrio.style.transform = `perspective(1200px) rotateY(${x * 3.5}deg) rotateX(${-y * 3.5}deg)`;
      });
    });

    cardsTrio.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      cardsTrio.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      cardsTrio.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
      setTimeout(() => {
        cardsTrio.style.transition = '';
      }, 500);
    });
  }

  // Smooth scroll and focus on tier selection
  const selectTier02Btn = document.getElementById('heroSelectTier02Btn');
  if (selectTier02Btn) {
    selectTier02Btn.addEventListener('click', (e) => {
      e.preventDefault();
      const proPlanCard = document.querySelector('.pricing-card-featured') || document.getElementById('pricing-plans');
      if (proPlanCard) {
        proPlanCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        proPlanCard.classList.add('plan-focus-pulse');
        setTimeout(() => proPlanCard.classList.remove('plan-focus-pulse'), 1800);
      }
    });
  }
}
