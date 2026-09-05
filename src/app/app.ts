import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmbientCanvas } from './ui/canvas/ambient-canvas';
import { SiteHeader } from './ui/navigation/site-header';
import { SiteFooter } from './ui/navigation/site-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AmbientCanvas, SiteHeader, SiteFooter],
  template: `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <app-ambient-canvas />
    <app-site-header />
    <main id="main-content" tabindex="-1">
      <router-outlet />
    </main>
    <app-site-footer />
  `
})
export class App {}
