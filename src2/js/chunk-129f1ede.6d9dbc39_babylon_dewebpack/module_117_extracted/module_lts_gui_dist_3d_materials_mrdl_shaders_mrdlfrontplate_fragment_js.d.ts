/**
 * MRDL Frontplate Fragment Shader Module
 * Provides shader code for MRDL (Mixed Reality Design Language) frontplate material rendering
 * with blob effects, proximity interactions, and rounded rectangle rendering.
 */

/**
 * Shader uniform configuration for MRDL frontplate material
 */
export interface MRDLFrontplateUniforms {
  /** Camera position in world space */
  cameraPosition: [number, number, number];
  
  /** Corner radius for rounded rectangle */
  _Radius_: number;
  
  /** Width of the edge line */
  _Line_Width_: number;
  
  /** Whether line width is relative to height */
  _Relative_To_Height_: boolean;
  
  /** Anti-aliasing filter width */
  _Filter_Width_: number;
  
  /** Color of the edge/border */
  _Edge_Color_: [number, number, number, number];
  
  /** Fade out intensity (0-1) */
  _Fade_Out_: number;
  
  /** Enable smooth anti-aliased edges */
  _Smooth_Edges_: boolean;
  
  /** Enable primary blob effect */
  _Blob_Enable_: boolean;
  
  /** World position of primary blob */
  _Blob_Position_: [number, number, number];
  
  /** Intensity multiplier for blob effect */
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
  
  /** Inner fade radius for blob */
  _Blob_Inner_Fade_: number;
  
  /** Pulse animation phase for blob */
  _Blob_Pulse_: number;
  
  /** Overall fade amount for blob */
  _Blob_Fade_: number;
  
  /** Maximum size during pulse animation */
  _Blob_Pulse_Max_Size_: number;
  
  /** Enable secondary blob effect */
  _Blob_Enable_2_: boolean;
  
  /** World position of secondary blob */
  _Blob_Position_2_: [number, number, number];
  
  /** Secondary blob size when near */
  _Blob_Near_Size_2_: number;
  
  /** Inner fade radius for secondary blob */
  _Blob_Inner_Fade_2_: number;
  
  /** Pulse animation phase for secondary blob */
  _Blob_Pulse_2_: number;
  
  /** Overall fade amount for secondary blob */
  _Blob_Fade_2_: number;
  
  /** Gaze interaction intensity */
  _Gaze_Intensity_: number;
  
  /** Gaze focus sharpness */
  _Gaze_Focus_: number;
  
  /** Texture for blob rendering */
  _Blob_Texture_: WebGLTexture;
  
  /** Fuzziness/softness of selection effect */
  _Selection_Fuzz_: number;
  
  /** Selection state (0-1) */
  _Selected_: number;
  
  /** Fade amount for selection effect */
  _Selection_Fade_: number;
  
  /** Size of selection fade region */
  _Selection_Fade_Size_: number;
  
  /** Distance for selection effect */
  _Selected_Distance_: number;
  
  /** Fade length for selection transition */
  _Selected_Fade_Length_: number;
  
  /** Maximum intensity for proximity effect */
  _Proximity_Max_Intensity_: number;
  
  /** Far distance threshold for proximity */
  _Proximity_Far_Distance_: number;
  
  /** Near radius for proximity detection */
  _Proximity_Near_Radius_: number;
  
  /** Anisotropy factor for proximity effect */
  _Proximity_Anisotropy_: number;
  
  /** Use global left index finger position */
  _Use_Global_Left_Index_: boolean;
  
  /** Use global right index finger position */
  _Use_Global_Right_Index_: boolean;
  
  /** Global left index finger tip position */
  Global_Left_Index_Tip_Position: [number, number, number, number];
  
  /** Global right index finger tip position */
  Global_Right_Index_Tip_Position: [number, number, number, number];
}

/**
 * Vertex shader varying outputs passed to fragment shader
 */
export interface MRDLFrontplateVaryings {
  /** Interpolated normal vector */
  vNormal: [number, number, number];
  
  /** UV texture coordinates */
  vUV: [number, number];
  
  /** Tangent vector (reused for blob info) */
  vTangent: [number, number, number];
  
  /** Extra data 1: Rectangle parameters */
  vExtra1: [number, number, number, number];
  
  /** Extra data 2: Proximity deltas */
  vExtra2: [number, number, number, number];
  
  /** Extra data 3: Additional parameters (selection, distances, etc.) */
  vExtra3: [number, number, number, number];
}

/**
 * Shader store entry for MRDL frontplate pixel shader
 */
export interface MRDLFrontplateShaderEntry {
  /** Shader identifier name */
  name: string;
  
  /** GLSL shader source code */
  shader: string;
}

/**
 * MRDL frontplate pixel shader source code
 * Contains GLSL code for rendering interactive UI frontplates with:
 * - Rounded rectangle shapes with smooth edges
 * - Proximity-based highlighting from hand/finger positions
 * - Blob effects with textures and animations
 * - Selection and gaze interaction effects
 */
export declare const mrdlFrontplatePixelShader: MRDLFrontplateShaderEntry;