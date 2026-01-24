/**
 * Fluent Button Vertex Shader Module
 * Provides vertex shader definitions for 3D Fluent-style button materials
 */

/**
 * Shader uniform definitions for the Fluent Button vertex shader
 */
export interface FluentButtonVertexUniforms {
  /** World transformation matrix */
  world: mat4;
  /** Combined view and projection matrix */
  viewProjection: mat4;
  /** Camera position in world space */
  cameraPosition: vec3;
  
  // Edge properties
  /** Width of the button edge */
  _Edge_Width_: number;
  /** Color of the button edge */
  _Edge_Color_: vec4;
  
  // Proximity effect properties
  /** Maximum intensity for proximity effects */
  _Proximity_Max_Intensity_: number;
  /** Far distance threshold for proximity detection */
  _Proximity_Far_Distance_: number;
  /** Near radius for proximity effects */
  _Proximity_Near_Radius_: number;
  /** Anisotropy factor for proximity calculations */
  _Proximity_Anisotropy_: number;
  
  // Selection properties
  /** Fuzziness factor for selection boundaries */
  _Selection_Fuzz_: number;
  /** Selection state (0.0 = unselected, 1.0 = selected) */
  _Selected_: number;
  /** Fade intensity for selection effect */
  _Selection_Fade_: number;
  /** Size of the selection fade area */
  _Selection_Fade_Size_: number;
  /** Distance threshold for selection effect */
  _Selected_Distance_: number;
  /** Fade length for selection transition */
  _Selected_Fade_Length_: number;
  
  // Primary blob properties
  /** Enable/disable primary blob effect */
  _Blob_Enable_: boolean;
  /** World position of the primary blob */
  _Blob_Position_: vec3;
  /** Intensity of the primary blob effect */
  _Blob_Intensity_: number;
  /** Size of blob when near */
  _Blob_Near_Size_: number;
  /** Size of blob when far */
  _Blob_Far_Size_: number;
  /** Near distance threshold for blob */
  _Blob_Near_Distance_: number;
  /** Far distance threshold for blob */
  _Blob_Far_Distance_: number;
  /** Fade length for blob transition */
  _Blob_Fade_Length_: number;
  /** Inner fade factor for blob */
  _Blob_Inner_Fade_: number;
  /** Pulse animation factor for blob */
  _Blob_Pulse_: number;
  /** Fade intensity for blob */
  _Blob_Fade_: number;
  /** Texture sampler for blob effect */
  _Blob_Texture_: sampler2D;
  
  // Secondary blob properties
  /** Enable/disable secondary blob effect */
  _Blob_Enable_2_: boolean;
  /** World position of the secondary blob */
  _Blob_Position_2_: vec3;
  /** Size of secondary blob when near */
  _Blob_Near_Size_2_: number;
  /** Inner fade factor for secondary blob */
  _Blob_Inner_Fade_2_: number;
  /** Pulse animation factor for secondary blob */
  _Blob_Pulse_2_: number;
  /** Fade intensity for secondary blob */
  _Blob_Fade_2_: number;
  
  // Active face properties
  /** Direction vector of the active face */
  _Active_Face_Dir_: vec3;
  /** Up vector of the active face */
  _Active_Face_Up_: vec3;
  
  // Visual properties
  /** Enable/disable fade effect */
  _Enable_Fade_: boolean;
  /** Width of the fade area */
  _Fade_Width_: number;
  /** Enable smooth transitions on active face */
  _Smooth_Active_Face_: boolean;
  /** Show/hide button frame */
  _Show_Frame_: boolean;
  
  // Global hand tracking properties
  /** Use global left index finger tracking */
  Use_Global_Left_Index: boolean;
  /** Use global right index finger tracking */
  Use_Global_Right_Index: boolean;
  /** Global position of left index finger tip */
  Global_Left_Index_Tip_Position: vec4;
  /** Global position of right index finger tip */
  Global_Right_Index_Tip_Position: vec4;
  /** Global position of left thumb tip */
  Global_Left_Thumb_Tip_Position: vec4;
  /** Global position of right thumb tip */
  Global_Right_Thumb_Tip_Position: vec4;
  /** Proximity value for left index finger */
  Global_Left_Index_Tip_Proximity: number;
  /** Proximity value for right index finger */
  Global_Right_Index_Tip_Proximity: number;
}

/**
 * Vertex attributes for the Fluent Button shader
 */
export interface FluentButtonVertexAttributes {
  /** Vertex position in object space */
  position: vec3;
  /** Vertex normal vector */
  normal: vec3;
  /** Texture coordinates */
  uv: vec2;
  /** Tangent vector for normal mapping */
  tangent: vec3;
  /** Vertex color */
  color: vec4;
}

/**
 * Varying outputs from vertex shader to fragment shader
 */
export interface FluentButtonVaryings {
  /** World space position */
  vPosition: vec3;
  /** World space normal */
  vNormal: vec3;
  /** Texture coordinates */
  vUV: vec2;
  /** World space tangent */
  vTangent: vec3;
  /** World space binormal */
  vBinormal: vec3;
  /** Vertex color with edge data */
  vColor: vec4;
  /** Extra parameters for proximity effects */
  vExtra1: vec4;
}

/**
 * Blob vertex shader information output
 */
export interface BlobVertexInfo {
  /** Lerp value and fade information */
  x: number;
  /** Fade intensity */
  y: number;
  /** Pulse multiplier */
  z: number;
}

/**
 * Shader store entry for the Fluent Button vertex shader
 */
export interface FluentButtonVertexShaderEntry {
  /** Shader name identifier */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * The complete GLSL source code for the Fluent Button vertex shader.
 * This shader implements advanced visual effects including:
 * - Proximity-based interactions with hand tracking
 * - Selection and hover states
 * - Blob effects for touch feedback
 * - Edge highlighting
 * - Smooth face transitions
 */
export declare const fluentButtonVertexShader: FluentButtonVertexShaderEntry;

/**
 * Type alias for 2D vector
 */
type vec2 = [number, number];

/**
 * Type alias for 3D vector
 */
type vec3 = [number, number, number];

/**
 * Type alias for 4D vector
 */
type vec4 = [number, number, number, number];

/**
 * Type alias for 4x4 matrix
 */
type mat4 = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number
];

/**
 * Type alias for 2D texture sampler
 */
type sampler2D = unknown;