import { DestroyRef } from '@angular/core';
import { CanvasRect } from './starfield.types';
import { StarfieldPhysics } from './starfield-physics';
import { StarfieldMeteorManager } from './starfield-meteor';
import { StarfieldPowerManager } from './starfield-power';
import { generateStarfieldGeometry } from './starfield-generator';
import { StarfieldEngine } from './starfield-engine';
import { StarfieldPointerManager } from './starfield-pointer';

/**
 * Encapsulated Three.js & WebGL Dynamic Runtime for Starfield.
 * Lazy-loaded strictly on demand when conditions allow or user triggers ignition.
 */
export class StarfieldRuntime {
  private readonly physics = new StarfieldPhysics();
  private readonly meteors = new StarfieldMeteorManager();
  private readonly engine = new StarfieldEngine();
  private pointer!: StarfieldPointerManager;

  private animFrameId = 0;
  private isIntersecting = true;
  private isLoopRunning = false;

  private width = 0;
  private height = 0;
  private aspect = 1;
  private canvasRect: CanvasRect = { left: 0, top: 0, width: 0, height: 0 };
  private lastFrameTime = 0;

  private canvas!: HTMLCanvasElement;
  private hostEl!: HTMLElement;
  private power!: StarfieldPowerManager;
  private unregisterCleanups: (() => void)[] = [];

  get isInitialized(): boolean {
    return this.engine.isInitialized;
  }

  async start(
    canvas: HTMLCanvasElement,
    hostEl: HTMLElement,
    power: StarfieldPowerManager,
    destroyRef: DestroyRef
  ): Promise<boolean> {
    if (this.engine.isInitialized) return true;
    if (typeof window === 'undefined' || typeof WebGLRenderingContext === 'undefined') return false;

    let THREE: typeof import('three');
    try {
      THREE = await import('three');
    } catch {
      return false;
    }

    this.canvas = canvas;
    this.hostEl = hostEl;
    this.power = power;

    this.pointer = new StarfieldPointerManager(this.physics, destroyRef, () => ({
      canvasRect: this.canvasRect,
      aspect: this.aspect,
      width: this.width,
      height: this.height,
      updateRect: () => this.updateCanvasRect()
    }));

    this.updateCanvasRect();
    this.width = Math.max(this.canvasRect.width, 320);
    this.height = Math.max(this.canvasRect.height, 480);
    this.aspect = this.width / this.height;

    const dpr = this.power.getOptimalPixelRatio(this.width);
    const geometry = generateStarfieldGeometry(this.width, this.aspect, this.meteors, THREE);

    const initialized = this.engine.init(
      canvas,
      this.width,
      this.height,
      this.aspect,
      dpr,
      geometry,
      this.meteors,
      THREE
    );

    if (!initialized) return false;

    this.pointer.setup();
    this.setupResizeObserver();
    this.setupVisibilityLifecycle();

    canvas.classList.add('is-ready');
    this.startLoop();

    destroyRef.onDestroy(() => this.dispose());
    return true;
  }

  startLoop(): void {
    if (this.isLoopRunning || (typeof document !== 'undefined' && document.hidden)) {
      return;
    }
    this.isLoopRunning = true;
    this.lastFrameTime = performance.now();
    this.tick();
  }

  stopLoop(): void {
    this.isLoopRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = 0;
    }
  }

  private tick = (): void => {
    if (!this.isLoopRunning) return;

    const now = performance.now();
    const deltaMs = this.lastFrameTime > 0 ? now - this.lastFrameTime : 16.6;
    const dt = Math.min(deltaMs * 0.001, 0.1);

    // 1. Singularity Physics
    this.physics.updateGravity(dt);
    const g = this.physics.gravityState;
    const isBlackHoleActive = g.currentStrength > 0.005 || g.isHolding;

    // 2. Meteor Management
    if (!this.meteors.isMeteorActive && !isBlackHoleActive && this.isIntersecting && now >= this.meteors.nextMeteorTime) {
      this.meteors.spawnMeteor(now, this.aspect);
    }

    if (this.meteors.isMeteorActive) {
      const elapsed = (now - this.meteors.meteorStartTime) * 0.001;
      const progress = elapsed / this.meteors.meteorDuration;
      if (progress >= 1.0) {
        this.meteors.isMeteorActive = false;
        if (this.meteors.meteorMesh) this.meteors.meteorMesh.visible = false;
        if (this.meteors.meteorHeadMesh) this.meteors.meteorHeadMesh.visible = false;
        this.meteors.scheduleNextMeteor(now);
      } else {
        this.meteors.updateMeteorGeometry(progress);
      }
    }

    // 3. Adaptive Frame Governor (30 FPS idle, 60 FPS active)
    const isInteracting =
      now - this.pointer.lastInteraction < 1800 ||
      this.physics.targetCalmStrength > 0.05 ||
      isBlackHoleActive ||
      this.meteors.isMeteorActive;

    const targetInterval = this.power.getTargetFrameInterval(isInteracting);
    const deltaFrame = now - this.lastFrameTime;
    if (deltaFrame < targetInterval - 1.5) {
      this.animFrameId = requestAnimationFrame(this.tick);
      return;
    }
    this.lastFrameTime = now - (deltaFrame % targetInterval);

    // 4. Pointer Kinematics & Render
    this.physics.updatePointerVelocity();
    this.engine.updateUniforms(now, this.physics);
    this.engine.render();

    this.animFrameId = requestAnimationFrame(this.tick);
  };

  private updateCanvasRect(): void {
    if (!this.hostEl) return;
    const r = this.hostEl.getBoundingClientRect();
    this.canvasRect = {
      left: r.left + (window.scrollX || 0),
      top: r.top + (window.scrollY || 0),
      width: r.width,
      height: r.height
    };
  }

  private setupResizeObserver(): void {
    const hostEl = this.hostEl;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) this.handleResize(width, height);
      }
    });
    ro.observe(hostEl);

    const onWinResize = () => {
      const rect = hostEl.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) this.handleResize(rect.width, rect.height);
    };
    window.addEventListener('resize', onWinResize, { passive: true });

    const onScroll = () => this.updateCanvasRect();
    window.addEventListener('scroll', onScroll, { passive: true });

    this.unregisterCleanups.push(() => {
      ro.disconnect();
      window.removeEventListener('resize', onWinResize);
      window.removeEventListener('scroll', onScroll);
    });
  }

  private setupVisibilityLifecycle(): void {
    const hostEl = this.hostEl;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          this.isIntersecting = entry.isIntersecting;
          if (this.isIntersecting) {
            this.startLoop();
          } else {
            this.stopLoop();
          }
        }
      },
      { threshold: 0 }
    );
    io.observe(hostEl);

    const onVisibilityChange = () => {
      if (document.hidden) {
        this.stopLoop();
      } else if (this.isIntersecting) {
        this.startLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    this.unregisterCleanups.push(() => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    });
  }

  private handleResize(w: number, h: number): void {
    if (w <= 0 || h <= 0) return;
    this.width = w;
    this.height = h;
    this.aspect = w / h;

    this.updateCanvasRect();
    const dpr = this.power.getOptimalPixelRatio(w);
    this.engine.resize(w, h, this.aspect, dpr);
  }

  dispose(): void {
    this.stopLoop();
    for (const cleanup of this.unregisterCleanups) {
      cleanup();
    }
    this.unregisterCleanups = [];
    if (this.canvas) {
      this.canvas.classList.remove('is-ready');
    }
    this.engine.dispose(this.meteors);
  }
}
