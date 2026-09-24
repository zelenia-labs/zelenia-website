import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DiagnosticState } from './diagnostic-state';
import { TelemetryPanel } from './telemetry-panel';
import { DeliverablesList } from './deliverables-list';
import { CategoryId } from './diagnostic.model';

@Component({
  selector: 'app-diagnostic',
  imports: [TelemetryPanel, DeliverablesList, RouterLink],
  template: `
    <section
      class="site-section diagnostic-section"
      id="diagnostic"
      aria-labelledby="diagnostic-title"
    >
      <div class="container">
        <!-- 2-Column Section Intro with Laptop Telemetry Visual -->
        <div class="diagnostic-intro-grid reveal-on-scroll">
          <div class="diagnostic-intro__content">
            <span class="section-tag-subtle">Scope &amp; Estimation</span>
            <h2 class="section-heading-twotone" id="diagnostic-title">
              <span class="heading-primary">Diagnose your project scope</span>
              <span class="heading-secondary">in real time.</span>
            </h2>
            <p class="section-subhead">
              Select your primary web challenge below to inspect our direct deliverables, timeline
              estimates, division of labor, and guaranteed target benchmarks.
            </p>
            <div class="diagnostic-intro__badges" aria-label="Scope Highlights">
              <span class="chip-item">Interactive Scope Calculator</span>
              <span class="chip-item">Real-Time Commercials</span>
              <span class="chip-item">Production Deliverables</span>
            </div>
          </div>

          <div class="diagnostic-intro__visual">
            <div class="diagnostic-laptop-dock">
              <img
                src="/assets/images/diagnostic-laptop-mockup.jpg"
                alt="Zelenia real-time diagnostic console displaying performance telemetry on laptop"
                class="diagnostic-laptop-img"
                width="560"
                height="420"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div class="diagnostic-console reveal-on-scroll reveal-delay-1" id="diagnostic-tool">
          <!-- Unified Controls Bar: Category Tabs & Pace Toggle -->
          <div class="diagnostic-controls-row">
            <div class="diagnostic-nav" role="tablist" aria-label="Project Scope Categories">
              @for (cat of state.categories; track cat.id; let i = $index) {
                <button
                  class="diagnostic-tab"
                  type="button"
                  role="tab"
                  [id]="'tab-' + cat.id"
                  [attr.aria-selected]="state.activeCategoryId() === cat.id"
                  aria-controls="diagnostic-panel"
                  [attr.tabindex]="state.activeCategoryId() === cat.id ? '0' : '-1'"
                  (click)="state.selectCategory(cat.id)"
                  (keydown)="onTabKeydown($event, i)"
                >
                  <span class="diagnostic-tab__label">{{ cat.label }}</span>
                </button>
              }
            </div>

            <div class="diagnostic-pace-wrapper">
              <span class="control-label">PACE:</span>
              <div
                class="diagnostic-pace-toggle"
                role="group"
                aria-label="Execution Pace Selection"
              >
                @for (pace of state.paces; track pace.id) {
                  <button
                    class="diagnostic-pace-btn"
                    type="button"
                    [id]="'pace-' + pace.id"
                    [attr.aria-pressed]="state.activePaceId() === pace.id"
                    (click)="state.setPace(pace.id)"
                  >
                    <span class="diagnostic-pace-btn__text">{{ pace.label }}</span>
                  </button>
                }
              </div>
            </div>
          </div>

          <!-- Reactive Output Dashboard: Condensed Unified Card -->
          <div
            class="diagnostic-dashboard"
            id="diagnostic-panel"
            role="tabpanel"
            [attr.aria-labelledby]="'tab-' + state.activeCategoryId()"
            tabindex="0"
          >
            <div class="diagnostic-unified-card">
              <!-- Left Column: Scope Commercials, Targets, CTA -->
              <div class="diagnostic-sidebar">
                <app-telemetry-panel
                  [investmentFloor]="state.investmentFloor()"
                  [turnaround]="state.turnaroundText()"
                  [paceLabel]="state.paceCadenceLabel()"
                  [division]="state.activeCategory().division"
                  [benchmarks]="state.benchmarks()"
                />

                <div class="diagnostic-sidebar-action">
                  <a
                    class="btn btn--primary btn--scope-request"
                    routerLink="/contact"
                    [queryParams]="{ focus: state.activeCategoryId() }"
                    [attr.aria-label]="'Request sprint scope for ' + state.activeCategory().label"
                  >
                    <span>Request This Sprint Scope</span>
                  </a>
                </div>
              </div>

              <!-- Right Column: Direct Deliverables List -->
              <div class="diagnostic-main">
                <app-deliverables-list [deliverables]="state.deliverables()" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Diagnostic {
  readonly state = inject(DiagnosticState);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    const focus = this.route.snapshot.queryParams['focus'];
    if (focus && this.state.categories.some((c) => c.id === focus)) {
      this.state.selectCategory(focus as CategoryId);
    }
  }

  onTabKeydown(event: KeyboardEvent, currentIndex: number): void {
    const count = this.state.categories.length;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % count;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + count) % count;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = count - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const targetCategory = this.state.categories[nextIndex];
      this.state.selectCategory(targetCategory.id as CategoryId);
      const tabEl = document.getElementById(`tab-${targetCategory.id}`);
      tabEl?.focus();
    }
  }
}
