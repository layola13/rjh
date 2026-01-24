/**
 * Grid material vertex shader declaration module
 * @module GridVertexShader
 */

/**
 * Name identifier for the grid vertex shader
 */
export declare const GRID_VERTEX_SHADER_NAME: string;

/**
 * GLSL vertex shader source code for grid material rendering.
 * 
 * Features:
 * - Supports instanced rendering
 * - Optional UV1 and UV2 texture coordinates
 * - Fog effects integration
 * - Opacity mapping with texture matrix transformation
 * - World space position and normal outputs for fragment shader
 * 
 * Defines:
 * - `UV1`: Enable primary UV coordinates
 * - `UV2`: Enable secondary UV coordinates
 * - `OPACITY`: Enable opacity texture mapping
 */
export declare const GRID_VERTEX_SHADER_SOURCE: string;

/**
 * Grid vertex shader configuration object.
 * Automatically registers the shader with Babylon.js ShaderStore.
 */
export interface GridVertexShader {
  /**
   * Unique identifier for the shader
   */
  name: string;
  
  /**
   * The compiled GLSL shader source code stored in ShaderStore
   */
  shader: string;
}

/**
 * Exported grid vertex shader configuration.
 * Contains the shader name and source code registered in the engine's shader store.
 */
export declare const gridVertexShader: GridVertexShader;