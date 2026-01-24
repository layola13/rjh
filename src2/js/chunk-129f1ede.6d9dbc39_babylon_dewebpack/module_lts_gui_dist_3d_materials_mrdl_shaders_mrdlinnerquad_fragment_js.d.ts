/**
 * MRDL Inner Quad pixel shader for rendering rounded rectangles with glow effects.
 * Used in Mixed Reality Design Language (MRDL) materials for GUI rendering.
 * @module mrdlInnerquadPixelShader
 */

/**
 * Shader name identifier
 */
export const shaderName: string;

/**
 * GLSL shader source code for MRDL inner quad fragment shader.
 * 
 * **Uniforms:**
 * - `cameraPosition: vec3` - Camera position in world space
 * - `_Color_: vec4` - Base color of the quad (RGBA)
 * - `_Radius_: float` - Corner radius for rounded rectangle
 * - `_Fixed_Radius_: bool` - Whether radius is fixed or adaptive
 * - `_Filter_Width_: float` - Anti-aliasing filter width
 * - `_Glow_Fraction_: float` - Fraction of the distance field for glow effect
 * - `_Glow_Max_: float` - Maximum glow intensity
 * - `_Glow_Falloff_: float` - Glow falloff exponent
 * 
 * **Varyings:**
 * - `vUV: vec2` - UV coordinates
 * - `vTangent: vec3` - Tangent space vector (x=sizeX, y=radius, z=sizeZ)
 * 
 * **Features:**
 * - Rounded rectangle rendering with smooth anti-aliasing
 * - Configurable glow effect with falloff control
 * - Distance field-based edge detection
 */
export const shaderSource: string;

/**
 * Shader registration object containing name and source.
 * Automatically registers the shader in Babylon.js ShaderStore.
 */
export interface MrdlInnerquadShader {
  /** Shader identifier name */
  name: string;
  /** Complete GLSL fragment shader source code */
  shader: string;
}

/**
 * The exported shader module containing both name and registered shader source.
 * This object is registered in Babylon.js's ShaderStore for runtime access.
 */
export const mrdlInnerquadPixelShader: MrdlInnerquadShader;