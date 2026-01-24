/**
 * Sky material shader definitions for Babylon.js
 * Provides atmospheric scattering and sky rendering capabilities
 */

/**
 * Name identifier for the sky pixel shader
 */
export const SKY_SHADER_NAME = "skyPixelShader";

/**
 * Configuration object for sky shader registration
 */
export interface SkyShaderConfig {
  /** The shader name identifier */
  name: string;
  /** The GLSL shader source code */
  shader: string;
}

/**
 * GLSL source code for the sky pixel shader
 * Implements atmospheric scattering based on Rayleigh and Mie scattering theory
 */
export const SKY_PIXEL_SHADER_SOURCE: string;

/**
 * Registered sky shader configuration
 * Contains the shader name and source code registered in the shader store
 */
export const skyPixelShader: SkyShaderConfig;

/**
 * Type definition for shader store registry
 */
export interface ShaderStore {
  /** Map of shader names to shader source code */
  ShadersStore: Record<string, string>;
}

/**
 * Shader uniform inputs for sky rendering
 */
export interface SkyShaderUniforms {
  /** Camera world position */
  cameraPosition: [number, number, number];
  
  /** Camera position offset */
  cameraOffset: [number, number, number];
  
  /** Up vector for sky orientation */
  up: [number, number, number];
  
  /** Luminance intensity factor */
  luminance: number;
  
  /** Atmospheric turbidity (haziness) */
  turbidity: number;
  
  /** Rayleigh scattering coefficient */
  rayleigh: number;
  
  /** Mie scattering coefficient */
  mieCoefficient: number;
  
  /** Mie scattering directional factor (anisotropy) */
  mieDirectionalG: number;
  
  /** Sun position in world space */
  sunPosition: [number, number, number];
}

/**
 * Shader varying inputs from vertex shader
 */
export interface SkyShaderVaryings {
  /** Interpolated world position */
  vPositionW: [number, number, number];
  
  /** Vertex color (if VERTEXCOLOR is defined) */
  vColor?: [number, number, number, number];
}

/**
 * Physical constants used in atmospheric scattering calculations
 */
export interface AtmosphericConstants {
  /** Euler's number */
  readonly E: 2.71828182845904523536028747135266249775724709369995957;
  
  /** Pi constant */
  readonly PI: 3.141592653589793238462643383279502884197169;
  
  /** Refractive index of air */
  readonly REFRACTIVE_INDEX: 1.0003;
  
  /** Molecular density */
  readonly MOLECULAR_DENSITY: 2.545e25;
  
  /** Depolarization factor */
  readonly DEPOLARIZATION_FACTOR: 0.035;
  
  /** Wavelengths for RGB channels (in meters) */
  readonly LAMBDA: readonly [680e-9, 550e-9, 450e-9];
  
  /** Mie scattering K coefficients for RGB */
  readonly MIE_K: readonly [0.686, 0.678, 0.666];
  
  /** Mie scattering exponent */
  readonly MIE_V: 4.0;
  
  /** Rayleigh scattering zenith length */
  readonly RAYLEIGH_ZENITH_LENGTH: 8400;
  
  /** Mie scattering zenith length */
  readonly MIE_ZENITH_LENGTH: 1250;
  
  /** Sun intensity constant */
  readonly SUN_INTENSITY_FACTOR: 1000.0;
  
  /** Sun angular diameter cosine */
  readonly SUN_ANGULAR_DIAMETER_COS: 0.999956676946448443553574619906976478926848692873900859324;
  
  /** Cutoff angle for sun intensity */
  readonly CUTOFF_ANGLE: number; // PI / 1.95
  
  /** Steepness factor for sun intensity falloff */
  readonly STEEPNESS: 1.5;
}

/**
 * Uncharted 2 tone mapping parameters
 */
export interface TonemapParameters {
  /** Shoulder strength */
  readonly A: 0.15;
  
  /** Linear strength */
  readonly B: 0.50;
  
  /** Linear angle */
  readonly C: 0.10;
  
  /** Toe strength */
  readonly D: 0.20;
  
  /** Toe numerator */
  readonly E: 0.02;
  
  /** Toe denominator */
  readonly F: 0.30;
  
  /** Linear white point value */
  readonly W: 1000.0;
}