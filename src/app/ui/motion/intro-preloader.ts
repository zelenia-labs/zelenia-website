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
          <div class="preloader-wordmark" aria-label="ZELENIA">
            <span class="preloader-char" style="--char-idx: 0">Z</span>
            <span class="preloader-char" style="--char-idx: 1">E</span>
            <span class="preloader-char" style="--char-idx: 2">L</span>
            <span class="preloader-char" style="--char-idx: 3">E</span>
            <span class="preloader-char" style="--char-idx: 4">N</span>
            <span class="preloader-char" style="--char-idx: 5">I</span>
            <span class="preloader-char" style="--char-idx: 6">A</span>
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
      background-color: #fbfaf7;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      will-change: transform, opacity;
      transform: translate3d(0, 0, 0);
      box-shadow: 0 20px 50px rgba(18, 22, 30, 0.08);
      border-bottom: 1px solid rgba(18, 22, 30, 0.08);
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
      align-items: center;
      justify-content: center;
      gap: clamp(0.25rem, 1vw, 0.6rem);
      font-family: var(--font-heading, Inter, sans-serif);
      font-size: clamp(2.25rem, 5.5vw, 4rem);
      font-weight: 700;
      color: #0c0f14;
      letter-spacing: 0.18em;
      transition: letter-spacing 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .preloader-char {
      display: inline-block;
      opacity: 0;
      transform: translateY(20px);
      filter: blur(8px);
      transition:
        opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
        filter 0.45s cubic-bezier(0.16, 1, 0.3, 1);
      transition-delay: calc(var(--char-idx) * 65ms);
    }

    .preloader-line {
      inline-size: 0;
      block-size: 2px;
      background: linear-gradient(90deg, transparent, #0c0f14 50%, transparent);
      border-radius: 9999px;
      opacity: 0;
      transition:
        inline-size 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s,
        opacity 0.6s ease 0.35s;
    }

    .intro-preloader.is-animating .preloader-char {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0px);
    }

    .intro-preloader.is-animating .preloader-wordmark {
      letter-spacing: 0.24em;
    }

    .intro-preloader.is-animating .preloader-line {
      inline-size: clamp(140px, 30vw, 240px);
      opacity: 0.85;
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

      // Phase 2: 1150ms: User has read "ZELENIA" clearly -> Curtain glides up smoothly
      setTimeout(() => {
        this.isCurtainUp.set(true);
        document.documentElement.classList.remove('has-curtain');
        document.documentElement.classList.add('curtain-revealing');
      }, 1150);

      // Phase 3: 1800ms: Completely dismiss preloader from DOM
      setTimeout(() => {
        this.isDismissed.set(true);
        document.documentElement.classList.remove('curtain-revealing');
        document.documentElement.classList.add('curtain-dismissed');
      }, 1800);
    });
  }
}
