/**
 * Fluent Backplate Pixel Shader Module
 * Provides shader code for rendering Fluent Design backplate materials with rounded corners,
 * blob effects, iridescence, and highlight features.
 */

/**
 * Name identifier for the fluent backplate pixel shader
 */
export const fluentBackplatePixelShaderName: string;

/**
 * Complete GLSL shader source code for the fluent backplate fragment shader.
 * 
 * This shader implements:
 * - Rounded rectangle rendering with configurable corner radii
 * - Blob/proximity effects with texture mapping
 * - Iridescent color effects with edge intensity
 * - Dynamic highlight rendering
 * - Global finger tracking support (left/right index)
 * - Fade-out effects
 * 
 * @remarks
 * The shader uses conditional compilation with preprocessor directives:
 * - `BLOB_ENABLE`: Enables blob proximity effects
 * - `IRIDESCENT_MAP_ENABLE`: Enables iridescent texture mapping
 */
export const fluentBackplatePixelShaderSource: string;

/**
 * Shader definition object containing metadata and source code
 */
export interface FluentBackplateShaderDefinition {
  /**
   * Unique identifier for the shader in the shader store
   */
  name: string;
  
  /**
   * Complete GLSL fragment shader source code
   */
  shader: string;
}

/**
 * Exported shader definition for the Fluent Backplate material.
 * Automatically registered in Babylon.js ShaderStore upon module load.
 */
export const fluentBackplatePixelShader: FluentBackplateShaderDefinition;

/**
 * Shader uniform parameters (set by material)
 */
export interface FluentBackplateUniforms {
  /** Camera world position */
  cameraPosition: [number, number, number];
  
  /** Global corner radius (when not using individual radii) */
  _Radius_: number;
  
  /** Border line width */
  _Line_Width_: number;
  
  /** Whether sizes are in absolute units vs normalized */
  _Absolute_Sizes_: boolean;
  
  /** Anti-aliasing filter width */
  _Filter_Width_: number;
  
  /** Base fill color (RGBA) */
  _Base_Color_: [number, number, number, number];
  
  /** Border line color (RGBA) */
  _Line_Color_: [number, number, number, number];
  
  /** Top-left corner radius */
  _Radius_Top_Left_: number;
  
  /** Top-right corner radius */
  _Radius_Top_Right_: number;
  
  /** Bottom-left corner radius */
  _Radius_Bottom_Left_: number;
  
  /** Bottom-right corner radius */
  _Radius_Bottom_Right_: number;
  
  /** First blob world position */
  _Blob_Position_: [number, number, number];
  
  /** Blob effect intensity multiplier */
  _Blob_Intensity_: number;
  
  /** Blob size when near */
  _Blob_Near_Size_: number;
  
  /** Blob size when far */
  _Blob_Far_Size_: number;
  
  /** Distance threshold for near blob size */
  _Blob_Near_Distance_: number;
  
  /** Distance threshold for far blob size */
  _Blob_Far_Distance_: number;
  
  /** Fade transition length for blob */
  _Blob_Fade_Length_: number;
  
  /** Blob pulse animation value */
  _Blob_Pulse_: number;
  
  /** Blob fade amount */
  _Blob_Fade_: number;
  
  /** Blob gradient texture sampler */
  _Blob_Texture_: WebGLTexture;
  
  /** Second blob world position */
  _Blob_Position_2_: [number, number, number];
  
  /** Second blob near size */
  _Blob_Near_Size_2_: number;
  
  /** Second blob pulse animation value */
  _Blob_Pulse_2_: number;
  
  /** Second blob fade amount */
  _Blob_Fade_2_: number;
  
  /** Animation rate/speed */
  _Rate_: number;
  
  /** Highlight overlay color (RGBA) */
  _Highlight_Color_: [number, number, number, number];
  
  /** Highlight band width */
  _Highlight_Width_: number;
  
  /** Highlight transform parameters */
  _Highlight_Transform_: [number, number, number, number];
  
  /** Highlight intensity */
  _Highlight_: number;
  
  /** Iridescence base intensity */
  _Iridescence_Intensity_: number;
  
  /** Iridescence edge intensity */
  _Iridescence_Edge_Intensity_: number;
  
  /** Viewing angle parameter */
  _Angle_: number;
  
  /** Global fade-out multiplier */
  _Fade_Out_: number;
  
  /** Use reflected vector for iridescence calculation */
  _Reflected_: boolean;
  
  /** Iridescence frequency/repetition */
  _Frequency_: number;
  
  /** Vertical UV offset for iridescence */
  _Vertical_Offset_: number;
  
  /** Iridescent color lookup texture */
  _Iridescent_Map_: WebGLTexture;
  
  /** Enable global left index finger tracking */
  _Use_Global_Left_Index_: boolean;
  
  /** Enable global right index finger tracking */
  _Use_Global_Right_Index_: boolean;
  
  /** Global left index finger tip position */
  Global_Left_Index_Tip_Position: [number, number, number, number];
  
  /** Global right index finger tip position */
  Global_Right_Index_Tip_Position: [number, number, number, number];
}

/**
 * Vertex shader outputs (varyings) passed to fragment shader
 */
export interface FluentBackplateVaryings {
  /** World position */
  vPosition: [number, number, number];
  
  /** World normal */
  vNormal: [number, number, number];
  
  /** Texture coordinates */
  vUV: [number, number];
  
  /** Tangent vector (repurposed for line rendering) */
  vTangent: [number, number, number];
  
  /** Binormal vector (repurposed for reflection) */
  vBinormal: [number, number, number];
  
  /** Vertex color (stores corner radii in RGB, alpha in A) */
  vColor: [number, number, number, number];
  
  /** Extra data 1: rectangle parameters (xy: half-size, zw: distance fields) */
  vExtra1: [number, number, number, number];
  
  /** Extra data 2: first blob info (xy: UV offset, z: intensity, w: fade) */
  vExtra2: [number, number, number, number];
  
  /** Extra data 3: second blob info (xy: UV offset, z: intensity, w: fade) */
  vExtra3: [number, number, number, number];
}