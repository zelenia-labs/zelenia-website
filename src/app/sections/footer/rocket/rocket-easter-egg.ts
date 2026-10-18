import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RocketParticleEngine } from './rocket-particles';
import {
  hasBatteryConstraint,
  hasNetworkOrBatteryConstraint,
  hasReducedMotion
} from '../../starfield/starfield-power';

@Component({
  selector: 'app-rocket-easter-egg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Top-level Viewport Stage: Highest possible z-index, zero DOM overhead when idle -->
    @if (isActive()) {
      <div class="rocket-flight-stage" aria-hidden="true">
        <!-- Performance-focused WebGL Particle Canvas (Fire & Dual-Trench Smoke) -->
        <canvas #particleCanvas class="rocket-particle-canvas"></canvas>

        <!-- Minimalist & Geometric Aerospace Rocket with Supersonic Roaring Flame -->
        @if (rocketVisible()) {
          <div
            class="rocket-vehicle is-active"
            [style.transform]="rocketTransform()"
          >
            <svg
              viewBox="0 0 40 114"
              width="40"
              height="114"
              class="rocket-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <!-- Supersonic Outer Flame: High-luminosity glowing amber to orange -->
                <linearGradient id="rocketFlameOuter" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
                  <stop offset="18%" stop-color="#FACC15" stop-opacity="0.95" />
                  <stop offset="50%" stop-color="#FB923C" stop-opacity="0.9" />
                  <stop offset="80%" stop-color="#EA580C" stop-opacity="0.65" />
                  <stop offset="100%" stop-color="#C2410C" stop-opacity="0" />
                </linearGradient>

                <!-- Supersonic Core Flame: Incandescent plasma core -->
                <linearGradient id="rocketFlameCore" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
                  <stop offset="35%" stop-color="#FEF08A" stop-opacity="0.95" />
                  <stop offset="70%" stop-color="#F59E0B" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#D97706" stop-opacity="0" />
                </linearGradient>

                <!-- Optical Flame Glow Filter: Guarantees radiant contrast on both light and dark backgrounds -->
                <filter id="rocketFlameGlow" x="-60%" y="-20%" width="220%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- Left Geometric Fuselage Facet -->
              <polygon points="20,2 6,54 20,50" fill="#F8FAFC" />

              <!-- Right Geometric Fuselage Facet -->
              <polygon points="20,2 20,50 34,54" fill="#CBD5E1" />

              <!-- Central Structural Spine Hairline -->
              <line x1="20" y1="2" x2="20" y2="50" stroke="#94A3B8" stroke-width="0.8" />

              <!-- Left Geometric Delta Wing -->
              <polygon points="6,38 0,62 13,53" fill="#94A3B8" />

              <!-- Right Geometric Delta Wing -->
              <polygon points="34,38 40,62 27,53" fill="#64748B" />

              <!-- Minimalist Geometric Engine Nozzle -->
              <polygon points="15,50 25,50 27,60 13,60" fill="#0F172A" />

              <!-- Roaring Supersonic Flame Jet Spear with Shock Diamonds -->
              <g class="rocket-flame-spear" filter="url(#rocketFlameGlow)">
                <!-- Outer Flame Sheath -->
                <polygon points="13,60 27,60 20,106" fill="url(#rocketFlameOuter)" />
                <!-- Inner Incandescent Plasma Core -->
                <polygon points="15,60 25,60 20,90" fill="url(#rocketFlameCore)" />
                <!-- Supersonic Shock Diamond 1 -->
                <polygon points="20,68 22.5,72 20,76 17.5,72" fill="#FFFFFF" />
                <!-- Supersonic Shock Diamond 2 -->
                <polygon points="20,80 22,83.5 20,87 18,83.5" fill="#FEF08A" opacity="0.9" />
                <!-- Supersonic Shock Diamond 3 -->
                <polygon points="20,90 21.5,92.5 20,95 18.5,92.5" fill="#FDE047" opacity="0.75" />
              </g>
            </svg>
          </div>
        }
      </div>
    }
  `,
  styles: `
    :host {
      display: contents;
    }

    /* Fixed Viewport Overlay: Apex of the rendering stack */
    .rocket-flight-stage {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2147483647;
      overflow: hidden;
      contain: strict;
    }

    .rocket-particle-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
      z-index: 1;
    }

    /* Minimalist Geometric Rocket Vehicle */
    .rocket-vehicle {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 114px;
      pointer-events: none;
      will-change: transform;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.15s ease-out;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
    }

    .rocket-vehicle.is-active {
      opacity: 1;
    }

    .rocket-svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    /* High-frequency supersonic flame pulsation */
    @keyframes flameRoar {
      0%, 100% {
        transform: scaleY(1);
        opacity: 0.96;
      }
      50% {
        transform: scaleY(1.14) scaleX(0.92);
        opacity: 1;
      }
    }

    .rocket-flame-spear {
      transform-origin: 20px 60px;
      animation: flameRoar 0.05s infinite alternate ease-in-out;
    }
  `
})
export class RocketEasterEgg {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router, { optional: true });

  readonly particleCanvas = viewChild<ElementRef<HTMLCanvasElement>>('particleCanvas');

  // Reactive state signals
  readonly isActive = signal(false);
  readonly isFlying = signal(false);
  readonly rocketVisible = signal(false);
  readonly rocketTransform = signal('');

  // WebGL Particle Engine
  private readonly engine = new RocketParticleEngine();

  // Animation lifecycle
  private animFrameId: number | null = null;
  private startTime = 0;
  private viewportW = 1920;
  private viewportH = 1080;
  private pixelRatio = 1;

  // Trajectory state
  private launchX = 0;
  private launchY = 0;
  private targetDrift = 0;
  private currentRocketX = 0;
  private currentRocketY = 0;
  private currentHeadingDeg = 0;
  private totalFlightDuration = 2.6;

  // Auto-trigger sentinel flag
  private hasAutoTriggered = false;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.initAutoTriggerOnScroll();
    });

    if (this.router) {
      const routerSub = this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event) => {
          const cleanPath = (event.urlAfterRedirects || event.url).split('?')[0].split('#')[0];
          const isHome = cleanPath === '' || cleanPath === '/';
          if (!isHome && (this.isFlying() || this.isActive())) {
            this.teardownAnimation();
          }
          if (isHome) {
            this.hasAutoTriggered = false;
          }
        });

      this.destroyRef.onDestroy(() => {
        routerSub.unsubscribe();
      });
    }

    this.destroyRef.onDestroy(() => {
      this.teardownAnimation();
      this.engine.cleanup();
    });
  }

  /**
   * Returns true only when currently viewing the homepage.
   */
  isHomePage(): boolean {
    if (!this.router) return true;
    const cleanPath = (this.router.url || '').split('?')[0].split('#')[0];
    return cleanPath === '' || cleanPath === '/';
  }

  private async hasEnvironmentalConstraint(): Promise<boolean> {
    if (typeof window === 'undefined') return true;
    if (hasReducedMotion() || hasNetworkOrBatteryConstraint()) return true;
    return await hasBatteryConstraint();
  }

  /**
   * Lightweight scroll listener: Triggers consistent rocket launch upon reaching bottom of page.
   */
  private async initAutoTriggerOnScroll(): Promise<void> {
    if (typeof window === 'undefined') return;

    if (await this.hasEnvironmentalConstraint()) {
      return;
    }

    const onScroll = () => {
      if (!this.isHomePage()) return;
      if (this.isFlying()) return;

      const currentY = window.scrollY || window.pageYOffset;

      // Re-arm trigger if user scrolls back up near the top
      if (currentY < 150) {
        this.hasAutoTriggered = false;
        return;
      }

      if (this.hasAutoTriggered) return;

      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = scrollHeight - (currentY + innerHeight);

      // Trigger consistently when reaching the footer boundary on the homepage
      if (distanceFromBottom <= 48) {
        this.hasAutoTriggered = true;
        this.launch();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
    });
  }

  /**
   * Launches rocket with cinematic aerospace flight dynamics.
   */
  async launch(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || this.isFlying() || !this.isHomePage()) return;
    if (await this.hasEnvironmentalConstraint()) return;

    this.hasAutoTriggered = true;
    this.viewportW = window.innerWidth;
    this.viewportH = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    // Anchor on bottom-left (22% of viewport width)
    this.launchX = Math.round(this.viewportW * (this.viewportW > 768 ? 0.22 : 0.25));
    this.launchY = this.viewportH - 6;

    // Organic top exit range across central 50% of viewport width [25% to 75%]
    const exitRatio = 0.25 + Math.random() * 0.50;
    const targetExitX = Math.round(this.viewportW * exitRatio);
    this.targetDrift = targetExitX - this.launchX;

    this.currentRocketX = this.launchX;
    this.currentRocketY = this.launchY;
    this.currentHeadingDeg = 0;

    this.updateRocketDOMTransform();

    this.engine.clear();
    this.isActive.set(true);
    this.isFlying.set(true);
    this.rocketVisible.set(true);

    requestAnimationFrame(() => {
      const canvasRef = this.particleCanvas();
      if (canvasRef) {
        this.engine.init(canvasRef.nativeElement, this.viewportW, this.viewportH, this.pixelRatio);
      }
      this.startTime = performance.now();
      if (this.animFrameId === null) {
        this.runAnimationLoop();
      }
    });
  }

  private runAnimationLoop(): void {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const elapsed = (now - this.startTime) / 1000;
      this.updateRocket(elapsed, dt);

      this.engine.update(dt);
      this.engine.render(this.viewportW, this.viewportH, this.pixelRatio);

      // Clean termination: Rocket exited screen and all clouds/fire fully dissipated
      if (!this.rocketVisible() && this.engine.particleCount === 0) {
        this.completeSequence();
        return;
      }

      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  private updateRocket(elapsed: number, dt: number): void {
    const progress = Math.min(elapsed / this.totalFlightDuration, 1.25);

    // Natural aerospace acceleration curve
    const verticalCurve = 0.35 * progress + 0.65 * Math.pow(progress, 1.8);
    const verticalDistance = (this.viewportH + 220) * verticalCurve;
    const nextY = this.launchY - verticalDistance;

    // Graceful elliptical arc curving towards the dynamically calculated central exit point
    const nextX = this.launchX + this.targetDrift * Math.sin(Math.pow(progress, 1.35) * Math.PI * 0.5);

    // Compute tangent heading from velocity vector
    const dx = nextX - this.currentRocketX;
    const dy = nextY - this.currentRocketY;

    if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
      const targetAngleRad = Math.atan2(dy, dx) + Math.PI / 2;
      const targetAngleDeg = (targetAngleRad * 180) / Math.PI;
      this.currentHeadingDeg += (targetAngleDeg - this.currentHeadingDeg) * 0.35;
    }

    this.currentRocketX = nextX;
    this.currentRocketY = nextY;

    // Aerodynamic elongation proportional to ascent velocity
    const currentSpeed = Math.sqrt(dx * dx + dy * dy) / Math.max(0.001, dt);
    const stretch = Math.min(0.18, currentSpeed / 2400);
    const scaleY = 1.0 + stretch;
    const scaleX = 1.0 - stretch * 0.35;

    // Boundary check: When rocket leaves top or right edge of viewport
    if (this.currentRocketY < -120 || this.currentRocketX > this.viewportW + 120) {
      if (this.rocketVisible()) {
        this.rocketVisible.set(false);
      }
    } else {
      if (elapsed < 0.55) {
        this.engine.emitLiftoffPadExplosion(this.launchX, this.launchY, dt, elapsed);
      }
      this.engine.emitFlightPlume(this.currentRocketX, this.currentRocketY, this.currentHeadingDeg, dt, progress);
      this.updateRocketDOMTransform(scaleX, scaleY);
    }
  }

  private updateRocketDOMTransform(scaleX = 1.0, scaleY = 1.0): void {
    const transformStr = `translate3d(${this.currentRocketX.toFixed(1)}px, ${this.currentRocketY.toFixed(1)}px, 0) translate(-50%, -52.6%) rotate(${this.currentHeadingDeg.toFixed(1)}deg) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;
    this.rocketTransform.set(transformStr);
  }

  private completeSequence(): void {
    this.teardownAnimation();
    this.engine.cleanup();
    this.isActive.set(false);
    this.isFlying.set(false);
    this.rocketVisible.set(false);
  }

  private teardownAnimation(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }
}
