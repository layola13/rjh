/**
 * MRDL Backglow Vertex Shader
 * Material shader for creating backglow effects in Mixed Reality Design Language (MRDL)
 */

/**
 * Shader uniform parameters for MRDL backglow vertex shader
 */
export interface MRDLBackglowVertexUniforms {
  /** World transformation matrix */
  world: Float32Array;
  /** Combined view and projection matrix */
  viewProjection: Float32Array;
  /** Camera position in world space */
  cameraPosition: [number, number, number];
  /** Bevel radius for edge rounding */
  _Bevel_Radius_: number;
  /** Width of the glow line */
  _Line_Width_: number;
  /** Whether to use absolute sizes instead of relative */
  _Absolute_Sizes_: boolean;
  /** Tuning parameter for motion effects */
  _Tuning_Motion_: number;
  /** Motion intensity */
  _Motion_: number;
  /** Maximum glow intensity */
  _Max_Intensity_: number;
  /** Exponent for intensity fade-in curve */
  _Intensity_Fade_In_Exponent_: number;
  /** Start distance for outer fuzz effect */
  _Outer_Fuzz_Start_: number;
  /** End distance for outer fuzz effect */
  _Outer_Fuzz_End_: number;
  /** Primary glow color (RGBA) */
  _Color_: [number, number, number, number];
  /** Inner glow color (RGBA) */
  _Inner_Color_: [number, number, number, number];
  /** Exponent for color blending */
  _Blend_Exponent_: number;
  /** Falloff rate for glow intensity */
  _Falloff_: number;
  /** Bias value for glow calculations */
  _Bias_: number;
}

/**
 * Vertex attributes for MRDL backglow shader
 */
export interface MRDLBackglowVertexAttributes {
  /** Vertex position in local space */
  position: Float32Array;
  /** Vertex normal vector */
  normal: Float32Array;
  /** Texture coordinates */
  uv: Float32Array;
  /** Tangent vector for normal mapping */
  tangent: Float32Array;
}

/**
 * Varying outputs passed to fragment shader
 */
export interface MRDLBackglowVaryings {
  /** Transformed normal vector */
  vNormal: [number, number, number];
  /** Processed UV coordinates */
  vUV: [number, number];
}

/**
 * Shader name identifier
 */
export const MRDL_BACKGLOW_VERTEX_SHADER_NAME = "mrdlBackglowVertexShader";

/**
 * GLSL vertex shader source code for MRDL backglow effect
 * Handles vertex transformation and prepares data for fragment shader glow rendering
 */
export const mrdlBackglowVertexShader: string;

/**
 * Shader metadata and registration information
 */
export interface ShaderDefinition {
  /** Unique shader identifier */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Exported shader definition for Babylon.js shader store
 */
export const mrdlBackglowVertexShaderDefinition: ShaderDefinition;