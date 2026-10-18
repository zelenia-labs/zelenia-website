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

/**
 * High-performance WebGL particle definition with dual-mode blending:
 * Pure additive luminosity for fire/plasma, and smooth alpha occlusion for dense smoke.
 */
interface RocketParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  growth: number;
  r: number;
  g: number;
  b: number;
  a: number;
  age: number;
  maxAge: number;
  isAdditive: boolean;
  drag: number;
}

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

  readonly particleCanvas = viewChild<ElementRef<HTMLCanvasElement>>('particleCanvas');

  // Reactive state signals
  readonly isActive = signal(false);
  readonly isFlying = signal(false);
  readonly rocketVisible = signal(false);
  readonly rocketTransform = signal('');

  // WebGL context and resource handles
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private vertexBuffer: WebGLBuffer | null = null;

  // WebGL shader attribute & uniform locations
  private aPositionLoc = -1;
  private aSizeLoc = -1;
  private aColorLoc = -1;
  private uResolutionLoc: WebGLUniformLocation | null = null;
  private uPixelRatioLoc: WebGLUniformLocation | null = null;

  // Performance-focused particle pool (Float32Array: 7 floats per particle [x, y, size, r, g, b, a])
  private static readonly MAX_PARTICLES = 2000;
  private particles: RocketParticle[] = [];
  private particleBufferData = new Float32Array(RocketEasterEgg.MAX_PARTICLES * 7);

  // Animation lifecycle
  private animFrameId: number | null = null;
  private startTime = 0;
  private viewportW = 1920;
  private viewportH = 1080;
  private pixelRatio = 1;

  // Trajectory state
  private launchX = 0;
  private launchY = 0;
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

    this.destroyRef.onDestroy(() => {
      this.teardownAnimation();
      this.cleanupWebGL();
    });
  }

  /**
   * Lightweight scroll listener: Triggers consistent, reliable rocket launch upon reaching bottom of page.
   */
  private initAutoTriggerOnScroll(): void {
    if (typeof window === 'undefined') return;

    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const onScroll = () => {
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

      // Trigger consistently when reaching the bottom boundary
      if (distanceFromBottom <= 32) {
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
   * Launches rocket with consistent, cinematic aerospace flight dynamics.
   */
  launch(): void {
    if (!isPlatformBrowser(this.platformId) || this.isFlying()) return;

    this.hasAutoTriggered = true;
    this.viewportW = window.innerWidth;
    this.viewportH = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    // Anchor on bottom-left (22% of viewport width)
    this.launchX = Math.round(this.viewportW * (this.viewportW > 768 ? 0.22 : 0.25));
    this.launchY = this.viewportH - 6;

    this.currentRocketX = this.launchX;
    this.currentRocketY = this.launchY;
    this.currentHeadingDeg = 0;

    this.updateRocketDOMTransform();

    this.particles = [];
    this.isActive.set(true);
    this.isFlying.set(true);
    this.rocketVisible.set(true);

    requestAnimationFrame(() => {
      this.initWebGL();
      this.startTime = performance.now();
      if (this.animFrameId === null) {
        this.runAnimationLoop();
      }
    });
  }

  /**
   * Compiles the raw WebGL program with dual-mode additive & alpha blending.
   */
  private initWebGL(): void {
    const canvasRef = this.particleCanvas();
    if (!canvasRef) return;
    const canvas = canvasRef.nativeElement;

    canvas.width = Math.round(this.viewportW * this.pixelRatio);
    canvas.height = Math.round(this.viewportH * this.pixelRatio);

    const gl =
      canvas.getContext('webgl', {
        alpha: true,
        antialias: false,
        depth: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance'
      }) || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) return;
    this.gl = gl;

    const vsSource = `
      attribute vec2 a_position;
      attribute float a_size;
      attribute vec4 a_color;

      uniform vec2 u_resolution;
      uniform float u_pixelRatio;

      varying vec4 v_color;

      void main() {
        vec2 zeroToOne = a_position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = vec2(zeroToTwo.x - 1.0, 1.0 - zeroToTwo.y);

        gl_Position = vec4(clipSpace, 0.0, 1.0);
        gl_PointSize = a_size * u_pixelRatio;
        v_color = a_color;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec4 v_color;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) {
          discard;
        }
        float falloff = smoothstep(0.5, 0.0, dist);

        // Negative alpha indicates pure additive flame plasma (RGB adds directly without alpha reduction)
        if (v_color.a < 0.0) {
          float glow = -v_color.a * falloff;
          gl_FragColor = vec4(v_color.rgb * glow, 0.0);
        } else {
          // Standard smooth billowing smoke cloud
          float alpha = falloff * v_color.a;
          gl_FragColor = vec4(v_color.rgb * alpha, alpha);
        }
      }
    `;

    const vertShader = this.compileShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragShader = this.compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('WebGL link error:', gl.getProgramInfoLog(program));
      return;
    }

    this.program = program;
    gl.useProgram(program);

    this.aPositionLoc = gl.getAttribLocation(program, 'a_position');
    this.aSizeLoc = gl.getAttribLocation(program, 'a_size');
    this.aColorLoc = gl.getAttribLocation(program, 'a_color');

    this.uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    this.uPixelRatioLoc = gl.getUniformLocation(program, 'u_pixelRatio');

    gl.uniform2f(this.uResolutionLoc, this.viewportW, this.viewportH);
    gl.uniform1f(this.uPixelRatioLoc, this.pixelRatio);

    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.particleBufferData.byteLength, gl.DYNAMIC_DRAW);

    // One-pass blending: Pre-multiplied alpha allows simultaneous pure additive fire and alpha-blended smoke
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  private compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  /**
   * Main performance-focused animation loop.
   */
  private runAnimationLoop(): void {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const elapsed = (now - this.startTime) / 1000;
      this.updateRocket(elapsed, dt);

      // Update lingering trail and trench particles
      this.updateParticles(dt);

      // Render WebGL frame
      this.renderParticles();

      // Clean termination: Rocket exited screen and all clouds/fire fully dissipated
      if (!this.rocketVisible() && this.particles.length === 0) {
        this.completeSequence();
        return;
      }

      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  /**
   * Calculates kinematic ascent powered by quadratic acceleration curve and gravity turn.
   */
  private updateRocket(elapsed: number, dt: number): void {
    const progress = Math.min(elapsed / this.totalFlightDuration, 1.25);

    // Natural aerospace acceleration curve
    const verticalCurve = 0.35 * progress + 0.65 * Math.pow(progress, 1.8);
    const verticalDistance = (this.viewportH + 220) * verticalCurve;
    const nextY = this.launchY - verticalDistance;

    // Graceful elliptical arc curving from left towards upper right across the sky
    const maxHorizontalDrift = this.viewportW * 0.42;
    const nextX = this.launchX + maxHorizontalDrift * Math.sin(Math.pow(progress, 1.35) * Math.PI * 0.5);

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
      // 1. Initial Launch Pad Explosion: Flame blast and dual-sided smoke trench plumes
      if (elapsed < 0.55) {
        this.emitLiftoffPadExplosion(dt, elapsed);
      }

      // 2. Flight plume: Supersonic nozzle flame sparks and downstream billowing vapor trail
      this.emitFlightPlume(dt, progress);
      this.updateRocketDOMTransform(scaleX, scaleY);
    }
  }

  /**
   * Applies 3D transform to vehicle centered at the nozzle exit (y: 60px of 114px height -> 52.6%).
   */
  private updateRocketDOMTransform(scaleX = 1.0, scaleY = 1.0): void {
    const transformStr = `translate3d(${this.currentRocketX.toFixed(1)}px, ${this.currentRocketY.toFixed(1)}px, 0) translate(-50%, -52.6%) rotate(${this.currentHeadingDeg.toFixed(1)}deg) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;
    this.rocketTransform.set(transformStr);
  }

  /**
   * Real launch pad physics: Massive initial flame burst and billowing smoke pushed to BOTH sides
   * (Flame deflector trench effect mimicking real aerospace rocket liftoffs).
   */
  private emitLiftoffPadExplosion(dt: number, elapsed: number): void {
    const intensity = Math.pow(Math.max(0, 1.0 - elapsed / 0.55), 1.25);

    // A. Initial fiery blast hitting the launch pad
    const fireCount = Math.round(36 * intensity * dt * 60);
    for (let i = 0; i < fireCount; i++) {
      if (this.particles.length >= RocketEasterEgg.MAX_PARTICLES) break;

      const angle = (Math.random() * 0.8 - 0.4) * Math.PI + Math.PI * 0.5;
      const speed = (180 + Math.random() * 320) * intensity;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      this.particles.push({
        x: this.launchX + (Math.random() - 0.5) * 16,
        y: this.launchY + Math.random() * 6,
        vx,
        vy,
        size: 12 + Math.random() * 12,
        growth: 28,
        r: 1.0,
        g: 0.72 + Math.random() * 0.24,
        b: 0.15 + Math.random() * 0.2,
        a: 0.95,
        age: 0,
        maxAge: 0.22 + Math.random() * 0.24,
        isAdditive: true,
        drag: 0.94
      });
    }

    // B. Dual-sided smoke trench plumes (expanding rapidly to BOTH left and right)
    const trenchCount = Math.round(48 * intensity * dt * 60);
    for (let i = 0; i < trenchCount; i++) {
      if (this.particles.length >= RocketEasterEgg.MAX_PARTICLES) break;

      const dir = Math.random() < 0.5 ? -1 : 1;
      const horizSpeed = (160 + Math.random() * 320) * intensity;
      const vertSpeed = -(15 + Math.random() * 55) * intensity;

      const grey = 0.82 + Math.random() * 0.16;

      this.particles.push({
        x: this.launchX + dir * (12 + Math.random() * 18),
        y: this.launchY + (Math.random() - 0.5) * 8,
        vx: dir * horizSpeed,
        vy: vertSpeed,
        size: 22 + Math.random() * 16,
        growth: 42 + Math.random() * 32,
        r: grey,
        g: grey,
        b: grey,
        a: 0.52 + Math.random() * 0.25,
        age: 0,
        maxAge: 2.4 + Math.random() * 1.1,
        isAdditive: false,
        drag: 0.89
      });
    }
  }

  /**
   * Emits supersonic fire sparks at nozzle exit and expanding atmospheric smoke downstream BELOW the rocket.
   */
  private emitFlightPlume(dt: number, progress: number): void {
    const headingRad = (this.currentHeadingDeg * Math.PI) / 180;

    const exhX = -Math.sin(headingRad);
    const exhY = Math.cos(headingRad);

    const perpX = -exhY;
    const perpY = exhX;

    // 1. Supersonic glowing flame plasma & sparks exiting at nozzle base
    const sparkCount = Math.round(36 * dt * 60);
    for (let i = 0; i < sparkCount; i++) {
      if (this.particles.length >= RocketEasterEgg.MAX_PARTICLES) break;

      const sparkDist = 2 + Math.random() * 22;
      const speed = 320 + Math.random() * 380;
      const spread = (Math.random() - 0.5) * 0.28;

      const sparkVx = (exhX + perpX * spread) * speed;
      const sparkVy = (exhY + perpY * spread) * speed;

      this.particles.push({
        x: this.currentRocketX + exhX * sparkDist + perpX * (Math.random() - 0.5) * 4,
        y: this.currentRocketY + exhY * sparkDist + perpY * (Math.random() - 0.5) * 4,
        vx: sparkVx,
        vy: sparkVy,
        size: 7 + Math.random() * 6,
        growth: 14,
        r: 1.0,
        g: 0.78 + Math.random() * 0.2,
        b: 0.2 + Math.random() * 0.25,
        a: 0.95,
        age: 0,
        maxAge: 0.16 + Math.random() * 0.18,
        isAdditive: true,
        drag: 0.96
      });
    }

    // 2. Realistic atmospheric smoke plume: Appears downstream BELOW the rocket (38px to 66px standoff)
    const trailCount = Math.round(24 * dt * 60);
    for (let i = 0; i < trailCount; i++) {
      if (this.particles.length >= RocketEasterEgg.MAX_PARTICLES) break;

      const smokeStandOff = 38 + Math.random() * 28;
      const lateralSpread = (Math.random() - 0.5) * (8 + progress * 16);

      const smokeOriginX = this.currentRocketX + exhX * smokeStandOff + perpX * lateralSpread;
      const smokeOriginY = this.currentRocketY + exhY * smokeStandOff + perpY * lateralSpread;

      const plumeSpeed = 16 + Math.random() * 42;
      const smokeVx = (exhX + perpX * (Math.random() - 0.5) * 0.6) * plumeSpeed;
      const smokeVy = (exhY + perpY * (Math.random() - 0.5) * 0.6) * plumeSpeed;
      const grey = 0.84 + Math.random() * 0.14;

      this.particles.push({
        x: smokeOriginX,
        y: smokeOriginY,
        vx: smokeVx,
        vy: smokeVy,
        size: 16 + Math.random() * 12,
        growth: 28 + Math.random() * 26,
        r: grey,
        g: grey,
        b: grey,
        a: 0.44 + Math.random() * 0.25,
        age: 0,
        maxAge: 2.2 + Math.random() * 0.9,
        isAdditive: false,
        drag: 0.92
      });
    }
  }

  /**
   * Updates particle physics and life decay.
   */
  private updateParticles(dt: number): void {
    const alive: RocketParticle[] = [];

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.age += dt;

      if (p.age < p.maxAge) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= Math.pow(p.drag, dt * 60);
        p.vy *= Math.pow(p.drag, dt * 60);

        if (!p.isAdditive) {
          p.vy -= 10 * dt;
        }

        p.size += p.growth * dt;
        alive.push(p);
      }
    }

    this.particles = alive;
  }

  /**
   * High-efficiency batch draw call via WebGL with dual-mode additive & alpha blending.
   */
  private renderParticles(): void {
    const gl = this.gl;
    if (!gl || !this.program || !this.vertexBuffer) return;

    gl.viewport(0, 0, Math.round(this.viewportW * this.pixelRatio), Math.round(this.viewportH * this.pixelRatio));
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const count = this.particles.length;
    if (count === 0) return;

    gl.useProgram(this.program);
    gl.uniform2f(this.uResolutionLoc, this.viewportW, this.viewportH);
    gl.uniform1f(this.uPixelRatioLoc, this.pixelRatio);

    let offset = 0;
    for (let i = 0; i < count; i++) {
      const p = this.particles[i];
      const lifeRatio = p.age / p.maxAge;

      let r = p.r;
      let g = p.g;
      let b = p.b;
      let alpha = 0.0;

      if (p.isAdditive) {
        const glow = p.a * Math.max(0, 1.0 - lifeRatio);
        alpha = -glow;
      } else {
        alpha = p.a * Math.max(0, 1.0 - Math.pow(lifeRatio, 1.25));
      }

      this.particleBufferData[offset] = p.x;
      this.particleBufferData[offset + 1] = p.y;
      this.particleBufferData[offset + 2] = p.size;
      this.particleBufferData[offset + 3] = r;
      this.particleBufferData[offset + 4] = g;
      this.particleBufferData[offset + 5] = b;
      this.particleBufferData[offset + 6] = alpha;

      offset += 7;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.particleBufferData.subarray(0, count * 7));

    const stride = 7 * Float32Array.BYTES_PER_ELEMENT;
    gl.enableVertexAttribArray(this.aPositionLoc);
    gl.vertexAttribPointer(this.aPositionLoc, 2, gl.FLOAT, false, stride, 0);

    gl.enableVertexAttribArray(this.aSizeLoc);
    gl.vertexAttribPointer(this.aSizeLoc, 1, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(this.aColorLoc);
    gl.vertexAttribPointer(this.aColorLoc, 4, gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);

    gl.drawArrays(gl.POINTS, 0, count);
  }

  /**
   * Completes sequence, clears buffers, stops animation frame loop.
   */
  private completeSequence(): void {
    this.teardownAnimation();
    this.cleanupWebGL();
    this.particles = [];
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

  private cleanupWebGL(): void {
    if (!this.gl) return;
    const gl = this.gl;
    if (this.vertexBuffer) {
      gl.deleteBuffer(this.vertexBuffer);
      this.vertexBuffer = null;
    }
    if (this.program) {
      gl.deleteProgram(this.program);
      this.program = null;
    }
    this.gl = null;
  }
}
