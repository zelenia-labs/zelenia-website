import { Component, input } from '@angular/core';
import { DivisionOfLabor } from './diagnostic.model';

@Component({
  selector: 'app-telemetry-panel',
  template: `
    <div class="diagnostic-telemetry">
      <div class="telemetry-cell telemetry-cell--turnaround">
        <span class="telemetry-label">[ ESTIMATED TURNAROUND ]</span>
        <div class="telemetry-value-row">
          <span class="telemetry-value">{{ turnaround() }}</span>
        </div>
        <span class="telemetry-sub">{{ paceLabel() }}</span>
      </div>

      <div class="telemetry-cell telemetry-cell--division">
        <div class="telemetry-division-header">
          <span class="telemetry-label">[ DIVISION OF LABOR ]</span>
          <span class="telemetry-ratio">{{ division().label }}</span>
        </div>
        <div class="division-meter" aria-label="Division of labor visual bar">
          <div
            class="division-meter__eng"
            [style.inline-size.%]="division().engineering"
            title="Engineering: Architecture &amp; Code"
          >
            <span class="meter-tag">Eng {{ division().engineering }}%</span>
          </div>
          <div
            class="division-meter__design"
            [style.inline-size.%]="division().design"
            title="Design: UI/UX &amp; Visual Systems"
          >
            <span class="meter-tag">Des {{ division().design }}%</span>
          </div>
        </div>
        <div class="division-meter__legend">
          <span class="meter-legend-item meter-legend-item--eng">Architecture &amp; Code</span>
          <span class="meter-legend-item meter-legend-item--design"
            >UI/UX &amp; Visual Systems</span
          >
        </div>
      </div>
    </div>
  `
})
export class TelemetryPanel {
  readonly turnaround = input.required<string>();
  readonly paceLabel = input.required<string>();
  readonly division = input.required<DivisionOfLabor>();
}
