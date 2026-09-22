import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  template: `
    <header class="hero-section" id="hero" aria-label="Studio Introduction">
      <!-- Atmospheric Architectural Light & Coordinate Grid -->
      <div class="hero-ambient-prism" aria-hidden="true"></div>
      <div class="hero-grid-matrix" aria-hidden="true"></div>

      <div class="container hero-container">
        <div class="hero-editorial">
          <h1 class="hero-title">
            High-performance web experiences.<br />
            <span class="hero-title__accent">Executed directly by the founders.</span>
          </h1>

          <p class="hero-subheadline">
            A Fortune 100 Principal Engineer and a Lead Product Designer building fast,
            high-converting digital products directly. Zero agency overhead.
          </p>

          <!-- Hero Actions -->
          <div class="hero-actions">
            <a class="btn btn--primary btn--hero-cta" routerLink="/process">
              <span>Scope &amp; Timeline</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
            <a class="btn btn--secondary" routerLink="/contact">
              <span>Start Conversation</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `
})
export class Hero {}
