/**
 * Gradient vertex shader module for Babylon.js materials system
 */

/**
 * Name identifier for the gradient vertex shader
 */
export const gradientVertexShaderName: string;

/**
 * Gradient vertex shader configuration object
 */
export interface IGradientVertexShader {
  /**
   * Shader identifier name
   */
  name: string;
  
  /**
   * GLSL shader source code
   */
  shader: string;
}

/**
 * Gradient vertex shader for rendering materials with gradient effects.
 * 
 * Supports:
 * - Vertex positions and normals
 * - UV mapping (UV1 and UV2)
 * - Vertex colors
 * - Skeletal animation (bones)
 * - Baked vertex animation
 * - Instanced rendering
 * - Fog effects
 * - Shadow rendering
 * - Clip planes
 * - Point size customization
 * 
 * @remarks
 * This shader is automatically registered in the Babylon.js ShaderStore
 * and can be referenced by its name in material definitions.
 */
export const gradientVertexShader: IGradientVertexShader;