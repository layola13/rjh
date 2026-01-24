import { ProceduralTexture } from '@babylonjs/core/Materials/Textures/Procedurals/proceduralTexture';
import { Scene } from '@babylonjs/core/scene';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector2 } from '@babylonjs/core/Maths/math.vector';
import { Nullable } from '@babylonjs/core/types';

/**
 * 火焰程序纹理生成器
 * 用于创建动态的火焰效果纹理
 */
export declare class FireProceduralTexture extends ProceduralTexture {
  /**
   * 紫色火焰颜色预设
   * 包含6个颜色层用于渲染紫色火焰效果
   */
  static readonly PurpleFireColors: Color3[];

  /**
   * 绿色火焰颜色预设
   * 包含6个颜色层用于渲染绿色火焰效果
   */
  static readonly GreenFireColors: Color3[];

  /**
   * 红色火焰颜色预设（默认）
   * 包含6个颜色层用于渲染红色火焰效果
   */
  static readonly RedFireColors: Color3[];

  /**
   * 蓝色火焰颜色预设
   * 包含6个颜色层用于渲染蓝色火焰效果
   */
  static readonly BlueFireColors: Color3[];

  /**
   * 是否自动生成时间动画
   * 当为true时，火焰会自动播放动画
   */
  autoGenerateTime: boolean;

  /**
   * 火焰颜色数组
   * 必须包含6个Color3对象，用于定义火焰的渐变颜色
   */
  fireColors: Color3[];

  /**
   * 当前动画时间
   * 控制火焰的动画进度
   */
  time: number;

  /**
   * 火焰移动速度
   * x和y分量分别控制水平和垂直方向的移动速度
   */
  speed: Vector2;

  /**
   * Alpha透明度阈值
   * 用于控制火焰边缘的透明度裁剪，范围0-1
   */
  alphaThreshold: number;

  /**
   * 创建火焰程序纹理实例
   * @param name - 纹理名称
   * @param size - 纹理尺寸（宽度和高度）
   * @param scene - 所属场景
   * @param fallbackTexture - 后备纹理（可选）
   * @param generateMipMaps - 是否生成Mipmap（可选）
   */
  constructor(
    name: string,
    size: number,
    scene: Nullable<Scene>,
    fallbackTexture?: ProceduralTexture,
    generateMipMaps?: boolean
  );

  /**
   * 更新着色器uniform变量
   * 将当前属性值传递给GPU着色器
   */
  updateShaderUniforms(): void;

  /**
   * 渲染纹理
   * @param useCameraPostProcess - 是否使用相机后处理效果
   */
  render(useCameraPostProcess?: boolean): void;

  /**
   * 序列化纹理数据
   * @returns 包含纹理配置的JSON对象
   */
  serialize(): any;

  /**
   * 从序列化数据解析创建纹理实例
   * @param parsedTexture - 序列化的纹理数据
   * @param scene - 目标场景
   * @param rootUrl - 根URL路径
   * @returns 解析后的FireProceduralTexture实例
   */
  static Parse(
    parsedTexture: any,
    scene: Scene,
    rootUrl: string
  ): FireProceduralTexture;
}