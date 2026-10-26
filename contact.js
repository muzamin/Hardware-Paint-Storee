/**
 * FORGELUX — Contact Page Script (contact.js)
 * Interactive Department Routing, File Attachment Simulation, and In-Store FAQs
 */

document.addEventListener('DOMContentLoaded', () => {
  initDeptSelector();
  initFileUploadSimulator();
  initContactFormSubmission();
  initContactFaqAccordion();
  initContactOrbitalParallax();
});

/* ==========================================================================
   1. Department Selector Tabs
   ========================================================================== */
function initDeptSelector() {
  const deptBtns = document.querySelectorAll('.dept-pill-btn');
  const deptInput = document.getElementById('selectedDepartment');
  const messageTextarea = document.getElementById('contactMessage');

  if (!deptBtns.length) return;

  const departmentPlaceholders = {
    hardware: 'Please detail required lever models, quantities, finish specifications (e.g. Living Oil-Rubbed Bronze, Satin Brass), and door schedule references...',
    paint: 'Provide your project substrate (plaster, masonry, timber), desired sheen level (Chalk Matte, Eggshell, High Gloss), and RAL/NCS tint references...',
    contractor: 'Indicate your commercial takeoff schedule, pallet volumes, job-site delivery date, and site staging constraints (forklift / crane required)...',
    general: 'How can our materials team assist with your residential, retail, or hospitality project? Detail your inquiries here...'
  };

  deptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      deptBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const deptKey = btn.dataset.dept || 'hardware';
      if (deptInput) {
        deptInput.value = btn.dataset.deptName || 'Architectural Hardware';
      }

      if (messageTextarea && !messageTextarea.value.trim()) {
        messageTextarea.placeholder = departmentPlaceholders[deptKey] || departmentPlaceholders.hardware;
      }
    });
  });
}

/* ==========================================================================
   2. File Attachment Simulation (Specs & Takeoffs Drag & Drop)
   ========================================================================== */
function initFileUploadSimulator() {
  const dropBox = document.getElementById('fileUploadBox');
  const fileInput = document.getElementById('contactAttachment');
  const statusContainer = document.getElementById('fileSelectedStatus');
  const fileNameDisplay = document.getElementById('selectedFileName');
  const removeFileBtn = document.getElementById('removeFileBtn');

  if (!dropBox || !fileInput) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropBox.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropBox.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropBox.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropBox.classList.remove('dragover');
    });
  });

  dropBox.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileSelected(files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      handleFileSelected(fileInput.files[0]);
    }
  });

  function handleFileSelected(file) {
    if (statusContainer && fileNameDisplay) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      fileNameDisplay.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block; vertical-align:middle; margin-right:4px;">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
        </svg>
        <span>${file.name} (${sizeMb} MB)</span>
      `;
      statusContainer.style.display = 'flex';
      dropBox.style.display = 'none';
    }
  }

  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fileInput.value = '';
      if (statusContainer) statusContainer.style.display = 'none';
      if (dropBox) dropBox.style.display = 'block';
    });
  }
}

/* ==========================================================================
   3. Contact Form Submission & Confirmation
   ========================================================================== */
function initContactFormSubmission() {
  const form = document.getElementById('forgeluxContactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const successBanner = document.getElementById('formSuccessBanner');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Routing Inquiry to Store Desk...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;

      if (successBanner) {
        successBanner.style.display = 'block';
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();

      // Reset file upload state
      const statusContainer = document.getElementById('fileSelectedStatus');
      const dropBox = document.getElementById('fileUploadBox');
      if (statusContainer) statusContainer.style.display = 'none';
      if (dropBox) dropBox.style.display = 'block';

      // Reset department selector to first pill
      const deptBtns = document.querySelectorAll('.dept-pill-btn');
      if (deptBtns.length) {
        deptBtns.forEach(b => b.classList.remove('active'));
        deptBtns[0].classList.add('active');
      }
    }, 850);
  });
}

/* ==========================================================================
   4. In-Store FAQs Accordion Functionality
   ========================================================================== */
function initContactFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const collapse = item.querySelector('.faq-body-collapse');

    if (!trigger || !collapse) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        const otherCollapse = otherItem.querySelector('.faq-body-collapse');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        if (otherCollapse) otherCollapse.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        collapse.style.maxHeight = collapse.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   5. Interactive 3D Depth Hover on Contact Orbital Portal
   ========================================================================== */
function initContactOrbitalParallax() {
  const stage = document.getElementById('contactOrbitalStage');
  if (!stage) return;

  let rafId = null;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      stage.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
  });

  stage.addEventListener('mouseleave', () => {
    if (rafId) cancelAnimationFrame(rafId);
    stage.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    stage.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  });

  stage.addEventListener('mouseenter', () => {
    stage.style.transition = 'transform 0.1s ease-out';
  });
}
