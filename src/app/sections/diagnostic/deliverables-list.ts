import { Component, input } from '@angular/core';
import { Benchmark } from './diagnostic.model';

@Component({
  selector: 'app-deliverables-list',
  template: `
    <div class="diagnostic-grid">
      <!-- Deliverables Card -->
      <div class="diagnostic-panel diagnostic-panel--deliverables">
        <div class="panel-header">
          <span class="panel-code">[ DELIVERABLES ]</span>
          <h3 class="panel-title">Direct Production Deliverables</h3>
        </div>
        <ul class="deliverables-list">
          @for (item of deliverables(); track item) {
            <li class="deliverables-list__item">
              <span class="deliverables-bullet" aria-hidden="true">—</span>
              <span class="deliverables-text">{{ item }}</span>
            </li>
          }
        </ul>
      </div>

      <!-- Benchmarks Card -->
      <div class="diagnostic-panel diagnostic-panel--benchmarks">
        <div class="panel-header">
          <span class="panel-code">[ TELEMETRY TARGETS ]</span>
          <h3 class="panel-title">Target Benchmark Outputs</h3>
        </div>
        <div class="benchmarks-grid">
          @for (bench of benchmarks(); track bench.label) {
            <div class="benchmark-tile">
              <span class="benchmark-tile__metric">{{ bench.metric }}</span>
              <span class="benchmark-tile__label">{{ bench.label }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class DeliverablesList {
  readonly deliverables = input.required<string[]>();
  readonly benchmarks = input.required<Benchmark[]>();
}
