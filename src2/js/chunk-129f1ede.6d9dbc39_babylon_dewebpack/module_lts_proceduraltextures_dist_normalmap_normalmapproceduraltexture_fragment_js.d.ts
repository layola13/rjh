/**
 * Normal map procedural texture shader module
 * Generates normal maps from height/luminance data
 */

/**
 * Shader name identifier used for registration in the shader store
 */
export const normalMapProceduralTexturePixelShaderName: string;

/**
 * GLSL fragment shader source code for normal map generation
 * 
 * This shader:
 * - Samples a base texture to extract luminance values
 * - Calculates gradients using neighboring pixels
 * - Converts height differences into normal map data
 * 
 * Uniforms:
 * - baseSampler: Input texture sampler
 * - size: Texture size for coordinate offsets
 * 
 * Varyings:
 * - vUV: Texture coordinates
 */
export const normalMapProceduralTexturePixelShaderSource: string;

/**
 * Shader configuration object containing name and source
 */
export interface NormalMapShaderConfig {
  /**
   * Unique identifier for the shader
   */
  name: string;
  
  /**
   * GLSL shader source code
   */
  shader: string;
}

/**
 * Exported shader configuration for normal map procedural texture
 * Automatically registered in Babylon.js ShaderStore
 */
export const normalMapProceduralTexturePixelShader: NormalMapShaderConfig;