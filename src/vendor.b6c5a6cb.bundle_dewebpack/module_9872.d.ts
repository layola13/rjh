import { Filter } from '@pixi/core';
import { Point, Matrix, Sprite } from '@pixi/math';
import { Texture } from '@pixi/core';

/**
 * 位移滤镜类
 * 使用贴图的像素值来扭曲目标对象的渲染结果
 * 通过读取位移贴图的RGB值来偏移目标纹理的UV坐标
 */
export class DisplacementFilter extends Filter {
  /**
   * 用于位移效果的遮罩精灵
   */
  maskSprite: Sprite;

  /**
   * 滤镜矩阵，用于计算位移坐标变换
   */
  maskMatrix: Matrix;

  /**
   * 位移缩放值
   * 控制位移效果的强度
   */
  scale: Point;

  /**
   * 创建位移滤镜实例
   * @param sprite - 用作位移贴图的精灵对象，其纹理将被用于计算位移
   * @param scale - 位移缩放强度，默认值为20
   */
  constructor(sprite: Sprite, scale?: number);

  /**
   * 应用滤镜效果
   * 在渲染管线中执行位移计算
   * @param filterManager - 滤镜管理器实例
   * @param input - 输入渲染纹理
   * @param output - 输出渲染纹理
   * @param clearMode - 清除模式标志
   */
  apply(
    filterManager: any,
    input: any,
    output: any,
    clearMode: any
  ): void;

  /**
   * 位移贴图纹理
   * getter/setter 用于访问和设置用于位移计算的采样器纹理
   */
  map: Texture;
}

/**
 * DisplacementFilter 的 uniforms 接口
 * 定义传递给着色器的统一变量
 */
interface DisplacementUniforms {
  /**
   * 位移贴图采样器
   */
  mapSampler: Texture;

  /**
   * 滤镜变换矩阵
   */
  filterMatrix: Matrix;

  /**
   * XY轴位移缩放
   */
  scale: {
    x: number;
    y: number;
  };

  /**
   * 旋转矩阵（2x2）
   * 用于处理精灵的旋转变换
   */
  rotation: Float32Array;
}