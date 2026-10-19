import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { Hero } from '../sections/hero/hero';
import { EngagementTracks } from '../sections/hero/engagement-tracks';
import { MetricsTracking } from '../sections/hero/metrics-tracking';
import { Advantage } from '../sections/advantage/advantage';
import { PersonalizedPlan } from '../sections/diagnostic/personalized-plan';
import { Leadership } from '../sections/leadership/leadership';
import { Faq } from '../sections/faq/page-faq';
import { SendMessage } from '../sections/send-message/send-message';
import indexContent from './index.content.md';

export const routeMeta: RouteMeta = {
  title: indexContent.meta.title,
  meta: [
    {
      name: 'description',
      content: indexContent.meta.description
    },
    {
      property: 'og:title',
      content: indexContent.meta.ogTitle
    },
    {
      property: 'og:description',
      content: indexContent.meta.ogDescription
    },
    {
      property: 'og:image',
      content: indexContent.meta.ogImage
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
    Faq,
    SendMessage
  ],
  template: `
    <app-hero />
    <app-engagement-tracks />
    <app-metrics-tracking />
    <app-advantage />
    <app-personalized-plan />
    <app-leadership />
    <app-faq />
    <app-send-message />
  `
})
export default class Home {}
