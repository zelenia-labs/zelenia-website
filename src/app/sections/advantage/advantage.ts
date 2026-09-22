import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-advantage',
  imports: [RouterLink],
  template: `
    <section
      class="site-section advantage-section"
      id="advantage"
      aria-labelledby="advantage-title"
    >
      <div class="container">
        <div class="advantage-editorial-layout">
          <!-- Visual Column: Sticky Art Feature -->
          <div class="advantage-visual">
            <figure class="advantage-figure">
              <img
                class="advantage-img"
                src="/assets/images/studio_synergy_prism.jpg"
                alt="Sculptural refraction of cyan and emerald light, symbolizing the live synergy of engineering rigor and visual craft"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
              <figcaption class="advantage-caption">
                Direct DOM co-authoring between Principal Engineering and Lead Product Design.
              </figcaption>
            </figure>
          </div>

          <!-- Narrative Column (Completely Unboxed) -->
          <div class="advantage-narrative">
            <span class="section-tag">Senior Density</span>
            <h2 class="section-title" id="advantage-title">
              Direct founder execution outperforms agency hierarchy.
            </h2>

            <div class="advantage-prose">
              <div class="advantage-block">
                <h3 class="advantage-subtitle">The Traditional Agency Overhead Trap</h3>
                <p class="advantage-text">
                  Traditional agencies pitch you with senior partners, then bill 40%+ overhead to
                  fund account managers, coordinators, and weekly status decks. The people who
                  pitched your contract never touch your codebase, causing translation decay between
                  design software and code, broken responsive breakpoints, and brittle dependencies.
                </p>
              </div>

              <div class="advantage-block">
                <h3 class="advantage-subtitle">The Zelenia Model: Pure Senior Craft</h3>
                <p class="advantage-text">
                  We operate with zero middle management. Every line of TypeScript, styling token,
                  and layout architecture is programmed directly by Alejandro and Yolanda in live
                  browser space. With a strict limit of two concurrent client sprints, we deliver in
                  weeks what agencies delay for quarters.
                </p>
              </div>
            </div>

            <div class="advantage-actions">
              <a class="btn btn--primary" routerLink="/team">
                <span>Meet the Founders</span>
                <span class="arrow-indicator" aria-hidden="true">&rarr;</span>
              </a>
              <a class="btn btn--secondary" routerLink="/process">
                <span>Review Sprint Methodology</span>
                <span class="arrow-indicator" aria-hidden="true">&nearr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Advantage {}
