/**
 * Marble procedural texture fragment shader declaration
 * Generates a marble-like pattern with configurable tiles and colors
 */

/**
 * Shader name identifier for the marble procedural texture pixel shader
 */
export declare const marbleProceduralTexturePixelShaderName: string;

/**
 * Uniform parameters for the marble procedural texture shader
 */
export interface MarbleProceduralTextureUniforms {
  /** Number of marble tiles in the vertical direction */
  numberOfTilesHeight: number;
  
  /** Number of marble tiles in the horizontal direction */
  numberOfTilesWidth: number;
  
  /** Amplitude of the turbulence effect applied to the marble pattern */
  amplitude: number;
  
  /** RGB color of the marble surface */
  marbleColor: [number, number, number];
  
  /** RGB color of the joints between marble tiles */
  jointColor: [number, number, number];
}

/**
 * Varying inputs from vertex shader
 */
export interface MarbleProceduralTextureVaryings {
  /** 2D position in world/local space */
  vPosition: [number, number];
  
  /** 2D texture coordinates (UV mapping) */
  vUV: [number, number];
}

/**
 * Marble procedural texture shader definition
 * Contains both the shader name and the GLSL source code
 */
export interface MarbleProceduralTextureShaderDefinition {
  /** Shader identifier name */
  name: string;
  
  /** GLSL fragment shader source code as string */
  shader: string;
}

/**
 * Complete marble procedural texture pixel shader export
 * Includes the shader source code and metadata for rendering marble patterns
 */
export declare const marbleProceduralTexturePixelShader: MarbleProceduralTextureShaderDefinition;

/**
 * GLSL Fragment Shader Functions (embedded in shader string):
 * 
 * @function rand - Pseudo-random number generator based on 2D coordinate
 * @param {vec2} n - Input 2D coordinate
 * @returns {float} Random value between 0 and 1
 * 
 * @function noise - 2D Perlin-like noise function using bilinear interpolation
 * @param {vec2} n - Input 2D coordinate
 * @returns {float} Smooth noise value
 * 
 * @function turbulence - Multi-octave turbulence using fractal noise
 * @param {vec2} P - Input 2D position
 * @returns {float} Turbulence value accumulated over 4 octaves
 * 
 * @function roundF - Rounds a float to nearest integer (preserving sign)
 * @param {float} number - Input number to round
 * @returns {float} Rounded value
 * 
 * @function marble_color - Generates marble color gradient based on input value
 * @param {float} x - Input value (typically from sine wave)
 * @returns {vec3} RGB color with marble-like appearance
 * 
 * @function main - Fragment shader entry point
 * Computes final marble tile color with joints and procedural marble pattern
 * Outputs to gl_FragColor
 */

/**
 * Shader constants (defined in GLSL code):
 * - tileSize: vec3(1.1, 1.0, 1.1) - Base size of each marble tile
 * - tilePct: vec3(0.98, 1.0, 0.98) - Percentage of tile occupied by marble (vs joint)
 */