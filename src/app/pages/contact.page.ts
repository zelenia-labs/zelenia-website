import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { Contact } from '../sections/contact/contact';
import { PageFaq, PageFaqItem } from '../sections/faq/page-faq';

export const routeMeta: RouteMeta = {
  title: 'Connect With the Team // Three Ways to Get Started // Zelenia',
  meta: [
    {
      name: 'description',
      content:
        'Initiate your project sprint with Zelenia. Submit a structured scope request, schedule a 15-minute strategy call, or message the founders directly.'
    },
    {
      property: 'og:title',
      content: 'Connect With the Team // Three Ways to Get Started // Zelenia'
    },
    {
      property: 'og:description',
      content:
        'Direct communication with Alejandro Cuba and Yolanda Santa Cruz. Zero sales screens, zero account managers.'
    }
  ]
};

@Component({
  selector: 'app-contact-page',
  imports: [Contact, PageFaq],
  template: `
    <div class="contact-page">
      <!-- Omnichannel Intake Hub -->
      <app-contact />

      <!-- Intake & Confidentiality FAQ -->
      <app-page-faq
        tag="Onboarding &amp; Privacy FAQ"
        title="What to expect when connecting with Zelenia."
        subtitle="Transparent answers regarding response SLAs, non-disclosure agreements, and scoping calls."
        [items]="contactFaqs"
      />
    </div>
  `,
  styles: `
    .contact-page {
      padding-block-start: clamp(3rem, 6vw, 5rem);
      padding-block-end: clamp(4rem, 8vw, 6rem);
    }
  `
})
export default class ContactPage {
  readonly contactFaqs: PageFaqItem[] = [
    {
      q: 'How quickly will we receive a response after submitting our project scope?',
      a: 'Every inquiry is reviewed directly by Alejandro and Yolanda within one business day during studio hours (Monday to Friday, 9:00 AM to 6:00 PM EST).'
    },
    {
      q: 'Are the 15-minute strategy calls free and without sales pressure?',
      a: 'Yes. You speak directly with the Principal Engineer and Lead Designer to evaluate architectural fit and technical feasibility. We do not employ sales representatives.'
    },
    {
      q: 'Can we execute a Non-Disclosure Agreement (NDA) before sharing technical details?',
      a: 'Absolutely. We routinely execute standard mutual NDAs prior to reviewing proprietary repositories, user data, or confidential product architecture.'
    },
    {
      q: 'What information is most helpful to share during initial outreach?',
      a: 'Your current website URL, existing tech stack, primary pain point (e.g. poor Core Web Vitals, accessibility audit failures, outdated UI), and target timeline. The optional technical section of our scope form makes sharing this effortless.'
    }
  ];
}
