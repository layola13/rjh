/**
 * Wood procedural texture fragment shader module
 * Generates realistic wood grain patterns using fractal Brownian motion
 */

/**
 * Name identifier for the wood procedural texture pixel shader
 */
export const woodProceduralTexturePixelShaderName: string;

/**
 * GLSL fragment shader source code for wood procedural texture generation
 * 
 * Uniforms:
 * - ampScale: float - Amplitude scale factor for wood grain pattern frequency
 * - woodColor: vec3 - Base RGB color of the wood
 * 
 * Varyings:
 * - vPosition: vec2 - Vertex position in world space
 * - vUV: vec2 - Texture coordinates
 * 
 * Features:
 * - Pseudo-random noise generation using fractal Brownian motion (fBm)
 * - 4 octaves of noise for detailed wood grain effect
 * - Customizable shader injection points via CUSTOM_FRAGMENT_* defines
 */
export const woodProceduralTexturePixelShader: {
  /**
   * Shader identifier name
   */
  name: string;
  
  /**
   * Complete GLSL fragment shader source code
   * Includes rand(), noise(), and fbm() helper functions for procedural generation
   */
  shader: string;
};

/**
 * Type definition for shader store entry
 */
export interface ShaderDefinition {
  /** Unique name identifier for the shader */
  name: string;
  /** GLSL shader source code string */
  shader: string;
}