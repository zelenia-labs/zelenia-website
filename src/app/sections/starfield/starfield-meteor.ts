import type * as THREE_TYPES from 'three';
import { StarCandidate } from './starfield.types';
import {
  meteorFragmentShader,
  meteorHeadFragmentShader,
  meteorHeadVertexShader,
  meteorVertexShader
} from './starfield-shaders';

export class StarfieldMeteorManager {
  candidateStarOrigins: StarCandidate[] = [];
  candidateStarsUpward: StarCandidate[] = [];
  candidateStarsDownward: StarCandidate[] = [];

  meteorMesh: THREE_TYPES.Mesh | null = null;
  meteorGeometry: THREE_TYPES.BufferGeometry | null = null;
  meteorMaterial: THREE_TYPES.ShaderMaterial | null = null;
  meteorHeadMesh: THREE_TYPES.Mesh | null = null;
  meteorHeadGeometry: THREE_TYPES.BufferGeometry | null = null;
  meteorHeadMaterial: THREE_TYPES.ShaderMaterial | null = null;

  isMeteorActive = false;
  meteorStartTime = 0;
  meteorDuration = 2.2;
  meteorDepth = 1.0;
  nextMeteorTime = 0;

  private meteorP0 = { x: 0, y: 0 };
  private meteorV = { x: 0, y: 0 };
  private meteorA = { x: 0, y: 0 };

  initMeshes(THREE: typeof import('three'), scene: THREE_TYPES.Scene): void {
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
      vertexShader: meteorVertexShader,
      fragmentShader: meteorFragmentShader
    });

    this.meteorMesh = new THREE.Mesh(this.meteorGeometry, this.meteorMaterial);
    this.meteorMesh.visible = false;
    scene.add(this.meteorMesh);

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
      vertexShader: meteorHeadVertexShader,
      fragmentShader: meteorHeadFragmentShader
    });

    this.meteorHeadMesh = new THREE.Mesh(this.meteorHeadGeometry, this.meteorHeadMaterial);
    this.meteorHeadMesh.visible = false;
    scene.add(this.meteorHeadMesh);
  }

  scheduleNextMeteor(now: number): void {
    const delay = 2000 + Math.random() * 4000;
    this.nextMeteorTime = now + delay;
  }

  spawnMeteor(now: number, aspect: number): void {
    const isUpward = Math.random() < 0.75;
    const pool =
      isUpward && this.candidateStarsUpward.length > 0
        ? this.candidateStarsUpward
        : this.candidateStarsDownward.length > 0
        ? this.candidateStarsDownward
        : this.candidateStarOrigins;

    if (!this.meteorMesh || !this.meteorHeadMesh || pool.length === 0) {
      this.scheduleNextMeteor(now);
      return;
    }

    const randIdx = Math.floor(Math.random() * pool.length);
    const star = pool[randIdx];

    this.meteorP0.x = star.nx * aspect;
    this.meteorP0.y = star.ny;
    this.meteorDepth = star.depth;

    if (this.meteorMaterial) {
      this.meteorMaterial.uniforms['uDepth'].value = this.meteorDepth;
    }
    if (this.meteorHeadMaterial) {
      this.meteorHeadMaterial.uniforms['uDepth'].value = this.meteorDepth;
    }

    let angle: number;
    if (isUpward) {
      if (this.meteorP0.x < -0.10 * aspect) {
        angle = Math.PI * (0.12 + Math.random() * 0.22);
      } else if (this.meteorP0.x > 0.10 * aspect) {
        angle = Math.PI * (0.66 + Math.random() * 0.22);
      } else {
        angle = Math.random() > 0.5
          ? Math.PI * (0.12 + Math.random() * 0.22)
          : Math.PI * (0.66 + Math.random() * 0.22);
      }
    } else {
      if (this.meteorP0.x < -0.10 * aspect) {
        angle = -Math.PI * (0.14 + Math.random() * 0.22);
      } else if (this.meteorP0.x > 0.10 * aspect) {
        angle = -Math.PI * (0.64 + Math.random() * 0.22);
      } else {
        angle = Math.random() > 0.5
          ? -Math.PI * (0.14 + Math.random() * 0.22)
          : -Math.PI * (0.64 + Math.random() * 0.22);
      }
    }

    this.meteorDuration = 1.8 + Math.random() * 0.9;
    const distance = 0.85 + Math.random() * 0.45;
    const speed = distance / this.meteorDuration;

    this.meteorV.x = Math.cos(angle) * speed;
    this.meteorV.y = Math.sin(angle) * speed;

    const nx = -Math.sin(angle);
    const ny = Math.cos(angle);
    const curvatureAmp = (Math.random() - 0.45) * 0.20;
    const liftY = isUpward ? 0.05 : -0.08;

    this.meteorA.x = nx * curvatureAmp;
    this.meteorA.y = ny * curvatureAmp + liftY;

    this.meteorStartTime = now;
    this.isMeteorActive = true;
    this.meteorMesh.visible = true;
    this.meteorHeadMesh.visible = true;
  }

  updateMeteorGeometry(tau: number): void {
    if (!this.meteorGeometry || !this.meteorMaterial || !this.meteorHeadMesh || !this.meteorHeadMaterial) return;

    const tHead = tau * this.meteorDuration;
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

    const maxWidth = 0.0026 + 0.0058 * Math.pow(this.meteorDepth, 1.2);

    for (let k = 0; k <= N; k++) {
      const beta = k / N;
      const tk = tTail + (tHead - tTail) * beta;

      const px = P0x + Vx * tk + 0.5 * Ax * tk * tk;
      const py = P0y + Vy * tk + 0.5 * Ay * tk * tk;

      const tx = Vx + Ax * tk;
      const ty = Vy + Ay * tk;
      const tLen = Math.sqrt(tx * tx + ty * ty) || 1.0;
      const nx = -ty / tLen;
      const ny = tx / tLen;

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

    const headPx = P0x + Vx * tHead + 0.5 * Ax * tHead * tHead;
    const headPy = P0y + Vy * tHead + 0.5 * Ay * tHead * tHead;
    this.meteorHeadMesh.position.set(headPx, headPy, 0.06);
    const headScale = 0.45 + 0.55 * this.meteorDepth;
    this.meteorHeadMesh.scale.set(headScale, headScale, 1.0);

    this.meteorMaterial.uniforms['uLife'].value = tau;
    this.meteorHeadMaterial.uniforms['uLife'].value = tau;
  }

  dispose(): void {
    if (this.meteorGeometry) {
      this.meteorGeometry.dispose();
      this.meteorGeometry = null;
    }
    if (this.meteorMaterial) {
      this.meteorMaterial.dispose();
      this.meteorMaterial = null;
    }
    if (this.meteorHeadGeometry) {
      this.meteorHeadGeometry.dispose();
      this.meteorHeadGeometry = null;
    }
    if (this.meteorHeadMaterial) {
      this.meteorHeadMaterial.dispose();
      this.meteorHeadMaterial = null;
    }
    this.meteorMesh = null;
    this.meteorHeadMesh = null;
    this.isMeteorActive = false;
  }
}
