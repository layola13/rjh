/**
 * Mix vertex shader for material mixing operations
 * Handles vertex transformations, normal calculations, and texture coordinates
 */

/**
 * Name identifier for the mix vertex shader
 */
export const mixVertexShaderName: string;

/**
 * Mix vertex shader configuration and GLSL source code
 */
export interface MixVertexShader {
  /**
   * Shader identifier name
   */
  name: string;
  
  /**
   * GLSL shader source code string
   */
  shader: string;
}

/**
 * Exported mix vertex shader object containing shader name and source
 * 
 * Features:
 * - Vertex position transformation with world/view/projection matrices
 * - Optional normal transformation (NORMAL define)
 * - Dual UV channel support (UV1/UV2 defines)
 * - Vertex color support (VERTEXCOLOR define)
 * - Skeletal animation (bones)
 * - Baked vertex animation
 * - Instancing support
 * - Diffuse texture mapping with matrix transformation
 * - Fog calculations
 * - Shadow mapping for multiple lights
 * - Clip plane support
 * - Point size configuration (POINTSIZE define)
 */
export const mixVertexShader: MixVertexShader;