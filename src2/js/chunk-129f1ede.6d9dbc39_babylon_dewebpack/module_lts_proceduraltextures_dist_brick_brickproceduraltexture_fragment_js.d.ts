/**
 * Brick procedural texture fragment shader declaration
 * Used for generating procedural brick textures in Babylon.js
 */

/**
 * The name identifier for the brick procedural texture pixel shader
 */
export declare const brickProceduralTexturePixelShaderName: string;

/**
 * Shader configuration object containing name and shader source code
 */
export interface ShaderConfig {
  /** The unique name/identifier of the shader */
  name: string;
  /** The GLSL shader source code string */
  shader: string;
}

/**
 * Brick procedural texture pixel shader configuration
 * 
 * This shader generates a procedural brick wall texture with the following features:
 * - Configurable brick dimensions via numberOfBricksHeight and numberOfBricksWidth uniforms
 * - Customizable brick and joint colors
 * - Procedural noise and randomization for realistic brick appearance
 * - Automatic offset for alternating brick rows
 * - Joint rendering with smooth color transitions
 * 
 * @remarks
 * The shader is automatically registered in Babylon.js ShaderStore upon import
 */
export declare const brickProceduralTexturePixelShader: ShaderConfig;

/**
 * GLSL Fragment Shader Uniforms:
 * - numberOfBricksHeight: float - Number of bricks vertically
 * - numberOfBricksWidth: float - Number of bricks horizontally  
 * - brickColor: vec3 - RGB color of the bricks
 * - jointColor: vec3 - RGB color of the mortar joints
 * 
 * Varyings:
 * - vPosition: vec2 - Position in world space
 * - vUV: vec2 - Texture coordinates
 */