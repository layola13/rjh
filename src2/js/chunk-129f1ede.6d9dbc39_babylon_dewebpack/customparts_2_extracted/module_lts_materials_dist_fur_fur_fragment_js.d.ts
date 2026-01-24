/**
 * Fur material fragment shader for Babylon.js
 * Provides realistic fur rendering with configurable length, color, and lighting
 */

/**
 * Name identifier for the fur pixel shader
 */
export const furPixelShaderName: string = "furPixelShader";

/**
 * GLSL fragment shader source code for fur rendering
 * 
 * Features:
 * - High-quality fur rendering with depth-based occlusion
 * - Support for multiple simultaneous lights
 * - Diffuse texture mapping with alpha testing
 * - Configurable fur color, length, and offset
 * - High-level fur texture support with procedural noise
 * - Fog, clipping planes, and shadow support
 */
export const furPixelShaderSource: string = `
precision highp float;

// Eye/camera position in world space
uniform vec4 vEyePosition;

// Base diffuse and fur material colors
uniform vec4 vDiffuseColor;
uniform vec4 furColor;

// Fur physical properties
uniform float furLength;

// Interpolated vertex data
varying vec3 vPositionW;
varying float vfur_length;

#ifdef NORMAL
varying vec3 vNormalW;
#endif

#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif

#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]

#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform sampler2D diffuseSampler;
uniform vec2 vDiffuseInfos;
#endif

#ifdef HIGHLEVEL
uniform float furOffset;
uniform float furOcclusion;
uniform sampler2D furTexture;
varying vec2 vFurUV;
#endif

#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<fogFragmentDeclaration>
#include<clipPlaneFragmentDeclaration>

/**
 * Pseudo-random number generator based on position
 * Used for procedural fur texture variation
 */
float Rand(vec3 rv) {
    float x = dot(rv, vec3(12.9898, 78.233, 24.65487));
    return fract(sin(x) * 43758.5453);
}

#define CUSTOM_FRAGMENT_DEFINITIONS

void main(void) {
    #define CUSTOM_FRAGMENT_MAIN_BEGIN
    #include<clipPlaneFragment>
    
    vec3 viewDirectionW = normalize(vEyePosition.xyz - vPositionW);
    vec4 baseColor = furColor;
    vec3 diffuseColor = vDiffuseColor.rgb;
    float alpha = vDiffuseColor.a;
    
    #ifdef DIFFUSE
    baseColor *= texture2D(diffuseSampler, vDiffuseUV);
    
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
    
    #ifdef HIGHLEVEL
    vec4 furTextureColor = texture2D(furTexture, vec2(vFurUV.x, vFurUV.y));
    if (furTextureColor.a <= 0.0 || furTextureColor.g < furOffset) {
        discard;
    }
    float occlusion = mix(0.0, furTextureColor.b * 1.2, furOffset);
    baseColor = vec4(baseColor.xyz * max(occlusion, furOcclusion), 1.1 - furOffset);
    #endif
    
    vec3 diffuseBase = vec3(0., 0., 0.);
    lightingInfo info;
    float shadow = 1.;
    float glossiness = 0.;
    
    #ifdef SPECULARTERM
    vec3 specularBase = vec3(0., 0., 0.);
    #endif
    
    #include<lightFragment>[0..maxSimultaneousLights]
    
    #if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
    alpha *= vColor.a;
    #endif
    
    vec3 finalDiffuse = clamp(diffuseBase.rgb * baseColor.rgb, 0.0, 1.0);
    
    #ifdef HIGHLEVEL
    vec4 color = vec4(finalDiffuse, alpha);
    #else
    float r = vfur_length / furLength * 0.5;
    vec4 color = vec4(finalDiffuse * (0.5 + r), alpha);
    #endif
    
    #include<fogFragment>
    
    gl_FragColor = color;
    
    #include<imageProcessingCompatibility>
    
    #define CUSTOM_FRAGMENT_MAIN_END
}
`;

/**
 * Shader object containing metadata and source
 */
export interface IShaderData {
    /** Unique identifier for the shader */
    name: string;
    /** GLSL shader source code */
    shader: string;
}

/**
 * Fur pixel shader data exported to Babylon.js shader store
 */
export const furPixelShader: IShaderData = {
    name: furPixelShaderName,
    shader: furPixelShaderSource
};

/**
 * Type declaration for Babylon.js ShaderStore
 */
declare module "@babylonjs/core" {
    interface ShaderStore {
        ShadersStore: Record<string, string>;
    }
}