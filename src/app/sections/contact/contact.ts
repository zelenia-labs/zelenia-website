import { Component, computed, HostListener, inject, linkedSignal, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { FocusCards } from './focus-cards';
import { ContactIntake } from './contact-intake';
import { ContactInquiry } from './contact.model';
import { DiagnosticState } from '../diagnostic/diagnostic-state';
import { PagespeedClient } from '../hero/pagespeed-client';

@Component({
  selector: 'app-contact',
  imports: [FormField, FocusCards],
  template: `
    <section class="site-section contact-section" id="contact" aria-labelledby="contact-title">
      <!-- Ambient Glow Circles matching Screenshot 4 & design.svg -->
      <div class="ambient-glow glow--contact-sage" aria-hidden="true"></div>
      <div class="ambient-glow glow--contact-charcoal" aria-hidden="true"></div>
      <div class="ambient-glow glow--contact-sand" aria-hidden="true"></div>

      <!-- Noise Effect Overlay: Mono, size 0.5, density 100%, color #FFFFFF 15% -->
      <div class="section-noise-overlay" aria-hidden="true"></div>

      <div class="container contact-container">
        <!-- Section Header (Left-Aligned matching design.svg) -->
        <div class="contact-header reveal-on-scroll">
          <span class="contact-tag">Inquiry</span>
          <h2
            class="section-heading-twotone section-heading-twotone--dark contact-title"
            id="contact-title"
          >
            <span class="heading-primary">Tell us</span>
            <span class="heading-secondary">what needs attention</span>
          </h2>
        </div>

        <!-- Contact Form (w: 736px, left-aligned matching design.svg) -->
        <div class="contact-form-card reveal-on-scroll reveal-delay-1">
          <form class="contact-form" id="contact-form" novalidate (submit)="onSubmit($event)">
            <div class="form-grid">
              <!-- Full Name -->
              <div class="form-group">
                <label class="form-label" for="full-name">Name</label>
                <div class="input-wrapper">
                  <input
                    class="form-input"
                    id="full-name"
                    type="text"
                    placeholder="Jane Doe"
                    autocomplete="name"
                    [formField]="contactForm.fullName"
                  />
                </div>
              </div>

              <!-- Work Email -->
              <div class="form-group">
                <label class="form-label" for="work-email">Email</label>
                <div class="input-wrapper">
                  <input
                    class="form-input"
                    id="work-email"
                    type="email"
                    placeholder="jane@company.com"
                    autocomplete="email"
                    spellcheck="false"
                    [class.is-invalid]="
                      contactForm.workEmail().touched() &&
                      contactForm.workEmail().errors().length > 0
                    "
                    [formField]="contactForm.workEmail"
                  />
                </div>
                @if (
                  contactForm.workEmail().touched() && contactForm.workEmail().errors().length > 0
                ) {
                  <span class="form-error" id="email-error" role="alert" aria-live="polite">
                    {{ contactForm.workEmail().errors()[0].message }}
                  </span>
                }
              </div>

              <!-- Website URL -->
              <div class="form-group">
                <label class="form-label" for="company-url">Website / Company</label>
                <div class="input-wrapper">
                  <input
                    class="form-input"
                    id="company-url"
                    type="url"
                    placeholder="https://yourcompany.com"
                    autocomplete="url"
                    spellcheck="false"
                    [formField]="contactForm.companyUrl"
                  />
                </div>
              </div>

              <!-- Primary Focus Cards (Radio Group) -->
              <div class="form-group form-group--full">
                <app-focus-cards
                  [value]="model().focus"
                  (valueChange)="onFocusChange($event)"
                />
                <!-- Native select for form model & test compatibility -->
                <select
                  class="sr-only-select"
                  id="primary-focus"
                  tabindex="-1"
                  aria-hidden="true"
                  [formField]="contactForm.focus"
                  (change)="onNativeSelectChange('focus', $event)"
                >
                  @for (cat of diagnostic.categories; track cat.id) {
                    <option [value]="cat.id">
                      {{ cat.label }} ({{ cat.turnaround.standard }})
                    </option>
                  }
                </select>
              </div>

              <!-- Project Notes Textarea (h: 120px in design.svg) -->
              <div class="form-group form-group--full">
                <label class="form-label" for="project-notes">What do you need help with?</label>
                <div class="textarea-wrapper">
                  <textarea
                    class="form-textarea"
                    id="project-notes"
                    rows="3"
                    placeholder="What challenges are you facing with speed, architecture, or design?"
                    [formField]="contactForm.notes"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Bottom Actions Bar -->
            <div class="form-actions-dock">
              <p class="privacy-note">
                Your information is secure. We execute standard NDAs prior to any codebase review.
              </p>

              <button
                class="btn btn--pill-submit"
                id="submit-btn"
                type="submit"
                [class.btn--loading]="intake.isSubmitting()"
                [disabled]="intake.isSubmitting()"
              >
                <span class="btn-text">Send Inquiry</span>
                <span class="btn-spinner" aria-hidden="true"></span>
              </button>
            </div>

            <!-- Submission Confirmation -->
            @if (intake.isSubmitted()) {
              <div
                class="form-confirmation"
                id="form-confirmation"
                role="status"
                aria-live="polite"
              >
                <div class="confirmation-content">
                  <span class="confirmation-icon" aria-hidden="true">✓</span>
                  <div class="confirmation-text">
                    <h4 class="confirmation-title">Architectural Review Requested</h4>
                    <p class="confirmation-body">
                      Thank you! Your message goes straight to Yolanda and Alejandro. We’ll review
                      your details and get back to you personally within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            }
          </form>
        </div>
      </div>
    </section>
  `,
  styles: `
    .contact-section {
      background: var(--gradient-sage);
      color: var(--color-white);
      padding-block: clamp(5rem, 8vw, 7.5rem);
      position: relative;
      overflow: hidden;
    }

    .contact-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 736px;
      margin-inline: auto;
      position: relative;
      z-index: 2;
    }

    .glow--contact-sage {
      width: 751px;
      height: 751px;
      background-color: var(--color-glow-sage);
      opacity: 0.7;
      filter: blur(140px);
      bottom: -120px;
      right: -100px;
    }

    .glow--contact-charcoal {
      width: 618px;
      height: 618px;
      background-color: var(--color-glow-charcoal);
      opacity: 0.21;
      filter: blur(90px);
      top: -80px;
      left: -120px;
    }

    .glow--contact-sand {
      width: 541px;
      height: 541px;
      background-color: var(--color-glow-sand);
      opacity: 0.135;
      filter: blur(90px);
      top: 35%;
      right: 5%;
    }

    .contact-header {
      text-align: left;
      margin-block-end: clamp(2rem, 3.5vw, 3rem);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    .contact-tag {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-sage-light);
      margin-bottom: 0.75rem;
    }

    .contact-form-card {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .form-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 1.25rem;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    @media (min-width: 640px) {
      .form-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.5rem;
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .form-group--full {
      grid-column: 1 / -1;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-white);
      margin-bottom: 0.45rem;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      background-color: var(--color-white);
      border: 1px solid var(--color-ink-medium);
      border-radius: var(--radius-sm);
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      color: var(--dark-ink);
      box-sizing: border-box;
      outline: none;
      transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
    }

    /* Fixed descender clipping: 48px height + calibrated vertical padding gives full baseline descent room */
    .form-input {
      height: 48px;
      padding: 0.55rem 1rem 0.65rem 1rem;
      line-height: 1.4;
    }

    .form-input::placeholder,
    .form-textarea::placeholder {
      color: var(--color-text-muted-alt);
      opacity: 1;
    }

    .form-textarea {
      min-height: 120px;
      padding: 0.75rem 1rem;
      line-height: 1.5;
      resize: vertical;
    }

    .form-input:focus,
    .form-textarea:focus {
      background-color: var(--color-white);
      color: var(--dark-ink);
      border-color: var(--dark-ink);
      box-shadow: 0 0 0 3px var(--color-ink-medium);
    }

    .form-input.is-invalid {
      border-color: var(--color-rose-alt);
    }

    .form-error {
      display: block;
      margin-top: 0.35rem;
      font-size: 0.8rem;
      color: var(--color-rose-tint);
      font-weight: 500;
    }

    /* Custom Dropdown System */
    .custom-select-wrapper {
      position: relative;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .custom-select-trigger {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      height: 48px;
      background-color: var(--color-white);
      border: 1px solid var(--color-ink-medium);
      border-radius: var(--radius-sm);
      padding: 0 1rem;
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--dark-ink);
      box-sizing: border-box;
      outline: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      user-select: none;
      transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast),
        background-color var(--transition-fast);
    }

    .custom-select-trigger:hover {
      border-color: var(--color-ink-strong);
    }

    .custom-select-trigger:focus-visible,
    .custom-select-trigger[aria-expanded='true'] {
      border-color: var(--dark-ink);
      box-shadow: 0 0 0 3px var(--color-ink-medium);
      background-color: var(--color-white);
    }

    .custom-select-trigger--nested {
      background-color: var(--color-surface-cool-tint);
      border: 1px solid var(--color-ink-medium);
    }

    .custom-select-trigger--nested:focus-visible,
    .custom-select-trigger--nested[aria-expanded='true'] {
      border-color: var(--dark-ink);
      box-shadow: 0 0 0 3px var(--color-ink-subtle);
      background-color: var(--color-white);
    }

    .custom-select-value {
      flex: 1 1 0%;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-inline-end: 0.5rem;
      line-height: 1.4;
    }

    .custom-select-arrow {
      flex-shrink: 0;
      color: var(--dark-ink);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .custom-select-arrow.is-open {
      transform: rotate(180deg);
    }

    /* Custom Floating Menu Listbox */
    .custom-select-menu {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      right: 0;
      z-index: 100;
      background-color: var(--color-white);
      border: 1px solid var(--color-ink-subtle);
      border-radius: 10px;
      padding: 0.375rem;
      box-shadow:
        0 16px 36px -6px var(--color-obsidian-medium),
        0 4px 12px var(--color-obsidian-subtle);
      max-height: 280px;
      overflow-y: auto;
      overscroll-behavior: contain;
      animation: selectMenuIn 0.16s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes selectMenuIn {
      from {
        opacity: 0;
        transform: translateY(-4px) scale(0.99);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .custom-select-option {
      width: 100%;
      border: none;
      background: transparent;
      font-family: var(--font-sans);
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.65rem 0.85rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--dark-ink);
      line-height: 1.35;
      user-select: none;
      transition:
        background-color var(--transition-fast),
        color var(--transition-fast);
    }

    .custom-select-option:hover {
      background-color: var(--color-surface-hover);
      color: var(--color-obsidian-dark);
    }

    .custom-select-option.is-selected {
      background-color: var(--color-sage-subtle);
      color: var(--dark-ink);
      font-weight: 600;
    }

    .custom-option-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .custom-option-check {
      flex-shrink: 0;
    }

    /* Visually hidden native select kept for form model & test sync */
    .sr-only-select {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
      pointer-events: none !important;
      opacity: 0 !important;
    }

    /* Progressive Disclosure Fieldset & Unified Card Architecture */
    .progressive-fieldset {
      grid-column: 1 / -1;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      border: none;
      padding: 0;
      margin: 0;
    }

    .scope-disclosure-card {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      border: 1px solid var(--color-white-medium);
      border-radius: var(--radius-sm);
      background-color: var(--color-white-subtle);
      overflow: hidden;
      transition:
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
    }

    .scope-disclosure-card:hover {
      background-color: var(--color-white-subtle);
      border-color: var(--color-white-strong);
    }

    .scope-disclosure-card.is-expanded {
      background-color: var(--color-white-subtle);
      border-color: var(--color-white-strong);
      box-shadow: 0 4px 18px var(--color-black-faint);
    }

    .scope-disclosure-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.1rem 1.25rem;
      background: transparent;
      border: none;
      color: var(--color-white);
      cursor: pointer;
      text-align: left;
      outline: none;
      user-select: none;
      box-sizing: border-box;
      transition: background-color var(--transition-fast);
    }

    .scope-disclosure-trigger:focus-visible {
      outline: 2px solid var(--color-white);
      outline-offset: -2px;
    }

    /* Custom Checkbox UI */
    .scope-checkbox-ui {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      border: 1.5px solid var(--color-white-strong);
      background-color: var(--color-white-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition:
        background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
        border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.16s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .scope-disclosure-trigger:hover .scope-checkbox-ui {
      border-color: var(--color-white);
      background-color: var(--color-white-medium);
    }

    .scope-checkbox-ui.is-checked {
      background-color: var(--color-white);
      border-color: var(--color-white);
      box-shadow: 0 2px 6px var(--color-black-subtle);
    }

    .scope-check-icon {
      opacity: 0;
      transform: scale(0.6);
      transition:
        transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.15s ease;
    }

    .scope-check-icon.is-active {
      opacity: 1;
      transform: scale(1);
    }

    /* Text Hierarchy */
    .scope-content-block {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      flex: 1;
      min-width: 0;
    }

    .scope-heading-row {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      flex-wrap: wrap;
    }

    .scope-title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--color-white);
      letter-spacing: -0.01em;
      line-height: 1.3;
    }

    .scope-optional-badge {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-white);
      background-color: var(--color-white-medium);
      padding: 0.15rem 0.5rem;
      border-radius: var(--radius-pill);
    }

    .scope-subtitle {
      font-size: 0.8125rem;
      color: var(--color-white-reading);
      line-height: 1.4;
    }

    /* Chevron Indicator */
    .scope-chevron-wrapper {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: var(--color-white-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--color-white);
      transition:
        transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
        background-color var(--transition-fast);
    }

    .scope-disclosure-trigger:hover .scope-chevron-wrapper {
      background-color: var(--color-white-medium);
    }

    .scope-chevron-wrapper.is-expanded {
      transform: rotate(180deg);
    }

    .scope-chevron-icon {
      display: block;
    }

    .sr-only-checkbox {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
      opacity: 0 !important;
    }

    /* Animated Expansion Container (0fr -> 1fr CSS Grid) */
    .progressive-expansion {
      display: grid;
      grid-template-rows: 0fr;
      opacity: 0;
      visibility: hidden;
      transition:
        grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1),
        opacity 240ms ease,
        visibility 300ms;
    }

    .progressive-expansion.is-expanded {
      grid-template-rows: 1fr;
      opacity: 1;
      visibility: visible;
    }

    .progressive-expansion-inner {
      min-height: 0;
      overflow: hidden;
    }

    /* Direct Form Fields: NO nested card / NO box-in-a-box */
    .scope-expanded-body {
      padding: 1.25rem 1.25rem 1.5rem 1.25rem;
      border-top: 1px solid var(--color-white-subtle);
    }

    .scope-expanded-body .form-label {
      color: var(--color-white);
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.45rem;
    }

    .scope-expanded-body .form-input,
    .scope-expanded-body .custom-select-trigger--nested {
      background-color: var(--color-white);
      border: 1px solid var(--color-ink-medium);
      color: var(--dark-ink);
      font-weight: 500;
      width: 100%;
    }

    .form-actions-dock {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      align-items: flex-start;
      margin-top: 0.5rem;
    }

    @media (min-width: 640px) {
      .form-actions-dock {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    .privacy-note {
      font-size: 0.8125rem;
      color: var(--color-white-reading);
      margin: 0;
      max-width: 440px;
      line-height: 1.45;
    }

    .btn--pill-submit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      height: 48px;
      padding-inline: 1.85rem;
      background-color: var(--color-white);
      color: var(--text);
      font-size: 0.95rem;
      font-weight: 550;
      border-radius: var(--radius-pill);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px var(--color-black-subtle);
      transition: background-color var(--transition-fast);
      white-space: nowrap;
    }

    .btn--pill-submit:hover:not(:disabled) {
      background-color: var(--color-surface-hover);
    }

    .btn--pill-submit:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .btn-spinner {
      display: none;
      width: 16px;
      height: 16px;
      border: 2px solid var(--text);
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .btn--loading .btn-spinner {
      display: inline-block;
    }

    .btn--loading .arrow-indicator {
      display: none;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .form-confirmation {
      background-color: var(--color-white-subtle);
      backdrop-filter: blur(8px);
      border: 1px solid var(--color-white-medium);
      border-radius: var(--radius-sm);
      padding: 1.25rem 1.5rem;
      margin-top: 1.5rem;
    }

    .confirmation-content {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .confirmation-icon {
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--color-white);
      line-height: 1;
    }

    .confirmation-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--color-white);
      margin: 0 0 0.25rem 0;
    }

    .confirmation-body {
      font-size: 0.875rem;
      color: var(--color-white-reading);
      margin: 0;
      line-height: 1.5;
    }
  `
})
export class Contact {
  readonly intake = inject(ContactIntake);
  readonly diagnostic = inject(DiagnosticState);
  readonly pagespeed = inject(PagespeedClient);
  private readonly route = inject(ActivatedRoute, { optional: true });

  readonly timelineOptions = [
    { value: 'immediate', label: 'Accelerated Priority (1–2 wks)' },
    { value: 'standard', label: 'Standard Sprint (2–4 wks)' },
    { value: 'flexible', label: 'Flexible / Planning for Next Quarter' }
  ];

  readonly budgetOptions = [
    { value: '<$10k', label: '< $10,000 (Targeted Performance)' },
    { value: '$10k-$20k', label: '$10,000 \u2013 $20,000 (Milestone Sprint)' },
    { value: '$20k-$40k', label: '$20,000 \u2013 $40,000 (Complete Modernization)' },
    { value: '$40k+', label: '$40,000+ (Custom Architecture)' }
  ];

  readonly openDropdown = signal<'timeline' | 'budget' | null>(null);

  readonly currentTimelineLabel = computed(() => {
    const currentVal = this.model().timeline;
    const match = this.timelineOptions.find((opt) => opt.value === currentVal);
    return match?.label ?? this.timelineOptions[0].label;
  });

  readonly currentBudgetLabel = computed(() => {
    const currentVal = this.model().budgetBracket;
    const match = this.budgetOptions.find((opt) => opt.value === currentVal);
    return match?.label ?? this.budgetOptions[1].label;
  });

  protected readonly model = linkedSignal<string, ContactInquiry>({
    source: this.pagespeed.targetUrl,
    computation: (heroUrl, previous) => {
      const queryParamFocus = this.route?.snapshot.queryParams['focus'];
      const initialFocus =
        queryParamFocus && this.diagnostic.categories.some((c) => c.id === queryParamFocus)
          ? queryParamFocus
          : (previous?.value.focus ?? this.diagnostic.activeCategoryId());

      return {
        fullName: previous?.value.fullName ?? '',
        companyUrl: heroUrl || (previous?.value.companyUrl ?? ''),
        workEmail: previous?.value.workEmail ?? '',
        focus: initialFocus,
        includeDetails: previous?.value.includeDetails ?? false,
        budgetBracket: previous?.value.budgetBracket ?? '$10k-$20k',
        techStack: previous?.value.techStack ?? '',
        timeline: previous?.value.timeline ?? 'immediate',
        notes: previous?.value.notes ?? ''
      };
    }
  });

  protected readonly contactForm = form(this.model, (s) => {
    required(s.workEmail, { message: 'Please enter your work email address.' });
    email(s.workEmail, { message: 'Please provide a valid email format (name@company.com).' });
  });

  onFocusChange(id: string): void {
    this.model.update((m) => ({ ...m, focus: id }));
    const select = document.getElementById('primary-focus') as HTMLSelectElement | null;
    if (select && select.value !== id) {
      select.value = id;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  toggleDetails(): void {
    const next = !this.model().includeDetails;
    this.model.update((m) => ({ ...m, includeDetails: next }));
    const cb = document.getElementById('include-details') as HTMLInputElement | null;
    if (cb && cb.checked !== next) {
      cb.checked = next;
      cb.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  onIncludeDetailsChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (target && this.model().includeDetails !== target.checked) {
      this.model.update((m) => ({ ...m, includeDetails: target.checked }));
    }
  }

  toggleDropdown(name: 'timeline' | 'budget', event?: MouseEvent): void {
    event?.stopPropagation();
    this.openDropdown.update((current) => (current === name ? null : name));
  }

  selectOption(
    field: 'focus' | 'timeline' | 'budgetBracket',
    value: string,
    selectId: string,
    event?: MouseEvent
  ): void {
    event?.stopPropagation();
    this.model.update((m) => ({ ...m, [field]: value }));
    const select = document.getElementById(selectId) as HTMLSelectElement | null;
    if (select) {
      select.value = value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    this.openDropdown.set(null);
  }

  onNativeSelectChange(field: 'focus' | 'timeline' | 'budgetBracket', event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target && this.model()[field] !== target.value) {
      this.model.update((m) => ({ ...m, [field]: target.value }));
    }
  }

  onTriggerKeydown(event: KeyboardEvent, name: 'timeline' | 'budget'): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (this.openDropdown() !== name) {
        this.openDropdown.set(name);
      } else {
        this.cycleOption(name, event.key === 'ArrowDown' ? 1 : -1);
      }
    } else if (event.key === 'Escape') {
      if (this.openDropdown() === name) {
        event.preventDefault();
        this.openDropdown.set(null);
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openDropdown.update((current) => (current === name ? null : name));
    }
  }

  private cycleOption(name: 'timeline' | 'budget', step: number): void {
    let options: { value: string; label: string }[];
    let field: 'timeline' | 'budgetBracket';
    let selectId: string;

    if (name === 'timeline') {
      options = this.timelineOptions;
      field = 'timeline';
      selectId = 'timeline-pace';
    } else {
      options = this.budgetOptions;
      field = 'budgetBracket';
      selectId = 'budget-bracket';
    }

    const currentIndex = options.findIndex((opt) => opt.value === this.model()[field]);
    const nextIndex = (currentIndex + step + options.length) % options.length;
    this.selectOption(field, options[nextIndex].value, selectId);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target || !target.closest('.custom-select-wrapper')) {
      this.openDropdown.set(null);
    }
  }

  @HostListener('document:keydown.escape')
  onDocumentEscape(): void {
    this.openDropdown.set(null);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    submit(this.contactForm, async () => {
      const success = await this.intake.submitInquiry(this.model());
      if (success) {
        this.pagespeed.targetUrl.set('');
        this.model.set({
          fullName: '',
          companyUrl: '',
          workEmail: '',
          focus: this.diagnostic.activeCategoryId(),
          includeDetails: false,
          budgetBracket: '$10k-$20k',
          techStack: '',
          timeline: 'immediate',
          notes: ''
        });
        this.contactForm().reset();
        this.openDropdown.set(null);
      }
    });
  }
}
