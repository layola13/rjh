/**
 * Fire material fragment shader declaration module
 * Provides GLSL fragment shader for fire rendering effects with distortion and opacity mapping
 */

/**
 * GLSL fragment shader source code for fire material rendering.
 * Implements distortion-based fire effects with multiple noise layers and opacity control.
 */
export const firePixelShader: string;

/**
 * Shader metadata interface containing name and source
 */
export interface FireShaderMetadata {
  /** Shader identifier used for registration */
  name: string;
  /** Complete GLSL shader source code */
  shader: string;
}