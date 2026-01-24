/**
 * Triplanar shader module for Babylon.js materials
 * Provides pixel shader implementation for triplanar texture mapping
 */

/**
 * Name identifier for the triplanar pixel shader
 */
export declare const triplanarPixelShaderName: string;

/**
 * Triplanar pixel shader configuration object
 */
export interface TriplanarShaderConfig {
  /**
   * Shader identifier name
   */
  name: string;
  
  /**
   * GLSL shader source code for triplanar pixel/fragment shader
   */
  shader: string;
}

/**
 * Triplanar pixel shader implementation
 * 
 * This shader performs triplanar texture mapping, which projects textures
 * onto geometry from three orthogonal directions (X, Y, Z) based on surface normals.
 * 
 * Features:
 * - Multi-light support (configurable max simultaneous lights)
 * - Diffuse texture sampling per axis (X, Y, Z)
 * - Optional normal/bump mapping per axis
 * - Specular term support
 * - Vertex color blending
 * - Alpha testing
 * - Fog effects
 * - Shadow mapping
 * - Clip plane support
 * 
 * @remarks
 * The shader blends textures based on squared normal weights to create
 * seamless texture transitions across different surface orientations.
 */
export declare const triplanarPixelShader: TriplanarShaderConfig;