import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteHeader } from './site-header';
import { WebsiteContent } from '../../content/website-content';

describe('SiteHeader Component', () => {
  let fixture: ComponentFixture<SiteHeader>;
  let component: SiteHeader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [WebsiteContent, provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SiteHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the site header with Zelenia logo', () => {
    expect(component).toBeTruthy();
    const logoEl = fixture.nativeElement.querySelector('.site-logo');
    expect(logoEl).toBeTruthy();
    const imgEl = logoEl.querySelector('.site-logo-icon');
    expect(imgEl).toBeTruthy();
    expect(imgEl.getAttribute('src')).toBe('/Zelenia-Logo.svg');
  });

  it('should not contain a hamburger menu button or nav-toggle', () => {
    const navToggle = fixture.nativeElement.querySelector('#nav-toggle');
    expect(navToggle).toBeNull();

    const hamburgerBars = fixture.nativeElement.querySelectorAll('.hamburger-bar');
    expect(hamburgerBars.length).toBe(0);
  });

  it('should render desktop navigation links and Book Call pill button', () => {
    const navEl = fixture.nativeElement.querySelector('#site-navigation');
    expect(navEl).toBeTruthy();

    const links = fixture.nativeElement.querySelectorAll('.nav-link');
    expect(links.length).toBeGreaterThan(0);

    const ctaButton = fixture.nativeElement.querySelector('.btn--header');
    expect(ctaButton).toBeTruthy();
    expect(ctaButton.textContent).toContain('Book Call');
  });

  it('should only highlight Our process when route is /process', () => {
    component.currentUrl.set('/process');
    fixture.detectChanges();

    const links = Array.from(
      fixture.nativeElement.querySelectorAll('.nav-link')
    ) as HTMLAnchorElement[];

    const activeLinks = links.filter((l) => l.classList.contains('is-active'));
    expect(activeLinks.length).toBe(1);
    expect(activeLinks[0].textContent?.trim()).toBe('Our process');
  });

  it('should only highlight About when route is /team', () => {
    component.currentUrl.set('/team');
    fixture.detectChanges();

    const links = Array.from(
      fixture.nativeElement.querySelectorAll('.nav-link')
    ) as HTMLAnchorElement[];

    const activeLinks = links.filter((l) => l.classList.contains('is-active'));
    expect(activeLinks.length).toBe(1);
    expect(activeLinks[0].textContent?.trim()).toBe('About');
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
