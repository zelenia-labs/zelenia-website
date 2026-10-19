import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StarfieldCanvas } from '../starfield';

@Component({
  selector: 'app-project-cta',
  imports: [RouterLink, StarfieldCanvas],
  template: `
    <section class="site-section project-cta-section" aria-labelledby="project-cta-heading">
      <!-- High-Performance Interactive Three.js Grain Canvas Host -->
      <app-starfield-canvas></app-starfield-canvas>

      <div class="container project-cta-container">
        <div class="project-cta-card reveal-on-scroll">
          <h2 class="project-cta-title" id="project-cta-heading">
            <span class="heading-primary">Have a project in mind?</span>
            <span class="heading-secondary">We'd love to chat.</span>
          </h2>
          <p class="project-cta-desc">
            Reach out and let’s talk about what you’re building. We’ll review your goals and share initial thoughts on design, performance, and timelines.
          </p>
          <a class="btn btn--pill-hero project-cta-btn" routerLink="/contact">
            <span>Send us a message</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .project-cta-section {
      background-color: var(--color-black);
      background: var(--color-black);
      padding-block: clamp(6rem, 10vw, 9rem);
      color: var(--color-white);
      position: relative;
      overflow: hidden;
      border-top: 1px solid var(--border-subtle);
    }

    .project-cta-container {
      position: relative;
      z-index: 6;
      max-width: var(--shell);
      margin-inline: auto;
      pointer-events: auto;
    }

    .project-cta-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 680px;
      margin-inline: auto;
    }

    .project-cta-title {
      font-family: var(--font-heading);
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 500;
      letter-spacing: -0.04em;
      line-height: 1.15;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      text-shadow: 0 2px 24px var(--color-black-heavy);
    }

    .project-cta-title .heading-primary {
      color: var(--color-white);
    }

    .project-cta-title .heading-secondary {
      color: var(--color-sage-light);
    }

    .project-cta-desc {
      font-family: var(--font-sans);
      font-size: clamp(1rem, 1.35vw, 1.18rem);
      line-height: 1.6;
      color: var(--color-white-reading);
      max-width: 580px;
      margin: 1.5rem 0 2.25rem 0;
      text-shadow: 0 1px 16px var(--color-black-heavy);
    }

    .project-cta-btn {
      min-height: 48px;
      padding-inline: 2.25rem;
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: var(--radius-pill);
      box-shadow: 0 4px 20px var(--color-ink-subtle);
    }
  `
})
export class ProjectCta {}
