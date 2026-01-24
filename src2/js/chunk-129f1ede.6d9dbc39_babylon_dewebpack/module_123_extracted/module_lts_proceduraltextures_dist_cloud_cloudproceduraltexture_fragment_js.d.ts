/**
 * Cloud procedural texture pixel shader module
 * Generates cloud-like patterns using fractional Brownian motion (fBM)
 */

/**
 * Shader name identifier
 */
export const cloudProceduralTexturePixelShader: string = "cloudProceduralTexturePixelShader";

/**
 * GLSL shader source code for cloud procedural texture
 * 
 * Uniforms:
 * - skyColor: Base sky color (vec4)
 * - cloudColor: Cloud color (vec4)
 * - amplitude: Noise amplitude multiplier (float)
 * - numOctaves: Number of noise octaves for fBM (int)
 * 
 * Varyings:
 * - vUV: Texture coordinates (vec2)
 */
export const shaderSource: string = `precision highp float;

varying vec2 vUV;

uniform vec4 skyColor;
uniform vec4 cloudColor;
uniform float amplitude;
uniform int numOctaves;

/**
 * Pseudo-random number generator
 * @param n - 2D seed vector
 * @return Random value in range [0, 1]
 */
float rand(vec2 n) {
    return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

/**
 * 2D Perlin-like noise function
 * @param n - 2D coordinate
 * @return Noise value in range [0, 1]
 */
float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n);
    vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(
        mix(rand(b), rand(b + d.yx), f.x),
        mix(rand(b + d.xy), rand(b + d.yy), f.x),
        f.y
    );
}

/**
 * Fractional Brownian motion (fBM) noise
 * Combines multiple octaves of noise at different frequencies
 * @param n - 2D coordinate
 * @return Accumulated noise value
 */
float fbm(vec2 n) {
    float total = 0.0;
    float ampl = amplitude;
    
    #ifdef WEBGL2
    for (int i = 0; i < numOctaves; i++) {
    #else
    for (int i = 0; i < 4; i++) {
    #endif
        total += noise(n) * ampl;
        n += n;
        ampl *= 0.5;
    }
    
    return total;
}

void main() {
    vec2 p = vUV * 12.0;
    vec4 c = mix(skyColor, cloudColor, fbm(p));
    gl_FragColor = c;
}
`;

/**
 * Shader metadata object
 */
export interface ShaderMetadata {
    /** Shader identifier name */
    name: string;
    /** GLSL shader source code */
    shader: string;
}

/**
 * Complete shader definition with metadata
 */
export const cloudShaderDefinition: ShaderMetadata = {
    name: cloudProceduralTexturePixelShader,
    shader: shaderSource
};

/**
 * Type definition for shader store registration
 */
declare module '@babylonjs/core' {
    namespace ShaderStore {
        interface ShadersStore {
            [cloudProceduralTexturePixelShader]: string;
        }
    }
}