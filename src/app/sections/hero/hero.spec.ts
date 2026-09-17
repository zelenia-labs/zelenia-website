import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Hero } from './hero';
import { WebsiteContent } from '../../content/website-content';

describe('Hero Component (Clean Editorial Presentation)', () => {
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

  it('should initialize the clean hero component', () => {
    expect(component).toBeTruthy();
    const heroEl = fixture.nativeElement.querySelector('#hero');
    expect(heroEl).toBeTruthy();
  });

  it('should render the primary studio headline', () => {
    const titleEl = fixture.nativeElement.querySelector('.hero-title');
    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent).toContain('High-performance web experiences.');
    expect(titleEl.textContent).toContain('Executed directly by the founders.');
  });

  it('should render exactly one primary CTA button to scope a project', () => {
    const ctaBtns = fixture.nativeElement.querySelectorAll('.btn--hero-cta');
    expect(ctaBtns.length).toBe(1);
    expect(ctaBtns[0].textContent).toContain('Scope Your Project');
  });

  it('should render the founder verification lockup linking to the team page', () => {
    const lockupEl = fixture.nativeElement.querySelector('.hero-founders-lockup');
    expect(lockupEl).toBeTruthy();
    expect(lockupEl.getAttribute('routerlink') || lockupEl.getAttribute('href')).toBe('/team');

    const namesEl = lockupEl.querySelector('.founders-names');
    const credsEl = lockupEl.querySelector('.founders-credentials');
    expect(namesEl).toBeTruthy();
    expect(namesEl.textContent).toContain('Alejandro Cuba Ruiz & Yolanda Santa Cruz');
    expect(credsEl).toBeTruthy();
    expect(credsEl.textContent).toContain('Google Developer Expert & Lead Product Designer');
  });

  it('should render the secondary action in link mode to calculate scope and timeline', () => {
    const secondaryLink = fixture.nativeElement.querySelector('.hero-secondary-link');
    expect(secondaryLink).toBeTruthy();
    expect(secondaryLink.textContent).toContain('Calculate Scope & Timeline');
  });
});
