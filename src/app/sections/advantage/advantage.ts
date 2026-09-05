import { Component } from '@angular/core';
import { ScrollReveal } from '../../ui/motion/scroll-reveal';

@Component({
  selector: 'app-advantage',
  imports: [ScrollReveal],
  template: `
    <section
      class="site-section advantage-section"
      id="advantage"
      aria-labelledby="advantage-title"
    >
      <div class="container" appScrollReveal>
        <div class="section-header">
          <span class="section-tag">The Model</span>
          <h2 class="section-title" id="advantage-title">
            Why direct senior partnership changes everything.
          </h2>
          <p class="section-subhead">
            Traditional agencies pitch senior credentials, then hand off delivery to junior
            associates. We work on 100% senior density: you collaborate directly with the two
            partners designing and programming every detail.
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
                <span class="caption-code">[ FIGURE 01 // DUAL SENIOR PRACTITIONER COHESION ]</span>
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
                Clients collaborate exclusively with the partners designing and programming the
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
                Without account managers, status meetings, or agency retainers funding corporate
                overhead, cycle times remain compact. Decisions occur immediately, and the entire
                budget directly funds production craft.
              </p>
              <div class="advantage-card__meta">
                <span class="advantage-card__pill">Direct Partner Agility</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Advantage {}
