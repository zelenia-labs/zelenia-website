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

  it('should render the primary CTA button to scope and timeline', () => {
    const ctaBtn = fixture.nativeElement.querySelector('.btn--hero-cta');
    expect(ctaBtn).toBeTruthy();
    expect(ctaBtn.textContent).toContain('Scope & Timeline');
    expect(ctaBtn.getAttribute('routerlink') || ctaBtn.getAttribute('href')).toBe('/process');
  });

  it('should render the secondary CTA button to start a conversation', () => {
    const secondaryBtn = fixture.nativeElement.querySelector('.btn--secondary');
    expect(secondaryBtn).toBeTruthy();
    expect(secondaryBtn.textContent).toContain('Start Conversation');
    expect(secondaryBtn.getAttribute('routerlink') || secondaryBtn.getAttribute('href')).toBe(
      '/contact'
    );
  });
});
