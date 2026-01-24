/**
 * Marble procedural texture fragment shader module
 * Generates a marble-like texture pattern with configurable tiles and colors
 */

/**
 * Name identifier for the marble procedural texture pixel shader
 */
export const marbleProceduralTexturePixelShaderName: string;

/**
 * GLSL source code for the marble procedural texture fragment shader
 */
export const marbleProceduralTexturePixelShaderSource: string;

/**
 * Marble procedural texture pixel shader configuration
 * Contains the shader name and source code registered in the shader store
 */
export interface MarbleProceduralTexturePixelShader {
  /**
   * Unique name identifier for the shader
   */
  name: string;
  
  /**
   * GLSL fragment shader source code
   * 
   * Uniforms:
   * - numberOfTilesHeight: Number of marble tiles in vertical direction
   * - numberOfTilesWidth: Number of marble tiles in horizontal direction
   * - amplitude: Turbulence amplitude affecting marble pattern intensity
   * - marbleColor: Base color of the marble material (RGB)
   * - jointColor: Color of the joints between tiles (RGB)
   * 
   * Varyings:
   * - vPosition: Vertex position passed from vertex shader
   * - vUV: Texture coordinates passed from vertex shader
   */
  shader: string;
}

/**
 * Default export containing the marble procedural texture shader configuration
 * Automatically registered in Babylon.js ShaderStore upon import
 */
export const marbleProceduralTexturePixelShader: MarbleProceduralTexturePixelShader;