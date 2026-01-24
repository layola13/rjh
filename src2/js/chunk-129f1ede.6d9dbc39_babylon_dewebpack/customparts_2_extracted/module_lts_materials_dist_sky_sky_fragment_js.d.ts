/**
 * Sky material pixel shader module
 * Implements atmospheric scattering based on Rayleigh and Mie scattering models
 */

/**
 * Name identifier for the sky pixel shader
 */
export const SKY_PIXEL_SHADER_NAME = "skyPixelShader";

/**
 * Sky pixel shader configuration object
 */
export interface SkyShaderConfig {
  /** Unique name identifier for the shader */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Complete GLSL source code for the sky pixel shader.
 * Implements realistic sky rendering with:
 * - Rayleigh scattering (molecular scattering for blue sky)
 * - Mie scattering (aerosol scattering for haze and sun disk)
 * - Atmospheric extinction
 * - Uncharted 2 tone mapping
 * - Dynamic sun position and intensity
 */
export const SKY_PIXEL_SHADER_SOURCE: string;

/**
 * Sky pixel shader export object containing name and shader source
 */
export const skyPixelShader: SkyShaderConfig;

/**
 * Type definitions for shader uniforms used in sky rendering
 */
export interface SkyShaderUniforms {
  /** Camera world position */
  cameraPosition: [number, number, number];
  
  /** Camera offset for parallax effects */
  cameraOffset: [number, number, number];
  
  /** Up direction vector (typically [0, 1, 0]) */
  up: [number, number, number];
  
  /** Luminance intensity multiplier (default: 1.0) */
  luminance: number;
  
  /** Atmospheric turbidity factor (haziness, range: 1-10) */
  turbidity: number;
  
  /** Rayleigh scattering coefficient (molecular scattering) */
  rayleigh: number;
  
  /** Mie scattering coefficient (aerosol scattering) */
  mieCoefficient: number;
  
  /** Mie scattering directional anisotropy factor (range: -1 to 1) */
  mieDirectionalG: number;
  
  /** Sun position in world space */
  sunPosition: [number, number, number];
}

/**
 * Shader constants used in atmospheric scattering calculations
 */
export interface AtmosphericConstants {
  /** Mathematical constant e (Euler's number) */
  readonly E: 2.71828182845904523536028747135266249775724709369995957;
  
  /** Mathematical constant π (pi) */
  readonly PI: 3.141592653589793238462643383279502884197169;
  
  /** Refractive index of air */
  readonly REFRACTIVE_INDEX: 1.0003;
  
  /** Molecular number density (molecules per m³) */
  readonly MOLECULAR_DENSITY: 2.545e25;
  
  /** Depolarization factor for standard air */
  readonly DEPOLARIZATION_FACTOR: 0.035;
  
  /** Wavelengths for RGB channels in meters [red, green, blue] */
  readonly WAVELENGTHS: [680e-9, 550e-9, 450e-9];
  
  /** Mie scattering wavelength dependence coefficients */
  readonly MIE_K_COEFFICIENTS: [0.686, 0.678, 0.666];
  
  /** Rayleigh scale height in meters */
  readonly RAYLEIGH_ZENITH_LENGTH: 8400;
  
  /** Mie scale height in meters */
  readonly MIE_ZENITH_LENGTH: 1250;
  
  /** Sun intensity multiplier */
  readonly SUN_INTENSITY_FACTOR: 1000;
  
  /** Cosine of sun angular diameter (approximately 0.53 degrees) */
  readonly SUN_ANGULAR_DIAMETER_COS: 0.999956676946448443553574619906976478926848692873900859324;
  
  /** Cutoff angle for sun intensity fade */
  readonly CUTOFF_ANGLE: number; // PI / 1.95
  
  /** Steepness of sun intensity fade curve */
  readonly STEEPNESS: 1.5;
}

/**
 * Uncharted 2 tone mapping operator parameters
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

/**
 * Shader varying inputs from vertex shader
 */
export interface SkyShaderVaryings {
  /** Interpolated world position */
  vPositionW: [number, number, number];
  
  /** Optional vertex color (requires VERTEXCOLOR define) */
  vColor?: [number, number, number, number];
}

/**
 * Shader feature flags (preprocessor defines)
 */
export interface SkyShaderDefines {
  /** Enable vertex color modulation */
  VERTEXCOLOR?: boolean;
  
  /** Enable vertex alpha */
  VERTEXALPHA?: boolean;
  
  /** Enable dithering for color banding reduction */
  DITHER?: boolean;
  
  /** Enable fog rendering */
  FOG?: boolean;
  
  /** Enable clipping planes */
  CLIPPLANE?: boolean;
  
  /** Enable instancing with colors */
  INSTANCESCOLOR?: boolean;
  
  /** Enable instancing */
  INSTANCES?: boolean;
}