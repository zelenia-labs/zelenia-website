import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IntroPreloader } from './ui/motion/intro-preloader';
import { SiteHeader } from './sections/header/site-header';
import { SiteFooter } from './sections/footer/site-footer';

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
export class App {}
