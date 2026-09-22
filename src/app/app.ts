import { Component, inject, PLATFORM_ID, afterNextRender, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IntroPreloader } from './ui/motion/intro-preloader';
import { SiteHeader } from './sections/header/site-header';
import { SiteFooter } from './sections/footer/site-footer';
import { initScrollReveal } from './ui/motion/scroll-reveal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IntroPreloader, SiteHeader, SiteFooter],
  template: `
    <app-intro-preloader />
    <a class="skip-link" href="#main-content">Skip to content</a>
    <app-site-header />
    <main id="main-content" tabindex="-1">
      <router-outlet />
    </main>
    <app-site-footer />
  `
})
export class App {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser) return;

      let disconnect = initScrollReveal();

      const sub = this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => {
          setTimeout(() => {
            initScrollReveal();
          }, 60);
        });

      this.destroyRef.onDestroy(() => {
        disconnect();
        sub.unsubscribe();
      });
    });
  }
}
