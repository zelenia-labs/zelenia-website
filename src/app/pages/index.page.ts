import { afterNextRender, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { Hero } from '../sections/hero/hero';
import { EngagementTracks } from '../sections/hero/engagement-tracks';
import { MetricsTracking } from '../sections/hero/metrics-tracking';
import { Advantage } from '../sections/advantage/advantage';
import { PersonalizedPlan } from '../sections/diagnostic/personalized-plan';
import { Leadership } from '../sections/leadership/leadership';
import { initScrollReveal } from '../ui/motion/scroll-reveal';

export const routeMeta: RouteMeta = {
  title: 'Zelenia | High-Performance Frontend Architecture & Product Design',
  meta: [
    {
      name: 'description',
      content:
        'Direct senior partnership pairing a Fortune 100 Principal Engineer & GDE with a Lead Product Designer. Sub-second performance, design systems, and zero agency overhead.'
    },
    {
      property: 'og:title',
      content: 'Zelenia | Frontend Architecture & Product Design'
    },
    {
      property: 'og:description',
      content:
        'High-performance frontend architecture and product design executed directly by Yolanda Santa Cruz and Alejandro Cuba. 2–4 week sprints, sub-second speed, zero agency overhead.'
    },
    {
      property: 'og:image',
      content: 'https://zelenia.com/assets/images/hero-workspace-bg.jpg'
    }
  ]
};

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    EngagementTracks,
    MetricsTracking,
    Advantage,
    PersonalizedPlan,
    Leadership
  ],
  template: `
    <!-- Section 1: Hero Section -->
    <app-hero />

    <!-- Section 2: Performant Interfaces -->
    <app-engagement-tracks />

    <!-- Section 3: Telemetry Benchmarks -->
    <app-metrics-tracking />

    <!-- Section 4: Common Roadblocks -->
    <app-advantage />

    <!-- Section 5: Architectural Plan -->
    <app-personalized-plan />

    <!-- Section 6: Who We Are -->
    <app-leadership />
  `
})
export default class Home {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly route = inject(ActivatedRoute);

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser) {
        initScrollReveal();
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
