import { Component } from '@angular/core';
import { ScrollReveal } from '../../ui/motion/scroll-reveal';

@Component({
  selector: 'app-capabilities-summary',
  imports: [ScrollReveal],
  template: `
    <section
      class="site-section capabilities-section"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div class="container" appScrollReveal>
        <div class="capabilities-breather">
          <div class="section-header">
            <span class="section-tag">Capabilities</span>
            <h2 class="section-title" id="capabilities-title">
              Engineered for speed, built for conversion.
            </h2>
            <p class="section-subhead">
              High-precision technical interventions and design modernization. We eliminate runtime
              friction, guarantee sub-second rendering, and deliver design-to-code parity.
            </p>
          </div>

          <div class="capabilities-pillars-row">
            <article class="capability-pillar">
              <span class="capability-pillar__num">01</span>
              <h3 class="capability-pillar__name">Core Web Vitals &amp; Runtime Performance</h3>
              <p class="capability-pillar__desc">
                Sub-1.8s LCP, zero layout shift (CLS), and interaction-to-next-paint (INP)
                refactoring.
              </p>
            </article>

            <article class="capability-pillar">
              <span class="capability-pillar__num">02</span>
              <h3 class="capability-pillar__name">Responsive Architecture &amp; Device Parity</h3>
              <p class="capability-pillar__desc">
                Modern CSS Grid, fluid container queries, and flawless multi-display parity.
              </p>
            </article>

            <article class="capability-pillar">
              <span class="capability-pillar__num">03</span>
              <h3 class="capability-pillar__name">
                Semantic HTML, WCAG 2.2 AA &amp; Technical SEO
              </h3>
              <p class="capability-pillar__desc">
                Clean DOM structures, screen reader certification, and search crawl efficiency.
              </p>
            </article>

            <article class="capability-pillar">
              <span class="capability-pillar__num">04</span>
              <h3 class="capability-pillar__name">Tokenized Design Systems &amp; Modernization</h3>
              <p class="capability-pillar__desc">
                Figma-to-code token parity, accessible modular UI libraries, and GPU micro-motion.
              </p>
            </article>
          </div>

          <div class="capabilities-action">
            <a
              class="btn btn--primary btn--capabilities-dossier"
              href="#contact"
              aria-label="Book an Architectural Review for your Project"
            >
              <span>Schedule Architecture Review</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CapabilitiesSummary {}
