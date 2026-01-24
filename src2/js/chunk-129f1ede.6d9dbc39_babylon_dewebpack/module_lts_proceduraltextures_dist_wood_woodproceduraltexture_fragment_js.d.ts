/**
 * Wood procedural texture fragment shader module
 * Generates a wood grain pattern using fractal Brownian motion (fbm) noise
 */

/**
 * Name identifier for the wood procedural texture pixel shader
 */
export declare const woodProceduralTexturePixelShaderName: string;

/**
 * GLSL fragment shader source code for wood procedural texture generation
 * 
 * This shader creates a realistic wood grain effect using:
 * - Pseudo-random noise generation
 * - Fractal Brownian Motion (fbm) for organic patterns
 * - Color modulation based on wood grain amplitude
 * 
 * Uniforms:
 * - ampScale: Controls the amplitude/scale of the wood grain pattern
 * - woodColor: Base color of the wood (RGB)
 * 
 * Varyings:
 * - vPosition: Vertex position (unused in current implementation)
 * - vUV: Texture coordinates for pattern generation
 */
export declare const woodProceduralTexturePixelShaderSource: string;

/**
 * Wood procedural texture shader definition
 * Contains both the shader name and source code
 */
export interface WoodProceduralTextureShader {
  /**
   * Unique identifier for the shader in the shader store
   */
  readonly name: string;
  
  /**
   * GLSL fragment shader source code
   */
  readonly shader: string;
}

/**
 * Complete wood procedural texture pixel shader export
 * Automatically registered in Babylon.js ShaderStore
 */
export declare const woodProceduralTexturePixelShader: WoodProceduralTextureShader;