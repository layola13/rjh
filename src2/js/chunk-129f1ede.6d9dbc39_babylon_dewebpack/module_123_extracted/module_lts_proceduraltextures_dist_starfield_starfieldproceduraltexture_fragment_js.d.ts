/**
 * Starfield procedural texture fragment shader module
 * Generates a dynamic starfield effect with customizable parameters
 */

/**
 * Shader uniform parameters interface
 */
export interface StarfieldShaderUniforms {
  /** Time value for animation (typically incremented each frame) */
  time: number;
  /** Rotation angle alpha for camera orientation */
  alpha: number;
  /** Rotation angle beta for camera orientation */
  beta: number;
  /** Zoom level of the starfield view */
  zoom: number;
  /** Formula parameter affecting star field deformation */
  formuparam: number;
  /** Step size for ray marching iteration */
  stepsize: number;
  /** Tiling factor for repeating pattern */
  tile: number;
  /** Overall brightness multiplier */
  brightness: number;
  /** Dark matter density effect strength */
  darkmatter: number;
  /** Distance fading factor for depth effect */
  distfading: number;
  /** Color saturation level (0-1 range) */
  saturation: number;
}

/**
 * Shader varying inputs from vertex shader
 */
export interface StarfieldShaderVaryings {
  /** 2D position in screen space */
  vPosition: [number, number];
  /** UV coordinates for texture sampling */
  vUV: [number, number];
}

/**
 * Starfield shader configuration constants
 */
export const STARFIELD_SHADER_CONSTANTS = {
  /** Number of volumetric ray marching steps */
  VOLUME_STEPS: 20,
  /** Number of iterations for fractal calculation */
  ITERATIONS: 15,
} as const;

/**
 * The unique identifier for the starfield procedural texture pixel shader
 */
export const starfieldProceduralTextureShaderName: string = "starfieldProceduralTexturePixelShader";

/**
 * GLSL fragment shader source code for starfield procedural texture
 * 
 * Features:
 * - Volumetric ray marching with configurable steps
 * - Fractal-based star generation
 * - Dark matter effects
 * - Distance-based fading
 * - Rotation matrices for camera control
 * - Saturation and brightness adjustments
 */
export const starfieldProceduralTexturePixelShader: string;

/**
 * Shader metadata object containing name and shader source
 */
export interface ShaderDefinition {
  /** Shader identifier name */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Complete shader definition for starfield procedural texture
 * Automatically registered in Babylon.js ShaderStore
 */
declare const starfieldShaderDefinition: ShaderDefinition;

export default starfieldProceduralTexturePixelShader;