import { Component, signal, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-intro-preloader',
  template: `
    @if (!isDismissed()) {
      <aside
        class="intro-preloader"
        [class.is-animating]="isAnimating()"
        [class.is-curtain-up]="isCurtainUp()"
        [class.is-reduced-motion]="isReducedMotion()"
        aria-label="Studio Introduction"
      >
        <div class="preloader-content">
          <div class="preloader-wordmark" aria-label="Zelenia Studio">
            @for (item of wordmarkChars; track $index) {
              @if (item.char === ' ') {
                <span class="preloader-space">&nbsp;</span>
              } @else {
                <span class="preloader-char" [style.--char-idx]="item.idx">{{ item.char }}</span>
              }
            }
          </div>
          <div class="preloader-line" aria-hidden="true"></div>
        </div>
      </aside>
    }
  `,
  styles: `
    .intro-preloader {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background-color: var(--bg, #fbfbfb);
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      will-change: transform, opacity;
      transform: translate3d(0, 0, 0);
      box-shadow: 0 20px 50px rgba(36, 32, 27, 0.06);
      border-bottom: 1px solid rgba(36, 32, 27, 0.08);
      transition: transform 0.65s cubic-bezier(0.77, 0, 0.175, 1);
    }

    .preloader-content {
      overflow: hidden;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
    }

    .preloader-wordmark {
      display: flex;
      align-items: baseline;
      justify-content: center;
      font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
      font-size: clamp(3rem, 6vw, 4.75rem);
      font-weight: 700;
      color: #4d4a48;
      letter-spacing: -0.02em;
      line-height: 1.15;
      -webkit-text-stroke: 0.1px #4d4a48;
      paint-order: stroke fill;
    }

    .preloader-char {
      display: inline-block;
      opacity: 0;
      transform: translateY(18px);
      filter: blur(6px);
      transition:
        opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
        filter 0.45s cubic-bezier(0.16, 1, 0.3, 1);
      transition-delay: calc(var(--char-idx) * 45ms);
    }

    .preloader-space {
      display: inline-block;
      width: 0.28em;
    }

    /* Hairline Rule matching Figma design lines (1px, #D5DFE1, opacity 0.4-0.6) */
    .preloader-line {
      inline-size: 0;
      block-size: 1px;
      background: linear-gradient(90deg, transparent, #d5dfe1 15%, #d5dfe1 85%, transparent);
      opacity: 0;
      transition:
        inline-size 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.3s,
        opacity 0.65s ease 0.3s;
    }

    .intro-preloader.is-animating .preloader-char {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0px);
    }

    .intro-preloader.is-animating .preloader-line {
      inline-size: clamp(140px, 25vw, 220px);
      opacity: 0.65;
    }

    .intro-preloader.is-curtain-up {
      transform: translate3d(0, -100%, 0);
    }

    .intro-preloader.is-reduced-motion {
      transform: none !important;
      transition: opacity 0.2s ease-out !important;
    }

    .intro-preloader.is-reduced-motion .preloader-char {
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
      transition: none !important;
    }

    .intro-preloader.is-reduced-motion.is-curtain-up {
      opacity: 0;
    }
  `
})
export class IntroPreloader {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly wordmarkChars = 'Zelenia Studio'.split('').map((char, idx) => ({ char, idx }));

  readonly isDismissed = signal(false);
  readonly isAnimating = signal(false);
  readonly isCurtainUp = signal(false);
  readonly isReducedMotion = signal(false);

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser) return;

      // Check prefers-reduced-motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        this.isReducedMotion.set(true);
        this.isDismissed.set(false);
        document.documentElement.classList.add('curtain-dismissed');
        setTimeout(() => {
          this.isCurtainUp.set(true);
          setTimeout(() => {
            this.isDismissed.set(true);
          }, 200);
        }, 100);
        return;
      }

      // Start sequence on page load and hard reload (Ctrl+R / Cmd+R)
      this.isDismissed.set(false);
      document.documentElement.classList.add('has-curtain');

      // Phase 1: 50ms: Left-to-right character cascade triggers
      requestAnimationFrame(() => {
        this.isAnimating.set(true);
      });

      // Phase 2: 1150ms: User has read "Zelenia Studio" clearly -> Curtain glides up smoothly
      setTimeout(() => {
        this.isCurtainUp.set(true);
        document.documentElement.classList.remove('has-curtain');
        document.documentElement.classList.add('curtain-revealing');
      }, 1150);

      // Phase 3: 1800ms: Transition complete -> Cleanup DOM from tree completely
      setTimeout(() => {
        this.isDismissed.set(true);
        document.documentElement.classList.remove('curtain-revealing');
        document.documentElement.classList.add('curtain-dismissed');
      }, 1800);
    });
  }
}
