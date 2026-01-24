import { ProceduralTexture } from '@babylonjs/core/Materials/Textures/Procedurals/proceduralTexture';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Scene } from '@babylonjs/core/scene';
import { Nullable } from '@babylonjs/core/types';

/**
 * 法线贴图程序纹理类
 * 用于从基础纹理生成法线贴图的程序化纹理
 */
export declare class NormalMapProceduralTexture extends ProceduralTexture {
  /**
   * 内部存储的基础纹理
   * @private
   */
  private _baseTexture: Nullable<Texture>;

  /**
   * 构造函数
   * @param name - 纹理名称
   * @param size - 纹理尺寸
   * @param scene - 场景对象，如果为null则使用当前场景
   * @param fallbackTexture - 备用纹理（可选）
   * @param generateMipMaps - 是否生成mipmap（可选）
   */
  constructor(
    name: string,
    size: number,
    scene: Nullable<Scene>,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /**
   * 获取基础纹理
   * 法线贴图将基于此纹理生成
   */
  get baseTexture(): Nullable<Texture>;

  /**
   * 设置基础纹理
   * 设置后会自动更新着色器uniform变量
   */
  set baseTexture(value: Nullable<Texture>);

  /**
   * 更新着色器的uniform变量
   * 将基础纹理和渲染尺寸传递给着色器
   */
  updateShaderUniforms(): void;

  /**
   * 渲染纹理
   * @param useCameraPostProcess - 是否使用相机后处理效果
   */
  render(useCameraPostProcess?: boolean): void;

  /**
   * 调整纹理尺寸
   * @param width - 新的宽度
   * @param height - 新的高度
   */
  resize(width: number, height: number): void;

  /**
   * 检查纹理是否准备就绪
   * @returns 如果基础纹理存在且已准备好，则返回true
   */
  isReady(): boolean;

  /**
   * 序列化纹理数据
   * @returns 序列化后的JSON对象
   */
  serialize(): any;

  /**
   * 从序列化数据解析并创建纹理实例
   * @param parsedTexture - 解析的纹理数据
   * @param scene - 场景对象
   * @param rootUrl - 根URL路径
   * @returns 新创建的NormalMapProceduralTexture实例
   */
  static Parse(
    parsedTexture: any,
    scene: Scene,
    rootUrl: string
  ): NormalMapProceduralTexture;
}