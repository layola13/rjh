import { PBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import { Effect } from '@babylonjs/core/Materials/effect';
import { Nullable } from '@babylonjs/core/types';
import { Scene } from '@babylonjs/core/scene';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Matrix, Vector2, Vector3, Vector4 } from '@babylonjs/core/Maths/math.vector';
import { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';

/**
 * Defines the shader parts that can be customized in PBRCustomMaterial
 * 定义可在 PBRCustomMaterial 中自定义的着色器部分
 */
export interface ShaderAlbedoParts {
  /** Fragment shader begin section - 片段着色器开始部分 */
  Fragment_Begin?: string;
  /** Fragment shader definitions section - 片段着色器定义部分 */
  Fragment_Definitions?: string;
  /** Fragment shader main begin section - 片段着色器主函数开始部分 */
  Fragment_MainBegin?: string;
  /** Custom albedo color calculation - 自定义反照率颜色计算 */
  Fragment_Custom_Albedo?: string;
  /** Custom alpha value calculation - 自定义透明度值计算 */
  Fragment_Custom_Alpha?: string;
  /** Code executed before lighting calculations - 光照计算前执行的代码 */
  Fragment_Before_Lights?: string;
  /** Custom metallic and roughness calculation - 自定义金属度和粗糙度计算 */
  Fragment_Custom_MetallicRoughness?: string;
  /** Custom micro surface calculation - 自定义微表面计算 */
  Fragment_Custom_MicroSurface?: string;
  /** Code executed before fog application - 应用雾效前执行的代码 */
  Fragment_Before_Fog?: string;
  /** Code executed before final color composition - 最终颜色合成前执行的代码 */
  Fragment_Before_FinalColorComposition?: string;
  /** Code executed before final fragment color - 最终片段颜色前执行的代码 */
  Fragment_Before_FragColor?: string;
  /** Fragment shader main end section - 片段着色器主函数结束部分 */
  Fragment_MainEnd?: string;

  /** Vertex shader begin section - 顶点着色器开始部分 */
  Vertex_Begin?: string;
  /** Vertex shader definitions section - 顶点着色器定义部分 */
  Vertex_Definitions?: string;
  /** Vertex shader main begin section - 顶点着色器主函数开始部分 */
  Vertex_MainBegin?: string;
  /** Code executed before position update - 位置更新前执行的代码 */
  Vertex_Before_PositionUpdated?: string;
  /** Code executed before normal update - 法线更新前执行的代码 */
  Vertex_Before_NormalUpdated?: string;
  /** Code executed after world position computation - 世界位置计算后执行的代码 */
  Vertex_After_WorldPosComputed?: string;
  /** Vertex shader main end section - 顶点着色器主函数结束部分 */
  Vertex_MainEnd?: string;
}

/**
 * Type for uniform values that can be set in custom materials
 * 可在自定义材质中设置的 uniform 值类型
 */
export type UniformValue = Vector2 | Vector3 | Vector4 | Matrix | number;

/**
 * Type for sampler instances (textures)
 * 采样器实例（纹理）类型
 */
export type SamplerInstance = BaseTexture;

/**
 * Custom PBR Material that allows shader code injection at various points
 * 允许在各个节点注入着色器代码的自定义 PBR 材质
 * @extends PBRMaterial
 */
export declare class PBRCustomMaterial extends PBRMaterial {
  /**
   * Static counter for generating unique shader names
   * 用于生成唯一着色器名称的静态计数器
   */
  static ShaderIndexer: number;

  /**
   * Custom shader parts container
   * 自定义着色器部分容器
   */
  CustomParts: ShaderAlbedoParts;

  /**
   * Fragment shader source code
   * 片段着色器源代码
   */
  FragmentShader: string;

  /**
   * Vertex shader source code
   * 顶点着色器源代码
   */
  VertexShader: string;

  /**
   * Custom shader name resolver function
   * 自定义着色器名称解析函数
   */
  customShaderNameResolve: (
    shaderName: string,
    uniforms: string[],
    uniformBuffers: string[],
    samplers: string[],
    defines: string[],
    attributes?: string[],
    options?: unknown
  ) => string;

  /**
   * Array of custom uniform declarations
   * 自定义 uniform 声明数组
   * @internal
   */
  private _customUniform?: string[];

  /**
   * Array of custom uniform names
   * 自定义 uniform 名称数组
   * @internal
   */
  private _newUniforms?: string[];

  /**
   * Map of custom sampler instances
   * 自定义采样器实例映射
   * @internal
   */
  private _newSamplerInstances?: Record<string, SamplerInstance>;

  /**
   * Map of custom uniform instances
   * 自定义 uniform 实例映射
   * @internal
   */
  private _newUniformInstances?: Record<string, UniformValue>;

  /**
   * Array of custom vertex attributes
   * 自定义顶点属性数组
   * @internal
   */
  private _customAttributes?: string[];

  /**
   * Flag indicating if shader has been created
   * 指示着色器是否已创建的标志
   * @internal
   */
  private _isCreatedShader: boolean;

  /**
   * Name of the created shader
   * 已创建着色器的名称
   * @internal
   */
  private _createdShaderName?: string;

  /**
   * Creates a new PBRCustomMaterial instance
   * 创建新的 PBRCustomMaterial 实例
   * @param name - The name of the material - 材质名称
   * @param scene - The scene the material belongs to - 材质所属的场景
   */
  constructor(name: string, scene: Scene);

  /**
   * Attaches custom uniforms and samplers after material binding
   * 材质绑定后附加自定义 uniform 和采样器
   * @param mesh - The mesh being rendered - 正在渲染的网格
   * @param effect - The effect to attach uniforms to - 要附加 uniform 的效果
   * @internal
   */
  AttachAfterBind(mesh: Nullable<Mesh>, effect: Effect): void;

  /**
   * Reviews and collects uniform or sampler names
   * 审查并收集 uniform 或采样器名称
   * @param uniformType - Type of uniform to review ("uniform" or "sampler") - 要审查的 uniform 类型
   * @param uniformList - List to append uniform names to - 要追加 uniform 名称的列表
   * @returns The updated uniform list - 更新后的 uniform 列表
   * @internal
   */
  ReviewUniform(uniformType: 'uniform' | 'sampler', uniformList: string[]): string[];

  /**
   * Builds the custom shader by injecting custom code into shader templates
   * 通过将自定义代码注入着色器模板来构建自定义着色器
   * @param shaderName - Base shader name - 基础着色器名称
   * @param uniforms - Array of uniform names - uniform 名称数组
   * @param uniformBuffers - Array of uniform buffer names - uniform 缓冲区名称数组
   * @param samplers - Array of sampler names - 采样器名称数组
   * @param defines - Shader defines - 着色器定义
   * @param attributes - Array of vertex attributes - 顶点属性数组
   * @param options - Additional shader options - 附加着色器选项
   * @returns The name of the built shader - 构建的着色器名称
   * @internal
   */
  Builder(
    shaderName: string,
    uniforms: string[],
    uniformBuffers: string[],
    samplers: string[],
    defines: string[],
    attributes?: string[],
    options?: unknown
  ): string;

  /**
   * Adds a custom uniform to the shader
   * 向着色器添加自定义 uniform
   * @param name - Uniform name - uniform 名称
   * @param type - Uniform type (e.g., "float", "vec2", "vec3", "vec4", "mat4", "sampler2D") - uniform 类型
   * @param value - Initial uniform value - 初始 uniform 值
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  AddUniform(name: string, type: string, value?: UniformValue | SamplerInstance): this;

  /**
   * Adds a custom vertex attribute to the shader
   * 向着色器添加自定义顶点属性
   * @param name - Attribute name - 属性名称
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  AddAttribute(name: string): this;

  /**
   * Sets custom code for the fragment shader begin section
   * 设置片段着色器开始部分的自定义代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_Begin(code: string): this;

  /**
   * Sets custom definitions for the fragment shader
   * 设置片段着色器的自定义定义
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_Definitions(code: string): this;

  /**
   * Sets custom code for the fragment shader main begin section
   * 设置片段着色器主函数开始部分的自定义代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_MainBegin(code: string): this;

  /**
   * Sets custom albedo calculation code (use "result" variable)
   * 设置自定义反照率计算代码（使用 "result" 变量）
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_Custom_Albedo(code: string): this;

  /**
   * Sets custom alpha calculation code (use "result" variable)
   * 设置自定义透明度计算代码（使用 "result" 变量）
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_Custom_Alpha(code: string): this;

  /**
   * Sets custom code to execute before lighting calculations
   * 设置在光照计算前执行的自定义代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_Before_Lights(code: string): this;

  /**
   * Sets custom metallic and roughness calculation code
   * 设置自定义金属度和粗糙度计算代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_Custom_MetallicRoughness(code: string): this;

  /**
   * Sets custom micro surface calculation code
   * 设置自定义微表面计算代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_Custom_MicroSurface(code: string): this;

  /**
   * Sets custom code to execute before fog application
   * 设置在应用雾效前执行的自定义代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_Before_Fog(code: string): this;

  /**
   * Sets custom code to execute before final color composition
   * 设置在最终颜色合成前执行的自定义代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_Before_FinalColorComposition(code: string): this;

  /**
   * Sets custom code to execute before final fragment color (use "result" variable)
   * 设置在最终片段颜色前执行的自定义代码（使用 "result" 变量）
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_Before_FragColor(code: string): this;

  /**
   * Sets custom code for the fragment shader main end section
   * 设置片段着色器主函数结束部分的自定义代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Fragment_MainEnd(code: string): this;

  /**
   * Sets custom code for the vertex shader begin section
   * 设置顶点着色器开始部分的自定义代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Vertex_Begin(code: string): this;

  /**
   * Sets custom definitions for the vertex shader
   * 设置顶点着色器的自定义定义
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Vertex_Definitions(code: string): this;

  /**
   * Sets custom code for the vertex shader main begin section
   * 设置顶点着色器主函数开始部分的自定义代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Vertex_MainBegin(code: string): this;

  /**
   * Sets custom code to execute before position update (use "result" variable)
   * 设置在位置更新前执行的自定义代码（使用 "result" 变量）
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Vertex_Before_PositionUpdated(code: string): this;

  /**
   * Sets custom code to execute before normal update (use "result" variable)
   * 设置在法线更新前执行的自定义代码（使用 "result" 变量）
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Vertex_Before_NormalUpdated(code: string): this;

  /**
   * Sets custom code to execute after world position computation
   * 设置在世界位置计算后执行的自定义代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Vertex_After_WorldPosComputed(code: string): this;

  /**
   * Sets custom code for the vertex shader main end section
   * 设置顶点着色器主函数结束部分的自定义代码
   * @param code - Custom shader code - 自定义着色器代码
   * @returns This material for chaining - 用于链式调用的材质实例
   */
  Vertex_MainEnd(code: string): this;
}

/**
 * Empty class representing shader albedo parts configuration
 * 表示着色器反照率部分配置的空类
 * @deprecated Use ShaderAlbedoParts interface instead - 请改用 ShaderAlbedoParts 接口
 */
export declare class ShaderAlebdoParts {}