import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollReveal } from '../../ui/motion/scroll-reveal';

@Component({
  selector: 'app-capabilities-summary',
  imports: [ScrollReveal, RouterLink],
  template: `
    <section
      class="site-section capabilities-section"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div class="container" appScrollReveal>
        <div class="capabilities-breather">
          <div class="section-header">
            <span class="section-tag">Core Capabilities</span>
            <h2 class="section-title" id="capabilities-title">
              Engineered for speed, built for conversion.
            </h2>
            <p class="section-subhead">
              High-precision technical interventions and interface modernization. We eliminate
              runtime friction, guarantee sub-second rendering, and deliver design-to-code parity.
            </p>
          </div>

          <div class="capabilities-pillars-row">
            <article class="capability-pillar">
              <span class="capability-pillar__num">01</span>
              <h3 class="capability-pillar__name">Core Web Vitals &amp; Performance Engineering</h3>
              <p class="capability-pillar__desc">
                We diagnose and resolve critical bottlenecks across Largest Contentful Paint,
                Interaction to Next Paint, and Cumulative Layout Shift for immediate load speed.
              </p>
            </article>

            <article class="capability-pillar">
              <span class="capability-pillar__num">02</span>
              <h3 class="capability-pillar__name">
                Multi-Surface Architecture &amp; Viewport Fidelity
              </h3>
              <p class="capability-pillar__desc">
                We eliminate mobile layout degradation, touch latency, and responsive rendering
                defects. Your applications maintain fluid visual harmony and interaction speed
                across every device.
              </p>
            </article>

            <article class="capability-pillar">
              <span class="capability-pillar__num">03</span>
              <h3 class="capability-pillar__name">
                Semantic HTML, Accessibility (a11y) &amp; Technical SEO
              </h3>
              <p class="capability-pillar__desc">
                Clean DOM structures directly impact search visibility and user reach. We implement
                strict semantic HTML, ARIA patterns, and WCAG 2.2 AA compliance.
              </p>
            </article>

            <article class="capability-pillar">
              <span class="capability-pillar__num">04</span>
              <h3 class="capability-pillar__name">
                Enterprise UI Modernization &amp; Design Systems
              </h3>
              <p class="capability-pillar__desc">
                We overhaul legacy digital surfaces with tokenized design systems, production-ready
                component libraries, and GPU-accelerated motion that your internal engineers can
                adopt immediately.
              </p>
            </article>
          </div>

          <div class="capabilities-action">
            <a
              class="btn btn--primary btn--capabilities-dossier"
              routerLink="/process"
              aria-label="Explore Development Process and Scope Estimator"
            >
              <span>Explore Process &amp; Scope Estimator</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CapabilitiesSummary {}
