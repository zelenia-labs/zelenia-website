import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebsiteContent } from '../../content/website-content';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  template: `
    <!-- Editorial Studio Hero Stage -->
    <header class="hero-section" id="hero" aria-label="Studio Introduction">
      <div class="container hero-container">
        <div class="hero-editorial">
          <span class="hero-eyebrow">Studio // Direct Senior Execution</span>

          <h1 class="hero-title">
            Production frontend engineering &amp; design.<br />
            <span class="hero-title__accent">Executed directly by the founders.</span>
          </h1>

          <p class="hero-subheadline">
            We repair critical web vitals, build resilient design systems, and deliver production
            software for scale-ups and high-value practices—with zero junior handoffs.
          </p>

          <div class="hero-actions">
            <a class="btn btn--primary btn--hero-cta" routerLink="/process">
              <span>Scope Your Project</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `
})
export class Hero {
  private readonly website = inject(WebsiteContent);
  readonly site = this.website.site;
}
