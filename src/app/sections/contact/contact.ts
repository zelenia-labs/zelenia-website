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
