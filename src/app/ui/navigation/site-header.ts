import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StudioContent } from '../../content/studio-content';

import { NavItem } from '../../content/studio.model';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header" id="site-header">
      <div class="header-inner">
        <a class="site-logo" routerLink="/" aria-label="Zelenia Home">
          <span class="logo-text">ZELENIA</span>
        </a>

        <nav class="site-nav" id="site-navigation" aria-label="Main Navigation">
          @for (item of site().nav; track item.label) {
            <a
              class="nav-link"
              [routerLink]="item.href"
              [fragment]="item.fragment"
              routerLinkActive="is-active"
              [routerLinkActiveOptions]="{ exact: item.href === '/' && !item.fragment }"
              (click)="onNavClick($event, item)"
            >
              {{ item.label }}
            </a>
          }
          <a class="btn btn--primary btn--header" routerLink="/contact">
            <span>Connect With Us</span>
            <span class="arrow-indicator" aria-hidden="true">→</span>
          </a>
        </nav>
      </div>
    </header>
  `
})
export class SiteHeader {
  private readonly studio = inject(StudioContent);
  readonly site = this.studio.site;

  onNavClick(event: Event, item: NavItem): void {
    if (item.fragment && typeof document !== 'undefined') {
      const target = document.getElementById(item.fragment);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (typeof window !== 'undefined' && window.history) {
          window.history.pushState(null, '', `/#${item.fragment}`);
        }
      }
    }
  }
}
