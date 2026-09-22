import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export type DisciplineKey =
  'vitals' | 'responsive' | 'technical-seo' | 'visual-elevation' | 'rebuild';

export interface DisciplineNav {
  id: DisciplineKey;
  title: string;
  summary: string;
}

@Component({
  selector: 'app-engagement-tracks',
  imports: [RouterLink],
  template: `
    <section
      class="site-section disciplines-section"
      id="tracks"
      aria-labelledby="disciplines-heading"
    >
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <span class="section-tag">Core Disciplines</span>
          <h2 class="section-title" id="disciplines-heading">
            Focused technical interventions.<br />
            <span class="font-serif">Direct, quantifiable impact.</span>
          </h2>
          <p class="section-subhead">
            Interact with our primary engineering and design disciplines to inspect live telemetry
            benchmarks, responsive viewport architectures, and founder-led delivery standards.
          </p>
        </div>

        <!-- Dynamic Architectural Atelier Stage -->
        <div class="discipline-stage">
          <!-- Left: Navigational Discipline Selector (2 Levels, Clean & Unnumbered) -->
          <nav class="discipline-nav" aria-label="Discipline Selector">
            @for (item of disciplines; track item.id) {
              <button
                type="button"
                class="discipline-nav-btn"
                [class.is-active]="activeId() === item.id"
                (click)="selectDiscipline(item.id)"
                (mouseenter)="selectDiscipline(item.id)"
              >
                <h3 class="nav-title">{{ item.title }}</h3>
                <p class="nav-summary">{{ item.summary }}</p>
              </button>
            }
          </nav>

          <!-- Right: Living Visual Instrument Stage -->
          <div class="stage-screen" role="region" aria-live="polite">
            <!-- 1. Vitals Stage -->
            @if (activeId() === 'vitals') {
              <div class="stage-pane pane-vitals">
                <div class="pane-header">
                  <span class="pane-meta">RUNTIME TELEMETRY &mdash; CORE WEB VITALS</span>
                  <span class="status-live"><span class="pulse-dot"></span> LIVE ENGINE</span>
                </div>

                <div class="vitals-telemetry-grid">
                  <div class="telemetry-gauge">
                    <span class="gauge-label">Largest Contentful Paint</span>
                    <div class="gauge-value gauge-value--good">0.68s</div>
                    <div class="gauge-track">
                      <div class="gauge-bar" style="width: 28%; background: var(--emerald);"></div>
                    </div>
                    <span class="gauge-sub">Target &lt; 1.0s (75th percentile)</span>
                  </div>

                  <div class="telemetry-gauge">
                    <span class="gauge-label">Interaction to Next Paint</span>
                    <div class="gauge-value gauge-value--good">18ms</div>
                    <div class="gauge-track">
                      <div class="gauge-bar" style="width: 14%; background: var(--cyan);"></div>
                    </div>
                    <span class="gauge-sub">Instantaneous input response</span>
                  </div>

                  <div class="telemetry-gauge">
                    <span class="gauge-label">Cumulative Layout Shift</span>
                    <div class="gauge-value gauge-value--good">0.000</div>
                    <div class="gauge-track">
                      <div class="gauge-bar" style="width: 4%; background: var(--emerald);"></div>
                    </div>
                    <span class="gauge-sub">Zero visual layout jitter</span>
                  </div>
                </div>

                <div class="telemetry-waterfall">
                  <div class="waterfall-bar">
                    <span class="waterfall-label">Critical Path Hydration</span>
                    <div class="waterfall-fill" style="width: 82%;">
                      <span class="fill-text">Main thread unblocked &bull; Sub-50ms tasks</span>
                    </div>
                  </div>
                </div>

                <div class="pane-narrative">
                  <p>
                    We isolate and eliminate main-thread bottlenecks directly in client-side
                    production code. Validated via synthetic profiling, 75th-percentile field CrUX
                    calibration, and continuous Real User Monitoring (RUM).
                  </p>
                  <a
                    class="btn btn--primary"
                    routerLink="/process"
                    [queryParams]="{ focus: 'vitals' }"
                  >
                    <span>Explore Performance Sprint</span>
                    <span class="arrow-indicator" aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            }

            <!-- 2. Responsive Multi-Surface Stage -->
            @if (activeId() === 'responsive') {
              <div class="stage-pane pane-responsive">
                <div class="pane-header">
                  <span class="pane-meta"
                    >VIEWPORT ARCHITECTURE &mdash; MULTI-SURFACE FIDELITY</span
                  >
                  <div
                    class="viewport-switchers"
                    role="tablist"
                    aria-label="Viewport size selector"
                  >
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

                <div class="viewport-canvas-wrapper">
                  <div
                    class="viewport-canvas"
                    [class.canvas--mobile]="viewportMode() === 'mobile'"
                    [class.canvas--tablet]="viewportMode() === 'tablet'"
                    [class.canvas--desktop]="viewportMode() === 'desktop'"
                  >
                    <div class="canvas-mock-header">
                      <div class="mock-dot"></div>
                      <div class="mock-dot"></div>
                      <div class="mock-dot"></div>
                      <span class="mock-url"
                        >zelenia.com &bull; {{ viewportMode().toUpperCase() }} (FLUID)</span
                      >
                    </div>
                    <div class="canvas-mock-body">
                      <div class="mock-hero-line"></div>
                      <div class="mock-content-grid">
                        <div class="mock-col"></div>
                        <div class="mock-col"></div>
                      </div>
                      <div class="mock-touch-badge">&ge; 48px Touch Target Verified</div>
                    </div>
                  </div>
                </div>

                <div class="pane-narrative">
                  <p>
                    Fluid clamp-based spatial tokens that guarantee visual harmony and interaction
                    speed across iOS, Android, macOS, and Windows. Zero viewport collapse and
                    sub-50ms tap responsiveness.
                  </p>
                  <a
                    class="btn btn--primary"
                    routerLink="/process"
                    [queryParams]="{ focus: 'responsive' }"
                  >
                    <span>Explore Viewport Sprint</span>
                    <span class="arrow-indicator" aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            }

            <!-- 3. Technical SEO & Semantics Stage -->
            @if (activeId() === 'technical-seo') {
              <div class="stage-pane pane-seo">
                <div class="pane-header">
                  <span class="pane-meta">SEMANTIC DOM &mdash; A11Y &amp; SOCIAL GRAPH</span>
                  <span class="badge-wcag">WCAG 2.2 AA COMPLIANT</span>
                </div>

                <div class="dom-inspector">
                  <div class="dom-tree">
                    <div class="tree-line">
                      <span class="tag-open">&lt;main</span> <span class="attr-name">id</span>=<span
                        class="attr-val"
                        >"content"</span
                      >
                      <span class="attr-name">role</span>=<span class="attr-val">"main"</span
                      ><span class="tag-close">&gt;</span>
                    </div>
                    <div class="tree-line indent-1">
                      <span class="tag-open">&lt;header</span>
                      <span class="attr-name">aria-label</span>=<span class="attr-val"
                        >"Studio Introduction"</span
                      ><span class="tag-close">&gt;</span>
                    </div>
                    <div class="tree-line indent-2">
                      <span class="tag-open">&lt;h1</span>
                      <span class="attr-name">class</span>=<span class="attr-val">"hero-title"</span
                      ><span class="tag-close">&gt;</span>High-Performance Engineering<span
                        class="tag-open"
                        >&lt;/h1&gt;</span
                      >
                    </div>
                    <div class="tree-line indent-1">
                      <span class="tag-open">&lt;/header&gt;</span>
                    </div>
                    <div class="tree-line indent-1">
                      <span class="tag-open">&lt;script</span>
                      <span class="attr-name">type</span>=<span class="attr-val"
                        >"application/ld+json"</span
                      ><span class="tag-close">&gt;</span>
                    </div>
                    <div class="tree-line indent-2 json-snippet">
                      &#123; "&#64;type": "ProfessionalService", "founder": "Alejandro Cuba",
                      "designer": "Yolanda Santa Cruz" &#125;
                    </div>
                    <div class="tree-line indent-1">
                      <span class="tag-open">&lt;/script&gt;</span>
                    </div>
                    <div class="tree-line"><span class="tag-open">&lt;/main&gt;</span></div>
                  </div>

                  <div class="a11y-pill-row">
                    <span class="a11y-chip">&bull; VoiceOver Verified</span>
                    <span class="a11y-chip">&bull; NVDA Screen Reader</span>
                    <span class="a11y-chip">&bull; 4.5:1 Contrast Ratio</span>
                    <span class="a11y-chip">&bull; OpenGraph &amp; Twitter Cards</span>
                  </div>
                </div>

                <div class="pane-narrative">
                  <p>
                    Accessible code is crawlable code. We build strict HTML5 landmark hierarchies,
                    verified screen reader navigation trees, structured schema.org data, and rich
                    social media optimization (SMO) preview cards.
                  </p>
                  <a
                    class="btn btn--primary"
                    routerLink="/process"
                    [queryParams]="{ focus: 'technical-seo' }"
                  >
                    <span>Explore Technical SEO Sprint</span>
                    <span class="arrow-indicator" aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            }

            <!-- 4. Visual CRO & Aesthetic Elevation Stage -->
            @if (activeId() === 'visual-elevation') {
              <div class="stage-pane pane-visual">
                <div class="pane-header">
                  <span class="pane-meta">VISUAL CONVERSION &mdash; ART DIRECTION &amp; CRO</span>
                  <span class="badge-cro">COGNITIVE CLARITY</span>
                </div>

                <div class="cro-specimen">
                  <div class="type-specimen">
                    <span class="specimen-label">Display Pairing</span>
                    <div class="specimen-serif">Newsreader Italic Ligature</div>
                    <div class="specimen-sans">Inter High-Contrast Architecture (650 Weight)</div>
                  </div>

                  <div class="scanpath-metrics">
                    <div class="scanpath-col">
                      <span class="metric-num">0.00s</span>
                      <span class="metric-desc">Visual Anchor Friction</span>
                    </div>
                    <div class="scanpath-col">
                      <span class="metric-num">&lt; 50ms</span>
                      <span class="metric-desc">Interaction Confirmation</span>
                    </div>
                    <div class="scanpath-col">
                      <span class="metric-num">3.4x</span>
                      <span class="metric-desc">Executive Conversion Rate</span>
                    </div>
                  </div>
                </div>

                <div class="pane-narrative">
                  <p>
                    We eliminate commercial clichés and cognitive drag. By combining fine-arts
                    typographic balance with conversion-engineered visual paths, we turn qualified
                    visitors into high-value signed clients.
                  </p>
                  <a
                    class="btn btn--primary"
                    routerLink="/process"
                    [queryParams]="{ focus: 'visual-elevation' }"
                  >
                    <span>Explore Aesthetic Elevation</span>
                    <span class="arrow-indicator" aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            }

            <!-- 5. Founder-Led Modernization & Rebuild Stage -->
            @if (activeId() === 'rebuild') {
              <div class="stage-pane pane-rebuild">
                <div class="pane-header">
                  <span class="pane-meta">DIRECT FOUNDER EXECUTION &mdash; GIT COMMITS</span>
                  <span class="badge-git">100% REPOSITORY CUSTODY</span>
                </div>

                <div class="git-console">
                  <div class="console-head">
                    <span class="branch-pill">main branch &bull; client-repo</span>
                    <span class="sync-text">Direct commits by founders</span>
                  </div>
                  <div class="commit-log">
                    <div class="commit-row">
                      <span class="commit-hash">8f3a91c</span>
                      <span class="commit-msg"
                        >feat: offload main-thread long tasks &bull; sub-1.0s LCP</span
                      >
                      <span class="commit-author">Alejandro Cuba (GDE)</span>
                    </div>
                    <div class="commit-row">
                      <span class="commit-hash">e294b0f</span>
                      <span class="commit-msg"
                        >design: synchronize typography tokens &amp; accessible landmarks</span
                      >
                      <span class="commit-author">Yolanda Santa Cruz</span>
                    </div>
                    <div class="commit-row">
                      <span class="commit-hash">c41098a</span>
                      <span class="commit-msg">perf: zero layout shift font pre-allocation</span>
                      <span class="commit-author">Alejandro Cuba (GDE)</span>
                    </div>
                  </div>
                  <div class="console-footer">
                    <span class="metric-tag">2 to 4 Weeks Delivery</span>
                    <span class="metric-tag">Zero Agency Overhead</span>
                    <span class="metric-tag">Capped Sprint Bandwidth</span>
                  </div>
                </div>

                <div class="pane-narrative">
                  <p>
                    Unblock stalled roadmaps or replace underperforming agency retainers. Two senior
                    founders committing production-grade TypeScript and styling tokens directly into
                    your Git repository.
                  </p>
                  <a class="btn btn--primary" routerLink="/contact">
                    <span>Connect with the Founders</span>
                    <span class="arrow-indicator" aria-hidden="true">&rarr;</span>
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
    .disciplines-section {
      background-color: var(--bg);
      position: relative;
      padding-block: var(--section-spacing);
    }

    .discipline-stage {
      display: grid;
      grid-template-columns: 1fr 1.25fr;
      gap: clamp(2.25rem, 4vw, 4rem);
      align-items: start;
    }

    /* Left Navigational Selector (Clean 2-Level Layout) */
    .discipline-nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      position: sticky;
      top: 6.5rem;
    }

    .discipline-nav-btn {
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius-sm);
      padding: clamp(1.15rem, 1.5vw, 1.4rem) clamp(1.25rem, 1.8vw, 1.6rem);
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      position: relative;
      transition:
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
      width: 100%;
      box-sizing: border-box;
    }

    .discipline-nav-btn:hover {
      background-color: var(--surface-warm);
    }

    .discipline-nav-btn.is-active {
      background-color: var(--surface);
      border-color: rgba(0, 82, 255, 0.22);
      border-left: 3px solid var(--blue);
      box-shadow:
        0 1px 3px rgba(18, 22, 30, 0.04),
        0 4px 12px rgba(18, 22, 30, 0.03);
    }

    .nav-title {
      font-size: clamp(1.15rem, 1.45vw, 1.35rem);
      font-weight: 650;
      color: var(--text-2);
      line-height: 1.25;
      margin: 0;
      letter-spacing: -0.02em;
      transition: color var(--transition-fast);
    }

    .discipline-nav-btn:hover .nav-title {
      color: var(--text);
    }

    .discipline-nav-btn.is-active .nav-title {
      color: var(--blue);
    }

    .nav-summary {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--muted);
      margin: 0;
      line-height: 1.45;
      letter-spacing: 0.01em;
      transition: color var(--transition-fast);
    }

    .discipline-nav-btn.is-active .nav-summary {
      color: var(--cyan);
    }

    /* Right Visual Instrument Stage */
    .stage-screen {
      background: var(--surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius);
      padding: clamp(1.75rem, 3.5vw, 2.75rem);
      box-shadow:
        0 4px 12px rgba(18, 22, 30, 0.02),
        0 20px 48px -12px rgba(18, 22, 30, 0.07);
      min-block-size: 480px;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .stage-pane {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
      animation: paneFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes paneFadeIn {
      from {
        opacity: 0.4;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .pane-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      padding-block-end: 1rem;
      border-block-end: 1px solid var(--border);
    }

    .pane-meta {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--muted);
      text-transform: uppercase;
    }

    .status-live {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      color: var(--emerald);
      font-weight: 700;
      letter-spacing: 0.08em;
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--emerald);
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.2);
    }

    /* Vitals Pane */
    .vitals-telemetry-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }

    .telemetry-gauge {
      background: var(--surface-warm);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .gauge-label {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .gauge-value {
      font-family: var(--font-mono);
      font-size: 1.85rem;
      font-weight: 700;
      color: var(--text);
      line-height: 1.1;
    }

    .gauge-value--good {
      color: var(--emerald);
    }

    .gauge-track {
      width: 100%;
      height: 4px;
      background: rgba(18, 22, 30, 0.08);
      border-radius: 2px;
      overflow: hidden;
      margin-block: 0.25rem;
    }

    .gauge-bar {
      height: 100%;
      border-radius: 2px;
      transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .gauge-sub {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      color: var(--text-2);
    }

    .telemetry-waterfall {
      background: var(--surface-warm);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 1rem 1.25rem;
    }

    .waterfall-bar {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .waterfall-label {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      color: var(--muted);
      text-transform: uppercase;
    }

    .waterfall-fill {
      background: linear-gradient(90deg, #1848b8, #0284c7);
      color: #ffffff;
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-xs);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      display: flex;
      align-items: center;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
    }

    /* Responsive Pane */
    .viewport-switchers {
      display: flex;
      gap: 0.5rem;
    }

    .switch-btn {
      background: #ffffff;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-xs);
      padding: 0.35rem 0.75rem;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 550;
      color: var(--text-2);
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(18, 22, 30, 0.02);
      transition: all 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .switch-btn:hover {
      color: var(--text);
      background: var(--surface-warm);
      border-color: var(--border-strong);
    }

    .switch-btn.is-active {
      background: var(--blue);
      color: #ffffff;
      border-color: var(--blue);
      box-shadow: 0 1px 2px rgba(0, 48, 175, 0.2);
    }

    .viewport-canvas-wrapper {
      background: var(--surface-warm);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 220px;
    }

    .viewport-canvas {
      background: #ffffff;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      box-shadow: 0 8px 24px rgba(18, 22, 30, 0.06);
      transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      width: 100%;
    }

    .canvas--mobile {
      width: 260px;
    }

    .canvas--tablet {
      width: 380px;
    }

    .canvas--desktop {
      width: 100%;
    }

    .canvas-mock-header {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border);
    }

    .mock-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--border-strong);
    }

    .mock-url {
      font-family: var(--font-mono);
      font-size: 0.625rem;
      color: var(--muted);
      margin-left: 0.5rem;
    }

    .canvas-mock-body {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .mock-hero-line {
      height: 12px;
      background: var(--text);
      border-radius: 2px;
      width: 70%;
    }

    .mock-content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }

    .mock-col {
      height: 38px;
      background: var(--surface-warm);
      border-radius: 2px;
    }

    .mock-touch-badge {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      color: var(--emerald);
      font-weight: 600;
    }

    /* SEO Inspector */
    .dom-inspector {
      background: #0c0f14;
      color: #e2e8f0;
      border-radius: var(--radius-sm);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .dom-tree {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      line-height: 1.6;
    }

    .tag-open,
    .tag-close {
      color: #93c5fd;
    }

    .attr-name {
      color: #fca5a5;
    }

    .attr-val {
      color: #86efac;
    }

    .indent-1 {
      padding-left: 1.25rem;
    }

    .indent-2 {
      padding-left: 2.5rem;
    }

    .json-snippet {
      color: #fde047;
      font-size: 0.75rem;
    }

    .a11y-pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 0.85rem;
    }

    .a11y-chip {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      color: #cbd5e1;
    }

    .badge-wcag,
    .badge-cro,
    .badge-git {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--cyan);
    }

    /* CRO Specimen */
    .cro-specimen {
      background: var(--surface-warm);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .type-specimen {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .specimen-label {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .specimen-serif {
      font-family: var(--font-serif);
      font-size: 2.25rem;
      font-style: italic;
      color: var(--blue);
      line-height: 1.1;
    }

    .specimen-sans {
      font-family: var(--font-sans);
      font-size: 1.1rem;
      font-weight: 650;
      color: var(--text-2);
      letter-spacing: -0.02em;
    }

    .scanpath-metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      border-top: 1px solid var(--border);
      padding-top: 1.25rem;
    }

    .scanpath-col {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .metric-num {
      font-family: var(--font-mono);
      font-size: 1.65rem;
      font-weight: 700;
      color: var(--text);
    }

    .metric-desc {
      font-size: 0.75rem;
      color: var(--muted);
      line-height: 1.35;
    }

    /* Git Console */
    .git-console {
      background: #0c0f14;
      border-radius: var(--radius-sm);
      padding: 1.5rem;
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .console-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 0.75rem;
    }

    .branch-pill {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #60a5fa;
    }

    .sync-text {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      color: #94a3b8;
    }

    .commit-log {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .commit-row {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }

    .commit-hash {
      color: #fde047;
      font-weight: 700;
    }

    .commit-msg {
      color: #cbd5e1;
      flex-grow: 1;
    }

    .commit-author {
      color: #94a3b8;
      font-size: 0.6875rem;
    }

    .console-footer {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 0.85rem;
    }

    .metric-tag {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      padding: 0.2rem 0.5rem;
      border-radius: 2px;
    }

    /* Narrative in pane */
    .pane-narrative {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      align-items: flex-start;
      margin-top: 0.5rem;
    }

    .pane-narrative p {
      margin: 0;
      font-size: 1.05rem;
      color: var(--text-2);
      line-height: 1.7;
      max-inline-size: 65ch;
      text-wrap: pretty;
    }

    @media (max-width: 960px) {
      .discipline-stage {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }

      .discipline-nav {
        position: static;
      }

      .vitals-telemetry-grid {
        grid-template-columns: 1fr;
      }

      .scanpath-metrics {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class EngagementTracks {
  readonly disciplines: DisciplineNav[] = [
    {
      id: 'vitals',
      title: 'Sub-Second Speed',
      summary: 'Main-thread JavaScript unblocking, LCP prioritization & zero CLS'
    },
    {
      id: 'responsive',
      title: 'Adaptive Interfaces',
      summary: 'Fluid layout fidelity across mobile, tablet & ultra-wide viewports'
    },
    {
      id: 'technical-seo',
      title: 'Semantic DOM & Technical SEO',
      summary: 'Accessible landmark trees, structured schema.org & social graph'
    },
    {
      id: 'visual-elevation',
      title: 'Aesthetic Elevation & Visual CRO',
      summary: 'Cognitive friction elimination, typographic hierarchy & conversion'
    },
    {
      id: 'rebuild',
      title: 'End-to-End Modernization',
      summary: 'Agency replacement, modern frontend architecture & full production launch'
    }
  ];

  readonly activeId = signal<DisciplineKey>('vitals');
  readonly viewportMode = signal<'mobile' | 'tablet' | 'desktop'>('desktop');

  selectDiscipline(id: DisciplineKey): void {
    this.activeId.set(id);
  }

  setViewport(mode: 'mobile' | 'tablet' | 'desktop'): void {
    this.viewportMode.set(mode);
  }
}
