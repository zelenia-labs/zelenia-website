import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type * as THREE_TYPES from 'three';

@Component({
  selector: 'app-starfield-canvas, app-hero-canvas',
  template: `
    <canvas
      #canvas
      class="starfield-canvas"
      aria-hidden="true"
    ></canvas>
    <img
      src="/hero-starfield-static.svg"
      alt=""
      class="starfield-canvas-snapshot"
      aria-hidden="true"
      loading="lazy"
      decoding="async"
    />
  `,
  styles: `
    :host {
      display: block;
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
    }

    .starfield-canvas,
    .hero-canvas {
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .starfield-canvas.is-ready,
    .hero-canvas.is-ready {
      opacity: 1;
    }

    .starfield-canvas-snapshot,
    .hero-canvas-snapshot {
      display: none;
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }

    /* Accessibility: When reduced motion is preferred, show authentic static SVG snapshot & suppress WebGL canvas */
    @media (prefers-reduced-motion: reduce) {
      .starfield-canvas,
      .hero-canvas {
        display: none !important;
      }

      .starfield-canvas-snapshot,
      .hero-canvas-snapshot {
        display: block !important;
      }
    }

    /* Battery & Hardware Conservation: When Low Power / Battery <= 20% is detected */
    :host(.is-low-power) .starfield-canvas,
    :host(.is-low-power) .hero-canvas {
      display: none !important;
    }

    :host(.is-low-power) .starfield-canvas-snapshot,
    :host(.is-low-power) .hero-canvas-snapshot {
      display: block !important;
    }
  `
})
export class StarfieldCanvas {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private renderer: THREE_TYPES.WebGLRenderer | null = null;
  private scene: THREE_TYPES.Scene | null = null;
  private camera: THREE_TYPES.OrthographicCamera | null = null;
  private material: THREE_TYPES.ShaderMaterial | null = null;
  private geometry: THREE_TYPES.BufferGeometry | null = null;
  private points: THREE_TYPES.Points | null = null;

  // Ripple shockwave state (dual ring buffer for rapid multi-clicks)
  private ripples = [
    { origin: { x: 0, y: 0 }, startTime: -999, active: false },
    { origin: { x: 0, y: 0 }, startTime: -999, active: false }
  ];
  private rippleIndex = 0;

  // Shooting star / Meteor state
  private candidateStarOrigins: { nx: number; ny: number; depth: number }[] = [];
  private meteorMesh: THREE_TYPES.Mesh | null = null;
  private meteorGeometry: THREE_TYPES.BufferGeometry | null = null;
  private meteorMaterial: THREE_TYPES.ShaderMaterial | null = null;
  private meteorHeadMesh: THREE_TYPES.Mesh | null = null;
  private meteorHeadGeometry: THREE_TYPES.BufferGeometry | null = null;
  private meteorHeadMaterial: THREE_TYPES.ShaderMaterial | null = null;

  private isMeteorActive = false;
  private meteorStartTime = 0;
  private meteorDuration = 2.2;
  private meteorDepth = 1.0;
  private nextMeteorTime = 0;
  private meteorP0 = { x: 0, y: 0 };
  private meteorV = { x: 0, y: 0 };
  private meteorA = { x: 0, y: 0 };

  private animFrameId = 0;
  private isIntersecting = true;
  private isLoopRunning = false;
  private isLowPower = false;

  private width = 0;
  private height = 0;
  private aspect = 1;

  // Cached canvas coordinates to eliminate getBoundingClientRect reflows during pointermove
  private canvasRect = { left: 0, top: 0, width: 0, height: 0 };

  // Smooth mouse coordinates, kinematic velocity & calm strength (zero allocation)
  private targetMouse = { x: 0.0, y: 0.0 };
  private currentMouse = { x: 0.0, y: 0.0 };
  private mouseVelocity = { x: 0.0, y: 0.0 };
  private targetCalmStrength = 0.0;
  private currentCalmStrength = 0.0;

  // Adaptive Frame-Rate & Battery Management
  private lastInteractionTime = 0;
  private lastFrameTime = 0;
  private startTime = 0;

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser) {
        if (typeof window === 'undefined') return;

        // Monitor low power / low battery states
        this.setupPowerMonitoring();

        const motionQuery =
          typeof window.matchMedia === 'function'
            ? window.matchMedia('(prefers-reduced-motion: reduce)')
            : null;

        // Accessibility Guard: If reduced motion is requested, do NOT load Three.js or run WebGL!
        if (motionQuery?.matches) {
          const onMotionChange = (e: MediaQueryListEvent) => {
            if (!e.matches && !this.isLowPower) {
              this.scheduleInitThree();
            }
          };
          motionQuery.addEventListener('change', onMotionChange, { once: true });
          return;
        }

        if (!this.isLowPower) {
          this.scheduleInitThree();
        }

        // Listen for live accessibility preference changes
        if (motionQuery) {
          const onMotionReduce = (e: MediaQueryListEvent) => {
            if (e.matches) {
              this.cleanup();
            } else if (!this.isLowPower) {
              this.scheduleInitThree();
            }
          };
          motionQuery.addEventListener('change', onMotionReduce);
          this.destroyRef.onDestroy(() => {
            motionQuery.removeEventListener('change', onMotionReduce);
          });
        }
      }
    });
  }

  private async setupPowerMonitoring(): Promise<void> {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

    // 1. Connection / Data-Saver / Low-Data mode check
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) {
      this.activateLowPowerMode();
      return;
    }

    // 2. Battery Status API check (Supported in Chromium and modern mobile runtimes)
    if ('getBattery' in navigator && typeof (navigator as unknown as { getBattery: () => Promise<unknown> }).getBattery === 'function') {
      try {
        const battery = await (navigator as unknown as {
          getBattery: () => Promise<{
            charging: boolean;
            level: number;
            addEventListener: (type: string, listener: () => void) => void;
            removeEventListener: (type: string, listener: () => void) => void;
          }>;
        }).getBattery();

        const checkBattery = () => {
          // Low battery threshold: Unplugged and battery level <= 20%
          const isBatteryLow = !battery.charging && battery.level <= 0.20;
          if (isBatteryLow) {
            this.activateLowPowerMode();
          } else if (this.isLowPower && !conn?.saveData) {
            this.deactivateLowPowerMode();
          }
        };

        checkBattery();

        const onLevelChange = () => checkBattery();
        const onChargingChange = () => checkBattery();

        battery.addEventListener('levelchange', onLevelChange);
        battery.addEventListener('chargingchange', onChargingChange);

        this.destroyRef.onDestroy(() => {
          battery.removeEventListener('levelchange', onLevelChange);
          battery.removeEventListener('chargingchange', onChargingChange);
        });
      } catch {
        // Battery API blocked or restricted
      }
    }
  }

  private activateLowPowerMode(): void {
    if (this.isLowPower) return;
    this.isLowPower = true;
    this.elementRef.nativeElement.classList.add('is-low-power');
    this.cleanup();
  }

  private deactivateLowPowerMode(): void {
    if (!this.isLowPower) return;
    this.isLowPower = false;
    this.elementRef.nativeElement.classList.remove('is-low-power');

    const motionQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    if (!motionQuery?.matches) {
      this.scheduleInitThree();
    }
  }

  private scheduleInitThree(): void {
    if (this.isLowPower) return;

    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => this.initThree(),
        { timeout: 1200 }
      );
    } else {
      setTimeout(() => this.initThree(), 30);
    }
  }

  private async initThree(): Promise<void> {
    const canvas = this.canvasRef().nativeElement;

    if (typeof window === 'undefined' || typeof WebGLRenderingContext === 'undefined') {
      return;
    }

    // Double check reduced motion or low power before executing heavy initialization
    if (this.isLowPower || (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      return;
    }

    // 1. Dynamic Code-Splitting of Three.js (Offloads ~150KB from critical landing chunk)
    let THREE: typeof import('three');
    try {
      THREE = await import('three');
    } catch {
      return;
    }

    this.updateCanvasRect();
    this.width = Math.max(this.canvasRect.width, 320);
    this.height = Math.max(this.canvasRect.height, 480);
    this.aspect = this.width / this.height;

    // 2. Battery & Hardware Optimized WebGL Renderer (No depth/stencil buffers, low-power GPU core)
    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return;

      this.renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl as WebGL2RenderingContext | WebGLRenderingContext,
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power'
      });
    } catch {
      return;
    }

    // Adaptive DPR: Capped at 1.2 on mobile to save ~50% GPU fillrate; 1.5 on desktop
    const isMobile = window.innerWidth < 768;
    const maxDpr = isMobile ? 1.2 : 1.5;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.width, this.height, false);

    // 3. Scene & Lightweight Orthographic Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      -this.aspect,
      this.aspect,
      1.0,
      -1.0,
      0.1,
      10.0
    );
    this.camera.position.z = 1.0;

    // 4. Deterministic Celestial Distribution matching static SVG snapshot (~1,580 stars on desktop, ~670 on mobile)
    const cols = isMobile ? 28 : 44;
    const rows = isMobile ? 24 : 36;
    const particleCount = cols * rows;

    const positions = new Float32Array(particleCount * 3);
    const basePos = new Float32Array(particleCount * 2);
    const depths = new Float32Array(particleCount);
    const seeds = new Float32Array(particleCount);

    this.candidateStarOrigins = [];
    const rand = this.createPrng(20261017);

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const u = ((c + 0.5) / cols) * 2.16 - 1.08;
        const v = ((r + 0.5) / rows) * 2.16 - 1.08;

        const jitterX = (rand() - 0.5) * (2.16 / cols) * 1.7;
        const jitterY = (rand() - 0.5) * (2.16 / rows) * 1.7;

        const nx = u + jitterX;
        const ny = v + jitterY;

        const rDepth = rand();
        const depth =
          rDepth > 0.90
            ? 0.80 + rand() * 0.20
            : rDepth > 0.55
            ? 0.40 + rand() * 0.35
            : 0.10 + rand() * 0.25;

        positions[idx * 3] = nx * this.aspect;
        positions[idx * 3 + 1] = ny;
        positions[idx * 3 + 2] = (depth - 0.5) * 0.2;

        basePos[idx * 2] = nx;
        basePos[idx * 2 + 1] = ny;

        depths[idx] = depth;
        seeds[idx] = rand();

        // Authentic origin candidates for shooting stars (centered well inside the frame with varying depths)
        if (ny > 0.22 && ny < 0.85 && Math.abs(nx) < 0.75 && depth > 0.12) {
          this.candidateStarOrigins.push({ nx, ny, depth });
        }

        idx++;
      }
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aBasePos', new THREE.BufferAttribute(basePos, 2));
    this.geometry.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1));
    this.geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    // 5. Half-Precision GPU Shader with Crisp Celestial Core, Fluid Pointer Wake & Dynamic Shockwaves
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseVelocity: { value: new THREE.Vector2(0, 0) },
        uMouseRadius: { value: isMobile ? 0.48 : 0.60 },
        uCalmStrength: { value: 0.0 },
        uRippleOrigin1: { value: new THREE.Vector2(0, 0) },
        uRippleOrigin2: { value: new THREE.Vector2(0, 0) },
        uRippleTime1: { value: 999.0 },
        uRippleTime2: { value: 999.0 },
        uRippleStrength1: { value: 0.0 },
        uRippleStrength2: { value: 0.0 },
        uAspect: { value: this.aspect },
        uPixelRatio: { value: dpr },
        uReducedMotion: { value: 0.0 }
      },
      vertexShader: `
        precision mediump float;

        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uMouseVelocity;
        uniform float uMouseRadius;
        uniform float uCalmStrength;
        uniform vec2 uRippleOrigin1;
        uniform vec2 uRippleOrigin2;
        uniform float uRippleTime1;
        uniform float uRippleTime2;
        uniform float uRippleStrength1;
        uniform float uRippleStrength2;
        uniform float uAspect;
        uniform float uPixelRatio;
        uniform float uReducedMotion;

        attribute vec2 aBasePos;
        attribute float aDepth;
        attribute float aSeed;

        varying float vAlpha;
        varying float vDepth;
        varying float vCalm;
        varying float vRipple;
        varying float vCoreRadius;
        varying float vInvTotalSize;

        void main() {
          vec2 pos = vec2(aBasePos.x * uAspect, aBasePos.y);

          vec2 toMouse = pos - uMouse;
          float distToMouse = length(toMouse);

          float motionSpeed = 0.32;
          float t = uTime * motionSpeed;

          // Harmonic pointer calm deformation
          float flowAngle = atan(toMouse.y, toMouse.x);
          float harmonicMod = sin(flowAngle * 2.0 + t * 0.5) * 0.12 + cos(flowAngle * 3.0 - t * 0.4) * 0.08;
          float normDist = distToMouse / max(0.001, uMouseRadius);
          float deformedR = normDist + harmonicMod * smoothstep(1.6, 0.1, normDist);

          float calm = exp(-deformedR * deformedR * 1.6) * uCalmStrength;
          vCalm = calm;

          float wave1 = sin(pos.y * 2.5 + t + aSeed * 6.28) * (0.013 + aDepth * 0.015);
          float wave2 = cos(pos.x * 2.1 - t * 0.65 + aSeed * 3.14) * (0.013 + aDepth * 0.015);
          float waveZ = sin(pos.x * 1.8 + pos.y * 1.8 + t * 0.85) * (0.02 + aDepth * 0.03);
          vec2 ambientMotion = vec2(wave1, wave2);

          vec2 laminarDrift = vec2(
            sin(t * 0.35 + aSeed * 6.28) * 0.0025,
            cos(t * 0.30 + aSeed * 3.14) * 0.0025
          );

          // Fluid silky pointer wake
          vec2 kinematicDisplacement = mix(ambientMotion, laminarDrift, calm);
          vec2 fluidWake = uMouseVelocity * calm * (0.065 * (1.0 - aDepth * 0.35));
          pos += kinematicDisplacement + fluidWake;

          // Multi-pulse Click Ripple Shockwaves
          float totalRipple = 0.0;
          vec2 rippleOffset = vec2(0.0);

          // Pulse 1
          if (uRippleStrength1 > 0.001) {
            vec2 toRip = pos - uRippleOrigin1;
            float dRip = length(toRip);
            float waveR = uRippleTime1 * 1.85;
            float dWave = dRip - waveR;
            float ringPhase = dWave / 0.16;
            float amp = exp(-ringPhase * ringPhase * 2.6) * uRippleStrength1;
            float dDamp = smoothstep(2.4, 0.05, dRip);
            float factor = amp * dDamp;
            vec2 dir = dRip > 0.001 ? (toRip / dRip) : vec2(0.0, 1.0);
            rippleOffset += dir * (sin(ringPhase * 3.14159) * 0.032 * factor * (1.0 - aDepth * 0.4));
            totalRipple += factor;
          }

          // Pulse 2
          if (uRippleStrength2 > 0.001) {
            vec2 toRip = pos - uRippleOrigin2;
            float dRip = length(toRip);
            float waveR = uRippleTime2 * 1.85;
            float dWave = dRip - waveR;
            float ringPhase = dWave / 0.16;
            float amp = exp(-ringPhase * ringPhase * 2.6) * uRippleStrength2;
            float dDamp = smoothstep(2.4, 0.05, dRip);
            float factor = amp * dDamp;
            vec2 dir = dRip > 0.001 ? (toRip / dRip) : vec2(0.0, 1.0);
            rippleOffset += dir * (sin(ringPhase * 3.14159) * 0.032 * factor * (1.0 - aDepth * 0.4));
            totalRipple += factor;
          }

          pos += rippleOffset;
          vRipple = min(1.0, totalRipple);

          vec4 mvPosition = modelViewMatrix * vec4(pos, waveZ * (1.0 - calm * 0.85), 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Organic Typography Breathing Room matching static SVG exactly
          vec2 textCenter = vec2(-0.35 * uAspect, 0.05);
          vec2 textDelta = (pos - textCenter) / vec2(0.55 * uAspect, 0.45);
          float textDist = length(textDelta);
          float textClearing = smoothstep(0.35, 1.15, textDist);

          float effectiveDepth = aDepth * mix(0.45, 1.0, textClearing);

          // Diameter matching static SVG snapshot: mix(1.2, 3.6, pow(effectiveDepth, 1.6))
          float coreDiameter = mix(1.2, 3.6, pow(effectiveDepth, 1.6));
          float isAccent = step(0.70, effectiveDepth);

          // Allocate quad size in CSS pixels: accent stars get room for glowing halo (2.8x), normal stars get AA padding (+2.4px)
          float totalPointSize = mix(coreDiameter + 2.4, coreDiameter * 2.8, isAccent);
          gl_PointSize = max(1.0, totalPointSize * uPixelRatio);

          // Normalized radius of solid core in gl_PointCoord space (0.0 to 0.5)
          vCoreRadius = (coreDiameter * 0.5) / totalPointSize;
          vInvTotalSize = 1.0 / gl_PointSize;

          // Opacity matching static SVG snapshot + ripple flash
          float baseAlpha = mix(0.18, 0.72, pow(effectiveDepth, 1.3));
          float twinkle = sin(uTime * 1.0 + aSeed * 50.0) * (0.03 + effectiveDepth * 0.05);
          float finalAlpha = clamp(baseAlpha + twinkle + vRipple * 0.35, 0.08, 0.95) * mix(0.30, 1.0, textClearing);
          finalAlpha *= (1.0 + calm * 0.15);

          vAlpha = clamp(finalAlpha, 0.0, 0.95);
          vDepth = effectiveDepth;
        }
      `,
      fragmentShader: `
        precision mediump float;

        varying float vAlpha;
        varying float vDepth;
        varying float vCalm;
        varying float vRipple;
        varying float vCoreRadius;
        varying float vInvTotalSize;

        void main() {
          if (vAlpha <= 0.01) discard;

          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          // 1. Crisp antialiased solid circular core matching SVG <circle>
          float aaEdge = vInvTotalSize * 1.1;
          float coreAlpha = 1.0 - smoothstep(vCoreRadius - aaEdge, vCoreRadius + aaEdge, dist);

          // 2. Luminous halo matching SVG feGaussianBlur filter on accent stars
          float haloAlpha = 0.0;
          if (vDepth > 0.68) {
            float haloFalloff = smoothstep(0.49, vCoreRadius, dist);
            haloAlpha = haloFalloff * haloFalloff * (0.35 * smoothstep(0.68, 0.88, vDepth));
          }

          // Composite solid core and surrounding halo
          float shape = clamp(coreAlpha + haloAlpha * (1.0 - coreAlpha * 0.75), 0.0, 1.0);
          if (shape <= 0.005) discard;

          // Muted cosmic palette matching static SVG: slate-silver to lunar pearl
          vec3 deepDust = vec3(0.38, 0.44, 0.52);
          vec3 midStar = vec3(0.55, 0.62, 0.70);
          vec3 accentStar = vec3(0.72, 0.76, 0.82);

          vec3 starColor = mix(deepDust, midStar, smoothstep(0.0, 0.70, vDepth));
          starColor = mix(starColor, accentStar, smoothstep(0.70, 1.0, vDepth));

          // Kinetic calm & ripple wavefront illumination
          starColor = mix(starColor, vec3(0.78, 0.82, 0.88), vCalm * 0.15);
          starColor = mix(starColor, vec3(0.92, 0.96, 1.0), vRipple * 0.55);

          gl_FragColor = vec4(starColor, vAlpha * shape);
        }
      `
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);

    // 6. Shooting Star / Meteor Ribbon & Radiant Head Spark
    const segmentCount = 32;
    const vertCount = (segmentCount + 1) * 2;
    const meteorPositions = new Float32Array(vertCount * 3);
    const meteorProgress = new Float32Array(vertCount);
    const meteorSide = new Float32Array(vertCount);
    const meteorIndices = new Uint16Array(segmentCount * 6);

    for (let k = 0; k <= segmentCount; k++) {
      const prog = k / segmentCount;
      const i0 = k * 2;
      const i1 = k * 2 + 1;

      meteorProgress[i0] = prog;
      meteorProgress[i1] = prog;
      meteorSide[i0] = 1.0;
      meteorSide[i1] = -1.0;
    }

    let idxPtr = 0;
    for (let k = 0; k < segmentCount; k++) {
      const i0 = k * 2;
      const i1 = k * 2 + 1;
      const i2 = (k + 1) * 2;
      const i3 = (k + 1) * 2 + 1;

      meteorIndices[idxPtr++] = i0;
      meteorIndices[idxPtr++] = i1;
      meteorIndices[idxPtr++] = i2;

      meteorIndices[idxPtr++] = i1;
      meteorIndices[idxPtr++] = i3;
      meteorIndices[idxPtr++] = i2;
    }

    this.meteorGeometry = new THREE.BufferGeometry();
    const posBufferAttr = new THREE.BufferAttribute(meteorPositions, 3);
    posBufferAttr.setUsage(THREE.DynamicDrawUsage);
    this.meteorGeometry.setAttribute('position', posBufferAttr);
    this.meteorGeometry.setAttribute('aProgress', new THREE.BufferAttribute(meteorProgress, 1));
    this.meteorGeometry.setAttribute('aSide', new THREE.BufferAttribute(meteorSide, 1));
    this.meteorGeometry.setIndex(new THREE.BufferAttribute(meteorIndices, 1));

    this.meteorMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uLife: { value: 0.0 },
        uDepth: { value: 1.0 }
      },
      vertexShader: `
        precision mediump float;
        attribute float aProgress;
        attribute float aSide;
        varying float vProgress;
        varying float vSide;
        void main() {
          vProgress = aProgress;
          vSide = aSide;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform float uLife;
        uniform float uDepth;
        varying float vProgress;
        varying float vSide;

        void main() {
          float life = clamp(uLife, 0.0, 1.0);

          // Continuous graceful light curve:
          // Starts faint from within the celestial frame, flares in the mid-path, and evaporates naturally inside viewport
          float fadeIn = smoothstep(0.0, 0.24, life);
          float fadeOut = smoothstep(1.0, 0.58, life);
          float flare = fadeIn * fadeOut;

          // Atmospheric scintillation
          float flicker = 0.94 + 0.06 * sin(life * 24.0 + vProgress * 12.0);
          float totalBrilliance = flare * flicker;
          if (totalBrilliance < 0.003) discard;

          // Trail falloff: luminous head with smooth ionization wake
          float trailAlpha = pow(vProgress, 2.0);

          // Lateral cross-section: hot center core + radiant sheath
          float lateral = clamp(1.0 - abs(vSide), 0.0, 1.0);
          float coreIntensity = pow(lateral, 2.2);
          float haloIntensity = pow(lateral, 0.7);
          float shape = coreIntensity * 0.75 + haloIntensity * 0.25;

          // Depth-based color & contrast gradation:
          // Distant meteors: lower contrast, closer to background cosmic slate
          // Near foreground meteors: incandescent blazing white core with electric cyan ionization
          vec3 deepCosmic = vec3(0.32, 0.40, 0.52);
          vec3 midIon = vec3(0.58, 0.76, 0.95);
          vec3 stellarWhite = vec3(0.99, 1.0, 1.0);

          vec3 tailColor = mix(deepCosmic, vec3(0.42, 0.54, 0.70), smoothstep(0.2, 0.8, uDepth));
          vec3 ionColor = mix(deepCosmic * 1.25, midIon, smoothstep(0.2, 0.8, uDepth));
          vec3 coreColor = mix(midIon, stellarWhite, smoothstep(0.35, 0.85, uDepth));

          vec3 meteorColor = mix(tailColor, ionColor, smoothstep(0.1, 0.65, vProgress));
          meteorColor = mix(meteorColor, coreColor, smoothstep(0.65, 1.0, vProgress) * coreIntensity);

          // Aerial perspective: Distant meteors have lower contrast/opacity
          float maxAlpha = mix(0.38, 0.95, pow(clamp(uDepth, 0.0, 1.0), 0.75));
          float finalAlpha = shape * trailAlpha * totalBrilliance * maxAlpha;
          if (finalAlpha <= 0.003) discard;

          gl_FragColor = vec4(meteorColor, finalAlpha);
        }
      `
    });

    this.meteorMesh = new THREE.Mesh(this.meteorGeometry, this.meteorMaterial);
    this.meteorMesh.visible = false;
    this.scene.add(this.meteorMesh);

    // Radiant head spark
    this.meteorHeadGeometry = new THREE.PlaneGeometry(0.042, 0.042);
    this.meteorHeadMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uLife: { value: 0.0 },
        uDepth: { value: 1.0 }
      },
      vertexShader: `
        precision mediump float;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform float uLife;
        uniform float uDepth;
        varying vec2 vUv;
        void main() {
          vec2 coord = vUv - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          float life = clamp(uLife, 0.0, 1.0);
          float fadeIn = smoothstep(0.0, 0.20, life);
          float fadeOut = smoothstep(1.0, 0.60, life);
          float flare = fadeIn * fadeOut;

          float spark = 1.0 - smoothstep(0.0, 0.14, dist);
          float corona = pow(clamp(1.0 - dist * 2.0, 0.0, 1.0), 2.2);

          float maxAlpha = mix(0.35, 0.95, pow(clamp(uDepth, 0.0, 1.0), 0.75));
          float alpha = (spark * 0.90 + corona * 0.45) * flare * maxAlpha;
          if (alpha <= 0.003) discard;

          vec3 headColor = mix(vec3(0.65, 0.82, 1.0), vec3(1.0, 1.0, 1.0), spark * smoothstep(0.3, 0.8, uDepth));
          gl_FragColor = vec4(headColor, alpha);
        }
      `
    });

    this.meteorHeadMesh = new THREE.Mesh(this.meteorHeadGeometry, this.meteorHeadMaterial);
    this.meteorHeadMesh.visible = false;
    this.scene.add(this.meteorHeadMesh);

    // Schedule initial shooting star: 2 to 6 seconds
    this.scheduleNextMeteor(performance.now() - 500);

    // 7. Setup Listeners & Observers
    this.setupPointerTracking();
    this.setupResizeObserver();
    this.setupIntersectionObserver();

    // 8. Render first frame and smoothly fade in
    this.renderer.render(this.scene, this.camera);
    canvas.classList.add('is-ready');

    this.startLoop();

    this.destroyRef.onDestroy(() => {
      this.cleanup();
    });
  }

  private scheduleNextMeteor(now: number): void {
    // Random interval between 2 and 6 seconds
    const delay = 2000 + Math.random() * 4000;
    this.nextMeteorTime = now + delay;
  }

  private spawnMeteor(now: number): void {
    if (!this.meteorMesh || !this.meteorHeadMesh || this.candidateStarOrigins.length === 0) {
      this.scheduleNextMeteor(now);
      return;
    }

    // Pick an authentic background star from candidates as the birth point
    const randIdx = Math.floor(Math.random() * this.candidateStarOrigins.length);
    const star = this.candidateStarOrigins[randIdx];

    this.meteorP0.x = star.nx * this.aspect;
    this.meteorP0.y = star.ny;
    this.meteorDepth = star.depth;

    if (this.meteorMaterial) {
      this.meteorMaterial.uniforms['uDepth'].value = this.meteorDepth;
    }
    if (this.meteorHeadMaterial) {
      this.meteorHeadMaterial.uniforms['uDepth'].value = this.meteorDepth;
    }

    // Determine angle: downward trajectory angled left or right
    let angle: number;
    if (this.meteorP0.x < -0.15 * this.aspect) {
      angle = -Math.PI * (0.16 + Math.random() * 0.20); // -29 deg to -65 deg (down-right)
    } else if (this.meteorP0.x > 0.15 * this.aspect) {
      angle = -Math.PI * (0.64 + Math.random() * 0.20); // -115 deg to -151 deg (down-left)
    } else {
      angle = Math.random() > 0.5
        ? -Math.PI * (0.16 + Math.random() * 0.20)
        : -Math.PI * (0.64 + Math.random() * 0.20);
    }

    // Noticeably slower, majestic duration: 1.8s to 2.7s
    this.meteorDuration = 1.8 + Math.random() * 0.9;
    // Controlled distance so it stays within the visible viewport: 0.85 to 1.25 units
    const distance = 0.85 + Math.random() * 0.40;
    const speed = distance / this.meteorDuration;

    this.meteorV.x = Math.cos(angle) * speed;
    this.meteorV.y = Math.sin(angle) * speed;

    // Normal vector for aerodynamic & celestial curvature
    const nx = -Math.sin(angle);
    const ny = Math.cos(angle);
    const curvatureAmp = (Math.random() - 0.45) * 0.25;
    const gravityY = -0.10;

    this.meteorA.x = nx * curvatureAmp;
    this.meteorA.y = ny * curvatureAmp + gravityY;

    this.meteorStartTime = now;
    this.isMeteorActive = true;
    this.meteorMesh.visible = true;
    this.meteorHeadMesh.visible = true;
  }

  private updateMeteorGeometry(tau: number): void {
    if (!this.meteorGeometry || !this.meteorMaterial || !this.meteorHeadMesh || !this.meteorHeadMaterial) return;

    const tHead = tau * this.meteorDuration;
    // Tail expands dynamically during peak ablation and evaporates cleanly as it dissipates
    const burnoutFactor = Math.max(0.0, 1.0 - Math.pow(Math.max(0.0, tau - 0.65) / 0.35, 1.5));
    const trailSpan = (0.14 + 0.12 * Math.sin(tau * Math.PI)) * this.meteorDuration * burnoutFactor;
    const tTail = Math.max(0.0, tHead - trailSpan);

    const posAttr = this.meteorGeometry.attributes['position'] as THREE_TYPES.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const N = 32;

    const P0x = this.meteorP0.x;
    const P0y = this.meteorP0.y;
    const Vx = this.meteorV.x;
    const Vy = this.meteorV.y;
    const Ax = this.meteorA.x;
    const Ay = this.meteorA.y;

    // Width scales with depth for dramatic atmospheric perspective:
    // Distant meteors: thin ~0.0026 units (fine needle streak)
    // Foreground meteors: wide ~0.0084 units (prominent luminous streak)
    const maxWidth = 0.0026 + 0.0058 * Math.pow(this.meteorDepth, 1.2);

    for (let k = 0; k <= N; k++) {
      const beta = k / N; // 0 at tail, 1 at head
      const tk = tTail + (tHead - tTail) * beta;

      const px = P0x + Vx * tk + 0.5 * Ax * tk * tk;
      const py = P0y + Vy * tk + 0.5 * Ay * tk * tk;

      const tx = Vx + Ax * tk;
      const ty = Vy + Ay * tk;
      const tLen = Math.sqrt(tx * tx + ty * ty) || 1.0;
      const nx = -ty / tLen;
      const ny = tx / tLen;

      // Realistic width envelope: needle tip at head, tapering tail
      const w = maxWidth * Math.sin(beta * Math.PI * 0.5) * (1.0 - 0.70 * (1.0 - beta));

      const iLeft = k * 6;
      posArray[iLeft] = px + nx * w;
      posArray[iLeft + 1] = py + ny * w;
      posArray[iLeft + 2] = 0.05;

      posArray[iLeft + 3] = px - nx * w;
      posArray[iLeft + 4] = py - ny * w;
      posArray[iLeft + 5] = 0.05;
    }

    posAttr.needsUpdate = true;

    // Head particle position & perspective scale
    const headPx = P0x + Vx * tHead + 0.5 * Ax * tHead * tHead;
    const headPy = P0y + Vy * tHead + 0.5 * Ay * tHead * tHead;
    this.meteorHeadMesh.position.set(headPx, headPy, 0.06);
    const headScale = 0.45 + 0.55 * this.meteorDepth;
    this.meteorHeadMesh.scale.set(headScale, headScale, 1.0);

    this.meteorMaterial.uniforms['uLife'].value = tau;
    this.meteorHeadMaterial.uniforms['uLife'].value = tau;
  }

  private triggerRipple(ndcX: number, ndcY: number): void {
    const r = this.ripples[this.rippleIndex];
    r.origin.x = ndcX;
    r.origin.y = ndcY;
    r.startTime = performance.now();
    r.active = true;

    const suffix = (this.rippleIndex + 1).toString();
    if (this.material) {
      const uOrigin = this.material.uniforms[`uRippleOrigin${suffix}`]?.value as { set: (x: number, y: number) => void };
      if (uOrigin?.set) uOrigin.set(ndcX, ndcY);
      this.material.uniforms[`uRippleTime${suffix}`].value = 0.0;
      this.material.uniforms[`uRippleStrength${suffix}`].value = 1.0;
    }

    this.rippleIndex = (this.rippleIndex + 1) % 2;
    this.lastInteractionTime = performance.now();
  }

  private updateCanvasRect(): void {
    if (!this.elementRef) return;
    const r = this.elementRef.nativeElement.getBoundingClientRect();
    this.canvasRect = {
      left: r.left + window.scrollX,
      top: r.top + window.scrollY,
      width: r.width,
      height: r.height
    };
  }

  private setupPointerTracking(): void {
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      this.targetCalmStrength = 1.0;
      this.lastInteractionTime = performance.now();

      const pageX =
        'touches' in e && e.touches.length > 0 ? e.touches[0].pageX : (e as MouseEvent).pageX;
      const pageY =
        'touches' in e && e.touches.length > 0 ? e.touches[0].pageY : (e as MouseEvent).pageY;

      const w = this.canvasRect.width || this.width || 1;
      const h = this.canvasRect.height || this.height || 1;
      const relX = pageX - this.canvasRect.left;
      const relY = pageY - this.canvasRect.top;

      const ndcX = (relX / w) * 2.0 - 1.0;
      const ndcY = -((relY / h) * 2.0 - 1.0);

      this.targetMouse.x = ndcX * this.aspect;
      this.targetMouse.y = ndcY;

      if (this.currentCalmStrength <= 0.01) {
        this.currentMouse.x = this.targetMouse.x;
        this.currentMouse.y = this.targetMouse.y;
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      this.lastInteractionTime = performance.now();
      const pageX =
        'touches' in e && e.touches.length > 0 ? e.touches[0].pageX : (e as MouseEvent).pageX;
      const pageY =
        'touches' in e && e.touches.length > 0 ? e.touches[0].pageY : (e as MouseEvent).pageY;

      if (pageX === undefined || pageY === undefined) return;

      const w = this.canvasRect.width || this.width || 1;
      const h = this.canvasRect.height || this.height || 1;
      const relX = pageX - this.canvasRect.left;
      const relY = pageY - this.canvasRect.top;

      // Only trigger ripple if click occurred near or within this canvas section
      if (relX >= -100 && relX <= w + 100 && relY >= -100 && relY <= h + 100) {
        const ndcX = ((relX / w) * 2.0 - 1.0) * this.aspect;
        const ndcY = -((relY / h) * 2.0 - 1.0);
        this.triggerRipple(ndcX, ndcY);
      }
    };

    const onPointerLeave = () => {
      this.targetCalmStrength = 0.0;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('blur', onPointerLeave);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
    });
  }

  private setupResizeObserver(): void {
    const hostEl = this.elementRef.nativeElement;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          this.handleResize(width, height);
        }
      }
    });
    ro.observe(hostEl);

    // Synchronous resize listener for instantaneous update during browser dragging
    const onWinResize = () => {
      const rect = hostEl.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        this.handleResize(rect.width, rect.height);
      }
    };
    window.addEventListener('resize', onWinResize, { passive: true });

    const onScroll = () => {
      this.updateCanvasRect();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Halt render loop entirely when tab is hidden to conserve 100% CPU/GPU and battery
    const onVisibilityChange = () => {
      if (document.hidden) {
        this.stopLoop();
      } else if (this.isIntersecting) {
        this.startLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    this.destroyRef.onDestroy(() => {
      ro.disconnect();
      window.removeEventListener('resize', onWinResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    });
  }

  private handleResize(w: number, h: number): void {
    if (w <= 0 || h <= 0) return;
    this.width = w;
    this.height = h;
    this.aspect = w / h;

    this.updateCanvasRect();

    if (!this.renderer || !this.camera) return;

    const isMobile = w < 768;
    const maxDpr = isMobile ? 1.2 : 1.5;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);

    this.camera.left = -this.aspect;
    this.camera.right = this.aspect;
    this.camera.top = 1.0;
    this.camera.bottom = -1.0;
    this.camera.updateProjectionMatrix();

    if (this.material) {
      this.material.uniforms['uAspect'].value = this.aspect;
      this.material.uniforms['uMouseRadius'].value = isMobile ? 0.48 : 0.60;
      this.material.uniforms['uPixelRatio'].value = dpr;
    }

    // Render immediately to prevent black flashes or empty regions while resizing
    if (this.scene) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  private setupIntersectionObserver(): void {
    const hostEl = this.elementRef.nativeElement;

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
      { threshold: 0.05 }
    );

    io.observe(hostEl);

    this.destroyRef.onDestroy(() => {
      io.disconnect();
    });
  }

  private startLoop(): void {
    if (this.isLoopRunning || !this.isIntersecting || (typeof document !== 'undefined' && document.hidden)) return;
    this.isLoopRunning = true;
    if (this.startTime === 0) {
      this.startTime = performance.now();
    }
    this.lastFrameTime = performance.now();
    this.tick();
  }

  private stopLoop(): void {
    this.isLoopRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = 0;
    }
  }

  private tick = (): void => {
    if (!this.isLoopRunning) return;

    const now = performance.now();

    // 1. Process Ripples
    for (let i = 0; i < 2; i++) {
      const rip = this.ripples[i];
      const suffix = (i + 1).toString();
      if (rip.active) {
        const age = (now - rip.startTime) * 0.001;
        if (age > 1.6) {
          rip.active = false;
          if (this.material) {
            this.material.uniforms[`uRippleStrength${suffix}`].value = 0.0;
          }
        } else {
          const decay = Math.max(0, 1.0 - age / 1.6);
          if (this.material) {
            this.material.uniforms[`uRippleTime${suffix}`].value = age;
            this.material.uniforms[`uRippleStrength${suffix}`].value = decay * decay;
          }
        }
      }
    }

    // 2. Process Shooting Star / Meteor
    if (!this.isMeteorActive && this.isIntersecting && now >= this.nextMeteorTime) {
      this.spawnMeteor(now);
    }

    if (this.isMeteorActive) {
      const elapsed = (now - this.meteorStartTime) * 0.001;
      const progress = elapsed / this.meteorDuration;
      if (progress >= 1.0) {
        this.isMeteorActive = false;
        if (this.meteorMesh) this.meteorMesh.visible = false;
        if (this.meteorHeadMesh) this.meteorHeadMesh.visible = false;
        this.scheduleNextMeteor(now);
      } else {
        this.updateMeteorGeometry(progress);
      }
    }

    // Adaptive Frame Budgeting:
    // When pointer recently moved, ripple active, or meteor streaking -> 60 FPS (16ms)
    // When reading / idle -> 30 FPS (33ms) to reduce CPU & GPU energy drain by 50%
    const hasActiveRipple = this.ripples[0].active || this.ripples[1].active;
    const isInteracting =
      now - this.lastInteractionTime < 1400 ||
      this.targetCalmStrength > 0.05 ||
      hasActiveRipple ||
      this.isMeteorActive;
    const targetInterval = isInteracting ? 16 : 33.3;

    const delta = now - this.lastFrameTime;
    if (delta < targetInterval - 1.5) {
      this.animFrameId = requestAnimationFrame(this.tick);
      return;
    }
    this.lastFrameTime = now - (delta % targetInterval);

    const elapsedTime = (now - this.startTime) * 0.001;

    // Fluid responsive pointer tracking
    const prevX = this.currentMouse.x;
    const prevY = this.currentMouse.y;
    this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * 0.12;
    this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * 0.12;

    // Smooth kinematic velocity with responsive damping
    const instVx = this.currentMouse.x - prevX;
    const instVy = this.currentMouse.y - prevY;
    this.mouseVelocity.x += (instVx - this.mouseVelocity.x) * 0.22;
    this.mouseVelocity.y += (instVy - this.mouseVelocity.y) * 0.22;

    // Smooth exponential fade for calm strength
    this.currentCalmStrength += (this.targetCalmStrength - this.currentCalmStrength) * 0.08;

    if (this.material) {
      this.material.uniforms['uTime'].value = elapsedTime;
      const uMouse = this.material.uniforms['uMouse'].value as { set: (x: number, y: number) => void };
      if (uMouse?.set) uMouse.set(this.currentMouse.x, this.currentMouse.y);

      const uMouseVelocity = this.material.uniforms['uMouseVelocity'].value as { set: (x: number, y: number) => void };
      if (uMouseVelocity?.set) uMouseVelocity.set(this.mouseVelocity.x, this.mouseVelocity.y);

      this.material.uniforms['uCalmStrength'].value = this.currentCalmStrength;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }

    this.animFrameId = requestAnimationFrame(this.tick);
  };

  private cleanup(): void {
    this.stopLoop();

    const canvas = this.canvasRef()?.nativeElement;
    if (canvas) {
      canvas.classList.remove('is-ready');
    }

    if (this.geometry) {
      this.geometry.dispose();
      this.geometry = null;
    }

    if (this.material) {
      this.material.dispose();
      this.material = null;
    }

    if (this.points && this.scene) {
      this.scene.remove(this.points);
      this.points = null;
    }

    if (this.meteorGeometry) {
      this.meteorGeometry.dispose();
      this.meteorGeometry = null;
    }

    if (this.meteorMaterial) {
      this.meteorMaterial.dispose();
      this.meteorMaterial = null;
    }

    if (this.meteorMesh && this.scene) {
      this.scene.remove(this.meteorMesh);
      this.meteorMesh = null;
    }

    if (this.meteorHeadGeometry) {
      this.meteorHeadGeometry.dispose();
      this.meteorHeadGeometry = null;
    }

    if (this.meteorHeadMaterial) {
      this.meteorHeadMaterial.dispose();
      this.meteorHeadMaterial = null;
    }

    if (this.meteorHeadMesh && this.scene) {
      this.scene.remove(this.meteorHeadMesh);
      this.meteorHeadMesh = null;
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer = null;
    }

    this.scene = null;
    this.camera = null;
  }

  private createPrng(seed = 20261017): () => number {
    let s = seed;
    return () => {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };
  }
}

export { StarfieldCanvas as HeroCanvas };
