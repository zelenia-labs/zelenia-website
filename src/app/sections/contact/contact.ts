import { Component, inject, linkedSignal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { ContactIntake } from './contact-intake';
import { ContactInquiry } from './contact.model';
import { DiagnosticState } from '../diagnostic/diagnostic-state';
import { ScrollReveal } from '../../ui/motion/scroll-reveal';
import { PagespeedClient } from '../hero/pagespeed-client';

@Component({
  selector: 'app-contact',
  imports: [FormField, ScrollReveal],
  template: `
    <section class="site-section contact-section" id="contact" aria-labelledby="contact-title">
      <div class="container" appScrollReveal>
        <div class="contact-card">
          <div class="contact-card__header">
            <span class="section-tag">Let's Connect</span>
            <h2 class="section-title" id="contact-title">
              Let's build something wonderful together.
            </h2>
            <p class="section-subhead">
              Have a project in mind, an architectural challenge to untangle, or a design system to
              bring to life? Connect directly with Alejandro and Yolanda &mdash; zero sales reps,
              zero agency layers.
            </p>
          </div>

          <form class="contact-form" id="contact-form" novalidate (submit)="onSubmit($event)">
            <div class="form-grid">
              <!-- Company URL -->
              <div class="form-group">
                <label class="form-label" for="company-url">
                  Company or Website URL
                  <span class="form-label__optional">(Optional)</span>
                </label>
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

              <!-- Work Email -->
              <div class="form-group">
                <label class="form-label" for="work-email">
                  Work Email
                  <span class="form-label__required" aria-hidden="true">*</span>
                </label>
                <div class="input-wrapper">
                  <input
                    class="form-input"
                    id="work-email"
                    type="email"
                    placeholder="partner@company.com"
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

              <!-- Primary Focus Selector -->
              <div class="form-group form-group--full">
                <label class="form-label" for="primary-focus">Primary Focus Challenge</label>
                <div class="select-wrapper">
                  <select class="form-select" id="primary-focus" [formField]="contactForm.focus">
                    @for (cat of diagnostic.categories; track cat.id) {
                      <option [value]="cat.id">{{ cat.label }}</option>
                    }
                  </select>
                  <span class="select-arrow" aria-hidden="true">↓</span>
                </div>
              </div>

              <!-- Additional Context / Notes -->
              <div class="form-group form-group--full">
                <label class="form-label" for="project-notes">
                  Additional Context or Architectural Constraints
                  <span class="form-label__optional">(Optional)</span>
                </label>
                <div class="textarea-wrapper">
                  <textarea
                    class="form-textarea"
                    id="project-notes"
                    rows="3"
                    placeholder="Share your current stack, primary pain points, target timeline, or benchmark goals..."
                    [formField]="contactForm.notes"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button
                class="btn btn--primary btn--submit"
                id="submit-btn"
                type="submit"
                [class.btn--loading]="intake.isSubmitting()"
                [disabled]="intake.isSubmitting()"
              >
                <span class="btn-text">Say Hello to the Partners</span>
                <span class="arrow-indicator" aria-hidden="true">→</span>
                <span class="btn-spinner" aria-hidden="true"></span>
              </button>
            </div>

            <!-- Submission Confirmation Banner -->
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
                      Santacruz. We will review your architecture and respond within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            }
          </form>

          <div class="reassurance-footer">
            <p class="reassurance-text">
              <span class="reassurance-prefix">[ DIRECT ENGAGEMENT ] </span>
              Zero sales representatives or account managers. You will consult directly with the
              engineering and design partners.
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Contact {
  readonly intake = inject(ContactIntake);
  readonly diagnostic = inject(DiagnosticState);
  readonly pagespeed = inject(PagespeedClient);

  protected readonly model = linkedSignal<string, ContactInquiry>({
    source: this.pagespeed.targetUrl,
    computation: (heroUrl, previous) => ({
      companyUrl: heroUrl || (previous?.value.companyUrl ?? ''),
      workEmail: previous?.value.workEmail ?? '',
      focus: previous?.value.focus ?? this.diagnostic.activeCategoryId(),
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
          companyUrl: '',
          workEmail: '',
          focus: this.diagnostic.activeCategoryId(),
          notes: ''
        });
        this.contactForm().reset();
      }
    });
  }
}
