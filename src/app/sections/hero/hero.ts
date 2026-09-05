import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { PagespeedClient } from './pagespeed-client';
import { AuditConsole } from './audit-console';
import { StudioContent } from '../../content/studio-content';
import { ScrollReveal } from '../../ui/motion/scroll-reveal';

@Component({
  selector: 'app-hero',
  imports: [FormField, AuditConsole, ScrollReveal],
  template: `
    <section class="hero-section" id="hero" aria-label="Studio Introduction">
      <div class="container hero-container" appScrollReveal>
        <h1 class="hero-title">
          Elite frontend engineering meets
          <span class="font-serif">high-precision product design.</span>
        </h1>

        <p class="hero-subheadline">
          {{ site().description }}
        </p>

        <!-- Live Site Audit Form -->
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
            [class.is-invalid]="auditForm.url().touched() && auditForm.url().errors().length > 0"
          >
            <div class="audit-input-wrapper">
              <div class="input-icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
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
              />
            </div>
            <button
              class="btn btn--primary btn--hero-audit"
              id="hero-audit-btn"
              type="submit"
              [class.btn--loading]="pagespeed.isScanning()"
              [disabled]="pagespeed.isScanning()"
            >
              <span class="btn-text">Analyze Site</span>
              <span class="arrow-indicator" aria-hidden="true">→</span>
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

          <p class="hero-alternative-prompt">
            Don't have a live website yet? No problem &mdash;
            <a class="hero-alt-link" href="#contact">talk to the partners directly &rarr;</a>
          </p>
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
                  <span class="scanner-title">Scanning Architecture &amp; Web Vitals</span>
                  <span class="scanner-log" id="scanner-log">{{ pagespeed.scanLog() }}</span>
                </div>
              </div>
            } @else {
              <app-audit-console [results]="pagespeed.auditResult()" />
            }
          </div>
        }

        <!-- Studio Verification Proof Row -->
        <div class="hero-proof-row" aria-label="Studio Verification Metrics">
          @for (item of site().proofBar; track item.label; let last = $last) {
            <div class="proof-item">
              <span class="proof-item__metric">{{ item.metric }}</span>
              <span class="proof-item__label">{{ item.label }}</span>
              <span class="proof-item__sub">{{ item.sub }}</span>
            </div>
            @if (!last) {
              <div class="proof-separator" aria-hidden="true"></div>
            }
          }
        </div>
      </div>
    </section>
  `
})
export class Hero {
  readonly pagespeed = inject(PagespeedClient);
  private readonly studio = inject(StudioContent);
  readonly site = this.studio.site;

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

  onAnalyze(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    submit(this.auditForm, async () => {
      const url = this.auditModel().url;
      await this.pagespeed.runAudit(url);
    });
  }
}
