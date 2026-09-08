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
          <span class="hero-eyebrow">Direct Senior Execution</span>

          <h1 class="hero-title">
            Where high-precision design<br />
            <span class="hero-title__accent">meets production engineering.</span>
          </h1>

          <p class="hero-subheadline">
            Direct collaboration with a Fortune 100 Principal Engineer and Lead Product Designer. We
            engineer sub-second web applications, robust design systems, and bespoke digital
            flagships without agency overhead.
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
              <span class="proof-text"><strong>20+ years</strong> experience</span>
            </div>
            <span class="proof-sep" aria-hidden="true">•</span>
            <div class="proof-item">
              <span class="proof-text">Fortune 100 track record</span>
            </div>
            <span class="proof-sep" aria-hidden="true">•</span>
            <div class="proof-item">
              <span class="proof-text">100% senior density</span>
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
