import type * as THREE_TYPES from 'three';
import { StarfieldMeteorManager } from './starfield-meteor';

export function createPrng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function generateStarfieldGeometry(
  width: number,
  aspect: number,
  meteors: StarfieldMeteorManager,
  THREE: typeof THREE_TYPES
): THREE_TYPES.BufferGeometry {
  const isMobile = width < 768;
  const cols = isMobile ? 28 : 44;
  const rows = isMobile ? 24 : 36;
  const particleCount = cols * rows;

  const positions = new Float32Array(particleCount * 3);
  const basePos = new Float32Array(particleCount * 2);
  const depths = new Float32Array(particleCount);
  const seeds = new Float32Array(particleCount);

  meteors.candidateStarOrigins = [];
  meteors.candidateStarsUpward = [];
  meteors.candidateStarsDownward = [];
  const rand = createPrng(20261017);

  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = ((c + 0.5) / cols) * 2.16 - 1.08;
      const v = ((r + 0.5) / rows) * 2.16 - 1.08;
      const nx = u + (rand() - 0.5) * (2.16 / cols) * 1.7;
      const ny = v + (rand() - 0.5) * (2.16 / rows) * 1.7;

      const rDepth = rand();
      const depth =
        rDepth > 0.90
          ? 0.80 + rand() * 0.20
          : rDepth > 0.55
          ? 0.40 + rand() * 0.35
          : 0.10 + rand() * 0.25;

      positions[idx * 3] = nx * aspect;
      positions[idx * 3 + 1] = ny;
      positions[idx * 3 + 2] = (depth - 0.5) * 0.2;

      basePos[idx * 2] = nx;
      basePos[idx * 2 + 1] = ny;
      depths[idx] = depth;
      seeds[idx] = rand();

      if (Math.abs(nx) < 0.78 && depth > 0.12) {
        const cand = { nx, ny, depth };
        meteors.candidateStarOrigins.push(cand);
        if (ny >= -0.75 && ny <= 0.15) {
          meteors.candidateStarsUpward.push(cand);
        } else if (ny > 0.15 && ny <= 0.85) {
          meteors.candidateStarsDownward.push(cand);
        }
      }
      idx++;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aBasePos', new THREE.BufferAttribute(basePos, 2));
  geometry.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

  return geometry;
}
