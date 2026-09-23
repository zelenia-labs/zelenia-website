import { afterNextRender, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { Diagnostic } from '../sections/diagnostic/diagnostic';
import { PageFaq, PageFaqItem } from '../sections/faq/page-faq';
import { initScrollReveal } from '../ui/motion/scroll-reveal';

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
  imports: [RouterLink, Diagnostic, PageFaq],
  template: `
    <div class="process-page">
      <!-- Process Hero -->
      <section class="site-section process-hero" id="process-hero">
        <!-- Ambient Warm Glow Circle (1040x1040px, #f2ebdf) -->
        <div class="ambient-glow glow--process-warm" aria-hidden="true"></div>

        <div class="container">
          <div class="section-header section-header--center reveal-on-scroll">
            <span class="section-tag-subtle">Execution Protocol</span>
            <h1 class="section-heading-twotone" id="process-hero-title">
              <span class="heading-primary">Direct senior execution:</span>
              <span class="heading-secondary">our development process</span>
            </h1>
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

      <!-- Section 2: Deep Dive Sections (Performance & Accessibility) -->
      <section class="site-section process-deep-dive" id="process-deep-dive">
        <!-- Ambient Sage Glow Circle (808x808px, #d5dfe1) -->
        <div class="ambient-glow glow--process-sage" aria-hidden="true"></div>

        <div class="container">
          <!-- Performance Engineering Block -->
          <div class="deep-dive-block">
            <div class="section-header section-header--center reveal-on-scroll">
              <span class="section-tag-subtle">Runtime Rigor</span>
              <h2 class="section-heading-twotone" id="performance-title">
                <span class="heading-primary">Performance engineering:</span>
                <span class="heading-secondary">runtime rigor over quick fixes</span>
              </h2>
              <p class="section-subhead">
                True performance is an architectural discipline. We remediate client-side
                bottlenecks directly in production code without disrupting backend infrastructure.
              </p>
            </div>

            <!-- 3-card interfaces-grid matching home page with automatic staggered entrance -->
            <div class="interfaces-grid deep-dive-grid">
              <!-- Card 1 -->
              <article class="interface-card deep-dive-card">
                <div class="card-icon-badge badge--green" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3 class="card-title">Long Task Offloading &amp; Sub-200ms INP</h3>
                <p class="card-description">
                  We refactor long JavaScript tasks on the browser main thread, implement
                  cooperative scheduling with modern primitives, and ensure touch and click feedback
                  is instantaneous.
                </p>
              </article>

              <!-- Card 2 -->
              <article class="interface-card deep-dive-card">
                <div class="card-icon-badge badge--peach" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <h3 class="card-title">Critical Path Priority &amp; Sub-1.8s LCP</h3>
                <p class="card-description">
                  We streamline the critical rendering path with speculative resource hints, modern
                  responsive image sets, and zero-layout-shift font pre-allocation.
                </p>
              </article>

              <!-- Card 3 -->
              <article class="interface-card deep-dive-card">
                <div class="card-icon-badge badge--lavender" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <h3 class="card-title">CrUX Field Data Calibration</h3>
                <p class="card-description">
                  Synthetic lab scores are only a starting point. We optimize for 75th-percentile
                  real-user metrics (CrUX) to guarantee organic Google ranking protection.
                </p>
              </article>
            </div>
          </div>

          <!-- Technical Accessibility Block -->
          <div class="deep-dive-block" style="margin-top: clamp(4.5rem, 8vw, 7rem);">
            <div class="section-header section-header--center reveal-on-scroll">
              <span class="section-tag-subtle">Standards &amp; Compliance</span>
              <h2 class="section-heading-twotone" id="accessibility-title">
                <span class="heading-primary">Technical accessibility:</span>
                <span class="heading-secondary">WCAG 2.2 AA &amp; semantic SEO</span>
              </h2>
              <p class="section-subhead">
                Accessible code is search-crawlable code. We build pristine semantic DOM trees that
                pass stringent legal accessibility audits and maximize indexing reach.
              </p>
            </div>

            <!-- 3-card interfaces-grid matching home page with automatic staggered entrance -->
            <div class="interfaces-grid deep-dive-grid">
              <!-- Card 1 -->
              <article class="interface-card deep-dive-card">
                <div class="card-icon-badge badge--peach" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h3 class="card-title">Native Screen Reader Workflows</h3>
                <p class="card-description">
                  Every view is tested with native VoiceOver and NVDA screen readers to verify
                  robust ARIA patterns, live region announcements, and meaningful accessibility
                  trees.
                </p>
              </article>

              <!-- Card 2 -->
              <article class="interface-card deep-dive-card">
                <div class="card-icon-badge badge--green" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                    <line x1="6" y1="8" x2="6.01" y2="8"></line>
                    <line x1="10" y1="8" x2="10.01" y2="8"></line>
                    <line x1="14" y1="8" x2="14.01" y2="8"></line>
                    <line x1="18" y1="8" x2="18.01" y2="8"></line>
                    <line x1="6" y1="12" x2="6.01" y2="12"></line>
                    <line x1="18" y1="12" x2="18.01" y2="12"></line>
                    <line x1="10" y1="16" x2="14" y2="16"></line>
                  </svg>
                </div>
                <h3 class="card-title">Zero Keyboard Trap Navigation</h3>
                <p class="card-description">
                  We enforce visible focus indicators, logical tab ordering, and focus containment
                  on all modal dialogs, drawers, and interactive flyouts.
                </p>
              </article>

              <!-- Card 3 -->
              <article class="interface-card deep-dive-card">
                <div class="card-icon-badge badge--lavender" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <h3 class="card-title">DOM Hierarchy &amp; Technical SEO</h3>
                <p class="card-description">
                  We reconstruct broken DOM trees with exact heading structures, strict semantic
                  HTML5 elements, and schema markup for optimal search engine indexing.
                </p>
              </article>
            </div>
          </div>

          <!-- Scope Boundary Box -->
          <div
            class="scope-boundary-box reveal-on-scroll"
            style="margin-top: clamp(4rem, 7vw, 6rem);"
          >
            <span class="section-tag-subtle">Scope Boundaries</span>
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
      </section>

      <!-- Section 2.5: Free Audit Callout Banner Module -->
      <section
        class="site-section process-audit-callout-section"
        id="process-audit-callout"
        aria-label="Complimentary Architecture and Speed Audit"
      >
        <!-- Ambient Warm Glow Circle (750x750px, #f2ebdf) -->
        <div class="ambient-glow glow--audit-callout" aria-hidden="true"></div>

        <div class="container">
          <div class="audit-callout-card reveal-on-scroll">
            <div class="audit-callout__content">
              <span class="section-tag-subtle">Complimentary Diagnostic</span>
              <h2 class="audit-callout__title">
                <span class="heading-primary">Unsure why your site feels slow</span>
                <span class="heading-secondary">or fails Core Web Vitals?</span>
              </h2>
              <p class="audit-callout__desc">
                Request our complimentary Core Web Vitals and frontend architecture audit. We
                examine your live production code, profile main-thread blocking tasks, evaluate
                layout shifts, and deliver an actionable, comprehensive diagnostic roadmap &mdash;
                completely free, with zero sales pressure.
              </p>
              <div class="audit-callout__actions">
                <a
                  class="btn btn--primary audit-callout__btn"
                  routerLink="/contact"
                  [queryParams]="{ focus: 'vitals' }"
                  aria-label="Request a complimentary Core Web Vitals and architecture audit"
                >
                  <span>Request Free Audit</span>
                </a>
                <span class="audit-callout__meta">
                  Delivered in 2 business days &bull; 100% confidential
                </span>
              </div>
            </div>

            <div class="audit-callout__visual">
              <div class="audit-dossier-frame">
                <img
                  src="/assets/images/audit-dossier-cover.jpg"
                  alt="Zelenia Frontend Performance and Architecture Audit Dossier Cover"
                  class="audit-dossier-img"
                  width="480"
                  height="640"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Process & Delivery FAQ -->
      <div id="process-faq-wrapper">
        <app-page-faq
          tag="Process &amp; Delivery"
          title="How our senior sprints"
          titleSecondary="operate in practice."
          subtitle="Answers about sprint timing, accelerated delivery, repository access, and scope changes."
          [items]="processFaqs"
        />

        <!-- Section 4: Final Bottom CTA Section -->
        <section class="site-section process-cta-section">
          <!-- Ambient Mint Glow Circle (618x618px, #d8e2d5) -->
          <div class="ambient-glow glow--process-cta" aria-hidden="true"></div>

          <div class="container" style="text-align: center;">
            <div class="section-header section-header--center reveal-on-scroll">
              <h2
                class="section-heading-twotone"
                id="process-cta-heading"
                style="align-items: center;"
              >
                <span class="heading-primary">Have a specific project</span>
                <span class="heading-secondary">scope in mind?</span>
              </h2>
              <p class="section-subhead" style="margin-inline: auto; margin-bottom: 2rem;">
                Connect directly with our engineering and design leads for a preliminary
                architectural evaluation.
              </p>
              <a class="btn btn--primary" routerLink="/contact">
                <span>Discuss Your Architecture Scope</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: `
    .process-page {
      position: relative;
      background-color: var(--bg);
      overflow-x: clip;
    }

    .process-hero {
      position: relative;
      padding-block-start: clamp(6.5rem, 10vw, 8.5rem);
      padding-block-end: clamp(3rem, 5vw, 4.5rem);
      overflow: visible;
    }

    .glow--process-warm {
      width: 1040px;
      height: 1040px;
      background-color: #f2ebdf;
      opacity: 0.32;
      filter: blur(90px);
      top: -18px;
      left: 50%;
      transform: translateX(-50%);
    }

    .section-header--center {
      text-align: center;
      margin-block-end: clamp(2.5rem, 4.5vw, 4rem);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .section-subhead {
      font-size: clamp(0.95rem, 1.2vw, 1.05rem);
      line-height: 1.6;
      color: var(--text-2);
      max-width: 640px;
      margin-block-start: 1rem;
      margin-block-end: 0;
    }

    .process-diagnostic-wrapper {
      padding-block-end: clamp(3rem, 6vw, 5rem);
    }

    /* Section 2: Deep Dive */
    .process-deep-dive {
      position: relative;
      background-color: var(--bg);
      padding-block: clamp(4.5rem, 7vw, 6.5rem);
      border-top: 1px solid var(--border);
      overflow: visible;
    }

    .glow--process-sage {
      width: 808px;
      height: 808px;
      background-color: #d5dfe1;
      opacity: 0.28;
      filter: blur(90px);
      top: 35%;
      left: 50%;
      transform: translateX(-50%);
    }

    .deep-dive-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-block-start: 2.5rem;
    }

    .deep-dive-card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      padding: clamp(1.75rem, 3vw, 2.5rem);
      display: flex;
      flex-direction: column;
      border: none;
      box-shadow: none;
    }

    .card-icon-badge {
      width: 44px;
      height: 44px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
      color: var(--dark-ink);
    }

    .badge--peach {
      background-color: var(--badge-peach);
    }

    .badge--green {
      background-color: var(--badge-green);
    }

    .badge--lavender {
      background-color: var(--badge-lavender);
    }

    .card-title {
      font-size: 1.2rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--text);
      margin: 0 0 0.75rem 0;
      line-height: 1.25;
    }

    .card-description {
      font-size: 0.925rem;
      line-height: 1.6;
      color: var(--text-2);
      margin: 0;
    }

    /* Scope Boundary Callout Box */
    .scope-boundary-box {
      background: var(--surface);
      border-radius: var(--radius-lg);
      padding: clamp(2rem, 4vw, 3rem);
      display: flex;
      flex-direction: column;
      border: none;
      box-shadow: none;
    }

    .scope-boundary-title {
      font-size: clamp(1.2rem, 2vw, 1.5rem);
      font-weight: 550;
      color: var(--text);
      margin-block: 0.75rem 1rem;
      letter-spacing: -0.02em;
      line-height: 1.25;
    }

    .scope-boundary-text {
      font-size: 0.95rem;
      color: var(--text-2);
      line-height: 1.7;
      margin: 0;
      max-inline-size: 70ch;
    }

    /* Bottom CTA Section */
    .process-cta-section {
      position: relative;
      background-color: var(--bg);
      padding-block: clamp(5rem, 8vw, 7rem);
      border-top: 1px solid var(--border);
      overflow: visible;
    }

    .glow--process-cta {
      width: 618px;
      height: 618px;
      background-color: #d8e2d5;
      opacity: 0.22;
      filter: blur(90px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    /* Free Audit Callout Banner Module */
    .process-audit-callout-section {
      position: relative;
      background-color: var(--bg);
      padding-block: clamp(3.5rem, 6vw, 5.5rem);
      overflow: visible;
    }

    .glow--audit-callout {
      width: 750px;
      height: 750px;
      background-color: #f2ebdf;
      opacity: 0.35;
      filter: blur(90px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .audit-callout-card {
      position: relative;
      background: linear-gradient(135deg, #fbf9f6 0%, #f6f0e6 100%);
      border: 1px solid rgba(36, 32, 27, 0.08);
      border-radius: var(--radius-lg);
      padding: clamp(2.5rem, 5vw, 4.25rem) clamp(2rem, 5vw, 4.25rem);
      box-shadow: 0 12px 36px rgba(36, 32, 27, 0.04);
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: clamp(2.5rem, 5vw, 4.5rem);
      align-items: center;
      overflow: hidden;
    }

    .audit-callout__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .audit-callout__title {
      font-family: var(--font-heading);
      font-size: clamp(2rem, 3.5vw, 2.75rem);
      font-weight: 500;
      line-height: 1.2;
      letter-spacing: -0.04em;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .audit-callout__title .heading-primary {
      color: #4d4a48;
    }

    .audit-callout__title .heading-secondary {
      color: #a9b4b7;
    }

    .audit-callout__desc {
      font-size: clamp(0.95rem, 1.2vw, 1.05rem);
      line-height: 1.65;
      color: var(--text-2);
      margin: 1.25rem 0 2rem 0;
      max-width: 540px;
    }

    .audit-callout__actions {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.25rem;
    }

    .audit-callout__btn {
      height: 44px;
      padding-inline: 1.75rem;
      font-size: 0.9rem;
      font-weight: 550;
      border-radius: var(--radius-pill);
      background-color: var(--dark-ink);
      color: #ffffff;
      text-decoration: none;
      border: none;
      box-shadow: 0 2px 8px rgba(36, 32, 27, 0.12);
      transition: background-color var(--transition-fast);
      white-space: nowrap;
    }

    .audit-callout__btn:hover {
      background-color: #3d372f;
    }

    .audit-callout__meta {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
      letter-spacing: 0.02em;
    }

    .audit-callout__visual {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .audit-dossier-frame {
      width: 100%;
      max-width: 340px;
      aspect-ratio: 3 / 4;
      border-radius: 12px;
      overflow: hidden;
      background-color: #ffffff;
      box-shadow:
        0 24px 48px -10px rgba(36, 32, 27, 0.2),
        0 8px 20px -6px rgba(36, 32, 27, 0.12),
        0 0 1px rgba(36, 32, 27, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.7);
      transition:
        transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      transform: translate3d(0, 0, 0);
    }

    .audit-callout-card:hover .audit-dossier-frame {
      transform: translateY(-4px);
      box-shadow:
        0 32px 64px -12px rgba(36, 32, 27, 0.25),
        0 12px 24px -6px rgba(36, 32, 27, 0.14),
        0 0 1px rgba(36, 32, 27, 0.3);
    }

    .audit-dossier-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    @media (max-width: 900px) {
      .audit-callout-card {
        grid-template-columns: 1fr;
        padding: 2.25rem 1.75rem;
        gap: 2.5rem;
      }

      .audit-dossier-frame {
        max-width: 280px;
        margin: 0 auto;
      }

      .audit-callout__actions {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.85rem;
      }

      .audit-callout__btn {
        width: 100%;
        text-align: center;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .audit-dossier-frame {
        transition: none !important;
        transform: none !important;
      }
    }

    @media (max-width: 860px) {
      .deep-dive-grid {
        grid-template-columns: 1fr;
      }
    }
  `
})
export default class ProcessPage {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser) {
        initScrollReveal();
      }
    });
  }

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
