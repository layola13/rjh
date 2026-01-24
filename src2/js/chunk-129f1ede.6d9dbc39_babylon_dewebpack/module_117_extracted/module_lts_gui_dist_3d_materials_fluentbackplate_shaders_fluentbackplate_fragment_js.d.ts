/**
 * Fluent Backplate Fragment Shader Module
 * Provides the pixel shader for rendering fluent design backplate materials with rounded rectangles,
 * blob effects, iridescence, and highlight features.
 */

/**
 * Name identifier for the fluent backplate pixel shader
 */
export const fluentBackplatePixelShaderName: string;

/**
 * Fluent backplate pixel shader configuration object
 */
export interface FluentBackplatePixelShader {
  /**
   * The unique name identifier for this shader
   */
  name: string;
  
  /**
   * The GLSL shader source code string containing:
   * - Uniforms for geometry, colors, blobs, iridescence, and highlight effects
   * - Fragment functions for rounded rectangles, blob rendering, and line highlights
   * - Main shader logic for combining effects
   */
  shader: string;
}

/**
 * The complete fluent backplate pixel shader definition.
 * 
 * This shader supports:
 * - Rounded rectangle rendering with configurable corner radii
 * - Dual blob proximity effects with texture sampling
 * - Iridescent color mapping based on viewing angle
 * - Highlight lines with configurable width and color
 * - Global finger tracking integration
 * - Fade-out and filter width controls
 * 
 * @remarks
 * The shader is automatically registered in Babylon.js ShaderStore upon import.
 * 
 * Uniforms include:
 * - Geometry: _Radius_, _Line_Width_, corner radii variants
 * - Colors: _Base_Color_, _Line_Color_, _Highlight_Color_
 * - Blob system: positions, sizes, distances, textures for two blob sources
 * - Iridescence: intensity, frequency, angle, reflection mode
 * - Global tracking: left/right index finger tip positions
 */
export const fluentBackplatePixelShader: FluentBackplatePixelShader;

/**
 * GLSL Fragment Shader Source
 * 
 * Key Features:
 * - Round_Rect_Fragment_B31: Renders anti-aliased rounded rectangles with borders
 * - Blob_Fragment_B71: Calculates proximity-based blob coloring from dual sources
 * - Line_Fragment_B48: Generates highlight line effects with color interpolation
 * - Scale_RGB_B54: Scales RGB channels while preserving alpha
 * - Conditional_Float_B38: Conditional value selection for reflection modes
 * 
 * Preprocessor Directives:
 * - BLOB_ENABLE: Enables/disables blob effect calculations
 * - IRIDESCENT_MAP_ENABLE: Enables/disables iridescent texture sampling
 * 
 * Output:
 * - gl_FragColor: Final RGBA color with optional fade-out applied
 */
export type FluentBackplateShaderSource = string;