/**
 * MRDL (Mixed Reality Design Language) Backplate Fragment Shader Module
 * 
 * This module exports a fragment shader used for rendering backplate materials
 * in 3D GUI components with features like rounded rectangles, gradients, 
 * iridescence effects, and edge highlighting.
 */

/**
 * Shader name identifier used for registration in the shader store
 */
export const mrdlBackplatePixelShaderName: string;

/**
 * Uniform variables for camera and geometry
 */
interface BackplateUniforms {
  /** Camera position in world space */
  cameraPosition: [number, number, number];
  
  /** Corner radius for all corners (global fallback) */
  _Radius_: number;
  
  /** Width of the border line */
  _Line_Width_: number;
  
  /** Whether sizes are specified in absolute units or relative */
  _Absolute_Sizes_: boolean;
  
  /** Anti-aliasing filter width */
  _Filter_Width_: number;
  
  /** Base fill color of the backplate (RGBA) */
  _Base_Color_: [number, number, number, number];
  
  /** Color of the border line (RGBA) */
  _Line_Color_: [number, number, number, number];
  
  /** Individual corner radii */
  _Radius_Top_Left_: number;
  _Radius_Top_Right_: number;
  _Radius_Bottom_Left_: number;
  _Radius_Bottom_Right_: number;
  
  /** Animation rate parameter */
  _Rate_: number;
  
  /** Highlight effect parameters */
  _Highlight_Color_: [number, number, number, number];
  _Highlight_Width_: number;
  _Highlight_Transform_: [number, number, number, number];
  _Highlight_: number;
  
  /** Iridescence effect parameters */
  _Iridescence_Intensity_: number;
  _Iridescence_Edge_Intensity_: number;
  _Iridescence_Tint_: [number, number, number, number];
  _Iridescent_Map_: WebGLTexture;
  _Angle_: number;
  _Reflected_: boolean;
  _Frequency_: number;
  _Vertical_Offset_: number;
  
  /** Gradient color parameters */
  _Gradient_Color_: [number, number, number, number];
  _Top_Left_: [number, number, number, number];
  _Top_Right_: [number, number, number, number];
  _Bottom_Left_: [number, number, number, number];
  _Bottom_Right_: [number, number, number, number];
  
  /** Edge rendering parameters */
  _Edge_Width_: number;
  _Edge_Power_: number;
  _Line_Gradient_Blend_: number;
  
  /** Overall opacity fade */
  _Fade_Out_: number;
}

/**
 * Varying inputs passed from vertex shader
 */
interface BackplateVaryings {
  /** World space position */
  vPosition: [number, number, number];
  
  /** Surface normal vector */
  vNormal: [number, number, number];
  
  /** Texture coordinates */
  vUV: [number, number];
  
  /** Tangent vector (repurposed for line vertex data) */
  vTangent: [number, number, number];
  
  /** Binormal vector (repurposed for axis data) */
  vBinormal: [number, number, number];
  
  /** Extra parameter pack 1: rectangle parameters (xy: half-size, zw: distance fields) */
  vExtra1: [number, number, number, number];
  
  /** Extra parameter pack 2: packed shader parameters */
  vExtra2: [number, number, number, number];
}

/**
 * Shader compilation options
 */
interface BackplateShaderDefines {
  /** Enable iridescence rendering pass */
  IRIDESCENCE_ENABLE?: boolean;
  
  /** Render only the edge outline */
  EDGE_ONLY?: boolean;
}

/**
 * Complete shader export object containing both name and source code
 */
export interface MRDLBackplateShader {
  /** Shader identifier name */
  name: string;
  
  /** GLSL fragment shader source code as string */
  shader: string;
}

/**
 * Main exported shader object for MRDL backplate rendering.
 * 
 * Features:
 * - Rounded rectangle rendering with per-corner radius control
 * - Configurable border lines with gradient blending
 * - Iridescence effects with reflection mapping
 * - Four-corner gradient fill support
 * - Edge-only rendering mode
 * - Highlight effects along border lines
 * - Smooth anti-aliasing with filter width control
 * - sRGB color space conversion
 * 
 * @remarks
 * This shader is registered in Babylon.js ShaderStore and can be referenced
 * by the name "mrdlBackplatePixelShader" when creating materials.
 */
export const mrdlBackplatePixelShader: MRDLBackplateShader;