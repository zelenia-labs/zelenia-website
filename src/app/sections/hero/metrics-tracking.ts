import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export type MetricTabKey = 'vitals' | 'responsive' | 'seo' | 'cro';

export interface MetricTab {
  id: MetricTabKey;
  title: string;
  summary: string;
}

@Component({
  selector: 'app-metrics-tracking',
  imports: [RouterLink],
  template: `
    <section
      class="site-section metrics-tracking-section"
      id="telemetry"
      aria-labelledby="metrics-heading"
    >
      <!-- Ambient Glow Circle matching design.svg -->
      <div class="ambient-glow glow--metrics-sage" aria-hidden="true"></div>

      <div class="container">
        <!-- Centered Two-Tone Section Heading -->
        <div class="section-header section-header--center reveal-on-scroll">
          <h2 class="section-heading-twotone" id="metrics-heading">
            <span class="heading-primary">Tracking the metrics</span>
            <span class="heading-secondary">that matter</span>
          </h2>
        </div>

        <!-- Flat Interactive Telemetry Module (Left Tabs + Right Living Stage) -->
        <div class="telemetry-interactive-stage reveal-on-scroll reveal-delay-1">
          <!-- Left Navigation Tabs (Flat on surface, no heavy outer box) -->
          <nav class="telemetry-tabs-nav" aria-label="Metric Track Selector">
            @for (tab of tabs; track tab.id) {
              <button
                type="button"
                class="telemetry-tab-btn"
                [class.is-active]="activeTab() === tab.id"
                (click)="selectTab(tab.id)"
              >
                <h3 class="tab-title">{{ tab.title }}</h3>
                <p class="tab-summary">{{ tab.summary }}</p>
              </button>
            }
          </nav>

          <!-- Right Living Stage Screen -->
          <div class="telemetry-screen" role="region" aria-live="polite">
            <!-- 1. Vitals Pane -->
            @if (activeTab() === 'vitals') {
              <div class="pane-content">
                <div class="pane-topbar">
                  <span class="pane-meta">RUNTIME TELEMETRY &bull; CORE WEB VITALS</span>
                  <span class="status-live">
                    <span class="pulse-dot"></span> LIVE ENGINE BENCHMARK
                  </span>
                </div>

                <div class="vitals-metric-grid">
                  <div class="vitals-metric-card">
                    <span class="vitals-label">Largest Contentful Paint</span>
                    <div class="vitals-value vitals-value--green">0.48s</div>
                    <div class="vitals-meter">
                      <div class="meter-bar" style="width: 24%; background-color: #059669;"></div>
                    </div>
                    <span class="vitals-sub">Sub-second load across 75th percentile</span>
                  </div>

                  <div class="vitals-metric-card">
                    <span class="vitals-label">Interaction to Next Paint</span>
                    <div class="vitals-value vitals-value--green">18ms</div>
                    <div class="vitals-meter">
                      <div class="meter-bar" style="width: 14%; background-color: #0284c7;"></div>
                    </div>
                    <span class="vitals-sub">Instant input response, zero thread lock</span>
                  </div>

                  <div class="vitals-metric-card">
                    <span class="vitals-label">Cumulative Layout Shift</span>
                    <div class="vitals-value vitals-value--green">0.000</div>
                    <div class="vitals-meter">
                      <div class="meter-bar" style="width: 4%; background-color: #059669;"></div>
                    </div>
                    <span class="vitals-sub">Zero visual jitter or unexpected shift</span>
                  </div>
                </div>

                <div class="hydration-waterfall">
                  <div class="waterfall-header">
                    <span class="waterfall-title">Critical Path Hydration</span>
                    <span class="waterfall-pill">Main Thread Unblocked</span>
                  </div>
                  <div class="waterfall-track">
                    <div class="waterfall-fill" style="width: 86%;">
                      <span>Sub-50ms Tasks &bull; Speculative Resource Hints</span>
                    </div>
                  </div>
                </div>

                <div class="pane-narrative">
                  <p>
                    We optimize code, images, and script loading directly in your codebase so pages
                    load instantly for real visitors on any connection, helping improve search
                    rankings and visitor engagement.
                  </p>
                  <a
                    class="btn btn--pill-pane"
                    routerLink="/process"
                    [queryParams]="{ focus: 'vitals' }"
                  >
                    <span>Explore speed sprint</span>
                  </a>
                </div>
              </div>
            }

            <!-- 2. Responsive Viewport Pane -->
            @if (activeTab() === 'responsive') {
              <div class="pane-content">
                <div class="pane-topbar">
                  <span class="pane-meta">VIEWPORT ARCHITECTURE &bull; MULTI-SURFACE</span>
                  <div class="viewport-switchers" role="tablist" aria-label="Device Viewport">
                    <button
                      type="button"
                      class="switch-btn"
                      [class.is-active]="viewportMode() === 'mobile'"
                      (click)="setViewport('mobile')"
                    >
                      Mobile 375px
                    </button>
                    <button
                      type="button"
                      class="switch-btn"
                      [class.is-active]="viewportMode() === 'tablet'"
                      (click)="setViewport('tablet')"
                    >
                      Tablet 768px
                    </button>
                    <button
                      type="button"
                      class="switch-btn"
                      [class.is-active]="viewportMode() === 'desktop'"
                      (click)="setViewport('desktop')"
                    >
                      Desktop 1440px
                    </button>
                  </div>
                </div>

                <div class="viewport-preview-stage">
                  <div
                    class="viewport-device"
                    [class.device--mobile]="viewportMode() === 'mobile'"
                    [class.device--tablet]="viewportMode() === 'tablet'"
                    [class.device--desktop]="viewportMode() === 'desktop'"
                  >
                    <div class="device-head">
                      <div class="device-dot"></div>
                      <div class="device-dot"></div>
                      <div class="device-dot"></div>
                      <span class="device-url"
                        >zelenia.com &bull; {{ viewportMode().toUpperCase() }}</span
                      >
                    </div>
                    <div class="device-body">
                      <div class="mock-line-title"></div>
                      <div class="mock-grid-row">
                        <div class="mock-block"></div>
                        <div class="mock-block"></div>
                      </div>
                      <span class="touch-verified">✓ 48px Minimum Touch Target Verified</span>
                    </div>
                  </div>
                </div>

                <div class="pane-narrative">
                  <p>
                    Carefully tuned layouts ensure your website looks great and responds instantly on
                    phones, tablets, and desktop screens, with zero awkward cutoffs or horizontal
                    scrolling.
                  </p>
                  <a
                    class="btn btn--pill-pane"
                    routerLink="/process"
                    [queryParams]="{ focus: 'responsive' }"
                  >
                    <span>Explore responsive design</span>
                  </a>
                </div>
              </div>
            }

            <!-- 3. Semantic DOM & SEO Pane -->
            @if (activeTab() === 'seo') {
              <div class="pane-content">
                <div class="pane-topbar">
                  <span class="pane-meta">SEMANTIC FOUNDATION &bull; TECHNICAL SEO</span>
                  <span class="badge-pill-wcag">WCAG 2.2 AA COMPLIANT</span>
                </div>

                <div class="dom-inspector-card">
                  <pre
                    class="dom-code"
                  ><code>&lt;<span class="code-tag">main</span> <span class="code-attr">id</span>=<span class="code-val">"content"</span> <span class="code-attr">role</span>=<span class="code-val">"main"</span>&gt;
  &lt;<span class="code-tag">header</span> <span class="code-attr">aria-label</span>=<span class="code-val">"Studio Introduction"</span>&gt;
    &lt;<span class="code-tag">h1</span> <span class="code-attr">class</span>=<span class="code-val">"hero-title"</span>&gt;High-Performance Web&lt;/<span class="code-tag">h1</span>&gt;
  &lt;/<span class="code-tag">header</span>&gt;
  &lt;<span class="code-tag">script</span> <span class="code-attr">type</span>=<span class="code-val">"application/ld+json"</span>&gt;
    &#123;
      "&#64;type": "ProfessionalService",
      "founder": "Alejandro Cuba",
      "designer": "Yolanda Santa Cruz"
    &#125;
  &lt;/<span class="code-tag">script</span>&gt;
&lt;/<span class="code-tag">main</span>&gt;</code></pre>

                  <div class="a11y-chips-row">
                    <span class="chip-item">&bull; VoiceOver Verified</span>
                    <span class="chip-item">&bull; NVDA Screen Reader</span>
                    <span class="chip-item">&bull; 4.5:1 Minimum Contrast</span>
                    <span class="chip-item">&bull; Schema.org Structured Data</span>
                  </div>
                </div>

                <div class="pane-narrative">
                  <p>
                    Clean, accessible structure makes it easy for both visitors and search engines to
                    navigate your site, helping Google understand your content and recommend you to the
                    right audience.
                  </p>
                  <a
                    class="btn btn--pill-pane"
                    routerLink="/process"
                    [queryParams]="{ focus: 'technical-seo' }"
                  >
                    <span>Explore search optimization</span>
                  </a>
                </div>
              </div>
            }

            <!-- 4. Visual CRO Pane -->
            @if (activeTab() === 'cro') {
              <div class="pane-content">
                <div class="pane-topbar">
                  <span class="pane-meta">AESTHETIC CRAFT &bull; CONVERSION OPTIMIZATION</span>
                  <span class="badge-pill-cro">COGNITIVE CLARITY</span>
                </div>

                <div class="cro-specimen-card">
                  <div class="specimen-row">
                    <span class="specimen-meta">Typography Pairing</span>
                    <div class="specimen-serif">Newsreader Editorial Ligature</div>
                    <div class="specimen-sans">Inter High-Contrast Architecture</div>
                  </div>

                  <div class="cro-metrics-grid">
                    <div class="cro-metric">
                      <span class="cro-num">0.00s</span>
                      <span class="cro-label">Visual Anchor Drag</span>
                    </div>
                    <div class="cro-metric">
                      <span class="cro-num">&lt; 50ms</span>
                      <span class="cro-label">Micro-Interaction Feedback</span>
                    </div>
                    <div class="cro-metric">
                      <span class="cro-num">3.4x</span>
                      <span class="cro-label">Executive Conversion</span>
                    </div>
                  </div>
                </div>

                <div class="pane-narrative">
                  <p>
                    We design with clear visual hierarchy, readable typography, and intentional
                    pacing so visitors understand what you offer and feel confident reaching out.
                  </p>
                  <a
                    class="btn btn--pill-pane"
                    routerLink="/process"
                    [queryParams]="{ focus: 'visual-elevation' }"
                  >
                    <span>Explore design sprint</span>
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .metrics-tracking-section {
      background-color: var(--bg);
      padding-block: clamp(4.5rem, 7vw, 6.5rem);
      position: relative;
      overflow: hidden;
    }

    .metrics-tracking-section .container {
      position: relative;
      z-index: 1;
    }

    .glow--metrics-sage {
      width: 541px;
      height: 541px;
      background-color: #d8e2d5;
      opacity: 0.15;
      filter: blur(90px);
      top: 20%;
      left: -80px;
    }

    .section-header--center {
      text-align: center;
      margin-block-end: clamp(2.5rem, 4vw, 3.5rem);
    }

    .section-header--center .section-heading-twotone {
      align-items: center;
    }

    /* Flat Layout: No heavy outer box around the whole section */
    .telemetry-interactive-stage {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      align-items: start;
      max-width: var(--shell);
      margin-inline: auto;
      width: 100%;
      box-sizing: border-box;
    }

    @media (min-width: 960px) {
      .telemetry-interactive-stage {
        grid-template-columns: 300px minmax(0, 1fr);
        gap: clamp(1.75rem, 3vw, 2.75rem);
      }
    }

    /* Left Tabs Navigation */
    .telemetry-tabs-nav {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .telemetry-tab-btn {
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius-md);
      padding: 1.15rem 1.35rem;
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      transition:
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
      width: 100%;
      box-sizing: border-box;
    }

    .telemetry-tab-btn:hover {
      background-color: rgba(36, 32, 27, 0.03);
    }

    .telemetry-tab-btn.is-active {
      background-color: #ffffff;
      border: none;
      box-shadow: none;
    }

    .tab-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text);
      letter-spacing: -0.02em;
      margin: 0;
      line-height: 1.25;
    }

    .tab-summary {
      font-size: 0.8125rem;
      color: var(--text-2);
      margin: 0;
      line-height: 1.45;
    }

    /* Right Screen Area */
    .telemetry-screen {
      background-color: #ffffff;
      border-radius: var(--radius-lg);
      padding: clamp(1.5rem, 3vw, 2.5rem);
      border: none;
      box-shadow: none;
      min-height: 480px;
      min-width: 0;
      max-width: 100%;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }

    .pane-content {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
      min-width: 0;
      max-width: 100%;
      width: 100%;
      box-sizing: border-box;
    }

    .pane-topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(36, 32, 27, 0.06);
    }

    .pane-meta {
      font-family: var(--font-sans);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: var(--text-muted);
    }

    .status-live {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-family: var(--font-sans);
      font-size: 0.6875rem;
      color: #059669;
      font-weight: 600;
      letter-spacing: 0.06em;
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #059669;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.2);
    }

    /* Vitals Metric Cards */
    .vitals-metric-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.25rem;
    }

    .vitals-metric-card {
      background-color: var(--surface-warm);
      border: none;
      border-radius: var(--radius-sm);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .vitals-label {
      font-family: var(--font-sans);
      font-size: 0.75rem;
      font-weight: 550;
      color: var(--text-muted);
      letter-spacing: -0.01em;
    }

    .vitals-value {
      font-family: var(--font-sans);
      font-size: 1.85rem;
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.03em;
    }

    .vitals-value--green {
      color: #059669;
    }

    .vitals-meter {
      width: 100%;
      height: 4px;
      background-color: rgba(36, 32, 27, 0.08);
      border-radius: 2px;
      margin-block: 0.35rem;
      overflow: hidden;
    }

    .meter-bar {
      height: 100%;
      border-radius: 2px;
    }

    .vitals-sub {
      font-size: 0.72rem;
      color: var(--text-2);
      line-height: 1.35;
    }

    /* Waterfall */
    .hydration-waterfall {
      background-color: var(--surface-warm);
      border: none;
      border-radius: var(--radius-sm);
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .waterfall-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .waterfall-title {
      font-family: var(--font-sans);
      font-size: 0.75rem;
      font-weight: 550;
      color: var(--text-muted);
      letter-spacing: -0.01em;
    }

    .waterfall-pill {
      font-family: var(--font-sans);
      font-size: 0.72rem;
      color: #059669;
      font-weight: 600;
    }

    .waterfall-track {
      width: 100%;
      background-color: rgba(36, 32, 27, 0.08);
      border-radius: 3px;
      overflow: hidden;
    }

    .waterfall-fill {
      background: linear-gradient(90deg, #1848b8, #0284c7);
      color: #ffffff;
      padding: 0.35rem 0.75rem;
      font-family: var(--font-sans);
      font-size: 0.72rem;
      font-weight: 500;
      white-space: nowrap;
    }

    /* Viewport Stage */
    .viewport-switchers {
      display: flex;
      gap: 0.5rem;
    }

    .switch-btn {
      background-color: var(--surface-warm);
      border: none;
      border-radius: var(--radius-xs);
      padding: 0.4rem 0.85rem;
      font-family: var(--font-sans);
      font-size: 0.75rem;
      font-weight: 550;
      color: var(--text-2);
      cursor: pointer;
      transition: all 160ms ease;
    }

    .switch-btn.is-active {
      background-color: #24201b;
      color: #ffffff;
    }

    .viewport-preview-stage {
      background-color: var(--surface-warm);
      border: none;
      border-radius: var(--radius-sm);
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }

    .viewport-device {
      background-color: #ffffff;
      border: none;
      border-radius: var(--radius-sm);
      box-shadow: none;
      padding: 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
      transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .device--mobile {
      width: 260px;
    }
    .device--tablet {
      width: 380px;
    }
    .device--desktop {
      width: 100%;
    }

    .device-head {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      padding-bottom: 0.45rem;
      border-bottom: 1px solid rgba(36, 32, 27, 0.06);
    }

    .device-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: rgba(36, 32, 27, 0.2);
    }

    .device-url {
      font-family: var(--font-sans);
      font-size: 0.6875rem;
      color: var(--text-muted);
      margin-left: 0.35rem;
    }

    .device-body {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .mock-line-title {
      height: 10px;
      background-color: var(--text);
      border-radius: 2px;
      width: 65%;
    }

    .mock-grid-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }

    .mock-block {
      height: 34px;
      background-color: var(--surface-warm);
      border-radius: 2px;
    }

    .touch-verified {
      font-family: var(--font-sans);
      font-size: 0.75rem;
      color: #059669;
      font-weight: 550;
    }

    /* DOM Inspector */
    .dom-inspector-card {
      background-color: #1e1d1b;
      color: #f3f4f6;
      border-radius: var(--radius-sm);
      padding: clamp(1rem, 2vw, 1.5rem);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      border: none;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }

    .dom-code {
      margin: 0;
      font-family: var(--font-sans);
      font-size: clamp(0.72rem, 1.05vw, 0.8125rem);
      line-height: 1.6;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-x: auto;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .code-tag {
      color: #93c5fd;
    }
    .code-attr {
      color: #fca5a5;
    }
    .code-val {
      color: #86efac;
    }

    .a11y-chips-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 0.85rem;
    }

    .chip-item {
      font-family: var(--font-sans);
      font-size: 0.75rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.85);
    }

    .badge-pill-wcag,
    .badge-pill-cro {
      font-family: var(--font-sans);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-pill);
      background-color: var(--surface-warm);
      color: var(--text);
      border: none;
    }

    /* CRO Specimen */
    .cro-specimen-card {
      background-color: var(--surface-warm);
      border: none;
      border-radius: var(--radius-sm);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .specimen-row {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .specimen-meta {
      font-family: var(--font-sans);
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.04em;
    }

    .specimen-serif {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      font-style: italic;
      color: var(--text);
    }

    .specimen-sans {
      font-family: var(--font-sans);
      font-size: 1rem;
      font-weight: 600;
      color: var(--text);
    }

    .cro-metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      border-top: 1px solid rgba(36, 32, 27, 0.06);
      padding-top: 1rem;
    }

    .cro-metric {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .cro-num {
      font-family: var(--font-sans);
      font-size: 1.35rem;
      font-weight: 700;
      color: #059669;
      letter-spacing: -0.02em;
    }

    .cro-label {
      font-size: 0.75rem;
      color: var(--text-2);
    }

    /* Narrative in Panes */
    .pane-narrative {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      align-items: flex-start;
      border-top: 1px solid rgba(36, 32, 27, 0.06);
      padding-top: 1.25rem;
    }

    .pane-narrative p {
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--text-2);
      margin: 0;
    }

    .btn--pill-pane {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      height: 40px;
      padding-inline: 1.5rem;
      background-color: #24201b;
      color: #ffffff;
      font-size: 0.875rem;
      font-weight: 550;
      border-radius: var(--radius-pill);
      text-decoration: none;
      transition:
        transform var(--transition-fast),
        background-color var(--transition-fast);
    }

    .btn--pill-pane:hover {
      background-color: #3d372f;
    }
  `
})
export class MetricsTracking {
  readonly activeTab = signal<MetricTabKey>('vitals');
  readonly viewportMode = signal<'mobile' | 'tablet' | 'desktop'>('desktop');

  readonly tabs: MetricTab[] = [
    {
      id: 'vitals',
      title: 'Speed & Performance',
      summary: 'Sub-second page loads and smooth interactions'
    },
    {
      id: 'responsive',
      title: 'Mobile & Multi-Device',
      summary: 'Flawless display on mobile, tablet, and desktop'
    },
    {
      id: 'seo',
      title: 'Search Visibility',
      summary: 'Clean structure and accessibility for search engines'
    },
    {
      id: 'cro',
      title: 'Design & Conversion',
      summary: 'Thoughtful visual craft that turns visitors into clients'
    }
  ];

  selectTab(id: MetricTabKey): void {
    this.activeTab.set(id);
  }

  setViewport(mode: 'mobile' | 'tablet' | 'desktop'): void {
    this.viewportMode.set(mode);
  }
}
