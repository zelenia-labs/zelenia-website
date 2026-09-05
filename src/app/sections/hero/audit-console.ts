import { Component, input } from '@angular/core';
import { AuditResults } from './pagespeed-client';

@Component({
  selector: 'app-audit-console',
  template: `
    @if (results(); as res) {
      <div class="audit-results">
        <div class="audit-results__header">
          <div class="audit-target">
            <span class="audit-target__label">URL ANALYZED:</span>
            <span class="audit-target__url">{{ res.url }}</span>
          </div>
          <div class="audit-badge-wrap">
            <span class="audit-badge">
              {{
                res.isSimulation
                  ? '[ SYNTHETIC AUDIT SIMULATION ]'
                  : '[ GOOGLE PAGESPEED LIVE API ]'
              }}
            </span>
          </div>
        </div>

        @if (res.isSimulation) {
          <div class="audit-simulation-alert">
            <span class="alert-icon" aria-hidden="true">ℹ</span>
            <div class="alert-text">
              <strong>Notice: </strong>
              <span>{{ res.failureReason || 'Origin unreachable.' }}</span>
              Displaying synthetic architectural simulation based on standard modern frontend
              baselines.
            </div>
          </div>
        }

        <!-- 4-Gauge Metric Grid -->
        <div class="audit-gauges-grid">
          <!-- Performance -->
          <div class="gauge-card">
            <div class="gauge-circle" [attr.data-score]="res.scores.perf.status">
              <svg class="gauge-svg" viewBox="0 0 36 36">
                <path
                  class="gauge-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                ></path>
                <path
                  class="gauge-val"
                  [attr.stroke-dasharray]="res.scores.perf.score + ', 100'"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                ></path>
              </svg>
              <span class="gauge-number">{{ res.scores.perf.score }}</span>
            </div>
            <span class="gauge-label">Performance</span>
          </div>

          <!-- Accessibility -->
          <div class="gauge-card">
            <div class="gauge-circle" [attr.data-score]="res.scores.a11y.status">
              <svg class="gauge-svg" viewBox="0 0 36 36">
                <path
                  class="gauge-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                ></path>
                <path
                  class="gauge-val"
                  [attr.stroke-dasharray]="res.scores.a11y.score + ', 100'"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                ></path>
              </svg>
              <span class="gauge-number">{{ res.scores.a11y.score }}</span>
            </div>
            <span class="gauge-label">Accessibility</span>
          </div>

          <!-- Technical SEO -->
          <div class="gauge-card">
            <div class="gauge-circle" [attr.data-score]="res.scores.seo.status">
              <svg class="gauge-svg" viewBox="0 0 36 36">
                <path
                  class="gauge-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                ></path>
                <path
                  class="gauge-val"
                  [attr.stroke-dasharray]="res.scores.seo.score + ', 100'"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                ></path>
              </svg>
              <span class="gauge-number">{{ res.scores.seo.score }}</span>
            </div>
            <span class="gauge-label">Technical SEO</span>
          </div>

          <!-- Agentic Readiness -->
          <div class="gauge-card">
            <div class="gauge-circle" [attr.data-score]="res.scores.agentic.status">
              <svg class="gauge-svg" viewBox="0 0 36 36">
                <path
                  class="gauge-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                ></path>
                <path
                  class="gauge-val"
                  [attr.stroke-dasharray]="res.scores.agentic.score + ', 100'"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                ></path>
              </svg>
              <span class="gauge-number">{{ res.scores.agentic.score }}</span>
            </div>
            <span class="gauge-label">Agentic Readiness</span>
          </div>
        </div>

        <!-- Vitals Breakdown Row -->
        <div class="audit-vitals-row">
          <div class="vital-pill">
            <span class="vital-name">LCP (Largest Contentful Paint)</span>
            <span class="vital-val">{{ res.vitals.lcp.value }}</span>
            <span class="vital-badge" [attr.data-status]="res.vitals.lcp.status">
              {{ res.vitals.lcp.label }}
            </span>
          </div>

          <div class="vital-pill">
            <span class="vital-name">INP (Interaction to Next Paint)</span>
            <span class="vital-val">{{ res.vitals.inp.value }}</span>
            <span class="vital-badge" [attr.data-status]="res.vitals.inp.status">
              {{ res.vitals.inp.label }}
            </span>
          </div>

          <div class="vital-pill">
            <span class="vital-name">CLS (Cumulative Layout Shift)</span>
            <span class="vital-val">{{ res.vitals.cls.value }}</span>
            <span class="vital-badge" [attr.data-status]="res.vitals.cls.status">
              {{ res.vitals.cls.label }}
            </span>
          </div>
        </div>

        <!-- Remediation Callout -->
        <div class="audit-remediation-bar">
          <div class="remediation-text">
            <h4 class="remediation-title">Ready to eliminate technical bottlenecks?</h4>
            <p class="remediation-sub">
              Zelenia partners engineer direct solutions with zero junior delegation.
            </p>
          </div>
          <a class="btn btn--primary btn--remediate" href="#contact">
            <span>Remediate with Partners</span>
            <span class="arrow-indicator" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    }
  `
})
export class AuditConsole {
  readonly results = input<AuditResults | null>(null);
}
