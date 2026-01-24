/**
 * Shadow-only material fragment shader definition
 * Renders objects with only their shadow contribution visible
 */

/**
 * Name identifier for the shadow-only pixel shader
 */
export declare const shadowOnlyPixelShaderName: string;

/**
 * Shader metadata and source code for shadow-only rendering
 */
export interface ShadowOnlyShaderDefinition {
  /**
   * Unique identifier for this shader in the shader store
   */
  name: string;
  
  /**
   * GLSL fragment shader source code
   * Handles shadow computation and blending for shadow-only materials
   */
  shader: string;
}

/**
 * Shadow-only pixel shader configuration
 * 
 * This shader renders geometry with only shadow information visible,
 * allowing objects to cast shadows without being rendered themselves.
 * 
 * Features:
 * - Configurable shadow color
 * - Alpha blending support
 * - Normal mapping support (optional)
 * - Multi-light shadow computation
 * - Fog integration
 * - Clip plane support
 * 
 * Uniforms:
 * - vEyePosition: Camera position in world space
 * - alpha: Overall opacity multiplier
 * - shadowColor: Base color for shadow rendering
 * 
 * Varyings:
 * - vPositionW: Fragment position in world space
 * - vNormalW: Fragment normal in world space (if NORMAL defined)
 */
export declare const shadowOnlyPixelShader: ShadowOnlyShaderDefinition;