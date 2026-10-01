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
      <!-- Section 1: Team Hero & About Us with Fluid Curves -->
      <section class="site-section team-hero" id="team-hero">
        <!-- Ambient Warm Glow Circle matching Figma specs (1040x1040px, #f2ebdf) -->
        <div class="ambient-glow glow--team-warm" aria-hidden="true"></div>

        <!-- Fluid Intertwining Curves Vector Backdrop matching Frame 26 -->
        <div class="hero-fluid-backdrop" aria-hidden="true">
          <svg
            viewBox="0 0 1024 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="fluid-curves-art"
            preserveAspectRatio="xMaxYMin meet"
          >
            <!-- Slate-Blue Fluid Strand -->
            <path
              d="M 394.0,438.5 C 402.3,439.0 427.1,440.9 443.6,441.5 C 460.1,442.1 476.7,442.8 493.2,442.1 C 509.7,441.4 526.3,440.1 542.6,437.5 C 558.9,434.9 575.1,431.5 590.8,426.5 C 606.5,421.5 622.1,415.0 636.7,407.3 C 651.3,399.6 665.4,390.4 678.5,380.4 C 691.6,370.4 705.2,359.8 715.6,347.2 C 726.0,334.6 734.3,319.7 740.6,304.6 C 746.9,289.5 749.0,272.6 753.6,256.7 C 758.2,240.8 759.4,221.8 768.4,209.2 C 777.4,196.6 792.9,187.1 807.6,180.9 C 822.3,174.7 840.6,175.9 856.6,172.0 C 872.6,168.1 891.5,166.5 903.6,157.2 C 915.7,147.9 923.5,131.1 929.1,116.1 C 934.7,101.1 930.8,81.8 937.1,67.4 C 943.4,53.0 954.1,38.8 966.8,29.7 C 979.5,20.6 1005.7,15.8 1013.5,13.0 C 1017.4,11.6 1022.0,5.0 1026.0,0.0"
              stroke="#b4c4da"
              stroke-width="3.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <!-- Sage-Grey Fluid Strand -->
            <path
              d="M 557.0,454.5 C 563.8,453.8 584.5,453.7 597.5,450.4 C 610.5,447.1 624.0,442.1 635.0,434.5 C 646.0,426.9 655.9,416.3 663.2,405.1 C 670.5,393.9 674.5,380.4 678.6,367.5 C 682.7,354.6 683.8,340.5 687.9,327.6 C 692.0,314.7 695.7,300.6 703.5,290.0 C 711.3,279.4 722.9,270.4 734.6,264.2 C 746.3,258.0 760.5,256.0 773.8,252.9 C 787.0,249.8 801.8,250.3 814.1,245.6 C 826.4,240.9 839.9,234.4 847.7,224.5 C 855.5,214.6 857.5,199.2 861.0,186.1 C 864.5,173.0 864.4,158.7 868.5,145.8 C 872.6,133.0 876.9,118.6 885.5,109.0 C 894.1,99.4 908.2,94.4 920.4,88.4 C 932.6,82.4 946.6,79.6 958.5,73.2 C 970.4,66.8 983.1,60.1 991.8,50.2 C 1000.5,40.3 1007.4,20.0 1010.5,14.0 C 1012.0,11.0 1015.0,5.0 1018.0,0.0"
              stroke="#a7b5b7"
              stroke-width="3.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div class="container team-hero-container">
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

          <!-- Team Profiles Stack: Alternating Editorial Layout matching Frame 26 -->
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
      padding-block-end: clamp(4.5rem, 7vw, 6rem);
      overflow: visible;
      border-bottom: 1px solid var(--border-subtle);
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

    /* Fluid Intertwining Curves Backdrop matching Frame 26 */
    .hero-fluid-backdrop {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      max-width: 1320px;
      height: 100%;
      max-height: 560px;
      pointer-events: none;
      z-index: 1;
      overflow: visible;
    }

    .fluid-curves-art {
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }

    .team-hero-container {
      position: relative;
      z-index: 2;
    }

    .team-hero-header {
      text-align: left;
      margin-block-end: clamp(6.5rem, 11vw, 10rem);
      max-width: 660px;
    }

    .team-hero-header .section-subhead {
      font-size: clamp(1rem, 1.25vw, 1.125rem);
      line-height: 1.68;
      color: var(--text-2);
      max-width: 620px;
      margin-block-start: 1.15rem;
      margin-block-end: 0;
      margin-inline: 0;
    }

    /* Team Profiles Stack: Alternating Editorial Layout matching Frame 26 */
    .team-profiles-stack {
      display: flex;
      flex-direction: column;
      gap: clamp(4rem, 7vw, 6.5rem);
      max-width: 1100px;
      margin-inline: auto;
    }

    .team-profile-row {
      display: grid;
      grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.25fr);
      align-items: center;
      gap: clamp(2.5rem, 5vw, 5.5rem);
    }

    .team-profile-row--flipped {
      grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.95fr);
    }

    .team-profile-content-col {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .team-profile-photo-col {
      width: 100%;
      max-width: 440px;
      margin-inline: auto;
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
      .team-hero-header {
        margin-block-end: 3.5rem;
      }
      .hero-fluid-backdrop {
        opacity: 0.55;
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
