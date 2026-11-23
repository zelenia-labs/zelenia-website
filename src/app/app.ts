import {
  afterNextRender,
  AfterRenderRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  PLATFORM_ID,
  viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IntroPreloader } from './ui/motion/intro-preloader';
import { initScrollReveal } from './ui/motion/scroll-reveal';
import { SiteHeader } from './sections/header/site-header';
import { SiteFooter } from './sections/footer/site-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IntroPreloader, SiteHeader, SiteFooter],
  template: `
    <app-intro-preloader />
    <a class="skip-link" href="#main-content">Skip to content</a>
    <app-site-header />
    <main #mainContent id="main-content" tabindex="-1">
      <router-outlet (activate)="onRouteActivate()" />
    </main>
    <app-site-footer />
  `
})
export class App {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly mainContent = viewChild<ElementRef<HTMLElement>>('mainContent');

  private cleanupScrollReveal: (() => void) | null = null;
  private pendingRenderRef: AfterRenderRef | null = null;

  constructor() {
    afterNextRender(() => this.refreshScrollReveal());

    this.destroyRef.onDestroy(() => {
      this.pendingRenderRef?.destroy();
      this.cleanupScrollReveal?.();
    });
  }

  protected onRouteActivate(): void {
    if (!this.isBrowser) return;

    this.pendingRenderRef?.destroy();
    this.pendingRenderRef = afterNextRender(
      () => {
        this.pendingRenderRef = null;
        this.refreshScrollReveal();
      },
      { injector: this.injector }
    );
  }

  private refreshScrollReveal(): void {
    if (!this.isBrowser) return;

    this.cleanupScrollReveal?.();
    this.cleanupScrollReveal = initScrollReveal(this.mainContent()?.nativeElement ?? document.body);
  }
}
