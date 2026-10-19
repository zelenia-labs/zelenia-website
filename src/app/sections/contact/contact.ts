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
      <!-- Ambient Warm Glow matching About Us editorial aesthetic -->
      <div class="ambient-glow glow--contact-warm" aria-hidden="true"></div>

      <!-- Fluid Intertwining Curves Vector Backdrop matching About Us frame dynamics -->
      <div class="contact-fluid-backdrop" aria-hidden="true">
        <svg
          viewBox="0 0 1024 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="fluid-curves-art"
          preserveAspectRatio="xMaxYMin meet"
        >
          <!-- Slate-Blue Fluid Strand -->
          <path
            d="M 394.0,438.5 C 402.3,439.0 427.1,440.9 443.6,441.5 C 460.1,442.1 476.7,442.8 493.2,442.1 C 509.7,441.4 526.3,440.1 542.6,437.5 C 558.9,434.9 575.1,431.5 590.8,426.5 C 606.5,421.5 622.1,415.0 636.7,407.3 C 651.3,399.6 665.4,390.4 678.5,380.4 C 691.6,370.4 705.2,359.8 715.6,347.2 C 726.0,334.6 734.3,319.7 740.6,304.6 C 746.9,289.5 749.0,272.6 753.6,256.7 C 758.2,240.8 759.4,221.8 768.4,209.2 C 777.4,196.6 792.9,187.1 807.6,180.9 C 822.3,174.7 840.6,175.9 856.6,172.0 C 872.6,168.1 891.5,166.5 903.6,157.2 C 915.7,147.9 923.5,131.1 929.1,116.1 C 934.7,101.1 930.8,81.8 937.1,67.4 C 943.4,53.0 954.1,38.8 966.8,29.7 C 979.5,20.6 1005.7,15.8 1013.5,13.0 C 1017.4,11.6 1022.0,5.0 1026.0,0.0"
            stroke="var(--color-slate-blue-tint)"
            stroke-width="3.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <!-- Sage-Grey Fluid Strand -->
          <path
            d="M 557.0,454.5 C 563.8,453.8 584.5,453.7 597.5,450.4 C 610.5,447.1 624.0,442.1 635.0,434.5 C 646.0,426.9 655.9,416.3 663.2,405.1 C 670.5,393.9 674.5,380.4 678.6,367.5 C 682.7,354.6 683.8,340.5 687.9,327.6 C 692.0,314.7 695.7,300.6 703.5,290.0 C 711.3,279.4 722.9,270.4 734.6,264.2 C 746.3,258.0 760.5,256.0 773.8,252.9 C 787.0,249.8 801.8,250.3 814.1,245.6 C 826.4,240.9 839.9,234.4 847.7,224.5 C 855.5,214.6 857.5,199.2 861.0,186.1 C 864.5,173.0 864.4,158.7 868.5,145.8 C 872.6,133.0 876.9,118.6 885.5,109.0 C 894.1,99.4 908.2,94.4 920.4,88.4 C 932.6,82.4 946.6,79.6 958.5,73.2 C 970.4,66.8 983.1,60.1 991.8,50.2 C 1000.5,40.3 1007.4,20.0 1010.5,14.0 C 1012.0,11.0 1015.0,5.0 1018.0,0.0"
            stroke="var(--color-text-accent)"
            stroke-width="3.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- Noise Effect Overlay -->
      <div class="section-noise-overlay" aria-hidden="true"></div>

      <div class="container contact-container">
        <!-- Section Header -->
        <div class="contact-header reveal-on-scroll">
          <span class="contact-tag">Inquiry</span>
          <h2 class="section-heading-twotone contact-title" id="contact-title">
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
