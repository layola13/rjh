/**
 * Fur material pixel shader for Babylon.js
 * Implements fur rendering with configurable density, length, and lighting
 */

/**
 * Shader uniforms for eye/camera position
 */
export interface VEyePosition {
  /** Camera position in world space (xyz) and reserved (w) */
  xyz: [number, number, number];
  w: number;
}

/**
 * Diffuse color with alpha channel
 */
export interface ColorRGBA {
  /** Red channel [0-1] */
  r: number;
  /** Green channel [0-1] */
  g: number;
  /** Blue channel [0-1] */
  b: number;
  /** Alpha/transparency [0-1] */
  a: number;
}

/**
 * 2D vector for UV coordinates or texture info
 */
export interface Vector2 {
  x: number;
  y: number;
}

/**
 * 3D vector for positions, normals, colors
 */
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Sampler2D texture reference
 */
export interface Sampler2D {
  /** Texture unit identifier */
  textureUnit: number;
}

/**
 * Shader compilation result
 */
export interface ShaderDefinition {
  /** Shader identifier name */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * GLSL shader source code for fur rendering pixel shader.
 * 
 * Features:
 * - Per-pixel fur density and occlusion
 * - Multi-light support with shadows
 * - Diffuse texture mapping
 * - Vertex color blending
 * - Alpha testing for fur edge trimming
 * - Fog integration
 * - High-level mode with advanced texture-based fur shells
 * 
 * Uniforms:
 * - vEyePosition: Camera world position
 * - vDiffuseColor: Base diffuse tint with alpha
 * - furColor: Fur-specific color tint
 * - furLength: Maximum fur strand length
 * - furOffset: Current shell offset for layered rendering (HIGHLEVEL)
 * - furOcclusion: Minimum occlusion factor (HIGHLEVEL)
 * - furTexture: Noise texture for fur density (HIGHLEVEL)
 * - diffuseSampler: Base color texture (DIFFUSE)
 * 
 * Varyings:
 * - vPositionW: World space position
 * - vfur_length: Interpolated fur length for gradient
 * - vNormalW: World space normal (NORMAL)
 * - vColor: Vertex color (VERTEXCOLOR)
 * - vDiffuseUV: Diffuse texture coordinates (DIFFUSE)
 * - vFurUV: Fur texture coordinates (HIGHLEVEL)
 */
export const furPixelShader: string;

/**
 * Shader identifier constant
 */
export const furPixelShaderName: "furPixelShader";

/**
 * Complete shader definition object
 */
export const furShaderDefinition: ShaderDefinition;

/**
 * Random number generator function used in shader (reference only)
 * @param rv - Input 3D vector for seed
 * @returns Pseudo-random value in range [0, 1]
 */
declare function Rand(rv: Vector3): number;