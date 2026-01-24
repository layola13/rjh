/**
 * 形状工具类 - 用于处理2D形状到3D空间的转换和各种连接/转角形状的生成
 * @module ShapeUtilities
 */

import { Vector2, Vector3, Angle } from './math-library';
import { ShapePivotPoint } from './enums';
import GeometryUtils from './geometry-utils';
import MathHelper from './math-helper';
import Point from './point-library';

/**
 * 形状配置选项
 */
export interface ShapeConfig {
  /** 2D形状顶点数组 */
  shape2d: Vector2[];
  /** 形状偏移量 */
  offset?: Vector2;
  /** 形状锚点位置 */
  shapePivot?: ShapePivotPoint;
}

/**
 * 形状工具类
 * 提供形状转换、连接点生成、转角生成等功能
 */
export default class ShapeUtilities {
  /** 转角偏移值 */
  private static readonly cornerOffsetValue: number = 0.1;
  
  /** 转角交叉框架尺寸 */
  private static readonly cornerCrossFrame: number = 0.2;

  /**
   * 将2D形状转换为XZ平面的3D坐标
   * @param config - 形状配置对象
   * @returns 3D坐标数组
   */
  static TranslateToXZ(config: ShapeConfig): Vector3[];

  /**
   * 根据锚点类型计算形状的锚点坐标
   * @param shape - 形状顶点数组
   * @param pivotPoint - 锚点位置枚举
   * @returns 锚点的2D坐标
   */
  static GetShapePivotPoint(shape: Vector2[], pivotPoint: ShapePivotPoint): Vector2;

  /**
   * 生成内向连接形状
   * @param width - 连接宽度
   * @param depth - 连接深度
   * @param inset - 内嵌尺寸
   * @param notchHeight - 凹槽高度
   * @returns 连接形状的顶点数组
   */
  static GenConnectionIn(
    width: number,
    depth: number,
    inset: number,
    notchHeight: number
  ): Vector2[];

  /**
   * 生成外向连接形状
   * @param width - 连接宽度
   * @param height - 连接高度
   * @param inset - 内嵌尺寸
   * @param notchHeight - 凹槽高度
   * @returns 连接形状的顶点数组
   */
  static GenConnectionOut(
    width: number,
    height: number,
    inset: number,
    notchHeight: number
  ): Vector2[];

  /**
   * 生成接头(Joint)连接形状
   * @param width - 接头宽度
   * @param height - 接头高度
   * @param thickness - 接头厚度
   * @returns 接头形状的顶点数组
   */
  static GenConnectionJT(width: number, height: number, thickness: number): Vector2[];

  /**
   * 生成内转角形状
   * @param length - 转角长度，默认0.075
   * @param width - 转角宽度，默认0.1
   * @param angleDegrees - 转角角度（度），默认90
   * @param clockwise - 是否顺时针方向，默认true
   * @param useSmoothing - 是否使用平滑插值，默认false
   * @returns 转角形状的顶点数组
   */
  static GenCornerIn(
    length?: number,
    width?: number,
    angleDegrees?: number,
    clockwise?: boolean,
    useSmoothing?: boolean
  ): Point.Point[];

  /**
   * 生成外转角形状
   * @param length - 转角长度，默认0.075
   * @param width - 转角宽度，默认0.1
   * @param angleDegrees - 转角角度（度），默认90
   * @param clockwise - 是否顺时针方向，默认true
   * @param useSmoothing - 是否使用平滑插值，默认false
   * @returns 转角形状的顶点数组
   */
  static GenCornerOut(
    length?: number,
    width?: number,
    angleDegrees?: number,
    clockwise?: boolean,
    useSmoothing?: boolean
  ): Point.Point[];
}