/**
 * Custom shader structure for defining shader code injections
 */
export interface CustomShaderStructure {
  /** Custom code injected at the beginning of the fragment shader */
  Fragment_Begin?: string;
  /** Custom fragment shader definitions (uniforms, functions, etc.) */
  Fragment_Definitions?: string;
  /** Custom code injected at the beginning of the fragment main function */
  Fragment_MainBegin?: string;
  /** Custom code injected at the end of the fragment main function */
  Fragment_MainEnd?: string;
  /** Custom diffuse color computation */
  Fragment_Custom_Diffuse?: string;
  /** Custom alpha value computation */
  Fragment_Custom_Alpha?: string;
  /** Custom code injected before lighting calculations */
  Fragment_Before_Lights?: string;
  /** Custom code injected before fog calculations */
  Fragment_Before_Fog?: string;
  /** Custom code injected before final fragment color assignment */
  Fragment_Before_FragColor?: string;
  
  /** Custom code injected at the beginning of the vertex shader */
  Vertex_Begin?: string;
  /** Custom vertex shader definitions (uniforms, attributes, functions, etc.) */
  Vertex_Definitions?: string;
  /** Custom code injected at the beginning of the vertex main function */
  Vertex_MainBegin?: string;
  /** Custom code injected before position update */
  Vertex_Before_PositionUpdated?: string;
  /** Custom code injected before normal update */
  Vertex_Before_NormalUpdated?: string;
  /** Custom code injected after world position computation */
  Vertex_After_WorldPosComputed?: string;
  /** Custom code injected at the end of the vertex main function */
  Vertex_MainEnd?: string;
}

/**
 * Shader special parts container (alias for CustomShaderStructure)
 */
export type ShaderSpecialParts = CustomShaderStructure;

/**
 * Type definition for uniform instances (vectors, matrices, floats)
 */
type UniformInstance = Vector2 | Vector3 | Vector4 | Matrix | number;

/**
 * Type definition for sampler instances (textures)
 */
interface SamplerInstance {
  isReady?: () => boolean;
  [key: string]: unknown;
}

/**
 * Custom material extending StandardMaterial with shader customization capabilities
 */
export declare class CustomMaterial extends StandardMaterial {
  /** Static counter for generating unique shader names */
  static ShaderIndexer: number;
  
  /** Container for custom shader code parts */
  CustomParts: CustomShaderStructure;
  
  /** Fragment (pixel) shader source code */
  FragmentShader: string;
  
  /** Vertex shader source code */
  VertexShader: string;
  
  /** Shader name resolver function */
  customShaderNameResolve: (
    shaderName: string,
    uniforms: string[],
    uniformBuffers: string[],
    samplers: string[],
    defines: string[],
    attributes?: string[]
  ) => string;
  
  /** Custom uniform declarations */
  private _customUniform?: string[];
  
  /** Custom uniform names */
  private _newUniforms?: string[];
  
  /** Custom sampler instances mapping */
  private _newSamplerInstances?: Record<string, SamplerInstance>;
  
  /** Custom uniform value instances mapping */
  private _newUniformInstances?: Record<string, UniformInstance>;
  
  /** Custom vertex attributes */
  private _customAttributes?: string[];
  
  /** Flag indicating if shader has been created */
  private _isCreatedShader: boolean;
  
  /** Name of the created shader */
  private _createdShaderName?: string;
  
  /**
   * Creates a new CustomMaterial instance
   * @param name - The name of the material
   * @param scene - The scene the material belongs to
   */
  constructor(name: string, scene: Scene);
  
  /**
   * Attaches custom uniforms and samplers after material binding
   * @param mesh - The mesh being rendered
   * @param effect - The effect (shader program) to bind uniforms to
   */
  AttachAfterBind(mesh: Mesh, effect: Effect): void;
  
  /**
   * Reviews and collects uniform or sampler names
   * @param uniformType - Type of uniform to review ("uniform" or "sampler")
   * @param list - Array to populate with uniform names
   * @returns Updated list of uniform names
   */
  ReviewUniform(uniformType: "uniform" | "sampler", list: string[]): string[];
  
  /**
   * Builds the custom shader by injecting custom code into base shaders
   * @param shaderName - Base shader name
   * @param uniforms - Array of uniform names
   * @param uniformBuffers - Array of uniform buffer names
   * @param samplers - Array of sampler names
   * @param defines - Array of shader defines
   * @param attributes - Optional array of vertex attributes
   * @returns Generated shader name
   */
  Builder(
    shaderName: string,
    uniforms: string[],
    uniformBuffers: string[],
    samplers: string[],
    defines: string[],
    attributes?: string[]
  ): string;
  
  /**
   * Adds a custom uniform to the shader
   * @param uniformName - Name of the uniform variable
   * @param uniformType - GLSL type (e.g., "vec2", "vec3", "vec4", "mat4", "float", "sampler2D")
   * @param value - Optional initial value for the uniform
   * @returns The material instance for chaining
   */
  AddUniform(uniformName: string, uniformType: string, value?: unknown): this;
  
  /**
   * Adds a custom vertex attribute
   * @param attributeName - Name of the attribute variable
   * @returns The material instance for chaining
   */
  AddAttribute(attributeName: string): this;
  
  /**
   * Sets custom code for the beginning of the fragment shader
   * @param code - GLSL code to inject
   * @returns The material instance for chaining
   */
  Fragment_Begin(code: string): this;
  
  /**
   * Sets custom definitions for the fragment shader
   * @param code - GLSL code to inject
   * @returns The material instance for chaining
   */
  Fragment_Definitions(code: string): this;
  
  /**
   * Sets custom code for the beginning of fragment main function
   * @param code - GLSL code to inject
   * @returns The material instance for chaining
   */
  Fragment_MainBegin(code: string): this;
  
  /**
   * Sets custom code for the end of fragment main function
   * @param code - GLSL code to inject
   * @returns The material instance for chaining
   */
  Fragment_MainEnd(code: string): this;
  
  /**
   * Sets custom diffuse color computation
   * @param code - GLSL code where "result" variable represents diffuseColor
   * @returns The material instance for chaining
   */
  Fragment_Custom_Diffuse(code: string): this;
  
  /**
   * Sets custom alpha value computation
   * @param code - GLSL code where "result" variable represents alpha
   * @returns The material instance for chaining
   */
  Fragment_Custom_Alpha(code: string): this;
  
  /**
   * Sets custom code before lighting calculations
   * @param code - GLSL code to inject
   * @returns The material instance for chaining
   */
  Fragment_Before_Lights(code: string): this;
  
  /**
   * Sets custom code before fog calculations
   * @param code - GLSL code to inject
   * @returns The material instance for chaining
   */
  Fragment_Before_Fog(code: string): this;
  
  /**
   * Sets custom code before final fragment color assignment
   * @param code - GLSL code where "result" variable represents color
   * @returns The material instance for chaining
   */
  Fragment_Before_FragColor(code: string): this;
  
  /**
   * Sets custom code for the beginning of the vertex shader
   * @param code - GLSL code to inject
   * @returns The material instance for chaining
   */
  Vertex_Begin(code: string): this;
  
  /**
   * Sets custom definitions for the vertex shader
   * @param code - GLSL code to inject
   * @returns The material instance for chaining
   */
  Vertex_Definitions(code: string): this;
  
  /**
   * Sets custom code for the beginning of vertex main function
   * @param code - GLSL code to inject
   * @returns The material instance for chaining
   */
  Vertex_MainBegin(code: string): this;
  
  /**
   * Sets custom code before position update
   * @param code - GLSL code where "result" variable represents positionUpdated
   * @returns The material instance for chaining
   */
  Vertex_Before_PositionUpdated(code: string): this;
  
  /**
   * Sets custom code before normal update
   * @param code - GLSL code where "result" variable represents normalUpdated
   * @returns The material instance for chaining
   */
  Vertex_Before_NormalUpdated(code: string): this;
  
  /**
   * Sets custom code after world position computation
   * @param code - GLSL code to inject
   * @returns The material instance for chaining
   */
  Vertex_After_WorldPosComputed(code: string): this;
  
  /**
   * Sets custom code for the end of vertex main function
   * @param code - GLSL code to inject
   * @returns The material instance for chaining
   */
  Vertex_MainEnd(code: string): this;
}