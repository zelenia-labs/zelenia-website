import { CanvasRect, GravityState } from './starfield.types';

export class StarfieldPhysics {
  readonly gravityState: GravityState = {
    isHolding: false,
    holdDuration: 0,
    targetPos: { x: 0, y: 0 },
    currentPos: { x: 0, y: 0 },
    currentStrength: 0,
    currentRadius: 0
  };

  readonly targetMouse = { x: 0.0, y: 0.0 };
  readonly currentMouse = { x: 0.0, y: 0.0 };
  readonly mouseVelocity = { x: 0.0, y: 0.0 };
  targetCalmStrength = 0.0;
  currentCalmStrength = 0.0;

  convertPointerToNDC(
    pageX: number,
    pageY: number,
    canvasRect: CanvasRect,
    aspect: number
  ): { ndcX: number; ndcY: number; aspectX: number } {
    const w = canvasRect.width || 1;
    const h = canvasRect.height || 1;
    const relX = pageX - canvasRect.left;
    const relY = pageY - canvasRect.top;

    const ndcX = (relX / w) * 2.0 - 1.0;
    const ndcY = -((relY / h) * 2.0 - 1.0);
    return { ndcX, ndcY, aspectX: ndcX * aspect };
  }

  engageGravity(x: number, y: number): void {
    const s = this.gravityState;
    s.isHolding = true;
    s.holdDuration = 0.0;
    s.targetPos.x = x;
    s.targetPos.y = y;

    // Immediate initial gravitational impulse on click so tap/start is immediately perceptible
    if (s.currentStrength < 0.35) {
      s.currentStrength = 0.35;
      s.currentRadius = 0.45;
      s.currentPos.x = x;
      s.currentPos.y = y;
    }
  }

  releaseGravity(): void {
    this.gravityState.isHolding = false;
  }

  updateGravity(dt: number): void {
    const s = this.gravityState;

    if (s.isHolding) {
      s.holdDuration += dt;
      // Progressive expansion: starts visibly at ~0.45, scaling up to ~3.8 over 3.2s
      const targetRadius = 0.45 + Math.pow(Math.min(s.holdDuration / 3.2, 1.0), 1.25) * 3.35;
      s.currentRadius += (targetRadius - s.currentRadius) * 0.12;
      s.currentStrength += (1.0 - s.currentStrength) * 0.10;

      s.currentPos.x += (s.targetPos.x - s.currentPos.x) * 0.18;
      s.currentPos.y += (s.targetPos.y - s.currentPos.y) * 0.18;
    } else if (s.currentStrength > 0.0005) {
      // Elegant, graceful release: stars glide back smoothly without aggressive snapping
      s.currentStrength += (0.0 - s.currentStrength) * 0.038;
      s.currentRadius += (0.0 - s.currentRadius) * 0.032;
      s.holdDuration = Math.max(0, s.holdDuration - dt * 0.7);

      if (s.currentStrength <= 0.0005) {
        s.currentStrength = 0.0;
        s.currentRadius = 0.0;
        s.holdDuration = 0.0;
      }
    }
  }

  updatePointerVelocity(): void {
    const prevX = this.currentMouse.x;
    const prevY = this.currentMouse.y;
    this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * 0.12;
    this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * 0.12;

    const instVx = this.currentMouse.x - prevX;
    const instVy = this.currentMouse.y - prevY;
    this.mouseVelocity.x += (instVx - this.mouseVelocity.x) * 0.22;
    this.mouseVelocity.y += (instVy - this.mouseVelocity.y) * 0.22;

    this.currentCalmStrength += (this.targetCalmStrength - this.currentCalmStrength) * 0.08;
  }
}
