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
    expect(titleEl.textContent).toContain('online presence');
  });

  it('should render the primary pill CTA button linking to contact', () => {
    const ctaBtn = fixture.nativeElement.querySelector('.btn--pill-hero');
    expect(ctaBtn).toBeTruthy();
    expect(ctaBtn.textContent).toContain('Get in touch');
    expect(ctaBtn.getAttribute('routerlink') || ctaBtn.getAttribute('href')).toBe('/contact');
  });

  it('should render the 3 bottom metric tiers', () => {
    const metricsEl = fixture.nativeElement.querySelector('.hero-metrics-bar');
    expect(metricsEl).toBeTruthy();
    expect(metricsEl.textContent).toContain('Technical SEO & Speed');
    expect(metricsEl.textContent).toContain('Fractional Partnership');
    expect(metricsEl.textContent).toContain('Direct Collaboration');
  });

  it('should render the background video and textured atmospheric overlays', () => {
    const videoEl = fixture.nativeElement.querySelector('.hero-video');
    expect(videoEl).toBeTruthy();
    expect(videoEl.getAttribute('autoplay')).not.toBeNull();
    expect(videoEl.getAttribute('poster')).toBe('/assets/images/hero-workspace-bg.jpg');

    const sourceEl = videoEl.querySelector('source');
    expect(sourceEl).toBeTruthy();
    expect(sourceEl.getAttribute('src')).toBe('/hero-video.mp4');

    expect(fixture.nativeElement.querySelector('.hero-layer-blur')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.hero-fill-warm')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.hero-fill-charcoal')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.hero-fill-teal')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.hero-effect-noise')).toBeTruthy();
  });
});
