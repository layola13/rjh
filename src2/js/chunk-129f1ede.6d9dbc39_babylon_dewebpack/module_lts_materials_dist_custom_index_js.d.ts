/**
 * Custom materials module for Babylon.js LTS
 * Provides custom shader material implementations for standard and PBR materials
 */

/**
 * Structure defining custom shader code injection points
 * Allows modification of vertex and fragment shaders at specific locations
 */
export interface CustomShaderStructure {
  /**
   * Custom code to inject into vertex shader
   */
  vertex?: string;
  
  /**
   * Custom code to inject into fragment shader
   */
  fragment?: string;
  
  /**
   * Shader uniforms definitions
   */
  uniforms?: string[];
  
  /**
   * Shader attributes definitions
   */
  attributes?: string[];
  
  /**
   * Shader varyings definitions
   */
  varyings?: string[];
  
  /**
   * Additional shader functions
   */
  functions?: string[];
}

/**
 * Enum-like structure defining special shader injection points
 * Used to specify where custom code should be inserted in the shader pipeline
 */
export interface ShaderSpecialParts {
  /**
   * Injection point before vertex shader main logic
   */
  readonly Vertex_Begin: string;
  
  /**
   * Injection point for vertex position modifications
   */
  readonly Vertex_Definitions: string;
  
  /**
   * Injection point before fragment shader main logic
   */
  readonly Fragment_Begin: string;
  
  /**
   * Injection point for fragment color modifications
   */
  readonly Fragment_Definitions: string;
  
  /**
   * Injection point for final color output
   */
  readonly Fragment_MainEnd: string;
}

/**
 * Enum-like structure defining albedo-related shader injection points for PBR materials
 * Specifies where custom albedo modifications can be injected
 */
export interface ShaderAlebdoParts {
  /**
   * Injection point for albedo color definition
   */
  readonly Albedo_Definition: string;
  
  /**
   * Injection point before albedo calculation
   */
  readonly Albedo_Before: string;
  
  /**
   * Injection point after albedo calculation
   */
  readonly Albedo_After: string;
}

/**
 * Custom material extending standard Babylon.js material with shader injection capabilities
 * Allows developers to inject custom GLSL code at specific points in the rendering pipeline
 */
export class CustomMaterial {
  /**
   * Creates a new custom material instance
   * @param name - Unique name for the material
   * @param scene - Scene to which the material belongs
   */
  constructor(name: string, scene?: unknown);
  
  /**
   * Custom shader structure defining code injection points
   */
  customShaderStructure: CustomShaderStructure | null;
  
  /**
   * Adds custom shader code at a specific injection point
   * @param shaderPart - Injection point identifier
   * @param code - GLSL code to inject
   */
  addShaderCode(shaderPart: string, code: string): void;
  
  /**
   * Adds a uniform variable to the shader
   * @param uniformName - Name of the uniform
   * @param uniformType - Type of the uniform (e.g., 'float', 'vec3')
   */
  addUniform(uniformName: string, uniformType: string): void;
  
  /**
   * Adds an attribute variable to the shader
   * @param attributeName - Name of the attribute
   */
  addAttribute(attributeName: string): void;
}

/**
 * PBR (Physically Based Rendering) custom material with shader injection capabilities
 * Extends PBR material to allow custom shader modifications while maintaining PBR workflow
 */
export class PBRCustomMaterial {
  /**
   * Creates a new PBR custom material instance
   * @param name - Unique name for the material
   * @param scene - Scene to which the material belongs
   */
  constructor(name: string, scene?: unknown);
  
  /**
   * Custom shader structure defining code injection points
   */
  customShaderStructure: CustomShaderStructure | null;
  
  /**
   * Adds custom shader code at a specific injection point
   * @param shaderPart - Injection point identifier (use ShaderAlebdoParts or ShaderSpecialParts)
   * @param code - GLSL code to inject
   */
  addShaderCode(shaderPart: string, code: string): void;
  
  /**
   * Adds a uniform variable to the shader
   * @param uniformName - Name of the uniform
   * @param uniformType - Type of the uniform (e.g., 'float', 'vec3', 'sampler2D')
   */
  addUniform(uniformName: string, uniformType: string): void;
  
  /**
   * Adds an attribute variable to the shader
   * @param attributeName - Name of the attribute
   */
  addAttribute(attributeName: string): void;
  
  /**
   * Fragments the shader for custom PBR workflow
   * @param shaderName - Name of the shader to fragment
   */
  fragmentShader(shaderName: string): void;
}