import { Component, input } from '@angular/core';
import { Benchmark } from './diagnostic.model';

@Component({
  selector: 'app-deliverables-list',
  template: `
    <div class="diagnostic-deliverables-panel">
      <div class="panel-header">
        <span class="panel-code">Production Scope</span>
        <h3 class="panel-title">Direct Production Deliverables</h3>
      </div>
      <ul class="deliverables-list" aria-label="Direct sprint deliverables">
        @for (item of deliverables(); track item) {
          <li class="deliverables-list__item">
            <span class="deliverables-check" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span class="deliverables-text">{{ item }}</span>
          </li>
        }
      </ul>
    </div>
  `
})
export class DeliverablesList {
  readonly deliverables = input.required<string[]>();
  readonly benchmarks = input<Benchmark[]>([]);
}
