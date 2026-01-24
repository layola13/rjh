/**
 * Normal material vertex shader module
 * Defines the vertex shader used for rendering normal maps and basic material properties
 */

/**
 * Name identifier for the normal vertex shader
 */
export const normalVertexShaderName: string;

/**
 * Normal vertex shader configuration object
 */
export interface NormalVertexShaderConfig {
  /** Unique identifier name for the shader */
  name: string;
  /** The compiled GLSL shader source code */
  shader: string;
}

/**
 * The complete vertex shader for normal material rendering.
 * Handles position transformation, normal calculations, UV mapping, and lighting setup.
 * 
 * Supported features (via preprocessor directives):
 * - NORMAL: Normal vector attributes for lighting calculations
 * - UV1/UV2: Texture coordinate support (primary and secondary)
 * - VERTEXCOLOR: Per-vertex color attributes
 * - DIFFUSE: Diffuse texture mapping with matrix transformation
 * - POINTSIZE: Custom point size for point rendering
 * - Skinning (bones) and vertex animation support
 * - Instancing for efficient batch rendering
 * - Fog and clipping plane effects
 * - Shadow mapping for multiple simultaneous lights
 * 
 * @remarks
 * This shader is automatically registered in Babylon.js ShaderStore upon import.
 * The shader source includes placeholder includes (e.g., `#include<bonesDeclaration>`)
 * that are resolved by Babylon.js shader processor at runtime.
 */
export const normalVertexShader: NormalVertexShaderConfig;

/**
 * The raw GLSL shader source code string.
 * Contains the complete vertex shader implementation with:
 * - Attribute declarations (position, normal, uv, color)
 * - Uniform declarations (matrices, texture info, point size)
 * - Varying outputs (position, normal, UV coordinates)
 * - Main function with vertex transformation pipeline
 */
export const normalVertexShaderSource: string;