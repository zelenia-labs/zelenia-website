import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StarfieldCanvas } from './starfield-canvas';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, StarfieldCanvas],
  template: `
    <header class="hero-section" id="hero" aria-label="Studio Introduction">
      <!-- High-Performance Interactive Three.js Grain Canvas Host -->
      <app-starfield-canvas></app-starfield-canvas>

      <div class="container hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="hero-title__line">Improve your</span>
            <span class="hero-title__line hero-title__line--secondary">website</span>
          </h1>

          <p class="hero-subheadline">
            Turn your website into a fast and well designed experience. Modern design and precision engineering built to load instantly, rank on search engines, and remain fully discoverable across modern AI models.
          </p>

          <!-- Primary Pill Action Button matching x=160, y=485, rx=21.5 in design.svg -->
          <div class="hero-action-dock">
            <a class="btn btn--pill-hero" routerLink="/contact">
              <span>Schedule a consultation</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Authority & Trust Ribbon -->
      <div class="hero-trust-ribbon" role="region" aria-label="Core Capabilities and Standards">
        <div class="container trust-ribbon-container">
          <div class="hero-metrics-bar trust-ribbon-grid" aria-label="Core Capabilities Summary">
            <div class="trust-item metric-item">
              <span class="trust-icon" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </span>
              <span class="trust-statement">Sub-second speed on every screen
              </span>
            </div>

            <div class="trust-item metric-item">
              <span class="trust-icon" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="8" r="4"></circle>
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                  <circle cx="19" cy="7" r="2"></circle>
                  <path d="M22 17v-1a3 3 0 0 0-2-2.8"></path>
                </svg>
              </span>
              <span class="trust-statement">Google Developer Expert &amp; Fortune 100 Designer
              </span>
            </div>

            <div class="trust-item metric-item">
              <span class="trust-icon" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </span>
              <span class="trust-statement">
                Direct execution with zero agency overhead
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class Hero { }
