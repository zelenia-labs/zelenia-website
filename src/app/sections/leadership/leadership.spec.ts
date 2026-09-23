import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Leadership } from './leadership';

describe('Leadership Component (Meet the Founders CTA)', () => {
  let fixture: ComponentFixture<Leadership>;
  let component: Leadership;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leadership],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Leadership);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the leadership component', () => {
    expect(component).toBeTruthy();
    const sectionEl = fixture.nativeElement.querySelector('#founders');
    expect(sectionEl).toBeTruthy();
  });

  it('should render both founder profile cards with authentic photos', () => {
    const cards = fixture.nativeElement.querySelectorAll('.founder-card');
    expect(cards.length).toBe(2);

    const yolandaImg = fixture.nativeElement.querySelector(
      'img[src="/assets/images/portrait_yolanda.jpg"]'
    );
    const alejandroImg = fixture.nativeElement.querySelector(
      'img[src="/assets/images/portrait_alejandro.jpg"]'
    );
    expect(yolandaImg).toBeTruthy();
    expect(alejandroImg).toBeTruthy();
  });

  it('should render the "Learn More About Us" CTA linking to /team', () => {
    const ctaBtn = fixture.nativeElement.querySelector('.founders-cta-btn');
    expect(ctaBtn).toBeTruthy();
    expect(ctaBtn.textContent.trim()).toBe('Learn More About Us');
    expect(ctaBtn.getAttribute('routerlink') || ctaBtn.getAttribute('href')).toBe('/team');
  });
});
