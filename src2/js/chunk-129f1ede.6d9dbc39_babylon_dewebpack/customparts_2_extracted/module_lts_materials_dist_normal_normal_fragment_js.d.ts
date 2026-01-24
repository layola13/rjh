/**
 * Normal material pixel shader module
 * Provides GLSL fragment shader for rendering surface normals with optional lighting
 */

/**
 * Shader name identifier
 */
export const normalPixelShaderName: string;

/**
 * Normal pixel shader configuration object
 * Contains the GLSL fragment shader code for normal visualization
 */
export const normalPixelShader: {
  /**
   * Unique identifier for the shader
   */
  name: string;
  
  /**
   * GLSL fragment shader source code
   * 
   * Features:
   * - Normal visualization with configurable blending
   * - Optional diffuse texture sampling
   * - Multi-light support (up to 4 lights)
   * - Shadow mapping
   * - Fog effects
   * - Alpha testing
   * - Clip plane support
   * 
   * Uniforms:
   * - vEyePosition: Camera position in world space
   * - vDiffuseColor: Base diffuse color and alpha
   * - diffuseSampler: Optional diffuse texture
   * - vDiffuseInfos: Diffuse texture parameters
   * 
   * Varyings:
   * - vPositionW: Fragment position in world space
   * - vNormalW: Interpolated normal in world space (if NORMAL defined)
   * - vDiffuseUV: Diffuse texture coordinates (if DIFFUSE defined)
   * 
   * Preprocessor Directives:
   * - NORMAL: Enable normal visualization
   * - LIGHTING: Enable lighting calculations
   * - DIFFUSE: Enable diffuse texture sampling
   * - ALPHATEST: Enable alpha testing with 0.4 threshold
   */
  shader: string;
};

/**
 * Type definition for shader store object
 */
export interface ShaderObject {
  /**
   * Shader identifier
   */
  name: string;
  
  /**
   * GLSL shader source code
   */
  shader: string;
}

/**
 * Type guard to check if an object is a valid ShaderObject
 */
export function isShaderObject(obj: unknown): obj is ShaderObject;