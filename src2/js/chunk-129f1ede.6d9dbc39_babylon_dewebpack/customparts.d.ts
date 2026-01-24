/**
 * Custom shader material system for Babylon.js
 * Allows injecting custom shader code into standard material pipeline
 * @module CustomMaterial
 */

import { StandardMaterial } from "core/Materials/standardMaterial";
import { Effect } from "core/Materials/effect";
import { Mesh } from "core/Meshes/mesh";
import { Scene } from "core/scene";
import { Nullable } from "core/types";
import { Matrix, Vector2, Vector3, Vector4 } from "core/Maths/math.vector";
import { BaseTexture } from "core/Materials/Textures/baseTexture";

/**
 * Defines the structure for custom shader code injection points
 */
export interface CustomShaderStructure {
  /** Custom code at the beginning of vertex shader */
  Vertex_Begin?: string;
  /** Custom vertex shader definitions (uniforms, varyings, functions) */
  Vertex_Definitions?: string;
  /** Custom code at the beginning of vertex main function */
  Vertex_MainBegin?: string;
  /** Custom code before position is updated in vertex shader */
  Vertex_Before_PositionUpdated?: string;
  /** Custom code before normal is updated in vertex shader */
  Vertex_Before_NormalUpdated?: string;
  /** Custom code after world position is computed in vertex shader */
  Vertex_After_WorldPosComputed?: string;
  /** Custom code at the end of vertex main function */
  Vertex_MainEnd?: string;

  /** Custom code at the beginning of fragment shader */
  Fragment_Begin?: string;
  /** Custom fragment shader definitions (uniforms, varyings, functions) */
  Fragment_Definitions?: string;
  /** Custom code at the beginning of fragment main function */
  Fragment_MainBegin?: string;
  /** Custom code to modify diffuse color in fragment shader */
  Fragment_Custom_Diffuse?: string;
  /** Custom code to modify alpha value in fragment shader */
  Fragment_Custom_Alpha?: string;
  /** Custom code before lighting calculations in fragment shader */
  Fragment_Before_Lights?: string;
  /** Custom code before fog calculations in fragment shader */
  Fragment_Before_Fog?: string;
  /** Custom code before final fragment color output */
  Fragment_Before_FragColor?: string;
  /** Custom code at the end of fragment main function */
  Fragment_MainEnd?: string;
}

/**
 * Type alias for shader special parts structure
 * @deprecated Use CustomShaderStructure instead
 */
export type ShaderSpecialParts = CustomShaderStructure;

/**
 * Uniform type identifier for custom uniforms
 */
export type UniformType = "float" | "vec2" | "vec3" | "vec4" | "mat4" | "sampler2D";

/**
 * Uniform value types supported by the custom material system
 */
export type UniformValue = number | Vector2 | Vector3 | Vector4 | Matrix | BaseTexture;

/**
 * Custom material class extending StandardMaterial with shader injection capabilities
 * Allows developers to inject custom GLSL code at specific points in the shader pipeline
 * @extends StandardMaterial
 */
export declare class CustomMaterial extends StandardMaterial {
  /**
   * Global shader indexer for generating unique shader names
   * @internal
   */
  static ShaderIndexer: number;

  /**
   * Structure containing custom shader code for various injection points
   */
  CustomParts: CustomShaderStructure;

  /**
   * Vertex shader source code template
   */
  VertexShader: string;

  /**
   * Fragment shader source code template
   */
  FragmentShader: string;

  /**
   * Shader name resolver function
   * @internal
   */
  customShaderNameResolve: (
    shaderName: string,
    uniforms: string[],
    uniformBuffers: string[],
    samplers: string[],
    defines: string[],
    attributes?: string[]
  ) => string;

  /**
   * Array of custom uniform declarations
   * @internal
   */
  private _customUniform?: string[];

  /**
   * Array of custom uniform names
   * @internal
   */
  private _newUniforms?: string[];

  /**
   * Map of custom sampler instances
   * @internal
   */
  private _newSamplerInstances?: Record<string, BaseTexture>;

  /**
   * Map of custom uniform value instances
   * @internal
   */
  private _newUniformInstances?: Record<string, UniformValue>;

  /**
   * Array of custom vertex attribute names
   * @internal
   */
  private _customAttributes?: string[];

  /**
   * Flag indicating if custom shader has been created
   * @internal
   */
  private _isCreatedShader: boolean;

  /**
   * Name of the created custom shader
   * @internal
   */
  private _createdShaderName: string;

  /**
   * Creates a new CustomMaterial instance
   * @param name - The name of the material
   * @param scene - The scene the material belongs to
   */
  constructor(name: string, scene: Scene);

  /**
   * Attaches custom uniforms and samplers after material binding
   * Called automatically during material binding phase
   * @param mesh - The mesh being rendered
   * @param effect - The shader effect instance
   * @internal
   */
  AttachAfterBind(mesh: Nullable<Mesh>, effect: Effect): void;

  /**
   * Reviews and collects uniform or sampler names for shader compilation
   * @param uniformType - Type of uniform to review ("uniform" or "sampler")
   * @param uniformList - List to append uniform names to
   * @returns Updated uniform list
   * @internal
   */
  ReviewUniform(uniformType: "uniform" | "sampler", uniformList: string[]): string[];

  /**
   * Builds the custom shader by injecting custom code into shader templates
   * Generates unique shader name and registers shaders in Effect.ShadersStore
   * @param shaderName - Base shader name
   * @param uniforms - Array of uniform names
   * @param uniformBuffers - Array of uniform buffer names
   * @param samplers - Array of sampler names
   * @param defines - Array of shader defines
   * @param attributes - Optional array of vertex attribute names
   * @returns Generated custom shader name
   * @internal
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
   * @param uniformType - Type of the uniform (float, vec2, vec3, vec4, mat4, sampler2D)
   * @param uniformValue - Optional initial value for the uniform
   * @returns This material instance for method chaining
   */
  AddUniform(uniformName: string, uniformType: UniformType, uniformValue?: UniformValue): this;

  /**
   * Adds a custom vertex attribute to the shader
   * @param attributeName - Name of the vertex attribute
   * @returns This material instance for method chaining
   */
  AddAttribute(attributeName: string): this;

  /**
   * Sets custom code at the beginning of the fragment shader
   * @param shaderCode - GLSL code to inject
   * @returns This material instance for method chaining
   */
  Fragment_Begin(shaderCode: string): this;

  /**
   * Sets custom definitions (uniforms, varyings, functions) for the fragment shader
   * @param shaderCode - GLSL code to inject
   * @returns This material instance for method chaining
   */
  Fragment_Definitions(shaderCode: string): this;

  /**
   * Sets custom code at the beginning of fragment main function
   * @param shaderCode - GLSL code to inject
   * @returns This material instance for method chaining
   */
  Fragment_MainBegin(shaderCode: string): this;

  /**
   * Sets custom code at the end of fragment main function
   * @param shaderCode - GLSL code to inject
   * @returns This material instance for method chaining
   */
  Fragment_MainEnd(shaderCode: string): this;

  /**
   * Sets custom code to modify diffuse color in fragment shader
   * Use "result" variable to modify the diffuse color
   * @param shaderCode - GLSL code to inject (use "result" for diffuseColor)
   * @returns This material instance for method chaining
   */
  Fragment_Custom_Diffuse(shaderCode: string): this;

  /**
   * Sets custom code to modify alpha value in fragment shader
   * Use "result" variable to modify the alpha value
   * @param shaderCode - GLSL code to inject (use "result" for alpha)
   * @returns This material instance for method chaining
   */
  Fragment_Custom_Alpha(shaderCode: string): this;

  /**
   * Sets custom code before lighting calculations in fragment shader
   * @param shaderCode - GLSL code to inject
   * @returns This material instance for method chaining
   */
  Fragment_Before_Lights(shaderCode: string): this;

  /**
   * Sets custom code before fog calculations in fragment shader
   * @param shaderCode - GLSL code to inject
   * @returns This material instance for method chaining
   */
  Fragment_Before_Fog(shaderCode: string): this;

  /**
   * Sets custom code before final fragment color output
   * Use "result" variable to modify the final color
   * @param shaderCode - GLSL code to inject (use "result" for color)
   * @returns This material instance for method chaining
   */
  Fragment_Before_FragColor(shaderCode: string): this;

  /**
   * Sets custom code at the beginning of the vertex shader
   * @param shaderCode - GLSL code to inject
   * @returns This material instance for method chaining
   */
  Vertex_Begin(shaderCode: string): this;

  /**
   * Sets custom definitions (uniforms, varyings, functions) for the vertex shader
   * @param shaderCode - GLSL code to inject
   * @returns This material instance for method chaining
   */
  Vertex_Definitions(shaderCode: string): this;

  /**
   * Sets custom code at the beginning of vertex main function
   * @param shaderCode - GLSL code to inject
   * @returns This material instance for method chaining
   */
  Vertex_MainBegin(shaderCode: string): this;

  /**
   * Sets custom code before position is updated in vertex shader
   * Use "result" variable to modify the position
   * @param shaderCode - GLSL code to inject (use "result" for positionUpdated)
   * @returns This material instance for method chaining
   */
  Vertex_Before_PositionUpdated(shaderCode: string): this;

  /**
   * Sets custom code before normal is updated in vertex shader
   * Use "result" variable to modify the normal
   * @param shaderCode - GLSL code to inject (use "result" for normalUpdated)
   * @returns This material instance for method chaining
   */
  Vertex_Before_NormalUpdated(shaderCode: string): this;

  /**
   * Sets custom code after world position is computed in vertex shader
   * @param shaderCode - GLSL code to inject
   * @returns This material instance for method chaining
   */
  Vertex_After_WorldPosComputed(shaderCode: string): this;

  /**
   * Sets custom code at the end of vertex main function
   * @param shaderCode - GLSL code to inject
   * @returns This material instance for method chaining
   */
  Vertex_MainEnd(shaderCode: string): this;
}