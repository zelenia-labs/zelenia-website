import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-engagement-tracks',
  imports: [RouterLink],
  template: `
    <section
      class="site-section performant-interfaces-section"
      id="tracks"
      aria-labelledby="tracks-heading"
    >
      <!-- Ambient Glow Circles matching Screenshot 1 & design.svg -->
      <div class="ambient-glow glow--interfaces-left" aria-hidden="true"></div>
      <div class="ambient-glow glow--interfaces-right" aria-hidden="true"></div>

      <div class="container">
        <!-- Section Header matching design.svg (x=160) -->
        <div class="section-header reveal-on-scroll">
          <h2 class="section-heading-twotone" id="tracks-heading">
            <span class="heading-primary">Focused on</span>
            <span class="heading-secondary">performant interfaces</span>
          </h2>
        </div>

        <!-- 3 White Cards Grid (w: 352, h: 360, rx: 24, gap: 32 in design.svg) -->
        <div class="interfaces-grid">
          <!-- Card 1: Technical SEO & Speed -->
          <article class="interface-card">
            <div class="card-icon-badge badge--green" aria-hidden="true">
              <svg
                width="24"
                height="24"
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
            <h3 class="card-title">Technical SEO &amp; Speed</h3>
            <p class="card-description">
              Payload cleanup, crawl efficiency, and performance stability built into the structure
              of the site.
            </p>
            <ul class="card-checklist" aria-label="Technical deliverables">
              <li>
                <span class="check-bullet" aria-hidden="true">&bull;</span>
                <span>Payload &amp; crawl engine</span>
              </li>
              <li>
                <span class="check-bullet" aria-hidden="true">&bull;</span>
                <span>Core Web Vitals stabilization</span>
              </li>
            </ul>
          </article>

          <!-- Card 2: UX/UI Redesign -->
          <article class="interface-card">
            <div class="card-icon-badge badge--peach" aria-hidden="true">
              <svg
                width="24"
                height="24"
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
            <h3 class="card-title">UX/UI Redesign</h3>
            <p class="card-description">
              Editorial interface systems designed to clarify value, strengthen trust, and guide
              action with ease.
            </p>
            <ul class="card-checklist" aria-label="Design deliverables">
              <li>
                <span class="check-bullet" aria-hidden="true">&bull;</span>
                <span>Conversion architecture</span>
              </li>
              <li>
                <span class="check-bullet" aria-hidden="true">&bull;</span>
                <span>Visual hierarchy and pacing</span>
              </li>
            </ul>
          </article>

          <!-- Card 3: Unified Build -->
          <article class="interface-card">
            <div class="card-icon-badge badge--lavender" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <h3 class="card-title">Unified Build</h3>
            <p class="card-description">
              Bespoke design and fast code delivered as one continuous system from concept through
              production.
            </p>
            <ul class="card-checklist" aria-label="Execution deliverables">
              <li>
                <span class="check-bullet" aria-hidden="true">&bull;</span>
                <span>Bespoke design &amp; fast code</span>
              </li>
              <li>
                <span class="check-bullet" aria-hidden="true">&bull;</span>
                <span>Production-ready handoff</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: `
    .performant-interfaces-section {
      background-color: var(--bg);
      padding-block: clamp(4.5rem, 7vw, 6.5rem);
      position: relative;
      overflow: visible;
    }

    .performant-interfaces-section .container {
      position: relative;
      z-index: 1;
    }

    .glow--interfaces-left {
      width: 541px;
      height: 541px;
      background-color: #d7f2c8;
      opacity: 0.18;
      filter: blur(90px);
      top: 25%;
      left: -80px;
    }

    .glow--interfaces-right {
      width: 541px;
      height: 541px;
      background-color: #e5dff2;
      opacity: 0.25;
      filter: blur(90px);
      top: 15%;
      right: -80px;
    }

    .section-header {
      margin-block-end: clamp(2.5rem, 4vw, 3.5rem);
    }

    .interfaces-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      align-items: stretch;
    }

    @media (min-width: 1024px) {
      .interfaces-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .interface-card {
      background-color: #ffffff;
      border-radius: var(--radius-lg);
      padding: clamp(2rem, 3vw, 2.5rem);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border: none;
      box-shadow: none;
    }

    .card-icon-badge {
      width: 48px;
      height: 48px;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-block-end: 1.5rem;
      color: var(--dark-ink);
    }

    .badge--green {
      background-color: var(--badge-green);
    }

    .badge--peach {
      background-color: var(--badge-peach);
    }

    .badge--lavender {
      background-color: var(--badge-lavender);
    }

    .card-title {
      font-size: 1.35rem;
      font-weight: 600;
      color: var(--text);
      letter-spacing: -0.025em;
      margin: 0 0 0.85rem 0;
      line-height: 1.2;
    }

    .card-description {
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--text-2);
      margin: 0 0 1.5rem 0;
      flex-grow: 1;
    }

    .card-checklist {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
    }

    .card-checklist li {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-2);
      line-height: 1.45;
    }

    .check-bullet {
      color: var(--dark-ink);
      font-weight: bold;
    }
  `
})
export class EngagementTracks {}
