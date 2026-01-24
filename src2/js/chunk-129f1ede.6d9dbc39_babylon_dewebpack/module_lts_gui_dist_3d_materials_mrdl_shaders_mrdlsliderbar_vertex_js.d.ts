/**
 * MRDL (Mixed Reality Design Language) Slider Bar Vertex Shader
 * 
 * This shader provides advanced material rendering for 3D slider bar UI elements
 * with support for beveled edges, blob interactions, procedural coloring, and
 * environmental reflections.
 */

/**
 * Vertex shader source code for MRDL slider bar material.
 * Implements complex vertex transformations including:
 * - Rounded corner/bevel geometry generation
 * - Blob-based proximity effects for hand tracking
 * - Gradient color blending
 * - Normal/tangent space calculations
 */
export const mrdlSliderBarVertexShader: string;

/**
 * Shader name identifier used for registration in Babylon.js shader store
 */
export const shaderName: "mrdlSliderBarVertexShader";

/**
 * Shader store registration object
 */
export interface ShaderRegistration {
  /** Unique shader identifier */
  name: typeof shaderName;
  /** Complete GLSL shader source code */
  shader: string;
}