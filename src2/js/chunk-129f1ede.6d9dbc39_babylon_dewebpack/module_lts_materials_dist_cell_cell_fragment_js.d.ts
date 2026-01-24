/**
 * Cell shading pixel shader module
 * Provides toon/cel-shaded rendering effects with customizable brightness levels
 */

/**
 * Shader name identifier
 */
export const cellPixelShaderName: string;

/**
 * Cell shading pixel shader configuration
 */
export interface CellPixelShader {
  /**
   * Unique name identifier for the shader
   */
  name: string;
  
  /**
   * GLSL shader source code for cell/toon shading effect
   */
  shader: string;
}

/**
 * Cell shading pixel shader instance
 * Implements cartoon-style rendering with discrete brightness levels
 * 
 * Features:
 * - Configurable toon thresholds for light intensity steps
 * - Support for diffuse textures and vertex colors
 * - Optional normal mapping and alpha testing
 * - Custom diffuse lighting computation with shadow support
 * - Two modes: CELLBASIC (2-level) and advanced (5-level) shading
 */
export const cellPixelShader: CellPixelShader;