import { afterNextRender, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { PageFaq, PageFaqItem } from '../sections/faq/page-faq';
import { initScrollReveal } from '../ui/motion/scroll-reveal';

export const routeMeta: RouteMeta = {
  title: 'About Us // Yolanda Santa Cruz & Alejandro Cuba // Zelenia',
  meta: [
    {
      name: 'description',
      content:
        'Meet Yolanda and Alejandro. A design and engineering couple who love building fast, beautiful web products together.'
    },
    {
      property: 'og:title',
      content: 'About Us // Yolanda Santa Cruz & Alejandro Cuba // Zelenia'
    },
    {
      property: 'og:description',
      content:
        'A design and engineering couple creating high-performance web applications with personal care and zero agency runaround.'
    }
  ]
};

@Component({
  selector: 'app-team-page',
  imports: [RouterLink, PageFaq],
  template: `
    <div class="team-page">
      <!-- Section 1: Team Hero & About Us -->
      <section class="site-section team-hero" id="team-hero">
        <!-- Ambient Warm Glow Circle matching Figma specs (1040x1040px, #f2ebdf) -->
        <div class="ambient-glow glow--team-warm" aria-hidden="true"></div>

        <div class="container">
          <div class="team-hero-header reveal-on-scroll">
            <span class="section-tag-subtle">About Us</span>
            <h1 class="section-heading-twotone" id="team-title">
              <span class="heading-primary">Direct partnership,</span>
              <span class="heading-secondary">from first design to final code</span>
            </h1>
            <p class="section-subhead">
              We are Yolanda Santa Cruz and Alejandro Cuba, a design and engineering couple who
              share a love for thoughtful craft and fast, clean code. We partner directly with a
              small number of clients at a time so we can give every project our full care and
              headspace.
            </p>
          </div>

          <!-- Team Profiles Stack: Alternating Editorial Layout -->
          <div class="team-profiles-stack">
            <!-- Profile 1: Alejandro Cuba Ruiz (Content Left, Image Right) -->
            <article class="team-profile-row team-profile-row--flipped reveal-on-scroll">
              <div class="team-profile-content-col">
                <h2 class="founder-name">Alejandro Cuba Ruiz</h2>
                <span class="founder-role">Frontend Architect &amp; GDE</span>

                <div class="founder-chips" aria-label="Credentials">
                  <span class="chip-item">20+ Years Experience</span>
                  <span class="chip-item">Google Developer Expert</span>
                  <span class="chip-item">Web Performance Specialist</span>
                </div>

                <p class="founder-bio">
                  Google Developer Expert (GDE) with over 20 years of experience building scalable
                  frontend architecture, sub-second web vitals, and resilient web systems. Passionate
                  about modern web standards, fine-tuning runtime performance, and writing clean
                  TypeScript that is accessible and a joy to maintain.
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
                    alt="Alejandro Cuba Ruiz, Frontend Architect and Google Developer Expert at Zelenia"
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
                  <span class="chip-item">Product &amp; UX Design</span>
                  <span class="chip-item">Visual Conversion Craft</span>
                </div>

                <p class="founder-bio">
                  Over 10 years of experience leading UX, product design, and brand aesthetics
                  across high-growth startups and established brands. Specializes in art direction,
                  visual conversion psychology, intuitive interface systems, and making digital
                  products feel warm, memorable, and effortless to use.
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

      <!-- Section 2: How We Work (Principles) -->
      <section class="site-section team-principles-section" id="team-standards">
        <!-- Ambient Glow Circle matching Figma -->
        <div class="ambient-glow glow--team-pillars" aria-hidden="true"></div>

        <div class="container">
          <div class="section-header section-header--center reveal-on-scroll">
            <span class="section-tag-subtle">How We Work</span>
            <h2 class="section-heading-twotone" id="standards-title">
              <span class="heading-primary">Thoughtful craft.</span>
              <span class="heading-secondary">No agency runaround.</span>
            </h2>
            <p class="section-subhead">
              A focused way of working together that keeps things personal, fast, and
              grounded.
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
              <h3 class="card-title">Direct Partnership</h3>
              <p class="card-description">
                Every wireframe, design system, component, and performance optimization is created
                directly by Yolanda and Alejandro. You always collaborate directly with the people
                designing and coding your website.
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
              <h3 class="card-title">Dedicated Focus</h3>
              <p class="card-description">
                We strictly limit our studio to two client projects at any given time. That way, your
                product, your questions, and your launch timeline always get our genuine headspace
                and care.
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
              <h3 class="card-title">Design &amp; Code in Harmony</h3>
              <p class="card-description">
                Because we design and build together under one roof, there’s zero disconnect between
                Figma and live browser code. Ideas turn into working, interactive prototypes smoothly
                and quickly.
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- Section 3: Team & Collaboration FAQ -->
      <div id="team-faq-wrapper">
        <app-page-faq
          tag="Questions &amp; Answers"
          title="What it’s like"
          titleSecondary="working together."
          subtitle="Clear details on who builds your project, daily communication, and how we work."
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
              <span class="heading-primary">Have a project in mind?</span>
              <span class="heading-secondary">We'd love to chat.</span>
            </h2>
            <p class="section-subhead" style="margin-inline: auto; margin-bottom: 2rem;">
              Reach out and let’s talk about what you’re building. We’ll review your goals and share
              initial thoughts on design, performance, and timelines.
            </p>
            <a class="btn btn--primary" routerLink="/contact">
              <span>Get in Touch</span>
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
      q: 'Who actually designs our site and writes our code?',
      a: 'Yolanda leads the product design and visual systems, and Alejandro engineers the architecture and code. We do not hand your project off to junior developers, account managers, or outside contractors. When you work with Zelenia, you collaborate directly with both founders from start to finish.'
    },
    {
      q: 'How is working with you different from an agency?',
      a: 'Traditional agencies often introduce senior leaders in early meetings, then hand off the day-to-day work to junior staff behind the scenes. With us, there is no middle layer or corporate runaround. We are a couple who genuinely love designing and building fast, thoughtful websites together, so every layout, component, and line of code gets our personal care and attention.'
    },
    {
      q: 'What does day-to-day collaboration feel like?',
      a: 'Friendly, responsive, and completely transparent. We chat directly with you in shared Slack or Discord channels, send clear asynchronous video walkthroughs as we make progress, and share staging links so you always see exactly what we’re building. No bureaucratic status meetings or telephone games.'
    },
    {
      q: 'How do design and engineering work together in practice?',
      a: 'Because we work together every single day, design and code happen side by side. We build in the browser early rather than getting stuck in static mockup handoffs. Interactions, animations, responsive layouts, and accessibility are tested and refined together in real time.'
    },
    {
      q: 'How many projects do you take on at once?',
      a: 'To make sure we can give each project the care, speed, and focus it deserves, we only work with one or two clients at a time. Your project will never get lost in a crowded agency queue.'
    }
  ];
}
