/**
 * Perlin Noise Procedural Texture Fragment Shader Module
 * 
 * This module provides a fragment shader for generating Perlin noise textures
 * in Babylon.js procedural textures system.
 */

/**
 * Shader identifier for the Perlin Noise procedural texture pixel shader
 */
export declare const SHADER_NAME: "perlinNoiseProceduralTexturePixelShader";

/**
 * GLSL fragment shader source code for Perlin noise generation.
 * 
 * Uniforms:
 * - size: float - Controls the scale/frequency of the noise pattern
 * - time: float - Animation time parameter for time-based noise evolution
 * - translationSpeed: float - Speed of texture translation/movement
 * 
 * Varyings:
 * - vUV: vec2 - UV coordinates from vertex shader
 * 
 * The shader combines Perlin noise with Worley (cellular) noise at multiple
 * octaves to create complex procedural textures.
 */
export declare const SHADER_SOURCE: string;

/**
 * Shader metadata object containing the shader name and reference
 */
export interface PerlinNoiseShaderMetadata {
  /** The unique identifier for this shader */
  name: typeof SHADER_NAME;
  
  /** Reference to the shader source stored in ShaderStore */
  shader: string;
}

/**
 * The exported shader configuration for Perlin Noise procedural texture.
 * 
 * This object is registered in Babylon.js ShaderStore and can be referenced
 * by the shader name for procedural texture generation.
 */
export declare const perlinNoiseProceduralTexturePixelShader: PerlinNoiseShaderMetadata;

/**
 * Babylon.js ShaderStore decorator module
 * 
 * Provides access to the global shader storage system where all shaders
 * are registered and retrieved by name.
 */
declare module "core/Misc/decorators" {
  export namespace ShaderStore {
    /**
     * Global registry of all shader source code strings indexed by shader name
     */
    export interface ShadersStore {
      [shaderName: string]: string;
    }
    
    /**
     * The global shader storage object
     */
    export const ShadersStore: ShadersStore;
  }
}