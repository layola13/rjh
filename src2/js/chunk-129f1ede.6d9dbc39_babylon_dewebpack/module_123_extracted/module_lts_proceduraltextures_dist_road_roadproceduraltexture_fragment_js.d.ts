/**
 * Road procedural texture pixel shader module
 * Generates a procedural road texture using noise functions
 */

/**
 * Shader name identifier
 */
export const roadProceduralTexturePixelShaderName: string;

/**
 * GLSL shader source code for road procedural texture
 * Contains vertex-to-fragment varying, uniforms, noise generation, and main rendering logic
 */
export const roadProceduralTexturePixelShaderSource: string;

/**
 * Road procedural texture shader object
 * Contains both the shader name and source code
 */
export interface RoadProceduralTextureShader {
  /**
   * Unique identifier for the shader
   */
  name: string;
  
  /**
   * GLSL shader source code
   * Registers the shader in Babylon.js ShaderStore
   */
  shader: string;
}

/**
 * Exported shader configuration for road procedural texture
 * Automatically registered in Babylon.js shader store upon import
 */
export const roadProceduralTexturePixelShader: RoadProceduralTextureShader;