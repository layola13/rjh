/**
 * Perlin Noise Procedural Texture Shader Module
 * 
 * This module provides a fragment shader for generating Perlin noise textures
 * procedurally in WebGL. The shader combines Perlin noise with Worley noise
 * to create organic, cloud-like patterns.
 */

/**
 * The shader name identifier used for registration in the shader store
 */
export const perlinNoiseProceduralTexturePixelShaderName = "perlinNoiseProceduralTexturePixelShader";

/**
 * Shader configuration object containing name and shader source code
 */
export interface ShaderConfig {
  /** The unique name/identifier for this shader */
  name: string;
  /** The GLSL shader source code */
  shader: string;
}

/**
 * The complete GLSL fragment shader source code for Perlin noise generation.
 * 
 * Uniforms:
 * - size: Controls the scale of the noise pattern
 * - time: Animation time parameter for dynamic effects
 * - translationSpeed: Speed of UV coordinate translation
 * 
 * The shader implements:
 * - Perlin noise algorithm for smooth gradient noise
 * - Worley noise (cellular noise) for additional detail
 * - Multi-octave noise combination for rich textures
 */
export const perlinNoiseProceduralTexturePixelShaderSource: string;

/**
 * The exported shader configuration object containing both the shader name
 * and its complete GLSL source code. This object is registered in Babylon.js's
 * ShaderStore for runtime use.
 */
export const perlinNoiseProceduralTexturePixelShader: ShaderConfig;

/**
 * Shader Store interface from Babylon.js core
 */
declare interface ShaderStore {
  /** Dictionary of registered shader source codes indexed by shader name */
  ShadersStore: Record<string, string>;
}