/**
 * Fluent Button shader module for Babylon.js GUI 3D materials
 * Provides pixel shader definition for fluent design button rendering with proximity effects, blobs, and edge highlighting
 */

/**
 * Name identifier for the fluent button pixel shader
 */
export const fluentButtonPixelShaderName: string;

/**
 * Fluent button pixel shader configuration object
 */
export interface FluentButtonPixelShader {
  /**
   * Shader identifier name
   */
  name: string;
  
  /**
   * GLSL shader source code stored in ShaderStore
   */
  shader: string;
}

/**
 * Complete fluent button pixel shader definition with GLSL source code
 * 
 * This shader implements:
 * - Edge detection and highlighting with proximity-based intensity
 * - Blob effects for interaction points (touch/pointer proximity)
 * - Dual blob support for multi-point interaction (e.g., left/right hand)
 * - Selection states with fade effects
 * - Wireframe rendering mode
 * - Active face detection with smooth transitions
 * - Global index finger and thumb position tracking
 * 
 * @remarks
 * The shader supports various rendering modes controlled by uniforms:
 * - Edge rendering with relative or absolute width
 * - Proximity-based highlighting with anisotropic falloff
 * - Selection feedback with customizable fade
 * - Blob textures for custom interaction effects
 * - Frame visualization for debugging
 */
export const fluentButtonPixelShader: FluentButtonPixelShader;

/**
 * Uniform: Camera position in world space
 */
declare const cameraPosition: vec3;

/**
 * Varying: Interpolated vertex position in world space
 */
declare const vPosition: vec3;

/**
 * Varying: Interpolated vertex normal
 */
declare const vNormal: vec3;

/**
 * Varying: Interpolated UV coordinates
 */
declare const vUV: vec2;

/**
 * Varying: Interpolated tangent vector
 */
declare const vTangent: vec3;

/**
 * Varying: Interpolated binormal vector
 */
declare const vBinormal: vec3;

/**
 * Varying: Interpolated vertex color
 */
declare const vColor: vec4;

/**
 * Varying: Extra vertex data for proximity calculations
 */
declare const vExtra1: vec4;

/**
 * Uniform: Width of edge highlighting effect
 */
declare const _Edge_Width_: number;

/**
 * Uniform: Color of edge highlighting
 */
declare const _Edge_Color_: vec4;

/**
 * Uniform: Whether edge width is relative to screen space
 */
declare const _Relative_Width_: boolean;

/**
 * Uniform: Maximum intensity for proximity effect
 */
declare const _Proximity_Max_Intensity_: number;

/**
 * Uniform: Far distance threshold for proximity detection
 */
declare const _Proximity_Far_Distance_: number;

/**
 * Uniform: Near radius for proximity effect activation
 */
declare const _Proximity_Near_Radius_: number;

/**
 * Uniform: Anisotropy factor for proximity effect
 */
declare const _Proximity_Anisotropy_: number;

/**
 * Uniform: Fuzziness/softness of selection highlight
 */
declare const _Selection_Fuzz_: number;

/**
 * Uniform: Selection state (0.0 = unselected, 1.0 = selected)
 */
declare const _Selected_: number;

/**
 * Uniform: Fade amount for selection transition
 */
declare const _Selection_Fade_: number;

/**
 * Uniform: Size of selection fade region
 */
declare const _Selection_Fade_Size_: number;

/**
 * Uniform: Distance threshold for selection detection
 */
declare const _Selected_Distance_: number;

/**
 * Uniform: Length of selection fade transition
 */
declare const _Selected_Fade_Length_: number;

/**
 * Uniform: Enable first blob effect
 */
declare const _Blob_Enable_: boolean;

/**
 * Uniform: World position of first blob center
 */
declare const _Blob_Position_: vec3;

/**
 * Uniform: Intensity multiplier for first blob
 */
declare const _Blob_Intensity_: number;

/**
 * Uniform: Size of first blob at near distance
 */
declare const _Blob_Near_Size_: number;

/**
 * Uniform: Size of first blob at far distance
 */
declare const _Blob_Far_Size_: number;

/**
 * Uniform: Near distance threshold for first blob
 */
declare const _Blob_Near_Distance_: number;

/**
 * Uniform: Far distance threshold for first blob
 */
declare const _Blob_Far_Distance_: number;

/**
 * Uniform: Fade length for first blob transition
 */
declare const _Blob_Fade_Length_: number;

/**
 * Uniform: Inner fade factor for first blob
 */
declare const _Blob_Inner_Fade_: number;

/**
 * Uniform: Pulse animation factor for first blob
 */
declare const _Blob_Pulse_: number;

/**
 * Uniform: Overall fade for first blob
 */
declare const _Blob_Fade_: number;

/**
 * Uniform: Texture sampler for blob appearance
 */
declare const _Blob_Texture_: sampler2D;

/**
 * Uniform: Enable second blob effect
 */
declare const _Blob_Enable_2_: boolean;

/**
 * Uniform: World position of second blob center
 */
declare const _Blob_Position_2_: vec3;

/**
 * Uniform: Size of second blob at near distance
 */
declare const _Blob_Near_Size_2_: number;

/**
 * Uniform: Inner fade factor for second blob
 */
declare const _Blob_Inner_Fade_2_: number;

/**
 * Uniform: Pulse animation factor for second blob
 */
declare const _Blob_Pulse_2_: number;

/**
 * Uniform: Overall fade for second blob
 */
declare const _Blob_Fade_2_: number;

/**
 * Uniform: Direction vector of active face
 */
declare const _Active_Face_Dir_: vec3;

/**
 * Uniform: Up vector of active face
 */
declare const _Active_Face_Up_: vec3;

/**
 * Uniform: Enable fade effect at edges
 */
declare const Enable_Fade: boolean;

/**
 * Uniform: Width of fade region
 */
declare const _Fade_Width_: number;

/**
 * Uniform: Enable smooth transition for active face
 */
declare const _Smooth_Active_Face_: boolean;

/**
 * Uniform: Show debug frame visualization
 */
declare const _Show_Frame_: boolean;

/**
 * Uniform: Use texture for blob rendering instead of procedural
 */
declare const _Use_Blob_Texture_: boolean;

/**
 * Uniform: Use global left index finger position
 */
declare const Use_Global_Left_Index: boolean;

/**
 * Uniform: Use global right index finger position
 */
declare const Use_Global_Right_Index: boolean;

/**
 * Uniform: Global left index finger tip position and data
 */
declare const Global_Left_Index_Tip_Position: vec4;

/**
 * Uniform: Global right index finger tip position and data
 */
declare const Global_Right_Index_Tip_Position: vec4;

/**
 * Uniform: Global left thumb tip position and data
 */
declare const Global_Left_Thumb_Tip_Position: vec4;

/**
 * Uniform: Global right thumb tip position and data
 */
declare const Global_Right_Thumb_Tip_Position: vec4;

/**
 * Uniform: Proximity value for left index finger
 */
declare const Global_Left_Index_Tip_Proximity: number;

/**
 * Uniform: Proximity value for right index finger
 */
declare const Global_Right_Index_Tip_Proximity: number;

/**
 * Fragment shader function: Calculates edge detection for holographic edge effect
 * 
 * @param Edges - Edge data from vertex shader (distances to edges in RGBA channels)
 * @param Edge_Width - Width multiplier for edge detection
 * @param NotEdge - Output: 1.0 if not on edge, 0.0 if on edge (for masking)
 */
declare function Holo_Edge_Fragment_B35(
  Edges: vec4,
  Edge_Width: number,
  NotEdge: out<number>
): void;

/**
 * Fragment shader function: Renders blob effect at interaction point
 * 
 * @param UV - UV coordinates relative to blob center
 * @param Blob_Info - Blob parameters (x: pulse phase, y: intensity, z: unused)
 * @param Blob_Texture - Texture sampler for blob appearance
 * @param Blob_Color - Output: Computed blob color with falloff
 */
declare function Blob_Fragment_B39(
  UV: vec2,
  Blob_Info: vec3,
  Blob_Texture: sampler2D,
  Blob_Color: out<vec4>
): void;

/**
 * Helper function: Anti-aliased step filter using derivatives
 * 
 * @param Edge - Edge threshold value
 * @param X - Input value to filter
 * @returns Smoothly filtered step value with anti-aliasing
 */
declare function FilterStep(Edge: vec2, X: vec2): vec2;

/**
 * Fragment shader function: Renders wireframe with proximity-based intensity
 * 
 * @param Widths - Line widths for wireframe (xy: horizontal/vertical edge widths)
 * @param UV - UV coordinates for edge distance calculation
 * @param Proximity - Proximity intensity multiplier
 * @param Edge_Color - Base color for wireframe lines
 * @param Wireframe - Output: Final wireframe color with proximity modulation
 */
declare function Wireframe_Fragment_B59(
  Widths: vec3,
  UV: vec2,
  Proximity: number,
  Edge_Color: vec4,
  Wireframe: out<vec4>
): void;

/**
 * Fragment shader function: Calculates proximity effect from interaction points
 * 
 * @param Proximity_Center - First proximity center position
 * @param Proximity_Center_2 - Second proximity center position
 * @param Proximity_Max_Intensity - Maximum proximity intensity
 * @param Proximity_Near_Radius - Radius at which proximity reaches maximum
 * @param Position - Current fragment position
 * @param Show_Selection - Selection state vector
 * @param Extra1 - Extra vertex data containing proximity deltas
 * @param Dist_To_Face - Distance to active face
 * @param Intensity - Base intensity multiplier
 * @param Proximity - Output: Computed proximity value (0.0 to 1.0)
 */
declare function Proximity_B53(
  Proximity_Center: vec3,
  Proximity_Center_2: vec3,
  Proximity_Max_Intensity: number,
  Proximity_Near_Radius: number,
  Position: vec3,
  Show_Selection: vec3,
  Extra1: vec4,
  Dist_To_Face: number,
  Intensity: number,
  Proximity: out<number>
): void;

/**
 * Fragment shader function: Extracts individual components from vec3
 * 
 * @param Vec3 - Input 3D vector
 * @param X - Output: X component
 * @param Y - Output: Y component
 * @param Z - Output: Z component
 */
declare function To_XYZ_B46(
  Vec3: vec3,
  X: out<number>,
  Y: out<number>,
  Z: out<number>
): void;

/**
 * Helper type for GLSL output parameters
 */
type out<T> = T;

/**
 * GLSL vector types
 */
type vec2 = [number, number];
type vec3 = [number, number, number];
type vec4 = [number, number, number, number];

/**
 * GLSL sampler type
 */
type sampler2D = unknown;