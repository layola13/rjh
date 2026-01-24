/**
 * MRDL (Mixed Reality Design Language) Frontplate fragment shader module.
 * Provides pixel shader for rendering frontplate materials with proximity effects,
 * blob interactions, and rounded rectangle rendering.
 */

/**
 * Shader uniform parameters for MRDL frontplate rendering
 */
export interface MRDLFrontplateUniforms {
  /** Current camera world position */
  cameraPosition: [number, number, number];
  
  /** Corner radius of the frontplate rounded rectangle */
  _Radius_: number;
  
  /** Width of the edge line */
  _Line_Width_: number;
  
  /** Whether measurements are relative to height */
  _Relative_To_Height_: boolean;
  
  /** Width of the anti-aliasing filter */
  _Filter_Width_: number;
  
  /** Color of the frontplate edge */
  _Edge_Color_: [number, number, number, number];
  
  /** Fade out intensity multiplier */
  _Fade_Out_: number;
  
  /** Enable anti-aliased smooth edges */
  _Smooth_Edges_: boolean;
  
  /** Enable primary blob interaction effect */
  _Blob_Enable_: boolean;
  
  /** World position of the primary blob */
  _Blob_Position_: [number, number, number];
  
  /** Intensity multiplier for the blob effect */
  _Blob_Intensity_: number;
  
  /** Blob size when near the surface */
  _Blob_Near_Size_: number;
  
  /** Blob size when far from the surface */
  _Blob_Far_Size_: number;
  
  /** Distance threshold for near blob size */
  _Blob_Near_Distance_: number;
  
  /** Distance threshold for far blob size */
  _Blob_Far_Distance_: number;
  
  /** Fade transition length for blob */
  _Blob_Fade_Length_: number;
  
  /** Inner fade factor for blob */
  _Blob_Inner_Fade_: number;
  
  /** Pulse animation factor for blob */
  _Blob_Pulse_: number;
  
  /** Overall fade factor for blob */
  _Blob_Fade_: number;
  
  /** Maximum size during pulse animation */
  _Blob_Pulse_Max_Size_: number;
  
  /** Enable secondary blob interaction effect */
  _Blob_Enable_2_: boolean;
  
  /** World position of the secondary blob */
  _Blob_Position_2_: [number, number, number];
  
  /** Near size for secondary blob */
  _Blob_Near_Size_2_: number;
  
  /** Inner fade for secondary blob */
  _Blob_Inner_Fade_2_: number;
  
  /** Pulse factor for secondary blob */
  _Blob_Pulse_2_: number;
  
  /** Fade factor for secondary blob */
  _Blob_Fade_2_: number;
  
  /** Intensity of gaze interaction */
  _Gaze_Intensity_: number;
  
  /** Focus factor for gaze effect */
  _Gaze_Focus_: number;
  
  /** Texture sampler for blob rendering */
  _Blob_Texture_: WebGLTexture;
  
  /** Fuzziness of selection highlight */
  _Selection_Fuzz_: number;
  
  /** Current selection state (0.0-1.0) */
  _Selected_: number;
  
  /** Fade intensity for selection effect */
  _Selection_Fade_: number;
  
  /** Size of the selection fade area */
  _Selection_Fade_Size_: number;
  
  /** Distance for selection effect */
  _Selected_Distance_: number;
  
  /** Fade length for selection transition */
  _Selected_Fade_Length_: number;
  
  /** Maximum intensity for proximity effect */
  _Proximity_Max_Intensity_: number;
  
  /** Far distance threshold for proximity */
  _Proximity_Far_Distance_: number;
  
  /** Near radius for proximity calculation */
  _Proximity_Near_Radius_: number;
  
  /** Anisotropy factor for proximity effect */
  _Proximity_Anisotropy_: number;
  
  /** Use global left index finger position */
  _Use_Global_Left_Index_: boolean;
  
  /** Use global right index finger position */
  _Use_Global_Right_Index_: boolean;
  
  /** Global left index fingertip position */
  Global_Left_Index_Tip_Position: [number, number, number, number];
  
  /** Global right index fingertip position */
  Global_Right_Index_Tip_Position: [number, number, number, number];
}

/**
 * Varying inputs passed from vertex shader to fragment shader
 */
export interface MRDLFrontplateVaryings {
  /** Interpolated surface normal */
  vNormal: [number, number, number];
  
  /** Interpolated UV coordinates */
  vUV: [number, number];
  
  /** Interpolated tangent vector (also carries blob info) */
  vTangent: [number, number, number];
  
  /** Extra data 1: Rectangle parameters (xy: half-size, zw: position offset) */
  vExtra1: [number, number, number, number];
  
  /** Extra data 2: Proximity deltas (xy: finger1 delta, zw: finger2 delta) */
  vExtra2: [number, number, number, number];
  
  /** Extra data 3: Selection and fade parameters */
  vExtra3: [number, number, number, number];
}

/**
 * MRDL frontplate pixel shader configuration object
 */
export interface MRDLFrontplateShader {
  /** Shader identifier name */
  name: string;
  
  /** Complete GLSL shader source code */
  shader: string;
}

/**
 * The complete MRDL frontplate pixel shader.
 * Exported constant containing shader name and GLSL source code.
 */
export declare const mrdlFrontplatePixelShader: MRDLFrontplateShader;