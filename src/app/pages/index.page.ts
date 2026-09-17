import { afterNextRender, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { Hero } from '../sections/hero/hero';
import { EngagementTracks } from '../sections/hero/engagement-tracks';
import { Advantage } from '../sections/advantage/advantage';
import { CapabilitiesSummary } from '../sections/capabilities/capabilities-summary';

export const routeMeta: RouteMeta = {
  title: 'Zelenia — Frontend Engineering & Product Design Studio',
  meta: [
    {
      name: 'description',
      content:
        'Zelenia pairs a Fortune 100 Principal Engineer with an industry-tested Lead Product Designer. We engineer sub-second web flagships, build adaptive multi-surface architectures, and deliver production software without agency overhead.'
    },
    {
      property: 'og:title',
      content: 'Zelenia — Frontend Engineering & Product Design Studio'
    },
    {
      property: 'og:description',
      content:
        'Direct senior execution. Sub-second web vitals, adaptive viewport architectures, and zero agency bureaucracy.'
    },
    {
      property: 'og:image',
      content: 'https://zelenia.com/assets/images/og-image.jpg'
    }
  ]
};

@Component({
  selector: 'app-home',
  imports: [RouterLink, Hero, EngagementTracks, Advantage, CapabilitiesSummary],
  template: `
    <!-- Section 1: Editorial Studio Hero Stage -->
    <app-hero />

    <!-- Section 2: Core Engagement Tracks -->
    <app-engagement-tracks />

    <!-- Section 3: The Senior Density Advantage -->
    <app-advantage />

    <!-- Section 4: Core Capabilities Overview -->
    <app-capabilities-summary />

    <!-- Section 5: Direct Collaboration Gateway -->
    <section class="site-section home-gateway-section" id="gateway">
      <div class="container" style="text-align: center;">
        <div class="section-header section-header--center" style="margin-bottom: 2.25rem;">
          <span class="section-tag">Direct Collaboration</span>
          <h2 class="section-title">Build high-performance web products with zero agency overhead.</h2>
          <p class="section-subhead" style="margin-inline: auto;">
            Connect directly with Alejandro and Yolanda. Zero sales representatives, zero account
            managers—direct senior execution from day one.
          </p>
        </div>

        <div class="gateway-actions">
          <a class="btn btn--primary" routerLink="/contact">
            <span>Start a Conversation</span>
            <span class="arrow-indicator" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .home-gateway-section {
      padding-block: clamp(5rem, 8vw, 8rem);
      border-top: 1px solid var(--border);
      background-color: var(--bg);
    }
    .gateway-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
    }
    }
  `
})
export default class Home {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly route = inject(ActivatedRoute);

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser) {
        const fragment = this.route.snapshot.fragment ?? window.location.hash.replace('#', '');
        if (fragment) {
          const el = document.getElementById(fragment);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < 0 || rect.top > 160) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }
      }
    });
  }
}
