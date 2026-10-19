import { Component } from '@angular/core';
import { RocketEasterEgg } from './rocket';

@Component({
  selector: 'app-site-footer',
  template: `
    <footer class="site-footer" role="contentinfo">
      <div class="footer-divider-line" aria-hidden="true"></div>
      <div class="container footer-container">
        <!-- Bottom Bar: Left-Aligned Copyright + Pure Social Links on Right -->
        <div class="footer-bottom-bar">
          <p class="footer-copyright">
            &copy; {{ currentYear }} Zelenia. High-performance front-end &amp; product design.
          </p>

          <div class="footer-social-links" aria-label="Social Profiles">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-social-link"
              aria-label="Zelenia on LinkedIn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/zelenia-labs"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-social-link"
              aria-label="Zelenia on GitHub"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
    <app-rocket-easter-egg />
  `,
  styles: `
    .site-footer {
      background-color: var(--bg);
      padding-block: 0 clamp(2rem, 4vw, 3rem);
      color: var(--text);
      position: relative;
      overflow: hidden;
    }

    .footer-divider-line {
      width: 100%;
      height: 1px;
      background-color: var(--border-subtle);
      margin-bottom: 2rem;
    }

    .footer-container {
      position: relative;
      z-index: 1;
      max-width: var(--shell);
      margin-inline: auto;
    }

    .footer-bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1.25rem;
    }

    .footer-copyright {
      margin: 0;
      font-family: var(--font-sans);
      font-size: 0.8125rem;
      color: var(--text-muted);
      line-height: 1.5;
      text-align: left;
    }

    .footer-social-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .footer-social-link {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      color: var(--text-2);
      font-family: var(--font-sans);
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      transition: color var(--transition-fast);
      background: none;
      border: none;
      padding: 0;
    }

    .footer-social-link:hover {
      color: var(--dark-ink);
    }

    .footer-social-link svg {
      flex-shrink: 0;
      transition: color var(--transition-fast);
    }

    .footer-social-link:focus-visible {
      outline: 2px solid var(--dark-ink);
      outline-offset: 2px;
      border-radius: 2px;
    }

    @media (max-width: 640px) {
      .footer-bottom-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.25rem;
      }

      .footer-copyright {
        text-align: left;
      }

      .footer-social-links {
        width: 100%;
        justify-content: flex-start;
      }
    }
  `,
  imports: [RocketEasterEgg]
})
export class SiteFooter {
  readonly currentYear = new Date().getFullYear();
}
