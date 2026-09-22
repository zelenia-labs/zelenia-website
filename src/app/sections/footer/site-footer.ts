import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  template: `
    <footer class="site-footer" role="contentinfo">
      <div class="container footer-container">
        <!-- Left Column: Branding & Email matching design.svg -->
        <div class="footer-brand">
          <span class="footer-logo">Zelenia Labs</span>
          <a href="mailto:hello@zelenia.com" class="footer-email">hello&#64;zelenia.com</a>
        </div>

        <!-- Right Column: Structured Navigation Columns matching design.svg -->
        <nav class="footer-nav-grid" aria-label="Footer Navigation">
          <div class="footer-col">
            <span class="footer-col__title">Company</span>
            <ul class="footer-links">
              <li><a routerLink="/team">About Us</a></li>
              <li><a routerLink="/process">Services</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <span class="footer-col__title">Connect</span>
            <ul class="footer-links">
              <li><a routerLink="/contact">Contact Us</a></li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn <span class="ext-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram <span class="ext-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </footer>
  `,
  styles: `
    .site-footer {
      background-color: var(--bg);
      border-top: 1px solid rgba(36, 32, 27, 0.08);
      padding-block: clamp(3.5rem, 5vw, 5rem);
      color: var(--text);
    }

    .footer-container {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      justify-content: space-between;
      align-items: flex-start;
      max-width: var(--shell);
      margin-inline: auto;
    }

    @media (min-width: 768px) {
      .footer-container {
        flex-direction: row;
        align-items: flex-start;
      }
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .footer-logo {
      font-family: var(--font-serif);
      font-size: 1.65rem;
      font-weight: 500;
      color: var(--text);
      letter-spacing: -0.02em;
    }

    .footer-email {
      font-family: var(--font-sans);
      font-size: 0.875rem;
      color: var(--text-muted);
      text-decoration: none;
      transition: color var(--transition-fast);
    }

    .footer-email:hover {
      color: var(--text);
    }

    .footer-nav-grid {
      display: flex;
      gap: clamp(3rem, 6vw, 5.5rem);
    }

    .footer-col {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .footer-col__title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--text-muted);
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .footer-links a {
      font-size: 0.875rem;
      color: var(--text-2);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      transition: color var(--transition-fast);
    }

    .footer-links a:hover {
      color: var(--text);
    }

    .ext-arrow {
      font-size: 0.8rem;
    }
  `
})
export class SiteFooter {
  readonly currentYear = new Date().getFullYear();
}
