import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollReveal } from '../../ui/motion/scroll-reveal';

@Component({
  selector: 'app-advantage',
  imports: [ScrollReveal, RouterLink],
  template: `
    <section
      class="site-section advantage-section"
      id="advantage"
      aria-labelledby="advantage-title"
    >
      <div class="container" appScrollReveal>
        <div class="section-header">
          <span class="section-tag">The Studio Advantage</span>
          <h2 class="section-title" id="advantage-title">
            Direct execution outperforms agency hierarchy.
          </h2>
          <p class="section-subhead">
            Agencies sell senior credibility during sales pitches, then delegate delivery to junior
            staff. Zelenia operates on total senior density: you collaborate directly with the
            senior engineers and designers programming every detail.
          </p>
        </div>

        <div class="advantage-split-layout">
          <div class="advantage-visual">
            <figure class="advantage-figure">
              <img
                class="advantage-img"
                src="/assets/images/studio_synergy_prism.jpg"
                alt="3D abstract frosted glass and obsidian chrome sculpture refracting cyan-teal and emerald light, symbolizing the dual synergy of engineering rigor and visual craft"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
              <figcaption class="advantage-caption">
                <span class="caption-code">Senior Practitioner Cohesion</span>
                <span class="caption-text">
                  Real-time alignment between Principal Engineering and Lead Product Design.
                </span>
              </figcaption>
            </figure>
          </div>

          <div class="advantage-pillars">
            <article class="advantage-card">
              <div class="advantage-card__top">
                <span class="advantage-card__index">01</span>
                <span class="advantage-card__tag">DIRECT COLLABORATION</span>
              </div>
              <h3 class="advantage-card__title">Direct Access to Senior Talent</h3>
              <p class="advantage-card__body">
                Clients collaborate exclusively with the team members designing and programming the
                product. Every architecture decision, interface state, and line of code is handled
                by seasoned experts, eliminating junior handoffs and communication decay.
              </p>
              <div class="advantage-card__meta">
                <span class="advantage-card__pill">Senior Density: 100%</span>
              </div>
            </article>

            <article class="advantage-card">
              <div class="advantage-card__top">
                <span class="advantage-card__index">02</span>
                <span class="advantage-card__tag">BROWSER FIDELITY</span>
              </div>
              <h3 class="advantage-card__title">Seamless Design-to-Code Parity</h3>
              <p class="advantage-card__body">
                Visual intent and technical execution evolve simultaneously. Because engineering and
                design collaborate in real time, complex layouts, micro-interactions, and
                accessibility standards never get lost in translation between design software and
                the browser.
              </p>
              <div class="advantage-card__meta">
                <span class="advantage-card__pill">Zero Handoff Translation</span>
              </div>
            </article>

            <article class="advantage-card">
              <div class="advantage-card__top">
                <span class="advantage-card__index">03</span>
                <span class="advantage-card__tag">CYCLE VELOCITY</span>
              </div>
              <h3 class="advantage-card__title">High Efficiency, Zero Bureaucracy</h3>
              <p class="advantage-card__body">
                Traditional agencies allocate over 40% of billable fees to account managers and
                junior revisions. By removing corporate overhead, cycle times compress from months
                to weeks, and 100% of your budget directly funds production craft.
              </p>
              <div class="advantage-card__meta">
                <span class="advantage-card__pill">Zero Billing Waste</span>
              </div>
            </article>

            <div class="advantage-cta-box" style="margin-top: 1rem;">
              <a class="btn btn--primary" routerLink="/team">
                <span>Meet the Team Behind Every Project</span>
                <span class="arrow-indicator" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Advantage {}
