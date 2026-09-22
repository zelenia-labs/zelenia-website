import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface PageFaqItem {
  q: string;
  a: string;
}

@Component({
  selector: 'app-page-faq',
  imports: [RouterLink],
  template: `
    <section class="site-section faq-section" aria-labelledby="faq-heading">
      <div class="container faq-container">
        <!-- Asymmetric 2-Column Layout -->
        <div class="faq-layout">
          <!-- Left Column: Sticky Editorial Context & Direct Action -->
          <div class="faq-context-col">
            <div class="faq-sticky-panel reveal-on-scroll">
              <div class="faq-badge-wrapper">
                <span class="pulsating-dot" aria-hidden="true"></span>
                <span class="faq-tag">{{ tag() }}</span>
              </div>
              <h2 class="faq-title" id="faq-heading">{{ title() }}</h2>
              @if (subtitle()) {
                <p class="faq-subtitle">{{ subtitle() }}</p>
              }

              <!-- Direct Practitioner Help Card -->
              <div class="faq-help-card">
                <span class="faq-help-card__badge">DIRECT FOUNDER ACCESS</span>
                <p class="faq-help-card__text">{{ contactPrompt() }}</p>
                <a class="btn btn--secondary btn--faq-ask" routerLink="/contact">
                  <span>Ask Us Directly</span>
                  <span class="arrow-indicator" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Right Column: Elevated Interactive Accordion Cards -->
          <div class="faq-accordion-col" role="region" aria-label="Frequently Asked Questions">
            <div class="faq-accordion-list reveal-on-scroll reveal-delay-1">
              @for (item of items(); track item.q; let i = $index) {
                <details class="faq-accordion-item" [open]="i === 0">
                  <summary class="faq-summary">
                    <div class="faq-summary__main">
                      <span class="faq-summary__index">0{{ i + 1 }}</span>
                      <span class="faq-summary__question">{{ item.q }}</span>
                    </div>
                    <div class="faq-summary__toggle" aria-hidden="true">
                      <svg
                        class="faq-toggle-svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line
                          class="toggle-line toggle-line--v"
                          x1="12"
                          y1="5"
                          x2="12"
                          y2="19"
                        ></line>
                        <line
                          class="toggle-line toggle-line--h"
                          x1="5"
                          y1="12"
                          x2="19"
                          y2="12"
                        ></line>
                      </svg>
                    </div>
                  </summary>
                  <div class="faq-answer">
                    <div class="faq-answer__inner">
                      <p class="faq-answer__text">{{ item.a }}</p>
                    </div>
                  </div>
                </details>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class PageFaq {
  readonly tag = input<string>('FAQ');
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly items = input.required<PageFaqItem[]>();
  readonly contactPrompt = input<string>(
    'Have a specific project scope or timeline in mind? Alejandro and Yolanda answer inquiries directly within studio hours.'
  );
}
