/**
 * Shadow-only material fragment shader declaration
 * Used for rendering objects that only cast or receive shadows without surface material
 */

/**
 * GLSL shader source code for shadow-only pixel rendering
 * Implements a fragment shader that renders only shadow contribution with configurable color and alpha
 */
export declare const shadowOnlyPixelShader: {
  /**
   * Unique identifier for the shader in the shader store
   */
  name: string;
  
  /**
   * GLSL fragment shader source code
   * 
   * Features:
   * - Configurable shadow color and alpha blending
   * - Optional normal mapping support
   * - Multi-light shadow computation (up to maxSimultaneousLights)
   * - Clip plane and fog effects support
   * - High precision float calculations
   * 
   * Uniforms:
   * - vEyePosition: vec4 - Camera/eye position in world space
   * - alpha: float - Base alpha/opacity value
   * - shadowColor: vec3 - RGB color of the shadow
   * 
   * Varyings:
   * - vPositionW: vec3 - Fragment position in world space
   * - vNormalW: vec3 - Fragment normal in world space (optional, ifdef NORMAL)
   * 
   * Output:
   * - gl_FragColor: vec4 - Final fragment color with shadow-modulated alpha
   */
  shader: string;
};

/**
 * Shader name constant
 * @internal
 */
export declare const shadowOnlyPixelShaderName = "shadowOnlyPixelShader";