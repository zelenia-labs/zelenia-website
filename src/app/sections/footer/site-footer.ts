import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  template: `
    <footer #footerRef class="site-footer" role="contentinfo">
      <!-- Ambient Parallax Glow -->
      <div class="ambient-glow glow--footer-warm" aria-hidden="true"></div>

      <!-- Architectural Parallax Typographic Watermark -->
      <div class="footer-watermark-wrap" aria-hidden="true">
        <span class="footer-watermark">ZELENIA</span>
      </div>

      <div class="container footer-container">
        <!-- Main Upper Footer Row -->
        <div class="footer-main-row">
          <!-- Left Column: Branding, Design System CTA & LinkedIn -->
          <div class="footer-left-col">
            <span class="footer-logo">Zelenia Studio</span>
            <p class="footer-tagline">
              Frontend architecture &amp; product design executed directly by senior founders.
            </p>

            <div class="footer-left-actions">
              <a
                routerLink="/contact"
                class="btn btn--primary footer-cta-btn footer-action-link--contact"
              >
                <span>Start a conversation</span>
                <span class="btn-arrow" aria-hidden="true">&rarr;</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn--secondary footer-linkedin-btn footer-action-link--linkedin"
                aria-label="Connect with Zelenia founders on LinkedIn"
              >
                <span>LinkedIn</span>
                <span class="ext-arrow" aria-hidden="true">&nearr;</span>
              </a>
            </div>
          </div>

          <!-- Right Column: Only Company Group -->
          <nav class="footer-right-col" aria-label="Company Navigation">
            <div class="footer-col">
              <span class="footer-col__title">Company</span>
              <ul class="footer-links">
                <li>
                  <a routerLink="/about" class="footer-link">
                    <span>About Us</span>
                  </a>
                </li>
                <li>
                  <a routerLink="/process" class="footer-link">
                    <span>Process &amp; Scope</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <!-- Minimalist Architectural Bottom Bar -->
        <div class="footer-bottom-bar">
          <p class="footer-copyright">
            &copy; {{ currentYear }} Zelenia. High-performance frontend architecture &amp; product
            design.
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .site-footer {
      background-color: var(--bg);
      border-top: 1px solid var(--border);
      padding-block: clamp(4rem, 7vw, 6rem) clamp(2rem, 3.5vw, 3rem);
      color: var(--text);
      position: relative;
      overflow: hidden;
      contain: layout paint;
    }

    /* Ambient Warm Glow with Parallax Floating */
    .glow--footer-warm {
      width: 700px;
      height: 700px;
      background-color: #f2ebdf;
      opacity: 0.35;
      filter: blur(120px);
      bottom: -160px;
      left: 50%;
      transform: translateX(-50%) translateY(var(--footer-parallax-y, 0px));
      pointer-events: none;
      z-index: 0;
      transition: transform 0.12s linear;
      will-change: transform;
    }

    /* Giant Sculptural Architectural Typographic Watermark */
    .footer-watermark-wrap {
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      pointer-events: none;
      user-select: none;
      z-index: 0;
      overflow: hidden;
    }

    .footer-watermark {
      font-family: var(--font-serif);
      font-size: clamp(6rem, 18vw, 16rem);
      font-weight: 700;
      letter-spacing: -0.05em;
      line-height: 0.78;
      color: rgba(36, 32, 27, 0.035);
      white-space: nowrap;
      text-transform: uppercase;
      transform: translateY(var(--footer-watermark-y, 0px));
      will-change: transform;
      transition: transform 0.12s linear;
    }

    /* Native CSS Scroll-Driven Parallax on Modern Engines */
    @supports (animation-timeline: view()) {
      .footer-watermark {
        animation: watermarkParallax linear both;
        animation-timeline: view();
        animation-range: entry 0% exit 100%;
      }

      .glow--footer-warm {
        animation: glowParallax linear both;
        animation-timeline: view();
        animation-range: entry 0% exit 100%;
      }
    }

    @keyframes watermarkParallax {
      from {
        transform: translateY(40px) scale(0.97);
        opacity: 0.025;
      }
      to {
        transform: translateY(-24px) scale(1.02);
        opacity: 0.045;
      }
    }

    @keyframes glowParallax {
      from {
        transform: translateX(-50%) translateY(35px);
      }
      to {
        transform: translateX(-50%) translateY(-25px);
      }
    }

    /* Layout Shell */
    .footer-container {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: clamp(3rem, 5vw, 4.5rem);
      max-width: var(--shell);
      margin-inline: auto;
    }

    .footer-main-row {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      justify-content: space-between;
      align-items: flex-start;
    }

    @media (min-width: 768px) {
      .footer-main-row {
        flex-direction: row;
        align-items: flex-start;
      }
    }

    /* Left Column */
    .footer-left-col {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 480px;
      gap: 1.15rem;
    }

    .footer-logo {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 3vw, 2.5rem);
      font-weight: 700;
      color: #24201b;
      letter-spacing: -0.03em;
      line-height: 1.1;
    }

    .footer-tagline {
      font-family: var(--font-sans);
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--text-2);
      margin: 0 0 0.5rem 0;
    }

    .footer-left-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
    }

    /* Design System CTA Button */
    .footer-cta-btn {
      min-height: 44px;
      padding-inline: 1.65rem;
      font-weight: 600;
    }

    .footer-cta-btn .btn-arrow {
      transition: transform var(--transition-fast);
    }

    .footer-cta-btn:hover .btn-arrow {
      transform: translateX(3px);
    }

    /* Design System Secondary LinkedIn Button */
    .footer-linkedin-btn {
      min-height: 44px;
      padding-inline: 1.35rem;
      font-weight: 550;
    }

    .footer-linkedin-btn .ext-arrow {
      font-size: 0.85rem;
      transition: transform var(--transition-fast);
    }

    .footer-linkedin-btn:hover .ext-arrow {
      transform: translate(2px, -2px);
    }

    /* Right Column: Company Group Only */
    .footer-right-col {
      display: flex;
      align-items: flex-start;
    }

    .footer-col {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-width: 150px;
    }

    .footer-col__title {
      font-size: 0.75rem;
      font-weight: 650;
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

    .footer-link {
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--text-2);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      transition: color var(--transition-fast);
    }

    .footer-link:hover {
      color: var(--dark-ink);
    }

    /* Bottom Bar */
    .footer-bottom-bar {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-block-start: 1.75rem;
      border-top: 1px solid var(--border-subtle);
    }

    .footer-copyright {
      margin: 0;
      font-family: var(--font-sans);
      font-size: 0.8125rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    @media (prefers-reduced-motion: reduce) {
      .footer-watermark,
      .glow--footer-warm {
        animation: none !important;
        transform: none !important;
      }
    }
  `
})
export class SiteFooter {
  readonly currentYear = new Date().getFullYear();
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroyRef = inject(DestroyRef);
  private readonly footerRef = viewChild<ElementRef<HTMLElement>>('footerRef');

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser) return;

      // Progressive enhancement: only attach manual scroll listener if native CSS view() is not supported
      if (typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'view()')) {
        return;
      }

      this.initParallaxFallback();
    });
  }

  private initParallaxFallback(): void {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
    });

    this.updateParallax();
  }

  private updateParallax(): void {
    const el = this.footerRef()?.nativeElement;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Only compute when approaching or in viewport
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      // Watermark shifts upward as user scrolls into footer
      const watermarkShift = (clamped - 0.5) * -50;
      const glowShift = (clamped - 0.5) * -35;

      el.style.setProperty('--footer-watermark-y', `${watermarkShift.toFixed(1)}px`);
      el.style.setProperty('--footer-parallax-y', `${glowShift.toFixed(1)}px`);
    }
  }
}
