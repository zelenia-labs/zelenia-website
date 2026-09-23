import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-personalized-plan',
  imports: [RouterLink],
  template: `
    <section
      class="site-section personalized-plan-section"
      id="plan"
      aria-labelledby="plan-heading"
    >
      <!-- Ambient Glow Circles matching Screenshot 3 & design.svg -->
      <div class="ambient-glow glow--plan-sage" aria-hidden="true"></div>
      <div class="ambient-glow glow--plan-charcoal" aria-hidden="true"></div>
      <div class="ambient-glow glow--plan-sand" aria-hidden="true"></div>

      <!-- Noise Effect Overlay: Mono, size 0.5, density 100%, color #FFFFFF 15% -->
      <div class="section-noise-overlay" aria-hidden="true"></div>

      <div class="container plan-container">
        <!-- Left Editorial Content (x=160 in design.svg) -->
        <div class="plan-content reveal-on-scroll">
          <h2 class="plan-title" id="plan-heading">
            <span class="plan-title__primary">Get your personalized</span>
            <span class="plan-title__secondary">Zelenia plan</span>
          </h2>

          <p class="plan-subtitle">
            Understand your sites potential and take action today with a personalized plan designed
            for your unique needs.
          </p>

          <ol class="plan-steps-list" aria-label="Assessment steps">
            <li>
              <span class="step-angular-bracket" aria-hidden="true">[ 1 ]</span>
              <span>Focused payloads</span>
            </li>
            <li>
              <span class="step-angular-bracket" aria-hidden="true">[ 2 ]</span>
              <span>Cleaner structure</span>
            </li>
            <li>
              <span class="step-angular-bracket" aria-hidden="true">[ 3 ]</span>
              <span>Intentional UX</span>
            </li>
          </ol>

          <div class="plan-action">
            <a class="btn btn--pill-plan" routerLink="/process">
              <span>Get a free audit</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Right Visual Mockup (aligned to bottom right of section like reference) -->
      <div class="plan-preview-dock reveal-on-scroll reveal-delay-2">
        <img
          src="/assets/images/personalized-plan-preview.png"
          alt="Personalized Zelenia Plan Protocol Preview"
          class="plan-preview-image"
          width="506"
          height="661"
          loading="lazy"
        />
      </div>
    </section>
  `,
  styles: `
    .personalized-plan-section {
      background: linear-gradient(135deg, #95afb5 0%, #829da3 100%);
      color: #ffffff;
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

    .glow--plan-sage {
      width: 751px;
      height: 751px;
      background-color: #b5bf9c;
      opacity: 0.7;
      filter: blur(140px);
      top: 10%;
      right: -120px;
    }

    .glow--plan-charcoal {
      width: 618px;
      height: 618px;
      background-color: #6a7370;
      opacity: 0.21;
      filter: blur(90px);
      top: 5%;
      left: -140px;
    }

    .glow--plan-sand {
      width: 541px;
      height: 541px;
      background-color: #f2e5c8;
      opacity: 0.135;
      filter: blur(90px);
      top: -100px;
      right: 20%;
    }

    .plan-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 480px;
    }

    .plan-title {
      margin: 0;
      display: flex;
      flex-direction: column;
      font-size: clamp(2.25rem, 4vw, 3.25rem);
      letter-spacing: -0.04em;
      line-height: 1.2;
      font-family: var(--font-sans);
    }

    .plan-title__primary {
      font-weight: 500;
      color: #ffffff;
      line-height: 1.2;
      letter-spacing: -0.04em;
    }

    .plan-title__secondary {
      font-weight: 500;
      color: #d5dfe1;
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
      color: #e3eced;
    }

    .plan-steps-list {
      list-style: none;
      padding: 0;
      margin: 1.75rem 0 2rem 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .plan-steps-list li {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      font-size: 0.95rem;
      color: #ffffff;
    }

    .step-angular-bracket {
      font-size: 0.95rem;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: -0.01em;
      font-family: var(--font-sans);
      flex-shrink: 0;
    }

    .btn--pill-plan {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      height: 42px;
      padding-inline: 1.75rem;
      background-color: #ffffff;
      color: var(--text);
      font-size: 0.95rem;
      font-weight: 550;
      border-radius: var(--radius-pill);
      text-decoration: none;
      border: none;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      transition: background-color var(--transition-fast);
    }

    .btn--pill-plan:hover {
      background-color: #f4f5f6;
    }

    .plan-preview-dock {
      position: absolute;
      right: 0;
      bottom: 0;
      width: clamp(380px, 35.5vw, 506px);
      border-top-left-radius: 32px;
      overflow: hidden;
      box-shadow: -16px -16px 48px rgba(0, 0, 0, 0.14);
      z-index: 2;
      line-height: 0;
    }

    @media (max-width: 959px) {
      .plan-preview-dock {
        position: relative;
        margin-top: 3rem;
        margin-left: auto;
        margin-right: 0;
        margin-bottom: 0;
        width: min(92%, 460px);
        border-top-left-radius: 24px;
        box-shadow: -12px -12px 32px rgba(0, 0, 0, 0.14);
      }
    }

    .plan-preview-image {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
      object-position: top left;
    }
  `
})
export class PersonalizedPlan {}
