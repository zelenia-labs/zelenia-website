import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  template: `
    <header class="hero-section" id="hero" aria-label="Studio Introduction">
      <!-- Background Video & Exact Figma Layer Stack -->
      <div class="hero-media-wrapper" aria-hidden="true">
        <video
          class="hero-video"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          poster="/assets/images/hero-workspace-bg.jpg"
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      <!-- 1. Progressive Layer Blur (0px to 30px) -->
      <div class="hero-layer-blur" aria-hidden="true"></div>
      <!-- 2. Solid Color Fill: #462411 at 20% opacity -->
      <div class="hero-fill-warm" aria-hidden="true"></div>
      <!-- 3. Linear Gradient Fill: #666666 100% to 0% at 20% opacity -->
      <div class="hero-fill-charcoal" aria-hidden="true"></div>
      <!-- 4. Linear Gradient Fill: #1E595C 100% to 0% at 20% opacity -->
      <div class="hero-fill-teal" aria-hidden="true"></div>
      <!-- 5. Effect: Multi Noise (size 0.5, density 100%, opacity 25%) -->
      <div class="hero-effect-noise" aria-hidden="true"></div>

      <div class="container hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="hero-title__line">Improve your</span>
            <span class="hero-title__line hero-title__line--secondary">online presence</span>
          </h1>

          <p class="hero-subheadline">
            We are a design and engineering couple crafting fast, thoughtful websites together with
            personal care, direct communication, and zero agency runaround.
          </p>

          <!-- Primary Pill Action Button matching x=160, y=485, rx=21.5 in design.svg -->
          <div class="hero-action-dock">
            <a class="btn btn--pill-hero" routerLink="/contact">
              <span>Get in touch</span>
            </a>
          </div>

          <!-- Bottom Metric Tiers separated by fine dividers -->
          <div class="hero-metrics-bar" aria-label="Core Capabilities Summary">
            <div class="metric-item">
              <span class="metric-label">Speed &amp; Search</span>
              <span class="metric-sub">Sub-second page loads</span>
            </div>
            <div class="metric-divider" aria-hidden="true"></div>
            <div class="metric-item">
              <span class="metric-label">Fractional Partnership</span>
              <span class="metric-sub">Full design-to-code</span>
            </div>
            <div class="metric-divider" aria-hidden="true"></div>
            <div class="metric-item">
              <span class="metric-label">Direct Collaboration</span>
              <span class="metric-sub">Zero agency runaround</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class Hero {}
