/**
 * Fluent Button Vertex Shader Module
 * Provides vertex shader definitions for 3D Fluent Design button materials
 */

/**
 * Shader store entry for the Fluent Button vertex shader
 */
export interface IShaderStoreEntry {
  /** Unique identifier for the shader */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Uniform matrices for world and camera transformations
 */
export interface IFluentButtonUniforms {
  /** World transformation matrix */
  world: Float32Array;
  /** Combined view-projection matrix */
  viewProjection: Float32Array;
  /** Camera position in world space */
  cameraPosition: [number, number, number];
}

/**
 * Edge rendering parameters
 */
export interface IEdgeParameters {
  /** Width of the button edge */
  _Edge_Width_: number;
  /** Color of the button edge (RGBA) */
  _Edge_Color_: [number, number, number, number];
}

/**
 * Proximity effect parameters for hover/interaction feedback
 */
export interface IProximityParameters {
  /** Maximum intensity of proximity effect */
  _Proximity_Max_Intensity_: number;
  /** Distance at which proximity effect fades out completely */
  _Proximity_Far_Distance_: number;
  /** Radius of proximity effect when near */
  _Proximity_Near_Radius_: number;
  /** Anisotropic scaling factor for proximity effect */
  _Proximity_Anisotropy_: number;
}

/**
 * Selection state parameters
 */
export interface ISelectionParameters {
  /** Fuzziness/softness of selection edges */
  _Selection_Fuzz_: number;
  /** Selection state flag (0.0 = unselected, 1.0 = selected) */
  _Selected_: number;
  /** Current fade amount for selection transition */
  _Selection_Fade_: number;
  /** Size multiplier during selection fade */
  _Selection_Fade_Size_: number;
  /** Distance threshold for selection detection */
  _Selected_Distance_: number;
  /** Length of selection fade transition */
  _Selected_Fade_Length_: number;
}

/**
 * Blob effect parameters (primary interaction point)
 */
export interface IBlobParameters {
  /** Enable/disable primary blob effect */
  _Blob_Enable_: boolean;
  /** World position of the blob center */
  _Blob_Position_: [number, number, number];
  /** Intensity/strength of blob effect */
  _Blob_Intensity_: number;
  /** Blob size when near the surface */
  _Blob_Near_Size_: number;
  /** Blob size when far from the surface */
  _Blob_Far_Size_: number;
  /** Distance threshold for "near" blob behavior */
  _Blob_Near_Distance_: number;
  /** Distance threshold for "far" blob behavior */
  _Blob_Far_Distance_: number;
  /** Length of distance-based fade transition */
  _Blob_Fade_Length_: number;
  /** Inner fade factor for blob */
  _Blob_Inner_Fade_: number;
  /** Pulse animation factor */
  _Blob_Pulse_: number;
  /** Overall blob fade multiplier */
  _Blob_Fade_: number;
  /** Texture sampler for blob pattern */
  _Blob_Texture_: WebGLTexture;
}

/**
 * Secondary blob effect parameters (for multi-touch scenarios)
 */
export interface IBlob2Parameters {
  /** Enable/disable secondary blob effect */
  _Blob_Enable_2_: boolean;
  /** World position of the secondary blob center */
  _Blob_Position_2_: [number, number, number];
  /** Secondary blob size when near */
  _Blob_Near_Size_2_: number;
  /** Inner fade factor for secondary blob */
  _Blob_Inner_Fade_2_: number;
  /** Pulse animation factor for secondary blob */
  _Blob_Pulse_2_: number;
  /** Overall secondary blob fade multiplier */
  _Blob_Fade_2_: number;
}

/**
 * Active face orientation parameters
 */
export interface IActiveFaceParameters {
  /** Direction vector of the active face normal */
  _Active_Face_Dir_: [number, number, number];
  /** Up vector for active face orientation */
  _Active_Face_Up_: [number, number, number];
}

/**
 * Fade and frame display parameters
 */
export interface IDisplayParameters {
  /** Enable distance-based fading */
  _Enable_Fade_: boolean;
  /** Width of the fade transition region */
  _Fade_Width_: number;
  /** Enable smooth transitions on active face */
  _Smooth_Active_Face_: boolean;
  /** Show wireframe/border frame */
  _Show_Frame_: boolean;
}

/**
 * Global hand tracking parameters
 */
export interface IGlobalHandTrackingParameters {
  /** Use global left index finger tracking */
  Use_Global_Left_Index: boolean;
  /** Use global right index finger tracking */
  Use_Global_Right_Index: boolean;
  /** Left index finger tip position */
  Global_Left_Index_Tip_Position: [number, number, number, number];
  /** Right index finger tip position */
  Global_Right_Index_Tip_Position: [number, number, number, number];
  /** Left thumb tip position */
  Global_Left_Thumb_Tip_Position: [number, number, number, number];
  /** Right thumb tip position */
  Global_Right_Thumb_Tip_Position: [number, number, number, number];
  /** Proximity value for left index finger */
  Global_Left_Index_Tip_Proximity: number;
  /** Proximity value for right index finger */
  Global_Right_Index_Tip_Proximity: number;
}

/**
 * Vertex shader attributes
 */
export interface IVertexAttributes {
  /** Vertex position in object space */
  position: [number, number, number];
  /** Vertex normal vector */
  normal: [number, number, number];
  /** Texture coordinates */
  uv: [number, number];
  /** Tangent vector for normal mapping */
  tangent: [number, number, number];
  /** Vertex color (RGBA) */
  color: [number, number, number, number];
}

/**
 * Varying outputs from vertex shader to fragment shader
 */
export interface IVertexOutputVaryings {
  /** World-space vertex position */
  vPosition: [number, number, number];
  /** Interpolated normal vector */
  vNormal: [number, number, number];
  /** Interpolated UV coordinates */
  vUV: [number, number];
  /** Interpolated tangent vector */
  vTangent: [number, number, number];
  /** Interpolated binormal vector */
  vBinormal: [number, number, number];
  /** Interpolated vertex color */
  vColor: [number, number, number, number];
  /** Extra data channel 1 (proximity info) */
  vExtra1: [number, number, number, number];
}

/**
 * Blob vertex computation output
 */
export interface IBlobVertexOutput {
  /** Modified vertex position after blob deformation */
  Out_Position: [number, number, number];
  /** Modified UV coordinates for blob texture */
  Out_UV: [number, number];
  /** Blob metadata (lerp value, fade, pulse) */
  Blob_Info: [number, number, number];
}

/**
 * Proximity vertex computation output
 */
export interface IProximityVertexOutput {
  /** Packed proximity data for both blobs */
  Extra1: [number, number, number, number];
  /** Distance from vertex to active face */
  Distance_To_Face: number;
  /** Computed proximity intensity */
  Intensity: number;
}

/**
 * Wireframe vertex computation output
 */
export interface IWireframeVertexOutput {
  /** Wireframe vertex position */
  Wire_Vx_Pos: [number, number, number];
  /** Wireframe UV coordinates */
  UV: [number, number];
  /** Edge widths in U and V directions */
  Widths: [number, number];
}

/**
 * Complete uniform parameters for Fluent Button shader
 */
export type FluentButtonVertexUniforms = IFluentButtonUniforms &
  IEdgeParameters &
  IProximityParameters &
  ISelectionParameters &
  IBlobParameters &
  IBlob2Parameters &
  IActiveFaceParameters &
  IDisplayParameters &
  IGlobalHandTrackingParameters;

/**
 * Name constant for the Fluent Button vertex shader
 */
export declare const FLUENT_BUTTON_VERTEX_SHADER_NAME = "fluentButtonVertexShader";

/**
 * GLSL source code for the Fluent Button vertex shader
 * 
 * This shader implements:
 * - Proximity-based hover effects with dual blob support
 * - Selection state visualization with smooth transitions
 * - Wireframe edge rendering with configurable width
 * - Hand tracking integration for VR/AR scenarios
 * - Dynamic vertex deformation based on interaction distance
 */
export declare const fluentButtonVertexShader: string;

/**
 * Shader store registration entry
 * Registers the shader with Babylon.js shader store for material usage
 */
export declare const fluentButtonVertexShaderEntry: IShaderStoreEntry;