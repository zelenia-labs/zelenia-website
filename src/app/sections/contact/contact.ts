import { Component, computed, HostListener, inject, linkedSignal, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { ContactIntake } from './contact-intake';
import { ContactInquiry } from './contact.model';
import { DiagnosticState } from '../diagnostic/diagnostic-state';
import { PagespeedClient } from '../hero/pagespeed-client';

@Component({
  selector: 'app-contact',
  imports: [FormField],
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

              <!-- Primary Focus / Timeline -->
              <div class="form-group">
                <label class="form-label" for="trigger-primary-focus">Focus &amp; Timeline</label>
                <div class="select-wrapper custom-select-wrapper">
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

                  <!-- Custom Dropdown Trigger -->
                  <button
                    type="button"
                    class="custom-select-trigger"
                    id="trigger-primary-focus"
                    aria-haspopup="listbox"
                    [attr.aria-expanded]="openDropdown() === 'focus'"
                    [title]="currentFocusLabel()"
                    aria-controls="listbox-primary-focus"
                    (click)="toggleDropdown('focus', $event)"
                    (keydown)="onTriggerKeydown($event, 'focus')"
                  >
                    <span class="custom-select-value">{{ currentFocusLabel() }}</span>
                    <svg
                      class="custom-select-arrow"
                      [class.is-open]="openDropdown() === 'focus'"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 4.5L6 8L9.5 4.5"
                        stroke="currentColor"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>

                  <!-- Custom Dropdown Menu -->
                  @if (openDropdown() === 'focus') {
                    <div
                      class="custom-select-menu"
                      id="listbox-primary-focus"
                      role="listbox"
                      aria-labelledby="trigger-primary-focus"
                    >
                      @for (opt of focusOptions(); track opt.value; let i = $index) {
                        <button
                          type="button"
                          class="custom-select-option"
                          role="option"
                          [id]="'opt-focus-' + i"
                          [attr.aria-selected]="model().focus === opt.value"
                          [class.is-selected]="model().focus === opt.value"
                          (click)="selectOption('focus', opt.value, 'primary-focus', $event)"
                        >
                          <span class="custom-option-label">{{ opt.label }}</span>
                          @if (model().focus === opt.value) {
                            <svg
                              class="custom-option-check"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M2.5 7.5L5.5 10.5L11.5 4"
                                stroke="#24201b"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          }
                        </button>
                      }
                    </div>
                  }
                </div>
              </div>

              <!-- Progressive Disclosure Toggle -->
              <div class="form-group form-group--full">
                <label class="progressive-toggle-wrapper">
                  <input
                    type="checkbox"
                    id="include-details"
                    class="progressive-checkbox"
                    [formField]="contactForm.includeDetails"
                  />
                  <span class="progressive-toggle-label">
                    Add budget bracket, timeline &amp; stack details
                  </span>
                </label>
              </div>

              <!-- Expanded Technical Layer -->
              @if (contactForm.includeDetails().value()) {
                <div class="progressive-expansion form-group--full" id="progressive-expansion">
                  <div class="form-grid">
                    <div class="form-group">
                      <label class="form-label" for="trigger-timeline-pace"
                        >Sprint Cadence / Timeline</label
                      >
                      <div class="select-wrapper custom-select-wrapper">
                        <!-- Native select for form model & test compatibility -->
                        <select
                          class="sr-only-select"
                          id="timeline-pace"
                          tabindex="-1"
                          aria-hidden="true"
                          [formField]="contactForm.timeline"
                          (change)="onNativeSelectChange('timeline', $event)"
                        >
                          @for (opt of timelineOptions; track opt.value) {
                            <option [value]="opt.value">{{ opt.label }}</option>
                          }
                        </select>

                        <!-- Custom Dropdown Trigger -->
                        <button
                          type="button"
                          class="custom-select-trigger custom-select-trigger--nested"
                          id="trigger-timeline-pace"
                          aria-haspopup="listbox"
                          [attr.aria-expanded]="openDropdown() === 'timeline'"
                          [title]="currentTimelineLabel()"
                          aria-controls="listbox-timeline-pace"
                          (click)="toggleDropdown('timeline', $event)"
                          (keydown)="onTriggerKeydown($event, 'timeline')"
                        >
                          <span class="custom-select-value">{{ currentTimelineLabel() }}</span>
                          <svg
                            class="custom-select-arrow"
                            [class.is-open]="openDropdown() === 'timeline'"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M2.5 4.5L6 8L9.5 4.5"
                              stroke="currentColor"
                              stroke-width="1.75"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>

                        <!-- Custom Dropdown Menu -->
                        @if (openDropdown() === 'timeline') {
                          <div
                            class="custom-select-menu"
                            id="listbox-timeline-pace"
                            role="listbox"
                            aria-labelledby="trigger-timeline-pace"
                          >
                            @for (opt of timelineOptions; track opt.value; let i = $index) {
                              <button
                                type="button"
                                class="custom-select-option"
                                role="option"
                                [id]="'opt-timeline-' + i"
                                [attr.aria-selected]="model().timeline === opt.value"
                                [class.is-selected]="model().timeline === opt.value"
                                (click)="
                                  selectOption('timeline', opt.value, 'timeline-pace', $event)
                                "
                              >
                                <span class="custom-option-label">{{ opt.label }}</span>
                                @if (model().timeline === opt.value) {
                                  <svg
                                    class="custom-option-check"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M2.5 7.5L5.5 10.5L11.5 4"
                                      stroke="#24201b"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                }
                              </button>
                            }
                          </div>
                        }
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="trigger-budget-bracket">Budget Bracket</label>
                      <div class="select-wrapper custom-select-wrapper">
                        <!-- Native select for form model & test compatibility -->
                        <select
                          class="sr-only-select"
                          id="budget-bracket"
                          tabindex="-1"
                          aria-hidden="true"
                          [formField]="contactForm.budgetBracket"
                          (change)="onNativeSelectChange('budgetBracket', $event)"
                        >
                          @for (opt of budgetOptions; track opt.value) {
                            <option [value]="opt.value">{{ opt.label }}</option>
                          }
                        </select>

                        <!-- Custom Dropdown Trigger -->
                        <button
                          type="button"
                          class="custom-select-trigger custom-select-trigger--nested"
                          id="trigger-budget-bracket"
                          aria-haspopup="listbox"
                          [attr.aria-expanded]="openDropdown() === 'budget'"
                          [title]="currentBudgetLabel()"
                          aria-controls="listbox-budget-bracket"
                          (click)="toggleDropdown('budget', $event)"
                          (keydown)="onTriggerKeydown($event, 'budget')"
                        >
                          <span class="custom-select-value">{{ currentBudgetLabel() }}</span>
                          <svg
                            class="custom-select-arrow"
                            [class.is-open]="openDropdown() === 'budget'"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M2.5 4.5L6 8L9.5 4.5"
                              stroke="currentColor"
                              stroke-width="1.75"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>

                        <!-- Custom Dropdown Menu -->
                        @if (openDropdown() === 'budget') {
                          <div
                            class="custom-select-menu"
                            id="listbox-budget-bracket"
                            role="listbox"
                            aria-labelledby="trigger-budget-bracket"
                          >
                            @for (opt of budgetOptions; track opt.value; let i = $index) {
                              <button
                                type="button"
                                class="custom-select-option"
                                role="option"
                                [id]="'opt-budget-' + i"
                                [attr.aria-selected]="model().budgetBracket === opt.value"
                                [class.is-selected]="model().budgetBracket === opt.value"
                                (click)="
                                  selectOption('budgetBracket', opt.value, 'budget-bracket', $event)
                                "
                              >
                                <span class="custom-option-label">{{ opt.label }}</span>
                                @if (model().budgetBracket === opt.value) {
                                  <svg
                                    class="custom-option-check"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M2.5 7.5L5.5 10.5L11.5 4"
                                      stroke="#24201b"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                }
                              </button>
                            }
                          </div>
                        }
                      </div>
                    </div>

                    <div class="form-group form-group--full">
                      <label class="form-label" for="tech-stack">Current Technical Stack</label>
                      <div class="input-wrapper">
                        <input
                          class="form-input"
                          id="tech-stack"
                          type="text"
                          placeholder="e.g. Angular, React, Next.js, TypeScript"
                          [formField]="contactForm.techStack"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }

              <!-- Project Notes Textarea (h: 120px in design.svg) -->
              <div class="form-group form-group--full">
                <label class="form-label" for="project-notes">Tell us about your project</label>
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
      background: linear-gradient(135deg, #95afb5 0%, #829da3 100%);
      color: #ffffff;
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
      background-color: #b5bf9c;
      opacity: 0.7;
      filter: blur(140px);
      bottom: -120px;
      right: -100px;
    }

    .glow--contact-charcoal {
      width: 618px;
      height: 618px;
      background-color: #6a7370;
      opacity: 0.21;
      filter: blur(90px);
      top: -80px;
      left: -120px;
    }

    .glow--contact-sand {
      width: 541px;
      height: 541px;
      background-color: #f2e5c8;
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
      color: #d5dfe1;
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
      color: #ffffff;
      margin-bottom: 0.45rem;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      background-color: #ffffff;
      border: 1px solid rgba(36, 32, 27, 0.16);
      border-radius: var(--radius-sm);
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      color: #24201b;
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
      color: #718096;
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
      background-color: #ffffff;
      color: #24201b;
      border-color: #24201b;
      box-shadow: 0 0 0 3px rgba(36, 32, 27, 0.18);
    }

    .form-input.is-invalid {
      border-color: #e11d48;
    }

    .form-error {
      display: block;
      margin-top: 0.35rem;
      font-size: 0.8rem;
      color: #ffdde4;
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
      background-color: #ffffff;
      border: 1px solid rgba(36, 32, 27, 0.16);
      border-radius: var(--radius-sm);
      padding: 0 1rem;
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      font-weight: 500;
      color: #24201b;
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
      border-color: rgba(36, 32, 27, 0.32);
    }

    .custom-select-trigger:focus-visible,
    .custom-select-trigger[aria-expanded='true'] {
      border-color: #24201b;
      box-shadow: 0 0 0 3px rgba(36, 32, 27, 0.18);
      background-color: #ffffff;
    }

    .custom-select-trigger--nested {
      background-color: #f7f9fa;
      border: 1px solid rgba(36, 32, 27, 0.2);
    }

    .custom-select-trigger--nested:focus-visible,
    .custom-select-trigger--nested[aria-expanded='true'] {
      border-color: #24201b;
      box-shadow: 0 0 0 3px rgba(36, 32, 27, 0.12);
      background-color: #ffffff;
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
      color: #24201b;
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
      background-color: #ffffff;
      border: 1px solid rgba(36, 32, 27, 0.14);
      border-radius: 10px;
      padding: 0.375rem;
      box-shadow:
        0 16px 36px -6px rgba(12, 15, 20, 0.16),
        0 4px 12px rgba(12, 15, 20, 0.08);
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
      color: #24201b;
      line-height: 1.35;
      user-select: none;
      transition:
        background-color var(--transition-fast),
        color var(--transition-fast);
    }

    .custom-select-option:hover {
      background-color: #f4f5f6;
      color: #0c0f14;
    }

    .custom-select-option.is-selected {
      background-color: rgba(149, 175, 181, 0.16);
      color: #24201b;
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

    .progressive-toggle-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      color: #ffffff;
      font-size: 0.875rem;
      font-weight: 550;
      background-color: rgba(255, 255, 255, 0.16);
      padding: 0.65rem 1.15rem;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255, 255, 255, 0.28);
      transition: background-color var(--transition-fast);
    }

    .progressive-toggle-wrapper:hover {
      background-color: rgba(255, 255, 255, 0.24);
    }

    .progressive-toggle-label {
      color: #ffffff;
      font-weight: 550;
      font-size: 0.875rem;
    }

    .progressive-checkbox {
      accent-color: #24201b;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    /* Progressive Expansion Card: high-contrast, full-width, perfectly readable */
    .progressive-expansion {
      grid-column: 1 / -1;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      display: block;
      background-color: #ffffff;
      border: 1px solid rgba(36, 32, 27, 0.12);
      border-radius: var(--radius-sm);
      padding: 1.5rem clamp(1.25rem, 3vw, 1.75rem);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      margin-top: 0.25rem;
      container-type: inline-size;
      container-name: expansion;
    }

    .progressive-expansion .form-grid {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 1.25rem;
    }

    @media (min-width: 680px) {
      .progressive-expansion .form-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.25rem;
      }
    }

    @container expansion (min-width: 480px) {
      .progressive-expansion .form-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.25rem;
      }
    }

    /* Labels inside the white expansion card must be deep charcoal for high contrast */
    .progressive-expansion .form-label {
      color: #24201b;
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 0.45rem;
    }

    /* Inputs inside the card */
    .progressive-expansion .form-input {
      background-color: #f7f9fa;
      border: 1px solid rgba(36, 32, 27, 0.2);
      color: #24201b;
      font-weight: 500;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .progressive-expansion .form-input:focus {
      background-color: #ffffff;
      border-color: #24201b;
      box-shadow: 0 0 0 3px rgba(36, 32, 27, 0.12);
    }

    .progressive-expansion .form-input::placeholder {
      color: #718096;
      opacity: 1;
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
      color: rgba(255, 255, 255, 0.85);
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
      background-color: #ffffff;
      color: var(--text);
      font-size: 0.95rem;
      font-weight: 550;
      border-radius: var(--radius-pill);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      transition: background-color var(--transition-fast);
      white-space: nowrap;
    }

    .btn--pill-submit:hover:not(:disabled) {
      background-color: #f4f5f6;
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
      background-color: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.25);
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
      color: #ffffff;
      line-height: 1;
    }

    .confirmation-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 0.25rem 0;
    }

    .confirmation-body {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      line-height: 1.5;
    }
  `
})
export class Contact {
  readonly intake = inject(ContactIntake);
  readonly diagnostic = inject(DiagnosticState);
  readonly pagespeed = inject(PagespeedClient);

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

  readonly openDropdown = signal<'focus' | 'timeline' | 'budget' | null>(null);

  readonly focusOptions = computed(() =>
    this.diagnostic.categories.map((cat) => ({
      value: cat.id,
      label: `${cat.label} (${cat.turnaround.standard})`
    }))
  );

  readonly currentFocusLabel = computed(() => {
    const currentVal = this.model().focus;
    const match = this.focusOptions().find((opt) => opt.value === currentVal);
    return (
      match?.label ?? this.focusOptions()[0]?.label ?? 'Performance Engineering Sprint (2 Weeks)'
    );
  });

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
    computation: (heroUrl, previous) => ({
      fullName: previous?.value.fullName ?? '',
      companyUrl: heroUrl || (previous?.value.companyUrl ?? ''),
      workEmail: previous?.value.workEmail ?? '',
      focus: previous?.value.focus ?? this.diagnostic.activeCategoryId(),
      includeDetails: previous?.value.includeDetails ?? false,
      budgetBracket: previous?.value.budgetBracket ?? '$10k-$20k',
      techStack: previous?.value.techStack ?? '',
      timeline: previous?.value.timeline ?? 'immediate',
      notes: previous?.value.notes ?? ''
    })
  });

  protected readonly contactForm = form(this.model, (s) => {
    required(s.workEmail, { message: 'Please enter your work email address.' });
    email(s.workEmail, { message: 'Please provide a valid email format (name@company.com).' });
  });

  toggleDropdown(name: 'focus' | 'timeline' | 'budget', event?: MouseEvent): void {
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

  onTriggerKeydown(event: KeyboardEvent, name: 'focus' | 'timeline' | 'budget'): void {
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

  private cycleOption(name: 'focus' | 'timeline' | 'budget', step: number): void {
    let options: { value: string; label: string }[];
    let field: 'focus' | 'timeline' | 'budgetBracket';
    let selectId: string;

    if (name === 'focus') {
      options = this.focusOptions();
      field = 'focus';
      selectId = 'primary-focus';
    } else if (name === 'timeline') {
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
