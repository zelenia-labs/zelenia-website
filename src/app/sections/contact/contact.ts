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
      <div class="container">
        <!-- Header & Availability Badge -->
        <div class="contact-hub-header">
          <div class="availability-pill">
            <span class="pulsating-dot" aria-hidden="true"></span>
            <span
              >Studio Hours: Mon &ndash; Fri, 9:00 AM &ndash; 6:00 PM EST &mdash; Direct Team
              Response</span
            >
          </div>
          <h2 class="section-title" id="contact-title">Three ways to get started.</h2>
          <p class="section-subhead" style="margin-inline: auto;">
            Pick the channel that matches your workflow. Every channel connects directly to the
            engineering and design founders &mdash; zero sales reps, zero account managers.
          </p>
        </div>

        <div class="omnichannel-grid">
          <!-- Channel 1: Structured Scope Request (Signal Forms with Progressive Disclosure) -->
          <div class="channel-card channel-card--blue">
            <span class="channel-card__badge">Project Inquiry</span>
            <h3 class="channel-card__title">Structured Scope Request</h3>
            <p class="channel-card__desc">
              For teams with defined goals. Evaluated directly by the founders within one business
              day.
            </p>

            <form class="contact-form" id="contact-form" novalidate (submit)="onSubmit($event)">
              <div class="form-grid">
                <!-- Full Name -->
                <div class="form-group">
                  <label class="form-label" for="full-name">Your Name</label>
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
                  <label class="form-label" for="work-email">
                    Work Email
                    <span class="form-label__required" aria-hidden="true">*</span>
                  </label>
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

                <!-- Company / Website URL -->
                <div class="form-group">
                  <label class="form-label" for="company-url">
                    Website URL
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

                <!-- Primary Focus / Sprint Objective -->
                <div class="form-group">
                  <label class="form-label" for="primary-focus">Sprint Objective</label>
                  <div class="select-wrapper">
                    <select class="form-select" id="primary-focus" [formField]="contactForm.focus">
                      @for (cat of diagnostic.categories; track cat.id) {
                        <option [value]="cat.id">{{ cat.label }}</option>
                      }
                    </select>
                    <span class="select-arrow" aria-hidden="true">↓</span>
                  </div>
                </div>

                <!-- Progressive Disclosure Toggle -->
                <label class="progressive-toggle-wrapper">
                  <input
                    type="checkbox"
                    id="include-details"
                    class="progressive-checkbox"
                    [formField]="contactForm.includeDetails"
                  />
                  <span class="progressive-toggle-label">
                    Add technical scope &amp; project specifications
                  </span>
                  <span class="progressive-toggle-sub">(Optional detailed intake)</span>
                </label>

                <!-- Expanded Technical Layer (Progressive Disclosure) -->
                @if (contactForm.includeDetails().value()) {
                  <div class="progressive-expansion" id="progressive-expansion">
                    <!-- Estimated Budget Bracket -->
                    <div class="form-group">
                      <label class="form-label" for="budget-bracket"
                        >Estimated Budget Bracket</label
                      >
                      <div class="select-wrapper">
                        <select
                          class="form-select"
                          id="budget-bracket"
                          [formField]="contactForm.budgetBracket"
                        >
                          <option value="<$10k">&lt; $10,000 (Targeted Performance Sprint)</option>
                          <option value="$10k-$20k">
                            $10,000 &ndash; $20,000 (Accessibility &amp; Responsive Sprint)
                          </option>
                          <option value="$20k-$40k">
                            $20,000 &ndash; $40,000 (Complete Modernization)
                          </option>
                          <option value="$40k+">$40,000+ (Custom Bespoke Architecture)</option>
                        </select>
                        <span class="select-arrow" aria-hidden="true">↓</span>
                      </div>
                    </div>

                    <!-- Current Tech Stack -->
                    <div class="form-group">
                      <label class="form-label" for="tech-stack">Current Technical Stack</label>
                      <div class="input-wrapper">
                        <input
                          class="form-input"
                          id="tech-stack"
                          type="text"
                          placeholder="e.g. Angular, React, Next.js, Plain HTML"
                          [formField]="contactForm.techStack"
                        />
                      </div>
                    </div>

                    <!-- Target Launch Timeline -->
                    <div class="form-group">
                      <label class="form-label" for="timeline-select">Target Timeline</label>
                      <div class="select-wrapper">
                        <select
                          class="form-select"
                          id="timeline-select"
                          [formField]="contactForm.timeline"
                        >
                          <option value="immediate">Immediate Priority (Within 2-3 weeks)</option>
                          <option value="next-month">Scheduled (Within 1-2 months)</option>
                          <option value="flexible">Flexible / Planning Phase</option>
                        </select>
                        <span class="select-arrow" aria-hidden="true">↓</span>
                      </div>
                    </div>

                    <!-- Architecture Constraints or Notes -->
                    <div class="form-group">
                      <label class="form-label" for="project-notes"
                        >Primary Bottlenecks or Goals</label
                      >
                      <div class="input-wrapper">
                        <input
                          class="form-input"
                          id="project-notes"
                          type="text"
                          placeholder="e.g. Sub-1.8s LCP required, WCAG 2.2 audit passing"
                          [formField]="contactForm.notes"
                        />
                      </div>
                    </div>
                  </div>
                }
              </div>

              <div class="form-actions" style="flex-direction: column; align-items: flex-start;">
                <button
                  class="btn btn--primary btn--submit"
                  id="submit-btn"
                  type="submit"
                  [class.btn--loading]="intake.isSubmitting()"
                  [disabled]="intake.isSubmitting()"
                >
                  <span class="btn-text">Submit Scope for Technical Review</span>
                  <span class="arrow-indicator" aria-hidden="true">→</span>
                  <span class="btn-spinner" aria-hidden="true"></span>
                </button>
                <span class="sla-guarantee"
                  >Evaluated directly by the founders within one business day.</span
                >
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
                        Thank you. Your inquiry has been routed directly to Alejandro Cuba and
                        Yolanda Santa Cruz. We will review your architecture and respond within 24
                        hours.
                      </p>
                    </div>
                  </div>
                </div>
              }
            </form>
          </div>

          <!-- Channels 2 & 3: Sidebar -->
          <div class="channels-sidebar">
            <!-- Channel 2: 15-Minute Strategy Call -->
            <div class="channel-card channel-card--purple">
              <span class="channel-card__badge">Direct Calendar</span>
              <h3 class="channel-card__title">15-Minute Strategy Call</h3>
              <p class="channel-card__desc">
                Direct calendar booking with the Principal Engineer and Lead Designer. No qualifying
                sales screens.
              </p>
              <ul class="channel-points">
                <li class="channel-point">
                  <span class="channel-point__icon" aria-hidden="true">✓</span>
                  <span>Assess architectural and timeline fit</span>
                </li>
                <li class="channel-point">
                  <span class="channel-point__icon" aria-hidden="true">✓</span>
                  <span>Outline preliminary technical paths</span>
                </li>
                <li class="channel-point">
                  <span class="channel-point__icon" aria-hidden="true">✓</span>
                  <span>Direct founder conversation</span>
                </li>
              </ul>
              <a
                class="btn btn--calendar"
                href="https://calendar.app.google/zelenia-studio"
                target="_blank"
                rel="noopener noreferrer"
                style="inline-size: 100%;"
              >
                <span>Schedule on Calendar</span>
                <span class="arrow-indicator" aria-hidden="true">↗</span>
              </a>
            </div>

            <!-- Channel 3: Asynchronous Direct Messaging -->
            <div class="channel-card channel-card--green">
              <span class="channel-card__badge">Direct Message</span>
              <h3 class="channel-card__title">Direct Founder Messaging</h3>
              <p class="channel-card__desc">
                Need a quick availability check or want to share screenshot links directly? Connect
                via WhatsApp or Telegram.
              </p>
              <a
                class="btn btn--messaging"
                href="https://wa.me/18005550199?text=Hello%20Zelenia%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project%20sprint."
                target="_blank"
                rel="noopener noreferrer"
                style="inline-size: 100%;"
              >
                <span>Open Direct Conversation</span>
                <span class="arrow-indicator" aria-hidden="true">↗</span>
              </a>
            </div>
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
