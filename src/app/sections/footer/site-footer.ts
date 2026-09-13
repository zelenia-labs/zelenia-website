import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebsiteContent } from '../../content/website-content';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  template: `
    <footer class="site-footer" role="contentinfo">
      <div class="container footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <a class="site-logo" routerLink="/" aria-label="Zelenia Home">
              <span class="logo-text">ZELENIA</span>
            </a>
            <p class="footer-tagline">
              High-Precision Frontend Engineering &amp; Product Design Studio.
            </p>
          </div>

          <nav class="footer-nav" aria-label="Footer Navigation">
            <div class="footer-nav-col">
              <span class="footer-nav-code">Navigation</span>
              <ul class="footer-nav-list">
                <li><a routerLink="/">Home</a></li>
                <li><a routerLink="/process">Process &amp; Scope</a></li>
                <li><a routerLink="/team">The Team</a></li>
                <li><a routerLink="/contact">Contact</a></li>
              </ul>
            </div>

            <div class="footer-nav-col">
              <span class="footer-nav-code">Connect</span>
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
                    Yolanda Santa Cruz ↗
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
        </div>
      </div>
    </footer>
  `
})
export class SiteFooter {
  private readonly website = inject(WebsiteContent);
  readonly site = this.website.site;
  readonly currentYear = new Date().getFullYear();
}
