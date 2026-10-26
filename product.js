/**
 * PRODUCT.JS — FORGELUX Architectural Hardware & Paint Store
 * Client-Side Product Discovery, Filtering, Sorting & Enquiry Workflows
 * (Mirrors products.js for compatibility with both single and plural naming conventions)
 */

// If products.js has already executed, avoid double registration
if (!window.__FORGELUX_PRODUCTS_INIT__) {
  window.__FORGELUX_PRODUCTS_INIT__ = true;

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
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        applyFiltersAndSort();
      });
    }

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

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        applySorting();
      });
    }

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

    const categoryNavCards = document.querySelectorAll('.category-nav-card[data-cat-link]');
    categoryNavCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const targetCat = card.getAttribute('data-cat-link');
        if (targetCat) {
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

      if (nameError) nameError.classList.remove('visible');
      if (emailError) emailError.classList.remove('visible');
      if (enquirySuccessNotice) enquirySuccessNotice.style.display = 'none';
      if (submitEnquiryBtn) {
        submitEnquiryBtn.disabled = false;
        submitEnquiryBtn.textContent = 'Submit Product Enquiry';
      }

      enquiryModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        if (enquiryClientName) enquiryClientName.focus();
      }, 100);
    }

    function closeEnquiryModal() {
      if (!enquiryModal) return;
      enquiryModal.style.display = 'none';
      document.body.style.overflow = '';
    }

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.open-enquiry-modal');
      if (btn) {
        e.preventDefault();
        const prod = btn.getAttribute('data-product') || 'Selected Architectural Product';
        const cat = btn.getAttribute('data-category') || 'Catalog Selection';
        openEnquiryModal(prod, cat);
      }
    });

    if (enquiryCloseBtn) {
      enquiryCloseBtn.addEventListener('click', closeEnquiryModal);
    }

    if (enquiryModal) {
      enquiryModal.addEventListener('click', (e) => {
        if (e.target === enquiryModal) {
          closeEnquiryModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (enquiryModal && enquiryModal.style.display === 'flex') {
          closeEnquiryModal();
        }
      }
    });

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

    // Initial calculation
    applyFiltersAndSort();
  });
}
