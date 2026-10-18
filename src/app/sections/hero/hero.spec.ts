import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Hero } from './hero';
import { WebsiteContent } from '../../content/website-content';

describe('Hero Component (Design Mockup Alignment)', () => {
  let fixture: ComponentFixture<Hero>;
  let component: Hero;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [WebsiteContent, provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the hero component', () => {
    expect(component).toBeTruthy();
    const heroEl = fixture.nativeElement.querySelector('#hero');
    expect(heroEl).toBeTruthy();
  });

  it('should render the studio headline from design.svg', () => {
    const titleEl = fixture.nativeElement.querySelector('.hero-title');
    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent).toContain('Improve your');
    expect(titleEl.textContent).toContain('website');
  });

  it('should render the primary pill CTA button linking to contact', () => {
    const ctaBtn = fixture.nativeElement.querySelector('.btn--pill-hero');
    expect(ctaBtn).toBeTruthy();
    expect(ctaBtn.textContent).toContain('Start your website project');
    expect(ctaBtn.getAttribute('routerlink') || ctaBtn.getAttribute('href')).toBe('/contact');
  });

  it('should render the trust banner with the 3 core standard pillars', () => {
    const ribbonEl = fixture.nativeElement.querySelector('.hero-trust-ribbon');
    expect(ribbonEl).toBeTruthy();
    const metricsEl = fixture.nativeElement.querySelector('.hero-metrics-bar');
    expect(metricsEl).toBeTruthy();
    expect(metricsEl.textContent).toContain('Sub-Second Speed');
    expect(metricsEl.textContent).toContain('Senior Density');
    expect(metricsEl.textContent).toContain('Direct Execution');
  });

  it('should render the interactive hero canvas host', () => {
    expect(fixture.nativeElement.querySelector('app-hero-canvas')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.hero-video')).toBeNull();
  });
});
