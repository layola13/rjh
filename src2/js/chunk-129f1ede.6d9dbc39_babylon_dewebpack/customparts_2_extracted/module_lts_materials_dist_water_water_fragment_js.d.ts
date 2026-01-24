/**
 * Water material pixel shader module
 * Provides fragment shader for water surface rendering with reflection, refraction, and bump mapping
 */

/**
 * Name identifier for the water pixel shader
 */
export const waterPixelShaderName: string;

/**
 * Water pixel shader configuration object
 * Contains the complete GLSL fragment shader code for water material rendering
 */
export interface WaterPixelShader {
  /**
   * Shader name identifier
   */
  name: string;
  
  /**
   * Complete GLSL fragment shader source code
   * Handles water surface rendering including:
   * - Fresnel reflections and refractions
   * - Normal/bump mapping with time-based animation
   * - Specular highlights and lighting
   * - Color blending between water colors
   * - Fog and depth effects
   */
  shader: string;
}

/**
 * Exported water pixel shader instance
 * Contains the compiled shader code for water material rendering in BabylonJS
 * 
 * Features:
 * - Logarithmic depth buffer support
 * - Dynamic normal mapping with optional superimpose mode
 * - Separate Fresnel term calculation for realistic water appearance
 * - Multi-light support with shadows
 * - Vertex color and instancing support
 * - Configurable water color blending
 * - Time-based wave animation via bump height
 * - Reflection and refraction texture sampling
 * - Image post-processing integration
 * - Clip plane and fog support
 */
export const waterPixelShader: WaterPixelShader;