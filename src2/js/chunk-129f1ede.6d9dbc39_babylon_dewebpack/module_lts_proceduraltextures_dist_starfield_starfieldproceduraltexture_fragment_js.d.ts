/**
 * Starfield procedural texture pixel shader declaration
 * Generates a starfield effect with volumetric rendering
 */

/**
 * Shader uniforms interface
 */
export interface StarfieldShaderUniforms {
  /** Animation time parameter */
  time: number;
  /** Rotation angle around X axis */
  alpha: number;
  /** Rotation angle around Y axis */
  beta: number;
  /** Camera zoom level */
  zoom: number;
  /** Formula parameter for fractal iteration */
  formuparam: number;
  /** Step size for volumetric ray marching */
  stepsize: number;
  /** Tiling factor for space repetition */
  tile: number;
  /** Overall brightness multiplier */
  brightness: number;
  /** Dark matter density effect */
  darkmatter: number;
  /** Distance fading factor */
  distfading: number;
  /** Color saturation level */
  saturation: number;
}

/**
 * Shader varyings interface
 */
export interface StarfieldShaderVaryings {
  /** Screen position in clip space */
  vPosition: [number, number];
  /** UV coordinates */
  vUV: [number, number];
}

/**
 * Starfield procedural texture pixel shader name constant
 */
export declare const starfieldProceduralTexturePixelShaderName: "starfieldProceduralTexturePixelShader";

/**
 * Starfield procedural texture pixel shader configuration
 */
export interface StarfieldShaderConfig {
  /** Shader identifier name */
  name: typeof starfieldProceduralTexturePixelShaderName;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Starfield procedural texture pixel shader
 * 
 * Renders a volumetric starfield using ray marching with fractal iterations.
 * 
 * Features:
 * - 20 volumetric steps for depth
 * - 15 fractal iterations per step
 * - Configurable rotation, zoom, and visual parameters
 * - Dark matter effect simulation
 * - Distance-based fading
 * 
 * @remarks
 * The shader uses high precision floating point calculations and performs
 * volumetric ray marching to create a realistic 3D starfield effect.
 */
export declare const starfieldProceduralTexturePixelShader: StarfieldShaderConfig;

/**
 * Volume marching steps constant
 */
declare const STARFIELD_VOL_STEPS: 20;

/**
 * Fractal iterations per step constant
 */
declare const STARFIELD_ITERATIONS: 15;