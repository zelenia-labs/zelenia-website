import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface IntentPath {
  id: string;
  label: string;
  tag: string;
  output: string;
  ctaText: string;
  link: string;
  queryParams?: Record<string, string>;
}

@Component({
  selector: 'app-intent-navigator',
  imports: [RouterLink],
  template: `
    <section class="site-section intent-section" id="intent" aria-labelledby="intent-prompt">
      <div class="container intent-container">
        <div class="section-header section-header--center">
          <h2 class="section-title" id="intent-prompt">What can we help you solve today?</h2>
          <p class="section-subhead">
            Select your immediate technical challenge to see how we scope, architect, and resolve it
            with direct senior execution.
          </p>
        </div>

        <!-- Path Selector Tabs -->
        <div class="intent-tabs" role="tablist" aria-label="Project Intent Options">
          @for (path of paths; track path.id) {
            <button
              class="intent-tab"
              type="button"
              role="tab"
              [id]="'intent-tab-' + path.id"
              [attr.aria-selected]="activePathId() === path.id"
              [attr.aria-controls]="'intent-panel-' + path.id"
              (click)="selectPath(path.id)"
            >
              <span class="intent-tab__tag">{{ path.tag }}</span>
              <span class="intent-tab__label">{{ path.label }}</span>
            </button>
          }
        </div>

        <!-- Reactive Resolution Card -->
        <div
          class="intent-output-card"
          [id]="'intent-panel-' + activePath().id"
          role="tabpanel"
          [attr.aria-labelledby]="'intent-tab-' + activePath().id"
        >
          <div class="intent-output-content">
            <span class="intent-output-badge">Our Approach</span>
            <p class="intent-output-text">{{ activePath().output }}</p>
          </div>
          <div class="intent-output-action">
            <a
              class="btn btn--primary btn--intent"
              [routerLink]="activePath().link"
              [queryParams]="activePath().queryParams"
            >
              <span>{{ activePath().ctaText }}</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .intent-section {
      background-color: var(--surface-warm);
      border-block: 1px solid var(--border);
      padding-block: clamp(5rem, 8vw, 8rem);
      position: relative;
    }

    .intent-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .intent-tabs {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-block: 2.5rem 1.5rem;
      inline-size: 100%;
    }

    .intent-tab {
      background: var(--surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      padding: 1.35rem 1.25rem;
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      transition:
        border-color var(--transition-fast),
        background-color var(--transition-fast),
        box-shadow var(--transition-fast),
        transform var(--transition-fast);
      color: var(--text-2);
      box-shadow: 0 1px 3px rgba(18, 22, 30, 0.02);
      position: relative;
    }

    .intent-tab:hover {
      border-color: var(--border-hover);
      color: var(--text);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(18, 22, 30, 0.05);
    }

    .intent-tab[aria-selected='true'] {
      border-color: var(--text);
      background: var(--surface);
      color: var(--text);
      box-shadow:
        0 0 0 1px var(--text),
        0 8px 24px -4px rgba(18, 22, 30, 0.08);
      transform: translateY(-2px);
    }

    .intent-tab[aria-selected='true']::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 1.25rem;
      right: 1.25rem;
      height: 2px;
      background: var(--text);
    }

    .intent-tab__tag {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      font-weight: 700;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .intent-tab[aria-selected='true'] .intent-tab__tag {
      color: var(--text);
    }

    .intent-tab__label {
      font-size: 0.9375rem;
      font-weight: 650;
      line-height: 1.35;
      color: var(--text);
    }

    .intent-output-card {
      inline-size: 100%;
      background: var(--surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      padding: clamp(1.75rem, 3vw, 2.5rem);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      box-shadow: 0 12px 32px -6px rgba(18, 22, 30, 0.06);
      animation: intent-in 0.25s ease-out;
    }

    .intent-output-content {
      flex: 1 1 380px;
    }

    .intent-output-badge {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    .intent-output-text {
      margin: 0;
      font-size: 1.05rem;
      line-height: 1.7;
      color: var(--text-2);
      max-inline-size: 65ch;
    }

    .intent-output-action {
      flex-shrink: 0;
    }

    .btn--intent {
      padding: 0.875rem 1.85rem;
      font-size: 0.9375rem;
    }

    @keyframes intent-in {
      from {
        opacity: 0.7;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 1024px) {
      .intent-tabs {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .intent-tabs {
        grid-template-columns: 1fr;
      }
      .intent-output-card {
        flex-direction: column;
        align-items: flex-start;
      }
      .btn--intent {
        inline-size: 100%;
      }
    }
  `
})
export class IntentNavigator {
  readonly paths: IntentPath[] = [
    {
      id: 'vitals',
      tag: 'Web Performance',
      label: 'Core Web Vitals & Sub-Second Load',
      output:
        'We isolate and remediate LCP, INP, and CLS bottlenecks directly in production client-side code without altering backend infrastructure. Guaranteed sub-second rendering for scale-ups.',
      ctaText: 'View Performance Process',
      link: '/process',
      queryParams: { focus: 'vitals' }
    },
    {
      id: 'design',
      tag: 'Design Systems',
      label: 'Interface Design & Modern Design Systems',
      output:
        'Our Lead Product Designer rebuilds design tokens, typography scales, responsive layouts, and reusable component libraries with 100% design-to-code fidelity.',
      ctaText: 'Explore Design Process',
      link: '/process',
      queryParams: { focus: 'design-system' }
    },
    {
      id: 'flagship',
      tag: 'Digital Rebuilds',
      label: 'End-to-End Modernization & Rebuilds',
      output:
        'For high-value commercial practices and venture-backed scale-ups. An authoritative, bespoke digital presence engineered for conversion, prestige, and zero maintenance headaches.',
      ctaText: 'Explore Rebuild Sprints',
      link: '/process',
      queryParams: { focus: 'rebuild' }
    },
    {
      id: 'agency',
      tag: 'Agency Replacement',
      label: 'Replacing an Underperforming Agency',
      output:
        'Stuck in a bloated agency contract or backlogged internal sprint? We step directly into your Git repository to unblock critical roadmaps and deliver production software in weeks, not quarters.',
      ctaText: 'Connect With the Founders',
      link: '/contact'
    }
  ];

  readonly activePathId = signal<string>('vitals');

  selectPath(id: string): void {
    this.activePathId.set(id);
  }

  activePath(): IntentPath {
    return this.paths.find((p) => p.id === this.activePathId()) ?? this.paths[0];
  }
}
