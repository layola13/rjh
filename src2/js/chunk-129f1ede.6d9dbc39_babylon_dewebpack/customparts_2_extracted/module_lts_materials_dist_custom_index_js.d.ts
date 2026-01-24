/**
 * Custom materials module for Babylon.js
 * Provides extensible material classes that allow shader customization
 */

/**
 * Structure defining custom shader modifications
 * Used to organize and apply custom GLSL code to material shaders
 */
export interface CustomShaderStructure {
  /**
   * Custom vertex shader attributes
   */
  attributes?: string[];
  
  /**
   * Custom uniform declarations
   */
  uniforms?: string[];
  
  /**
   * Custom sampler declarations
   */
  samplers?: string[];
  
  /**
   * Custom varying declarations
   */
  varyings?: string[];
  
  /**
   * Custom vertex shader code fragments
   */
  vertex?: {
    /**
     * Code injected at the start of vertex shader
     */
    pre?: string;
    
    /**
     * Code injected at the end of vertex shader
     */
    post?: string;
    
    /**
     * Code replacing position computation
     */
    position?: string;
    
    /**
     * Code replacing normal computation
     */
    normal?: string;
  };
  
  /**
   * Custom fragment shader code fragments
   */
  fragment?: {
    /**
     * Code injected at the start of fragment shader
     */
    pre?: string;
    
    /**
     * Code injected at the end of fragment shader
     */
    post?: string;
    
    /**
     * Code modifying final color output
     */
    color?: string;
  };
}

/**
 * Special shader parts that can be customized
 * Defines injection points for custom GLSL code in standard materials
 */
export enum ShaderSpecialParts {
  /**
   * Vertex shader main function start
   */
  VertexStart = "CUSTOM_VERTEX_DEFINITIONS",
  
  /**
   * Before vertex position computation
   */
  VertexBeforePositionUpdated = "CUSTOM_VERTEX_UPDATE_POSITION",
  
  /**
   * After vertex position computation
   */
  VertexAfterWorldPosComputed = "CUSTOM_VERTEX_UPDATE_WORLDPOS",
  
  /**
   * Fragment shader main function start
   */
  FragmentStart = "CUSTOM_FRAGMENT_DEFINITIONS",
  
  /**
   * Before fragment color computation
   */
  FragmentBeforeFragColor = "CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR",
  
  /**
   * Main fragment color computation
   */
  FragmentMainColor = "CUSTOM_FRAGMENT_MAIN_COLOR",
  
  /**
   * Before final color output
   */
  FragmentBeforeFinalColorComposition = "CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION"
}

/**
 * Albedo-related shader parts for PBR materials
 * Defines injection points specific to PBR albedo calculations
 */
export enum ShaderAlebdoParts {
  /**
   * Albedo computation start
   */
  AlbedoStart = "CUSTOM_ALBEDO_START",
  
  /**
   * After base albedo calculation
   */
  AlbedoAfterBase = "CUSTOM_ALBEDO_AFTER_BASE",
  
  /**
   * Before albedo texture sampling
   */
  AlbedoBeforeTexture = "CUSTOM_ALBEDO_BEFORE_TEXTURE",
  
  /**
   * Final albedo value modification
   */
  AlbedoFinal = "CUSTOM_ALBEDO_FINAL"
}

/**
 * Custom material extending standard material with shader customization capabilities
 * Allows injection of custom GLSL code at predefined points in the shader
 */
export class CustomMaterial {
  /**
   * Creates a new custom material instance
   * @param name - Unique name for the material
   * @param scene - The scene the material belongs to
   */
  constructor(name: string, scene?: unknown);
  
  /**
   * Shader structure containing custom code fragments
   */
  customShaderStructure: CustomShaderStructure;
  
  /**
   * Adds custom shader code at a specific injection point
   * @param shaderPart - The shader part to customize
   * @param code - GLSL code to inject
   */
  addUniform(name: string, kind: string, value?: unknown): void;
  
  /**
   * Registers a custom attribute for the vertex shader
   * @param name - Attribute name
   */
  addAttribute(name: string): void;
  
  /**
   * Adds a texture sampler to the shader
   * @param name - Sampler name
   * @param texture - Texture to bind
   */
  addSampler(name: string, texture: unknown): void;
  
  /**
   * Injects custom GLSL code at a specific shader part
   * @param shaderPart - Target injection point
   * @param code - GLSL code fragment
   */
  fragment(shaderPart: ShaderSpecialParts, code: string): void;
  
  /**
   * Injects custom vertex shader code
   * @param shaderPart - Target injection point
   * @param code - GLSL code fragment
   */
  vertex(shaderPart: ShaderSpecialParts, code: string): void;
}

/**
 * Custom PBR material with shader customization support
 * Extends PBR material system with custom GLSL injection capabilities
 */
export class PBRCustomMaterial {
  /**
   * Creates a new custom PBR material instance
   * @param name - Unique name for the material
   * @param scene - The scene the material belongs to
   */
  constructor(name: string, scene?: unknown);
  
  /**
   * Shader structure containing custom code fragments
   */
  customShaderStructure: CustomShaderStructure;
  
  /**
   * Adds a custom uniform to the shader
   * @param name - Uniform name
   * @param kind - Data type (float, vec2, vec3, vec4, mat4, etc.)
   * @param value - Initial value
   */
  addUniform(name: string, kind: string, value?: unknown): void;
  
  /**
   * Registers a custom vertex attribute
   * @param name - Attribute name
   */
  addAttribute(name: string): void;
  
  /**
   * Adds a texture sampler
   * @param name - Sampler name
   * @param texture - Texture to bind
   */
  addSampler(name: string, texture: unknown): void;
  
  /**
   * Injects custom fragment shader code for albedo computation
   * @param shaderPart - Albedo shader injection point
   * @param code - GLSL code fragment
   */
  fragmentAlbedo(shaderPart: ShaderAlebdoParts, code: string): void;
  
  /**
   * Injects custom fragment shader code
   * @param shaderPart - Target injection point
   * @param code - GLSL code fragment
   */
  fragment(shaderPart: ShaderSpecialParts, code: string): void;
  
  /**
   * Injects custom vertex shader code
   * @param shaderPart - Target injection point
   * @param code - GLSL code fragment
   */
  vertex(shaderPart: ShaderSpecialParts, code: string): void;
}