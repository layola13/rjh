/**
 * Sky shader vertex shader definition for Babylon.js materials system
 */

/**
 * Name identifier for the sky vertex shader
 */
export declare const skyVertexShaderName: string;

/**
 * GLSL source code for the sky vertex shader
 * 
 * This shader handles:
 * - Vertex position transformation to clip space
 * - World space position calculation for atmospheric effects
 * - Optional vertex colors (when VERTEXCOLOR is defined)
 * - Optional point size (when POINTSIZE is defined)
 * - Fog calculations via include directives
 * - Clipping plane support via include directives
 */
export declare const skyVertexShaderSource: string;

/**
 * Sky vertex shader object containing name and shader source
 * 
 * This object is registered in Babylon.js ShaderStore for runtime shader compilation
 */
export interface SkyVertexShader {
  /**
   * Unique name identifier for the shader
   */
  name: string;
  
  /**
   * GLSL vertex shader source code
   */
  shader: string;
}

/**
 * Exported sky vertex shader definition
 * 
 * Automatically registered in the ShaderStore.ShadersStore upon module load
 */
export declare const skyVertexShader: SkyVertexShader;