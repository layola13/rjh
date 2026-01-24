/**
 * MRDL (Mixed Reality Design Language) Backglow Fragment Shader
 * Provides a glowing backlight effect with configurable bevel, fuzz, and intensity parameters.
 */

/**
 * Uniform variables for camera and transformation
 */
export interface MRDLBackglowUniforms {
  /** Camera position in world space */
  cameraPosition: [number, number, number];
  
  /** Radius of the beveled edges */
  _Bevel_Radius_: number;
  
  /** Width of the glow line */
  _Line_Width_: number;
  
  /** Whether sizes are absolute or relative */
  _Absolute_Sizes_: boolean;
  
  /** Tuning parameter for motion effects */
  _Tuning_Motion_: number;
  
  /** Current motion value */
  _Motion_: number;
  
  /** Maximum glow intensity */
  _Max_Intensity_: number;
  
  /** Exponent for intensity fade-in curve */
  _Intensity_Fade_In_Exponent_: number;
  
  /** Start value for outer fuzz/blur */
  _Outer_Fuzz_Start_: number;
  
  /** End value for outer fuzz/blur */
  _Outer_Fuzz_End_: number;
  
  /** Primary glow color (outer) */
  _Color_: [number, number, number, number];
  
  /** Inner glow color */
  _Inner_Color_: [number, number, number, number];
  
  /** Exponent for color blending between inner and outer */
  _Blend_Exponent_: number;
  
  /** Falloff rate for glow intensity */
  _Falloff_: number;
  
  /** Bias adjustment for glow distribution */
  _Bias_: number;
}

/**
 * Varying variables passed from vertex shader
 */
export interface MRDLBackglowVaryings {
  /** Surface normal in view space */
  vNormal: [number, number, number];
  
  /** Texture coordinates */
  vUV: [number, number];
}

/**
 * Shader module export containing the MRDL Backglow pixel shader
 */
export interface MRDLBackglowShaderModule {
  /**
   * The compiled pixel shader object
   */
  mrdlBackglowPixelShader: ShaderDefinition;
}

/**
 * Shader definition with name and source code
 */
export interface ShaderDefinition {
  /** Unique identifier for the shader */
  name: string;
  
  /** GLSL shader source code */
  shader: string;
}

/**
 * Applies a bias curve to remap input values
 * @param bias - Bias factor (clamped between 0.001 and 0.999)
 * @param value - Input value to transform
 * @returns Biased value
 */
declare function BiasFunc(bias: number, value: number): number;

/**
 * Computes distance fields for a fuzzy rounded rectangle
 * Used for creating soft-edged rectangular glow effects
 * 
 * @param sizeX - Half-width of the rectangle
 * @param sizeY - Half-height of the rectangle
 * @param radiusX - Corner radius in X direction
 * @param radiusY - Corner radius in Y direction
 * @param lineWidth - Width of the glow line
 * @param uv - Current fragment UV coordinates
 * @param outerFuzz - Amount of outer edge blur
 * @param maxOuterFuzz - Maximum outer fuzz value
 * @param rectDistance - Output: distance to rectangle edge (0-1)
 * @param innerDistance - Output: distance to inner edge (0-1)
 */
declare function Fuzzy_Round_Rect_B33(
  sizeX: number,
  sizeY: number,
  radiusX: number,
  radiusY: number,
  lineWidth: number,
  uv: [number, number],
  outerFuzz: number,
  maxOuterFuzz: number,
  rectDistance: number,
  innerDistance: number
): void;

/**
 * Main fragment shader entry point
 * Computes the final glow color and intensity based on uniforms and varyings
 */
declare function main(): void;

/**
 * Named export of the MRDL Backglow pixel shader
 */
export declare const mrdlBackglowPixelShader: ShaderDefinition;