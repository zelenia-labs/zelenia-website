import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { Diagnostic } from '../sections/diagnostic/diagnostic';
import { PageFaq, PageFaqItem } from '../ui/faq/page-faq';
import { ScrollReveal } from '../ui/motion/scroll-reveal';

export const routeMeta: RouteMeta = {
  title: 'Development Process & Scope Estimator // Zelenia',
  meta: [
    {
      name: 'description',
      content:
        'Explore our senior engineering and product design sprint process. Interactive scope calculator, runtime performance benchmarks, and accessibility protocols.'
    },
    {
      property: 'og:title',
      content: 'Development Process & Scope Estimator // Zelenia'
    },
    {
      property: 'og:description',
      content:
        'Direct senior execution. Web vitals remediation, accessible UI architecture, and predictable sprint delivery.'
    }
  ]
};

@Component({
  selector: 'app-process-page',
  imports: [RouterLink, Diagnostic, PageFaq, ScrollReveal],
  template: `
    <div class="process-page">
      <!-- Process Hero -->
      <section class="site-section process-hero">
        <div class="container" appScrollReveal>
          <div class="section-header section-header--center">
            <span class="section-tag">How We Work</span>
            <h1 class="section-title">Direct Senior Execution: Our Development Process</h1>
            <p class="section-subhead">
              We eliminate agency layers, account managers, and junior handoffs. Every sprint is
              planned, engineered, and delivered directly by a Fortune 100 Principal Engineer and a
              Lead Product Designer.
            </p>
          </div>
        </div>
      </section>

      <!-- Section 1: Interactive Scope & Sprint Selector -->
      <div class="process-diagnostic-wrapper">
        <app-diagnostic />
      </div>

      <!-- Section 2 & 3: Performance Engineering & Technical Accessibility Deep Dive -->
      <section class="site-section process-deep-dive">
        <div class="container" appScrollReveal>
          <!-- Performance Engineering -->
          <div class="deep-dive-block">
            <div class="section-header">
              <span class="section-tag">Core Specialization</span>
              <h2 class="section-title">Performance Engineering: Runtime Rigor over Quick Fixes</h2>
              <p class="section-subhead">
                True performance is an architectural discipline. We remediate client-side
                bottlenecks directly in production code without disrupting backend infrastructure.
              </p>
            </div>

            <div class="deep-dive-grid">
              <article class="deep-dive-card">
                <span class="deep-dive-code">01 / Scheduling</span>
                <h3 class="deep-dive-title">Long Task Offloading &amp; Sub-200ms INP</h3>
                <p class="deep-dive-body">
                  We refactor long JavaScript tasks on the browser main thread, implement
                  cooperative scheduling with modern primitives, and ensure touch and click feedback
                  is instantaneous.
                </p>
              </article>

              <article class="deep-dive-card">
                <span class="deep-dive-code">02 / Critical Path</span>
                <h3 class="deep-dive-title">Critical Path Priority &amp; Sub-1.8s LCP</h3>
                <p class="deep-dive-body">
                  We streamline the critical rendering path with speculative resource hints, modern
                  responsive image sets, and zero-layout-shift font pre-allocation.
                </p>
              </article>

              <article class="deep-dive-card">
                <span class="deep-dive-code">03 / Field Data</span>
                <h3 class="deep-dive-title">CrUX Field Data Calibration</h3>
                <p class="deep-dive-body">
                  Synthetic lab scores are only a starting point. We optimize for 75th-percentile
                  real-user metrics (CrUX) to guarantee organic Google ranking protection.
                </p>
              </article>
            </div>
          </div>

          <!-- Technical Accessibility & SEO -->
          <div class="deep-dive-block" style="margin-top: clamp(4.5rem, 8vw, 7rem);">
            <div class="section-header">
              <span class="section-tag">Compliance &amp; Visibility</span>
              <h2 class="section-title">
                Technical Accessibility (WCAG 2.2 AA) &amp; Semantic SEO
              </h2>
              <p class="section-subhead">
                Accessible code is search-crawlable code. We build pristine semantic DOM trees that
                pass stringent legal accessibility audits and maximize indexing reach.
              </p>
            </div>

            <div class="deep-dive-grid">
              <article class="deep-dive-card">
                <span class="deep-dive-code">01 / Screen Readers</span>
                <h3 class="deep-dive-title">Native Screen Reader Workflows</h3>
                <p class="deep-dive-body">
                  Every view is tested with native VoiceOver and NVDA screen readers to verify
                  robust ARIA patterns, live region announcements, and meaningful accessibility
                  trees.
                </p>
              </article>

              <article class="deep-dive-card">
                <span class="deep-dive-code">02 / Keyboard Navigation</span>
                <h3 class="deep-dive-title">Zero Keyboard Trap Navigation</h3>
                <p class="deep-dive-body">
                  We enforce visible focus indicators, logical tab ordering, and focus containment
                  on all modal dialogs, drawers, and interactive flyouts.
                </p>
              </article>

              <article class="deep-dive-card">
                <span class="deep-dive-code">03 / Crawl Integrity</span>
                <h3 class="deep-dive-title">DOM Hierarchy &amp; Technical SEO</h3>
                <p class="deep-dive-body">
                  We reconstruct broken DOM trees with exact heading structures, strict semantic
                  HTML5 elements, and schema markup for optimal search engine indexing.
                </p>
              </article>
            </div>
          </div>

          <!-- Section 4: Focused Scope Boundaries -->
          <div class="scope-boundary-box" style="margin-top: clamp(4rem, 7vw, 6rem);">
            <div class="scope-boundary-inner">
              <span class="scope-boundary-badge">Scope Commitment</span>
              <h3 class="scope-boundary-title">
                High-Precision Frontend Engineering &amp; Interface Craft &mdash; Zero Design System
                Bureaucracy
              </h3>
              <p class="scope-boundary-text">
                We specialize in agile, high-impact frontend sprints, runtime speed, and
                production-ready interfaces. We intentionally do not build bloated enterprise design
                system committees that take twelve months to ship a button. You receive clean,
                modular, documented code that your internal engineers can adopt immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Process & Delivery FAQ -->
      <div id="process-faq-wrapper">
        <app-page-faq
          tag="Process &amp; Delivery FAQ"
          title="How our senior sprints operate in practice."
          subtitle="Answers about sprint timing, accelerated delivery, repository access, and scope changes."
          [items]="processFaqs"
        />

        <section class="site-section process-cta-section">
          <div class="container" style="text-align: center;">
            <span class="section-tag">Next Steps</span>
            <h2 class="section-title">Have a specific project scope in mind?</h2>
            <p class="section-subhead" style="margin-inline: auto; margin-bottom: 2rem;">
              Connect directly with Alejandro and Yolanda for a preliminary architectural
              evaluation.
            </p>
            <a class="btn btn--primary" routerLink="/contact">
              <span>Discuss Your Architecture Scope</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: `
    .process-hero {
      padding-block-start: clamp(6rem, 10vw, 8.5rem);
    }
    .process-diagnostic-wrapper {
      padding-block-end: clamp(3rem, 6vw, 5rem);
    }
    .deep-dive-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: clamp(1.5rem, 2.5vw, 2rem);
    }
    .deep-dive-card {
      background: #ffffff;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: var(--radius);
      padding: clamp(1.75rem, 2.5vw, 2.25rem);
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
      transition:
        border-color var(--transition-normal),
        box-shadow var(--transition-normal),
        transform var(--transition-fast);
    }
    .deep-dive-card:hover {
      border-color: rgba(0, 85, 255, 0.35);
      box-shadow: 0 12px 32px rgba(0, 85, 255, 0.08);
      transform: translateY(-2px);
    }
    .deep-dive-code {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--blue);
      letter-spacing: 0.06em;
      margin-bottom: 0.75rem;
    }
    .deep-dive-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin-block-end: 0.75rem;
      line-height: 1.3;
    }
    .deep-dive-body {
      font-size: 0.9375rem;
      color: #475569;
      line-height: 1.65;
      margin: 0;
      max-inline-size: 65ch;
    }
    .scope-boundary-box {
      background: rgba(0, 85, 255, 0.04);
      border: 1px solid rgba(0, 85, 255, 0.16);
      border-radius: var(--radius);
      padding: clamp(2rem, 3.5vw, 3rem);
    }
    .scope-boundary-badge {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--blue);
      letter-spacing: 0.08em;
      margin-bottom: 0.75rem;
    }
    .scope-boundary-title {
      font-size: clamp(1.25rem, 2.2vw, 1.75rem);
      font-weight: 600;
      color: #0f172a;
      margin-block-end: 1rem;
      letter-spacing: -0.02em;
    }
    .scope-boundary-text {
      font-size: 1rem;
      color: #475569;
      line-height: 1.7;
      margin: 0;
      max-inline-size: 65ch;
    }
    .process-cta-section {
      padding-block: clamp(4rem, 7vw, 6rem);
      border-top: 1px solid var(--border);
    }
  `
})
export default class ProcessPage {
  readonly processFaqs: PageFaqItem[] = [
    {
      q: 'How do you calculate sprint timelines and delivery milestones?',
      a: 'Timelines are determined directly by the technical scope of the sprint (performance remediation, accessibility audit, or custom build) and your chosen cadence (Standard vs Accelerated). Sprints range from 2 to 8 weeks with fixed weekly milestone deliveries into your staging environment.'
    },
    {
      q: 'Can we book an Accelerated Priority Sprint for a fixed deadline?',
      a: 'Yes. In an accelerated sprint, both team members dedicate 100% of studio capacity to your repository with daily deployment synchronizations and expedited pull requests to meet strict launch dates.'
    },
    {
      q: 'Do you require direct access to our production infrastructure?',
      a: 'No. We work through feature branches in your Git repository and test against staging/preview environments. Your production deployment pipeline and credentials remain strictly under your control.'
    },
    {
      q: 'What happens if our team discovers new technical requirements mid-sprint?',
      a: 'Because you collaborate directly with the senior engineers and designers, scope adjustments are evaluated immediately in browser code without bureaucratic change-order delays. We either re-prioritize existing sprint tasks or schedule a follow-on milestone.'
    }
  ];
}
