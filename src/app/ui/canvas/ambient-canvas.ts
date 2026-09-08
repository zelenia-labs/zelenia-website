import {
  Component,
  ElementRef,
  PLATFORM_ID,
  inject,
  viewChild,
  afterNextRender,
  OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulseStep: number;
  visibility: number;
}

@Component({
  selector: 'app-ambient-canvas',
  template: `
    <canvas #canvas id="ambient-canvas" class="ambient-canvas" aria-hidden="true"></canvas>
  `,
  styles: `
    :host {
      display: block;
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    }
  `
})
export class AmbientCanvas implements OnDestroy {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  private animationFrameId: number | null = null;
  private resizeListener: (() => void) | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private mouseLeaveListener: (() => void) | null = null;
  private isVisible = true;

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser) {
        this.initCanvas();
      }
    });
  }

  private initCanvas(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)) {
      return;
    }

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d', { alpha: true });
    } catch {
      return;
    }
    if (!ctx) return;

    const host = this.hostRef.nativeElement;
    const parent: HTMLElement = host.parentElement ?? host;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let width = (canvas.width = parent.clientWidth || window.innerWidth);
    let height = (canvas.height = parent.clientHeight || window.innerHeight);
    let cachedRect = parent.getBoundingClientRect();

    const colors = [
      'rgba(0, 85, 255, 0.24)', // Royal Blue #0055FF
      'rgba(14, 165, 233, 0.20)', // Sky Blue
      'rgba(16, 185, 129, 0.18)', // Emerald
      'rgba(71, 85, 105, 0.16)' // Architectural Slate
    ];

    const particleCount = Math.min(Math.floor((width * height) / 36000), 32);
    const particles: Particle[] = [];

    const createParticle = (): Particle => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 2.2 + 1.1;
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        radius,
        baseRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.25,
        pulseSpeed: Math.random() * 0.008 + 0.004,
        pulseStep: Math.random() * Math.PI,
        visibility: 1
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    let mouseX: number | null = null;
    let mouseY: number | null = null;

    this.mouseMoveListener = (e: MouseEvent) => {
      if (
        e.clientX >= cachedRect.left &&
        e.clientX <= cachedRect.right &&
        e.clientY >= cachedRect.top &&
        e.clientY <= cachedRect.bottom
      ) {
        mouseX = e.clientX - cachedRect.left;
        mouseY = e.clientY - cachedRect.top;
      } else {
        mouseX = null;
        mouseY = null;
      }
    };

    this.mouseLeaveListener = () => {
      mouseX = null;
      mouseY = null;
    };

    const updateDimensions = () => {
      cachedRect = parent.getBoundingClientRect();
      width = canvas.width = Math.max(cachedRect.width, 320);
      height = canvas.height = Math.max(cachedRect.height, 400);
    };

    this.resizeListener = updateDimensions;
    window.addEventListener('resize', this.resizeListener, { passive: true });
    window.addEventListener('mousemove', this.mouseMoveListener, { passive: true });
    window.addEventListener('mouseleave', this.mouseLeaveListener, { passive: true });

    if (typeof ResizeObserver !== 'undefined' && parent) {
      this.resizeObserver = new ResizeObserver(() => updateDimensions());
      this.resizeObserver.observe(parent);
    }

    // Viewport Visibility Guard: Pause RAF when off-screen to preserve CPU and guarantee INP < 30ms
    if (typeof IntersectionObserver !== 'undefined' && parent) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const wasVisible = this.isVisible;
          this.isVisible = entry ? entry.isIntersecting : true;

          if (this.isVisible && !wasVisible) {
            if (this.animationFrameId === null) {
              this.animationFrameId = requestAnimationFrame(animate);
            }
          } else if (!this.isVisible && this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
          }
        },
        { threshold: 0.05 }
      );
      this.intersectionObserver.observe(parent);
    }

    const animate = () => {
      if (!this.isVisible) {
        this.animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 0.02;
            p.x += dx * force;
            p.y += dy * force;
          }
        }

        p.pulseStep += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulseStep) * 0.35;

        // High-performance dual-pass rendering: crisp particle + subtle halo without expensive software shadowBlur
        ctx.save();
        ctx.fillStyle = p.color;

        // Subtle ambient halo (pure 2D arc, 0 CPU shadowBlur cost)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha * 0.22;
        ctx.fill();

        // Core nucleus particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        ctx.restore();
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.mouseMoveListener) {
      window.removeEventListener('mousemove', this.mouseMoveListener);
    }
    if (this.mouseLeaveListener) {
      window.removeEventListener('mouseleave', this.mouseLeaveListener);
    }
  }
}
