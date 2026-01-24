/**
 * MRDL (Mixed Reality Design Language) Slider Thumb Vertex Shader
 * Defines the vertex shader for a 3D slider thumb component with advanced visual effects
 */

/**
 * Shader uniform parameters for material properties
 */
export interface MRDLSliderThumbUniforms {
  /** World transformation matrix */
  world: Float32Array;
  /** View-projection matrix */
  viewProjection: Float32Array;
  /** Camera position in world space */
  cameraPosition: Float32Array;
  
  // Geometry parameters
  /** Base radius of the slider thumb */
  _Radius_: number;
  /** Front bevel amount */
  _Bevel_Front_: number;
  /** Front bevel stretch factor */
  _Bevel_Front_Stretch_: number;
  /** Back bevel amount */
  _Bevel_Back_: number;
  /** Back bevel stretch factor */
  _Bevel_Back_Stretch_: number;
  
  // Corner radii
  /** Top-left corner radius multiplier */
  _Radius_Top_Left_: number;
  /** Top-right corner radius multiplier */
  _Radius_Top_Right_: number;
  /** Bottom-left corner radius multiplier */
  _Radius_Bottom_Left_: number;
  /** Bottom-right corner radius multiplier */
  _Radius_Bottom_Right_: number;
  
  // Bulge effect
  /** Enable bulge deformation */
  _Bulge_Enabled_: boolean;
  /** Height of bulge effect */
  _Bulge_Height_: number;
  /** Radius of bulge effect */
  _Bulge_Radius_: number;
  
  // Lighting parameters
  /** Sun light intensity */
  _Sun_Intensity_: number;
  /** Sun theta angle (elevation) */
  _Sun_Theta_: number;
  /** Sun phi angle (azimuth) */
  _Sun_Phi_: number;
  /** Indirect diffuse lighting intensity */
  _Indirect_Diffuse_: number;
  
  // Material properties
  /** Albedo color (RGBA) */
  _Albedo_: Float32Array;
  /** Specular intensity */
  _Specular_: number;
  /** Shininess factor */
  _Shininess_: number;
  /** Edge sharpness */
  _Sharpness_: number;
  /** Subsurface scattering amount */
  _Subsurface_: number;
  
  // Gradient colors
  /** Left side color (RGBA) */
  _Left_Color_: Float32Array;
  /** Right side color (RGBA) */
  _Right_Color_: Float32Array;
  
  // Reflection parameters
  /** Reflection intensity */
  _Reflection_: number;
  /** Front face reflection amount */
  _Front_Reflect_: number;
  /** Edge reflection amount */
  _Edge_Reflect_: number;
  /** Reflection power/falloff */
  _Power_: number;
  
  // Environment colors
  /** Sky color (RGBA) */
  _Sky_Color_: Float32Array;
  /** Horizon color (RGBA) */
  _Horizon_Color_: Float32Array;
  /** Ground color (RGBA) */
  _Ground_Color_: Float32Array;
  /** Horizon blend power */
  _Horizon_Power_: number;
  
  // Texture maps
  /** Reflection environment map */
  _Reflection_Map_: WebGLTexture;
  /** Indirect environment lighting map */
  _Indirect_Environment_: WebGLTexture;
  
  // Edge parameters
  /** Edge width */
  _Width_: number;
  /** Fuzz/blur amount */
  _Fuzz_: number;
  /** Minimum fuzz amount */
  _Min_Fuzz_: number;
  /** Clip fade distance */
  _Clip_Fade_: number;
  
  // Color adjustments
  /** Hue shift amount */
  _Hue_Shift_: number;
  /** Saturation shift amount */
  _Saturation_Shift_: number;
  /** Value/brightness shift amount */
  _Value_Shift_: number;
  
  // Blob 1 (proximity effect) parameters
  /** Blob 1 position in world space */
  _Blob_Position_: Float32Array;
  /** Blob 1 intensity */
  _Blob_Intensity_: number;
  /** Blob 1 size when near */
  _Blob_Near_Size_: number;
  /** Blob 1 size when far */
  _Blob_Far_Size_: number;
  /** Blob 1 near distance threshold */
  _Blob_Near_Distance_: number;
  /** Blob 1 far distance threshold */
  _Blob_Far_Distance_: number;
  /** Blob 1 fade length */
  _Blob_Fade_Length_: number;
  /** Blob 1 pulse animation amount */
  _Blob_Pulse_: number;
  /** Blob 1 fade multiplier */
  _Blob_Fade_: number;
  /** Blob 1 texture map */
  _Blob_Texture_: WebGLTexture;
  
  // Blob 2 parameters
  /** Blob 2 position in world space */
  _Blob_Position_2_: Float32Array;
  /** Blob 2 size when near */
  _Blob_Near_Size_2_: number;
  /** Blob 2 pulse animation amount */
  _Blob_Pulse_2_: number;
  /** Blob 2 fade multiplier */
  _Blob_Fade_2_: number;
  
  // Hand tracking positions
  /** Left index finger position */
  _Left_Index_Pos_: Float32Array;
  /** Right index finger position */
  _Right_Index_Pos_: Float32Array;
  /** Left index-middle finger midpoint */
  _Left_Index_Middle_Pos_: Float32Array;
  /** Right index-middle finger midpoint */
  _Right_Index_Middle_Pos_: Float32Array;
  
  // Decal parameters
  /** Decal texture */
  _Decal_: WebGLTexture;
  /** Decal UV scale (X, Y) */
  _Decal_Scale_XY_: Float32Array;
  /** Only apply decal to front face */
  _Decal_Front_Only_: boolean;
  
  // Rim lighting
  /** Rim light intensity */
  _Rim_Intensity_: number;
  /** Rim light texture */
  _Rim_Texture_: WebGLTexture;
  /** Rim light hue shift */
  _Rim_Hue_Shift_: number;
  /** Rim light saturation shift */
  _Rim_Saturation_Shift_: number;
  /** Rim light value shift */
  _Rim_Value_Shift_: number;
  
  // Iridescence effect
  /** Iridescence intensity */
  _Iridescence_Intensity_: number;
  /** Iridescence lookup texture */
  _Iridescence_Texture_: WebGLTexture;
  
  // Global hand tracking flags
  /** Use global left index finger tracking */
  Use_Global_Left_Index: boolean;
  /** Use global right index finger tracking */
  Use_Global_Right_Index: boolean;
  
  // Global hand tracking positions
  /** Global left index fingertip position */
  Global_Left_Index_Tip_Position: Float32Array;
  /** Global right index fingertip position */
  Global_Right_Index_Tip_Position: Float32Array;
  /** Global left thumb tip position */
  Global_Left_Thumb_Tip_Position: Float32Array;
  /** Global right thumb tip position */
  Global_Right_Thumb_Tip_Position: Float32Array;
  /** Global left index proximity value */
  Global_Left_Index_Tip_Proximity: number;
  /** Global right index proximity value */
  Global_Right_Index_Tip_Proximity: number;
}

/**
 * Vertex attributes for the MRDL slider thumb mesh
 */
export interface MRDLSliderThumbAttributes {
  /** Vertex position in object space */
  position: Float32Array;
  /** Vertex normal in object space */
  normal: Float32Array;
  /** Texture coordinates */
  uv: Float32Array;
  /** Tangent vector (optional, controlled by TANGENT define) */
  tangent?: Float32Array;
}

/**
 * Varying outputs passed from vertex shader to fragment shader
 */
export interface MRDLSliderThumbVaryings {
  /** Position in world space */
  vPosition: Float32Array;
  /** Normal in world space */
  vNormal: Float32Array;
  /** Texture coordinates */
  vUV: Float32Array;
  /** Tangent vector in world space */
  vTangent: Float32Array;
  /** Binormal vector in world space */
  vBinormal: Float32Array;
  /** Vertex color (stores XYZ position components) */
  vColor: Float32Array;
  /** Extra data 1: (decal visibility, radial gradient, G color component, B color component) */
  vExtra1: Float32Array;
  /** Extra data 2: Blob 1 information (XY offset, distance, fade) */
  vExtra2: Float32Array;
  /** Extra data 3: Blob 2 information (XY offset, distance, fade) */
  vExtra3: Float32Array;
}

/**
 * Shader preprocessor defines that control shader features
 */
export interface MRDLSliderThumbDefines {
  /** Enable tangent attribute and calculations */
  TANGENT?: boolean;
  /** Enable blob proximity effect 1 */
  BLOB_ENABLE?: boolean;
  /** Enable blob proximity effect 2 */
  BLOB_ENABLE_2?: boolean;
}

/**
 * MRDL Slider Thumb Vertex Shader module
 * Provides the complete GLSL vertex shader code for rendering an interactive 3D slider thumb
 * with advanced effects including proximity blobs, beveled edges, gradient colors, and hand tracking integration
 */
export declare const mrdlSliderThumbVertexShader: {
  /** Shader identifier name */
  name: string;
  /** Complete GLSL vertex shader source code */
  shader: string;
};