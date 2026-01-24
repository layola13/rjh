/**
 * Cell shading pixel shader module for Babylon.js materials
 * Provides toon/cel-shaded rendering with customizable brightness levels
 */

/**
 * Shader name identifier
 */
export const cellPixelShaderName: string;

/**
 * Cell shading pixel shader definition
 * Implements cartoon-style rendering with discrete brightness levels
 */
export const cellPixelShader: {
  /**
   * Unique name of the shader
   */
  name: string;
  
  /**
   * GLSL shader source code
   * Supports:
   * - Basic cell shading (CELLBASIC): 2-level brightness
   * - Advanced cell shading: 5-level brightness with configurable thresholds
   * - Diffuse texture mapping
   * - Vertex colors
   * - Multiple simultaneous lights
   * - Shadows
   * - Fog effects
   * - Alpha testing
   * - Normal mapping
   */
  shader: string;
};

/**
 * Lighting information structure used in shader calculations
 */
interface LightingInfo {
  /**
   * Diffuse light contribution
   */
  diffuse: vec3;
  
  /**
   * Normalized dot product of normal and light direction (N·L)
   * Used for determining brightness level thresholds
   */
  ndl: number;
}

/**
 * Compute custom diffuse lighting with cell shading effect
 * @param info - Lighting information containing diffuse color and N·L value
 * @param diffuseBase - Base diffuse color to be modified
 * @param shadow - Shadow attenuation factor (0.0 = full shadow, 1.0 = no shadow)
 * @returns Final diffuse color with cel shading applied, clamped to minimum 0.2
 */
declare function computeCustomDiffuseLighting(
  info: LightingInfo,
  diffuseBase: vec3,
  shadow: number
): vec3;

/**
 * GLSL vector types
 */
type vec2 = [number, number];
type vec3 = [number, number, number];
type vec4 = [number, number, number, number];

/**
 * Shader uniforms
 */
interface CellShaderUniforms {
  /** Camera/eye position in world space */
  vEyePosition: vec4;
  
  /** Diffuse material color with alpha */
  vDiffuseColor: vec4;
  
  /** Diffuse texture sampler (if DIFFUSE defined) */
  diffuseSampler?: WebGLTexture;
  
  /** Diffuse texture tiling/offset info (if DIFFUSE defined) */
  vDiffuseInfos?: vec2;
}

/**
 * Shader varyings (interpolated from vertex shader)
 */
interface CellShaderVaryings {
  /** World space position */
  vPositionW: vec3;
  
  /** World space normal (if NORMAL defined) */
  vNormalW?: vec3;
  
  /** Vertex color (if VERTEXCOLOR defined) */
  vColor?: vec4;
  
  /** Diffuse UV coordinates (if DIFFUSE defined) */
  vDiffuseUV?: vec2;
}

/**
 * Shader preprocessor defines
 */
interface CellShaderDefines {
  /** Enable normal mapping */
  NORMAL?: boolean;
  
  /** Enable vertex colors */
  VERTEXCOLOR?: boolean;
  
  /** Enable diffuse texture */
  DIFFUSE?: boolean;
  
  /** Enable alpha testing (discard fragments with alpha < 0.4) */
  ALPHATEST?: boolean;
  
  /** Enable vertex alpha blending */
  VERTEXALPHA?: boolean;
  
  /** Enable instance colors */
  INSTANCESCOLOR?: boolean;
  
  /** Enable instancing */
  INSTANCES?: boolean;
  
  /** Use basic 2-level cell shading instead of 5-level */
  CELLBASIC?: boolean;
  
  /** Enable specular term calculation */
  SPECULARTERM?: boolean;
  
  /** Maximum number of simultaneous lights */
  maxSimultaneousLights?: number;
}