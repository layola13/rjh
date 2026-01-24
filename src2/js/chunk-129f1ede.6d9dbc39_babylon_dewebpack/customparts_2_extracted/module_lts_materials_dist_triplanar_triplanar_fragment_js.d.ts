/**
 * Triplanar shader module for Babylon.js materials system.
 * Provides fragment shader implementation for triplanar texture mapping.
 * 
 * @module TriplanarFragmentShader
 * @see {@link https://doc.babylonjs.com/features/featuresDeepDive/materials/shaders/triPlanarMapping}
 */

/**
 * Name identifier for the triplanar pixel shader.
 * Used for shader registration and lookup in the shader store.
 */
export declare const TRIPLANAR_PIXEL_SHADER_NAME = "triplanarPixelShader";

/**
 * Triplanar fragment shader source code.
 * 
 * This shader implements triplanar texture mapping, which projects textures
 * onto geometry from three orthogonal directions (X, Y, Z) and blends them
 * based on surface normals. This technique is commonly used for terrain and
 * organic surfaces where traditional UV mapping is difficult.
 * 
 * Features:
 * - Support for separate diffuse textures per axis (X, Y, Z)
 * - Optional normal mapping per axis
 * - Specular lighting with configurable glossiness
 * - Multiple simultaneous light support
 * - Vertex color blending
 * - Alpha testing
 * - Fog integration
 * - Shadow mapping
 * - Clip plane support
 * 
 * @remarks
 * The shader blends three texture samples based on the absolute values of
 * the world-space normal, ensuring seamless transitions between projections.
 */
export declare const triplanarPixelShader: string;

/**
 * Shader registration object containing metadata and source.
 * This is automatically registered in Babylon.js ShaderStore.
 */
export interface TriplanarShaderDefinition {
  /**
   * Unique identifier for the shader in the shader store.
   */
  name: typeof TRIPLANAR_PIXEL_SHADER_NAME;
  
  /**
   * GLSL fragment shader source code.
   */
  shader: string;
}

/**
 * Complete shader definition including name and source code.
 * Registered in the global ShaderStore for runtime access.
 */
export declare const triplanarShaderDefinition: TriplanarShaderDefinition;