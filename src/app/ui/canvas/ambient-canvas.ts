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
      display: contents;
    }
  `
})
export class AmbientCanvas implements OnDestroy {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  private animationFrameId: number | null = null;
  private resizeListener: (() => void) | null = null;
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private mouseLeaveListener: (() => void) | null = null;

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

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      'rgba(0, 85, 255, 0.45)', // Royal Blue #0055FF
      'rgba(0, 229, 255, 0.35)', // Cyan
      'rgba(16, 185, 129, 0.35)', // Emerald
      'rgba(248, 250, 252, 0.35)' // Soft White
    ];

    const particleCount = Math.min(Math.floor((width * height) / 38000), 40);
    const particles: Particle[] = [];

    const createParticle = (): Particle => {
      const spawnLeft = Math.random() < 0.5;
      const flankWidth = width > 900 ? width * 0.22 : width * 0.16;
      const x = spawnLeft ? Math.random() * flankWidth : width - Math.random() * flankWidth;
      const y = Math.random() * height;
      const radius = Math.random() * 2.2 + 1.2;
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius,
        baseRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.25,
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
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    this.mouseLeaveListener = () => {
      mouseX = null;
      mouseY = null;
    };

    this.resizeListener = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', this.resizeListener, { passive: true });
    window.addEventListener('mousemove', this.mouseMoveListener, { passive: true });
    window.addEventListener('mouseleave', this.mouseLeaveListener, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const sanctuaryRadius =
        width > 900 ? Math.min(width * 0.34, 520) : Math.min(width * 0.3, 320);
      const fadeBuffer = 140;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const distFromCenter = Math.abs(p.x - centerX);
        if (distFromCenter < sanctuaryRadius + 60) {
          const pushDir = p.x < centerX ? -1 : 1;
          p.vx += pushDir * 0.01;
        }

        if (distFromCenter <= sanctuaryRadius) {
          p.visibility = 0;
        } else if (distFromCenter < sanctuaryRadius + fadeBuffer) {
          p.visibility = (distFromCenter - sanctuaryRadius) / fadeBuffer;
        } else {
          p.visibility = 1;
        }

        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 0.015;
            p.x += dx * force;
            p.y += dy * force;
          }
        }

        p.pulseStep += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulseStep) * 0.4;

        if (p.visibility > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * p.visibility;
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (this.mouseMoveListener) {
      window.removeEventListener('mousemove', this.mouseMoveListener);
    }
    if (this.mouseLeaveListener) {
      window.removeEventListener('mouseleave', this.mouseLeaveListener);
    }
  }
}
