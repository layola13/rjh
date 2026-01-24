/**
 * Road procedural texture shader module
 * Provides GLSL fragment shader for generating procedural road textures
 */

/**
 * Shader name identifier
 */
export const roadProceduralTexturePixelShaderName: string = 'roadProceduralTexturePixelShader';

/**
 * GLSL fragment shader source code for road procedural texture
 * 
 * Features:
 * - Pseudo-random noise generation using fractal Brownian motion (FBM)
 * - Customizable road color uniform
 * - Procedural pattern generation based on fragment coordinates
 */
export const roadProceduralTexturePixelShader: string = `
precision highp float;

varying vec2 vUV;

uniform vec3 roadColor;

/**
 * Pseudo-random number generator based on 2D coordinates
 * @param n - 2D input vector
 * @return Random value in range [0, 1]
 */
float rand(vec2 n) {
    return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

/**
 * 2D noise function using bilinear interpolation
 * @param n - 2D input coordinates
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
 * Fractal Brownian Motion - layered noise for complex patterns
 * @param n - 2D input coordinates
 * @return Combined noise value with multiple octaves
 */
float fbm(vec2 n) {
    float total = 0.0;
    float amplitude = 1.0;
    for (int i = 0; i < 4; i++) {
        total += noise(n) * amplitude;
        n += n;
        amplitude *= 0.5;
    }
    return total;
}

#define CUSTOM_FRAGMENT_DEFINITIONS

void main(void) {
    #define CUSTOM_FRAGMENT_MAIN_BEGIN
    
    float ratioy = mod(gl_FragCoord.y * 100.0, fbm(vUV * 2.0));
    vec3 color = roadColor * ratioy;
    gl_FragColor = vec4(color, 1.0);
    
    #define CUSTOM_FRAGMENT_MAIN_END
}
`;

/**
 * Shader metadata object
 */
export interface IShaderData {
    /** Shader identifier name */
    name: string;
    /** GLSL shader source code */
    shader: string;
}

/**
 * Exported shader data for road procedural texture
 */
export const roadProceduralTextureShaderData: IShaderData = {
    name: roadProceduralTexturePixelShaderName,
    shader: roadProceduralTexturePixelShader
};

/**
 * Type declaration for shader store registration
 * Note: Actual registration with Babylon.js ShaderStore should be done at runtime
 */
declare module '@babylonjs/core/Engines/shaderStore' {
    interface IShaderStore {
        [roadProceduralTexturePixelShaderName]: string;
    }
}