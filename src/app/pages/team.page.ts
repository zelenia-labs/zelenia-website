import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { WebsiteContent } from '../content/website-content';
import { PageFaq, PageFaqItem } from '../sections/faq/page-faq';

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
      <!-- Team Hero -->
      <section class="site-section team-hero">
        <div class="container">
          <div class="section-header section-header--center">
            <span class="section-tag">The Studio Team</span>
            <h1 class="section-title">Meet the team behind every pixel and line of code.</h1>
            <p class="section-subhead">
              We are Alejandro Cuba and Yolanda Santa Cruz. Two seasoned practitioners who build
              high-performance digital products directly with you. Strictly capped at two concurrent
              client sprints to guarantee 100% senior dedication.
            </p>
          </div>

          <!-- Team Profiles Grid -->
          <div class="team-profiles-grid">
            @for (member of team(); track member.name) {
              <article class="team-profile-card">
                <div class="team-profile-photo-wrapper">
                  @if (member.avatarImage) {
                    <img
                      class="team-profile-photo"
                      [src]="'/assets/images/' + member.avatarImage"
                      [alt]="member.name + ' - ' + member.role"
                      width="400"
                      height="400"
                      loading="lazy"
                    />
                  } @else {
                    <div class="team-profile-placeholder">
                      <span>{{ member.avatarInitials }}</span>
                    </div>
                  }
                  <div class="team-profile-role-badge">
                    <span>{{ member.role }}</span>
                  </div>
                </div>

                <div class="team-profile-info">
                  <h2 class="team-profile-name">{{ member.name }}</h2>
                  <p class="team-profile-credentials">{{ member.credentials }}</p>

                  <div class="team-profile-highlights">
                    @for (highlight of member.highlights; track highlight) {
                      <span class="team-highlight-pill">{{ highlight }}</span>
                    }
                  </div>

                  <p class="team-profile-bio">{{ member.background }}</p>

                  <div class="team-profile-social">
                    <a
                      class="team-social-link"
                      [href]="member.linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      [attr.aria-label]="'View ' + member.name + ' on LinkedIn'"
                    >
                      <span>Connect on LinkedIn</span>
                      <span class="arrow-indicator" aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- Senior Density Philosophy -->
      <section class="site-section team-philosophy">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Our Philosophy</span>
            <h2 class="section-title">The 100% Senior Density Model</h2>
            <p class="section-subhead">
              Traditional agencies pitch senior credibility during sales meetings, then delegate
              execution to junior associates. We believe client capital should fund craft, not
              overhead.
            </p>
          </div>

          <div class="philosophy-grid">
            <div class="philosophy-card">
              <span class="philosophy-index">01</span>
              <h3 class="philosophy-title">Real-Time Design-to-Code Parity</h3>
              <p class="philosophy-text">
                Engineering and design collaborate in browser space from day one. Complex
                interaction states, viewport edge cases, and accessibility criteria are validated
                immediately rather than discovered after months of static Figma design handoffs.
              </p>
            </div>

            <div class="philosophy-card">
              <span class="philosophy-index">02</span>
              <h3 class="philosophy-title">Direct Communication, Zero Friction</h3>
              <p class="philosophy-text">
                You work directly with Alejandro and Yolanda. Every Slack message, pull request
                review, and architectural decision is handled by the practitioners writing the code,
                eliminating miscommunication and project drag.
              </p>
            </div>

            <div class="philosophy-card">
              <span class="philosophy-index">03</span>
              <h3 class="philosophy-title">Production Rigor from Day One</h3>
              <p class="philosophy-text">
                With 20+ years of enterprise architecture experience and a Google Developer Expert
                on your team, you get clean TypeScript, optimal bundle budgets, and sub-second
                performance built into the foundational codebase.
              </p>
            </div>

            <div class="philosophy-card">
              <span class="philosophy-index">04</span>
              <h3 class="philosophy-title">Capped Capacity, Total Dedication</h3>
              <p class="philosophy-text">
                We strictly limit active client engagements to a maximum of two concurrent sprints.
                Your codebase, release milestones, and architecture never compete with an agency
                queue of dozens of backlogged accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Team & Collaboration FAQ -->
      <div id="team-faq-wrapper">
        <app-page-faq
          tag="Team &amp; Collaboration FAQ"
          title="Direct practitioner collaboration."
          subtitle="Answers about who works on your project, daily communication, and capacity limits."
          [items]="teamFaqs"
        />

        <section class="site-section team-cta-section">
          <div class="container" style="text-align: center;">
            <span class="section-tag">Direct Access</span>
            <h2 class="section-title">Ready to work directly with the founders?</h2>
            <p class="section-subhead" style="margin-inline: auto; margin-bottom: 2rem;">
              Connect with Alejandro and Yolanda for an honest assessment of your frontend
              architecture.
            </p>
            <a class="btn btn--primary" routerLink="/contact">
              <span>Connect With the Team</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: `
    .team-hero {
      padding-block-start: clamp(6rem, 10vw, 8.5rem);
    }
    .team-profiles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: clamp(2rem, 4vw, 3.5rem);
      margin-block-start: 2rem;
    }
    .team-profile-card {
      background: var(--surface-luminous);
      border: 1px solid var(--border-luminous);
      border-radius: var(--radius);
      padding: clamp(1.75rem, 3vw, 2.5rem);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .team-profile-photo-wrapper {
      position: relative;
      border-radius: var(--radius-sm);
      overflow: hidden;
      aspect-ratio: 1 / 1;
      background: #e2e8f0;
    }
    .team-profile-photo {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
      display: block;
    }
    .team-profile-placeholder {
      inline-size: 100%;
      block-size: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: 700;
      color: #94a3b8;
      background: #f1f5f9;
    }
    .team-profile-role-badge {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(8px);
      padding: 0.35rem 0.85rem;
      border-radius: var(--radius-pill);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      color: #090d15;
      border: 1px solid rgba(15, 23, 42, 0.1);
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
    }
    .team-profile-name {
      font-size: clamp(1.5rem, 2.2vw, 1.85rem);
      font-weight: 600;
      color: var(--text-luminous);
      margin: 0 0 0.35rem;
      letter-spacing: -0.02em;
    }
    .team-profile-credentials {
      font-size: 0.9375rem;
      color: var(--blue);
      font-weight: 500;
      margin: 0 0 1rem;
      line-height: 1.4;
    }
    .team-profile-highlights {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
    }
    .team-highlight-pill {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      color: #475569;
      background: rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.08);
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-pill);
    }
    .team-profile-bio {
      font-size: 0.9375rem;
      line-height: 1.65;
      color: var(--text-luminous-muted);
      margin: 0 0 1.5rem;
      max-inline-size: 65ch;
      flex-grow: 1;
    }
    .team-social-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--blue);
      text-decoration: none;
      transition: color var(--transition-fast);
    }
    .team-social-link:hover {
      color: #1a6cff;
      text-decoration: underline;
    }
    .philosophy-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: clamp(1.5rem, 2.5vw, 2rem);
    }
    .philosophy-card {
      background: #ffffff;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: var(--radius);
      padding: clamp(1.75rem, 2.5vw, 2.25rem);
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
    }
    .philosophy-index {
      display: block;
      font-family: var(--font-heading);
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--blue);
      margin-bottom: 0.75rem;
    }
    .philosophy-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #0f172a;
      margin-block-end: 0.75rem;
      letter-spacing: -0.02em;
    }
    .philosophy-text {
      font-size: 0.9375rem;
      line-height: 1.65;
      color: #475569;
      margin: 0;
      max-inline-size: 65ch;
    }
    .team-cta-section {
      padding-block: clamp(4rem, 7vw, 6rem);
      border-top: 1px solid var(--border);
    }
  `
})
export default class TeamPage {
  private readonly website = inject(WebsiteContent);
  readonly team = this.website.team;

  readonly teamFaqs: PageFaqItem[] = [
    {
      q: 'Who actually writes our code and designs our interfaces?',
      a: 'Alejandro Cuba and Yolanda Santa Cruz. We do not employ junior developers, subcontractors, or offshore agencies. Every line of code and interface element is created directly by the two founders.'
    },
    {
      q: 'What does day-to-day communication look like during a sprint?',
      a: 'You communicate directly with Alejandro and Yolanda via shared Slack/Discord channels, asynchronous Loom video walk-throughs, and direct pull request reviews. Zero account managers, zero status meetings.'
    },
    {
      q: 'How do engineering and design collaborate in real time?',
      a: 'We do not treat design as a static handoff. Technical feasibility, micro-interactions, responsive breakpoints, and accessibility are tested in browser code simultaneously as visual layouts are finalized.'
    },
    {
      q: 'How many client projects does Zelenia take on at once?',
      a: 'To guarantee 100% senior density and rapid cycle velocity, we strictly limit active engagements to a maximum of two client sprints concurrently.'
    }
  ];
}
