import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StarfieldNotice } from './starfield.types';
import { StarfieldPowerManager } from './starfield-power';

@Component({
  selector: 'app-starfield-canvas, app-hero-canvas',
  host: {
    '[class.is-force-ignited]': 'isForceIgnited()'
  },
  template: `
    @if (isCanvasMounted()) {
      <canvas
        #canvas
        class="starfield-canvas"
        aria-hidden="true"
      ></canvas>
    }
    <img
      src="/hero-starfield-static.svg"
      alt=""
      class="starfield-canvas-snapshot"
      aria-hidden="true"
      loading="lazy"
      decoding="async"
    />
  `
})
export class StarfieldCanvas {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  // Reactive Advisory Notice & Force Override State
  readonly activeNotice = signal<StarfieldNotice | null>(null);
  readonly isForceIgnited = signal<boolean>(false);
  readonly isCanvasMounted = signal<boolean>(false);
  readonly isIgniting = signal<boolean>(false);

  // Power & Network Governor (only module loaded on initial assessment)
  private readonly power = new StarfieldPowerManager(this.elementRef, this.destroyRef, {
    onPowerModeChanged: () => {
      // Power mode throttles target frame budget via getTargetFrameInterval()
    },
    onNoticeTriggered: (notice) => {
      if (!this.isForceIgnited()) {
        this.activeNotice.set(notice);
      }
    },
    onNoticeCleared: (reason) => {
      if (this.activeNotice()?.reason === reason) {
        this.activeNotice.set(null);
      }
      if (!this.runtime?.isInitialized && !this.power.lowPowerActive) {
        const motionQuery =
          typeof window !== 'undefined' && typeof window.matchMedia === 'function'
            ? window.matchMedia('(prefers-reduced-motion: reduce)')
            : null;
        if (!motionQuery?.matches) {
          this.scheduleInitThree();
        }
      }
    }
  });

  // Dynamic Three.js WebGL Runtime (deferred until ignition or fast-network readiness)
  private runtime?: import('./starfield-runtime').StarfieldRuntime;
  private isInitializing = false;

  constructor() {
    afterNextRender(async () => {
      if (!this.isBrowser || typeof window === 'undefined') return;

      const hasConstraint = await this.power.setupPowerMonitoring();

      const motionQuery =
        typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-reduced-motion: reduce)')
          : null;

      if (motionQuery?.matches) {
        if (!this.isForceIgnited()) {
          this.activeNotice.set({
            reason: 'reduced-motion',
            message: 'Static Starfield',
            instruction: 'System reduced motion enabled',
            actionText: 'Ignite'
          });
        }

        motionQuery.addEventListener(
          'change',
          (e: MediaQueryListEvent) => {
            if (!e.matches) {
              if (this.activeNotice()?.reason === 'reduced-motion') {
                this.activeNotice.set(null);
              }
              if (!this.power.lowPowerActive && !this.runtime?.isInitialized) {
                this.scheduleInitThree();
              }
            }
          },
          { once: true }
        );
      }

      // DO NOT mount canvas or download Three.js if constraint is detected!
      if ((motionQuery?.matches || hasConstraint || this.activeNotice()) && !this.isForceIgnited()) {
        return;
      }

      this.scheduleInitThree();

      if (motionQuery) {
        const onMotionReduce = (e: MediaQueryListEvent) => {
          if (this.isForceIgnited()) return;
          if (e.matches) {
            this.cleanup();
          } else if (!this.power.lowPowerActive && !this.runtime?.isInitialized) {
            this.scheduleInitThree();
          }
        };
        motionQuery.addEventListener('change', onMotionReduce);
        this.destroyRef.onDestroy(() => motionQuery.removeEventListener('change', onMotionReduce));
      }
    });
  }

  /**
   * Overrides power/motion constraints and immediately ignites the dynamic WebGL canvas.
   */
  forceEnable(): void {
    this.isForceIgnited.set(true);
    this.isIgniting.set(true);
    this.power.deactivateLowPowerMode();
    if (!this.runtime?.isInitialized) {
      this.initThree();
    } else {
      this.activeNotice.set(null);
      this.runtime.startLoop();
      this.isIgniting.set(false);
    }
  }

  /**
   * Dismisses the active advisory banner without overriding power constraints.
   */
  dismissNotice(): void {
    this.activeNotice.set(null);
  }

  private scheduleInitThree(): void {
    if (typeof window === 'undefined') return;
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => this.initThree(),
        { timeout: 800 }
      );
    } else {
      setTimeout(() => this.initThree(), 30);
    }
  }

  private async initThree(): Promise<void> {
    if (this.runtime?.isInitialized || this.isInitializing) return;
    if (typeof window === 'undefined' || typeof WebGLRenderingContext === 'undefined') return;

    this.isInitializing = true;
    try {
      this.isCanvasMounted.set(true);

      // Wait a microtask for Angular to render the #canvas element into the DOM
      await new Promise<void>((resolve) => setTimeout(resolve, 0));

      const canvas = this.canvasRef()?.nativeElement;
      if (!canvas) return;

      // Lazy-load WebGL runtime, physics, shaders, and Three.js strictly on-demand
      const { StarfieldRuntime } = await import('./starfield-runtime');
      if (!this.runtime) {
        this.runtime = new StarfieldRuntime();
      }
      const started = await this.runtime.start(canvas, this.elementRef.nativeElement, this.power, this.destroyRef);
      if (started) {
        this.activeNotice.set(null);
      }
    } finally {
      this.isInitializing = false;
      this.isIgniting.set(false);
    }
  }

  private cleanup(): void {
    this.runtime?.dispose();
    this.isCanvasMounted.set(false);
  }
}

export { StarfieldCanvas as HeroCanvas };
