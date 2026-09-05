import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { Hero } from '../sections/hero/hero';
import { Leadership } from '../sections/leadership/leadership';
import { Advantage } from '../sections/advantage/advantage';
import { CapabilitiesSummary } from '../sections/capabilities/capabilities-summary';
import { Diagnostic } from '../sections/diagnostic/diagnostic';
import { Contact } from '../sections/contact/contact';

export const routeMeta: RouteMeta = {
  title: 'Zelenia // Boutique Frontend Engineering & Product Design Studio',
  meta: [
    {
      name: 'description',
      content:
        'Zelenia is an elite two-partner studio pairing a Fortune 100 Principal Engineer with an industry-tested Lead Product Designer. We repair critical web vitals, rebuild complex digital interfaces, and deliver production-ready software without the agency overhead.'
    },
    {
      property: 'og:title',
      content: 'Zelenia // Boutique Frontend Engineering & Product Design Studio'
    },
    {
      property: 'og:description',
      content:
        'Zelenia pairs a Fortune 100 Principal Engineer with a Lead Product Designer. High-resilience web performance, design systems, and direct partner execution.'
    },
    {
      property: 'og:image',
      content: 'https://zelenia.com/assets/images/og-image.jpg'
    }
  ]
};

@Component({
  selector: 'app-home',
  imports: [Hero, Leadership, Advantage, CapabilitiesSummary, Diagnostic, Contact],
  template: `
    <app-hero />
    <app-leadership />
    <app-advantage />
    <app-capabilities-summary />
    <app-diagnostic />
    <app-contact />
  `
})
export default class Home {}
