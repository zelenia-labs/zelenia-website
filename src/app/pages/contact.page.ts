import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { Contact } from '../sections/contact/contact';
import { PageFaq, PageFaqItem } from '../sections/faq/page-faq';

export const routeMeta: RouteMeta = {
  title: 'Get in Touch // Yolanda & Alejandro // Zelenia Studio',
  meta: [
    {
      name: 'description',
      content:
        'Initiate your project sprint with Zelenia. Submit a scope inquiry, book an intro call, or email us directly.'
    },
    {
      property: 'og:title',
      content: 'Get in Touch // Yolanda & Alejandro // Zelenia Studio'
    },
    {
      property: 'og:description',
      content:
        'Talk directly with both of us. No salespeople, no account managers, and no runaround.'
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
        tag="Questions &amp; Answers"
        title="What to expect when"
        titleSecondary="reaching out to us."
        subtitle="Clear answers about response times, confidentiality, and our intro chats."
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
      q: 'How quickly will we hear back after reaching out?',
      a: 'Every inquiry is reviewed directly by the two of us within one business day (Monday to Friday, 9:00 AM to 6:00 PM EST). We will follow up personally with clear next steps.'
    },
    {
      q: 'Are intro calls free and without sales pressure?',
      a: 'Yes, completely free and with zero sales pressure. You speak directly with both of us to explore what you need, see if we’re a great fit, and talk through ideas. No pitch decks, no salespeople.'
    },
    {
      q: 'Can we sign an NDA before sharing details?',
      a: 'Of course. We are always happy to sign a mutual NDA before reviewing your repositories, product roadmap, or confidential assets.'
    },
    {
      q: 'What information is most helpful to share upfront?',
      a: 'Your current website URL, tech stack, what you’re hoping to improve (e.g. slow load times, outdated design, accessibility issues), and your ideal timeline. Our intake form makes sharing this quick and simple.'
    }
  ];
}
