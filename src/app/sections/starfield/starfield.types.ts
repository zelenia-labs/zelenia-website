export interface StarCandidate {
  nx: number;
  ny: number;
  depth: number;
}

export interface CanvasRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface GravityState {
  isHolding: boolean;
  holdDuration: number;
  targetPos: { x: number; y: number };
  currentPos: { x: number; y: number };
  currentStrength: number;
  currentRadius: number;
}

export interface MeteorKinematics {
  isActive: boolean;
  startTime: number;
  duration: number;
  depth: number;
  nextSpawnTime: number;
  p0: { x: number; y: number };
  v: { x: number; y: number };
  a: { x: number; y: number };
}

export interface StarfieldNotice {
  reason: 'reduced-motion' | 'battery-saver' | 'data-saver' | 'slow-connection';
  message: string;
  instruction: string;
  actionText: string;
}

