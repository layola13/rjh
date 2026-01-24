/**
 * Grass procedural texture shader module
 * Provides fragment shader for generating grass textures procedurally
 */

/**
 * Shader name identifier used for registration in the shader store
 */
export const grassProceduralTexturePixelShaderName: string;

/**
 * GLSL fragment shader source code for grass procedural texture generation.
 * 
 * This shader generates realistic grass textures using noise functions and color mixing.
 * 
 * **Uniforms:**
 * - `herb1Color` (vec3): Primary grass blade color
 * - `herb2Color` (vec3): Secondary grass blade color  
 * - `herb3Color` (vec3): Tertiary grass blade color
 * - `groundColor` (vec3): Base ground/soil color
 * 
 * **Varyings:**
 * - `vPosition` (vec2): Vertex position in texture space
 * - `vUV` (vec2): UV coordinates
 * 
 * **Functions:**
 * - `rand(vec2)`: Pseudo-random number generator based on fragment coordinates
 * - `noise(vec2)`: Perlin-like noise function for smooth variations
 * - `fbm(vec2)`: Fractional Brownian Motion for multi-octave noise
 * 
 * **Output:**
 * - `gl_FragColor`: Final grass texture color with full opacity
 */
export const grassProceduralTexturePixelShader: string;

/**
 * Shader registration object containing metadata
 */
export interface GrassProceduralTextureShader {
  /**
   * Unique shader identifier
   */
  name: string;
  
  /**
   * GLSL shader source code registered in ShaderStore
   */
  shader: string;
}

/**
 * Default export containing shader name and registered shader reference
 */
declare const _default: GrassProceduralTextureShader;
export default _default;