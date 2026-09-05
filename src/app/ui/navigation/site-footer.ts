import { Component, inject } from '@angular/core';
import { StudioContent } from '../../content/studio-content';

@Component({
  selector: 'app-site-footer',
  template: `
    <footer class="site-footer" role="contentinfo">
      <div class="container footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <a class="site-logo" href="/" aria-label="Zelenia Home">
              <span class="logo-text">Zelenia</span>
              <span class="logo-slash" aria-hidden="true">/</span>
              <span class="logo-subtext">Studio</span>
            </a>
            <p class="footer-tagline">
              Elite frontend engineering and high-precision product design studio. Zero bureaucracy,
              absolute senior density.
            </p>
          </div>

          <nav class="footer-nav" aria-label="Footer Navigation">
            <div class="footer-nav-col">
              <span class="footer-nav-code">[ 01 // STUDIO ]</span>
              <ul class="footer-nav-list">
                <li><a href="#capabilities">Capabilities</a></li>
                <li><a href="#advantage">The Model</a></li>
                <li><a href="#leadership">Leadership</a></li>
                <li><a href="#diagnostic">Project Diagnostic</a></li>
                <li><a href="#contact">Book a Review</a></li>
              </ul>
            </div>

            <div class="footer-nav-col">
              <span class="footer-nav-code">[ 02 // DOSSIER ]</span>
              <ul class="footer-nav-list">
                <li>
                  <a
                    href="https://www.linkedin.com/in/alejandrocuba/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Alejandro Cuba (GDE) ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/yolandasantacruz/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Yolanda Santacruz ↗
                  </a>
                </li>
                <li>
                  <a [href]="site().socials.github" target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">&copy; {{ currentYear }} Zelenia Inc. All rights reserved.</p>
          <p class="footer-tech">
            [ STANDARDS // ZERO RUNTIME &bull; WCAG 2.2 AA &bull; HIGH-PRECISION DOM ]
          </p>
        </div>
      </div>
    </footer>
  `
})
export class SiteFooter {
  private readonly studio = inject(StudioContent);
  readonly site = this.studio.site;
  readonly currentYear = new Date().getFullYear();
}
