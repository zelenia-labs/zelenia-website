import { afterNextRender, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { PageFaq, PageFaqItem } from '../sections/faq/page-faq';
import { initScrollReveal } from '../ui/motion/scroll-reveal';

export const routeMeta: RouteMeta = {
  title: 'Our Team // Alejandro Cuba & Yolanda Santa Cruz // Zelenia',
  meta: [
    {
      name: 'description',
      content:
        'Meet the makers behind Zelenia. 100% senior density pairing a Fortune 100 Principal Engineer with an industry-tested Lead Product Designer.'
    },
    {
      property: 'og:title',
      content: 'Our Team // Alejandro Cuba & Yolanda Santa Cruz // Zelenia'
    },
    {
      property: 'og:description',
      content:
        'Two dedicated senior practitioners building high-performance web applications without agency overhead.'
    }
  ]
};

@Component({
  selector: 'app-team-page',
  imports: [RouterLink, PageFaq],
  template: `
    <div class="team-page">
      <!-- Section 1: Team Hero & Founders -->
      <section class="site-section team-hero" id="team-hero">
        <!-- Ambient Warm Glow Circle matching Figma specs (1040x1040px, #f2ebdf) -->
        <div class="ambient-glow glow--team-warm" aria-hidden="true"></div>

        <div class="container">
          <div class="team-hero-header reveal-on-scroll">
            <span class="section-tag-subtle">Leadership &amp; Craft</span>
            <h1 class="section-heading-twotone" id="team-title">
              <span class="heading-primary">Meet the team behind</span>
              <span class="heading-secondary">every pixel and line of code</span>
            </h1>
            <p class="section-subhead">
              We are Alejandro Cuba and Yolanda Santa Cruz. Two seasoned practitioners who build
              high-performance digital products directly with you. Strictly capped at two concurrent
              client sprints to guarantee 100% senior dedication.
            </p>
          </div>

          <!-- Team Profiles Stack: Alternating Editorial Layout -->
          <div class="team-profiles-stack">
            <!-- Profile 1: Alejandro Cuba Ruiz (Content Left, Image Right) -->
            <article class="team-profile-row team-profile-row--flipped reveal-on-scroll">
              <div class="team-profile-content-col">
                <h2 class="founder-name">Alejandro Cuba Ruiz</h2>
                <span class="founder-role">Principal Frontend Architect &amp; GDE</span>

                <div class="founder-chips" aria-label="Credentials">
                  <span class="chip-item">20+ Years Experience</span>
                  <span class="chip-item">Fortune 100 Principal Engineer</span>
                  <span class="chip-item">Google Developer Expert</span>
                </div>

                <p class="founder-bio">
                  Google Developer Expert (GDE) and Fortune 100 Principal Software Engineer with 20+
                  years of software engineering leadership. Specializes in scalable frontend
                  architecture, runtime optimization, sub-second performance, and enterprise web
                  systems.
                </p>

                <div class="founder-social">
                  <a
                    class="founder-social-link"
                    href="https://www.linkedin.com/in/alejandrocuba/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Alejandro Cuba on LinkedIn"
                  >
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>

              <div class="team-profile-photo-col">
                <div class="founder-photo-dock">
                  <img
                    src="/assets/images/portrait_alejandro.jpg"
                    alt="Alejandro Cuba Ruiz, Principal Frontend Architect & Google Developer Expert at Zelenia"
                    class="founder-photo"
                    width="400"
                    height="400"
                    loading="lazy"
                  />
                </div>
              </div>
            </article>

            <!-- Profile 2: Yolanda Santa Cruz (Image Left, Content Right) -->
            <article class="team-profile-row reveal-on-scroll">
              <div class="team-profile-photo-col">
                <div class="founder-photo-dock">
                  <img
                    src="/assets/images/portrait_yolanda.jpg"
                    alt="Yolanda Santa Cruz, Lead Product Designer and Visual Artist at Zelenia"
                    class="founder-photo"
                    width="400"
                    height="400"
                    loading="lazy"
                  />
                </div>
              </div>

              <div class="team-profile-content-col">
                <h2 class="founder-name">Yolanda Santa Cruz</h2>
                <span class="founder-role">Lead Product Designer &amp; Visual Artist</span>

                <div class="founder-chips" aria-label="Credentials">
                  <span class="chip-item">10+ Years Experience</span>
                  <span class="chip-item">Seed to Series E Unicorns</span>
                  <span class="chip-item">Fortune 500 Enterprises</span>
                </div>

                <p class="founder-bio">
                  10+ years of experience leading UX and product design across venture-backed
                  technology startups from Seed to Series E, as well as Fortune 500 enterprises.
                  Specializes in art direction, visual conversion psychology, user experience, and
                  aesthetic elevation for high-performance digital products.
                </p>

                <div class="founder-social">
                  <a
                    class="founder-social-link"
                    href="https://www.linkedin.com/in/yolandasantacruz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Yolanda Santa Cruz on LinkedIn"
                  >
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Section 2: Operational Standards (Matching Home Page Clarity Cards) -->
      <section class="site-section team-principles-section" id="team-standards">
        <!-- Ambient Glow Circle matching Figma -->
        <div class="ambient-glow glow--team-pillars" aria-hidden="true"></div>

        <div class="container">
          <div class="section-header section-header--center reveal-on-scroll">
            <span class="section-tag-subtle">Studio Standards</span>
            <h2 class="section-heading-twotone" id="standards-title">
              <span class="heading-primary">Uncompromising standards.</span>
              <span class="heading-secondary">Zero agency overhead.</span>
            </h2>
            <p class="section-subhead">
              The direct execution model that sets Zelenia apart from traditional agency hierarchy.
            </p>
          </div>

          <div class="interfaces-grid team-principles-grid">
            <!-- Pillar 1 -->
            <article class="interface-card team-principle-card">
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
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3 class="card-title">100% Senior Hands</h3>
              <p class="card-description">
                Every wireframe, design token, TypeScript interface, and performance optimization is
                authored directly by our senior team. Zero junior delegation, zero offshore
                outsourcing.
              </p>
            </article>

            <!-- Pillar 2 -->
            <article class="interface-card team-principle-card">
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 class="card-title">Strict Capacity Limits</h3>
              <p class="card-description">
                We cap active engagements to a maximum of two concurrent client sprints. Your
                deliverables and production release milestones never compete with a backlogged
                agency queue.
              </p>
            </article>

            <!-- Pillar 3 -->
            <article class="interface-card team-principle-card">
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
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <h3 class="card-title">Design &amp; Code Parity</h3>
              <p class="card-description">
                We eliminate the friction of static handoffs. Responsive layouts,
                micro-interactions, fluid clamp typography, and WCAG AA accessibility criteria are
                designed and engineered simultaneously in browser space.
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- Section 3: Team & Collaboration FAQ -->
      <div id="team-faq-wrapper">
        <app-page-faq
          tag="Team &amp; Collaboration"
          title="Direct practitioner"
          titleSecondary="collaboration."
          subtitle="Answers about who works on your project, daily communication, production rigor, and capacity limits."
          [items]="teamFaqs"
        />
      </div>

      <!-- Section 4: Final Bottom CTA Section -->
      <section class="site-section team-cta-section">
        <!-- Ambient Glow Circle -->
        <div class="ambient-glow glow--team-cta" aria-hidden="true"></div>

        <div class="container">
          <div class="section-header section-header--center reveal-on-scroll">
            <h2 class="section-heading-twotone" id="team-cta-heading" style="align-items: center;">
              <span class="heading-primary">Ready to work directly</span>
              <span class="heading-secondary">with our senior team?</span>
            </h2>
            <p class="section-subhead" style="margin-inline: auto; margin-bottom: 2rem;">
              Connect with our studio team for an honest assessment of your frontend architecture.
            </p>
            <a class="btn btn--primary" routerLink="/contact">
              <span>Connect With the Team</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: `
    .team-page {
      position: relative;
      background-color: var(--bg);
      overflow-x: clip;
    }

    .team-hero {
      position: relative;
      padding-block-start: clamp(6.5rem, 10vw, 8.5rem);
      padding-block-end: clamp(3.5rem, 6vw, 5.5rem);
      overflow: visible;
    }

    .glow--team-warm {
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
      max-width: 620px;
      margin-block-start: 1rem;
      margin-block-end: 0;
    }

    /* Left-Aligned Hero Header */
    .team-hero-header {
      text-align: left;
      margin-block-end: clamp(3.5rem, 6vw, 5.5rem);
      max-width: 820px;
    }

    .team-hero-header .section-subhead {
      margin-inline: 0;
      max-width: 660px;
      margin-block-start: 1rem;
      margin-block-end: 0;
    }

    /* Alternating Editorial Showcase Stack */
    .team-profiles-stack {
      display: flex;
      flex-direction: column;
      gap: clamp(4.5rem, 8vw, 7rem);
      max-width: 1040px;
    }

    .team-profile-row {
      display: grid;
      grid-template-columns: minmax(280px, 360px) 1fr;
      align-items: center;
      gap: clamp(2.5rem, 5.5vw, 5.5rem);
    }

    .team-profile-row--flipped {
      grid-template-columns: 1fr minmax(280px, 360px);
    }

    .team-profile-photo-col {
      width: 100%;
      max-width: 380px;
    }

    .team-profile-content-col {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .founder-photo-dock {
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background-color: var(--surface-warm);
      box-shadow: 0 16px 40px -12px rgba(36, 32, 27, 0.08);
      border: 1px solid rgba(36, 32, 27, 0.04);
      transition:
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
    }

    .founder-photo-dock:hover {
      box-shadow: 0 20px 48px -12px rgba(36, 32, 27, 0.12);
    }

    .founder-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .founder-badge {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
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

    .founder-name {
      font-size: clamp(1.65rem, 2.5vw, 2.15rem);
      font-weight: 550;
      color: var(--text);
      letter-spacing: -0.025em;
      margin: 0 0 0.35rem 0;
      font-family: var(--font-sans);
      line-height: 1.2;
    }

    .founder-role {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
      display: block;
    }

    .founder-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      margin-bottom: 1.35rem;
    }

    .chip-item {
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--text-2);
      background-color: rgba(149, 175, 181, 0.14);
      padding: 0.28rem 0.75rem;
      border-radius: var(--radius-pill);
      letter-spacing: -0.01em;
    }

    .founder-bio {
      font-size: 1rem;
      line-height: 1.7;
      color: var(--text-2);
      margin: 0 0 1.5rem 0;
      font-family: var(--font-sans);
      max-width: 580px;
    }

    .founder-social {
      margin-top: 0.25rem;
    }

    .founder-social-link {
      display: inline-flex;
      align-items: center;
      font-size: 0.875rem;
      font-weight: 550;
      color: var(--text);
      text-decoration: none;
      border-bottom: 1px solid rgba(36, 32, 27, 0.25);
      padding-bottom: 2px;
      transition:
        color var(--transition-fast),
        border-color var(--transition-fast);
    }

    .founder-social-link:hover {
      color: var(--text-primary);
      border-color: var(--text-primary);
    }

    /* Section 2: Operational Standards / Principles */
    .team-principles-section {
      position: relative;
      background-color: var(--bg);
      padding-block: clamp(4rem, 6.5vw, 6rem);
      border-top: 1px solid var(--border);
      overflow: visible;
    }

    .glow--team-pillars {
      width: 808px;
      height: 808px;
      background-color: #d5dfe1;
      opacity: 0.25;
      filter: blur(90px);
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
    }

    .team-principles-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-block-start: 2.5rem;
    }

    .team-principle-card {
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

    /* Section 3: FAQ */
    .team-faq-section {
      background-color: var(--bg);
      border-top: 1px solid var(--border);
    }

    /* Section 4: CTA Section */
    .team-cta-section {
      position: relative;
      background-color: var(--bg);
      padding-block: clamp(5rem, 8vw, 7rem);
      border-top: 1px solid var(--border);
      overflow: visible;
    }

    .glow--team-cta {
      width: 618px;
      height: 618px;
      background-color: #d8e2d5;
      opacity: 0.22;
      filter: blur(90px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    @media (max-width: 860px) {
      .team-profile-row,
      .team-profile-row--flipped {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .team-profile-row--flipped .team-profile-photo-col {
        order: -1;
      }
      .team-profile-photo-col {
        max-width: 340px;
      }
      .team-principles-grid {
        grid-template-columns: 1fr;
      }
    }
  `
})
export default class TeamPage {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser) {
        initScrollReveal();
      }
    });
  }

  readonly teamFaqs: PageFaqItem[] = [
    {
      q: 'Who actually writes our code and designs our interfaces?',
      a: 'Alejandro Cuba and Yolanda Santa Cruz. We do not employ junior developers, account managers, or subcontractors. Client capital directly funds craft, not agency overhead—every line of code and interface element is created directly by our senior team.'
    },
    {
      q: 'How does the 100% senior density model compare to a traditional agency?',
      a: 'Traditional agencies pitch senior credibility during sales meetings, then delegate execution to junior associates or offshore teams. We eliminate that overhead: you work directly with a Google Developer Expert and enterprise architect with 20+ years of experience, building clean TypeScript, optimal bundle budgets, and sub-second performance into your foundational codebase from day one.'
    },
    {
      q: 'What does day-to-day communication look like during a sprint?',
      a: 'You communicate directly with our senior leads via shared Slack/Discord channels, asynchronous Loom video walk-throughs, and direct pull request reviews. Every architectural decision is handled by the practitioners writing the code, eliminating miscommunication, status meetings, and project drag.'
    },
    {
      q: 'How do engineering and design collaborate in real time?',
      a: 'We collaborate in browser space from day one rather than relying on static Figma handoffs. Complex interaction states, responsive breakpoints, edge cases, and accessibility criteria are designed and validated simultaneously in production code with real-time parity.'
    },
    {
      q: 'How many client projects does Zelenia take on at once?',
      a: 'To guarantee 100% senior density, rapid velocity, and total dedication, we strictly limit active engagements to a maximum of two concurrent client sprints. Your codebase, release milestones, and architecture never compete with an agency queue of backlogged accounts.'
    }
  ];
}
