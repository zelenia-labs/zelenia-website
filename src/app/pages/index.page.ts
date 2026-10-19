import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { Hero } from '../sections/hero/hero';
import { EngagementTracks } from '../sections/hero/engagement-tracks';
import { MetricsTracking } from '../sections/hero/metrics-tracking';
import { Advantage } from '../sections/advantage/advantage';
import { PersonalizedPlan } from '../sections/diagnostic/personalized-plan';
import { Leadership } from '../sections/leadership/leadership';
import { PageFaq, PageFaqItem } from '../sections/faq/page-faq';
import { ProjectCta } from '../sections/footer/project-cta';

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
    Leadership,
    PageFaq,
    ProjectCta
  ],
  template: `
    <app-hero />
    <app-engagement-tracks />
    <app-metrics-tracking />
    <app-advantage />
    <app-personalized-plan />
    <app-leadership />
    <app-page-faq
      tag="Process &amp; Delivery"
      title="How our sprints"
      titleSecondary="operate in practice."
      subtitle="Clear answers about sprint cadence, weekly staging progress, repository access, and scope changes."
      [items]="processFaqs"
      [showInquiry]="false"
    />
    <app-project-cta />
  `
})
export default class Home {
  readonly processFaqs: PageFaqItem[] = [
    {
      q: 'How do you calculate sprint timelines and delivery milestones?',
      a: 'Timelines are determined directly by the technical scope of the sprint (performance remediation, accessibility audit, or custom build) and your chosen cadence (Standard vs Accelerated). Sprints range from 2 to 8 weeks with fixed weekly milestone deliveries into your staging environment.'
    },
    {
      q: 'Can we book an Accelerated Priority Sprint for a fixed deadline?',
      a: 'Yes. In an accelerated sprint, both of us dedicate our full daily focus to your project, with daily staging updates and quick feedback loops to meet critical launch dates.'
    },
    {
      q: 'Do you require direct access to our production infrastructure?',
      a: 'No. We work through feature branches in your Git repository and test against staging/preview environments. Your production deployment pipeline and credentials remain strictly under your control.'
    },
    {
      q: 'What happens if we discover new requirements mid-sprint?',
      a: 'Because you work directly with Yolanda and Alejandro without account manager intermediaries, scope adjustments are straightforward to talk through. We can test ideas right away in code and staging without delays, either swapping sprint priorities or scheduling a follow-up milestone.'
    }
  ];
}
