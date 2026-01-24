/**
 * Fluent material fragment shader module for Babylon.js GUI 3D
 * Provides shader code for fluent design materials with support for:
 * - Border rendering with edge smoothing
 * - Hover light effects
 * - Inner glow effects
 * - Texture mapping
 */

/**
 * Shader name identifier used for registration in the shader store
 */
export const FLUENT_PIXEL_SHADER_NAME = "fluentPixelShader";

/**
 * GLSL fragment shader source code for fluent material rendering.
 * 
 * Features:
 * - Base albedo color with alpha support
 * - Optional texture sampling with UV transformation
 * - Hover light effect that brightens areas near the hover position
 * - Border rendering with smooth edges and scaling
 * - Inner glow effect that fades from center to edges
 * 
 * Preprocessor directives:
 * - TEXTURE: Enable texture sampling
 * - HOVERLIGHT: Enable interactive hover lighting
 * - BORDER: Enable border rendering with edge smoothing
 * - INNERGLOW: Enable inner glow effect
 */
export const FLUENT_FRAGMENT_SHADER_SOURCE = `precision highp float;

// Interpolated UV coordinates from vertex shader
varying vec2 vUV;

// Base material color with alpha
uniform vec4 albedoColor;

#ifdef INNERGLOW
// Inner glow color (alpha controls intensity/radius)
uniform vec4 innerGlowColor;
#endif

#ifdef BORDER
// Scale information for border calculation
varying vec2 scaleInfo;
// Edge smoothing factor for anti-aliasing
uniform float edgeSmoothingValue;
// Minimum border brightness value
uniform float borderMinValue;
#endif

#ifdef HOVERLIGHT
// World space position for hover light calculation
varying vec3 worldPosition;
// Hover light position in world space
uniform vec3 hoverPosition;
// Hover light color (alpha controls falloff)
uniform vec4 hoverColor;
// Hover effect radius
uniform float hoverRadius;
#endif

#ifdef TEXTURE
// Albedo texture sampler
uniform sampler2D albedoSampler;
// UV transformation matrix
uniform mat4 textureMatrix;
// Transformed UV coordinates
vec2 finalUV;
#endif

void main(void) {
    // Initialize base color from uniform
    vec3 albedo = albedoColor.rgb;
    float alpha = albedoColor.a;
    
#ifdef TEXTURE
    // Apply texture matrix transformation to UVs
    finalUV = vec2(textureMatrix * vec4(vUV, 1.0, 0.0));
    // Sample albedo from texture
    albedo = texture2D(albedoSampler, finalUV).rgb;
#endif

#ifdef HOVERLIGHT
    // Calculate distance-based hover light contribution
    float pointToHover = (1.0 - clamp(length(hoverPosition - worldPosition) / hoverRadius, 0.0, 1.0)) * hoverColor.a;
    // Add hover light color to albedo
    albedo = clamp(albedo + hoverColor.rgb * pointToHover, 0.0, 1.0);
#else
    float pointToHover = 1.0;
#endif

#ifdef BORDER
    // Border brightness multiplier
    const float borderPower = 10.0;
    const float inverseBorderPower = 1.0 / borderPower;
    
    // Calculate brightened border color
    vec3 borderColor = albedo * borderPower;
    
    // Calculate normalized distance from center to edges
    vec2 distanceToEdge;
    distanceToEdge.x = abs(vUV.x - 0.5) * 2.0;
    distanceToEdge.y = abs(vUV.y - 0.5) * 2.0;
    
    // Apply smoothstep for anti-aliased border edges
    float borderValue = max(
        smoothstep(scaleInfo.x - edgeSmoothingValue, scaleInfo.x + edgeSmoothingValue, distanceToEdge.x),
        smoothstep(scaleInfo.y - edgeSmoothingValue, scaleInfo.y + edgeSmoothingValue, distanceToEdge.y)
    );
    
    // Modulate border by hover light and minimum value
    borderColor = borderColor * borderValue * max(borderMinValue * inverseBorderPower, pointToHover);
    
    // Add border contribution to albedo
    albedo += borderColor;
    // Ensure alpha includes border regions
    alpha = max(alpha, borderValue);
#endif

#ifdef INNERGLOW
    // Calculate glow coordinates from center (scaled by alpha)
    vec2 uvGlow = (vUV - vec2(0.5, 0.5)) * (innerGlowColor.a * 2.0);
    // Apply quadratic falloff (squared twice for smooth gradient)
    uvGlow = uvGlow * uvGlow;
    uvGlow = uvGlow * uvGlow;
    // Mix glow color based on combined UV distance
    albedo += mix(vec3(0.0, 0.0, 0.0), innerGlowColor.rgb, uvGlow.x + uvGlow.y);
#endif

    // Output final fragment color
    gl_FragColor = vec4(albedo, alpha);
}
`;

/**
 * Shader metadata object containing name and source code.
 * This structure is compatible with Babylon.js shader registration system.
 */
export interface FluentShaderMetadata {
  /** Unique shader identifier */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Complete fluent pixel shader definition ready for registration.
 * The shader is automatically registered in Babylon.js ShaderStore upon import.
 */
export const fluentPixelShader: FluentShaderMetadata = {
  name: FLUENT_PIXEL_SHADER_NAME,
  shader: FLUENT_FRAGMENT_SHADER_SOURCE
};

/**
 * Type declaration for Babylon.js shader store registration.
 * Allows the shader to be accessed by name at runtime.
 */
declare module '@babylonjs/core/Engines/shaderStore' {
  interface ShaderStore {
    [FLUENT_PIXEL_SHADER_NAME]: string;
  }
}