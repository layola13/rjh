/**
 * Mix material fragment shader definition
 * Provides shader code for blending multiple diffuse textures using mix maps
 */

/**
 * Name identifier for the mix pixel shader
 */
export const mixPixelShaderName: string;

/**
 * Mix pixel shader configuration object
 */
export interface MixPixelShaderConfig {
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
 * Main mix pixel shader export containing shader source and metadata.
 * 
 * This shader supports:
 * - Up to 8 diffuse texture layers (4 base + 4 extended with MIXMAP2)
 * - 2 mix maps for controlling texture blending
 * - Multiple simultaneous light sources
 * - Specular highlights and glossiness
 * - Vertex colors
 * - Fog effects
 * - Shadow mapping
 * - Clip planes
 * 
 * Preprocessor defines:
 * - DIFFUSE: Enable texture sampling
 * - MIXMAP2: Enable extended 5-8 texture layers
 * - SPECULARTERM: Enable specular lighting calculations
 * - NORMAL: Enable normal mapping
 * - VERTEXCOLOR: Enable per-vertex color modulation
 * - VERTEXALPHA: Enable per-vertex alpha blending
 * - INSTANCES/INSTANCESCOLOR: Enable instanced rendering with colors
 */
export const mixPixelShader: MixPixelShaderConfig;