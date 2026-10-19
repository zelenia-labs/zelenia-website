import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteFooter } from './site-footer';

describe('SiteFooter Component', () => {
  let fixture: ComponentFixture<SiteFooter>;
  let component: SiteFooter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteFooter]
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

  it('should render the full-width side-to-side divider line', () => {
    const dividerEl = fixture.nativeElement.querySelector('.footer-divider-line');
    expect(dividerEl).toBeTruthy();
  });

  it('should render LinkedIn and GitHub social profile links', () => {
    const socialLinks = fixture.nativeElement.querySelectorAll('.footer-social-link');
    expect(socialLinks.length).toBe(2);

    const hrefs = Array.from(socialLinks).map((a) => (a as Element).getAttribute('href'));
    expect(hrefs.some((h) => h?.includes('linkedin.com'))).toBe(true);
    expect(hrefs.some((h) => h?.includes('github.com'))).toBe(true);

    const labels = Array.from(socialLinks).map((a) => (a as Element).textContent?.trim());
    expect(labels).toContain('LinkedIn');
    expect(labels).toContain('GitHub');
  });

  it('should display the dynamic current copyright year with left-aligned copy', () => {
    const copyrightEl = fixture.nativeElement.querySelector('.footer-copyright');
    expect(copyrightEl).toBeTruthy();
    expect(copyrightEl.textContent).toContain(new Date().getFullYear().toString());
    expect(copyrightEl.textContent).toContain(
      'High-performance front-end & product design.'
    );
  });
});
