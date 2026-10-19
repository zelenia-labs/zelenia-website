import {
  Component,
  signal
} from '@angular/core';
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
      id="metrics"
      aria-labelledby="metrics-heading"
    >
      <!-- Ambient Glow Circle matching design.svg -->
      <div class="ambient-glow glow--metrics-sage" aria-hidden="true"></div>

      <div class="container">
        <!-- Section heading introduces the zone before sticky panel takes over -->
        <div class="section-header section-header--center reveal-on-scroll">
          <h2 class="section-heading-twotone" id="metrics-heading">
            <span class="heading-primary">Tracking the metrics</span>
            <span class="heading-secondary">that matter</span>
          </h2>
        </div>

        <!-- Interactive Tabs Section (Clean click navigation, no sticky scroll trap) -->
        <div class="telemetry-interactive-stage">
              <!-- Left Navigation Tabs (Flat on surface, with active progress bar) -->
              <nav class="telemetry-tabs-nav" aria-label="Metric Track Selector">
                @for (tab of tabs; track tab.id) {
                  <button
                    type="button"
                    class="telemetry-tab-btn"
                    [class.is-active]="activeTab() === tab.id"
                    [attr.data-tab]="tab.id"
                    (click)="selectTab(tab.id)"
                    role="tab"
                    [attr.aria-selected]="activeTab() === tab.id"
                  >
                    <div class="tab-header-row">
                      <h3 class="tab-title">{{ tab.title }}</h3>
                    </div>
                    <p class="tab-summary">{{ tab.summary }}</p>
                  </button>
                }
              </nav>

              <!-- Right Living Stage Screen with Visibility Layers -->
              <div class="telemetry-screen" role="region" aria-live="polite">
                <!-- 1. Vitals Pane -->
                <div
                  class="telemetry-layer"
                  [class.is-active]="activeTab() === 'vitals'"
                  id="pane-vitals"
                >
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
                      <div class="meter-bar" style="width: 24%; background-color: var(--color-emerald);"></div>
                    </div>
                    <span class="vitals-sub">Sub-second load across 75th percentile</span>
                  </div>

                  <div class="vitals-metric-card">
                    <span class="vitals-label">Interaction to Next Paint</span>
                    <div class="vitals-value vitals-value--green">18ms</div>
                    <div class="vitals-meter">
                      <div class="meter-bar" style="width: 14%; background-color: var(--color-cyan);"></div>
                    </div>
                    <span class="vitals-sub">Instant input response, zero thread lock</span>
                  </div>

                  <div class="vitals-metric-card">
                    <span class="vitals-label">Cumulative Layout Shift</span>
                    <div class="vitals-value vitals-value--green">0.000</div>
                    <div class="vitals-meter">
                      <div class="meter-bar" style="width: 4%; background-color: var(--color-emerald);"></div>
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
                    routerLink="/contact"
                    [queryParams]="{ focus: 'vitals' }"
                  >
                    <span>Explore speed optimization</span>
                  </a>
                </div>
              </div>
            </div>

                <!-- 2. Responsive Viewport Pane -->
                <div
                  class="telemetry-layer"
                  [class.is-active]="activeTab() === 'responsive'"
                  id="pane-responsive"
                >
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
                        routerLink="/contact"
                        [queryParams]="{ focus: 'responsive' }"
                      >
                        <span>Explore responsive design</span>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- 3. Semantic DOM & SEO Pane -->
                <div
                  class="telemetry-layer"
                  [class.is-active]="activeTab() === 'seo'"
                  id="pane-seo"
                >
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
                        routerLink="/contact"
                        [queryParams]="{ focus: 'technical-seo' }"
                      >
                        <span>Explore search optimization</span>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- 4. Visual CRO Pane -->
                <div
                  class="telemetry-layer"
                  [class.is-active]="activeTab() === 'cro'"
                  id="pane-cro"
                >
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
                        routerLink="/contact"
                        [queryParams]="{ focus: 'redesign' }"
                      >
                        <span>Explore design process</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </section>
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
