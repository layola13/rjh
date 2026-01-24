/**
 * MRDL Inner Quad Fragment Shader Module
 * Implements rounded rectangle rendering with glow effects for MRDL materials
 */

/**
 * Shader name identifier
 */
export const mrdlInnerquadPixelShaderName: string;

/**
 * MRDL Inner Quad pixel shader configuration
 */
export interface MRDLInnerquadPixelShader {
  /**
   * The unique name of the shader
   */
  name: string;
  
  /**
   * The GLSL shader source code stored in ShaderStore
   */
  shader: string;
}

/**
 * MRDL Inner Quad Pixel Shader
 * 
 * This shader renders a rounded rectangle with customizable glow effects.
 * 
 * Uniforms:
 * - cameraPosition: vec3 - Camera position in world space
 * - _Color_: vec4 - Base color of the rectangle
 * - _Radius_: float - Corner radius of the rounded rectangle
 * - _Fixed_Radius_: bool - Whether radius is fixed or scales with size
 * - _Filter_Width_: float - Anti-aliasing filter width
 * - _Glow_Fraction_: float - Proportion of glow effect relative to shape
 * - _Glow_Max_: float - Maximum glow intensity
 * - _Glow_Falloff_: float - Glow falloff exponent
 * 
 * Varyings:
 * - vUV: vec2 - UV coordinates
 * - vTangent: vec3 - Tangent space vector containing size and radius info
 * 
 * Functions:
 * - FilterStep_Bid194: Performs filtered step function for anti-aliasing
 * - Round_Rect_B194: Calculates rounded rectangle with glow effect
 */
export const mrdlInnerquadPixelShader: MRDLInnerquadPixelShader;

/**
 * The complete GLSL fragment shader source code
 * Implements:
 * 1. Filtered step function for smooth edges
 * 2. Rounded rectangle SDF (Signed Distance Field)
 * 3. Glow effect calculation with falloff
 * 4. Color composition based on distance to shape
 */
export const shaderSource: string;