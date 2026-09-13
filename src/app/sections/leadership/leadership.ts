import { Component, inject } from '@angular/core';
import { WebsiteContent } from '../../content/website-content';
import { PartnerCard } from './partner-card';

@Component({
  selector: 'app-leadership',
  imports: [PartnerCard],
  template: `
    <section
      class="site-section leadership-section"
      id="leadership"
      aria-labelledby="leadership-title"
    >
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" id="leadership-title">
            Meet the makers behind every pixel and line of code.
          </h2>
          <p class="section-subhead">
            We're Alejandro and Yolanda &mdash; two dedicated senior partners who build
            high-performance digital products directly with you. Zero junior handoffs, zero agency
            bureaucracy, just deep craft and genuine partnership.
          </p>
        </div>

        <div class="leadership-grid">
          @for (partner of site().partners; track partner.name) {
            <app-partner-card [partner]="partner" />
          }
        </div>
      </div>
    </section>
  `
})
export class Leadership {
  private readonly website = inject(WebsiteContent);
  readonly site = this.website.site;
}
