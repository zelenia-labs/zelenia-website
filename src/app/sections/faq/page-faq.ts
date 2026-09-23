import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface PageFaqItem {
  q: string;
  a: string;
}

@Component({
  selector: 'app-page-faq',
  imports: [RouterLink],
  template: `
    <section class="site-section faq-section" id="faq" aria-labelledby="faq-heading">
      <div class="container faq-container">
        <div class="faq-layout">
          <!-- Left Column: FAQ Anchor & Context -->
          <div class="faq-left-col reveal-on-scroll">
            <span class="section-tag-subtle">{{ tag() }}</span>
            <h2 class="faq-hero-heading" id="faq-heading">FAQ</h2>
            @if (subtitle()) {
              <p class="faq-hero-subhead">{{ subtitle() }}</p>
            } @else if (title()) {
              <p class="faq-hero-subhead">{{ title() }} {{ titleSecondary() }}</p>
            }
          </div>

          <!-- Right Column: Clean Accordion Stack & Direct Inquiry Dock -->
          <div
            class="faq-right-col reveal-on-scroll reveal-delay-1"
            role="region"
            aria-label="FAQ Accordion"
          >
            <div class="faq-accordion-stack">
              @for (item of items(); track item.q; let i = $index) {
                <div class="faq-accordion-card" [class.is-expanded]="isOpen(i)">
                  <button
                    type="button"
                    class="faq-accordion-trigger"
                    [id]="'faq-trigger-' + i"
                    [attr.aria-expanded]="isOpen(i)"
                    [attr.aria-controls]="'faq-panel-' + i"
                    (click)="toggleItem(i)"
                  >
                    <span class="faq-question-text">{{ item.q }}</span>
                    <span class="faq-accordion-icon" aria-hidden="true">+</span>
                  </button>

                  <div
                    class="faq-accordion-body"
                    [id]="'faq-panel-' + i"
                    role="region"
                    [attr.aria-labelledby]="'faq-trigger-' + i"
                    [attr.aria-hidden]="!isOpen(i)"
                  >
                    <div class="faq-accordion-inner">
                      <p class="faq-answer-text">{{ item.a }}</p>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Direct Inquiry Card below FAQ items -->
            <div class="faq-inquiry-card">
              <div class="faq-inquiry-info">
                <p class="faq-inquiry-text">
                  {{
                    contactPrompt() ||
                      "Have a specific project scope, timeline, or a question you didn't see answered here? We reply directly within studio hours."
                  }}
                </p>
              </div>
              <a class="btn btn--primary faq-inquiry-btn" routerLink="/contact">
                <span>Ask Us Directly</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class PageFaq {
  readonly tag = input<string>('FAQ');
  readonly title = input<string>('');
  readonly titleSecondary = input<string>('');
  readonly subtitle = input<string>('');
  readonly items = input.required<PageFaqItem[]>();
  readonly contactPrompt = input<string>('');

  // Single-item accordion: Only one question open at a time (first item open initially)
  readonly openIndex = signal<number | null>(0);

  toggleItem(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }

  isOpen(index: number): boolean {
    return this.openIndex() === index;
  }
}
