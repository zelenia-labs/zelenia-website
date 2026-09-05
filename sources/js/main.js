/**
 * Zelenia Boutique Studio SPA
 * Modern frontier aesthetic & reactive interactions
 */

import { initInteractiveCanvas } from './components/interactive-canvas.js';
import { initPageSpeedAudit } from './components/pagespeed-audit.js';

document.addEventListener('DOMContentLoaded', () => {
  initInteractiveCanvas();
  initPageSpeedAudit();
  initMobileNav();
  initActiveNavObserver();
  initDiagnosticTool();
  initContactForm();
  initScrollReveal();
});

/**
 * Scroll Reveal Transition Engine
 */
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.section-header, .advantage-card, .capability-card, .partner-card, .proof-item, .diagnostic-telemetry, .diagnostic-panel, .contact-form, .hero-audit-widget'
  );

  elements.forEach((el) => el.classList.add('reveal-on-scroll'));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => revealObserver.observe(el));
}

/**
 * Mobile Navigation Drawer & Keyboard Handling
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-navigation');
  if (!toggleBtn || !nav) return;

  const closeMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };

  const openMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking nav links
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        closeMenu();
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggleBtn.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (
      toggleBtn.getAttribute('aria-expanded') === 'true' &&
      !nav.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

/**
 * Active Navigation Link Highlighter using IntersectionObserver
 */
function initActiveNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-nav-link]');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('data-nav-link');
          if (href === `#${id}` || href === `/#${id}`) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/**
 * Interactive Project Diagnostic & Contextual FAQ Engine
 */
function initDiagnosticTool() {
  const dataScript = document.getElementById('diagnostic-json-data');
  if (!dataScript) return;

  let diagnosticData;
  try {
    diagnosticData = JSON.parse(dataScript.textContent);
  } catch (err) {
    console.error('Failed to parse diagnostic data', err);
    return;
  }

  const tabs = Array.from(document.querySelectorAll('.diagnostic-tab'));
  const paceBtns = Array.from(document.querySelectorAll('.diagnostic-pace-btn'));
  const turnaroundEl = document.getElementById('stat-turnaround');
  const paceLabelEl = document.getElementById('stat-pace-label');
  const divisionLabelEl = document.getElementById('stat-division-label');
  const barEngineering = document.getElementById('bar-engineering');
  const barDesign = document.getElementById('bar-design');
  const deliverablesList = document.getElementById('deliverables-list');
  const benchmarksGrid = document.getElementById('benchmarks-grid');
  const faqAccordion = document.getElementById('diagnostic-faq-accordion');
  const focusSelect = document.getElementById('primary-focus');

  let activeCategoryId = 'vitals';
  let activePaceId = 'standard';

  const updateDashboard = () => {
    const category =
      diagnosticData.categories.find((c) => c.id === activeCategoryId) ||
      diagnosticData.categories[0];
    const isAccelerated = activePaceId === 'accelerated';

    // 1. Turnaround & Pace label
    if (turnaroundEl) {
      turnaroundEl.textContent = isAccelerated
        ? category.turnaround.accelerated
        : category.turnaround.standard;
    }
    if (paceLabelEl) {
      paceLabelEl.textContent = isAccelerated
        ? 'Dedicated Intensive Cadence'
        : 'Phased Sprint Cadence';
    }

    // 2. Division of Labor
    if (divisionLabelEl) {
      divisionLabelEl.textContent = category.division.label;
    }
    if (barEngineering && barDesign) {
      barEngineering.style.inlineSize = `${category.division.engineering}%`;
      barEngineering.innerHTML = `<span class="meter-tag">Eng ${category.division.engineering}%</span>`;
      barDesign.style.inlineSize = `${category.division.design}%`;
      barDesign.innerHTML = `<span class="meter-tag">Des ${category.division.design}%</span>`;
    }

    // 3. Deliverables list
    if (deliverablesList) {
      const items = isAccelerated
        ? category.deliverables.accelerated
        : category.deliverables.standard;
      deliverablesList.innerHTML = items
        .map(
          (text) => `
        <li class="deliverables-list__item">
          <span class="deliverables-bullet" aria-hidden="true">—</span>
          <span class="deliverables-text">${escapeHtml(text)}</span>
        </li>`
        )
        .join('');
    }

    // 4. Target Benchmarks
    if (benchmarksGrid) {
      benchmarksGrid.innerHTML = category.benchmarks
        .map(
          (b) => `
        <div class="benchmark-tile">
          <span class="benchmark-tile__metric">${escapeHtml(b.metric)}</span>
          <span class="benchmark-tile__label">${escapeHtml(b.label)}</span>
        </div>`
        )
        .join('');
    }

    // 5. Contextual FAQs Accordion
    if (faqAccordion) {
      faqAccordion.innerHTML = category.faqs
        .map(
          (faq, idx) => `
        <div class="accordion-item">
          <button
            class="accordion-trigger"
            type="button"
            id="faq-trig-${activeCategoryId}-${idx}"
            aria-expanded="${idx === 0 ? 'true' : 'false'}"
            aria-controls="faq-pan-${activeCategoryId}-${idx}"
          >
            <span class="accordion-trigger__text">${escapeHtml(faq.q)}</span>
            <span class="accordion-trigger__icon" aria-hidden="true">${idx === 0 ? '−' : '+'}</span>
          </button>
          <div
            class="accordion-content"
            id="faq-pan-${activeCategoryId}-${idx}"
            role="region"
            aria-labelledby="faq-trig-${activeCategoryId}-${idx}"
            ${idx === 0 ? '' : 'hidden'}
          >
            <div class="accordion-content__inner">
              <p>${escapeHtml(faq.a)}</p>
            </div>
          </div>
        </div>`
        )
        .join('');

      attachAccordionListeners(faqAccordion);
    }

    // 6. Sync with Contact form's Primary Focus dropdown
    if (focusSelect && focusSelect.value !== activeCategoryId) {
      focusSelect.value = activeCategoryId;
    }
  };

  function attachAccordionListeners(container) {
    const triggers = container.querySelectorAll('.accordion-trigger');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        const icon = trigger.querySelector('.accordion-trigger__icon');

        if (isExpanded) {
          trigger.setAttribute('aria-expanded', 'false');
          if (panel) panel.hidden = true;
          if (icon) icon.textContent = '+';
        } else {
          triggers.forEach((otherTrig) => {
            if (otherTrig !== trigger) {
              otherTrig.setAttribute('aria-expanded', 'false');
              const otherPanel = document.getElementById(otherTrig.getAttribute('aria-controls'));
              if (otherPanel) otherPanel.hidden = true;
              const otherIcon = otherTrig.querySelector('.accordion-trigger__icon');
              if (otherIcon) otherIcon.textContent = '+';
            }
          });
          trigger.setAttribute('aria-expanded', 'true');
          if (panel) panel.hidden = false;
          if (icon) icon.textContent = '−';
        }
      });
    });
  }

  if (faqAccordion) {
    attachAccordionListeners(faqAccordion);
  }

  // Category Tabs Interactivity & Keyboard Navigation
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      activeCategoryId = tab.getAttribute('data-category');
      tabs.forEach((t) => {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      updateDashboard();
    });

    tab.addEventListener('keydown', (e) => {
      let nextIndex = null;
      if (e.key === 'ArrowRight') {
        nextIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      }
    });
  });

  // Pace Selector Interactivity
  paceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activePaceId = btn.getAttribute('data-pace');
      paceBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      updateDashboard();
    });
  });

  // Sync Contact Dropdown change back to Diagnostic Tabs
  if (focusSelect) {
    focusSelect.addEventListener('change', () => {
      const selectedTab = tabs.find((t) => t.getAttribute('data-category') === focusSelect.value);
      if (selectedTab) {
        selectedTab.click();
      }
    });
  }
}

/**
 * Direct Intake Contact Form Validation & State
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const emailInput = document.getElementById('work-email');
  const emailError = document.getElementById('email-error');
  const submitBtn = document.getElementById('submit-btn');
  const confirmation = document.getElementById('form-confirmation');

  const validateEmail = () => {
    const value = emailInput.value.trim();
    if (!value) {
      emailError.textContent = 'Please enter your work email address.';
      emailInput.classList.add('is-invalid');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      emailError.textContent = 'Please provide a valid email format (name@company.com).';
      emailInput.classList.add('is-invalid');
      return false;
    }
    emailError.textContent = '';
    emailInput.classList.remove('is-invalid');
    return true;
  };

  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('is-invalid')) {
      validateEmail();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateEmail()) {
      emailInput.focus();
      return;
    }

    submitBtn.classList.add('btn--loading');
    submitBtn.setAttribute('disabled', 'true');

    setTimeout(() => {
      submitBtn.classList.remove('btn--loading');
      submitBtn.removeAttribute('disabled');

      if (confirmation) {
        confirmation.hidden = false;
        confirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      const companyUrl = document.getElementById('company-url');
      const projectNotes = document.getElementById('project-notes');
      if (companyUrl) companyUrl.value = '';
      if (emailInput) emailInput.value = '';
      if (projectNotes) projectNotes.value = '';
    }, 600);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
