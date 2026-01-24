/**
 * MRDL Slider Thumb Pixel Shader Module
 * 
 * Mixed Reality Design Language (MRDL) shader for rendering slider thumb components
 * in 3D GUI environments. Supports advanced features including:
 * - Blob interactions and proximity effects
 * - Finger occlusion detection
 * - Physical-based lighting (PBR) with Fresnel reflections
 * - Environmental reflections and indirect lighting
 * - Rim lighting and iridescence effects
 * - HSV color manipulation
 * - Decal overlays
 * 
 * @module @babylonjs/gui/3D/materials/mrdl/shaders/mrdlSliderThumb.fragment
 */

declare module '@babylonjs/gui/3D/materials/mrdl/shaders/mrdlSliderThumb.fragment' {
  /**
   * Shader store entry containing the GLSL pixel shader source code
   */
  export interface ShaderStoreEntry {
    /** Unique identifier for the shader in the shader store */
    name: string;
    /** Compiled GLSL fragment shader source code */
    shader: string;
  }

  /**
   * The unique name identifier for the MRDL slider thumb pixel shader
   * Used for shader registration and lookup in Babylon.js shader store
   */
  export const mrdlSliderThumbPixelShader: ShaderStoreEntry;

  /**
   * Uniform variables passed to the shader from the CPU
   */
  export interface MRDLSliderThumbUniforms {
    /** Camera world position (vec3) */
    cameraPosition: [number, number, number];

    // Geometry parameters
    /** Corner radius of the slider thumb */
    _Radius_: number;
    /** Front bevel depth */
    _Bevel_Front_: number;
    /** Front bevel stretch factor */
    _Bevel_Front_Stretch_: number;
    /** Back bevel depth */
    _Bevel_Back_: number;
    /** Back bevel stretch factor */
    _Bevel_Back_Stretch_: number;
    /** Top-left corner radius */
    _Radius_Top_Left_: number;
    /** Top-right corner radius */
    _Radius_Top_Right_: number;
    /** Bottom-left corner radius */
    _Radius_Bottom_Left_: number;
    /** Bottom-right corner radius */
    _Radius_Bottom_Right_: number;

    // Bulge effect parameters
    /** Enable/disable bulge deformation effect */
    _Bulge_Enabled_: boolean;
    /** Height of the bulge effect */
    _Bulge_Height_: number;
    /** Radius of influence for bulge effect */
    _Bulge_Radius_: number;

    // Lighting parameters
    /** Directional light intensity */
    _Sun_Intensity_: number;
    /** Sun azimuth angle (0-1 range maps to 0-2π) */
    _Sun_Theta_: number;
    /** Sun elevation angle (0-1 range maps to 0-π) */
    _Sun_Phi_: number;
    /** Indirect diffuse lighting contribution */
    _Indirect_Diffuse_: number;

    // Material properties
    /** Base color/albedo (RGBA) */
    _Albedo_: [number, number, number, number];
    /** Specular reflection intensity */
    _Specular_: number;
    /** Specular shininess exponent */
    _Shininess_: number;
    /** Specular highlight sharpness (0=soft, 1=sharp) */
    _Sharpness_: number;
    /** Subsurface scattering intensity */
    _Subsurface_: number;

    // Gradient colors
    /** Left side gradient color (RGBA) */
    _Left_Color_: [number, number, number, number];
    /** Right side gradient color (RGBA) */
    _Right_Color_: [number, number, number, number];

    // Reflection parameters
    /** Overall reflection intensity */
    _Reflection_: number;
    /** Fresnel reflection at front-facing angles */
    _Front_Reflect_: number;
    /** Fresnel reflection at grazing angles */
    _Edge_Reflect_: number;
    /** Fresnel falloff power */
    _Power_: number;

    // Environment colors
    /** Sky color for procedural environment (RGBA) */
    _Sky_Color_: [number, number, number, number];
    /** Horizon color for procedural environment (RGBA) */
    _Horizon_Color_: [number, number, number, number];
    /** Ground color for procedural environment (RGBA) */
    _Ground_Color_: [number, number, number, number];
    /** Horizon gradient falloff power */
    _Horizon_Power_: number;

    // Texture samplers
    /** Reflection environment map (sampler2D) */
    _Reflection_Map_: WebGLTexture;
    /** Indirect diffuse environment map (sampler2D) */
    _Indirect_Environment_: WebGLTexture;

    // Finger occlusion parameters
    /** Width of occlusion shadow */
    _Width_: number;
    /** Shadow edge fuzziness */
    _Fuzz_: number;
    /** Minimum shadow fuzziness */
    _Min_Fuzz_: number;
    /** Fade distance for shadow clipping */
    _Clip_Fade_: number;

    // Color adjustment (HSV)
    /** Hue shift amount (-1 to 1) */
    _Hue_Shift_: number;
    /** Saturation shift amount */
    _Saturation_Shift_: number;
    /** Value/brightness shift amount */
    _Value_Shift_: number;

    // Blob interaction - Primary blob
    /** Primary blob world position (vec3) */
    _Blob_Position_: [number, number, number];
    /** Blob color/glow intensity */
    _Blob_Intensity_: number;
    /** Blob size when near */
    _Blob_Near_Size_: number;
    /** Blob size when far */
    _Blob_Far_Size_: number;
    /** Distance threshold for 'near' state */
    _Blob_Near_Distance_: number;
    /** Distance threshold for 'far' state */
    _Blob_Far_Distance_: number;
    /** Fade transition length */
    _Blob_Fade_Length_: number;
    /** Blob pulse animation phase */
    _Blob_Pulse_: number;
    /** Blob fade-out amount */
    _Blob_Fade_: number;
    /** Blob texture gradient (sampler2D) */
    _Blob_Texture_: WebGLTexture;

    // Blob interaction - Secondary blob
    /** Secondary blob world position (vec3) */
    _Blob_Position_2_: [number, number, number];
    /** Secondary blob size when near */
    _Blob_Near_Size_2_: number;
    /** Secondary blob pulse animation phase */
    _Blob_Pulse_2_: number;
    /** Secondary blob fade-out amount */
    _Blob_Fade_2_: number;

    // Hand tracking positions
    /** Left hand index finger tip position (vec3) */
    _Left_Index_Pos_: [number, number, number];
    /** Right hand index finger tip position (vec3) */
    _Right_Index_Pos_: [number, number, number];
    /** Left hand index middle joint position (vec3) */
    _Left_Index_Middle_Pos_: [number, number, number];
    /** Right hand index middle joint position (vec3) */
    _Right_Index_Middle_Pos_: [number, number, number];

    // Decal overlay
    /** Decal texture (sampler2D) */
    _Decal_: WebGLTexture;
    /** Decal UV scale (vec2) */
    _Decal_Scale_XY_: [number, number];
    /** Render decal only on front faces */
    _Decal_Front_Only_: boolean;

    // Rim lighting effect
    /** Rim light intensity */
    _Rim_Intensity_: number;
    /** Rim light lookup texture (sampler2D) */
    _Rim_Texture_: WebGLTexture;
    /** Rim light hue shift */
    _Rim_Hue_Shift_: number;
    /** Rim light saturation shift */
    _Rim_Saturation_Shift_: number;
    /** Rim light value shift */
    _Rim_Value_Shift_: number;

    // Iridescence effect
    /** Iridescence effect intensity */
    _Iridescence_Intensity_: number;
    /** Iridescence color lookup texture (sampler2D) */
    _Iridescence_Texture_: WebGLTexture;

    // Global hand tracking (alternative to local positions)
    /** Use global left index finger position */
    Use_Global_Left_Index: boolean;
    /** Use global right index finger position */
    Use_Global_Right_Index: boolean;
    /** Global left index finger tip position (vec4) */
    Global_Left_Index_Tip_Position: [number, number, number, number];
    /** Global right index finger tip position (vec4) */
    Global_Right_Index_Tip_Position: [number, number, number, number];
    /** Global left thumb tip position (vec4) */
    Global_Left_Thumb_Tip_Position: [number, number, number, number];
    /** Global right thumb tip position (vec4) */
    Global_Right_Thumb_Tip_Position: [number, number, number, number];
    /** Global left index middle joint position (vec4) */
    Global_Left_Index_Middle_Position: [number, number, number, number];
    /** Global right index middle joint position (vec4) */
    Global_Right_Index_Middle_Position: [number, number, number, number];
    /** Proximity value for left index finger (0-1) */
    Global_Left_Index_Tip_Proximity: number;
    /** Proximity value for right index finger (0-1) */
    Global_Right_Index_Tip_Proximity: number;
  }

  /**
   * Varying attributes interpolated from vertex shader
   */
  export interface MRDLSliderThumbVaryings {
    /** World-space fragment position (vec3) */
    vPosition: [number, number, number];
    /** World-space normal vector (vec3) */
    vNormal: [number, number, number];
    /** Texture UV coordinates (vec2) */
    vUV: [number, number];
    /** World-space tangent vector (vec3) */
    vTangent: [number, number, number];
    /** World-space binormal vector (vec3) */
    vBinormal: [number, number, number];
    /** Vertex color (RGBA) */
    vColor: [number, number, number, number];
    /** Extra data channel 1 (vec4) - stores decal opacity, bulge params, etc. */
    vExtra1: [number, number, number, number];
    /** Extra data channel 2 (vec4) - stores primary blob info */
    vExtra2: [number, number, number, number];
    /** Extra data channel 3 (vec4) - stores secondary blob info */
    vExtra3: [number, number, number, number];
  }

  /**
   * Shader preprocessor defines for feature toggling
   */
  export interface MRDLSliderThumbDefines {
    /** Enable blob proximity effects */
    BLOB_ENABLE?: boolean;
    /** Enable finger occlusion shadows */
    OCCLUSION_ENABLED?: boolean;
    /** Enable environment map reflections */
    ENV_ENABLE?: boolean;
    /** Enable procedural sky environment */
    SKY_ENABLED?: boolean;
    /** Enable decal overlay */
    DECAL_ENABLE?: boolean;
    /** Enable iridescence effect */
    IRIDESCENCE_ENABLED?: boolean;
  }

  /**
   * Output fragment color (gl_FragColor)
   * Final RGBA color written to the framebuffer
   */
  export interface FragmentOutput {
    /** Red channel (0-1) */
    r: number;
    /** Green channel (0-1) */
    g: number;
    /** Blue channel (0-1) */
    b: number;
    /** Alpha channel (always 1.0 for opaque rendering) */
    a: number;
  }
}

/**
 * Re-export for convenience
 */
declare module '@babylonjs/core/Engines/shaderStore' {
  interface ShaderStore {
    /**
     * Collection of registered shader source code strings
     * The mrdlSliderThumbPixelShader is registered here at module load
     */
    ShadersStore: Record<string, string>;
  }
}