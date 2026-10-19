import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteHeader } from './site-header';

describe('SiteHeader Component', () => {
  let fixture: ComponentFixture<SiteHeader>;
  let component: SiteHeader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SiteHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the site header with Zelenia logo', () => {
    expect(component).toBeTruthy();
    const logoEl = fixture.nativeElement.querySelector('.site-logo');
    expect(logoEl).toBeTruthy();
    const markEl = logoEl.querySelector('.site-logo-mark');
    expect(markEl).toBeTruthy();
    expect(markEl.textContent?.trim()).toBe('Zelenia');
  });

  it('should not contain a hamburger menu button or nav-toggle', () => {
    const navToggle = fixture.nativeElement.querySelector('#nav-toggle');
    expect(navToggle).toBeNull();

    const hamburgerBars = fixture.nativeElement.querySelectorAll('.hamburger-bar');
    expect(hamburgerBars.length).toBe(0);
  });

  it('should render desktop navigation links and CTA pill button', () => {
    const navEl = fixture.nativeElement.querySelector('#site-navigation');
    expect(navEl).toBeTruthy();

    const links = fixture.nativeElement.querySelectorAll('.nav-link');
    expect(links.length).toBeGreaterThan(0);

    const ctaButton = fixture.nativeElement.querySelector('.btn--header');
    expect(ctaButton).toBeTruthy();
    expect(ctaButton.textContent).toContain('Contact us');
  });


  it('should only highlight About us when route is /about and set aria-current', () => {
    component.currentUrl.set('/about');
    fixture.detectChanges();

    const links = Array.from(
      fixture.nativeElement.querySelectorAll('.nav-link')
    ) as HTMLAnchorElement[];

    const activeLinks = links.filter((l) => l.classList.contains('is-active'));
    expect(activeLinks.length).toBe(1);
    expect(activeLinks[0].textContent?.trim()).toBe('About us');
    expect(activeLinks[0].getAttribute('aria-current')).toBe('page');
  });

  it('should highlight Book Call CTA button when route is /contact', () => {
    component.currentUrl.set('/contact');
    fixture.detectChanges();

    const ctaButton = fixture.nativeElement.querySelector('.btn--header') as HTMLAnchorElement;
    expect(ctaButton.classList.contains('is-active')).toBe(true);
    expect(ctaButton.getAttribute('aria-current')).toBe('page');
  });

  it('should not highlight any dedicated page link on root route without fragment', () => {
    component.currentUrl.set('/');
    component.activeSection.set(null);
    fixture.detectChanges();

    const links = Array.from(
      fixture.nativeElement.querySelectorAll('.nav-link')
    ) as HTMLAnchorElement[];
    const activeLinks = links.filter((l) => l.classList.contains('is-active'));
    expect(activeLinks.length).toBe(0);
  });
});
