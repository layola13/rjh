/**
 * Gradient shader module for Babylon.js materials system.
 * Provides pixel shader implementation for gradient material effects.
 * 
 * @module GradientShader
 * @packageDocumentation
 */

/**
 * Represents a shader object containing name and source code.
 * 
 * @interface IShaderObject
 */
export interface IShaderObject {
  /**
   * Unique identifier for the shader.
   */
  name: string;

  /**
   * GLSL shader source code as string.
   */
  shader: string;
}

/**
 * The registered name identifier for the gradient pixel shader.
 * Used as a key in the shader store registry.
 * 
 * @constant
 */
export const GRADIENT_PIXEL_SHADER_NAME: string;

/**
 * Complete gradient pixel shader implementation.
 * 
 * This shader creates smooth gradient effects between top and bottom colors
 * with support for:
 * - Configurable offset and scale transformations
 * - Smoothness control for gradient transitions
 * - Normal mapping and vertex colors
 * - Multiple simultaneous light sources
 * - Alpha testing and blending
 * - Fog and shadow effects
 * - Clip planes
 * 
 * @remarks
 * Shader uniforms:
 * - `vEyePosition`: Camera position in world space (vec4)
 * - `topColor`: Color at the top of the gradient (vec4)
 * - `bottomColor`: Color at the bottom of the gradient (vec4)
 * - `offset`: Vertical offset for gradient positioning (float)
 * - `scale`: Scale factor for gradient distribution (float)
 * - `smoothness`: Controls gradient transition smoothness (float, clamped 0.01-10.0)
 * 
 * Shader varyings:
 * - `vPositionW`: Vertex position in world space (vec3)
 * - `vPosition`: Vertex position in local/object space (vec3)
 * - `vNormalW`: Normal vector in world space (vec3, conditional on NORMAL define)
 * - `vColor`: Vertex color (vec4, conditional on VERTEXCOLOR define)
 * 
 * Preprocessor defines:
 * - `NORMAL`: Enables normal-based lighting calculations
 * - `VERTEXCOLOR`: Enables per-vertex color modulation
 * - `ALPHATEST`: Enables alpha testing with 0.4 threshold
 * - `EMISSIVE`: Switches between emissive and non-emissive lighting mode
 * - `VERTEXALPHA`: Enables vertex alpha blending
 * - `INSTANCESCOLOR`: Enables instanced color support
 * 
 * @constant
 */
export const gradientPixelShader: IShaderObject;

/**
 * Registers the gradient pixel shader in the global shader store.
 * This declaration represents the side effect of shader registration
 * that occurs when the module is imported.
 * 
 * @internal
 */
declare function registerShader(): void;

/**
 * Type definition for shader source string.
 * Contains raw GLSL code with embedded preprocessor directives.
 * 
 * @internal
 */
type ShaderSource = string;

/**
 * Babylon.js shader store interface.
 * Central registry for all shader programs in the engine.
 * 
 * @internal
 */
interface IShaderStore {
  /**
   * Dictionary mapping shader names to their source code.
   */
  [shaderName: string]: string;
}