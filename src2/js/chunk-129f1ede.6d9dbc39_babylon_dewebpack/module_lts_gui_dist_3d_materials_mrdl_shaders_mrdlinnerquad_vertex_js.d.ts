/**
 * MRDL Inner Quad Vertex Shader Module
 * Provides vertex shader for MRDL (Mixed Reality Design Language) inner quad rendering
 */

/**
 * Shader name identifier
 */
export const mrdlInnerquadVertexShaderName: string;

/**
 * MRDL Inner Quad vertex shader source code
 * 
 * This shader transforms vertices for inner quad rendering with the following features:
 * - World space position and direction calculations
 * - Adaptive or fixed radius scaling
 * - UV coordinate transformation based on tangent/binormal lengths
 * - Glow effect support with configurable parameters
 * 
 * @remarks
 * The shader calculates aspect ratio corrections and applies radius transformations
 * that can be either fixed (world-space) or adaptive (screen-space).
 */
export const mrdlInnerquadVertexShaderSource: string;

/**
 * MRDL Inner Quad Vertex Shader configuration object
 * 
 * @property name - The shader identifier used for registration
 * @property shader - The complete GLSL shader source code
 */
export interface MrdlInnerquadVertexShader {
  /**
   * Unique name identifier for the shader
   */
  name: string;
  
  /**
   * GLSL vertex shader source code
   * 
   * Uniforms:
   * - world: World transformation matrix
   * - viewProjection: Combined view-projection matrix
   * - cameraPosition: Camera position in world space
   * - _Color_: Base color tint
   * - _Radius_: Corner radius value
   * - _Fixed_Radius_: Whether radius is fixed in world space
   * - _Filter_Width_: Anti-aliasing filter width
   * - _Glow_Fraction_: Glow intensity fraction
   * - _Glow_Max_: Maximum glow intensity
   * - _Glow_Falloff_: Glow falloff curve exponent
   * 
   * Attributes:
   * - position: Vertex position in local space
   * - normal: Vertex normal vector
   * - uv: Texture coordinates
   * - tangent: Tangent vector for TBN basis
   * - color: Vertex color
   * 
   * Varyings:
   * - vUV: Transformed UV coordinates passed to fragment shader
   * - vTangent: Aspect ratio and radius data passed to fragment shader
   */
  shader: string;
}

/**
 * Exported shader configuration object
 * Contains both the shader name and source code, automatically registered to ShaderStore
 */
export const mrdlInnerquadVertexShader: MrdlInnerquadVertexShader;