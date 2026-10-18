import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StarfieldCanvas } from '../starfield';

@Component({
  selector: 'app-personalized-plan',
  imports: [RouterLink, StarfieldCanvas],
  template: `
    <section
      class="site-section personalized-plan-section"
      id="plan"
      aria-labelledby="plan-heading"
    >
      <!-- Atmospheric Dynamic Three.js WebGL & Accessible Static SVG Starfield -->
      <app-starfield-canvas></app-starfield-canvas>

      <div class="container plan-container">
        <!-- Left Editorial Content -->
        <div class="plan-content reveal-on-scroll">
          <h2 class="plan-title" id="plan-heading">
            <span class="plan-title__primary">Wondering why your site feels slow</span>
            <span class="plan-title__secondary">or why visitors leave before reaching out?</span>
          </h2>

          <p class="plan-subtitle">
            Request a complimentary website speed and health review. We look at your live site,
            pinpointing what is slowing down your pages (from oversized photography to heavy
            scripts), and deliver a clear, practical plan to speed it up.
          </p>

          <ul class="plan-steps-list" aria-label="Review highlights">
            <li>
              <span class="step-bullet" aria-hidden="true">&bull;</span>
              <span>Delivered in 3 business days</span>
            </li>
            <li>
              <span class="step-bullet" aria-hidden="true">&bull;</span>
              <span>100% confidential &bull; <abbr title="Non-Disclosure Agreement" class="abbr-tooltip">NDA</abbr> included</span>
            </li>
            <li>
              <span class="step-bullet" aria-hidden="true">&bull;</span>
              <span>Actionable engineering roadmap with zero obligation</span>
            </li>
          </ul>

          <div class="plan-action">
            <a
              class="btn btn--pill-plan"
              routerLink="/contact"
              [queryParams]="{ focus: 'vitals' }"
              aria-label="Request a complimentary website speed and health review"
            >
              <span>Request Free Audit</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Right Visual Mockup (Multi-Page Document Reader) -->
      <div class="plan-preview-dock reveal-on-scroll reveal-delay-2">
        <img
          src="/assets/images/audit-report-preview.jpg"
          alt="Zelenia Website Speed and Health Audit Report Sample Preview"
          class="plan-preview-image"
          width="768"
          height="1024"
          loading="lazy"
        />
      </div>
    </section>
  `,
  styles: `
    .personalized-plan-section {
      background-color: var(--color-black);
      background: var(--color-black);
      color: var(--color-white);
      padding-block: clamp(4.5rem, 8vw, 6.5rem);
      overflow: hidden;
      position: relative;
    }

    @media (max-width: 959px) {
      .personalized-plan-section {
        display: flex;
        flex-direction: column;
        padding-block-end: 0;
      }
    }

    @media (min-width: 960px) {
      .personalized-plan-section {
        display: flex;
        align-items: center;
        min-height: clamp(640px, 48vw, 760px);
      }
    }

    .plan-container {
      position: relative;
      z-index: 2;
      width: 100%;
    }

    .plan-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 540px;
    }

    .plan-title {
      margin: 0;
      display: flex;
      flex-direction: column;
      font-size: clamp(2rem, 3.6vw, 3rem);
      letter-spacing: -0.04em;
      line-height: 1.2;
      font-family: var(--font-sans);
    }

    .plan-title__primary {
      font-weight: 500;
      color: var(--color-white);
      line-height: 1.2;
      letter-spacing: -0.04em;
    }

    .plan-title__secondary {
      font-weight: 500;
      color: var(--color-sage-light);
      line-height: 1.2;
      letter-spacing: -0.04em;
    }

    .plan-subtitle {
      margin-block-start: 1.25rem;
      margin-block-end: 0;
      font-family: var(--font-sans);
      font-size: clamp(0.95rem, 1.2vw, 1.05rem);
      font-weight: 400;
      line-height: 1.6;
      letter-spacing: -0.02em;
      color: var(--color-sage-tint);
    }

    .plan-steps-list {
      list-style: none;
      padding: 0;
      margin: 1.5rem 0 2rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .plan-steps-list li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.95rem;
      color: var(--color-white);
    }

    .step-bullet {
      font-size: 1.2rem;
      color: var(--color-sage-light);
      line-height: 1;
      flex-shrink: 0;
    }

    .abbr-tooltip {
      text-decoration: underline dotted var(--color-sage-light);
      text-underline-offset: 3px;
      cursor: help;
      color: inherit;
    }

    .plan-action {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      flex-wrap: wrap;
    }

    .btn--pill-plan {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      height: 44px;
      padding-inline: 1.75rem;
      background-color: var(--color-white);
      color: var(--dark-ink);
      font-size: 0.925rem;
      font-weight: 600;
      border-radius: var(--radius-pill);
      text-decoration: none;
      border: none;
      box-shadow: 0 4px 14px var(--color-black-subtle);
      transition: background-color var(--transition-fast);
      white-space: nowrap;
    }

    .btn--pill-plan:hover {
      background-color: var(--color-surface-hover);
    }

    .plan-preview-dock {
      position: absolute;
      right: 0;
      bottom: 0;
      width: clamp(340px, 34vw, 490px);
      border-top-left-radius: 28px;
      overflow: hidden;
      box-shadow: -16px -16px 48px var(--color-black-heavy);
      z-index: 2;
      line-height: 0;
    }

    @media (max-width: 959px) {
      .plan-preview-dock {
        position: relative;
        margin-top: 2.75rem;
        margin-left: auto;
        margin-right: 0;
        margin-bottom: 0;
        width: min(92%, 420px);
        border-top-left-radius: 24px;
        box-shadow: -12px -12px 32px var(--color-black-heavy);
      }

      .plan-action {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }
    }

    .plan-preview-image {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
      object-position: top center;
    }
  `
})
export class PersonalizedPlan {}
