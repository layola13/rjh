/**
 * Lava material pixel shader module
 * Provides shader code for lava material rendering with animated noise-based effects
 */

/**
 * Shader name identifier
 */
export const LAVA_PIXEL_SHADER_NAME = "lavaPixelShader";

/**
 * GLSL shader source code for lava pixel/fragment shader
 * 
 * Features:
 * - Animated lava texture using noise-based distortion
 * - Fog effects with configurable density and color
 * - Multi-light support (up to 4 lights)
 * - Shadow mapping
 * - Vertex colors and alpha testing
 * - Clip planes and depth pre-pass
 */
export const LAVA_PIXEL_SHADER_SOURCE = `precision highp float;

// Uniforms - Camera and Material
uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;

// Varyings - World space position
varying vec3 vPositionW;

// Uniforms - Animation parameters
uniform float time;
uniform float speed;
uniform float movingSpeed;

// Uniforms - Fog parameters
uniform vec3 fogColor;
uniform float fogDensity;

// Uniforms - Textures
uniform sampler2D noiseTexture;

// Varyings - Noise value from vertex shader
varying float noise;

#ifdef NORMAL
varying vec3 vNormalW;
#endif

#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

// Include helper functions
#include<helperFunctions>

// Light declarations (supports up to 4 lights)
#include<__decl__lightFragment>[0]
#include<__decl__lightFragment>[1]
#include<__decl__lightFragment>[2]
#include<__decl__lightFragment>[3]

// Lighting and shadow functions
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>

#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform sampler2D diffuseSampler;
uniform vec2 vDiffuseInfos;
#endif

#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>

/**
 * Pseudo-random number generator
 * @param scale - Scale vector for randomization
 * @param seed - Seed value for randomization
 * @return Random float value in range [0, 1]
 */
float random(vec3 scale, float seed) {
    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}

#define CUSTOM_FRAGMENT_DEFINITIONS

void main(void) {
    #define CUSTOM_FRAGMENT_MAIN_BEGIN
    
    #include<clipPlaneFragment>
    
    // Calculate view direction
    vec3 viewDirectionW = normalize(vEyePosition.xyz - vPositionW);
    
    // Initialize base color and diffuse properties
    vec4 baseColor = vec4(1.0, 1.0, 1.0, 1.0);
    vec3 diffuseColor = vDiffuseColor.rgb;
    float alpha = vDiffuseColor.a;
    
    #ifdef DIFFUSE
    // Sample noise texture
    vec4 noiseTex = texture2D(noiseTexture, vDiffuseUV);
    
    // Calculate animated UV coordinates with time-based offset
    vec2 T1 = vDiffuseUV + vec2(1.5, -1.5) * time * 0.02;
    vec2 T2 = vDiffuseUV + vec2(-0.5, 2.0) * time * 0.01 * speed;
    
    // Apply noise distortion to UV coordinates
    T1.x += noiseTex.x * 2.0;
    T1.y += noiseTex.y * 2.0;
    T2.x -= noiseTex.y * 0.2 + time * 0.001 * movingSpeed;
    T2.y += noiseTex.z * 0.2 + time * 0.002 * movingSpeed;
    
    // Sample noise for intensity variation
    float p = texture2D(noiseTexture, T1 * 3.0).a;
    
    // Sample lava texture with distorted UVs
    vec4 lavaColor = texture2D(diffuseSampler, T2 * 4.0);
    
    // Combine lava color with noise pattern
    vec4 temp = lavaColor * (vec4(p, p, p, p) * 2.0) + (lavaColor * lavaColor - 0.1);
    baseColor = temp;
    
    // Calculate fog based on depth
    float depth = gl_FragCoord.z * 4.0;
    const float LOG2 = 1.442695;
    float fogFactor = exp2(-fogDensity * fogDensity * depth * depth * LOG2);
    fogFactor = 1.0 - clamp(fogFactor, 0.0, 1.0);
    
    // Apply fog blending
    baseColor = mix(baseColor, vec4(fogColor, baseColor.w), fogFactor);
    diffuseColor = baseColor.rgb;
    
    #ifdef ALPHATEST
    // Discard fragment if alpha is below threshold
    if (baseColor.a < 0.4)
        discard;
    #endif
    
    #include<depthPrePass>
    
    // Apply diffuse info scaling
    baseColor.rgb *= vDiffuseInfos.y;
    #endif
    
    #ifdef VERTEXCOLOR
    // Apply vertex colors
    baseColor.rgb *= vColor.rgb;
    #endif
    
    #ifdef NORMAL
    vec3 normalW = normalize(vNormalW);
    #else
    vec3 normalW = vec3(1.0, 1.0, 1.0);
    #endif
    
    #ifdef UNLIT
    // Unlit mode - no lighting calculations
    vec3 diffuseBase = vec3(1.0, 1.0, 1.0);
    #else
    // Lit mode - calculate lighting
    vec3 diffuseBase = vec3(0.0, 0.0, 0.0);
    lightingInfo info;
    float shadow = 1.0;
    float glossiness = 0.0;
    
    // Process each light source
    #include<lightFragment>[0]
    #include<lightFragment>[1]
    #include<lightFragment>[2]
    #include<lightFragment>[3]
    #endif
    
    #if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
    // Apply vertex alpha
    alpha *= vColor.a;
    #endif
    
    // Calculate final diffuse color
    vec3 finalDiffuse = clamp(diffuseBase * diffuseColor, 0.0, 1.0) * baseColor.rgb;
    vec4 color = vec4(finalDiffuse, alpha);
    
    #include<fogFragment>
    
    // Output final color
    gl_FragColor = color;
    
    #include<imageProcessingCompatibility>
    
    #define CUSTOM_FRAGMENT_MAIN_END
}
`;

/**
 * Lava pixel shader export object
 * Contains shader name and source code
 */
export interface LavaPixelShader {
    /** Shader identifier name */
    name: string;
    /** GLSL shader source code */
    shader: string;
}

/**
 * Exported lava pixel shader configuration
 */
export const lavaPixelShader: LavaPixelShader = {
    name: LAVA_PIXEL_SHADER_NAME,
    shader: LAVA_PIXEL_SHADER_SOURCE
};