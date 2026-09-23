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
        <div class="section-header section-header--center reveal-on-scroll">
          <span class="section-tag-subtle">Scope &amp; Estimation</span>
          <h2 class="section-heading-twotone" id="diagnostic-title">
            <span class="heading-primary">Diagnose your project scope</span>
            <span class="heading-secondary">in real time.</span>
          </h2>
          <p class="section-subhead">
            Select your primary web challenge below to inspect our direct deliverables, timeline
            estimates, division of labor, and process answers.
          </p>
        </div>

        <div class="diagnostic-console reveal-on-scroll reveal-delay-1" id="diagnostic-tool">
          <!-- Category Tabs -->
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

          <!-- Pace Selector -->
          <div class="diagnostic-control-bar">
            <div class="pace-control-wrap">
              <span class="control-label">PACE MODEL:</span>
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

          <!-- Reactive Output Dashboard -->
          <div
            class="diagnostic-dashboard"
            id="diagnostic-panel"
            role="tabpanel"
            [attr.aria-labelledby]="'tab-' + state.activeCategoryId()"
            tabindex="0"
          >
            <app-telemetry-panel
              [investmentFloor]="state.investmentFloor()"
              [turnaround]="state.turnaroundText()"
              [paceLabel]="state.paceCadenceLabel()"
              [division]="state.activeCategory().division"
            />

            <app-deliverables-list
              [deliverables]="state.deliverables()"
              [benchmarks]="state.benchmarks()"
            />

            <!-- Action to request this scope -->
            <div
              class="diagnostic-action-wrap"
              style="display: flex; justify-content: flex-end; margin-top: 1.5rem;"
            >
              <a
                class="btn btn--primary btn--scope-request"
                routerLink="/contact"
                [queryParams]="{ focus: state.activeCategoryId() }"
              >
                <span>Request This Sprint Scope</span>
              </a>
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
