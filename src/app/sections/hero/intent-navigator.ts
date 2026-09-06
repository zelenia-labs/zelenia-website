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
          <span class="section-tag">Direct Consultation</span>
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
            <span class="intent-output-badge">[ STUDIO RESOLUTION ARCHITECTURE ]</span>
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
      background-color: #ffffff;
      padding-block: clamp(5.5rem, 9vw, 8.5rem);
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
      background: #f8fafc;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      padding: 1.25rem 1.15rem;
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
      color: #334155;
    }

    .intent-tab:hover {
      border-color: rgba(0, 85, 255, 0.3);
      background: #ffffff;
      color: #0f172a;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(15, 23, 42, 0.04);
    }

    .intent-tab[aria-selected='true'] {
      border-color: var(--blue);
      background: #ffffff;
      color: #0f172a;
      box-shadow:
        0 0 0 1px var(--blue),
        0 8px 24px rgba(0, 85, 255, 0.08);
      transform: translateY(-2px);
    }

    .intent-tab__tag {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--blue);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .intent-tab__label {
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 1.35;
      color: #0f172a;
    }

    .intent-output-card {
      inline-size: 100%;
      background: #f8fafc;
      border: 1px solid rgba(0, 85, 255, 0.22);
      border-radius: 20px;
      padding: clamp(1.75rem, 3vw, 2.5rem);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      box-shadow: 0 10px 30px rgba(0, 85, 255, 0.04);
      animation: intent-in 0.25s ease-out;
    }

    .intent-output-content {
      flex: 1 1 380px;
    }

    .intent-output-badge {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--blue);
      letter-spacing: 0.08em;
      margin-bottom: 0.5rem;
    }

    .intent-output-text {
      margin: 0;
      font-size: 1rem;
      line-height: 1.7;
      color: #334155;
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
        opacity: 0.6;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 960px) {
      .intent-tabs {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .intent-tabs {
        grid-template-columns: 1fr;
      }
      .intent-output-card {
        flex-direction: column;
        align-items: flex-start;
      }
      .btn--intent {
        inline-size: 100%;
        justify-content: center;
      }
    }
  `
})
export class IntentNavigator {
  readonly paths: IntentPath[] = [
    {
      id: 'vitals',
      tag: 'RUNTIME ARCHITECTURE',
      label: 'Fix Core Web Vitals & Runtime Performance',
      output:
        'We isolate and remediate LCP, INP, and CLS bottlenecks directly in production client-side code without altering backend infrastructure. Standard turnaround: 2 to 3-week fixed sprint.',
      ctaText: 'Inspect Performance Sprint Scope',
      link: '/process',
      queryParams: { focus: 'vitals' }
    },
    {
      id: 'design',
      tag: 'INTERFACE FIDELITY',
      label: 'Modernize Design & Responsive UI',
      output:
        'Our Lead Product Designer rebuilds typography hierarchy, visual layouts, and responsive fluid UI into a clean, high-performance production component library.',
      ctaText: 'View Engineering Process',
      link: '/process',
      queryParams: { focus: 'responsive' }
    },
    {
      id: 'a11y',
      tag: 'WCAG 2.2 AA & SEO',
      label: 'Audit Semantic HTML, SEO & Accessibility',
      output:
        'We reconstruct DOM hierarchies and ARIA roles to achieve WCAG 2.2 AA compliance and maximize search engine crawlability.',
      ctaText: 'Review Accessibility Sprint',
      link: '/process',
      queryParams: { focus: 'a11y' }
    },
    {
      id: 'founders',
      tag: 'DIRECT ACCESS',
      label: 'Speak Directly with the Founders',
      output:
        'Skip sales representatives entirely. Select between a 15-minute diagnostic call, a structured scope form, or direct async messaging.',
      ctaText: 'Jump to Connection Options',
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
