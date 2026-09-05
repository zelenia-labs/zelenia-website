import { Component, signal, inject, PLATFORM_ID, afterNextRender, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StudioContent } from '../../content/studio-content';

@Component({
  selector: 'app-site-header',
  template: `
    <header class="site-header" id="site-header">
      <div class="header-inner">
        <a class="site-logo" href="/" aria-label="Zelenia Home">
          <span class="logo-text">Zelenia</span>
          <span class="logo-slash" aria-hidden="true">/</span>
          <span class="logo-subtext">Studio</span>
        </a>

        <nav class="site-nav" id="site-navigation" aria-label="Main Navigation">
          @for (item of site().nav; track item.href) {
            <a class="nav-link" [href]="item.href" [class.is-active]="isActive(item.href)">
              {{ item.label }}
            </a>
          }
          <a class="btn btn--primary btn--header" href="#contact">
            <span>Book a Review</span>
            <span class="arrow-indicator" aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  `
})
export class SiteHeader implements OnDestroy {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly studio = inject(StudioContent);
  readonly site = this.studio.site;

  readonly activeSection = signal<string>('');

  private navObserver: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser) {
        this.initActiveNavObserver();
      }
    });
  }

  isActive(href: string): boolean {
    const active = this.activeSection();
    if (!active) return false;
    return href === `#${active}` || href === `/#${active}`;
  }

  private initActiveNavObserver(): void {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    this.navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              this.activeSection.set(id);
            }
          }
        });
      },
      { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((s) => this.navObserver?.observe(s));
  }

  ngOnDestroy(): void {
    this.navObserver?.disconnect();
  }
}
