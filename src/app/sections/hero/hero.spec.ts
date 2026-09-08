import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Hero } from './hero';
import { StudioContent } from '../../content/studio-content';

describe('Hero Component (Clean Editorial Presentation)', () => {
  let fixture: ComponentFixture<Hero>;
  let component: Hero;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [StudioContent, provideRouter([])]
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
    expect(titleEl.textContent).toContain('Production frontend engineering');
    expect(titleEl.textContent).toContain('Executed directly by the founders.');
  });

  it('should render exactly one primary CTA button to scope a project', () => {
    const ctaBtns = fixture.nativeElement.querySelectorAll('.btn--hero-cta');
    expect(ctaBtns.length).toBe(1);
    expect(ctaBtns[0].textContent).toContain('Scope Your Project');
  });

  it('should render the studio credentials proof bar', () => {
    const proofBar = fixture.nativeElement.querySelector('.hero-proof-bar');
    expect(proofBar).toBeTruthy();
    expect(proofBar.textContent).toContain('20+ years');
    expect(proofBar.textContent).toContain('Fortune 100 track record');
    expect(proofBar.textContent).toContain('Capped at 2 concurrent client sprints');
  });
});
