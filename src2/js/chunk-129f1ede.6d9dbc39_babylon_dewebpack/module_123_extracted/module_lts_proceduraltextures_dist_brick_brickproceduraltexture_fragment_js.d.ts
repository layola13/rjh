/**
 * Brick procedural texture shader definition
 * Generates a brick wall pattern with configurable dimensions and colors
 */

/**
 * Uniform variables for the brick procedural texture shader
 */
export interface BrickProceduralTextureUniforms {
  /** Number of bricks in the vertical direction */
  numberOfBricksHeight: number;
  /** Number of bricks in the horizontal direction */
  numberOfBricksWidth: number;
  /** RGB color of the bricks */
  brickColor: [number, number, number];
  /** RGB color of the joints between bricks */
  jointColor: [number, number, number];
}

/**
 * Varying variables passed from vertex shader
 */
export interface BrickProceduralTextureVaryings {
  /** World position coordinates */
  vPosition: [number, number];
  /** UV texture coordinates */
  vUV: [number, number];
}

/**
 * Shader metadata
 */
export interface ShaderDefinition {
  /** Unique identifier for the shader */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Name identifier for the brick procedural texture pixel shader
 */
export declare const brickProceduralTexturePixelShaderName: "brickProceduralTexturePixelShader";

/**
 * Brick procedural texture fragment shader definition
 * 
 * This shader generates a realistic brick wall pattern with:
 * - Configurable brick dimensions
 * - Customizable brick and joint colors
 * - Procedural noise for texture variation
 * - Staggered brick layout (offset every other row)
 * - Realistic joint rendering with smooth transitions
 * 
 * @remarks
 * The shader uses Fractional Brownian Motion (FBM) for noise generation
 * and applies color variations to create a more realistic appearance.
 */
export declare const brickProceduralTexturePixelShader: ShaderDefinition;

/**
 * GLSL fragment shader source code
 * @internal
 */
export declare const brickProceduralTexturePixelShaderSource: string;