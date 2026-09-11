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

  it('should create the site header', () => {
    expect(component).toBeTruthy();
    const logoEl = fixture.nativeElement.querySelector('.site-logo');
    expect(logoEl).toBeTruthy();
  });

  it('should not contain a hamburger menu button or nav-toggle', () => {
    const navToggle = fixture.nativeElement.querySelector('#nav-toggle');
    expect(navToggle).toBeNull();

    const hamburgerBars = fixture.nativeElement.querySelectorAll('.hamburger-bar');
    expect(hamburgerBars.length).toBe(0);
  });

  it('should render desktop navigation links and review button', () => {
    const navEl = fixture.nativeElement.querySelector('#site-navigation');
    expect(navEl).toBeTruthy();

    const links = fixture.nativeElement.querySelectorAll('.nav-link');
    expect(links.length).toBeGreaterThan(0);

    const ctaButton = fixture.nativeElement.querySelector('.btn--header');
    expect(ctaButton).toBeTruthy();
    expect(ctaButton.textContent).toContain('Connect With Us');
  });

  it('should render the Advantage link and trigger smooth scroll when element is in DOM', () => {
    const links = Array.from(
      fixture.nativeElement.querySelectorAll('.nav-link')
    ) as HTMLAnchorElement[];
    const advantageLink = links.find((l) => l.textContent?.trim() === 'Advantage');
    expect(advantageLink).toBeTruthy();
    expect(advantageLink?.getAttribute('href')).toContain('advantage');

    const fakeTarget = document.createElement('section');
    fakeTarget.id = 'advantage';
    fakeTarget.scrollIntoView = vi.fn();
    document.body.appendChild(fakeTarget);

    advantageLink?.click();
    expect(fakeTarget.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });

    document.body.removeChild(fakeTarget);
  });

  it('should only highlight Process when route is /process and NOT highlight Advantage simultaneously', () => {
    component.currentUrl.set('/process');
    fixture.detectChanges();

    const links = Array.from(
      fixture.nativeElement.querySelectorAll('.nav-link')
    ) as HTMLAnchorElement[];

    const activeLinks = links.filter((l) => l.classList.contains('is-active'));
    expect(activeLinks.length).toBe(1);
    expect(activeLinks[0].textContent?.trim()).toBe('Process');

    const advantageLink = links.find((l) => l.textContent?.trim() === 'Advantage');
    expect(advantageLink?.classList.contains('is-active')).toBe(false);
  });

  it('should only highlight Team when route is /team and NOT highlight Advantage simultaneously', () => {
    component.currentUrl.set('/team');
    fixture.detectChanges();

    const links = Array.from(
      fixture.nativeElement.querySelectorAll('.nav-link')
    ) as HTMLAnchorElement[];

    const activeLinks = links.filter((l) => l.classList.contains('is-active'));
    expect(activeLinks.length).toBe(1);
    expect(activeLinks[0].textContent?.trim()).toBe('Team');

    const advantageLink = links.find((l) => l.textContent?.trim() === 'Advantage');
    expect(advantageLink?.classList.contains('is-active')).toBe(false);
  });

  it('should only highlight Advantage on home route when activeSection is advantage', () => {
    component.currentUrl.set('/');
    component.activeSection.set(null);
    fixture.detectChanges();

    let links = Array.from(
      fixture.nativeElement.querySelectorAll('.nav-link')
    ) as HTMLAnchorElement[];
    let activeLinks = links.filter((l) => l.classList.contains('is-active'));
    expect(activeLinks.length).toBe(0);

    // Scroll into advantage
    component.activeSection.set('advantage');
    fixture.detectChanges();

    links = Array.from(fixture.nativeElement.querySelectorAll('.nav-link')) as HTMLAnchorElement[];
    activeLinks = links.filter((l) => l.classList.contains('is-active'));
    expect(activeLinks.length).toBe(1);
    expect(activeLinks[0].textContent?.trim()).toBe('Advantage');
  });
});
