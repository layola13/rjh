/**
 * Fluent material fragment shader module for Babylon.js GUI 3D
 * Provides shader code for fluent design material rendering with support for:
 * - Inner glow effects
 * - Border rendering with edge smoothing
 * - Hover light interactions
 * - Texture mapping
 */

/**
 * GLSL fragment shader source code for fluent material
 * Implements Microsoft Fluent Design System visual effects
 */
export const FLUENT_FRAGMENT_SHADER_SOURCE: string = `
precision highp float;

varying vec2 vUV;
uniform vec4 albedoColor;

#ifdef INNERGLOW
uniform vec4 innerGlowColor;
#endif

#ifdef BORDER
varying vec2 scaleInfo;
uniform float edgeSmoothingValue;
uniform float borderMinValue;
#endif

#ifdef HOVERLIGHT
varying vec3 worldPosition;
uniform vec3 hoverPosition;
uniform vec4 hoverColor;
uniform float hoverRadius;
#endif

#ifdef TEXTURE
uniform sampler2D albedoSampler;
uniform mat4 textureMatrix;
vec2 finalUV;
#endif

void main(void) {
    vec3 albedo = albedoColor.rgb;
    float alpha = albedoColor.a;
    
    #ifdef TEXTURE
    finalUV = vec2(textureMatrix * vec4(vUV, 1.0, 0.0));
    albedo = texture2D(albedoSampler, finalUV).rgb;
    #endif
    
    #ifdef HOVERLIGHT
    float pointToHover = (1.0 - clamp(length(hoverPosition - worldPosition) / hoverRadius, 0., 1.)) * hoverColor.a;
    albedo = clamp(albedo + hoverColor.rgb * pointToHover, 0., 1.);
    #else
    float pointToHover = 1.0;
    #endif
    
    #ifdef BORDER 
    float borderPower = 10.0;
    float inverseBorderPower = 1.0 / borderPower;
    vec3 borderColor = albedo * borderPower;
    vec2 distanceToEdge;
    distanceToEdge.x = abs(vUV.x - 0.5) * 2.0;
    distanceToEdge.y = abs(vUV.y - 0.5) * 2.0;
    float borderValue = max(
        smoothstep(scaleInfo.x - edgeSmoothingValue, scaleInfo.x + edgeSmoothingValue, distanceToEdge.x), 
        smoothstep(scaleInfo.y - edgeSmoothingValue, scaleInfo.y + edgeSmoothingValue, distanceToEdge.y)
    );
    borderColor = borderColor * borderValue * max(borderMinValue * inverseBorderPower, pointToHover);
    albedo += borderColor;
    alpha = max(alpha, borderValue);
    #endif
    
    #ifdef INNERGLOW
    vec2 uvGlow = (vUV - vec2(0.5, 0.5)) * (innerGlowColor.a * 2.0);
    uvGlow = uvGlow * uvGlow;
    uvGlow = uvGlow * uvGlow;
    albedo += mix(vec3(0.0, 0.0, 0.0), innerGlowColor.rgb, uvGlow.x + uvGlow.y);
    #endif
    
    gl_FragColor = vec4(albedo, alpha);
}
`;

/**
 * Shader name identifier for the fluent pixel shader
 * Used for registration in Babylon.js shader store
 */
export const FLUENT_PIXEL_SHADER_NAME: string = "fluentPixelShader";

/**
 * Shader definition object containing name and source code
 */
export interface FluentShaderDefinition {
    /** Unique identifier for the shader */
    name: string;
    /** GLSL shader source code */
    shader: string;
}

/**
 * Complete fluent pixel shader definition
 * Exported for registration with Babylon.js ShaderStore
 */
export const fluentPixelShader: FluentShaderDefinition = {
    name: FLUENT_PIXEL_SHADER_NAME,
    shader: FLUENT_FRAGMENT_SHADER_SOURCE
};

/**
 * Type definition for shader store registration
 * Used when registering shaders with Babylon.js core
 */
export interface ShaderStoreRegistry {
    [shaderName: string]: string;
}

declare module '@babylonjs/core/Engines/shaderStore' {
    interface ShaderStore {
        ShadersStore: ShaderStoreRegistry;
    }
}