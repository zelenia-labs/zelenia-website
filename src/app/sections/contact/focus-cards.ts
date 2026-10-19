import { Component, inject, input, output } from '@angular/core';
import { DiagnosticState } from '../diagnostic/diagnostic-state';
import { CategoryId } from '../diagnostic/diagnostic.model';

@Component({
  selector: 'app-focus-cards',
  template: `
    <div class="focus-selector" role="radiogroup" aria-labelledby="focus-selector-legend">
      <div class="focus-selector-header">
        <span class="focus-selector-title" id="focus-selector-legend">Focus &amp; Timeline</span>
        <span class="focus-selector-hint">Select the sprint deliverable tier that fits your roadmap</span>
      </div>

      <div class="focus-cards-grid">
        @for (cat of state.categories; track cat.id) {
          <label
            class="focus-card"
            [class.is-selected]="value() === cat.id"
            [attr.for]="'focus-radio-' + cat.id"
          >
            <!-- Native accessible radio button -->
            <input
              type="radio"
              class="sr-only-radio"
              [id]="'focus-radio-' + cat.id"
              name="primary-focus-group"
              [value]="cat.id"
              [checked]="value() === cat.id"
              (change)="selectOption(cat.id)"
            />

            <div class="focus-card-header">
              <div class="focus-radio-circle" aria-hidden="true">
                <span class="focus-radio-dot"></span>
              </div>
              <span class="focus-turnaround-badge">{{ cat.turnaround.standard }}</span>
            </div>

            <div class="focus-card-body">
              <h4 class="focus-card-title">{{ cat.label }}</h4>
              <p class="focus-card-tagline">{{ cat.tagline }}</p>
            </div>

            <div class="focus-card-footer">
              <span class="focus-card-division">{{ cat.division.label }}</span>
              <span class="focus-card-floor">{{ cat.investmentFloor }}</span>
            </div>
          </label>
        }
      </div>
    </div>
  `,
  styles: `
    .focus-selector {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
    }

    .focus-selector-header {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .focus-selector-title {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--dark-ink);
      letter-spacing: -0.01em;
    }

    .focus-selector-hint {
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
    }

    .focus-cards-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 0.875rem;
      width: 100%;
      box-sizing: border-box;
    }

    @media (min-width: 600px) {
      .focus-cards-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
      }
    }

    .focus-card {
      background-color: var(--color-white);
      border: 2px solid transparent;
      border-radius: var(--radius-sm);
      padding: 1.15rem 1.25rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.85rem;
      cursor: pointer;
      user-select: none;
      position: relative;
      box-shadow: 0 2px 8px var(--color-obsidian-faint);
      transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast),
        transform var(--transition-fast),
        background-color var(--transition-fast);
      box-sizing: border-box;
    }

    .focus-card:hover {
      border-color: var(--color-ink-strong);
      box-shadow: 0 6px 18px var(--color-obsidian-subtle);
      transform: translateY(-1px);
    }

    .focus-card.is-selected {
      border-color: var(--dark-ink);
      box-shadow:
        0 8px 24px var(--color-ink-subtle),
        0 0 0 1px var(--dark-ink);
      background-color: var(--color-white);
    }

    /* Native radio input visually hidden with accessibility preservation */
    .sr-only-radio {
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

    .sr-only-radio:focus-visible + .focus-card-header .focus-radio-circle,
    .focus-card:has(.sr-only-radio:focus-visible) {
      outline: 2px solid var(--dark-ink);
      outline-offset: 2px;
    }

    .focus-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .focus-radio-circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid var(--color-ink-strong);
      background-color: var(--color-white);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition:
        border-color var(--transition-fast),
        background-color var(--transition-fast);
    }

    .focus-card.is-selected .focus-radio-circle {
      border-color: var(--dark-ink);
      background-color: var(--color-white);
    }

    .focus-radio-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--dark-ink);
      transform: scale(0);
      opacity: 0;
      transition:
        transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.15s ease;
    }

    .focus-card.is-selected .focus-radio-dot {
      transform: scale(1);
      opacity: 1;
    }

    .focus-turnaround-badge {
      display: inline-flex;
      align-items: center;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-pill);
      background-color: var(--color-surface-hover);
      color: var(--color-slate-reading);
      border: 1px solid var(--color-ink-subtle);
      transition:
        background-color var(--transition-fast),
        color var(--transition-fast),
        border-color var(--transition-fast);
    }

    .focus-card.is-selected .focus-turnaround-badge {
      background-color: var(--dark-ink);
      color: var(--color-white);
      border-color: var(--dark-ink);
    }

    .focus-card-body {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .focus-card-title {
      font-size: 0.95rem;
      font-weight: 650;
      color: var(--dark-ink);
      margin: 0;
      line-height: 1.3;
      letter-spacing: -0.015em;
    }

    .focus-card-tagline {
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.45;
    }

    .focus-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      padding-top: 0.65rem;
      border-top: 1px solid var(--color-ink-subtle);
      font-size: 0.75rem;
    }

    .focus-card-division {
      color: var(--color-text-muted);
      font-weight: 500;
    }

    .focus-card-floor {
      font-weight: 650;
      color: var(--dark-ink);
      letter-spacing: -0.01em;
    }
  `
})
export class FocusCards {
  readonly state = inject(DiagnosticState);
  readonly value = input<string>('vitals');
  readonly valueChange = output<string>();

  selectOption(id: CategoryId): void {
    this.valueChange.emit(id);
  }
}
