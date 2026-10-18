import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RocketEasterEgg } from './rocket-easter-egg';

describe('RocketEasterEgg Component (Minimalist Geometric Vector Rocket & WebGL Particles)', () => {
  let fixture: ComponentFixture<RocketEasterEgg>;
  let component: RocketEasterEgg;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RocketEasterEgg]
    }).compileComponents();

    fixture = TestBed.createComponent(RocketEasterEgg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the easter egg component in idle state with zero DOM overhead', () => {
    expect(component).toBeTruthy();
    expect(component.isActive()).toBe(false);
    expect(component.isFlying()).toBe(false);
    expect(component.rocketVisible()).toBe(false);
  });

  it('should have zero visible buttons or UI clutter when idle', () => {
    const triggerBtn = fixture.nativeElement.querySelector('.easter-egg-trigger');
    expect(triggerBtn).toBeNull();
  });

  it('should not render the full screen flight stage when inactive', () => {
    const stage = fixture.nativeElement.querySelector('.rocket-flight-stage');
    expect(stage).toBeNull();
  });

  it('should evaluate isHomePage correctly', () => {
    expect(component.isHomePage()).toBe(true);
  });

  it('should not launch when reduced motion is preferred or slow connection exists', async () => {
    const originalConnection = (navigator as any).connection;
    try {
      Object.defineProperty(navigator, 'connection', {
        value: { effectiveType: '3g', saveData: false },
        configurable: true,
        writable: true
      });

      await component.launch();
      expect(component.isFlying()).toBe(false);
      expect(component.isActive()).toBe(false);
    } finally {
      Object.defineProperty(navigator, 'connection', {
        value: originalConnection,
        configurable: true,
        writable: true
      });
    }
  });
});
