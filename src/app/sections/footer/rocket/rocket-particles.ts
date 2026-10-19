import { RocketParticle, MAX_ROCKET_PARTICLES, FLOATS_PER_PARTICLE } from './rocket.types';
import { ROCKET_VERTEX_SHADER, ROCKET_FRAGMENT_SHADER, createRocketProgram } from './rocket-shaders';

export class RocketParticleEngine {
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private vertexBuffer: WebGLBuffer | null = null;

  private aPositionLoc = -1;
  private aSizeLoc = -1;
  private aColorLoc = -1;
  private uResolutionLoc: WebGLUniformLocation | null = null;
  private uPixelRatioLoc: WebGLUniformLocation | null = null;

  private particles: RocketParticle[] = [];
  private particleBufferData = new Float32Array(MAX_ROCKET_PARTICLES * FLOATS_PER_PARTICLE);

  init(
    canvas: HTMLCanvasElement,
    viewportW: number,
    viewportH: number,
    pixelRatio: number
  ): boolean {
    canvas.width = Math.round(viewportW * pixelRatio);
    canvas.height = Math.round(viewportH * pixelRatio);

    const gl =
      canvas.getContext('webgl', {
        alpha: true,
        antialias: false,
        depth: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance'
      }) || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) return false;
    this.gl = gl;

    const program = createRocketProgram(gl, ROCKET_VERTEX_SHADER, ROCKET_FRAGMENT_SHADER);
    if (!program) return false;
    this.program = program;
    gl.useProgram(program);

    this.aPositionLoc = gl.getAttribLocation(program, 'a_position');
    this.aSizeLoc = gl.getAttribLocation(program, 'a_size');
    this.aColorLoc = gl.getAttribLocation(program, 'a_color');

    this.uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    this.uPixelRatioLoc = gl.getUniformLocation(program, 'u_pixelRatio');

    gl.uniform2f(this.uResolutionLoc, viewportW, viewportH);
    gl.uniform1f(this.uPixelRatioLoc, pixelRatio);

    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.particleBufferData.byteLength, gl.DYNAMIC_DRAW);

    // One-pass blending: Pre-multiplied alpha allows simultaneous pure additive fire and alpha-blended smoke
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);

    return true;
  }

  get particleCount(): number {
    return this.particles.length;
  }

  clear(): void {
    this.particles = [];
    if (this.gl) {
      this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
  }

  /**
   * Real launch pad physics: Massive initial flame burst and billowing smoke pushed to BOTH sides
   * (Flame deflector trench effect mimicking real aerospace rocket liftoffs).
   */
  emitLiftoffPadExplosion(launchX: number, launchY: number, dt: number, elapsed: number): void {
    const intensity = Math.pow(Math.max(0, 1.0 - elapsed / 0.55), 1.25);

    // A. Initial fiery blast hitting the launch pad
    const fireCount = Math.round(36 * intensity * dt * 60);
    for (let i = 0; i < fireCount; i++) {
      if (this.particles.length >= MAX_ROCKET_PARTICLES) break;

      const angle = (Math.random() * 0.8 - 0.4) * Math.PI + Math.PI * 0.5;
      const speed = (180 + Math.random() * 320) * intensity;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      this.particles.push({
        x: launchX + (Math.random() - 0.5) * 16,
        y: launchY + Math.random() * 6,
        vx,
        vy,
        size: 12 + Math.random() * 12,
        growth: 28,
        r: 1.0,
        g: 0.72 + Math.random() * 0.24,
        b: 0.15 + Math.random() * 0.2,
        a: 0.95,
        age: 0,
        maxAge: 0.22 + Math.random() * 0.24,
        isAdditive: true,
        drag: 0.94
      });
    }

    // B. Dual-sided smoke trench plumes (expanding rapidly to BOTH left and right)
    const trenchCount = Math.round(48 * intensity * dt * 60);
    for (let i = 0; i < trenchCount; i++) {
      if (this.particles.length >= MAX_ROCKET_PARTICLES) break;

      const dir = Math.random() < 0.5 ? -1 : 1;
      const horizSpeed = (160 + Math.random() * 320) * intensity;
      const vertSpeed = -(15 + Math.random() * 55) * intensity;
      const grey = 0.82 + Math.random() * 0.16;

      this.particles.push({
        x: launchX + dir * (12 + Math.random() * 18),
        y: launchY + (Math.random() - 0.5) * 8,
        vx: dir * horizSpeed,
        vy: vertSpeed,
        size: 22 + Math.random() * 16,
        growth: 42 + Math.random() * 32,
        r: grey,
        g: grey,
        b: grey,
        a: 0.52 + Math.random() * 0.25,
        age: 0,
        maxAge: 2.4 + Math.random() * 1.1,
        isAdditive: false,
        drag: 0.89
      });
    }
  }

  /**
   * Emits supersonic fire sparks at nozzle exit and expanding atmospheric smoke downstream BELOW the rocket.
   */
  emitFlightPlume(
    rocketX: number,
    rocketY: number,
    headingDeg: number,
    dt: number,
    progress: number
  ): void {
    const headingRad = (headingDeg * Math.PI) / 180;
    const exhX = -Math.sin(headingRad);
    const exhY = Math.cos(headingRad);

    const perpX = -exhY;
    const perpY = exhX;

    // 1. Supersonic glowing flame plasma & sparks exiting at nozzle base
    const sparkCount = Math.round(36 * dt * 60);
    for (let i = 0; i < sparkCount; i++) {
      if (this.particles.length >= MAX_ROCKET_PARTICLES) break;

      const sparkDist = 2 + Math.random() * 22;
      const speed = 320 + Math.random() * 380;
      const spread = (Math.random() - 0.5) * 0.28;

      const sparkVx = (exhX + perpX * spread) * speed;
      const sparkVy = (exhY + perpY * spread) * speed;

      this.particles.push({
        x: rocketX + exhX * sparkDist + perpX * (Math.random() - 0.5) * 4,
        y: rocketY + exhY * sparkDist + perpY * (Math.random() - 0.5) * 4,
        vx: sparkVx,
        vy: sparkVy,
        size: 7 + Math.random() * 6,
        growth: 14,
        r: 1.0,
        g: 0.78 + Math.random() * 0.2,
        b: 0.2 + Math.random() * 0.25,
        a: 0.95,
        age: 0,
        maxAge: 0.16 + Math.random() * 0.18,
        isAdditive: true,
        drag: 0.96
      });
    }

    // 2. Realistic atmospheric smoke plume: Appears downstream BELOW the rocket (38px to 66px standoff)
    const trailCount = Math.round(24 * dt * 60);
    for (let i = 0; i < trailCount; i++) {
      if (this.particles.length >= MAX_ROCKET_PARTICLES) break;

      const smokeStandOff = 38 + Math.random() * 28;
      const lateralSpread = (Math.random() - 0.5) * (8 + progress * 16);

      const smokeOriginX = rocketX + exhX * smokeStandOff + perpX * lateralSpread;
      const smokeOriginY = rocketY + exhY * smokeStandOff + perpY * lateralSpread;

      const plumeSpeed = 16 + Math.random() * 42;
      const smokeVx = (exhX + perpX * (Math.random() - 0.5) * 0.6) * plumeSpeed;
      const smokeVy = (exhY + perpY * (Math.random() - 0.5) * 0.6) * plumeSpeed;
      const grey = 0.84 + Math.random() * 0.14;

      this.particles.push({
        x: smokeOriginX,
        y: smokeOriginY,
        vx: smokeVx,
        vy: smokeVy,
        size: 16 + Math.random() * 12,
        growth: 28 + Math.random() * 26,
        r: grey,
        g: grey,
        b: grey,
        a: 0.44 + Math.random() * 0.25,
        age: 0,
        maxAge: 2.2 + Math.random() * 0.9,
        isAdditive: false,
        drag: 0.92
      });
    }
  }

  /**
   * Updates particle physics and life decay.
   */
  update(dt: number): void {
    const alive: RocketParticle[] = [];

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.age += dt;

      if (p.age < p.maxAge) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= Math.pow(p.drag, dt * 60);
        p.vy *= Math.pow(p.drag, dt * 60);

        if (!p.isAdditive) {
          p.vy -= 10 * dt;
        }

        p.size += p.growth * dt;
        alive.push(p);
      }
    }

    this.particles = alive;
  }

  /**
   * High-efficiency batch draw call via WebGL with dual-mode additive & alpha blending.
   */
  render(viewportW: number, viewportH: number, pixelRatio: number): void {
    const gl = this.gl;
    if (!gl || !this.program || !this.vertexBuffer) return;

    gl.viewport(0, 0, Math.round(viewportW * pixelRatio), Math.round(viewportH * pixelRatio));
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const count = this.particles.length;
    if (count === 0) return;

    gl.useProgram(this.program);
    gl.uniform2f(this.uResolutionLoc, viewportW, viewportH);
    gl.uniform1f(this.uPixelRatioLoc, pixelRatio);

    let offset = 0;
    for (let i = 0; i < count; i++) {
      const p = this.particles[i];
      const lifeRatio = p.age / p.maxAge;

      const r = p.r;
      const g = p.g;
      const b = p.b;
      let alpha = 0.0;

      if (p.isAdditive) {
        const glow = p.a * Math.max(0, 1.0 - lifeRatio);
        alpha = -glow;
      } else {
        alpha = p.a * Math.max(0, 1.0 - Math.pow(lifeRatio, 1.25));
      }

      this.particleBufferData[offset] = p.x;
      this.particleBufferData[offset + 1] = p.y;
      this.particleBufferData[offset + 2] = p.size;
      this.particleBufferData[offset + 3] = r;
      this.particleBufferData[offset + 4] = g;
      this.particleBufferData[offset + 5] = b;
      this.particleBufferData[offset + 6] = alpha;

      offset += FLOATS_PER_PARTICLE;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.particleBufferData.subarray(0, count * FLOATS_PER_PARTICLE));

    const stride = FLOATS_PER_PARTICLE * Float32Array.BYTES_PER_ELEMENT;
    gl.enableVertexAttribArray(this.aPositionLoc);
    gl.vertexAttribPointer(this.aPositionLoc, 2, gl.FLOAT, false, stride, 0);

    gl.enableVertexAttribArray(this.aSizeLoc);
    gl.vertexAttribPointer(this.aSizeLoc, 1, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(this.aColorLoc);
    gl.vertexAttribPointer(this.aColorLoc, 4, gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);

    gl.drawArrays(gl.POINTS, 0, count);
  }

  cleanup(): void {
    if (!this.gl) return;
    const gl = this.gl;
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (this.vertexBuffer) {
      gl.deleteBuffer(this.vertexBuffer);
      this.vertexBuffer = null;
    }
    if (this.program) {
      gl.deleteProgram(this.program);
      this.program = null;
    }
    this.gl = null;
    this.particles = [];
  }
}
