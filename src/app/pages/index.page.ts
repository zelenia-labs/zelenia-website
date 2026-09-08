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
import { PageFaq, PageFaqItem } from '../ui/faq/page-faq';

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
    TransparencyFit,
    PageFaq
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

    <!-- Section 3: Core Capabilities Overview -->
    <app-capabilities-summary />

    <!-- Section 4: Radical Transparency & Mutual Fit Filter -->
    <app-transparency-fit />

    <!-- Section 5: Commercial Hesitation FAQ & Contact Gateway -->
    <div id="commercial-faq">
      <app-page-faq
        tag="Commercial FAQ"
        title="What teams ask before committing to a senior sprint."
        subtitle="Transparent answers regarding studio capacity, asset ownership, warranties, and in-house adoption."
        [items]="commercialFaqs"
      />

      <section class="site-section home-gateway-section">
        <div class="container" style="text-align: center;">
          <span class="section-tag">Direct Collaboration</span>
          <h2 class="section-title">Ready to build without the agency overhead?</h2>
          <p class="section-subhead" style="margin-inline: auto; margin-bottom: 2rem;">
            Connect directly with Alejandro and Yolanda. Zero sales representatives, zero account
            managers, just direct senior execution.
          </p>
          <div class="gateway-actions">
            <a class="btn btn--primary" routerLink="/contact">
              <span>Three Ways to Get Started</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
            <a class="btn btn--secondary" routerLink="/process">
              <span>Calculate Scope &amp; Timeline</span>
              <span class="arrow-indicator" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
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

  readonly commercialFaqs: PageFaqItem[] = [
    {
      q: 'Can a two-person studio handle our entire web overhaul?',
      a: 'Yes. Traditional agencies allocate over 40% of billable hours to account managers, internal coordination, and junior revisions. A seasoned Principal Engineer and Lead Designer working in tight unison move faster, produce cleaner architecture, and deliver higher baseline performance.'
    },
    {
      q: 'Do we own all deliverables and source code?',
      a: 'Completely. Work is conducted either directly in your Git organization or transferred upon milestone completion. You retain 100% ownership of source code, design files, and documentation with zero vendor lock-in.'
    },
    {
      q: 'What happens if an issue arises after launch?',
      a: 'Every sprint includes a complimentary 30-day technical warranty. Any regression, layout shift, or script defect introduced during our sprint is resolved immediately at zero charge.'
    },
    {
      q: 'How do our in-house engineers adopt your code?',
      a: 'We deliver clean pull requests, modular component structures, and comprehensive implementation guides. We conduct a direct engineering handoff session to ensure your team is entirely self-sufficient.'
    }
  ];
}
