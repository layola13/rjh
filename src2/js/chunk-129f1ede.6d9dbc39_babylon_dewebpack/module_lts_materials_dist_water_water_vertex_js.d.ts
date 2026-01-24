/**
 * Water material vertex shader definition module
 * Provides GLSL vertex shader code for water surface rendering with wave animations
 */

/**
 * Name identifier for the water vertex shader
 */
export declare const waterVertexShaderName: string;

/**
 * Water vertex shader configuration object
 */
export interface WaterVertexShader {
  /**
   * The shader identifier name
   */
  name: string;
  
  /**
   * The complete GLSL vertex shader source code
   * 
   * Features:
   * - Wave animation based on sine/cosine functions
   * - Wind direction and force parameters
   * - Normal mapping support with optional superimpose
   * - Reflection and refraction texture coordinate generation
   * - Standard attributes: position, normal, uv, uv2, vertex colors
   * - Babylon.js standard includes: bones, instances, fog, shadows, clip planes
   * - Configurable wave parameters: height, speed, length, count
   */
  shader: string;
}

/**
 * Exported water vertex shader object containing name and GLSL source code
 * 
 * The shader implements:
 * - Dynamic wave displacement using trigonometric functions
 * - Wind-driven wave direction and intensity
 * - Reflection/refraction mapping for realistic water surface
 * - Optional bump mapping with dual-layer support (BUMPSUPERIMPOSE)
 * - Integration with Babylon.js lighting, shadowing, and fog systems
 * 
 * Uniforms:
 * - `windDirection`: vec2 - Direction of wind affecting waves
 * - `waveLength`: float - Wavelength of water surface oscillation
 * - `time`: float - Animation time parameter
 * - `windForce`: float - Strength of wind effect
 * - `waveHeight`: float - Amplitude of wave displacement
 * - `waveSpeed`: float - Speed of wave animation
 * - `waveCount`: float - Number of waves across surface
 * - `worldReflectionViewProjection`: mat4 - Transform for reflection mapping
 * 
 * Varyings:
 * - `vPositionW`: vec3 - World space position
 * - `vNormalW`: vec3 - World space normal
 * - `vNormalUV`: vec2 - UV coordinates for normal map
 * - `vNormalUV2`: vec2 - Secondary UV for bump superimpose
 * - `vRefractionMapTexCoord`: vec3 - Refraction map coordinates
 * - `vReflectionMapTexCoord`: vec3 - Reflection map coordinates
 */
export declare const waterVertexShader: WaterVertexShader;