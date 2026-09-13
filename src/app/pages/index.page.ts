import { afterNextRender, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { Hero } from '../sections/hero/hero';
import { SpeedAudit } from '../sections/hero/speed-audit';
import { IntentNavigator } from '../sections/hero/intent-navigator';
import { Advantage } from '../sections/advantage/advantage';
import { CapabilitiesSummary } from '../sections/capabilities/capabilities-summary';
import { TransparencyFit } from '../sections/transparency/transparency-fit';
import { PageFaq, PageFaqItem } from '../sections/faq/page-faq';

export const routeMeta: RouteMeta = {
  title: 'Zelenia // Frontend Engineering & Product Design Studio',
  meta: [
    {
      name: 'description',
      content:
        'Zelenia pairs a Fortune 100 Principal Engineer with an industry-tested Lead Product Designer. We repair critical web vitals, rebuild complex digital interfaces, and deliver production-ready software without agency overhead.'
    },
    {
      property: 'og:title',
      content: 'Zelenia // Frontend Engineering & Product Design Studio'
    },
    {
      property: 'og:description',
      content:
        'Direct senior execution. Web performance engineering, accessible UI architecture, and zero agency bureaucracy.'
    },
    {
      property: 'og:image',
      content: 'https://zelenia.com/assets/images/og-image.jpg'
    }
  ]
};

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    Hero,
    SpeedAudit,
    IntentNavigator,
    Advantage,
    CapabilitiesSummary,
    TransparencyFit
  ],
  template: `
    <!-- Section 1: Editorial Studio Hero Stage -->
    <app-hero />

    <!-- Section 2: Dedicated Live Site Speed Audit -->
    <app-speed-audit />

    <!-- Section 3: Standalone Direct Intent Navigator -->
    <app-intent-navigator />

    <!-- Section 4: The Advantage & Senior Density -->
    <app-advantage />

    <!-- Section 5: Core Capabilities Overview -->
    <app-capabilities-summary />

    <!-- Section 6: Radical Transparency & Mutual Fit Filter -->
    <app-transparency-fit />

    <!-- Section 7: Direct Collaboration Gateway -->
    <section class="site-section home-gateway-section">
      <div class="container" style="text-align: center;">
        <h2 class="section-title">Ready to build without agency overhead?</h2>
        <p class="section-subhead" style="margin-inline: auto; margin-bottom: 2rem;">
          Connect directly with Alejandro and Yolanda. Zero sales representatives, zero account
          managers, direct senior execution.
        </p>
        <div class="gateway-actions">
          <a class="btn btn--primary" routerLink="/contact">
            <span>Start a Conversation</span>
            <span class="arrow-indicator" aria-hidden="true">→</span>
          </a>
          <a class="btn btn--secondary" routerLink="/process">
            <span>Calculate Scope &amp; Timeline</span>
            <span class="arrow-indicator" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .home-gateway-section {
      padding-block-end: clamp(5rem, 8vw, 8rem);
      border-top: 1px solid var(--border);
    }
    .gateway-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
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
