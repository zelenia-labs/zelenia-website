import { Component } from '@angular/core';

@Component({
  selector: 'app-advantage',
  template: `
    <section
      class="site-section diagnostics-clarity-section"
      id="advantage"
      aria-labelledby="clarity-title"
    >
      <!-- Ambient Glow Circle matching Screenshot 2 & design.svg -->
      <div class="ambient-glow glow--clarity-center" aria-hidden="true"></div>

      <div class="container">
        <div class="clarity-split-layout">
          <!-- Left Column: Section Heading (x=160 in design.svg) -->
          <div class="clarity-editorial reveal-on-scroll">
            <span class="section-tag-subtle">Common Bottlenecks</span>
            <h2 class="section-heading-twotone" id="clarity-title">
              <span class="heading-primary">Less friction.</span>
              <span class="heading-secondary">More visitors who stay.</span>
            </h2>
          </div>

          <!-- Right Column: 2x2 Grid of White Cards (w: 348, h: 244, rx: 20 in design.svg) -->
          <div class="clarity-cards-grid">
            <!-- Card 1: Heavy Photos & Media -->
            <article class="clarity-card">
              <div class="clarity-badge badge--peach" aria-hidden="true">
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
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  ></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 class="clarity-card__title">Heavy Photos &amp; Media</h3>
              <p class="clarity-card__desc">
                Oversized photography, uncompressed videos, and heavy files slow your pages down
                before visitors can even see what you offer.
              </p>
            </article>

            <!-- Card 2: Search Visibility -->
            <article class="clarity-card">
              <div class="clarity-badge badge--green" aria-hidden="true">
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <h3 class="clarity-card__title">Search Visibility</h3>
              <p class="clarity-card__desc">
                Confusing site structure and missing tags make it difficult for Google to read your
                pages, keeping potential clients from discovering you.
              </p>
            </article>

            <!-- Card 3: Page Speed & Stability -->
            <article class="clarity-card">
              <div class="clarity-badge badge--lavender" aria-hidden="true">
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
              </div>
              <h3 class="clarity-card__title">Page Speed &amp; Stability</h3>
              <p class="clarity-card__desc">
                Pages that take seconds to appear or jump around while loading frustrate visitors
                and cause them to click away before reading.
              </p>
            </article>

            <!-- Card 4: Clear Next Steps -->
            <article class="clarity-card">
              <div class="clarity-badge badge--peach" aria-hidden="true">
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
                  <path d="M12 2l3 7h6l-5 4 2 7-6-4-6 4 2-7-5-4h6z"></path>
                </svg>
              </div>
              <h3 class="clarity-card__title">Clear Next Steps</h3>
              <p class="clarity-card__desc">
                Cluttered pages and confusing navigation make it hard for visitors to find the
                answers they need and take the next step.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .diagnostics-clarity-section {
      background-color: var(--bg);
      padding-block: clamp(4.5rem, 7vw, 6.5rem);
      position: relative;
      overflow: visible;
    }

    .diagnostics-clarity-section .container {
      position: relative;
      z-index: 1;
    }

    .glow--clarity-center {
      width: 808px;
      height: 808px;
      background-color: #d5dfe1;
      opacity: 0.32;
      filter: blur(90px);
      top: 50%;
      right: -80px;
      transform: translateY(-50%);
    }

    .clarity-split-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      align-items: start;
    }

    @media (min-width: 960px) {
      .clarity-split-layout {
        grid-template-columns: 340px 1fr;
        gap: 3.5rem;
      }
    }

    .clarity-editorial {
      position: sticky;
      top: 6.5rem;
    }

    .clarity-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 2rem;
    }

    @media (min-width: 640px) {
      .clarity-cards-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .clarity-card {
      background-color: #ffffff;
      border-radius: var(--radius-md);
      padding: 1.85rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border: none;
      box-shadow: none;
      min-height: 220px;
    }

    .clarity-badge {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
      color: var(--dark-ink);
    }

    .badge--peach {
      background-color: var(--badge-peach);
    }

    .badge--green {
      background-color: var(--badge-green);
    }

    .badge--lavender {
      background-color: var(--badge-lavender);
    }

    .clarity-card__title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text);
      letter-spacing: -0.02em;
      margin: 0 0 0.65rem 0;
      line-height: 1.2;
    }

    .clarity-card__desc {
      font-size: 0.925rem;
      line-height: 1.55;
      color: var(--text-2);
      margin: 0;
    }
  `
})
export class Advantage {}
