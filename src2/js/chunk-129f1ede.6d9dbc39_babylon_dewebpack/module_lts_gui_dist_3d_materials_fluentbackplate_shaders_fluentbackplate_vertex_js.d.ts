/**
 * Fluent Backplate Vertex Shader Module
 * 
 * This module defines the vertex shader for the Fluent Design backplate material,
 * which provides rounded rectangle backgrounds with blob effects, iridescence,
 * and highlight animations for 3D GUI elements.
 */

/**
 * Name identifier for the fluent backplate vertex shader
 */
export const fluentBackplateVertexShaderName: string;

/**
 * Shader configuration object containing the shader name and source code
 */
export interface FluentBackplateShaderConfig {
  /**
   * Unique name identifier for the shader in the shader store
   */
  name: string;
  
  /**
   * GLSL shader source code for the vertex shader
   */
  shader: string;
}

/**
 * Fluent backplate vertex shader configuration
 * 
 * This shader handles:
 * - Rounded rectangle vertex positioning with configurable corner radii
 * - Blob proximity effects for up to 2 interactive points (finger tracking)
 * - Edge anti-aliasing for smooth borders
 * - Animated highlight effects
 * - Iridescence mapping
 * - Global index finger tip position integration
 * 
 * @remarks
 * The shader outputs varying attributes for fragment shader processing including:
 * - World position, normal, UV coordinates
 * - Tangent and binormal vectors for effects
 * - Color and radius parameters
 * - Blob distance/fade information
 * - Rectangle parameters for rounded corners
 */
export const fluentBackplateVertexShader: FluentBackplateShaderConfig;