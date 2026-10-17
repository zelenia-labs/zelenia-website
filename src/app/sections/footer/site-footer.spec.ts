import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteFooter } from './site-footer';

describe('SiteFooter Component (Minimalist & Spectacular Parallax)', () => {
  let fixture: ComponentFixture<SiteFooter>;
  let component: SiteFooter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteFooter],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SiteFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the footer component', () => {
    expect(component).toBeTruthy();
    const footerEl = fixture.nativeElement.querySelector('.site-footer');
    expect(footerEl).toBeTruthy();
  });

  it('should NOT render the email address', () => {
    const footerText = fixture.nativeElement.textContent;
    expect(footerText).not.toContain('hello@zelenia.com');
  });

  it('should render contact and linkedin as design system buttons on the left', () => {
    const contactBtn = fixture.nativeElement.querySelector('.footer-cta-btn');
    const linkedinBtn = fixture.nativeElement.querySelector('.footer-linkedin-btn');

    expect(contactBtn).toBeTruthy();
    expect(contactBtn.classList.contains('btn')).toBe(true);
    expect(contactBtn.classList.contains('btn--primary')).toBe(true);
    expect(contactBtn.textContent).toContain('Start a conversation');
    expect(contactBtn.getAttribute('routerlink') || contactBtn.getAttribute('href')).toBe('/contact');

    expect(linkedinBtn).toBeTruthy();
    expect(linkedinBtn.classList.contains('btn')).toBe(true);
    expect(linkedinBtn.classList.contains('btn--secondary')).toBe(true);
    expect(linkedinBtn.textContent).toContain('LinkedIn');
    expect(linkedinBtn.getAttribute('href')).toContain('linkedin.com');
  });

  it('should only render Company group on the right', () => {
    const titles = fixture.nativeElement.querySelectorAll('.footer-col__title');
    expect(titles.length).toBe(1);
    expect(titles[0].textContent.trim()).toBe('Company');

    const companyLinks = fixture.nativeElement.querySelectorAll('.footer-right-col .footer-link');
    expect(companyLinks.length).toBe(2);

    const linkUrls = Array.from(companyLinks).map(
      (a) => (a as Element).getAttribute('routerlink') || (a as Element).getAttribute('href')
    );
    expect(linkUrls).toContain('/about');
    expect(linkUrls).toContain('/process');
  });

  it('should NOT render the bottom right status dot or wording', () => {
    const statusPill = fixture.nativeElement.querySelector('.footer-status-pill');
    const statusDot = fixture.nativeElement.querySelector('.status-dot');
    expect(statusPill).toBeNull();
    expect(statusDot).toBeNull();
  });

  it('should render the architectural parallax watermark', () => {
    const watermarkEl = fixture.nativeElement.querySelector('.footer-watermark');
    expect(watermarkEl).toBeTruthy();
    expect(watermarkEl.textContent.trim()).toBe('ZELENIA');
  });

  it('should display the dynamic current copyright year', () => {
    const copyrightEl = fixture.nativeElement.querySelector('.footer-copyright');
    expect(copyrightEl).toBeTruthy();
    expect(copyrightEl.textContent).toContain(new Date().getFullYear().toString());
  });
});
