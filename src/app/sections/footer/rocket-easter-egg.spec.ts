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
});
