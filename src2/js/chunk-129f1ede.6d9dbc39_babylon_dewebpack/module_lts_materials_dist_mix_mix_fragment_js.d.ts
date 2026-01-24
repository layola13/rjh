/**
 * Mix material pixel shader module
 * Provides GLSL fragment shader for blending multiple textures based on mix maps
 */

/**
 * Name identifier for the mix pixel shader
 */
export const mixPixelShaderName: string;

/**
 * Mix pixel shader configuration and source code
 * 
 * This shader blends up to 8 diffuse textures using 1-2 mix maps (RGBA channels).
 * Each channel of the mix map controls the blend factor for different texture layers.
 * 
 * Features:
 * - Support for up to 4 diffuse textures (base) or 8 textures (with MIXMAP2)
 * - Specular lighting with glossiness control
 * - Vertex colors and alpha blending
 * - Normal mapping and lighting calculations
 * - Fog and clip plane support
 * - Shadow mapping integration
 */
export interface MixPixelShaderConfig {
  /**
   * Shader identifier name
   */
  name: string;
  
  /**
   * GLSL fragment shader source code
   * 
   * Uniforms:
   * - vEyePosition: Camera position in world space
   * - vDiffuseColor: Base diffuse color and alpha
   * - vSpecularColor: Specular color and glossiness (SPECULARTERM)
   * - mixMap1Sampler: Primary RGBA mix map controlling blend weights
   * - mixMap2Sampler: Secondary RGBA mix map for textures 5-8 (MIXMAP2)
   * - diffuse1-8Sampler: Input diffuse texture samplers
   * - diffuse1-8Infos: UV tiling factors for each diffuse texture
   * - vTextureInfos: Texture intensity multiplier
   * 
   * Varyings:
   * - vPositionW: World space position
   * - vNormalW: World space normal (NORMAL)
   * - vColor: Vertex color (VERTEXCOLOR)
   * - vTextureUV: Base UV coordinates (DIFFUSE)
   * 
   * Defines:
   * - DIFFUSE: Enable texture mixing
   * - MIXMAP2: Enable 8-texture mode (default is 4 textures)
   * - SPECULARTERM: Enable specular highlights
   * - NORMAL: Enable normal-based lighting
   * - VERTEXCOLOR: Multiply by vertex colors
   * - VERTEXALPHA: Use vertex alpha channel
   */
  shader: string;
}

/**
 * Exported mix pixel shader configuration
 * Contains the complete GLSL source code and metadata
 */
export const mixPixelShader: MixPixelShaderConfig;