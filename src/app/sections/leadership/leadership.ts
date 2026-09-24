import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leadership',
  imports: [RouterLink],
  template: `
    <section class="site-section founders-section" id="founders" aria-labelledby="founders-title">
      <!-- Ambient Glow Circle matching Figma (X: 174, Y: -18, W: 1040, H: 1040, Fill: #F2EBDF 40%, Opacity: 80%, Blur: 180) -->
      <div class="ambient-glow glow--founders-warm" aria-hidden="true"></div>

      <div class="container">
        <!-- Section Header (Centered in design.svg) -->
        <div class="section-header section-header--center reveal-on-scroll">
          <span class="section-tag-subtle">Who We Are</span>
          <h2 class="section-heading-twotone" id="founders-title">
            <span class="heading-primary">Meet the duo behind</span>
            <span class="heading-secondary">Zelenia Studio</span>
          </h2>

          <p class="section-subhead">
            A designer and an engineer who love building fast, thoughtful websites together.
          </p>
        </div>

        <!-- 2 Founder Cards (w: 300px photos, rx: 24px in design.svg) -->
        <div class="founders-grid">
          <!-- Yolanda Santa Cruz -->
          <article class="founder-card">
            <div class="founder-photo-dock">
              <img
                src="/assets/images/portrait_yolanda.jpg"
                alt="Yolanda Santa Cruz, Lead Product Designer and Visual Artist at Zelenia"
                class="founder-photo"
                width="300"
                height="300"
                loading="lazy"
              />
            </div>
            <div class="founder-badge badge--peach" aria-hidden="true">
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
                <path
                  d="M17.18 13.01L16.03 7.28C16 7.13 15.93 6.98 15.81 6.87C15.7 6.76 15.56 6.67 15.41 6.64L4.87 3.87C4.73 3.84 4.59 3.84 4.45 3.88C4.31 3.92 4.19 3.99 4.09 4.09C3.99 4.19 3.91 4.32 3.88 4.45C3.84 4.59 3.83 4.74 3.87 4.88L6.64 15.41C6.67 15.57 6.75 15.71 6.87 15.82C6.98 15.93 7.13 16 7.28 16.03L13.01 17.18M4.09 4.1L10.17 10.17M15.27 19.92C15.11 20.08 14.9 20.17 14.68 20.17C14.46 20.17 14.24 20.08 14.09 19.92L12.77 18.6C12.61 18.45 12.52 18.23 12.52 18.01C12.52 17.79 12.61 17.58 12.77 17.42L17.42 12.77C17.58 12.61 17.79 12.52 18.01 12.52C18.23 12.52 18.44 12.61 18.6 12.77L19.92 14.09C20.08 14.25 20.17 14.46 20.17 14.68C20.17 14.9 20.08 15.11 19.92 15.27L15.27 19.92ZM13.01 11.35C13.01 12.27 12.26 13.01 11.34 13.01C10.42 13.01 9.68 12.27 9.68 11.35C9.68 10.43 10.42 9.68 11.34 9.68C12.26 9.68 13.01 10.43 13.01 11.35Z"
                ></path>
              </svg>
            </div>
            <h3 class="founder-name">Yolanda Santa Cruz</h3>
            <p class="founder-bio">
              Product designer and visual artist with over a decade of experience shaping brands and
              digital experiences. Focused on clean layouts, beautiful typography, and interfaces
              that feel effortless to use.
            </p>
          </article>

          <!-- Alejandro Cuba Ruiz -->
          <article class="founder-card">
            <div class="founder-photo-dock">
              <img
                src="/assets/images/portrait_alejandro.jpg"
                alt="Alejandro Cuba Ruiz, Principal Frontend Architect & Google Developer Expert at Zelenia"
                class="founder-photo"
                width="300"
                height="300"
                loading="lazy"
              />
            </div>
            <div class="founder-badge badge--green" aria-hidden="true">
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
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <h3 class="founder-name">Alejandro Cuba Ruiz</h3>
            <p class="founder-bio">
              Software engineer and Google Developer Expert who loves building fast, resilient web
              applications. Focused on modern web architecture, clean code, and sub-second load
              times.
            </p>
          </article>
        </div>

        <!-- Section CTA: Learn More About Us -->
        <div class="founders-action reveal-on-scroll">
          <a
            class="btn btn--primary founders-cta-btn"
            routerLink="/team"
            aria-label="Learn more about our team and background"
          >
            <span>Learn More About Us</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .founders-section {
      background-color: var(--bg);
      padding-block: clamp(4.5rem, 7vw, 6.5rem);
      position: relative;
      overflow: visible;
    }

    .founders-section .container {
      position: relative;
      z-index: 1;
    }

    .glow--founders-warm {
      width: 1040px;
      height: 1040px;
      background-color: #f2ebdf;
      opacity: 0.32;
      filter: blur(90px);
      top: -18px;
      left: 50%;
      transform: translateX(-50%);
    }

    .section-header--center {
      text-align: center;
      margin-block-end: clamp(2.5rem, 4vw, 3.5rem);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .section-subhead {
      font-size: 1rem;
      color: var(--text-2);
      margin-block-start: 0.75rem;
      margin-block-end: 0;
    }

    .founders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 320px));
      gap: clamp(2rem, 5vw, 4rem);
      justify-content: center;
    }

    .founder-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .founder-photo-dock {
      width: 100%;
      height: 300px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      margin-bottom: 1.25rem;
      background-color: var(--surface-warm);
      box-shadow: none;
    }

    .founder-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .founder-badge {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      color: var(--dark-ink);
    }

    .badge--peach {
      background-color: var(--badge-peach);
    }

    .badge--green {
      background-color: var(--badge-green);
    }

    .founder-name {
      font-size: 1.15rem;
      font-weight: 550;
      color: var(--text);
      letter-spacing: -0.02em;
      margin: 0 0 0.5rem 0;
      font-family: var(--font-sans);
      line-height: 1.2;
    }

    .founder-bio {
      font-size: 0.875rem;
      line-height: 1.55;
      color: var(--text-2);
      margin: 0;
      font-family: var(--font-sans);
      max-width: 320px;
    }

    .founders-action {
      display: flex;
      justify-content: center;
      margin-block-start: clamp(2.5rem, 4.5vw, 3.75rem);
    }

    .founders-cta-btn {
      height: 44px;
      padding-inline: 2rem;
      font-size: 0.9rem;
      font-weight: 550;
      border-radius: var(--radius-pill);
      background-color: var(--dark-ink);
      color: #ffffff;
      text-decoration: none;
      border: none;
      box-shadow: 0 1px 3px rgba(36, 32, 27, 0.12);
      transition: background-color var(--transition-fast);
      white-space: nowrap;
    }

    .founders-cta-btn:hover {
      background-color: #3d372f;
      box-shadow: 0 2px 6px rgba(36, 32, 27, 0.18);
    }
  `
})
export class Leadership {}
