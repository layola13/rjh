import { PBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import { Effect } from '@babylonjs/core/Materials/effect';
import { Nullable } from '@babylonjs/core/types';
import { Matrix, Vector2, Vector3, Vector4 } from '@babylonjs/core/Maths/math.vector';
import { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import { Scene } from '@babylonjs/core/scene';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { SubMesh } from '@babylonjs/core/Meshes/subMesh';

/**
 * Defines the shader injection points for customizing PBR material shaders
 */
export interface IShaderAlbedoParts {
  /** Custom code injected at the beginning of the fragment shader */
  Fragment_Begin?: string;
  
  /** Custom uniform/varying definitions in the fragment shader */
  Fragment_Definitions?: string;
  
  /** Custom code at the beginning of the fragment main function */
  Fragment_MainBegin?: string;
  
  /** Custom albedo calculation (use 'result' variable) */
  Fragment_Custom_Albedo?: string;
  
  /** Custom alpha calculation (use 'result' variable) */
  Fragment_Custom_Alpha?: string;
  
  /** Custom code before lighting calculations */
  Fragment_Before_Lights?: string;
  
  /** Custom metallic/roughness calculation */
  Fragment_Custom_MetallicRoughness?: string;
  
  /** Custom microsurface calculation */
  Fragment_Custom_MicroSurface?: string;
  
  /** Custom code before fog application */
  Fragment_Before_Fog?: string;
  
  /** Custom code before final color composition */
  Fragment_Before_FinalColorComposition?: string;
  
  /** Custom code before fragment color output (use 'result' variable) */
  Fragment_Before_FragColor?: string;
  
  /** Custom code at the end of fragment main function */
  Fragment_MainEnd?: string;
  
  /** Custom code at the beginning of the vertex shader */
  Vertex_Begin?: string;
  
  /** Custom uniform/varying definitions in the vertex shader */
  Vertex_Definitions?: string;
  
  /** Custom code at the beginning of vertex main function */
  Vertex_MainBegin?: string;
  
  /** Custom position modification (use 'result' variable) */
  Vertex_Before_PositionUpdated?: string;
  
  /** Custom normal modification (use 'result' variable) */
  Vertex_Before_NormalUpdated?: string;
  
  /** Custom code after world position computation */
  Vertex_After_WorldPosComputed?: string;
  
  /** Custom code at the end of vertex main function */
  Vertex_MainEnd?: string;
}

/**
 * Storage for uniform instances added to the custom material
 */
interface IUniformInstances {
  [key: string]: Vector2 | Vector3 | Vector4 | Matrix | number;
}

/**
 * Storage for sampler (texture) instances added to the custom material
 */
interface ISamplerInstances {
  [key: string]: BaseTexture;
}

/**
 * Container class for shader customization parts
 */
export declare class ShaderAlebdoParts implements IShaderAlbedoParts {
  Fragment_Begin?: string;
  Fragment_Definitions?: string;
  Fragment_MainBegin?: string;
  Fragment_Custom_Albedo?: string;
  Fragment_Custom_Alpha?: string;
  Fragment_Before_Lights?: string;
  Fragment_Custom_MetallicRoughness?: string;
  Fragment_Custom_MicroSurface?: string;
  Fragment_Before_Fog?: string;
  Fragment_Before_FinalColorComposition?: string;
  Fragment_Before_FragColor?: string;
  Fragment_MainEnd?: string;
  Vertex_Begin?: string;
  Vertex_Definitions?: string;
  Vertex_MainBegin?: string;
  Vertex_Before_PositionUpdated?: string;
  Vertex_Before_NormalUpdated?: string;
  Vertex_After_WorldPosComputed?: string;
  Vertex_MainEnd?: string;
}

/**
 * Custom PBR Material allowing shader code injection at various points in the rendering pipeline.
 * Extends PBRMaterial to provide hooks for customizing vertex and fragment shaders.
 */
export declare class PBRCustomMaterial extends PBRMaterial {
  /**
   * Shader indexer counter for generating unique shader names
   */
  static ShaderIndexer: number;
  
  /**
   * Container for custom shader code parts
   */
  CustomParts: ShaderAlebdoParts;
  
  /**
   * The modified fragment (pixel) shader code
   */
  FragmentShader: string;
  
  /**
   * The modified vertex shader code
   */
  VertexShader: string;
  
  /**
   * Array of custom uniform declarations
   * @internal
   */
  private _customUniform?: string[];
  
  /**
   * Array of custom uniform names (without type prefix)
   * @internal
   */
  private _newUniforms?: string[];
  
  /**
   * Storage for custom uniform instance values
   * @internal
   */
  private _newUniformInstances?: IUniformInstances;
  
  /**
   * Storage for custom sampler (texture) instances
   * @internal
   */
  private _newSamplerInstances?: ISamplerInstances;
  
  /**
   * Array of custom vertex attribute names
   * @internal
   */
  private _customAttributes?: string[];
  
  /**
   * Flag indicating whether the custom shader has been created
   * @internal
   */
  private _isCreatedShader: boolean;
  
  /**
   * Name of the created custom shader
   * @internal
   */
  private _createdShaderName: string;
  
  /**
   * Creates a new PBRCustomMaterial instance
   * @param name - Name of the material
   * @param scene - The scene the material belongs to
   */
  constructor(name: string, scene: Scene);
  
  /**
   * Attaches custom uniforms and samplers to the effect after binding
   * @param mesh - The mesh being rendered
   * @param effect - The effect to attach uniforms to
   * @internal
   */
  AttachAfterBind(mesh: Nullable<Mesh>, effect: Effect): void;
  
  /**
   * Reviews and collects uniform or sampler names for shader compilation
   * @param uniformType - Type of uniform to review ('uniform' or 'sampler')
   * @param uniformList - List to append uniform names to
   * @returns Updated uniform list
   * @internal
   */
  ReviewUniform(uniformType: string, uniformList: string[]): string[];
  
  /**
   * Builds the custom shader by injecting custom code into PBR shader templates
   * @param shaderName - Base shader name
   * @param uniforms - Array of uniform names
   * @param uniformBuffers - Array of uniform buffer names
   * @param samplers - Array of sampler names
   * @param defines - Shader defines
   * @param attributes - Array of vertex attribute names
   * @param options - Additional shader options
   * @returns Name of the built custom shader
   * @internal
   */
  Builder(
    shaderName: string,
    uniforms: string[],
    uniformBuffers: string[],
    samplers: string[],
    defines: unknown,
    attributes?: string[],
    options?: unknown
  ): string;
  
  /**
   * Adds a custom uniform to the shader
   * @param name - Name of the uniform
   * @param type - GLSL type (e.g., 'float', 'vec2', 'vec3', 'vec4', 'mat4', 'sampler2D')
   * @param value - Initial value of the uniform (Vector2, Vector3, Vector4, Matrix, number, or BaseTexture)
   * @returns This material for method chaining
   */
  AddUniform(name: string, type: string, value?: unknown): PBRCustomMaterial;
  
  /**
   * Adds a custom vertex attribute to the shader
   * @param name - Name of the attribute
   * @returns This material for method chaining
   */
  AddAttribute(name: string): PBRCustomMaterial;
  
  /**
   * Sets custom code at the beginning of the fragment shader
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_Begin(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom uniform/varying definitions in the fragment shader
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_Definitions(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom code at the beginning of the fragment main function
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_MainBegin(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom albedo calculation code (variable 'result' will be renamed to 'surfaceAlbedo')
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_Custom_Albedo(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom alpha calculation code (variable 'result' will be renamed to 'alpha')
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_Custom_Alpha(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom code before lighting calculations
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_Before_Lights(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom metallic/roughness calculation code
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_Custom_MetallicRoughness(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom microsurface calculation code
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_Custom_MicroSurface(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom code before fog application
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_Before_Fog(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom code before final color composition
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_Before_FinalColorComposition(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom code before fragment color output (variable 'result' will be renamed to 'color')
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_Before_FragColor(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom code at the end of the fragment main function
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Fragment_MainEnd(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom code at the beginning of the vertex shader
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Vertex_Begin(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom uniform/varying definitions in the vertex shader
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Vertex_Definitions(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom code at the beginning of the vertex main function
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Vertex_MainBegin(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom position modification code (variable 'result' will be renamed to 'positionUpdated')
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Vertex_Before_PositionUpdated(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom normal modification code (variable 'result' will be renamed to 'normalUpdated')
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Vertex_Before_NormalUpdated(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom code after world position computation
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Vertex_After_WorldPosComputed(code: string): PBRCustomMaterial;
  
  /**
   * Sets custom code at the end of the vertex main function
   * @param code - GLSL code to inject
   * @returns This material for method chaining
   */
  Vertex_MainEnd(code: string): PBRCustomMaterial;
}