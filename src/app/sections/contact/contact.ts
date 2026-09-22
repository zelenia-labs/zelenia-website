import { Component, inject, linkedSignal } from '@angular/core';
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
                <label class="form-label" for="primary-focus">Focus &amp; Timeline</label>
                <div class="select-wrapper">
                  <select class="form-select" id="primary-focus" [formField]="contactForm.focus">
                    @for (cat of diagnostic.categories; track cat.id) {
                      <option [value]="cat.id">
                        {{ cat.label }} ({{ cat.turnaround.standard }})
                      </option>
                    }
                  </select>
                  <span class="select-arrow" aria-hidden="true">↓</span>
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
                      <label class="form-label" for="timeline-pace"
                        >Sprint Cadence / Timeline</label
                      >
                      <div class="select-wrapper">
                        <select
                          class="form-select"
                          id="timeline-pace"
                          [formField]="contactForm.timeline"
                        >
                          <option value="immediate">Accelerated Priority (1–2 wks)</option>
                          <option value="standard">Standard Sprint (2–4 wks)</option>
                          <option value="flexible">Flexible / Planning for Next Quarter</option>
                        </select>
                        <span class="select-arrow" aria-hidden="true">↓</span>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="budget-bracket">Budget Bracket</label>
                      <div class="select-wrapper">
                        <select
                          class="form-select"
                          id="budget-bracket"
                          [formField]="contactForm.budgetBracket"
                        >
                          <option value="<$10k">&lt; $10,000 (Targeted Performance)</option>
                          <option value="$10k-$20k">
                            $10,000 &ndash; $20,000 (Milestone Sprint)
                          </option>
                          <option value="$20k-$40k">
                            $20,000 &ndash; $40,000 (Complete Modernization)
                          </option>
                          <option value="$40k+">$40,000+ (Custom Architecture)</option>
                        </select>
                        <span class="select-arrow" aria-hidden="true">↓</span>
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
                <span class="arrow-indicator" aria-hidden="true">→</span>
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
                      Thank you. Your inquiry has been routed directly to Alejandro Cuba and Yolanda
                      Santa Cruz. We will review your architecture and respond within 24 hours.
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
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }

    @media (min-width: 640px) {
      .form-grid {
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
      }
    }

    .form-group--full {
      grid-column: 1 / -1;
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 0.45rem;
    }

    .form-input,
    .form-select,
    .form-textarea {
      width: 100%;
      background-color: #ffffff;
      border: 1px solid rgba(36, 32, 27, 0.16);
      border-radius: var(--radius-sm);
      padding: 0.75rem 1rem;
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      color: #24201b;
      box-sizing: border-box;
      outline: none;
      transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
    }

    .form-select {
      appearance: none;
      -webkit-appearance: none;
      background-color: #ffffff;
      color: #24201b;
      font-weight: 500;
      cursor: pointer;
      padding-inline-end: 2.25rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .form-select option {
      background-color: #ffffff;
      color: #24201b;
      font-size: 0.9375rem;
      padding: 0.5rem;
    }

    .form-input,
    .form-select {
      height: 45px;
    }

    .form-input::placeholder,
    .form-textarea::placeholder {
      color: #718096;
      opacity: 1;
    }

    .form-textarea {
      min-height: 120px;
      resize: vertical;
    }

    .form-input:focus,
    .form-select:focus,
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

    .select-wrapper {
      position: relative;
    }

    .select-arrow {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: var(--text);
      font-size: 0.85rem;
      font-weight: 600;
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
      box-sizing: border-box;
      display: block;
      background-color: #ffffff;
      border: 1px solid rgba(36, 32, 27, 0.12);
      border-radius: var(--radius-sm);
      padding: 1.5rem clamp(1.25rem, 3vw, 1.75rem);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      margin-top: 0.25rem;
    }

    .progressive-expansion .form-grid {
      width: 100%;
    }

    /* Labels inside the white expansion card must be deep charcoal for high contrast */
    .progressive-expansion .form-label {
      color: #24201b;
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 0.45rem;
    }

    /* Inputs and Selects inside the card */
    .progressive-expansion .form-input,
    .progressive-expansion .form-select {
      background-color: #f7f9fa;
      border: 1px solid rgba(36, 32, 27, 0.2);
      color: #24201b;
      font-weight: 500;
      width: 100%;
    }

    .progressive-expansion .form-input:focus,
    .progressive-expansion .form-select:focus {
      background-color: #ffffff;
      border-color: #24201b;
      box-shadow: 0 0 0 3px rgba(36, 32, 27, 0.12);
    }

    .progressive-expansion .select-arrow {
      color: #24201b;
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
      height: 45px;
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
      }
    });
  }
}
