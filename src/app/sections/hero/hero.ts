import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudioContent } from '../../content/studio-content';
import { AmbientCanvas } from '../../ui/canvas/ambient-canvas';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, AmbientCanvas],
  template: `
    <!-- Editorial Studio Hero Stage -->
    <header class="hero-section" id="hero" aria-label="Studio Introduction">
      <!-- Ambient Canvas -->
      <app-ambient-canvas />

      <div class="container hero-container">
        <div class="hero-editorial">
          <span class="hero-eyebrow">Direct Senior Execution — Zero Agency Layers</span>

          <h1 class="hero-title">
            Production frontend engineering &amp; design.<br />
            <span class="hero-title__accent">Executed directly by the founders.</span>
          </h1>

          <p class="hero-subheadline">
            We repair critical web vitals, build resilient design systems, and modernize digital
            surfaces for tech scale-ups and high-value practices—with zero junior handoffs.
          </p>

          <div class="hero-actions">
            <a class="btn btn--primary btn--hero-cta" routerLink="/process">
              <span>Scope Your Project</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
          </div>

          <div class="hero-proof-bar" aria-label="Studio Credentials">
            <div class="proof-item">
              <span class="proof-dot" aria-hidden="true"></span>
              <span class="proof-text"><strong>20+ years</strong> enterprise experience</span>
            </div>
            <div class="proof-item">
              <span class="proof-dot" aria-hidden="true"></span>
              <span class="proof-text">Fortune 100 track record &amp; GDE</span>
            </div>
            <div class="proof-item">
              <span class="proof-dot" aria-hidden="true"></span>
              <span class="proof-text">Capped at 2 concurrent client sprints</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class Hero {
  private readonly studio = inject(StudioContent);
  readonly site = this.studio.site;
}
