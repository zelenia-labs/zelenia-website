import { Component } from '@angular/core';

@Component({
  selector: 'app-transparency-fit',
  template: `
    <section
      class="site-section transparency-section"
      id="transparency"
      aria-labelledby="transparency-title"
    >
      <div class="container">
        <!-- Section 6A: Radical Transparency & Zero Lock-In -->
        <div class="section-header section-header--center">
          <h2 class="section-title" id="transparency-title">
            Clear commercial boundaries. Total client ownership.
          </h2>
          <p class="section-subhead">
            We reject proprietary vendor lock-in, ambiguous markup, and bloated agency retainers.
            You own every asset, token, and line of code from day one.
          </p>
        </div>

        <div class="transparency-grid">
          <!-- Card 1: 100% Repository & Asset Ownership -->
          <article class="transparency-card">
            <h3 class="transparency-card__title">Complete Repository &amp; Asset Custody</h3>
            <p class="transparency-card__body">
              Clients own all production code, Git repositories, Figma design tokens, and source
              assets. Zelenia enforces zero proprietary platform locks or runtime dependencies.
            </p>
            <ul class="transparency-card__checklist" aria-label="Ownership assurances">
              <li>Direct commits to your Git organization</li>
              <li>Complete Figma design token transfer</li>
              <li>Zero proprietary runtime lock-in</li>
            </ul>
          </article>

          <!-- Card 2: Pass-Through Infrastructure -->
          <article class="transparency-card">
            <h3 class="transparency-card__title">Direct Pass-Through Infrastructure</h3>
            <p class="transparency-card__body">
              Hosting, domain registration, and third-party APIs (Cloudflare, Vercel, Sanity) remain
              billed directly to the client at cost with zero studio markup or hidden surcharges.
            </p>
            <ul class="transparency-card__checklist" aria-label="Billing transparency assurances">
              <li>Direct billing from Cloudflare &amp; Vercel</li>
              <li>Zero percent markup on SaaS licenses</li>
              <li>Complete administrative infrastructure custody</li>
            </ul>
          </article>

          <!-- Card 3: Predictable Milestone Cadence -->
          <article class="transparency-card">
            <h3 class="transparency-card__title">Predictable Milestone Cadence</h3>
            <p class="transparency-card__body">
              50% deposit to lock studio capacity; 50% upon completed staging deployment, passing
              Lighthouse audits, and final repository sign-off.
            </p>
            <ul class="transparency-card__checklist" aria-label="Milestone assurances">
              <li>50% deposit reserves dedicated calendar slot</li>
              <li>50% upon verified staging &amp; audit sign-off</li>
              <li>Fixed scope with zero surprise change orders</li>
            </ul>
          </article>

          <!-- Card 4: 30-Day Post-Launch Warranty -->
          <article class="transparency-card">
            <h3 class="transparency-card__title">30-Day Post-Launch Warranty</h3>
            <p class="transparency-card__body">
              Every sprint includes a complimentary 30-day technical warranty covering immediate bug
              resolution, regression repairs, and a direct engineering handoff.
            </p>
            <ul class="transparency-card__checklist" aria-label="Warranty assurances">
              <li>Immediate resolution of post-launch regressions</li>
              <li>Direct engineering team handoff session</li>
              <li>Zero additional charge for sprint repairs</li>
            </ul>
          </article>
        </div>

        <!-- Section 6B: Determining Mutual Fit -->
        <div class="fit-filter-wrapper">
          <div class="section-header section-header--center">
            <h2 class="section-title">Determining Mutual Fit</h2>
            <p class="section-subhead">
              We operate on senior density and direct execution. Here is how to know if we are the
              optimal match for your organization.
            </p>
          </div>

          <div class="fit-columns-grid">
            <!-- Optimal Fit Column -->
            <div class="fit-column fit-column--thrive">
              <div class="fit-column__header">
                <h3 class="fit-column__title">You will thrive with Zelenia if...</h3>
              </div>
              <ul class="fit-list">
                <li class="fit-item">
                  <span class="fit-icon fit-icon--check" aria-hidden="true">✓</span>
                  <div>
                    <strong>Venture-backed scale-ups &amp; tech enterprises:</strong>
                    Where sub-second web performance, Core Web Vitals, and enterprise UI fidelity
                    directly close enterprise buyers.
                  </div>
                </li>
                <li class="fit-item">
                  <span class="fit-icon fit-icon--check" aria-hidden="true">✓</span>
                  <div>
                    <strong>High-value professional practices &amp; prestige brands:</strong>
                    Regional commercial firms ($5M–$35M) and independent studios requiring an
                    unmistakable digital flagship with zero maintenance overhead.
                  </div>
                </li>
                <li class="fit-item">
                  <span class="fit-icon fit-icon--check" aria-hidden="true">✓</span>
                  <div>
                    <strong>Direct senior density:</strong>
                    You demand direct collaboration with the seasoned Principal Engineer and Lead
                    Designer writing the architecture and interfaces.
                  </div>
                </li>
              </ul>
            </div>

            <!-- Misaligned Column -->
            <div class="fit-column fit-column--avoid">
              <div class="fit-column__header">
                <h3 class="fit-column__title">We are not the right fit if...</h3>
              </div>
              <ul class="fit-list">
                <li class="fit-item">
                  <span class="fit-icon fit-icon--cross" aria-hidden="true">✕</span>
                  <div>
                    <strong>Low-cost template assembly:</strong>
                    You need generic WordPress themes, automated site builders, or off-the-shelf
                    templates.
                  </div>
                </li>
                <li class="fit-item">
                  <span class="fit-icon fit-icon--cross" aria-hidden="true">✕</span>
                  <div>
                    <strong>Bureaucratic steering committees:</strong>
                    Your organization requires multi-layered corporate steering committees and slow
                    RFP procurement cycles.
                  </div>
                </li>
                <li class="fit-item">
                  <span class="fit-icon fit-icon--cross" aria-hidden="true">✕</span>
                  <div>
                    <strong>Commodity hourly staffing:</strong>
                    You treat software engineering and design as a low-bid commodity rather than a
                    strategic business differentiator.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class TransparencyFit {}
