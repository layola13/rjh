/**
 * MRDL Slider Bar Fragment Shader
 * 
 * A complex fragment shader for rendering MRDL (Mixed Reality Design Language) slider bar UI elements
 * with advanced visual features including bulge effects, finger occlusion, iridescence, rim lighting,
 * blob interactions, and physically-based rendering.
 */

/**
 * The shader name identifier used for registration
 */
export declare const SHADER_NAME: "mrdlSliderBarPixelShader";

/**
 * MRDL Slider Bar Pixel Shader Configuration
 * 
 * Contains the complete GLSL fragment shader code and metadata for rendering
 * interactive slider bars in mixed reality interfaces.
 */
export interface MRDLSliderBarShaderConfig {
  /**
   * Unique identifier for this shader in the shader store
   */
  name: typeof SHADER_NAME;
  
  /**
   * The compiled GLSL fragment shader source code
   */
  shader: string;
}

/**
 * The exported MRDL Slider Bar pixel shader
 * 
 * This shader implements:
 * - Geometry deformation (bulge effects on interaction)
 * - Physically-based lighting (diffuse, specular, fresnel, subsurface scattering)
 * - Environmental reflections (sky, horizon, ground, texture-based)
 * - Finger occlusion detection for natural shadows
 * - Blob/proximity-based visual effects
 * - Iridescence and rim lighting
 * - HSV color manipulation
 * - Decal texture overlay support
 * 
 * @remarks
 * The shader expects specific vertex attributes (vPosition, vNormal, vUV, vTangent, 
 * vBinormal, vColor, vExtra1-3) and numerous uniforms for material properties,
 * lighting parameters, finger tracking positions, and texture samplers.
 * 
 * Features can be toggled via preprocessor directives:
 * - BLOB_ENABLE: Enable blob interaction effects
 * - DECAL_ENABLE: Enable decal texture overlay
 * - OCCLUSION_ENABLED: Enable finger occlusion calculations
 * - ENV_ENABLE: Enable environment map reflections
 * - SKY_ENABLED: Enable procedural sky reflections
 * - IRIDESCENCE_ENABLED: Enable iridescence effects
 */
export declare const mrdlSliderBarPixelShader: MRDLSliderBarShaderConfig;