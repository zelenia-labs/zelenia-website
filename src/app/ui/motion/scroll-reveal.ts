import { Directive, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';
import { ScrollRevealObserver } from './scroll-reveal-observer';

@Directive({
  selector: '[appScrollReveal]'
})
export class ScrollReveal implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly observer = inject(ScrollRevealObserver);

  ngOnInit(): void {
    const target = this.el.nativeElement as HTMLElement;
    target.classList.add('reveal-on-scroll');
    this.observer.observe(target);
  }

  ngOnDestroy(): void {
    const target = this.el.nativeElement as HTMLElement;
    this.observer.unobserve(target);
  }
}
