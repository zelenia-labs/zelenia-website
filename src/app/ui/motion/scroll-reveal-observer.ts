import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollRevealObserver {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer: IntersectionObserver | null = null;

  constructor() {
    if (this.isBrowser && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { root: null, threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
    }
  }

  observe(element: Element): void {
    if (this.observer) {
      this.observer.observe(element);
    } else {
      // Fallback for SSR or older browsers
      element.classList.add('is-revealed');
    }
  }

  unobserve(element: Element): void {
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }
}
