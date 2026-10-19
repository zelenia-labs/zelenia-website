import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Hero } from './hero';
import { WebsiteContent } from '../../content/website-content';

import { By } from '@angular/platform-browser';
import { StarfieldCanvas } from '../starfield';

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
    expect(titleEl.textContent).toContain('Speed up');
    expect(titleEl.textContent).toContain('your website');
  });

  it('should render the primary pill CTA button linking to contact', () => {
    const ctaBtn = fixture.nativeElement.querySelector('.btn--pill-hero');
    expect(ctaBtn).toBeTruthy();
    expect(ctaBtn.textContent).toContain('Get a project estimate');
    expect(ctaBtn.getAttribute('routerlink') || ctaBtn.getAttribute('href')).toBe('/contact');
  });

  it('should render the trust banner with the 3 core standard pillars', () => {
    const ribbonEl = fixture.nativeElement.querySelector('.hero-trust-ribbon');
    expect(ribbonEl).toBeTruthy();
    const metricsEl = fixture.nativeElement.querySelector('.hero-metrics-bar');
    expect(metricsEl).toBeTruthy();
    expect(metricsEl.textContent.toLowerCase()).toContain('sub-second loading speed');
    expect(metricsEl.textContent).toContain('Direct communication');
  });

  it('should render the interactive starfield canvas host', () => {
    expect(fixture.nativeElement.querySelector('app-starfield-canvas')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.hero-video')).toBeNull();
  });

  it('should render starfield advisory banner when activeNotice is set and trigger forceEnable', () => {
    const starfieldEl = fixture.debugElement.query(By.directive(StarfieldCanvas));
    const starfield = starfieldEl.componentInstance as StarfieldCanvas;

    expect(fixture.nativeElement.querySelector('.hero-starfield-advisory')).toBeNull();

    starfield.activeNotice.set({
      reason: 'reduced-motion',
      message: 'Static Starfield',
      instruction: 'System reduced motion enabled',
      actionText: 'Ignite'
    });
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('.hero-starfield-advisory');
    expect(banner).toBeTruthy();
    expect(banner.textContent).toContain('Static Starfield');
    expect(banner.textContent).toContain('System reduced motion enabled');
    expect(banner.textContent).toContain('Ignite');

    const actionBtn = banner.querySelector('.advisory-action-btn') as HTMLButtonElement;
    actionBtn.click();
    fixture.detectChanges();

    expect(starfield.isForceIgnited()).toBe(true);
    expect(starfield.isIgniting()).toBe(true);
    expect(banner.querySelector('.advisory-spinner-container')).toBeTruthy();
  });
});
