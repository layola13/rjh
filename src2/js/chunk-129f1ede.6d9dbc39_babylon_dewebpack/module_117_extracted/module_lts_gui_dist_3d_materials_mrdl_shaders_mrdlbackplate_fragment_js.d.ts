/**
 * MRDL Backplate Pixel Shader Module
 * Provides fragment shader for Mixed Reality Design Language backplate material
 */

/**
 * Shader uniforms for camera and geometric data
 */
interface CameraUniforms {
  /** Camera position in world space */
  cameraPosition: [number, number, number];
}

/**
 * Varying attributes passed from vertex shader
 */
interface VaryingAttributes {
  /** Vertex position in world space */
  vPosition: [number, number, number];
  /** Vertex normal vector */
  vNormal: [number, number, number];
  /** UV texture coordinates */
  vUV: [number, number];
  /** Tangent vector for normal mapping */
  vTangent: [number, number, number];
  /** Binormal vector for normal mapping */
  vBinormal: [number, number, number];
  /** Extra vertex data 1 (rect parameters) */
  vExtra1: [number, number, number, number];
  /** Extra vertex data 2 (UV and dimensions) */
  vExtra2: [number, number, number, number];
}

/**
 * Shape and size parameters
 */
interface ShapeUniforms {
  /** Corner radius for all corners */
  _Radius_: number;
  /** Width of the border line */
  _Line_Width_: number;
  /** Whether sizes are in absolute units */
  _Absolute_Sizes_: boolean;
  /** Anti-aliasing filter width */
  _Filter_Width_: number;
  /** Top-left corner radius override */
  _Radius_Top_Left_: number;
  /** Top-right corner radius override */
  _Radius_Top_Right_: number;
  /** Bottom-left corner radius override */
  _Radius_Bottom_Left_: number;
  /** Bottom-right corner radius override */
  _Radius_Bottom_Right_: number;
}

/**
 * Color and appearance uniforms
 */
interface ColorUniforms {
  /** Base fill color (RGBA) */
  _Base_Color_: [number, number, number, number];
  /** Border line color (RGBA) */
  _Line_Color_: [number, number, number, number];
  /** Gradient overlay color */
  _Gradient_Color_: [number, number, number, number];
  /** Top-left gradient color */
  _Top_Left_: [number, number, number, number];
  /** Top-right gradient color */
  _Top_Right_: [number, number, number, number];
  /** Bottom-left gradient color */
  _Bottom_Left_: [number, number, number, number];
  /** Bottom-right gradient color */
  _Bottom_Right_: [number, number, number, number];
}

/**
 * Highlight effect parameters
 */
interface HighlightUniforms {
  /** Animation rate */
  _Rate_: number;
  /** Highlight tint color (RGBA) */
  _Highlight_Color_: [number, number, number, number];
  /** Width of highlight band */
  _Highlight_Width_: number;
  /** Highlight transformation matrix */
  _Highlight_Transform_: [number, number, number, number];
  /** Highlight intensity multiplier */
  _Highlight_: number;
}

/**
 * Iridescence effect parameters
 */
interface IridescenceUniforms {
  /** Overall iridescence intensity */
  _Iridescence_Intensity_: number;
  /** Iridescence intensity at edges */
  _Iridescence_Edge_Intensity_: number;
  /** Iridescence color tint (RGBA) */
  _Iridescence_Tint_: [number, number, number, number];
  /** Iridescence gradient texture sampler */
  _Iridescent_Map_: WebGLTexture;
  /** Rotation angle for iridescence effect */
  _Angle_: number;
  /** Whether to use reflected vector */
  _Reflected_: boolean;
  /** Frequency of iridescence bands */
  _Frequency_: number;
  /** Vertical offset for iridescence pattern */
  _Vertical_Offset_: number;
}

/**
 * Edge and gradient parameters
 */
interface EdgeUniforms {
  /** Width of edge fade region */
  _Edge_Width_: number;
  /** Power curve for edge falloff */
  _Edge_Power_: number;
  /** Blend factor between line and gradient */
  _Line_Gradient_Blend_: number;
  /** Overall fade-out multiplier */
  _Fade_Out_: number;
}

/**
 * Complete shader uniform interface
 */
export interface MrdlBackplateUniforms
  extends CameraUniforms,
    ShapeUniforms,
    ColorUniforms,
    HighlightUniforms,
    IridescenceUniforms,
    EdgeUniforms {}

/**
 * Shader output
 */
interface FragmentOutput {
  /** Final fragment color (RGBA) */
  gl_FragColor: [number, number, number, number];
}

/**
 * Shader name constant
 */
export const MRDL_BACKPLATE_SHADER_NAME: string;

/**
 * MRDL Backplate pixel shader definition
 * Implements rounded rectangle with gradient, iridescence, and highlight effects
 */
export interface MrdlBackplatePixelShader {
  /** Unique shader identifier */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Exported shader object containing name and source
 */
export const mrdlBackplatePixelShader: MrdlBackplatePixelShader;