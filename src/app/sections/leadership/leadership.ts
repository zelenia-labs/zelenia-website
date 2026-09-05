import { Component, inject } from '@angular/core';
import { StudioContent } from '../../content/studio-content';
import { PartnerCard } from './partner-card';
import { ScrollReveal } from '../../ui/motion/scroll-reveal';

@Component({
  selector: 'app-leadership',
  imports: [PartnerCard, ScrollReveal],
  template: `
    <section
      class="site-section leadership-section"
      id="leadership"
      aria-labelledby="leadership-title"
    >
      <div class="container" appScrollReveal>
        <div class="section-header">
          <span class="section-tag">Who We Are</span>
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
  private readonly studio = inject(StudioContent);
  readonly site = this.studio.site;
}
