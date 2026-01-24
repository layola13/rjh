/**
 * MRDL (Mixed Reality Design Language) frontplate vertex shader module.
 * Provides vertex shader functionality for frontplate materials in 3D GUI systems.
 */

/**
 * Name identifier for the MRDL frontplate vertex shader.
 */
export const SHADER_NAME: string;

/**
 * Complete GLSL vertex shader source code for MRDL frontplate rendering.
 * 
 * This shader implements advanced visual effects including:
 * - Blob-based proximity interactions with dual blob support
 * - Selection state visualization with fade effects
 * - Rounded rectangle geometry with configurable radius and line width
 * - Proximity-based vertex displacement and fading
 * - Global index finger tracking integration (left/right)
 * - Gaze-based interaction support
 * - Pulse animations for blob effects
 * 
 * @remarks
 * The shader uses a node-based architecture (indicated by Q-suffixed variables)
 * and supports anisotropic scaling for non-square aspect ratios.
 */
export const SHADER_SOURCE: string;

/**
 * Shader store entry containing metadata and source code.
 */
export interface MRDLFrontplateShaderDescriptor {
  /** Unique name identifier for shader registration */
  name: string;
  
  /** Complete GLSL shader source code */
  shader: string;
}

/**
 * Exported shader descriptor for the MRDL frontplate vertex shader.
 * Registered in Babylon.js ShaderStore for material consumption.
 */
export const mrdlFrontplateVertexShader: MRDLFrontplateShaderDescriptor;

/**
 * Uniform definitions for the shader
 */
export interface MRDLFrontplateUniforms {
  // Transform matrices
  world: Float32Array;
  viewProjection: Float32Array;
  cameraPosition: Float32Array;
  
  // Shape parameters
  _Radius_: number;
  _Line_Width_: number;
  _Relative_To_Height_: boolean;
  _Filter_Width_: number;
  
  // Edge styling
  _Edge_Color_: Float32Array;
  _Fade_Out_: number;
  _Smooth_Edges_: boolean;
  
  // Primary blob configuration
  _Blob_Enable_: boolean;
  _Blob_Position_: Float32Array;
  _Blob_Intensity_: number;
  _Blob_Near_Size_: number;
  _Blob_Far_Size_: number;
  _Blob_Near_Distance_: number;
  _Blob_Far_Distance_: number;
  _Blob_Fade_Length_: number;
  _Blob_Inner_Fade_: number;
  _Blob_Pulse_: number;
  _Blob_Fade_: number;
  _Blob_Pulse_Max_Size_: number;
  
  // Secondary blob configuration
  _Blob_Enable_2_: boolean;
  _Blob_Position_2_: Float32Array;
  _Blob_Near_Size_2_: number;
  _Blob_Inner_Fade_2_: number;
  _Blob_Pulse_2_: number;
  _Blob_Fade_2_: number;
  
  // Gaze interaction
  _Gaze_Intensity_: number;
  _Gaze_Focus_: number;
  
  // Blob texture
  _Blob_Texture_: WebGLTexture;
  
  // Selection state
  _Selection_Fuzz_: number;
  _Selected_: number;
  _Selection_Fade_: number;
  _Selection_Fade_Size_: number;
  _Selected_Distance_: number;
  _Selected_Fade_Length_: number;
  
  // Proximity effects
  _Proximity_Max_Intensity_: number;
  _Proximity_Far_Distance_: number;
  _Proximity_Near_Radius_: number;
  _Proximity_Anisotropy_: number;
  
  // Global finger tracking
  _Use_Global_Left_Index_: boolean;
  _Use_Global_Right_Index_: boolean;
  Global_Left_Index_Tip_Position: Float32Array;
  Global_Right_Index_Tip_Position: Float32Array;
}

/**
 * Vertex attribute definitions
 */
export interface MRDLFrontplateAttributes {
  position: Float32Array;
  normal: Float32Array;
  uv: Float32Array;
  tangent: Float32Array;
  color: Float32Array;
}

/**
 * Varying outputs passed to fragment shader
 */
export interface MRDLFrontplateVaryings {
  vNormal: Float32Array;
  vUV: Float32Array;
  vTangent: Float32Array;
  vExtra1: Float32Array;
  vExtra2: Float32Array;
  vExtra3: Float32Array;
}