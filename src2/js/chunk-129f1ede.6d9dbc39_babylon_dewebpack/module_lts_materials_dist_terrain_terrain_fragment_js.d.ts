/**
 * Terrain pixel shader module for Babylon.js terrain materials.
 * Provides fragment shader implementation for terrain rendering with multi-texture blending.
 */

/**
 * Name identifier for the terrain pixel shader
 */
export const terrainPixelShaderName: string;

/**
 * Terrain pixel shader configuration object containing shader name and GLSL source code.
 * 
 * This shader supports:
 * - Multi-texture blending (up to 3 diffuse textures)
 * - Normal mapping with bump textures
 * - Specular highlights
 * - Multiple simultaneous lights
 * - Fog effects
 * - Vertex colors
 * - Alpha testing
 * - Shadow mapping
 * - Clip planes
 */
export interface TerrainShaderConfig {
  /**
   * The unique name identifier for this shader
   */
  name: string;
  
  /**
   * The compiled GLSL fragment shader source code
   */
  shader: string;
}

/**
 * The terrain pixel shader configuration.
 * Contains the complete GLSL fragment shader code for terrain rendering.
 * 
 * Features:
 * - Blends three diffuse textures based on a control/mix texture (RGB channels)
 * - Optional bump mapping with three normal map textures
 * - Phong lighting model with specular highlights
 * - Per-pixel lighting calculations
 * - Fog and clip plane support
 * - Vertex color modulation
 * - Alpha testing for transparency
 * 
 * Uniforms:
 * - `vEyePosition`: Camera position in world space
 * - `vDiffuseColor`: Base diffuse color and alpha
 * - `vSpecularColor`: Specular color and glossiness
 * - `textureSampler`: Control/mix texture for blending
 * - `diffuse1Sampler`, `diffuse2Sampler`, `diffuse3Sampler`: Terrain texture layers
 * - `bump1Sampler`, `bump2Sampler`, `bump3Sampler`: Normal map layers (optional)
 * - `vTextureInfos`: Texture coordinate scaling factors
 * - `diffuse1Infos`, `diffuse2Infos`, `diffuse3Infos`: UV tiling for each layer
 * 
 * Varyings:
 * - `vPositionW`: Fragment position in world space
 * - `vNormalW`: Interpolated normal in world space
 * - `vTextureUV`: Texture coordinates
 * - `vColor`: Vertex color (if vertex colors enabled)
 */
export const terrainPixelShader: TerrainShaderConfig;