/**
 * Simple pixel shader module for Babylon.js materials system
 * Provides basic diffuse lighting with optional normal mapping and fog effects
 */

/**
 * Shader name identifier used for registration in the shader store
 */
export const simplePixelShaderName: string;

/**
 * Shader metadata object containing the shader name and source code
 */
export interface SimplePixelShaderMetadata {
  /**
   * Unique identifier for this shader in the shader store
   */
  name: string;

  /**
   * GLSL fragment shader source code
   * 
   * Features:
   * - High precision floating point calculations
   * - Diffuse color and lighting
   * - Optional normal mapping (#ifdef NORMAL)
   * - Optional vertex colors (#ifdef VERTEXCOLOR)
   * - Optional diffuse texture sampling (#ifdef DIFFUSE)
   * - Alpha testing support (#ifdef ALPHATEST)
   * - Multiple simultaneous lights support
   * - Shadow calculations
   * - Fog effects
   * - Clip plane support
   * - Specular term support (#ifdef SPECULARTERM)
   * - Vertex alpha blending (#ifdef VERTEXALPHA)
   * - Instance color support (#ifdef INSTANCESCOLOR)
   */
  shader: string;
}

/**
 * Simple pixel shader for basic material rendering
 * 
 * This shader provides fundamental rendering capabilities including:
 * - Diffuse color and texture mapping
 * - Normal-based lighting calculations
 * - Multi-light support with shadows
 * - Vertex color blending
 * - Alpha testing and blending
 * - Atmospheric fog effects
 * - Clipping planes
 * 
 * The shader is automatically registered in Babylon.js ShaderStore upon import
 * 
 * @remarks
 * This is a compiled shader module from the Babylon.js LTS materials package.
 * The shader source includes preprocessor directives for conditional feature compilation.
 * 
 * @example
 *