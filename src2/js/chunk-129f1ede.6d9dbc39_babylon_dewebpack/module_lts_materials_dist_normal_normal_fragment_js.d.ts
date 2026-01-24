/**
 * Normal material fragment shader for Babylon.js
 * Provides basic normal visualization and lighting support
 */

/**
 * Fragment shader source code for normal material rendering
 * 
 * Features:
 * - Normal vector visualization
 * - Diffuse texture support
 * - Dynamic lighting (up to 4 lights)
 * - Shadow mapping
 * - Fog effects
 * - Alpha testing
 * - Clip planes
 */
export declare const normalPixelShader: {
  /**
   * Shader identifier name
   */
  name: string;
  
  /**
   * GLSL fragment shader source code
   * 
   * Uniforms:
   * - vEyePosition: Camera position in world space
   * - vDiffuseColor: Material diffuse color and alpha
   * - diffuseSampler: Diffuse texture sampler (when DIFFUSE is defined)
   * - vDiffuseInfos: Diffuse texture info (offset, scale)
   * 
   * Varyings:
   * - vPositionW: Fragment position in world space
   * - vNormalW: Fragment normal in world space (when NORMAL is defined)
   * - vDiffuseUV: Diffuse texture coordinates (when DIFFUSE is defined)
   * 
   * Defines:
   * - NORMAL: Enable normal visualization
   * - LIGHTING: Enable dynamic lighting calculations
   * - DIFFUSE: Enable diffuse texture sampling
   * - ALPHATEST: Enable alpha testing with 0.4 threshold
   */
  shader: string;
};

/**
 * Shader name constant used for registration in ShaderStore
 */
declare const normalPixelShaderName: "normalPixelShader";