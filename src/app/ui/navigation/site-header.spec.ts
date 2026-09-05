import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteHeader } from './site-header';
import { StudioContent } from '../../content/studio-content';

describe('SiteHeader Component', () => {
  let fixture: ComponentFixture<SiteHeader>;
  let component: SiteHeader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [StudioContent]
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
    expect(ctaButton.textContent).toContain('Book a Review');
  });
});
