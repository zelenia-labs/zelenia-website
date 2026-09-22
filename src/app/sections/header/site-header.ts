import { Component, computed, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface HeaderNavItem {
  label: string;
  href: string;
  fragment?: string;
}

@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  template: `
    <header
      class="site-header"
      [class.is-scrolled-up]="isScrolledUp()"
      [class.is-scrolled-down]="isScrolledDown()"
      id="site-header"
    >
      <div class="header-inner">
        <!-- Zelenia Logo (public/Zelenia-Logo.svg) -->
        <a class="site-logo" routerLink="/" aria-label="Zelenia Home" (click)="onLogoClick($event)">
          <img
            src="/Zelenia-Logo.svg"
            alt="Zelenia Logo"
            class="site-logo-icon"
            width="15"
            height="18"
          />
        </a>

        <!-- Main Nav Links (Our process, Services, About) -->
        <nav class="site-nav" id="site-navigation" aria-label="Main Navigation">
          @for (item of navItems; track item.label) {
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

        <!-- Right Pill Button (x=1274, y=24, w=102, h=35, rx=17.5 in design.svg: 'Book Call') -->
        <div class="header-cta">
          <a class="btn btn--pill-header btn--header" routerLink="/contact">
            <span>Book Call</span>
          </a>
        </div>
      </div>
    </header>
  `
})
export class SiteHeader {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly currentUrl = signal<string>('/');
  readonly activeSection = signal<string | null>(null);
  readonly isScrolledUp = signal<boolean>(false);
  readonly isScrolledDown = signal<boolean>(false);
  private lastScrollY = 0;

  readonly navItems: HeaderNavItem[] = [
    { label: 'Our process', href: '/process' },
    { label: 'Services', href: '/#tracks', fragment: 'tracks' },
    { label: 'About', href: '/team' }
  ];

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
      const onScroll = () => {
        const currentY = window.scrollY;
        if (currentY <= 50) {
          // At the top of the page: transparent, no background
          this.isScrolledUp.set(false);
          this.isScrolledDown.set(false);
        } else if (currentY > this.lastScrollY + 8) {
          // Scrolling down: tuck away
          this.isScrolledDown.set(true);
          this.isScrolledUp.set(false);
        } else if (currentY < this.lastScrollY - 8) {
          // Scrolling up (showing intent to navigate up): reveal with background applied
          this.isScrolledUp.set(true);
          this.isScrolledDown.set(false);
        }
        this.lastScrollY = currentY;
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
      });

      setTimeout(() => {
        this.setupScrollSpy();
      }, 50);
    }
  }

  isItemActive(item: HeaderNavItem): boolean {
    const path = this.currentPath();
    if (item.fragment) {
      return path === item.href && this.activeSection() === item.fragment;
    }
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

  onNavClick(event: Event, item: HeaderNavItem): void {
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

    const tracksEl = document.getElementById('tracks');
    if (tracksEl && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.activeSection.set('tracks');
            } else if (this.activeSection() === 'tracks') {
              this.activeSection.set(null);
            }
          }
        },
        {
          rootMargin: '-15% 0px -45% 0px',
          threshold: [0, 0.1, 0.2]
        }
      );
      this.observer.observe(tracksEl);
    }
  }

  private cleanupObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
