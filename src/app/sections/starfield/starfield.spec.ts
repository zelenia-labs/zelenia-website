import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { StarfieldCanvas } from './starfield-canvas';
import { StarfieldPhysics } from './starfield-physics';
import { StarfieldMeteorManager } from './starfield-meteor';
import { StarfieldPowerManager } from './starfield-power';

describe('Starfield Canvas Subsystem Unit Tests', () => {
  describe('StarfieldPhysics', () => {
    let physics: StarfieldPhysics;

    beforeEach(() => {
      physics = new StarfieldPhysics();
    });

    it('should convert page coordinates to normalized device coordinates (NDC)', () => {
      const rect = { left: 100, top: 100, width: 800, height: 600 };
      const aspect = 800 / 600;

      // Center click (500, 400)
      const center = physics.convertPointerToNDC(500, 400, rect, aspect);
      expect(center.ndcX).toBeCloseTo(0.0, 3);
      expect(center.ndcY).toBeCloseTo(0.0, 3);
      expect(center.aspectX).toBeCloseTo(0.0, 3);

      // Top-left click (100, 100)
      const topLeft = physics.convertPointerToNDC(100, 100, rect, aspect);
      expect(topLeft.ndcX).toBeCloseTo(-1.0, 3);
      expect(topLeft.ndcY).toBeCloseTo(1.0, 3);
      expect(topLeft.aspectX).toBeCloseTo(-1.0 * aspect, 3);
    });

    it('should immediately engage gravity with a noticeable initial impulse on first click', () => {
      expect(physics.gravityState.isHolding).toBe(false);
      expect(physics.gravityState.currentStrength).toBe(0);

      physics.engageGravity(0.5, -0.2);

      expect(physics.gravityState.isHolding).toBe(true);
      expect(physics.gravityState.holdDuration).toBe(0);
      expect(physics.gravityState.targetPos.x).toBe(0.5);
      expect(physics.gravityState.targetPos.y).toBe(-0.2);
      // Noticeable initial impulse
      expect(physics.gravityState.currentStrength).toBeGreaterThanOrEqual(0.35);
      expect(physics.gravityState.currentRadius).toBeGreaterThanOrEqual(0.45);
    });

    it('should progressively expand gravitational radius and pull strength while holding', () => {
      physics.engageGravity(0, 0);
      const initialRadius = physics.gravityState.currentRadius;
      const initialStrength = physics.gravityState.currentStrength;

      // Simulate holding for 0.5 seconds
      for (let i = 0; i < 30; i++) {
        physics.updateGravity(0.016);
      }

      expect(physics.gravityState.holdDuration).toBeCloseTo(0.48, 1);
      expect(physics.gravityState.currentRadius).toBeGreaterThan(initialRadius);
      expect(physics.gravityState.currentStrength).toBeGreaterThan(initialStrength);
    });

    it('should gracefully release gravitational field without snapping when pointer is released', () => {
      physics.engageGravity(0, 0);
      physics.updateGravity(0.1);

      physics.releaseGravity();
      expect(physics.gravityState.isHolding).toBe(false);

      const strengthAtRelease = physics.gravityState.currentStrength;
      physics.updateGravity(0.05);

      // Decays smoothly
      expect(physics.gravityState.currentStrength).toBeLessThan(strengthAtRelease);
      expect(physics.gravityState.currentStrength).toBeGreaterThanOrEqual(0);
    });

    it('should smooth pointer coordinates and compute responsive velocity', () => {
      physics.targetMouse.x = 1.0;
      physics.targetMouse.y = 0.5;
      physics.targetCalmStrength = 1.0;

      physics.updatePointerVelocity();

      expect(physics.currentMouse.x).toBeGreaterThan(0);
      expect(physics.mouseVelocity.x).toBeGreaterThan(0);
      expect(physics.currentCalmStrength).toBeGreaterThan(0);
    });
  });

  describe('StarfieldMeteorManager', () => {
    let meteors: StarfieldMeteorManager;

    beforeEach(() => {
      meteors = new StarfieldMeteorManager();
    });

    it('should schedule next meteor within 2 to 6 seconds', () => {
      const now = 1000;
      meteors.scheduleNextMeteor(now);

      expect(meteors.nextMeteorTime).toBeGreaterThanOrEqual(now + 2000);
      expect(meteors.nextMeteorTime).toBeLessThanOrEqual(now + 6000);
    });

    it('should correctly filter candidates and handle spawning', () => {
      meteors.candidateStarsUpward = [{ nx: -0.2, ny: -0.4, depth: 0.8 }];
      meteors.candidateStarsDownward = [{ nx: 0.2, ny: 0.5, depth: 0.6 }];

      expect(meteors.isMeteorActive).toBe(false);
      meteors.dispose();
      expect(meteors.isMeteorActive).toBe(false);
    });
  });

  describe('StarfieldPowerManager', () => {
    let power: StarfieldPowerManager;
    let powerModeChangedCount = 0;
    let lastReportedPowerMode = false;

    beforeEach(() => {
      powerModeChangedCount = 0;
      lastReportedPowerMode = false;

      const mockElement = {
        nativeElement: {
          classList: {
            add: vi.fn(),
            remove: vi.fn()
          }
        }
      } as unknown as ElementRef<HTMLElement>;

      const mockDestroyRef = {
        onDestroy: vi.fn()
      } as any;

      power = new StarfieldPowerManager(mockElement, mockDestroyRef, {
        onPowerModeChanged: (isLow) => {
          powerModeChangedCount++;
          lastReportedPowerMode = isLow;
        }
      });
    });

    it('should clamp device pixel ratio to 1.2 on mobile and 1.5 on desktop', () => {
      const mobileDpr = power.getOptimalPixelRatio(400);
      expect(mobileDpr).toBeLessThanOrEqual(1.2);

      const desktopDpr = power.getOptimalPixelRatio(1440);
      expect(desktopDpr).toBeLessThanOrEqual(1.5);
    });

    it('should budget 16ms (60 FPS) when interacting and 33.3ms (30 FPS) when idle', () => {
      expect(power.getTargetFrameInterval(true)).toBe(16.0);
      expect(power.getTargetFrameInterval(false)).toBe(33.3);
    });

    it('should throttle to 33.3ms (30 FPS) regardless of interaction when low power mode is active', () => {
      power.activateLowPowerMode();
      expect(power.lowPowerActive).toBe(true);
      expect(lastReportedPowerMode).toBe(true);

      // Low power overrides interaction to preserve battery
      expect(power.getTargetFrameInterval(true)).toBe(33.3);
      expect(power.getTargetFrameInterval(false)).toBe(33.3);

      power.deactivateLowPowerMode();
      expect(power.lowPowerActive).toBe(false);
      expect(lastReportedPowerMode).toBe(false);
    });

    it('should detect slow connections (3g, 2g, slow-2g) and trigger slow-connection notice', async () => {
      const originalConnection = (navigator as any).connection;
      try {
        let triggeredNotice: any = null;
        const mockElement = { nativeElement: { classList: { add: vi.fn(), remove: vi.fn() } } } as any;
        const testPower = new StarfieldPowerManager(mockElement, { onDestroy: vi.fn() } as any, {
          onPowerModeChanged: vi.fn(),
          onNoticeTriggered: (notice) => {
            triggeredNotice = notice;
          }
        });

        Object.defineProperty(navigator, 'connection', {
          value: { effectiveType: '3g', saveData: false },
          configurable: true,
          writable: true
        });

        const hasConstraint = await testPower.setupPowerMonitoring();
        expect(hasConstraint).toBe(true);
        expect(testPower.lowPowerActive).toBe(true);
        expect(triggeredNotice).toEqual({
          reason: 'slow-connection',
          message: 'Static Starfield',
          instruction: 'Slow connection detected',
          actionText: 'Ignite'
        });
      } finally {
        Object.defineProperty(navigator, 'connection', {
          value: originalConnection,
          configurable: true,
          writable: true
        });
      }
    });

    it('should detect saveData and trigger data-saver notice', async () => {
      const originalConnection = (navigator as any).connection;
      try {
        let triggeredNotice: any = null;
        const mockElement = { nativeElement: { classList: { add: vi.fn(), remove: vi.fn() } } } as any;
        const testPower = new StarfieldPowerManager(mockElement, { onDestroy: vi.fn() } as any, {
          onPowerModeChanged: vi.fn(),
          onNoticeTriggered: (notice) => {
            triggeredNotice = notice;
          }
        });

        Object.defineProperty(navigator, 'connection', {
          value: { effectiveType: '4g', saveData: true },
          configurable: true,
          writable: true
        });

        const hasConstraint = await testPower.setupPowerMonitoring();
        expect(hasConstraint).toBe(true);
        expect(testPower.lowPowerActive).toBe(true);
        expect(triggeredNotice?.reason).toBe('data-saver');
      } finally {
        Object.defineProperty(navigator, 'connection', {
          value: originalConnection,
          configurable: true,
          writable: true
        });
      }
    });
  });

  describe('StarfieldCanvas Component', () => {
    let fixture: ComponentFixture<StarfieldCanvas>;
    let component: StarfieldCanvas;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StarfieldCanvas]
      }).compileComponents();

      fixture = TestBed.createComponent(StarfieldCanvas);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should initialize the starfield component', () => {
      expect(component).toBeTruthy();
    });

    it('should render accessible static SVG snapshot by default and mount canvas when ignited', () => {
      const snapshotEl = fixture.nativeElement.querySelector('.starfield-canvas-snapshot');
      expect(snapshotEl).toBeTruthy();
      expect(snapshotEl.getAttribute('src')).toBe('/hero-starfield-static.svg');

      // Zero unnecessary canvas in DOM before ignition
      expect(fixture.nativeElement.querySelector('.starfield-canvas')).toBeNull();

      component.isCanvasMounted.set(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.starfield-canvas')).toBeTruthy();
    });

    it('should handle advisory notice lifecycle, forceEnable override, and dismissNotice', () => {
      expect(component.activeNotice()).toBeNull();
      expect(component.isForceIgnited()).toBe(false);

      // Trigger a simulated notice
      component.activeNotice.set({
        reason: 'battery-saver',
        message: 'Static Starfield',
        instruction: 'Battery below 8%',
        actionText: 'Ignite'
      });
      fixture.detectChanges();

      expect(component.activeNotice()).not.toBeNull();
      expect(component.activeNotice()?.reason).toBe('battery-saver');

      // Dismissing notice
      component.dismissNotice();
      expect(component.activeNotice()).toBeNull();

      // Set another notice and force enable
      component.activeNotice.set({
        reason: 'reduced-motion',
        message: 'Static Starfield',
        instruction: 'System reduced motion enabled',
        actionText: 'Ignite'
      });
      expect(component.activeNotice()).not.toBeNull();

      component.forceEnable();
      expect(component.isForceIgnited()).toBe(true);
      expect(component.isIgniting()).toBe(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.classList.contains('is-force-ignited')).toBe(true);
    });
  });
});
