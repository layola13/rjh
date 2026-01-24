/**
 * Grid material fragment shader declaration module
 * Provides the GLSL fragment shader code for rendering grid materials
 */

/**
 * Name identifier for the grid pixel shader
 */
export const gridPixelShaderName: string;

/**
 * Grid pixel shader configuration object
 * Contains the shader name and GLSL source code for rendering grid patterns
 */
export interface GridPixelShader {
  /**
   * Unique identifier for the shader
   */
  name: string;
  
  /**
   * Complete GLSL fragment shader source code
   * 
   * Features:
   * - Dynamic grid line visibility based on camera distance
   * - Anisotropic attenuation to prevent moiré patterns
   * - Configurable major/minor grid lines
   * - Normal-based grid occlusion
   * - Fog support
   * - Opacity/transparency support
   * - Premultiplied alpha blending
   * 
   * Uniforms:
   * @uniform {float} visibility - Overall grid visibility multiplier
   * @uniform {vec3} mainColor - Primary grid background color
   * @uniform {vec3} lineColor - Grid line color
   * @uniform {vec4} gridControl - Grid parameters (ratio, frequency, minor visibility, max opacity)
   * @uniform {vec3} gridOffset - Spatial offset for grid positioning
   * @uniform {sampler2D} opacitySampler - Optional opacity texture (when OPACITY defined)
   * @uniform {vec2} vOpacityInfos - Opacity texture parameters (when OPACITY defined)
   * 
   * Varyings:
   * @varying {vec3} vPosition - World space position
   * @varying {vec3} vNormal - Surface normal
   * @varying {vec2} vOpacityUV - Opacity texture coordinates (when OPACITY defined)
   * 
   * Defines:
   * - MAX_LINE: Use maximum of x/y/z contributions instead of sum
   * - FOG: Enable fog calculations
   * - TRANSPARENT: Enable transparency mode
   * - OPACITY: Enable opacity texture sampling
   * - PREMULTIPLYALPHA: Premultiply RGB by alpha
   */
  shader: string;
}

/**
 * Exported grid pixel shader object
 * Automatically registers the shader in Babylon.js ShaderStore
 */
export const gridPixelShader: GridPixelShader;