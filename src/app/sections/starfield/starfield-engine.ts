import type * as THREE_TYPES from 'three';
import { starfieldFragmentShader, starfieldVertexShader } from './starfield-shaders';
import { StarfieldPhysics } from './starfield-physics';
import { StarfieldMeteorManager } from './starfield-meteor';

export class StarfieldEngine {
  private renderer: THREE_TYPES.WebGLRenderer | null = null;
  private scene: THREE_TYPES.Scene | null = null;
  private camera: THREE_TYPES.OrthographicCamera | null = null;
  private material: THREE_TYPES.ShaderMaterial | null = null;
  private geometry: THREE_TYPES.BufferGeometry | null = null;
  private points: THREE_TYPES.Points | null = null;

  private startTime = 0;

  get isInitialized(): boolean {
    return this.renderer !== null;
  }

  init(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    aspect: number,
    dpr: number,
    geometry: THREE_TYPES.BufferGeometry,
    meteors: StarfieldMeteorManager,
    THREE: typeof THREE_TYPES
  ): boolean {
    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return false;

      this.renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl as WebGL2RenderingContext | WebGLRenderingContext,
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power'
      });
    } catch {
      return false;
    }

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-aspect, aspect, 1.0, -1.0, 0.1, 10.0);
    this.camera.position.z = 1.0;

    this.geometry = geometry;
    const isMobile = width < 768;

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseVelocity: { value: new THREE.Vector2(0, 0) },
        uMouseRadius: { value: isMobile ? 0.48 : 0.60 },
        uCalmStrength: { value: 0.0 },
        uGravityPos: { value: new THREE.Vector2(0, 0) },
        uGravityStrength: { value: 0.0 },
        uGravityRadius: { value: 0.0 },
        uGravityDuration: { value: 0.0 },
        uAspect: { value: aspect },
        uPixelRatio: { value: dpr },
        uReducedMotion: { value: 0.0 }
      },
      vertexShader: starfieldVertexShader,
      fragmentShader: starfieldFragmentShader
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);

    meteors.initMeshes(THREE, this.scene);
    meteors.scheduleNextMeteor(performance.now() - 500);

    this.startTime = performance.now();
    this.renderer.render(this.scene, this.camera);
    return true;
  }

  updateUniforms(
    now: number,
    physics: StarfieldPhysics
  ): void {
    if (!this.material) return;

    const g = physics.gravityState;
    const uGravPos = this.material.uniforms['uGravityPos']?.value as { set: (x: number, y: number) => void };
    if (uGravPos?.set) uGravPos.set(g.currentPos.x, g.currentPos.y);

    this.material.uniforms['uGravityStrength'].value = g.currentStrength;
    this.material.uniforms['uGravityRadius'].value = g.currentRadius;
    this.material.uniforms['uGravityDuration'].value = g.holdDuration;

    this.material.uniforms['uTime'].value = (now - this.startTime) * 0.001;

    const uMouse = this.material.uniforms['uMouse'].value as { set: (x: number, y: number) => void };
    if (uMouse?.set) uMouse.set(physics.currentMouse.x, physics.currentMouse.y);

    const uMouseVel = this.material.uniforms['uMouseVelocity'].value as { set: (x: number, y: number) => void };
    if (uMouseVel?.set) uMouseVel.set(physics.mouseVelocity.x, physics.mouseVelocity.y);

    this.material.uniforms['uCalmStrength'].value = physics.currentCalmStrength;
  }

  render(): void {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  resize(width: number, height: number, aspect: number, dpr: number): void {
    if (!this.renderer || !this.camera) return;

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);

    this.camera.left = -aspect;
    this.camera.right = aspect;
    this.camera.top = 1.0;
    this.camera.bottom = -1.0;
    this.camera.updateProjectionMatrix();

    if (this.material) {
      this.material.uniforms['uAspect'].value = aspect;
      this.material.uniforms['uMouseRadius'].value = width < 768 ? 0.48 : 0.60;
      this.material.uniforms['uPixelRatio'].value = dpr;
    }

    this.render();
  }

  dispose(meteors: StarfieldMeteorManager): void {
    if (this.geometry) {
      this.geometry.dispose();
      this.geometry = null;
    }
    if (this.material) {
      this.material.dispose();
      this.material = null;
    }
    if (this.points && this.scene) {
      this.scene.remove(this.points);
      this.points = null;
    }

    meteors.dispose();

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer = null;
    }
    this.scene = null;
    this.camera = null;
  }
}
