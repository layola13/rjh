/**
 * MRDL (Mixed Reality Design Language) inner quad vertex shader module
 * Provides vertex shader for rendering inner quad elements with glow effects
 */

/**
 * Shader name identifier
 */
export const mrdlInnerquadVertexShader: string;

/**
 * MRDL Inner Quad Vertex Shader
 * 
 * Uniforms:
 * - world: World transformation matrix
 * - viewProjection: Combined view-projection matrix
 * - cameraPosition: Camera position in world space
 * - _Color_: Base color of the quad
 * - _Radius_: Radius value for the quad
 * - _Fixed_Radius_: Whether to use fixed radius mode
 * - _Filter_Width_: Width of the filter effect
 * - _Glow_Fraction_: Fraction of glow intensity
 * - _Glow_Max_: Maximum glow value
 * - _Glow_Falloff_: Glow falloff rate
 * 
 * Attributes:
 * - position: Vertex position in local space
 * - normal: Vertex normal vector
 * - uv: Texture coordinates
 * - tangent: Tangent vector for normal mapping
 * - color: Vertex color
 * 
 * Varyings:
 * - vUV: Interpolated UV coordinates passed to fragment shader
 * - vTangent: Interpolated tangent data passed to fragment shader
 */
export interface MRDLInnerquadVertexShader {
  /**
   * Unique name identifier for the shader
   */
  readonly name: string;
  
  /**
   * GLSL shader source code
   */
  readonly shader: string;
}

/**
 * Shader store registration
 * Registers the shader with Babylon.js ShaderStore for runtime access
 */
declare module '@babylonjs/core/Engines/shaderStore' {
  interface ShaderStore {
    mrdlInnerquadVertexShader: string;
  }
}