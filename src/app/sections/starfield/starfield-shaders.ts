/**
 * GLSL Vertex Shader for the Interactive Starfield Particle System.
 * Supports fluid pointer wake, laminar drift, and non-linear gravitational singularity infall.
 */
export const starfieldVertexShader = `
  precision mediump float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uMouseVelocity;
  uniform float uMouseRadius;
  uniform float uCalmStrength;
  uniform vec2 uGravityPos;
  uniform float uGravityStrength;
  uniform float uGravityRadius;
  uniform float uGravityDuration;
  uniform float uAspect;
  uniform float uPixelRatio;
  uniform float uReducedMotion;

  attribute vec2 aBasePos;
  attribute float aDepth;
  attribute float aSeed;

  varying float vAlpha;
  varying float vDepth;
  varying float vCalm;
  varying float vAbsorption;
  varying float vCoreRadius;
  varying float vInvTotalSize;

  void main() {
    vec2 pos = vec2(aBasePos.x * uAspect, aBasePos.y);

    vec2 toMouse = pos - uMouse;
    float distToMouse = length(toMouse);

    float motionSpeed = 0.384; // +20% boost from baseline 0.32
    float t = uTime * motionSpeed;

    // Harmonic pointer calm deformation
    float flowAngle = atan(toMouse.y, toMouse.x);
    float harmonicMod = sin(flowAngle * 2.0 + t * 0.5) * 0.12 + cos(flowAngle * 3.0 - t * 0.4) * 0.08;
    float normDist = distToMouse / max(0.001, uMouseRadius);
    float deformedR = normDist + harmonicMod * smoothstep(1.6, 0.1, normDist);

    float calm = exp(-deformedR * deformedR * 1.6) * uCalmStrength;
    vCalm = calm;

    float wave1 = sin(pos.y * 2.5 + t + aSeed * 6.28) * (0.013 + aDepth * 0.015);
    float wave2 = cos(pos.x * 2.1 - t * 0.65 + aSeed * 3.14) * (0.013 + aDepth * 0.015);
    float waveZ = sin(pos.x * 1.8 + pos.y * 1.8 + t * 0.85) * (0.02 + aDepth * 0.03);
    vec2 ambientMotion = vec2(wave1, wave2);

    vec2 laminarDrift = vec2(
      sin(t * 0.35 + aSeed * 6.28) * 0.0025,
      cos(t * 0.30 + aSeed * 3.14) * 0.0025
    );

    // Fluid silky pointer wake
    vec2 kinematicDisplacement = mix(ambientMotion, laminarDrift, calm);
    vec2 fluidWake = uMouseVelocity * calm * (0.065 * (1.0 - aDepth * 0.35));
    pos += kinematicDisplacement + fluidWake;

    // Gravitational Singularity / Black Hole Infall Dynamics
    vAbsorption = 0.0;
    if (uGravityStrength > 0.001) {
      vec2 toCenter = uGravityPos - pos;
      float dist = length(toCenter);
      float reach = max(0.01, uGravityRadius);

      // Normalized distance: 0 at singularity center, 1 at event horizon edge
      float normD = clamp(dist / reach, 0.0, 1.0);

      // Gravitational field influence: smooth cubic falloff from horizon edge inward
      float field = 1.0 - normD;
      float influence = field * field * (3.0 - 2.0 * field);

      // Progressive pull ratio scaling with initial punch on first click (0.55 base)
      float durationFactor = smoothstep(0.0, 3.2, uGravityDuration);
      float pullRatio = clamp(influence * uGravityStrength * (0.55 + 0.45 * durationFactor), 0.0, 1.0);

      // Non-linear accretion acceleration
      float pullPower = pow(pullRatio, 0.82);

      // Tangential orbital accretion swirl around black hole
      float angularSpeed = (2.4 / (dist + 0.16)) * (0.6 + 0.4 * durationFactor);
      float swirlAngle = angularSpeed * pullRatio * (1.0 + 0.25 * sin(aSeed * 6.28 + uTime * 0.4));

      vec2 fromCenter = -toCenter;
      float cosA = cos(swirlAngle);
      float sinA = sin(swirlAngle);
      vec2 swirledDelta = vec2(
        fromCenter.x * cosA - fromCenter.y * sinA,
        fromCenter.x * sinA + fromCenter.y * cosA
      );

      // Collapse towards singularity center
      vec2 displacedDelta = mix(fromCenter, swirledDelta * (1.0 - pullPower), pullPower);
      pos = uGravityPos + displacedDelta;

      vAbsorption = clamp(pullPower * (1.1 + durationFactor * 0.5), 0.0, 1.6);
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, waveZ * (1.0 - calm * 0.85), 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Homogeneous starfield depth across entire hero viewport
    float effectiveDepth = aDepth;

    // Diameter matching authentic star distribution: mix(1.2, 3.6, pow(effectiveDepth, 1.6))
    float coreDiameter = mix(1.2, 3.6, pow(effectiveDepth, 1.6));
    float isAccent = step(0.70, effectiveDepth);

    // Allocate quad size in CSS pixels: accent stars get room for glowing halo (2.8x), normal stars get AA padding (+2.4px)
    float totalPointSize = mix(coreDiameter + 2.4, coreDiameter * 2.8, isAccent);

    // Compress point size as star is sucked into the singularity
    float sizeCompression = 1.0 - smoothstep(0.75, 1.25, vAbsorption) * 0.8;
    totalPointSize *= sizeCompression;
    gl_PointSize = max(1.0, totalPointSize * uPixelRatio);

    // Normalized radius of solid core in gl_PointCoord space (0.0 to 0.5)
    vCoreRadius = (coreDiameter * 0.5) / totalPointSize;
    vInvTotalSize = 1.0 / gl_PointSize;

    // Opacity: base twinkle + accretion brightening, then smooth extinction as star is swallowed
    float baseAlpha = mix(0.18, 0.72, pow(effectiveDepth, 1.3));
    float twinkle = sin(uTime * 1.0 + aSeed * 50.0) * (0.03 + effectiveDepth * 0.05);
    float accretionGlow = smoothstep(0.15, 0.70, vAbsorption) * 0.35;
    float horizonSwallow = smoothstep(1.15, 0.75, vAbsorption);
    float finalAlpha = clamp(baseAlpha + twinkle + accretionGlow, 0.08, 0.98) * horizonSwallow;
    finalAlpha *= (1.0 + calm * 0.15);

    vAlpha = clamp(finalAlpha, 0.0, 0.95);
    vDepth = effectiveDepth;
  }
`;

/**
 * GLSL Fragment Shader for the Interactive Starfield Particle System.
 */
export const starfieldFragmentShader = `
  precision mediump float;

  varying float vAlpha;
  varying float vDepth;
  varying float vCalm;
  varying float vAbsorption;
  varying float vCoreRadius;
  varying float vInvTotalSize;

  void main() {
    if (vAlpha <= 0.01) discard;

    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // 1. Crisp antialiased solid circular core matching SVG <circle>
    float aaEdge = vInvTotalSize * 1.1;
    float coreAlpha = 1.0 - smoothstep(vCoreRadius - aaEdge, vCoreRadius + aaEdge, dist);

    // 2. Luminous halo matching SVG feGaussianBlur filter on accent stars
    float haloAlpha = 0.0;
    if (vDepth > 0.68) {
      float haloFalloff = smoothstep(0.49, vCoreRadius, dist);
      haloAlpha = haloFalloff * haloFalloff * (0.35 * smoothstep(0.68, 0.88, vDepth));
    }

    // Composite solid core and surrounding halo
    float shape = clamp(coreAlpha + haloAlpha * (1.0 - coreAlpha * 0.75), 0.0, 1.0);
    if (shape <= 0.005) discard;

    // Muted cosmic palette matching static SVG: slate-silver to lunar pearl
    vec3 deepDust = vec3(0.38, 0.44, 0.52);
    vec3 midStar = vec3(0.55, 0.62, 0.70);
    vec3 accentStar = vec3(0.72, 0.76, 0.82);

    vec3 starColor = mix(deepDust, midStar, smoothstep(0.0, 0.70, vDepth));
    starColor = mix(starColor, accentStar, smoothstep(0.70, 1.0, vDepth));

    // Kinetic calm & high-energy accretion illumination
    starColor = mix(starColor, vec3(0.78, 0.82, 0.88), vCalm * 0.15);
    vec3 accretionColor = vec3(0.86, 0.93, 1.0);
    starColor = mix(starColor, accretionColor, clamp(vAbsorption * 0.6, 0.0, 0.85));

    gl_FragColor = vec4(starColor, vAlpha * shape);
  }
`;

/**
 * GLSL Shaders for the Shooting Star / Meteor Ribbon Mesh.
 */
export const meteorVertexShader = `
  precision mediump float;
  attribute float aProgress;
  attribute float aSide;
  varying float vProgress;
  varying float vSide;
  void main() {
    vProgress = aProgress;
    vSide = aSide;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const meteorFragmentShader = `
  precision mediump float;
  uniform float uLife;
  uniform float uDepth;
  varying float vProgress;
  varying float vSide;

  void main() {
    float life = clamp(uLife, 0.0, 1.0);

    // Continuous graceful light curve
    float fadeIn = smoothstep(0.0, 0.24, life);
    float fadeOut = smoothstep(1.0, 0.58, life);
    float flare = fadeIn * fadeOut;

    // Atmospheric scintillation
    float flicker = 0.94 + 0.06 * sin(life * 24.0 + vProgress * 12.0);
    float totalBrilliance = flare * flicker;
    if (totalBrilliance < 0.003) discard;

    // Trail falloff: luminous head with smooth ionization wake
    float trailAlpha = pow(vProgress, 2.0);

    // Lateral cross-section: hot center core + radiant sheath
    float lateral = clamp(1.0 - abs(vSide), 0.0, 1.0);
    float coreIntensity = pow(lateral, 2.2);
    float haloIntensity = pow(lateral, 0.7);
    float shape = coreIntensity * 0.75 + haloIntensity * 0.25;

    // Depth-based color & contrast gradation
    vec3 deepCosmic = vec3(0.32, 0.40, 0.52);
    vec3 midIon = vec3(0.58, 0.76, 0.95);
    vec3 stellarWhite = vec3(0.99, 1.0, 1.0);

    vec3 tailColor = mix(deepCosmic, vec3(0.42, 0.54, 0.70), smoothstep(0.2, 0.8, uDepth));
    vec3 ionColor = mix(deepCosmic * 1.25, midIon, smoothstep(0.2, 0.8, uDepth));
    vec3 coreColor = mix(midIon, stellarWhite, smoothstep(0.35, 0.85, uDepth));

    vec3 meteorColor = mix(tailColor, ionColor, smoothstep(0.1, 0.65, vProgress));
    meteorColor = mix(meteorColor, coreColor, smoothstep(0.65, 1.0, vProgress) * coreIntensity);

    // Aerial perspective
    float maxAlpha = mix(0.38, 0.95, pow(clamp(uDepth, 0.0, 1.0), 0.75));
    float finalAlpha = shape * trailAlpha * totalBrilliance * maxAlpha;
    if (finalAlpha <= 0.003) discard;

    gl_FragColor = vec4(meteorColor, finalAlpha);
  }
`;

/**
 * GLSL Shaders for the Radiant Meteor Spark Head.
 */
export const meteorHeadVertexShader = `
  precision mediump float;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const meteorHeadFragmentShader = `
  precision mediump float;
  uniform float uLife;
  uniform float uDepth;
  varying vec2 vUv;
  void main() {
    vec2 coord = vUv - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float life = clamp(uLife, 0.0, 1.0);
    float fadeIn = smoothstep(0.0, 0.20, life);
    float fadeOut = smoothstep(1.0, 0.60, life);
    float flare = fadeIn * fadeOut;

    float spark = 1.0 - smoothstep(0.0, 0.14, dist);
    float corona = pow(clamp(1.0 - dist * 2.0, 0.0, 1.0), 2.2);

    float maxAlpha = mix(0.35, 0.95, pow(clamp(uDepth, 0.0, 1.0), 0.75));
    float alpha = (spark * 0.90 + corona * 0.45) * flare * maxAlpha;
    if (alpha <= 0.003) discard;

    vec3 headColor = mix(vec3(0.65, 0.82, 1.0), vec3(1.0, 1.0, 1.0), spark * smoothstep(0.3, 0.8, uDepth));
    gl_FragColor = vec4(headColor, alpha);
  }
`;
