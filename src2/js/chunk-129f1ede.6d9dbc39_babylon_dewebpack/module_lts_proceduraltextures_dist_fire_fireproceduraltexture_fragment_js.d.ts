/**
 * Fire procedural texture fragment shader module
 * Generates animated fire effect using fractal Brownian motion (FBM) noise
 */

/**
 * Shader name identifier used for registration in the shader store
 */
export const fireProceduralTexturePixelShaderName: string;

/**
 * Fire procedural texture fragment shader configuration
 */
export interface FireProceduralTextureShader {
  /**
   * Unique identifier for the shader
   */
  name: string;
  
  /**
   * GLSL fragment shader source code
   * 
   * Uniforms:
   * - time: Animation time value
   * - c1-c6: Color gradient control points (vec3)
   * - speed: Animation speed in x/y directions (vec2)
   * - shift: Vertical color shift factor
   * - alphaThreshold: Transparency threshold value
   * 
   * Varyings:
   * - vUV: Texture coordinates
   * 
   * Implementation:
   * - Uses pseudo-random noise generation
   * - Applies fractal Brownian motion for organic fire patterns
   * - Mixes multiple color gradients based on noise values
   * - Calculates luminance for alpha channel modulation
   */
  shader: string;
}

/**
 * Fire procedural texture pixel shader export
 * Contains the complete GLSL shader code for generating fire effects
 */
export const fireProceduralTexturePixelShader: FireProceduralTextureShader;