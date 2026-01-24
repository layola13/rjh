/**
 * MRDL Slider Thumb Fragment Shader Module
 * 
 * This module exports the fragment shader used for rendering MRDL (Mixed Reality Design Language)
 * slider thumb components with advanced material properties including:
 * - Environment mapping and reflections
 * - Subsurface scattering
 * - Finger occlusion detection
 * - Blob-based proximity effects
 * - Iridescence and rim lighting
 * - HSV color manipulation
 */

/**
 * Shader name identifier used for registration in the shader store
 */
export declare const SHADER_NAME: "mrdlSliderThumbPixelShader";

/**
 * Complete GLSL fragment shader source code for MRDL slider thumb rendering.
 * 
 * Key Features:
 * - Physically-based lighting with sun, indirect, and specular components
 * - Dynamic bulge effect based on UV coordinates
 * - Finger proximity detection and occlusion shadows
 * - Blob texture mapping with distance-based intensity
 * - Environment reflections (both mapped and procedural sky)
 * - Rim lighting and iridescence effects
 * - HSV-based color adjustment (hue shift, saturation, value)
 * - Decal overlay support
 * 
 * Uniforms include material properties (albedo, specular, roughness),
 * geometric parameters (radius, bevel, bulge), lighting settings (sun direction,
 * intensity, environment colors), and interaction data (finger positions, blob positions).
 * 
 * Varyings provide per-fragment data: position, normal, tangent, binormal, UVs,
 * vertex color, and extra data channels for blob and proximity calculations.
 */
export declare const mrdlSliderThumbPixelShader: {
  /**
   * Shader identifier matching SHADER_NAME
   */
  name: "mrdlSliderThumbPixelShader";
  
  /**
   * GLSL ES 1.0 fragment shader source code.
   * Contains vertex-to-fragment varyings, uniforms for material/lighting properties,
   * helper functions for lighting calculations, and main() function that composites
   * all effects into final fragment color.
   */
  shader: string;
};