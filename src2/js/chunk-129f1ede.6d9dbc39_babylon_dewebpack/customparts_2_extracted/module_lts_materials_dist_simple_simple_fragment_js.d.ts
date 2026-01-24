/**
 * Simple shader pixel/fragment shader definition for Babylon.js materials system.
 * Provides basic lighting with diffuse color, texture support, and fog effects.
 */

/**
 * Name identifier for the simple pixel shader
 */
export const simplePixelShaderName: string;

/**
 * Simple pixel shader configuration object containing shader source code
 * and registration metadata.
 */
export const simplePixelShader: {
  /**
   * Unique name identifier for this shader in the shader store
   */
  name: string;

  /**
   * GLSL shader source code for the simple fragment/pixel shader.
   * 
   * Features:
   * - Basic diffuse lighting with support for multiple simultaneous lights
   * - Optional normal mapping and vertex colors
   * - Texture sampling with alpha testing
   * - Fog effects and clipping planes
   * - Shadow calculations
   * - Depth pre-pass support
   * 
   * Preprocessor directives:
   * - NORMAL: Enable normal-based lighting
   * - DIFFUSE: Enable diffuse texture sampling
   * - ALPHATEST: Enable alpha testing with 0.4 threshold
   * - VERTEXCOLOR: Enable vertex color modulation
   * - INSTANCESCOLOR: Enable instanced color attributes
   * - VERTEXALPHA: Enable vertex alpha blending
   * - SPECULARTERM: Enable specular lighting calculations
   * 
   * Uniforms:
   * - vEyePosition: Camera/eye position in world space
   * - vDiffuseColor: Base diffuse color and alpha
   * - diffuseSampler: Diffuse texture sampler (when DIFFUSE defined)
   * - vDiffuseInfos: Texture information (y component used as multiplier)
   * 
   * Varyings:
   * - vPositionW: Vertex position in world space
   * - vNormalW: Vertex normal in world space (when NORMAL defined)
   * - vColor: Vertex color (when VERTEXCOLOR/INSTANCESCOLOR defined)
   * - vDiffuseUV: Diffuse texture coordinates (when DIFFUSE defined)
   */
  shader: string;
};