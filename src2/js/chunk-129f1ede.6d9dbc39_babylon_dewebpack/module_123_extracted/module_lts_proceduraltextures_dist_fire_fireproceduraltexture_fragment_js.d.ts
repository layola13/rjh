/**
 * Fire procedural texture shader module
 * Generates animated fire effects using fractal Brownian motion (FBM) noise
 */

/**
 * Shader name identifier for the fire procedural texture pixel shader
 */
export const fireProceduralTexturePixelShader: string;

/**
 * GLSL fragment shader source code for fire procedural texture
 * 
 * Uniforms:
 * - time: Animation time parameter
 * - c1-c6: Six color vectors for gradient mixing
 * - speed: XY speed modifiers for animation
 * - shift: Color shift parameter affecting vertical gradient
 * - alphaThreshold: Alpha channel threshold for transparency
 * 
 * Varyings:
 * - vUV: Texture coordinates from vertex shader
 * 
 * Functions:
 * - rand: Pseudo-random number generator based on dot product
 * - noise: Perlin-like noise function using bilinear interpolation
 * - fbm: Fractal Brownian Motion - layered noise with decreasing amplitude
 * 
 * Output: vec4 color with computed luminance-based alpha
 */
export interface FireProceduralTextureShader {
    /**
     * Shader identifier name
     */
    name: string;
    
    /**
     * GLSL shader source code string
     */
    shader: string;
}

declare module "core/Misc/decorators" {
    interface ShaderStore {
        /**
         * Global shader storage registry
         */
        ShadersStore: Record<string, string>;
    }
}