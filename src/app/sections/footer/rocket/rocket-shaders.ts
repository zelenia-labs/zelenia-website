export const ROCKET_VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute float a_size;
  attribute vec4 a_color;

  uniform vec2 u_resolution;
  uniform float u_pixelRatio;

  varying vec4 v_color;

  void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = vec2(zeroToTwo.x - 1.0, 1.0 - zeroToTwo.y);

    gl_Position = vec4(clipSpace, 0.0, 1.0);
    gl_PointSize = a_size * u_pixelRatio;
    v_color = a_color;
  }
`;

export const ROCKET_FRAGMENT_SHADER = `
  precision mediump float;
  varying vec4 v_color;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) {
      discard;
    }
    float falloff = smoothstep(0.5, 0.0, dist);

    // Negative alpha indicates pure additive flame plasma (RGB adds directly without alpha reduction)
    if (v_color.a < 0.0) {
      float glow = -v_color.a * falloff;
      gl_FragColor = vec4(v_color.rgb * glow, 0.0);
    } else {
      // Standard smooth billowing smoke cloud
      float alpha = falloff * v_color.a;
      gl_FragColor = vec4(v_color.rgb * alpha, alpha);
    }
  }
`;

export function compileRocketShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createRocketProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
): WebGLProgram | null {
  const vertShader = compileRocketShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragShader = compileRocketShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vertShader || !fragShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('WebGL link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}
