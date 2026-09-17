import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  template: `
    <footer class="site-footer" role="contentinfo">
      <div class="container footer-inner">
        <p class="footer-copyright">&copy; {{ currentYear }} Zelenia Inc. All rights reserved.</p>
      </div>
    </footer>
  `
})
export class SiteFooter {
  readonly currentYear = new Date().getFullYear();
}
