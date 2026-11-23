import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

import { App } from './app';

@Component({
  selector: 'app-stub-about',
  template: `<section class="about-stub reveal-on-scroll">About</section>`
})
class StubAboutPage {}

@Component({
  selector: 'app-stub-contact',
  template: `
    <section class="contact-header reveal-on-scroll">Contact Header</section>
    <div class="contact-form-card reveal-on-scroll">Contact Form</div>
  `
})
class StubContactPage {}

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin: string;
  readonly thresholds: readonly number[];
  readonly observed = new Set<Element>();
  disconnected = false;

  constructor(
    private readonly callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) {
    this.rootMargin = options.rootMargin ?? '0px';
    const threshold = options.threshold ?? 0;
    this.thresholds = Array.isArray(threshold) ? threshold : [threshold];
    MockIntersectionObserver.instances.push(this);
  }

  observe(target: Element): void {
    this.observed.add(target);
  }

  unobserve(target: Element): void {
    this.observed.delete(target);
  }

  disconnect(): void {
    this.disconnected = true;
    this.observed.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  revealAll(): void {
    const entries = Array.from(this.observed).map(
      (target) =>
        ({
          target,
          isIntersecting: true
        }) as IntersectionObserverEntry
    );
    this.callback(entries, this);
  }
}

describe('App', () => {
  beforeEach(async () => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      })
    );

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([
          { path: 'about', component: StubAboutPage },
          { path: 'contact', component: StubContactPage }
        ]),
        provideLocationMocks()
      ]
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.classList.remove(
      'motion-ready',
      'has-curtain',
      'curtain-revealing',
      'curtain-dismissed'
    );
    vi.unstubAllGlobals();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should re-initialize scroll reveal and reveal contact elements when navigating from /about to /contact', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/about');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.documentElement.classList.contains('motion-ready')).toBe(true);
    expect(MockIntersectionObserver.instances.length).toBeGreaterThanOrEqual(1);

    const aboutObserver =
      MockIntersectionObserver.instances[MockIntersectionObserver.instances.length - 1];
    const aboutSection = fixture.nativeElement.querySelector('.about-stub') as HTMLElement;
    expect(aboutObserver.observed.has(aboutSection)).toBe(true);

    await router.navigateByUrl('/contact');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(aboutObserver.disconnected).toBe(true);

    const contactObserver =
      MockIntersectionObserver.instances[MockIntersectionObserver.instances.length - 1];
    expect(contactObserver).not.toBe(aboutObserver);

    const contactHeader = fixture.nativeElement.querySelector('.contact-header') as HTMLElement;
    const contactFormCard = fixture.nativeElement.querySelector(
      '.contact-form-card'
    ) as HTMLElement;
    expect(contactObserver.observed.has(contactHeader)).toBe(true);
    expect(contactObserver.observed.has(contactFormCard)).toBe(true);

    contactObserver.revealAll();

    expect(contactHeader.classList.contains('is-revealed')).toBe(true);
    expect(contactFormCard.classList.contains('is-revealed')).toBe(true);
  });
});
