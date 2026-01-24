/**
 * Lava material vertex shader module
 * Provides vertex shader code for lava material effects with noise-based displacement
 */

/**
 * Name identifier for the lava vertex shader
 */
export const LAVA_VERTEX_SHADER_NAME = "lavaVertexShader";

/**
 * GLSL vertex shader source code for lava material
 * Implements Perlin noise-based vertex displacement to create animated lava surface effects
 */
export const lavaVertexShader: string;

/**
 * Shader metadata interface
 */
export interface ShaderMetadata {
  /** Unique name identifier for the shader */
  name: string;
  /** The complete GLSL shader source code */
  shader: string;
}

/**
 * Type declaration for lava vertex shader export
 * Contains both the shader name and registers it in Babylon.js shader store
 */
declare const lavaVertexShaderMetadata: ShaderMetadata;

export { lavaVertexShaderMetadata };

/**
 * Vertex shader uniforms used by the lava material
 */
export interface LavaVertexUniforms {
  /** Current animation time in seconds */
  time: number;
  /** Speed multiplier for low-frequency noise variations */
  lowFrequencySpeed: number;
  /** Model-view matrix */
  view: Float32Array; // mat4
  /** Combined view-projection matrix */
  viewProjection: Float32Array; // mat4
  /** Diffuse texture transformation matrix (when DIFFUSE is defined) */
  diffuseMatrix?: Float32Array; // mat4
  /** Diffuse texture UV info (when DIFFUSE is defined) */
  vDiffuseInfos?: Float32Array; // vec2
  /** Point sprite size (when POINTSIZE is defined) */
  pointSize?: number;
}

/**
 * Vertex shader attributes used by the lava material
 */
export interface LavaVertexAttributes {
  /** Vertex position in object space */
  position: Float32Array; // vec3
  /** Vertex normal vector (when NORMAL is defined) */
  normal?: Float32Array; // vec3
  /** Primary UV coordinates (when UV1 is defined) */
  uv?: Float32Array; // vec2
  /** Secondary UV coordinates (when UV2 is defined) */
  uv2?: Float32Array; // vec2
  /** Vertex color (when VERTEXCOLOR is defined) */
  color?: Float32Array; // vec4
}

/**
 * Vertex shader varying outputs passed to fragment shader
 */
export interface LavaVertexVaryings {
  /** Noise value for surface displacement */
  noise: number; // float
  /** World space position */
  vPositionW: Float32Array; // vec3
  /** World space normal (when NORMAL is defined) */
  vNormalW?: Float32Array; // vec3
  /** Diffuse texture UV coordinates (when DIFFUSE is defined) */
  vDiffuseUV?: Float32Array; // vec2
  /** Vertex color (when VERTEXCOLOR is defined) */
  vColor?: Float32Array; // vec4
}