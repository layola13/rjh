/**
 * Grid vertex shader module for Babylon.js materials system.
 * Handles vertex transformation, fog, opacity, and instancing for grid rendering.
 */

/**
 * Name identifier for the grid vertex shader in the shader store.
 */
export const gridVertexShaderName: string;

/**
 * GLSL vertex shader source code for grid material rendering.
 * 
 * Features:
 * - Instance rendering support
 * - Optional UV mapping (UV1 and UV2)
 * - Fog calculations
 * - Opacity texture mapping with matrix transformation
 * - World space position and normal transformation
 * 
 * @remarks
 * This shader is registered in Babylon.js ShaderStore upon module initialization.
 * Supports preprocessor directives: UV1, UV2, OPACITY
 */
export const gridVertexShader: {
  /**
   * Shader identifier name matching the ShaderStore key.
   */
  name: string;
  
  /**
   * Complete GLSL vertex shader source code string.
   * Includes variable precision, attributes, uniforms, varyings, and main function.
   */
  shader: string;
};

/**
 * Type definition for shader store registration object.
 */
export interface ShaderDefinition {
  /** Unique name identifier for the shader */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

declare module '@babylonjs/core' {
  namespace ShaderStore {
    interface ShadersStore {
      /** Grid vertex shader entry in the global shader store */
      gridVertexShader: string;
    }
  }
}