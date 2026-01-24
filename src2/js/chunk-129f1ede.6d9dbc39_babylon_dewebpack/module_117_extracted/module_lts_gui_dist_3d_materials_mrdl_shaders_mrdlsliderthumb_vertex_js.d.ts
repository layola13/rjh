/**
 * MRDL (Mixed Reality Design Language) Slider Thumb Vertex Shader Module
 * 
 * This module provides vertex shader code for rendering 3D slider thumb components
 * in Mixed Reality applications using Babylon.js GUI system.
 */

/**
 * The unique identifier for the MRDL slider thumb vertex shader
 */
export declare const mrdlSliderThumbVertexShader: {
  /**
   * The name identifier for the shader in the shader store
   */
  name: "mrdlSliderThumbVertexShader";
  
  /**
   * The complete GLSL vertex shader source code
   * 
   * This shader handles:
   * - Vertex transformation (object to world space)
   * - Normal and tangent space calculations
   * - Rounded rectangle geometry with configurable corner radii
   * - Front and back beveling effects
   * - Optional bulge deformation
   * - Blob/proximity interaction effects (up to 2 blobs)
   * - UV mapping for decals and textures
   * - Color gradient calculation (left to right)
   * - Global hand tracking integration (left/right index fingers)
   * 
   * Uniforms include:
   * - Transformation matrices (world, viewProjection)
   * - Geometry parameters (radius, bevel, corner radii)
   * - Material properties (albedo, specular, shininess, etc.)
   * - Lighting parameters (sun direction, environment colors)
   * - Blob interaction parameters (position, size, fade, pulse)
   * - Decal and texture settings
   * - Rim lighting and iridescence effects
   * - Global hand tracking positions and proximities
   * 
   * Outputs (varyings):
   * - vPosition: World space position
   * - vNormal: World space normal
   * - vUV: Texture coordinates
   * - vTangent: World space tangent
   * - vBinormal: World space binormal
   * - vColor: Vertex color (stores original object space position)
   * - vExtra1: Additional data (decal factor, radial gradient, color channels)
   * - vExtra2: First blob interaction data
   * - vExtra3: Second blob interaction data
   */
  shader: string;
};

/**
 * Type definition for shader uniform parameters used by the MRDL slider thumb shader
 */
export interface MRDLSliderThumbUniforms {
  // Transform matrices
  world: Float32Array;
  viewProjection: Float32Array;
  cameraPosition: Float32Array;

  // Geometry parameters
  _Radius_: number;
  _Bevel_Front_: number;
  _Bevel_Front_Stretch_: number;
  _Bevel_Back_: number;
  _Bevel_Back_Stretch_: number;
  _Radius_Top_Left_: number;
  _Radius_Top_Right_: number;
  _Radius_Bottom_Left_: number;
  _Radius_Bottom_Right_: number;

  // Bulge effect
  _Bulge_Enabled_: boolean;
  _Bulge_Height_: number;
  _Bulge_Radius_: number;

  // Lighting
  _Sun_Intensity_: number;
  _Sun_Theta_: number;
  _Sun_Phi_: number;
  _Indirect_Diffuse_: number;

  // Material properties
  _Albedo_: Float32Array; // vec4
  _Specular_: number;
  _Shininess_: number;
  _Sharpness_: number;
  _Subsurface_: number;

  // Color gradient
  _Left_Color_: Float32Array; // vec4
  _Right_Color_: Float32Array; // vec4

  // Reflections
  _Reflection_: number;
  _Front_Reflect_: number;
  _Edge_Reflect_: number;
  _Power_: number;

  // Environment colors
  _Sky_Color_: Float32Array; // vec4
  _Horizon_Color_: Float32Array; // vec4
  _Ground_Color_: Float32Array; // vec4
  _Horizon_Power_: number;

  // Textures
  _Reflection_Map_: WebGLTexture | null;
  _Indirect_Environment_: WebGLTexture | null;

  // Edge effects
  _Width_: number;
  _Fuzz_: number;
  _Min_Fuzz_: number;
  _Clip_Fade_: number;

  // Color adjustments
  _Hue_Shift_: number;
  _Saturation_Shift_: number;
  _Value_Shift_: number;

  // Blob 1 parameters
  _Blob_Position_: Float32Array; // vec3
  _Blob_Intensity_: number;
  _Blob_Near_Size_: number;
  _Blob_Far_Size_: number;
  _Blob_Near_Distance_: number;
  _Blob_Far_Distance_: number;
  _Blob_Fade_Length_: number;
  _Blob_Pulse_: number;
  _Blob_Fade_: number;
  _Blob_Texture_: WebGLTexture | null;

  // Blob 2 parameters
  _Blob_Position_2_: Float32Array; // vec3
  _Blob_Near_Size_2_: number;
  _Blob_Pulse_2_: number;
  _Blob_Fade_2_: number;

  // Hand tracking positions (legacy)
  _Left_Index_Pos_: Float32Array; // vec3
  _Right_Index_Pos_: Float32Array; // vec3
  _Left_Index_Middle_Pos_: Float32Array; // vec3
  _Right_Index_Middle_Pos_: Float32Array; // vec3

  // Decal
  _Decal_: WebGLTexture | null;
  _Decal_Scale_XY_: Float32Array; // vec2
  _Decal_Front_Only_: boolean;

  // Rim lighting
  _Rim_Intensity_: number;
  _Rim_Texture_: WebGLTexture | null;
  _Rim_Hue_Shift_: number;
  _Rim_Saturation_Shift_: number;
  _Rim_Value_Shift_: number;

  // Iridescence
  _Iridescence_Intensity_: number;
  _Iridescence_Texture_: WebGLTexture | null;

  // Global hand tracking
  Use_Global_Left_Index: boolean;
  Use_Global_Right_Index: boolean;
  Global_Left_Index_Tip_Position: Float32Array; // vec4
  Global_Right_Index_Tip_Position: Float32Array; // vec4
  Global_Left_Thumb_Tip_Position: Float32Array; // vec4
  Global_Right_Thumb_Tip_Position: Float32Array; // vec4
  Global_Left_Index_Tip_Proximity: number;
  Global_Right_Index_Tip_Proximity: number;
}

/**
 * Vertex attributes for the MRDL slider thumb geometry
 */
export interface MRDLSliderThumbAttributes {
  /** Vertex position in object space */
  position: Float32Array;
  /** Vertex normal in object space */
  normal: Float32Array;
  /** Texture coordinates */
  uv: Float32Array;
  /** Tangent vector (optional, defined with TANGENT preprocessor directive) */
  tangent?: Float32Array;
}

/**
 * Varying outputs from vertex shader to fragment shader
 */
export interface MRDLSliderThumbVaryings {
  /** World space position */
  vPosition: Float32Array; // vec3
  /** World space normal */
  vNormal: Float32Array; // vec3
  /** Texture coordinates */
  vUV: Float32Array; // vec2
  /** World space tangent */
  vTangent: Float32Array; // vec3
  /** World space binormal */
  vBinormal: Float32Array; // vec3
  /** Original object space position encoded as color */
  vColor: Float32Array; // vec4
  /** Extra data: (decal_mask, radial_gradient, color_g, color_b) */
  vExtra1: Float32Array; // vec4
  /** Blob 1 interaction: (blob_xy.x, blob_xy.y, distance, fade) */
  vExtra2: Float32Array; // vec4
  /** Blob 2 interaction: (blob_xy.x, blob_xy.y, distance, fade) */
  vExtra3: Float32Array; // vec4
}

/**
 * Shader preprocessor defines for optional features
 */
export interface MRDLSliderThumbDefines {
  /** Enable tangent attribute */
  TANGENT?: boolean;
  /** Enable first blob interaction */
  BLOB_ENABLE?: boolean;
  /** Enable second blob interaction */
  BLOB_ENABLE_2?: boolean;
}