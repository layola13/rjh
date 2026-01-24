/**
 * Grid material fragment shader module
 * Provides shader code for rendering grid patterns with configurable visibility,
 * major/minor grid lines, and fog effects.
 */

/**
 * Name identifier for the grid pixel shader
 */
export const gridPixelShaderName: string;

/**
 * Grid pixel shader configuration and source code
 */
export interface GridPixelShader {
  /**
   * Shader name identifier
   */
  name: string;
  
  /**
   * GLSL shader source code for grid fragment rendering
   * 
   * Features:
   * - Dynamic visibility based on major grid frequency
   * - Anisotropic attenuation for line rendering
   * - Normal-based axis contribution
   * - Optional fog and opacity support
   * - Transparency and premultiplied alpha support
   */
  shader: string;
}

/**
 * Exported grid pixel shader instance containing the complete
 * fragment shader code for grid material rendering
 */
export const gridPixelShader: GridPixelShader;