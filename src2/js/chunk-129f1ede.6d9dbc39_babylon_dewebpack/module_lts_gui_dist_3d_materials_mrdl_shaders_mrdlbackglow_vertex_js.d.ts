/**
 * MRDL Backglow Vertex Shader
 * Mixed Reality Design Language shader for backglow effects
 */

/**
 * Shader name identifier
 */
export declare const SHADER_NAME: "mrdlBackglowVertexShader";

/**
 * MRDL Backglow vertex shader source code
 * 
 * This shader creates a backglow effect for Mixed Reality Design Language (MRDL) materials.
 * It handles:
 * - Dynamic sizing (absolute or relative)
 * - Motion-based visibility control
 * - Bevel and line width parameters
 * - Color blending with inner/outer colors
 * - Intensity fading with configurable falloff
 * 
 * @remarks
 * The shader transforms vertices based on motion parameters and supports both
 * absolute and relative sizing modes for flexible UI element scaling.
 */
export declare const SHADER_SOURCE: string;

/**
 * Uniform parameters for the MRDL Backglow shader
 */
export interface MrdlBackglowUniforms {
  /** World transformation matrix */
  world: Float32Array;
  
  /** Combined view-projection matrix */
  viewProjection: Float32Array;
  
  /** Camera position in world space */
  cameraPosition: [number, number, number];
  
  /** Bevel radius for edge rounding */
  _Bevel_Radius_: number;
  
  /** Width of the glow line */
  _Line_Width_: number;
  
  /** Whether to use absolute pixel sizes or relative scaling */
  _Absolute_Sizes_: boolean;
  
  /** Tuning parameter for motion effects */
  _Tuning_Motion_: number;
  
  /** Motion intensity value */
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
  
  /** Bias offset for glow calculation */
  _Bias_: number;
}

/**
 * Vertex attributes for the MRDL Backglow shader
 */
export interface MrdlBackglowAttributes {
  /** Vertex position in local space */
  position: Float32Array;
  
  /** Vertex normal vector */
  normal: Float32Array;
  
  /** Texture UV coordinates */
  uv: Float32Array;
  
  /** Tangent vector for normal mapping */
  tangent: Float32Array;
}

/**
 * Varying outputs from vertex to fragment shader
 */
export interface MrdlBackglowVaryings {
  /** Transformed normal (used to pass size information) */
  vNormal: [number, number, number];
  
  /** Transformed UV coordinates */
  vUV: [number, number];
}

/**
 * Shader module export containing name and source reference
 */
export interface MrdlBackglowShaderModule {
  /** Shader identifier name */
  readonly name: typeof SHADER_NAME;
  
  /** Reference to the shader source in the shader store */
  readonly shader: string;
}

/**
 * The exported MRDL Backglow vertex shader module
 */
export declare const mrdlBackglowVertexShader: MrdlBackglowShaderModule;