import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StarfieldCanvas } from '../starfield';
import heroContent from './hero.content.md';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, StarfieldCanvas],
  template: `
    <header class="hero-section" id="hero" aria-label="Studio Introduction">
      <!-- High-Performance Interactive Three.js Grain Canvas Host -->
      <app-starfield-canvas #starfield></app-starfield-canvas>

      <div class="container hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="hero-title__line hero-title__line--primary">{{ content.titlePrimary }}</span>
            <span class="hero-title__line hero-title__line--secondary">{{ content.titleSecondary }}</span>
          </h1>

          <p class="hero-subheadline">
            {{ content.subheadline }}
          </p>

          <!-- Primary Pill Action Button matching x=160, y=485, rx=21.5 in design.svg -->
          <div class="hero-action-dock">
            <a class="btn btn--pill-hero" routerLink="/contact">
              <span>{{ content.ctaText }}</span>
            </a>
          </div>
        </div>

        <!-- Starfield Advisory Notice in natural flow, between CTA and Trust Ribbon -->
        @if (starfield.activeNotice(); as notice) {
          <aside class="hero-starfield-advisory" role="status" aria-live="polite">
            <div class="advisory-pill">
              <div class="advisory-text">
                <span class="advisory-msg">{{ notice.message }}</span>
                <span class="advisory-instruction">{{ notice.instruction }}</span>
              </div>
              @if (starfield.isIgniting()) {
                <div class="advisory-spinner-container" role="status" aria-label="Igniting starfield">
                  <span class="advisory-spinner" aria-hidden="true"></span>
                </div>
              } @else {
                <button
                  type="button"
                  class="advisory-action-btn"
                  (click)="starfield.forceEnable()"
                >
                  {{ notice.actionText }}
                </button>
              }
              <button
                type="button"
                class="advisory-dismiss-btn"
                (click)="starfield.dismissNotice()"
                aria-label="Dismiss starfield advisory"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </aside>
        }
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
              <span class="trust-statement">{{ content.trustPillars[0] }}</span>
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
              <span class="trust-statement">{{ content.trustPillars[1] }}</span>
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
              <span class="trust-statement">{{ content.trustPillars[2] }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class Hero {
  protected readonly content = heroContent;
}
