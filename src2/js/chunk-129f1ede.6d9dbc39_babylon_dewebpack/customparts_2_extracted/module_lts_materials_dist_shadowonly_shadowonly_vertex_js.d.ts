/**
 * Shadow-only vertex shader declaration module
 * Provides vertex shader for rendering shadow-only materials in Babylon.js
 */

/**
 * Shader name identifier
 */
export declare const shadowOnlyVertexShader: string;

/**
 * Shadow-only vertex shader configuration
 * Used for materials that only render shadows without visible geometry
 */
export interface ShadowOnlyVertexShaderConfig {
  /**
   * Unique identifier for the shader
   */
  name: string;
  
  /**
   * GLSL shader source code string
   * Contains vertex transformation logic for shadow-only rendering
   */
  shader: string;
}

/**
 * Shader store registry for managing shader sources
 */
export interface ShaderStore {
  /**
   * Collection of registered shader sources indexed by name
   */
  ShadersStore: Record<string, string>;
}

/**
 * Decorator utilities for shader management
 */
export interface ShaderDecorators {
  /**
   * Central shader storage system
   */
  ShaderStore: ShaderStore;
}