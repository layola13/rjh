/**
 * MRDL Backglow Fragment Shader
 * 
 * This shader implements a Material Design-style backglow effect with rounded rectangles.
 * It provides configurable parameters for bevel radius, line width, motion effects, 
 * color blending, and intensity falloff.
 */

/**
 * Uniform: Camera position in world space
 */
export declare const cameraPosition: vec3;

/**
 * Varying: Interpolated normal vector from vertex shader
 */
export declare const vNormal: vec3;

/**
 * Varying: Interpolated UV coordinates from vertex shader
 */
export declare const vUV: vec2;

/**
 * Uniform: Radius of the beveled corners
 */
export declare const _Bevel_Radius_: number;

/**
 * Uniform: Width of the glow line
 */
export declare const _Line_Width_: number;

/**
 * Uniform: Whether to use absolute sizes for measurements
 */
export declare const _Absolute_Sizes_: boolean;

/**
 * Uniform: Tuning parameter for motion effects
 */
export declare const _Tuning_Motion_: number;

/**
 * Uniform: Motion intensity value
 */
export declare const _Motion_: number;

/**
 * Uniform: Maximum glow intensity
 */
export declare const _Max_Intensity_: number;

/**
 * Uniform: Exponent controlling the intensity fade-in curve
 */
export declare const _Intensity_Fade_In_Exponent_: number;

/**
 * Uniform: Starting fuzziness value for outer edge
 */
export declare const _Outer_Fuzz_Start_: number;

/**
 * Uniform: Ending fuzziness value for outer edge
 */
export declare const _Outer_Fuzz_End_: number;

/**
 * Uniform: Outer glow color (RGBA)
 */
export declare const _Color_: vec4;

/**
 * Uniform: Inner glow color (RGBA)
 */
export declare const _Inner_Color_: vec4;

/**
 * Uniform: Exponent controlling color blend between inner and outer
 */
export declare const _Blend_Exponent_: number;

/**
 * Uniform: Falloff exponent for glow intensity
 */
export declare const _Falloff_: number;

/**
 * Uniform: Bias value for glow distribution
 */
export declare const _Bias_: number;

/**
 * Applies a bias function to remap values using power curve
 * 
 * @param bias - Bias factor (clamped to 0.001-0.999)
 * @param value - Input value to transform
 * @returns Biased output value
 */
export declare function BiasFunc(bias: number, value: number): number;

/**
 * Calculates distance fields for a fuzzy rounded rectangle
 * 
 * @param sizeX - Half-width of the rectangle
 * @param sizeY - Half-height of the rectangle
 * @param radiusX - Corner radius in X direction
 * @param radiusY - Corner radius in Y direction
 * @param lineWidth - Width of the glow line
 * @param uv - Current UV coordinates
 * @param outerFuzz - Fuzziness amount for outer edge
 * @param maxOuterFuzz - Maximum outer fuzziness value
 * @returns Object containing:
 *   - rectDistance: Normalized distance to rectangle edge (0-1)
 *   - innerDistance: Normalized distance to inner edge (0-1)
 */
export declare function Fuzzy_Round_Rect_B33(
  sizeX: number,
  sizeY: number,
  radiusX: number,
  radiusY: number,
  lineWidth: number,
  uv: vec2,
  outerFuzz: number,
  maxOuterFuzz: number
): {
  rectDistance: number;
  innerDistance: number;
};

/**
 * Fragment shader main function
 * Computes the final backglow color based on UV position and material parameters
 */
export declare function main(): void;

/**
 * Shader name identifier
 */
export declare const mrdlBackglowPixelShaderName: "mrdlBackglowPixelShader";

/**
 * Complete MRDL Backglow pixel shader configuration
 */
export declare const mrdlBackglowPixelShader: {
  /**
   * Shader name identifier
   */
  name: "mrdlBackglowPixelShader";
  
  /**
   * GLSL shader source code
   */
  shader: string;
};

/**
 * Vector type definitions for GLSL compatibility
 */
export declare type vec2 = [number, number];
export declare type vec3 = [number, number, number];
export declare type vec4 = [number, number, number, number];