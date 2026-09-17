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

          <!-- Founder Trust Lockup (Links to /team) -->
          <a
            class="hero-founders-lockup"
            routerLink="/team"
            aria-label="Meet the Founders: Alejandro Cuba Ruiz &amp; Yolanda Santa Cruz"
          >
            <div class="founders-avatars">
              <img
                src="/assets/images/portrait_alejandro.jpg"
                alt="Alejandro Cuba Ruiz - Google Developer Expert"
                class="founder-avatar"
                width="36"
                height="36"
                loading="eager"
              />
              <img
                src="/assets/images/portrait_yolanda.jpg"
                alt="Yolanda Santa Cruz - Lead Product Designer"
                class="founder-avatar"
                width="36"
                height="36"
                loading="eager"
              />
            </div>
            <div class="founders-meta">
              <span class="founders-names">Alejandro Cuba Ruiz & Yolanda Santa Cruz</span>
              <span class="founders-credentials">Google Developer Expert & Lead Product Designer</span>
            </div>
          </a>

          <!-- Hero Actions -->
          <div class="hero-actions">
            <a class="btn btn--primary btn--hero-cta" routerLink="/process">
              <span>Scope Your Project</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
            <a class="hero-secondary-link" routerLink="/process">
              <span>Calculate Scope &amp; Timeline</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
            </a>
          </div>

          <!-- Live Runtime Telemetry & Speed Dock -->
          <div class="hero-telemetry-dock" aria-label="Live Performance Metrics">
            <div class="dock-metric">
              <span class="metric-value">&lt; 0.8s</span>
              <span class="metric-label">Real-World LCP</span>
            </div>
            <div class="dock-divider" aria-hidden="true"></div>
            <div class="dock-metric">
              <span class="metric-value">0.00</span>
              <span class="metric-label">Zero Layout Shift</span>
            </div>
            <div class="dock-divider" aria-hidden="true"></div>
            <div class="dock-metric">
              <span class="metric-value">&lt; 50ms</span>
              <span class="metric-label">Interaction (INP)</span>
            </div>
            <div class="dock-divider" aria-hidden="true"></div>
            <div class="dock-metric">
              <span class="metric-value">100%</span>
              <span class="metric-label">Semantic HTML &amp; SEO</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class Hero {}
