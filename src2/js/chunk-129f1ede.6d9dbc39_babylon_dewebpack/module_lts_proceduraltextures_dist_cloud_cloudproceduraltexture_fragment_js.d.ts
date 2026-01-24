/**
 * Cloud procedural texture fragment shader module
 * Generates cloud patterns using fractal Brownian motion (FBM) noise
 */

/**
 * Shader name identifier for the cloud procedural texture pixel shader
 */
export const cloudProceduralTexturePixelShaderName: string = "cloudProceduralTexturePixelShader";

/**
 * GLSL fragment shader source code for cloud procedural texture generation
 * 
 * Uniforms:
 * - skyColor: Base sky color (vec4)
 * - cloudColor: Cloud color (vec4)
 * - amplitude: Noise amplitude for FBM generation (float)
 * - numOctaves: Number of octaves for FBM calculation (int)
 * 
 * Varyings:
 * - vUV: Texture coordinates from vertex shader (vec2)
 * 
 * Algorithm:
 * Uses fractal Brownian motion with multiple octaves of Perlin-like noise
 * to create realistic cloud patterns by mixing sky and cloud colors.
 */
export const cloudProceduralTexturePixelShaderSource: string = `
precision highp float;

varying vec2 vUV;

uniform vec4 skyColor;
uniform vec4 cloudColor;
uniform float amplitude;
uniform int numOctaves;

/**
 * Pseudo-random number generator based on 2D coordinates
 * @param n Input 2D vector
 * @return Random value in range [0, 1]
 */
float rand(vec2 n) {
    return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

/**
 * 2D Perlin-like noise function
 * @param n Input 2D coordinate
 * @return Noise value interpolated between random values at grid corners
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
 * Fractal Brownian Motion - combines multiple octaves of noise
 * @param n Input 2D coordinate
 * @return Accumulated noise value across multiple frequencies
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
 * Cloud procedural texture pixel shader definition
 * Represents the complete shader object with name and source
 */
export interface CloudProceduralTexturePixelShader {
    /** Unique identifier for the shader */
    readonly name: string;
    /** GLSL source code for the fragment shader */
    readonly shader: string;
}

/**
 * Complete shader export object
 * This would typically be registered in Babylon.js ShaderStore
 */
export const cloudProceduralTexturePixelShader: CloudProceduralTexturePixelShader = {
    name: cloudProceduralTexturePixelShaderName,
    shader: cloudProceduralTexturePixelShaderSource
};