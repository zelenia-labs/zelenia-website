import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  template: `
    <header class="hero-section" id="hero" aria-label="Studio Introduction">
      <!-- Noise Effect Overlay: Mono, size 0.5, density 100%, color #FFFFFF 15% -->
      <div class="section-noise-overlay" aria-hidden="true"></div>

      <div class="container hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="hero-title__line">High-performance web</span>
            <span class="hero-title__line hero-title__line--secondary">executed by founders</span>
          </h1>

          <p class="hero-subheadline">
            Direct senior partnership pairing a Fortune 100 Principal Engineer &amp; GDE with a
            Lead Product Designer. Sub-second performance and bespoke design systems delivered in
            2–4 week focused sprints—with zero agency overhead.
          </p>

          <!-- Primary Pill Action Button matching x=160, y=485, rx=21.5 in design.svg -->
          <div class="hero-action-dock">
            <a class="btn btn--pill-hero" routerLink="/contact">
              <span>Start conversation</span>
            </a>
          </div>

          <!-- Bottom Metric Tiers separated by fine dividers -->
          <div class="hero-metrics-bar" aria-label="Core Capabilities Summary">
            <div class="metric-item">
              <span class="metric-label">Sub-Second Speed</span>
              <span class="metric-sub">LCP &lt; 1.0s &amp; CrUX RUM</span>
            </div>
            <div class="metric-divider" aria-hidden="true"></div>
            <div class="metric-item">
              <span class="metric-label">Senior Density</span>
              <span class="metric-sub">Fortune 100 Architect &amp; Lead Designer</span>
            </div>
            <div class="metric-divider" aria-hidden="true"></div>
            <div class="metric-item">
              <span class="metric-label">Direct Execution</span>
              <span class="metric-sub">Zero agency overhead &amp; handoff decay</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class Hero {}
