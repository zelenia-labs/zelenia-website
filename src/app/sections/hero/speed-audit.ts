import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { PagespeedClient } from './pagespeed-client';
import { AuditConsole } from './audit-console';

@Component({
  selector: 'app-speed-audit',
  imports: [FormField, AuditConsole],
  template: `
    <section
      class="site-section speed-audit-section"
      id="speed-audit"
      aria-labelledby="speed-audit-title"
    >
      <div class="container audit-container">
        <div class="section-header section-header--center reveal-on-scroll">
          <span class="section-tag-subtle">Core Web Vitals</span>
          <h2 class="section-heading-twotone" id="speed-audit-title" style="align-items: center;">
            <span class="heading-primary">Audit your live</span>
            <span class="heading-secondary">web speed.</span>
          </h2>
          <p class="section-subhead">
            Real-world Core Web Vitals via Google PageSpeed Insights. Zero sales gates, instant
            diagnostic feedback.
          </p>
        </div>

        <div class="audit-card-wrapper reveal-on-scroll reveal-delay-1">
          <div class="hero-audit-card">
            <form
              class="hero-audit-form"
              id="hero-audit-form"
              role="search"
              aria-label="Live Site Performance Audit"
              novalidate
              (submit)="onAnalyze($event)"
            >
              <div
                class="hero-audit-bar"
                [class.is-invalid]="
                  auditForm.url().touched() && auditForm.url().errors().length > 0
                "
              >
                <div class="audit-input-wrapper">
                  <svg
                    class="input-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path
                      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                    ></path>
                  </svg>
                  <input
                    class="hero-audit-input"
                    id="hero-audit-url"
                    type="url"
                    placeholder="https://yourcompany.com"
                    aria-label="Enter your website URL for PageSpeed analysis"
                    autocomplete="url"
                    inputmode="url"
                    autocapitalize="none"
                    spellcheck="false"
                    [class.is-invalid]="
                      auditForm.url().touched() && auditForm.url().errors().length > 0
                    "
                    [formField]="auditForm.url"
                    (input)="onUrlInput($event)"
                  />
                </div>
                <button
                  class="btn btn--primary btn--hero-audit"
                  id="hero-audit-btn"
                  type="submit"
                  [class.btn--loading]="pagespeed.isScanning()"
                  [disabled]="pagespeed.isScanning()"
                >
                  <span class="btn-text">Run Audit</span>
                  <span class="btn-spinner" aria-hidden="true"></span>
                </button>
              </div>

              @if (auditForm.url().touched() && auditForm.url().errors().length > 0) {
                <span
                  class="form-error hero-audit-error"
                  id="hero-url-error"
                  role="alert"
                  aria-live="polite"
                >
                  {{ auditForm.url().errors()[0].message }}
                </span>
              }
            </form>

            <!-- Live Audit Console Widget -->
            @if (pagespeed.isScanning() || pagespeed.auditResult()) {
              <div class="hero-audit-widget" id="hero-audit-widget" aria-live="polite">
                @if (pagespeed.isScanning()) {
                  <div class="audit-scanner" id="audit-scanner">
                    <div class="scanner-spinner" aria-hidden="true">
                      <div class="scanner-ring"></div>
                      <div class="scanner-pulse"></div>
                    </div>
                    <div class="scanner-status">
                      <span class="scanner-title">Scanning Core Web Vitals</span>
                      <span class="scanner-log" id="scanner-log">{{ pagespeed.scanLog() }}</span>
                    </div>
                  </div>
                } @else {
                  <app-audit-console [results]="pagespeed.auditResult()" />
                }
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .speed-audit-section {
      background-color: var(--surface-warm);
      border-block-start: 1px solid var(--border);
      padding-block: clamp(5rem, 8vw, 7.5rem);
      position: relative;
    }

    .audit-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .audit-card-wrapper {
      inline-size: 100%;
      max-inline-size: 780px;
      margin-block-start: 2.5rem;
    }

    .hero-audit-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: clamp(1.5rem, 3.5vw, 2.5rem);
      box-shadow: 0 4px 24px rgba(36, 32, 27, 0.04);
    }

    .hero-audit-bar {
      display: flex;
      align-items: center;
      background: var(--surface-warm);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-pill);
      padding: 0.35rem 0.35rem 0.35rem 1.25rem;
      transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
      gap: 0.75rem;
    }

    .hero-audit-bar:focus-within {
      border-color: var(--dark-ink);
      box-shadow: 0 0 0 3px rgba(36, 32, 27, 0.06);
    }

    .hero-audit-bar.is-invalid {
      border-color: var(--accent-rose, #e05252);
    }

    .audit-input-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
      min-width: 0;
    }

    .input-icon {
      color: var(--text-muted);
      flex-shrink: 0;
    }

    .hero-audit-input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-family: var(--font-sans);
      font-size: 0.95rem;
      color: var(--text);
      width: 100%;
    }

    .hero-audit-input::placeholder {
      color: var(--text-muted);
    }

    .btn--hero-audit {
      flex-shrink: 0;
      border-radius: var(--radius-pill);
      height: 42px;
      padding-inline: 1.5rem;
      font-size: 0.875rem;
      font-weight: 550;
    }

    .hero-audit-error {
      display: block;
      color: var(--accent-rose, #e05252);
      font-size: 0.8125rem;
      margin-top: 0.65rem;
      padding-left: 1.25rem;
    }

    @media (max-width: 600px) {
      .hero-audit-bar {
        flex-direction: column;
        border-radius: var(--radius-md);
        padding: 0.75rem;
        gap: 0.75rem;
      }

      .audit-input-wrapper {
        width: 100%;
      }

      .btn--hero-audit {
        width: 100%;
      }
    }
  `
})
export class SpeedAudit {
  readonly pagespeed = inject(PagespeedClient);

  protected readonly auditModel = signal({
    url: ''
  });

  protected readonly auditForm = form(this.auditModel, (s) => {
    required(s.url, { message: 'Please enter a website URL to analyze.' });
    validate(s.url, ({ value }) => {
      const raw = value().trim();
      if (!raw) return undefined;

      try {
        const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
        const parsed = new URL(candidate);

        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          return {
            kind: 'invalidUrl',
            message: 'Please provide a valid website URL with http:// or https://'
          };
        }

        const hostname = parsed.hostname.toLowerCase();

        // Disallow localhost, loopback, and private network addresses
        const isLocal =
          hostname === 'localhost' ||
          hostname === '127.0.0.1' ||
          hostname === '0.0.0.0' ||
          hostname === '[::1]' ||
          hostname.endsWith('.localhost') ||
          hostname.endsWith('.local') ||
          hostname.endsWith('.internal') ||
          hostname.endsWith('.test') ||
          hostname.startsWith('192.168.') ||
          hostname.startsWith('10.') ||
          /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname);

        if (isLocal) {
          return {
            kind: 'disallowedLocalhost',
            message:
              'Localhost and private addresses are not supported. Please enter a public website URL.'
          };
        }

        // Hostname must be a valid public domain with a recognized TLD
        const domainLabels = hostname.split('.');
        const tld = domainLabels[domainLabels.length - 1];
        if (domainLabels.length < 2 || !tld || tld.length < 2 || !/^[a-z]{2,}$/i.test(tld)) {
          return {
            kind: 'invalidUrl',
            message: 'Please provide a valid website URL (e.g. company.com or https://company.com).'
          };
        }

        return undefined;
      } catch {
        return {
          kind: 'invalidUrl',
          message: 'Please provide a valid website URL (e.g. company.com or https://company.com).'
        };
      }
    });
  });

  onUrlInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.pagespeed.targetUrl.set(value);
  }

  onAnalyze(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    submit(this.auditForm, async () => {
      const urlToAudit = this.auditModel().url.trim();
      await this.pagespeed.runAudit(urlToAudit);
    });
  }
}
