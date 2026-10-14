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

interface OrganicGlowWash {
  id: string;
  name: string;
  cssVar: string;
  baseXRatio: number;
  baseYRatio: number;
  radiusRatio: number;
  baseScaleX: number;
  baseScaleY: number;
  baseRotation: number;
  r: number;
  g: number;
  b: number;
  baseAlpha: number;
  // Parallax displacement in pixels
  mouseParallaxX: number;
  mouseParallaxY: number;
  scrollParallaxY: number;
  scrollParallaxX: number;
  // Autonomous floating drift
  driftSpeedX: number;
  driftSpeedY: number;
  wanderAmpX: number;
  wanderAmpY: number;
  phaseX: number;
  phaseY: number;
  // Breathing fade cycle
  fadeSpeed: number;
  fadePhase: number;
}

interface DustMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

function parseCssColor(colorStr: string, fallback: [number, number, number]): [number, number, number] {
  if (!colorStr) return fallback;
  const str = colorStr.trim();
  if (str.startsWith('#')) {
    let hex = str.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    if (hex.length >= 6) {
      const num = parseInt(hex.slice(0, 6), 16);
      if (!Number.isNaN(num)) {
        return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
      }
    }
  } else if (str.startsWith('rgb')) {
    const match = str.match(/\d+(\.\d+)?/g);
    if (match && match.length >= 3) {
      return [parseFloat(match[0]), parseFloat(match[1]), parseFloat(match[2])];
    }
  }
  return fallback;
}

@Component({
  selector: 'app-hero-canvas',
  template: `
    <canvas
      #canvas
      class="hero-canvas"
      aria-hidden="true"
    ></canvas>
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
    }
  `
})
export class HeroCanvas {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly elementRef = inject(ElementRef);

  readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private ctx: CanvasRenderingContext2D | null = null;
  private animId = 0;
  private isVisible = true;
  private isDestroyed = false;
  private width = 0;
  private height = 0;
  private dpr = 1;

  // Background colors fetched dynamically from hero.css variables
  private bgStart = '#95afb5';
  private bgEnd = '#829da3';

  // Normalized pointer coordinates: -1 (left/top) to +1 (right/bottom)
  private pointer = {
    normX: 0,
    normY: 0,
    targetNormX: 0,
    targetNormY: 0
  };

  // Scroll tracking
  private scrollY = 0;
  private targetScrollY = 0;

  // Reduced motion multiplier (0.35 if user prefers reduced motion, 1.0 otherwise)
  private motionFactor = 1.0;

  // Organic, morphing atmospheric glow washes fetched from CSS variables in hero.css:
  // - --hero-canvas-bg-start: #95afb5
  // - --hero-canvas-bg-end: #829da3
  // - --hero-canvas-glow-sage: #b5bf9c
  // - --hero-canvas-glow-sand: #f2e5c8
  // - --hero-canvas-glow-charcoal: #586864
  // - --hero-canvas-glow-sage-secondary: #aab896
  private washes: OrganicGlowWash[] = [
    // 1. Charcoal Depth Anchor (Matching --hero-canvas-glow-charcoal, left side behind text)
    {
      id: 'plan-charcoal-depth',
      name: 'Plan Charcoal Contrast Anchor',
      cssVar: '--hero-canvas-glow-charcoal',
      baseXRatio: 0.12,
      baseYRatio: 0.40,
      radiusRatio: 0.68,
      baseScaleX: 1.50,
      baseScaleY: 1.25,
      baseRotation: 0.15,
      r: 88,
      g: 104,
      b: 100, // Fallback #586864
      baseAlpha: 0.45,
      mouseParallaxX: 95,
      mouseParallaxY: 60,
      scrollParallaxY: -0.18,
      scrollParallaxX: 0.08,
      driftSpeedX: 0.00065,
      driftSpeedY: 0.00075,
      wanderAmpX: 75,
      wanderAmpY: 50,
      phaseX: Math.PI * 0.7,
      phaseY: Math.PI * 0.3,
      fadeSpeed: 0.0007,
      fadePhase: Math.PI * 0.7
    },
    // 2. Primary Sage Glow (Matching --hero-canvas-glow-sage, center-right stage)
    {
      id: 'plan-sage-primary',
      name: 'Plan Sage Glow',
      cssVar: '--hero-canvas-glow-sage',
      baseXRatio: 0.62,
      baseYRatio: 0.38,
      radiusRatio: 0.70,
      baseScaleX: 1.45,
      baseScaleY: 1.15,
      baseRotation: -0.26,
      r: 181,
      g: 201,
      b: 148, // Fallback #b5bf9c
      baseAlpha: 0.82,
      mouseParallaxX: 360,
      mouseParallaxY: 200,
      scrollParallaxY: 0.68,
      scrollParallaxX: 0.28,
      driftSpeedX: 0.0008,
      driftSpeedY: 0.00065,
      wanderAmpX: 120,
      wanderAmpY: 80,
      phaseX: 0,
      phaseY: 0.8,
      fadeSpeed: 0.0008,
      fadePhase: 0
    },
    // 3. Sunlit Sand Warmth (Matching --hero-canvas-glow-sand, champagne counter-parallax)
    {
      id: 'plan-sand-warmth',
      name: 'Plan Sand Warmth',
      cssVar: '--hero-canvas-glow-sand',
      baseXRatio: 0.54,
      baseYRatio: 0.22,
      radiusRatio: 0.58,
      baseScaleX: 1.55,
      baseScaleY: 1.05,
      baseRotation: 0.24,
      r: 244,
      g: 230,
      b: 196, // Fallback #f2e5c8
      baseAlpha: 0.46,
      mouseParallaxX: -280,
      mouseParallaxY: -160,
      scrollParallaxY: -0.52,
      scrollParallaxX: -0.22,
      driftSpeedX: 0.00095,
      driftSpeedY: 0.0007,
      wanderAmpX: 130,
      wanderAmpY: 85,
      phaseX: Math.PI * 1.2,
      phaseY: Math.PI * 0.5,
      fadeSpeed: 0.00085,
      fadePhase: Math.PI * 1.2
    },
    // 4. Secondary Soft Sage Ambient (Matching --hero-canvas-glow-sage-secondary)
    {
      id: 'plan-sage-secondary',
      name: 'Plan Soft Sage Atmosphere',
      cssVar: '--hero-canvas-glow-sage-secondary',
      baseXRatio: 0.78,
      baseYRatio: 0.65,
      radiusRatio: 0.60,
      baseScaleX: 1.50,
      baseScaleY: 1.18,
      baseRotation: -0.32,
      r: 170,
      g: 188,
      b: 150, // Fallback #aab896
      baseAlpha: 0.52,
      mouseParallaxX: 220,
      mouseParallaxY: 130,
      scrollParallaxY: 0.42,
      scrollParallaxX: 0.16,
      driftSpeedX: 0.0007,
      driftSpeedY: 0.00085,
      wanderAmpX: 105,
      wanderAmpY: 70,
      phaseX: Math.PI * 0.4,
      phaseY: Math.PI * 1.1,
      fadeSpeed: 0.00075,
      fadePhase: Math.PI * 0.4
    }
  ];

  // Microscopic, peaceful ambient dust motes (only 12 motes, hovering gently, zero snowflake look)
  private dustMotes: DustMote[] = [];

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser) return;
      this.init();
    });

    this.destroyRef.onDestroy(() => {
      this.isDestroyed = true;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
      }
    });
  }

  private init(): void {
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!this.ctx) return;

    const heroSection =
      this.elementRef.nativeElement.closest('.hero-section') ||
      this.elementRef.nativeElement.parentElement;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.motionFactor = 0.35; // Gentle subdued movement instead of hard stop
    }

    // Generate 12 microscopic, serene dust motes (not snow, tiny 0.8px ambient specks)
    this.dustMotes = [];
    const moteCount = 12;
    for (let i = 0; i < moteCount; i++) {
      const baseAlpha = Math.random() * 0.15 + 0.12;
      this.dustMotes.push({
        x: Math.random() * (this.width || 1200),
        y: Math.random() * (this.height || 750),
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        radius: Math.random() * 0.4 + 0.75, // 0.75px to 1.15px
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: 0.0006 + Math.random() * 0.0008,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    const updateColorsFromCss = () => {
      if (!heroSection) return;
      const styles = getComputedStyle(heroSection);
      const bgStartVal = styles.getPropertyValue('--hero-canvas-bg-start').trim();
      const bgEndVal = styles.getPropertyValue('--hero-canvas-bg-end').trim();
      if (bgStartVal) this.bgStart = bgStartVal;
      if (bgEndVal) this.bgEnd = bgEndVal;

      for (const wash of this.washes) {
        const val = styles.getPropertyValue(wash.cssVar).trim();
        if (val) {
          const [r, g, b] = parseCssColor(val, [wash.r, wash.g, wash.b]);
          wash.r = r;
          wash.g = g;
          wash.b = b;
        }
      }
    };

    const resize = () => {
      updateColorsFromCss();
      const rect = heroSection
        ? heroSection.getBoundingClientRect()
        : { width: window.innerWidth, height: 750 };
      this.width = Math.max(rect.width, 320);
      this.height = Math.max(rect.height, 600);
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(this.width * this.dpr);
      canvas.height = Math.floor(this.height * this.dpr);
    };

    resize();

    // ResizeObserver
    if ('ResizeObserver' in window && heroSection) {
      const ro = new ResizeObserver(() => resize());
      ro.observe(heroSection);
      this.destroyRef.onDestroy(() => ro.disconnect());
    } else {
      const onWindowResize = () => resize();
      window.addEventListener('resize', onWindowResize, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('resize', onWindowResize));
    }

    // Direct, highly responsive pointer tracking on window with viewport normalization
    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      let normY = 0;

      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      } else {
        normY = (e.clientY / window.innerHeight - 0.5) * 2;
      }

      this.pointer.targetNormX = Math.max(-1.5, Math.min(1.5, normX));
      this.pointer.targetNormY = Math.max(-1.5, Math.min(1.5, normY));
    };

    const onPointerLeave = () => {
      this.pointer.targetNormX = 0;
      this.pointer.targetNormY = 0;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave, { passive: true });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
    });

    // Scroll listener for scroll parallax
    const onScroll = () => {
      this.targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    onScroll();

    // High performance: Pause when offscreen (CWV conservation)
    if ('IntersectionObserver' in window && heroSection) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const wasVisible = this.isVisible;
            this.isVisible = entry.isIntersecting;
            if (!wasVisible && this.isVisible && !this.animId) {
              this.tick(performance.now());
            }
          }
        },
        { rootMargin: '100px 0px 100px 0px' }
      );
      io.observe(heroSection);
      this.destroyRef.onDestroy(() => io.disconnect());
    }

    // Visibility change
    const onVisibilityChange = () => {
      if (document.hidden) {
        this.isVisible = false;
        if (this.animId) {
          cancelAnimationFrame(this.animId);
          this.animId = 0;
        }
      } else {
        this.isVisible = true;
        if (!this.animId) {
          this.tick(performance.now());
        }
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    this.destroyRef.onDestroy(() =>
      document.removeEventListener('visibilitychange', onVisibilityChange)
    );

    // Start simulation loop
    this.tick(performance.now());
  }

  private tick(time: number): void {
    if (this.isDestroyed || !this.isVisible) {
      this.animId = 0;
      return;
    }

    this.renderFrame(time);
    this.animId = requestAnimationFrame((t) => this.tick(t));
  }

  private renderFrame(time: number): void {
    const ctx = this.ctx;
    if (!ctx || this.width === 0 || this.height === 0) return;

    // Reset base transform and composite mode cleanly each frame
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';

    // Responsive single-stage lerp for fluid mouse tracking
    const mouseLerp = 0.085;
    this.pointer.normX += (this.pointer.targetNormX - this.pointer.normX) * mouseLerp;
    this.pointer.normY += (this.pointer.targetNormY - this.pointer.normY) * mouseLerp;

    // Smooth scroll interpolation
    const scrollLerp = 0.1;
    this.scrollY += (this.targetScrollY - this.scrollY) * scrollLerp;

    // 1. Base Gradient dynamically fetched from hero.css variables (--hero-canvas-bg-start/end)
    const bgGrad = ctx.createLinearGradient(0, 0, this.width, this.height);
    bgGrad.addColorStop(0, this.bgStart);
    bgGrad.addColorStop(1, this.bgEnd);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);


    const minDim = Math.min(this.width, this.height);
    const scrollBloom = 1 + Math.min(this.scrollY / 1400, 0.25);

    // 2. Organic Atmospheric Glow Washes (Matching personalized-plan colors & positions)
    for (const wash of this.washes) {
      const radius = Math.max(minDim * wash.radiusRatio, 300);

      // Autonomous organic floating drift
      const wanderX =
        (Math.sin(time * wash.driftSpeedX + wash.phaseX) * wash.wanderAmpX +
        Math.cos(time * wash.driftSpeedX * 0.45) * (wash.wanderAmpX * 0.35)) * this.motionFactor;
      const wanderY =
        (Math.cos(time * wash.driftSpeedY + wash.phaseY) * wash.wanderAmpY +
        Math.sin(time * wash.driftSpeedY * 0.45) * (wash.wanderAmpY * 0.35)) * this.motionFactor;

      // Mouse parallax: prominent displacement
      const mouseShiftX = this.pointer.normX * wash.mouseParallaxX * this.motionFactor;
      const mouseShiftY = this.pointer.normY * wash.mouseParallaxY * this.motionFactor;

      // Scroll parallax: multi-plane vertical + lateral shift
      const scrollShiftY = this.scrollY * wash.scrollParallaxY * this.motionFactor;
      const scrollShiftX = this.scrollY * wash.scrollParallaxX * this.motionFactor;

      const posX = wash.baseXRatio * this.width + wanderX + mouseShiftX + scrollShiftX;
      const posY = wash.baseYRatio * this.height + wanderY + mouseShiftY + scrollShiftY;

      // Organic breathing & dissolution across screen (controlled amplitude preserving stable contrast)
      const breath = 0.5 + 0.5 * Math.sin(time * wash.fadeSpeed + wash.fadePhase);
      const currentAlpha = wash.baseAlpha * (0.80 + 0.20 * breath);

      // Morphing aspect ratio and orientation
      const mouseTilt = this.pointer.normX * 0.12 * this.motionFactor;
      const morphRotation = wash.baseRotation + mouseTilt + Math.sin(time * 0.0003 + wash.phaseX) * 0.14;
      const morphScaleX = (wash.baseScaleX + Math.sin(time * 0.00035 + wash.phaseX) * 0.16) * scrollBloom;
      const morphScaleY = (wash.baseScaleY + Math.cos(time * 0.0003 + wash.phaseY) * 0.14) * scrollBloom;

      // Draw stretched organic wash via matrix transformation with source-over alpha blending
      ctx.save();
      ctx.translate(posX, posY);
      ctx.rotate(morphRotation);
      ctx.scale(morphScaleX, morphScaleY);

      // Gaussian-like radial gradient profile: rich solid core matching CSS blur(140px)
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      grad.addColorStop(0, `rgba(${wash.r}, ${wash.g}, ${wash.b}, ${currentAlpha})`);
      grad.addColorStop(0.35, `rgba(${wash.r}, ${wash.g}, ${wash.b}, ${currentAlpha * 0.95})`);
      grad.addColorStop(0.65, `rgba(${wash.r}, ${wash.g}, ${wash.b}, ${currentAlpha * 0.55})`);
      grad.addColorStop(0.85, `rgba(${wash.r}, ${wash.g}, ${wash.b}, ${currentAlpha * 0.18})`);
      grad.addColorStop(1, `rgba(${wash.r}, ${wash.g}, ${wash.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // 3. Microscopic Ambient Dust Motes (12 peaceful motes, hovering gently, zero snowflake look)
    const mLen = this.dustMotes.length;
    const dustScrollShift = this.scrollY * -0.15;

    for (let i = 0; i < mLen; i++) {
      const m = this.dustMotes[i];
      m.x += m.vx * this.motionFactor;
      m.y += m.vy * this.motionFactor;

      // Wrap bounds seamlessly
      if (m.x < 0) m.x = this.width;
      else if (m.x > this.width) m.x = 0;
      if (m.y < 0) m.y = this.height;
      else if (m.y > this.height) m.y = 0;

      const pulse = Math.sin(time * m.pulseSpeed + m.pulsePhase);
      const drawAlpha = m.baseAlpha * (0.8 + 0.2 * pulse);

      let renderY = m.y + dustScrollShift;
      renderY = ((renderY % this.height) + this.height) % this.height;

      // Single crisp micro-dot
      ctx.beginPath();
      ctx.arc(m.x, renderY, m.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${drawAlpha})`;
      ctx.fill();
    }
  }
}


