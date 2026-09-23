import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface CapabilityItem {
  index: string;
  title: string;
  desc: string;
  benchmark: string;
}

@Component({
  selector: 'app-capabilities-summary',
  imports: [RouterLink],
  template: `
    <section
      class="site-section capabilities-section"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Core Capabilities</span>
          <h2 class="section-title" id="capabilities-title">
            Precision engineering meets fine visual craft.
          </h2>
          <p class="section-subhead">
            Four interconnected disciplines executed with singular standards of runtime speed,
            multi-surface adaptability, semantic discoverability, and conversion authority.
          </p>
        </div>

        <div class="capabilities-showcase">
          @for (pillar of pillars; track pillar.index) {
            <article class="capability-col">
              <div class="capability-col__num">{{ pillar.index }}</div>
              <h3 class="capability-col__title">{{ pillar.title }}</h3>
              <p class="capability-col__desc">{{ pillar.desc }}</p>
              <div class="capability-col__meta">
                <span class="capability-col__metric">{{ pillar.benchmark }}</span>
              </div>
            </article>
          }
        </div>

        <div class="capabilities-action">
          <a
            class="btn btn--primary"
            routerLink="/process"
            aria-label="Explore Development Process and Scope Estimator"
          >
            <span>Explore Process &amp; Scope Estimator</span>
          </a>
        </div>
      </div>
    </section>
  `
})
export class CapabilitiesSummary {
  readonly pillars: CapabilityItem[] = [
    {
      index: '01',
      title: 'Sub-Second Web Vitals & Runtime Speed',
      desc: 'We eliminate main-thread JavaScript bottlenecks, offload long tasks, and stabilize layout shifts. Calibrated against 75th-percentile real-world field metrics (CrUX), continuous Real User Monitoring (RUM), and synthetic profiling.',
      benchmark: 'LCP < 1.0s · INP < 50ms · CLS 0.00'
    },
    {
      index: '02',
      title: 'Adaptive Multi-Surface Architecture',
      desc: 'Fluid responsive engineering guaranteeing visual harmony and interaction speed across iOS, Android, macOS, and Windows. We eliminate viewport collapse, touch latency, and responsive layout defects on every device.',
      benchmark: 'Mobile · Tablet · Ultra-Wide'
    },
    {
      index: '03',
      title: 'Semantic DOM, A11y & Technical SEO / SMO',
      desc: 'Accessible code is discoverable code. Pristine HTML5 landmark structure, verified VoiceOver and NVDA screen reader compatibility, structured JSON-LD schema markup, and rich social media optimization (SMO) metadata.',
      benchmark: 'WCAG 2.2 AA · Schema.org · Social Graph'
    },
    {
      index: '04',
      title: 'Aesthetic Elevation & Visual CRO',
      desc: 'We eliminate cognitive clutter and commercial clichés. Pairing disciplined editorial typography with conversion-focused visual hierarchy, we craft digital flagships that command immediate institutional authority.',
      benchmark: 'Fine-Arts Dignity · Visual Conversion'
    }
  ];
}
