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
  selector: 'app-hero-canvas',
  template: `
    <canvas
      #canvas
      class="hero-canvas"
      aria-hidden="true"
    ></canvas>
    <img
      src="/hero-starfield-static.svg"
      alt=""
      class="hero-canvas-snapshot"
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

    .hero-canvas {
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-canvas.is-ready {
      opacity: 1;
    }

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
      .hero-canvas {
        display: none !important;
      }

      .hero-canvas-snapshot {
        display: block !important;
      }
    }

    /* Battery & Hardware Conservation: When Low Power / Battery <= 20% is detected */
    :host(.is-low-power) .hero-canvas {
      display: none !important;
    }

    :host(.is-low-power) .hero-canvas-snapshot {
      display: block !important;
    }
  `
})
export class HeroCanvas {
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
    const hostEl = this.elementRef.nativeElement;

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
        idx++;
      }
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aBasePos', new THREE.BufferAttribute(basePos, 2));
    this.geometry.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1));
    this.geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    // 5. Half-Precision GPU Shader with Crisp Celestial Core & Glowing Accents
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
        uniform float uAspect;
        uniform float uPixelRatio;
        uniform float uReducedMotion;

        attribute vec2 aBasePos;
        attribute float aDepth;
        attribute float aSeed;

        varying float vAlpha;
        varying float vDepth;
        varying float vCalm;
        varying float vCoreRadius;
        varying float vInvTotalSize;

        void main() {
          vec2 pos = vec2(aBasePos.x * uAspect, aBasePos.y);

          vec2 toMouse = pos - uMouse;
          float distToMouse = length(toMouse);

          float motionSpeed = 0.32;
          float t = uTime * motionSpeed;

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

          vec2 kinematicDisplacement = mix(ambientMotion, laminarDrift, calm);
          vec2 fluidWake = uMouseVelocity * calm * (0.05 * (1.0 - aDepth * 0.35));
          pos += kinematicDisplacement + fluidWake;

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

          // Opacity matching static SVG snapshot
          float baseAlpha = mix(0.18, 0.72, pow(effectiveDepth, 1.3));
          float twinkle = sin(uTime * 1.0 + aSeed * 50.0) * (0.03 + effectiveDepth * 0.05);
          float finalAlpha = clamp(baseAlpha + twinkle, 0.08, 0.85) * mix(0.30, 1.0, textClearing);
          finalAlpha *= (1.0 + calm * 0.15);

          vAlpha = clamp(finalAlpha, 0.0, 0.90);
          vDepth = effectiveDepth;
        }
      `,
      fragmentShader: `
        precision mediump float;

        varying float vAlpha;
        varying float vDepth;
        varying float vCalm;
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

          // Subtle kinetic calm illumination
          starColor = mix(starColor, vec3(0.78, 0.82, 0.88), vCalm * 0.15);

          gl_FragColor = vec4(starColor, vAlpha * shape);
        }
      `
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);

    // 6. Setup Listeners & Observers
    this.setupPointerTracking();
    this.setupResizeObserver();
    this.setupIntersectionObserver();

    // 7. Render first frame and smoothly fade in
    this.renderer.render(this.scene, this.camera);
    canvas.classList.add('is-ready');

    this.startLoop();

    this.destroyRef.onDestroy(() => {
      this.cleanup();
    });
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

    const onPointerLeave = () => {
      this.targetCalmStrength = 0.0;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('blur', onPointerLeave);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
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

    // Adaptive Frame Budgeting:
    // When pointer recently moved -> 60 FPS (16ms) for fluid kinetic response
    // When reading / idle -> 30 FPS (33ms) to reduce CPU & GPU energy drain by 50%
    const isInteracting = (now - this.lastInteractionTime) < 1400 || this.targetCalmStrength > 0.05;
    const targetInterval = isInteracting ? 16 : 33.3;

    const delta = now - this.lastFrameTime;
    if (delta < targetInterval - 1.5) {
      this.animFrameId = requestAnimationFrame(this.tick);
      return;
    }
    this.lastFrameTime = now - (delta % targetInterval);

    const elapsedTime = (now - this.startTime) * 0.001;

    // Smooth exponential approach for mouse coordinates
    const prevX = this.currentMouse.x;
    const prevY = this.currentMouse.y;
    this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * 0.07;
    this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * 0.07;

    // Compute smooth kinematic velocity
    const instVx = this.currentMouse.x - prevX;
    const instVy = this.currentMouse.y - prevY;
    this.mouseVelocity.x += (instVx - this.mouseVelocity.x) * 0.18;
    this.mouseVelocity.y += (instVy - this.mouseVelocity.y) * 0.18;

    // Smooth exponential fade for calm strength
    this.currentCalmStrength += (this.targetCalmStrength - this.currentCalmStrength) * 0.045;

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
