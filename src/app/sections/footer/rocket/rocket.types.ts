/**
 * High-performance WebGL particle definition with dual-mode blending:
 * Pure additive luminosity for fire/plasma, and smooth alpha occlusion for dense smoke.
 */
export interface RocketParticle {
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

export const MAX_ROCKET_PARTICLES = 2000;
export const FLOATS_PER_PARTICLE = 7;
