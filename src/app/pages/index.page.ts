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
  title: 'Zelenia | Fast, Thoughtful Websites & Product Design',
  meta: [
    {
      name: 'description',
      content:
        'Improve your website with sub-second speeds, clean design systems, and direct practitioner execution by a Google Developer Expert and a Lead Product Designer.'
    },
    {
      property: 'og:title',
      content: 'Zelenia | Fast, Thoughtful Websites & Product Design'
    },
    {
      property: 'og:description',
      content:
        'Thoughtful product design and high-performance web engineering by Yolanda Santa Cruz and Alejandro Cuba. Fast, beautiful websites with zero agency runaround.'
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
