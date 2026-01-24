/**
 * MRDL (Mixed Reality Design Language) Slider Bar fragment shader module
 * Provides advanced material rendering for 3D GUI slider components with features like:
 * - Proximity-based blob effects
 * - Finger occlusion shadows
 * - Iridescence and rim lighting
 * - Environment reflections
 * - Bulge deformation effects
 */

/**
 * Complete GLSL fragment shader source code for MRDL slider bar material.
 * This shader implements a sophisticated PBR-like rendering pipeline with interactive elements.
 */
export const mrdlSliderBarPixelShader: string;

/**
 * Shader identifier used for registration in the shader store
 */
export const name: string;

/**
 * Shader metadata object containing name and source code
 */
export const shader: {
  /** Unique shader identifier */
  name: string;
  /** Complete GLSL shader source code */
  shader: string;
};