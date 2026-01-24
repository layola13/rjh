/**
 * Grass procedural texture shader module
 * Generates grass-like textures using noise functions
 */

/**
 * Shader uniform interface defining grass and ground colors
 */
export interface GrassProceduralTextureUniforms {
  /** Primary herb/grass color */
  herb1Color: [number, number, number];
  /** Secondary herb/grass color for variation */
  herb2Color: [number, number, number];
  /** Tertiary herb/grass color for additional variation */
  herb3Color: [number, number, number];
  /** Base ground color */
  groundColor: [number, number, number];
}

/**
 * Shader varying interface for vertex data
 */
export interface GrassProceduralTextureVaryings {
  /** Position in 2D space */
  vPosition: [number, number];
  /** UV texture coordinates */
  vUV: [number, number];
}

/**
 * GLSL pixel shader source code for grass procedural texture generation
 * 
 * The shader uses multiple noise functions to create realistic grass patterns:
 * - rand(): Pseudo-random number generator
 * - noise(): Perlin-style noise function
 * - fbm(): Fractional Brownian Motion for multi-octave noise
 * 
 * Colors are blended using random values at different frequencies to create
 * natural-looking grass variation.
 */
export const grassProceduralTexturePixelShader: string;

/**
 * Name identifier for the grass procedural texture shader
 */
export const grassProceduralTextureShaderName: string;

/**
 * Shader registration result containing shader metadata
 */
export interface ShaderRegistration {
  /** Registered shader name */
  name: string;
  /** Compiled shader source code */
  shader: string;
}

/**
 * Registers the grass procedural texture shader in the shader store
 */
export declare function registerGrassProceduralTextureShader(): ShaderRegistration;