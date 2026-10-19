import { afterNextRender, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouteMeta } from '@analogjs/router';
import aboutContent from './about.content.md';
import { initScrollReveal } from '../ui/motion/scroll-reveal';

export const routeMeta: RouteMeta = {
  title: aboutContent.meta.title,
  meta: [
    {
      name: 'description',
      content: aboutContent.meta.description
    },
    {
      property: 'og:title',
      content: aboutContent.meta.ogTitle
    },
    {
      property: 'og:description',
      content: aboutContent.meta.ogDescription
    }
  ]
};

@Component({
  selector: 'app-about-page',
  imports: [],
  template: `
    <div class="team-page">
      <!-- Section 1: Team Hero & About Us with Fluid Curves -->
      <section class="site-section team-hero" id="team-hero">
        <!-- Ambient Warm Glow Circle matching Figma specs (1040x1040px, #f2ebdf) -->
        <div class="ambient-glow glow--team-warm" aria-hidden="true"></div>

        <div class="container team-hero-container">
          <div class="team-hero-header reveal-on-scroll">
            <span class="section-tag-subtle">{{ about.hero.tag }}</span>
            <h1 class="section-heading-twotone" id="team-title">
              <span class="heading-primary">{{ about.hero.titlePrimary }}</span>
              <span class="heading-secondary">{{ about.hero.titleSecondary }}</span>
            </h1>
            <p class="section-subhead">
              {{ about.hero.subhead }}
            </p>
          </div>

          <!-- Team Profiles Stack: Alternating Editorial Layout matching Frame 26 -->
          <div class="team-profiles-stack">
            <!-- Profile 1: Alejandro Cuba Ruiz (Content Left, Image Right) -->
            @if (alejandro; as member) {
              <article class="team-profile-row team-profile-row--flipped reveal-on-scroll">
                <div class="team-profile-content-col">
                  <h2 class="founder-name">{{ member.name }}</h2>
                  <span class="founder-role">{{ member.role }}</span>

                  <div class="founder-chips" aria-label="Credentials">
                    @for (chip of member.chips; track chip) {
                      <span class="chip-item">{{ chip }}</span>
                    }
                  </div>

                  <p class="founder-bio">{{ member.bio }}</p>

                  <div class="founder-social">
                    <a
                      class="founder-social-link"
                      [href]="member.linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      [attr.aria-label]="member.linkedinLabel"
                    >
                      <span>{{ member.linkedinLabel }}</span>
                    </a>
                  </div>
                </div>

                <div class="team-profile-photo-col">
                  <div class="founder-photo-dock">
                    <img
                      [src]="member.photo"
                      [alt]="member.photoAlt"
                      class="founder-photo"
                      width="400"
                      height="400"
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
            }

            <!-- Profile 2: Yolanda Santa Cruz (Image Left, Content Right) -->
            @if (yolanda; as member) {
              <article class="team-profile-row reveal-on-scroll">
                <div class="team-profile-photo-col">
                  <div class="founder-photo-dock">
                    <img
                      [src]="member.photo"
                      [alt]="member.photoAlt"
                      class="founder-photo"
                      width="400"
                      height="400"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div class="team-profile-content-col">
                  <h2 class="founder-name">{{ member.name }}</h2>
                  <span class="founder-role">{{ member.role }}</span>

                  <div class="founder-chips" aria-label="Credentials">
                    @for (chip of member.chips; track chip) {
                      <span class="chip-item">{{ chip }}</span>
                    }
                  </div>

                  <p class="founder-bio">{{ member.bio }}</p>

                  <div class="founder-social">
                    <a
                      class="founder-social-link"
                      [href]="member.linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      [attr.aria-label]="member.linkedinLabel"
                    >
                      <span>{{ member.linkedinLabel }}</span>
                    </a>
                  </div>
                </div>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- Section 2: How We Work (Principles) -->
      <section class="site-section team-principles-section" id="team-standards">
        <!-- Ambient Glow Circle matching Figma -->
        <div class="ambient-glow glow--team-pillars" aria-hidden="true"></div>

        <div class="container">
          <div class="section-header section-header--center reveal-on-scroll">
            <span class="section-tag-subtle">{{ about.principles.tag }}</span>
            <h2 class="section-heading-twotone" id="standards-title">
              <span class="heading-primary">{{ about.principles.titlePrimary }}</span>
              <span class="heading-secondary">{{ about.principles.titleSecondary }}</span>
            </h2>
            <p class="section-subhead">
              {{ about.principles.subhead }}
            </p>
          </div>

          <div class="interfaces-grid team-principles-grid">
            <!-- Pillar 1 -->
            @if (principle1; as p) {
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
                <h3 class="card-title">{{ p.title }}</h3>
                <p class="card-description">{{ p.description }}</p>
              </article>
            }

            <!-- Pillar 2 -->
            @if (principle2; as p) {
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
                <h3 class="card-title">{{ p.title }}</h3>
                <p class="card-description">{{ p.description }}</p>
              </article>
            }

            <!-- Pillar 3 -->
            @if (principle3; as p) {
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
                <h3 class="card-title">{{ p.title }}</h3>
                <p class="card-description">{{ p.description }}</p>
              </article>
            }
          </div>
        </div>
      </section>
    </div>
  `
})
export default class AboutPage {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  protected readonly about = aboutContent;
  protected readonly alejandro = this.about.teamMembers.find((m: any) => m.id === 'alejandro');
  protected readonly yolanda = this.about.teamMembers.find((m: any) => m.id === 'yolanda');
  protected readonly principle1 = this.about.principles.pillars[0];
  protected readonly principle2 = this.about.principles.pillars[1];
  protected readonly principle3 = this.about.principles.pillars[2];

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser) {
        initScrollReveal();
      }
    });
  }
}
