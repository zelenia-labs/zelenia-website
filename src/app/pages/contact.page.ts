import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { Contact } from '../sections/contact/contact';
import contactContent from './contact.content.md';

export const routeMeta: RouteMeta = {
  title: contactContent.meta.title,
  meta: [
    {
      name: 'description',
      content: contactContent.meta.description
    },
    {
      property: 'og:title',
      content: contactContent.meta.ogTitle
    },
    {
      property: 'og:description',
      content: contactContent.meta.ogDescription
    }
  ]
};

@Component({
  selector: 'app-contact-page',
  imports: [Contact],
  template: `
    <div class="contact-page">
      <!-- Omnichannel Intake Hub -->
      <app-contact />
    </div>
  `,
  styles: `
    .contact-page {
      position: relative;
      background-color: var(--bg);
      overflow-x: clip;
    }
  `
})
export default class ContactPage {}
