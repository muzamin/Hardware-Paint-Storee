/**
 * PRODUCTS.JS — FORGELUX Architectural Hardware & Paint Store
 * Client-Side Product Discovery, Filtering, Sorting & Enquiry Workflows
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Elements Cache
  // --------------------------------------------------------------------------
  const searchInput = document.getElementById('productSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const sortSelect = document.getElementById('catalogSortSelect');
  const resetAllBtn = document.getElementById('resetAllFiltersBtn');
  const filterPills = document.querySelectorAll('.filter-pill');
  const visibleCountEl = document.getElementById('visibleCount');
  const emptyState = document.getElementById('catalogEmptyState');
  const emptyStateResetBtn = document.getElementById('emptyStateResetBtn');
  
  // Category counts
  const countAllEl = document.getElementById('countAll');
  const countToolsEl = document.getElementById('countTools');
  const countFittingsEl = document.getElementById('countFittings');
  const countPaintsEl = document.getElementById('countPaints');
  const countElectricalsEl = document.getElementById('countElectricals');

  // Category sections & cards
  const categorySections = document.querySelectorAll('.products-category-section');
  const productCards = Array.from(document.querySelectorAll('.product-card'));

  // Product Enquiry Modal Elements
  const enquiryModal = document.getElementById('productEnquiryModalBackdrop');
  const enquiryCloseBtn = document.getElementById('productEnquiryModalClose');
  const enquiryForm = document.getElementById('productEnquiryForm');
  const enquiryModalProductName = document.getElementById('enquiryModalProductName');
  const enquiryModalCategoryName = document.getElementById('enquiryModalCategoryName');
  const enquiryHiddenProduct = document.getElementById('enquiryHiddenProduct');
  const enquiryHiddenCategory = document.getElementById('enquiryHiddenCategory');
  const enquiryClientName = document.getElementById('enquiryClientName');
  const enquiryClientEmail = document.getElementById('enquiryClientEmail');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const enquirySuccessNotice = document.getElementById('enquirySuccessNotice');
  const submitEnquiryBtn = document.getElementById('submitEnquiryBtn');

  // Active state
  let currentFilter = 'all';
  let currentSearch = '';
  let currentSort = 'featured';

  // Store original card order for featured sorting
  const originalCardOrder = new Map();
  productCards.forEach((card, index) => {
    originalCardOrder.set(card, index);
  });

  // --------------------------------------------------------------------------
  // 2. Filter & Search Logic
  // --------------------------------------------------------------------------
  function applyFiltersAndSort() {
    const query = currentSearch.trim().toLowerCase();
    let totalVisible = 0;
    const categoryCounts = {
      all: 0,
      tools: 0,
      fittings: 0,
      paints: 0,
      electricals: 0
    };

    // Calculate match for every card
    productCards.forEach(card => {
      const cardCat = card.getAttribute('data-category') || '';
      const cardName = (card.getAttribute('data-name') || '').toLowerCase();
      const cardSub = (card.getAttribute('data-sub') || '').toLowerCase();
      const cardTitle = (card.querySelector('.product-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.product-desc')?.textContent || '').toLowerCase();

      // Check text search
      const matchesSearch = !query || 
        cardName.includes(query) || 
        cardSub.includes(query) || 
        cardTitle.includes(query) || 
        cardDesc.includes(query);

      // Check category pill
      const matchesCategory = currentFilter === 'all' || cardCat === currentFilter;

      if (matchesSearch) {
        categoryCounts.all++;
        if (categoryCounts[cardCat] !== undefined) {
          categoryCounts[cardCat]++;
        }
      }

      if (matchesSearch && matchesCategory) {
        card.style.display = '';
        totalVisible++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update section visibility
    categorySections.forEach(section => {
      const sectionCat = section.getAttribute('data-section-category');
      const visibleInThisSection = section.querySelectorAll(`.product-card:not([style*="display: none"])`).length;

      if (currentFilter === 'all') {
        section.style.display = visibleInThisSection > 0 ? '' : 'none';
      } else if (sectionCat === currentFilter) {
        section.style.display = visibleInThisSection > 0 ? '' : 'none';
      } else {
        section.style.display = 'none';
      }
    });

    // Update Counter Elements
    if (visibleCountEl) visibleCountEl.textContent = totalVisible;
    if (countAllEl) countAllEl.textContent = categoryCounts.all;
    if (countToolsEl) countToolsEl.textContent = categoryCounts.tools;
    if (countFittingsEl) countFittingsEl.textContent = categoryCounts.fittings;
    if (countPaintsEl) countPaintsEl.textContent = categoryCounts.paints;
    if (countElectricalsEl) countElectricalsEl.textContent = categoryCounts.electricals;

    // Toggle Empty State
    if (emptyState) {
      if (totalVisible === 0) {
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
      }
    }

    // Toggle Clear button visibility
    if (clearSearchBtn) {
      clearSearchBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    // Apply Sorting within each visible grid
    applySorting();
  }

  // --------------------------------------------------------------------------
  // 3. Sorting Implementation
  // --------------------------------------------------------------------------
  function applySorting() {
    const grids = document.querySelectorAll('.product-grid');
    grids.forEach(grid => {
      const cardsInGrid = Array.from(grid.children);

      cardsInGrid.sort((a, b) => {
        if (currentSort === 'name-asc') {
          const nameA = a.querySelector('.product-title')?.textContent.trim() || '';
          const nameB = b.querySelector('.product-title')?.textContent.trim() || '';
          return nameA.localeCompare(nameB);
        } else if (currentSort === 'name-desc') {
          const nameA = a.querySelector('.product-title')?.textContent.trim() || '';
          const nameB = b.querySelector('.product-title')?.textContent.trim() || '';
          return nameB.localeCompare(nameA);
        } else {
          // featured or category: maintain standard order
          return (originalCardOrder.get(a) || 0) - (originalCardOrder.get(b) || 0);
        }
      });

      // Append in sorted order
      cardsInGrid.forEach(card => grid.appendChild(card));
    });
  }

  // --------------------------------------------------------------------------
  // 4. Event Listeners for Filters
  // --------------------------------------------------------------------------
  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      applyFiltersAndSort();
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        currentSearch = '';
        searchInput.focus();
      }
      applyFiltersAndSort();
    });
  }

  // Sort dropdown change
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applySorting();
    });
  }

  // Category filter pills click
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      currentFilter = pill.getAttribute('data-filter') || 'all';
      applyFiltersAndSort();
    });
  });

  // Reset all filters button
  function resetAllFilters() {
    currentFilter = 'all';
    currentSearch = '';
    currentSort = 'featured';

    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'featured';

    filterPills.forEach(pill => {
      if (pill.getAttribute('data-filter') === 'all') {
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
      } else {
        pill.classList.remove('active');
        pill.setAttribute('aria-selected', 'false');
      }
    });

    applyFiltersAndSort();
  }

  if (resetAllBtn) resetAllBtn.addEventListener('click', resetAllFilters);
  if (emptyStateResetBtn) emptyStateResetBtn.addEventListener('click', resetAllFilters);

  // Category Nav Cards (Section 02 links)
  const categoryNavCards = document.querySelectorAll('.category-nav-card[data-cat-link]');
  categoryNavCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const targetCat = card.getAttribute('data-cat-link');
      if (targetCat) {
        // Find matching pill
        const matchingPill = document.querySelector(`.filter-pill[data-filter="${targetCat}"]`);
        if (matchingPill) {
          filterPills.forEach(p => {
            p.classList.remove('active');
            p.setAttribute('aria-selected', 'false');
          });
          matchingPill.classList.add('active');
          matchingPill.setAttribute('aria-selected', 'true');
          currentFilter = targetCat;
          applyFiltersAndSort();
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Product Enquiry Modal Workflow
  // --------------------------------------------------------------------------
  function openEnquiryModal(productName, categoryName) {
    if (!enquiryModal) return;

    if (enquiryModalProductName) enquiryModalProductName.textContent = productName || 'General Catalog Item';
    if (enquiryModalCategoryName) enquiryModalCategoryName.textContent = categoryName || 'Store Item';
    if (enquiryHiddenProduct) enquiryHiddenProduct.value = productName || '';
    if (enquiryHiddenCategory) enquiryHiddenCategory.value = categoryName || '';

    // Reset error messages and banner
    if (nameError) nameError.classList.remove('visible');
    if (emailError) emailError.classList.remove('visible');
    if (enquirySuccessNotice) enquirySuccessNotice.style.display = 'none';
    if (submitEnquiryBtn) {
      submitEnquiryBtn.disabled = false;
      submitEnquiryBtn.textContent = 'Submit Product Enquiry';
    }

    enquiryModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Auto-focus first input after animation
    setTimeout(() => {
      if (enquiryClientName) enquiryClientName.focus();
    }, 100);
  }

  function closeEnquiryModal() {
    if (!enquiryModal) return;
    enquiryModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Open Enquiry buttons on product cards & CTAs
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-enquiry-modal');
    if (btn) {
      e.preventDefault();
      const prod = btn.getAttribute('data-product') || 'Selected Architectural Product';
      const cat = btn.getAttribute('data-category') || 'Catalog Selection';
      openEnquiryModal(prod, cat);
    }
  });

  // Close Enquiry modal button
  if (enquiryCloseBtn) {
    enquiryCloseBtn.addEventListener('click', closeEnquiryModal);
  }

  // Backdrop click close
  if (enquiryModal) {
    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) {
        closeEnquiryModal();
      }
    });
  }

  // ESC key listener for modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (enquiryModal && enquiryModal.style.display === 'flex') {
        closeEnquiryModal();
      }
    }
  });

  // Form Validation & Submission
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameVal = enquiryClientName ? enquiryClientName.value.trim() : '';
      const emailVal = enquiryClientEmail ? enquiryClientEmail.value.trim() : '';

      if (!nameVal) {
        if (nameError) nameError.classList.add('visible');
        isValid = false;
      } else {
        if (nameError) nameError.classList.remove('visible');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        if (emailError) emailError.classList.add('visible');
        isValid = false;
      } else {
        if (emailError) emailError.classList.remove('visible');
      }

      if (!isValid) return;

      // Simulate sending enquiry
      if (submitEnquiryBtn) {
        submitEnquiryBtn.disabled = true;
        submitEnquiryBtn.textContent = 'Transmitting Enquiry...';
      }

      setTimeout(() => {
        if (enquirySuccessNotice) {
          enquirySuccessNotice.style.display = 'flex';
        }
        if (submitEnquiryBtn) {
          submitEnquiryBtn.textContent = 'Enquiry Transmitted ✓';
        }
        setTimeout(() => {
          closeEnquiryModal();
          enquiryForm.reset();
        }, 2500);
      }, 600);
    });
  }

  // --------------------------------------------------------------------------
  // 6. Interactive 3D Discipline Showcase Carousel
  // --------------------------------------------------------------------------
  function initProductsHeroCarousel() {
    const carouselStage = document.getElementById('carouselStage');
    const cards = Array.from(document.querySelectorAll('.products-showcase-card'));
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    const carouselWrap = document.getElementById('productsHeroCarousel');

    if (!carouselStage || cards.length < 2) return;

    let currentIndex = 0;
    const totalCards = cards.length;
    let autoTimer = null;

    function renderCarousel(newIndex) {
      currentIndex = (newIndex % totalCards + totalCards) % totalCards;
      const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
      const nextIndex = (currentIndex + 1) % totalCards;

      cards.forEach((card, idx) => {
        card.classList.remove('is-active', 'is-prev', 'is-next');
        if (idx === currentIndex) {
          card.classList.add('is-active');
          card.setAttribute('aria-hidden', 'false');
          card.tabIndex = 0;
        } else if (idx === prevIndex) {
          card.classList.add('is-prev');
          card.setAttribute('aria-hidden', 'true');
          card.tabIndex = -1;
        } else if (idx === nextIndex) {
          card.classList.add('is-next');
          card.setAttribute('aria-hidden', 'true');
          card.tabIndex = -1;
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('is-active');
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.classList.remove('is-active');
          dot.removeAttribute('aria-current');
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        renderCarousel(currentIndex - 1);
        resetAutoTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        renderCarousel(currentIndex + 1);
        resetAutoTimer();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        renderCarousel(idx);
        resetAutoTimer();
      });
    });

    // Clicking side cards brings them to the center
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        // Only trigger slide change if clicking a side card (not button inside active card)
        if (card.classList.contains('is-prev')) {
          e.preventDefault();
          renderCarousel(currentIndex - 1);
          resetAutoTimer();
        } else if (card.classList.contains('is-next')) {
          e.preventDefault();
          renderCarousel(currentIndex + 1);
          resetAutoTimer();
        }
      });
    });

    // Keyboard navigation
    if (carouselWrap) {
      carouselWrap.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          renderCarousel(currentIndex - 1);
          resetAutoTimer();
        } else if (e.key === 'ArrowRight') {
          renderCarousel(currentIndex + 1);
          resetAutoTimer();
        }
      });

      // Pause on hover
      carouselWrap.addEventListener('mouseenter', () => {
        clearInterval(autoTimer);
      });
      carouselWrap.addEventListener('mouseleave', () => {
        startAutoTimer();
      });
    }

    function startAutoTimer() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        renderCarousel(currentIndex + 1);
      }, 7000);
    }

    function resetAutoTimer() {
      startAutoTimer();
    }

    // Initial render & timer
    renderCarousel(0);
    startAutoTimer();
  }

  // Initialize interactive carousel
  initProductsHeroCarousel();

  // Initialize filters on first load
  applyFiltersAndSort();
});
