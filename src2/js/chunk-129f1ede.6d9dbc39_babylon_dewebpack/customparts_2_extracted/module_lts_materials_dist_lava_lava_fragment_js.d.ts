/**
 * Lava material pixel shader module
 * Provides shader code for rendering lava effect with noise-based animation
 */

/**
 * Shader uniform and varying declarations
 */
interface LavaShaderUniforms {
  /** Eye/camera position in world space */
  vEyePosition: vec4;
  /** Diffuse color with alpha channel */
  vDiffuseColor: vec4;
  /** Animation time parameter */
  time: number;
  /** Base animation speed multiplier */
  speed: number;
  /** Texture movement speed multiplier */
  movingSpeed: number;
  /** Fog color RGB values */
  fogColor: vec3;
  /** Noise texture sampler for distortion effects */
  noiseTexture: sampler2D;
  /** Fog density factor */
  fogDensity: number;
  /** Diffuse texture sampler (when DIFFUSE is defined) */
  diffuseSampler?: sampler2D;
  /** Diffuse texture transform info (when DIFFUSE is defined) */
  vDiffuseInfos?: vec2;
}

/**
 * Shader varying inputs from vertex shader
 */
interface LavaShaderVaryings {
  /** Fragment position in world space */
  vPositionW: vec3;
  /** Procedural noise value */
  noise: number;
  /** Normal vector in world space (when NORMAL is defined) */
  vNormalW?: vec3;
  /** Vertex color (when VERTEXCOLOR is defined) */
  vColor?: vec4;
  /** Diffuse UV coordinates (when DIFFUSE is defined) */
  vDiffuseUV?: vec2;
}

/**
 * Shader name identifier
 */
export const LAVA_PIXEL_SHADER_NAME = "lavaPixelShader";

/**
 * GLSL source code for lava pixel shader
 * 
 * Features:
 * - Noise-based lava animation
 * - Time-animated texture distortion
 * - Fog effects with exponential falloff
 * - Lighting support with up to 4 light sources
 * - Vertex colors and alpha testing
 * - Clip plane support
 */
export const lavaPixelShader: string = `
precision highp float;

// Uniforms
uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;
uniform float time;
uniform float speed;
uniform float movingSpeed;
uniform vec3 fogColor;
uniform sampler2D noiseTexture;
uniform float fogDensity;

// Varyings
varying vec3 vPositionW;
varying float noise;

#ifdef NORMAL
varying vec3 vNormalW;
#endif

#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

// Include directives for Babylon.js shader system
#include<helperFunctions>
#include<__decl__lightFragment>[0]
#include<__decl__lightFragment>[1]
#include<__decl__lightFragment>[2]
#include<__decl__lightFragment>[3]
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
 * Pseudo-random function based on fragment coordinates
 * @param scale - Random seed scale vector
 * @param seed - Additional seed value
 * @return Pseudo-random value in range [0, 1]
 */
float random(vec3 scale, float seed) {
    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}

#define CUSTOM_FRAGMENT_DEFINITIONS

void main(void) {
    #define CUSTOM_FRAGMENT_MAIN_BEGIN
    #include<clipPlaneFragment>
    
    // View direction calculation
    vec3 viewDirectionW = normalize(vEyePosition.xyz - vPositionW);
    
    // Base color initialization
    vec4 baseColor = vec4(1.0, 1.0, 1.0, 1.0);
    vec3 diffuseColor = vDiffuseColor.rgb;
    float alpha = vDiffuseColor.a;
    
    #ifdef DIFFUSE
    // Sample noise texture
    vec4 noiseTex = texture2D(noiseTexture, vDiffuseUV);
    
    // Animated UV coordinates with different speeds
    vec2 T1 = vDiffuseUV + vec2(1.5, -1.5) * time * 0.02;
    vec2 T2 = vDiffuseUV + vec2(-0.5, 2.0) * time * 0.01 * speed;
    
    // Apply noise distortion
    T1.x += noiseTex.x * 2.0;
    T1.y += noiseTex.y * 2.0;
    T2.x -= noiseTex.y * 0.2 + time * 0.001 * movingSpeed;
    T2.y += noiseTex.z * 0.2 + time * 0.002 * movingSpeed;
    
    // Sample textures with distorted UVs
    float p = texture2D(noiseTexture, T1 * 3.0).a;
    vec4 lavaColor = texture2D(diffuseSampler, T2 * 4.0);
    
    // Combine lava color with procedural intensity
    vec4 temp = lavaColor * (vec4(p, p, p, p) * 2.0) + (lavaColor * lavaColor - 0.1);
    baseColor = temp;
    
    // Exponential fog calculation
    float depth = gl_FragCoord.z * 4.0;
    const float LOG2 = 1.442695;
    float fogFactor = exp2(-fogDensity * fogDensity * depth * depth * LOG2);
    fogFactor = 1.0 - clamp(fogFactor, 0.0, 1.0);
    
    // Apply fog
    baseColor = mix(baseColor, vec4(fogColor, baseColor.w), fogFactor);
    diffuseColor = baseColor.rgb;
    
    #ifdef ALPHATEST
    if (baseColor.a < 0.4)
        discard;
    #endif
    
    #include<depthPrePass>
    
    baseColor.rgb *= vDiffuseInfos.y;
    #endif
    
    #ifdef VERTEXCOLOR
    baseColor.rgb *= vColor.rgb;
    #endif
    
    #ifdef NORMAL
    vec3 normalW = normalize(vNormalW);
    #else
    vec3 normalW = vec3(1.0, 1.0, 1.0);
    #endif
    
    #ifdef UNLIT
    vec3 diffuseBase = vec3(1.0, 1.0, 1.0);
    #else
    vec3 diffuseBase = vec3(0.0, 0.0, 0.0);
    lightingInfo info;
    float shadow = 1.0;
    float glossiness = 0.0;
    
    #include<lightFragment>[0]
    #include<lightFragment>[1]
    #include<lightFragment>[2]
    #include<lightFragment>[3]
    #endif
    
    #if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
    alpha *= vColor.a;
    #endif
    
    // Final color composition
    vec3 finalDiffuse = clamp(diffuseBase * diffuseColor, 0.0, 1.0) * baseColor.rgb;
    vec4 color = vec4(finalDiffuse, alpha);
    
    #include<fogFragment>
    
    gl_FragColor = color;
    
    #include<imageProcessingCompatibility>
    #define CUSTOM_FRAGMENT_MAIN_END
}
`;

/**
 * Type definition for shader store registration
 */
export interface ShaderDefinition {
  /** Shader name identifier */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Shader definition object for registration with Babylon.js shader store
 */
export const lavaPixelShaderDefinition: ShaderDefinition = {
  name: LAVA_PIXEL_SHADER_NAME,
  shader: lavaPixelShader
};