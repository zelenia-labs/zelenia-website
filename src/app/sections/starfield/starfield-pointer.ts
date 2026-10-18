import { DestroyRef } from '@angular/core';
import { CanvasRect } from './starfield.types';
import { StarfieldPhysics } from './starfield-physics';

export class StarfieldPointerManager {
  private lastInteractionTime = 0;

  constructor(
    private readonly physics: StarfieldPhysics,
    private readonly destroyRef: DestroyRef,
    private readonly getContext: () => { canvasRect: CanvasRect; aspect: number; width: number; height: number; updateRect: () => void }
  ) {}

  get lastInteraction(): number {
    return this.lastInteractionTime;
  }

  touchInteraction(): void {
    this.lastInteractionTime = performance.now();
  }

  setup(): void {
    if (typeof window === 'undefined') return;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      this.physics.targetCalmStrength = 1.0;
      this.lastInteractionTime = performance.now();

      const pageX = 'touches' in e && e.touches.length > 0 ? e.touches[0].pageX : (e as MouseEvent).pageX;
      const pageY = 'touches' in e && e.touches.length > 0 ? e.touches[0].pageY : (e as MouseEvent).pageY;

      const { canvasRect, aspect } = this.getContext();
      const coords = this.physics.convertPointerToNDC(pageX, pageY, canvasRect, aspect);
      this.physics.targetMouse.x = coords.aspectX;
      this.physics.targetMouse.y = coords.ndcY;

      if (this.physics.currentCalmStrength <= 0.01) {
        this.physics.currentMouse.x = this.physics.targetMouse.x;
        this.physics.currentMouse.y = this.physics.targetMouse.y;
      }

      if (this.physics.gravityState.isHolding) {
        this.physics.gravityState.targetPos.x = coords.aspectX;
        this.physics.gravityState.targetPos.y = coords.ndcY;
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, select, [role="button"]')) return;

      this.lastInteractionTime = performance.now();
      const pageX = 'touches' in e && e.touches.length > 0 ? e.touches[0].pageX : (e as MouseEvent).pageX;
      const pageY = 'touches' in e && e.touches.length > 0 ? e.touches[0].pageY : (e as MouseEvent).pageY;
      if (pageX === undefined || pageY === undefined) return;

      const ctx = this.getContext();
      ctx.updateRect();
      const w = ctx.canvasRect.width || ctx.width || 1;
      const h = ctx.canvasRect.height || ctx.height || 1;
      const relX = pageX - ctx.canvasRect.left;
      const relY = pageY - ctx.canvasRect.top;

      if (relX >= -100 && relX <= w + 100 && relY >= -100 && relY <= h + 100) {
        const coords = this.physics.convertPointerToNDC(pageX, pageY, ctx.canvasRect, ctx.aspect);
        this.physics.engageGravity(coords.aspectX, coords.ndcY);
      }
    };

    const onPointerUp = () => {
      this.physics.releaseGravity();
      this.lastInteractionTime = performance.now();
    };

    const onPointerLeave = () => {
      this.physics.targetCalmStrength = 0.0;
      this.physics.releaseGravity();
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mousedown', onPointerDown, { passive: true });
    window.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mouseup', onPointerUp, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });
    window.addEventListener('touchcancel', onPointerUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('blur', onPointerLeave);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('touchcancel', onPointerUp);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
    });
  }
}
