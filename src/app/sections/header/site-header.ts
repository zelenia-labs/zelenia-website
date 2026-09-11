import { Component, computed, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { WebsiteContent } from '../../content/website-content';
import { NavItem } from '../../content/navigation';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  template: `
    <header class="site-header" id="site-header">
      <div class="header-inner">
        <a class="site-logo" routerLink="/" aria-label="Zelenia Home" (click)="onLogoClick($event)">
          <span class="logo-text">ZELENIA</span>
        </a>

        <nav class="site-nav" id="site-navigation" aria-label="Main Navigation">
          @for (item of site().nav; track item.label) {
            <a
              class="nav-link"
              [class.is-active]="isItemActive(item)"
              [routerLink]="item.href"
              [fragment]="item.fragment"
              (click)="onNavClick($event, item)"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <div class="header-cta">
          <a class="btn btn--primary btn--header" routerLink="/contact">
            <span>Connect With Us</span>
            <span class="arrow-indicator" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
  `
})
export class SiteHeader {
  private readonly website = inject(WebsiteContent);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly site = this.website.site;
  readonly currentUrl = signal<string>('/');
  readonly activeSection = signal<string | null>(null);

  private observer: IntersectionObserver | null = null;

  readonly currentPath = computed(() => {
    const raw = this.currentUrl();
    const clean = raw.split('#')[0].split('?')[0];
    return clean.length > 1 && clean.endsWith('/') ? clean.slice(0, -1) : clean || '/';
  });

  constructor() {
    this.currentUrl.set(this.router.url || '/');

    const navSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects || event.url);
        this.setupScrollSpy();
      });

    this.destroyRef.onDestroy(() => {
      navSub.unsubscribe();
      this.cleanupObserver();
    });

    if (this.isBrowser) {
      setTimeout(() => {
        this.setupScrollSpy();
      }, 50);
    }
  }

  isItemActive(item: NavItem): boolean {
    const path = this.currentPath();
    if (item.fragment) {
      // In-page section anchor (e.g. Advantage on /)
      return path === item.href && this.activeSection() === item.fragment;
    }
    // Dedicated page route (e.g. /process or /team)
    return path === item.href;
  }

  onLogoClick(event: Event): void {
    if (this.currentPath() === '/' && this.isBrowser) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.activeSection.set(null);
      if (window.location.hash) {
        window.history.pushState(null, '', '/');
      }
    }
  }

  onNavClick(event: Event, item: NavItem): void {
    const path = this.currentPath();

    if (item.fragment && path === item.href) {
      if (typeof document !== 'undefined') {
        const target = document.getElementById(item.fragment);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          this.activeSection.set(item.fragment);
          if (typeof window !== 'undefined' && window.history) {
            window.history.pushState(null, '', `/#${item.fragment}`);
          }
        }
      }
    } else if (!item.fragment && path === item.href) {
      if (typeof window !== 'undefined') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  private setupScrollSpy(): void {
    if (!this.isBrowser) return;

    this.cleanupObserver();

    const path = this.currentPath();
    if (path !== '/') {
      this.activeSection.set(null);
      return;
    }

    if (typeof window !== 'undefined' && window.location.hash === '#advantage') {
      this.activeSection.set('advantage');
    }

    const advantageEl = document.getElementById('advantage');
    if (advantageEl && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.activeSection.set('advantage');
            } else if (this.activeSection() === 'advantage') {
              this.activeSection.set(null);
            }
          }
        },
        {
          rootMargin: '-15% 0px -45% 0px',
          threshold: [0, 0.1, 0.2]
        }
      );
      this.observer.observe(advantageEl);
    }
  }

  private cleanupObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
