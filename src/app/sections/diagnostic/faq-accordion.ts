import { Component, input, signal } from '@angular/core';
import { FaqItem } from './diagnostic.model';

@Component({
  selector: 'app-faq-accordion',
  template: `
    <div class="diagnostic-panel diagnostic-panel--faq">
      <div class="panel-header">
        <span class="panel-code">[ OPERATIONAL DIRECTIVES ]</span>
        <h3 class="panel-title">Contextual Operational FAQs</h3>
      </div>
      <div class="accordion" id="diagnostic-faq-accordion">
        @for (faq of faqs(); track faq.q; let i = $index) {
          <div class="accordion-item">
            <button
              class="accordion-trigger"
              type="button"
              [id]="'faq-trig-' + categoryId() + '-' + i"
              [attr.aria-expanded]="openIndex() === i"
              [attr.aria-controls]="'faq-pan-' + categoryId() + '-' + i"
              (click)="toggle(i)"
            >
              <span class="accordion-trigger__text">{{ faq.q }}</span>
              <span class="accordion-trigger__icon" aria-hidden="true">
                {{ openIndex() === i ? '−' : '+' }}
              </span>
            </button>
            <div
              class="accordion-content"
              [id]="'faq-pan-' + categoryId() + '-' + i"
              role="region"
              [attr.aria-labelledby]="'faq-trig-' + categoryId() + '-' + i"
              [hidden]="openIndex() !== i"
            >
              <div class="accordion-content__inner">
                <p>{{ faq.a }}</p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class FaqAccordion {
  readonly faqs = input.required<FaqItem[]>();
  readonly categoryId = input.required<string>();

  readonly openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }
}
