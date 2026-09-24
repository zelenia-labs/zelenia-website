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
        'Explore how we design and build websites together. Interactive scope calculator, runtime performance benchmarks, and accessible UI protocols.'
    },
    {
      property: 'og:title',
      content: 'Development Process & Scope Estimator // Zelenia'
    },
    {
      property: 'og:description',
      content:
        'Thoughtful design and engineering by Yolanda and Alejandro. Interactive scope planning, sub-second web vitals, and clear sprint delivery.'
    }
  ]
};

@Component({
  selector: 'app-process-page',
  imports: [RouterLink, Diagnostic, PageFaq],
  template: `
    <div class="process-page">
      <!-- Process Hero: 2-Column Hero Layout -->
      <section class="site-section process-hero" id="process-hero">
        <!-- Ambient Warm Glow Circle (1040x1040px, #f2ebdf) -->
        <div class="ambient-glow glow--process-warm" aria-hidden="true"></div>

        <div class="container">
          <div class="process-hero-grid reveal-on-scroll">
            <div class="process-hero__content">
              <span class="section-tag-subtle">How We Build</span>
              <h1 class="section-heading-twotone" id="process-hero-title">
                <span class="heading-primary">Thoughtful craft:</span>
                <span class="heading-secondary">our development process</span>
              </h1>
              <p class="section-subhead">
                We eliminate agency layers, account managers, and handoffs. Every sprint is planned,
                designed, and coded directly by Yolanda and Alejandro, working closely alongside
                your team.
              </p>

              <div class="process-hero__badges" aria-label="Process Highlights">
                <span class="chip-item">Direct Collaboration</span>
                <span class="chip-item">Continuous Staging</span>
                <span class="chip-item">Clear Sprint Milestones</span>
              </div>

              <div class="process-hero__actions">
                <a class="btn btn--primary" routerLink="/contact">
                  <span>Book a Scoping Call</span>
                </a>
                <a class="btn btn--secondary" href="#diagnostic">
                  <span>Explore Sprint Scopes</span>
                </a>
              </div>
            </div>

            <div class="process-hero__visual">
              <div class="process-hero-image-dock">
                <img
                  src="/assets/images/senior-execution-craft.jpg"
                  alt="Yolanda and Alejandro collaborating on product design and code in studio"
                  class="process-hero-img"
                  width="600"
                  height="450"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 1: Interactive Scope & Sprint Selector -->
      <div class="process-diagnostic-wrapper">
        <app-diagnostic />
      </div>

      <!-- Section 2: Condensed Architectural Rigor & Engineering Standards -->
      <section class="site-section process-deep-dive" id="process-deep-dive">
        <!-- Ambient Sage Glow Circle (808x808px, #d5dfe1) -->
        <div class="ambient-glow glow--process-sage" aria-hidden="true"></div>

        <div class="container">
          <div class="section-header section-header--center reveal-on-scroll">
            <span class="section-tag-subtle">Engineering Standards</span>
            <h2 class="section-heading-twotone" id="performance-title">
              <span class="heading-primary">Engineering standards:</span>
              <span class="heading-secondary">built for sub-second speed &amp; universal access</span>
            </h2>
            <p class="section-subhead">
              Every sprint is grounded in two uncompromising technical pillars: sub-second page
              loads and complete accessibility. We resolve bottlenecks directly in code without
              disruptive backend infrastructure rewrites.
            </p>
          </div>

          <div class="standards-pillars-grid reveal-on-scroll">
            <!-- Pillar 1: Runtime Performance Discipline -->
            <article class="standards-pillar-card">
              <div class="pillar-header">
                <div class="pillar-icon badge--green" aria-hidden="true">
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
                <div>
                  <span class="pillar-tag">Pillar 01</span>
                  <h3 class="pillar-title">Runtime Performance Discipline</h3>
                </div>
              </div>
              <p class="pillar-intro">
                Remediating client-side bottlenecks, main-thread blocking, and critical rendering
                paths directly in production.
              </p>
              <ul class="pillar-points">
                <li>
                  <strong class="point-lead">Long Task Offloading &amp; Sub-200ms INP:</strong>
                  Refactoring heavy JavaScript execution trees and unblocking the main thread for
                  instantaneous user feedback.
                </li>
                <li>
                  <strong class="point-lead">Critical Path Priority &amp; Sub-1.8s LCP:</strong>
                  Streamlining critical rendering paths with speculative resource hints and
                  zero-layout-shift font pre-allocation.
                </li>
                <li>
                  <strong class="point-lead">CrUX Field Data Calibration:</strong>
                  Optimizing for 75th-percentile real-user metrics (CrUX) to protect organic search
                  rankings.
                </li>
              </ul>
            </article>

            <!-- Pillar 2: Technical Accessibility & Standards -->
            <article class="standards-pillar-card">
              <div class="pillar-header">
                <div class="pillar-icon badge--peach" aria-hidden="true">
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
                <div>
                  <span class="pillar-tag">Pillar 02</span>
                  <h3 class="pillar-title">Technical Accessibility &amp; Standards</h3>
                </div>
              </div>
              <p class="pillar-intro">
                Rigorous WCAG 2.2 AA conformance and pristine semantic DOM structures for maximum
                crawlability and reach.
              </p>
              <ul class="pillar-points">
                <li>
                  <strong class="point-lead">Native Screen Reader Workflows:</strong>
                  Tested with native VoiceOver and NVDA to guarantee robust ARIA patterns and live
                  region announcements.
                </li>
                <li>
                  <strong class="point-lead">Zero Keyboard Trap Navigation:</strong>
                  Enforcing visible focus indicators, logical tab ordering, and focus containment on
                  all modals and flyouts.
                </li>
                <li>
                  <strong class="point-lead">DOM Hierarchy &amp; Technical SEO:</strong>
                  Constructing clean semantic HTML5 trees and schema markup for optimal search
                  engine indexing.
                </li>
              </ul>
            </article>
          </div>

          <!-- Scope Guarantee Reassurance Note -->
          <div class="scope-assurance-bar reveal-on-scroll">
            <span class="assurance-tag">Scope Commitment</span>
            <p class="assurance-text">
              <strong>Direct Partnership:</strong> Every sprint is planned, designed, and built
              directly by Yolanda and Alejandro into your Git repository, delivering clean
              production code your team can take forward with confidence.
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
        <!-- Ambient Soft Sage-Teal Glow Circle (750x750px, #d5dfe1) -->
        <div class="ambient-glow glow--audit-callout" aria-hidden="true"></div>

        <div class="container">
          <div class="audit-callout-card reveal-on-scroll">
            <div class="audit-callout__content">
              <span class="section-tag-subtle">Complimentary Diagnostic</span>
              <h2 class="audit-callout__title">
                <span class="heading-primary">Wondering why your site feels slow</span>
                <span class="heading-secondary">or why visitors leave before reaching out?</span>
              </h2>
              <p class="audit-callout__desc">
                Request a complimentary website speed and health review. We look at your live site,
                pinpoint what is slowing down your pages (from oversized photography to heavy
                scripts), and send you a clear, practical plan to speed it up.
              </p>
              <div class="audit-callout__actions">
                <a
                  class="btn btn--primary audit-callout__btn"
                  routerLink="/contact"
                  [queryParams]="{ focus: 'vitals' }"
                  aria-label="Request a complimentary website speed and health review"
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
          title="How our sprints"
          titleSecondary="operate in practice."
          subtitle="Answers about sprint timing, weekly progress, repository access, and scope changes."
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

    /* 2-Column Process Hero */
    .process-hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: clamp(2.5rem, 5vw, 4.5rem);
      align-items: center;
    }

    .process-hero__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .process-hero__badges {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-block-start: 1.25rem;
      margin-block-end: 2rem;
    }

    .process-hero__actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .process-hero__visual {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .process-hero-image-dock {
      width: 100%;
      max-width: 520px;
      aspect-ratio: 4 / 3;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: 0 16px 36px -8px rgba(36, 32, 27, 0.12);
      border: none;
      background-color: transparent;
    }

    .process-hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
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

    /* Section 2: Condensed Architectural Rigor */
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

    .standards-pillars-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2rem;
      margin-block-start: 2.5rem;
    }

    .standards-pillar-card {
      background: #ffffff;
      border-radius: var(--radius-lg);
      padding: clamp(2rem, 3.5vw, 2.75rem);
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(36, 32, 27, 0.06);
      box-shadow: 0 4px 18px rgba(18, 22, 30, 0.03);
    }

    .pillar-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-block-end: 0.75rem;
    }

    .pillar-icon {
      width: 44px;
      height: 44px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--dark-ink);
      flex-shrink: 0;
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

    .pillar-tag {
      font-family: var(--font-sans);
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: block;
    }

    .pillar-title {
      font-size: clamp(1.2rem, 1.8vw, 1.45rem);
      font-weight: 600;
      letter-spacing: -0.025em;
      color: var(--text);
      margin: 0.15rem 0 0 0;
      line-height: 1.25;
    }

    .pillar-intro {
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--text-2);
      margin: 0 0 1.25rem 0;
    }

    .pillar-points {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
    }

    .pillar-points li {
      font-size: 0.9rem;
      color: var(--text-2);
      line-height: 1.6;
      padding-inline-start: 0.85rem;
      border-inline-start: 2px solid var(--border-subtle);
    }

    .point-lead {
      color: var(--text);
      font-weight: 550;
      display: block;
      margin-block-end: 0.15rem;
    }

    .scope-assurance-bar {
      margin-block-start: 2rem;
      background: #ffffff;
      border-radius: var(--radius-sm);
      padding: 1.25rem 1.75rem;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      border: 1px solid rgba(36, 32, 27, 0.06);
      box-shadow: 0 2px 10px rgba(18, 22, 30, 0.02);
    }

    .assurance-tag {
      font-family: var(--font-sans);
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      white-space: nowrap;
      background: var(--surface-warm);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-pill);
      border: 1px solid var(--border-subtle);
    }

    .assurance-text {
      font-size: 0.8875rem;
      color: var(--text-2);
      line-height: 1.55;
      margin: 0;
    }

    .assurance-text strong {
      color: var(--text);
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
      background-color: #d5dfe1;
      opacity: 0.35;
      filter: blur(90px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .audit-callout-card {
      position: relative;
      background: linear-gradient(135deg, #f0f5f6 0%, #e4eff1 100%);
      border: none;
      border-radius: var(--radius-lg);
      padding: clamp(2.5rem, 5vw, 4.25rem) clamp(2rem, 5vw, 4.25rem);
      box-shadow: 0 12px 36px rgba(130, 157, 163, 0.09);
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
      color: #7b989e;
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
      font-family: var(--font-sans);
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--text-muted);
      letter-spacing: 0.01em;
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
      border: none;
    }

    .audit-dossier-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    @media (max-width: 920px) {
      .process-hero-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }

      .process-hero-image-dock {
        max-width: 440px;
        margin: 0 auto;
      }

      .standards-pillars-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .scope-assurance-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }

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
      a: 'Yes. In an accelerated sprint, both of us dedicate our full daily focus to your project, with daily staging updates and quick feedback loops to meet critical launch dates.'
    },
    {
      q: 'Do you require direct access to our production infrastructure?',
      a: 'No. We work through feature branches in your Git repository and test against staging/preview environments. Your production deployment pipeline and credentials remain strictly under your control.'
    },
    {
      q: 'What happens if we discover new requirements mid-sprint?',
      a: 'Because you work directly with Yolanda and Alejandro without account manager intermediaries, scope adjustments are straightforward to talk through. We can test ideas right away in code and staging without delays, either swapping sprint priorities or scheduling a follow-up milestone.'
    }
  ];
}
