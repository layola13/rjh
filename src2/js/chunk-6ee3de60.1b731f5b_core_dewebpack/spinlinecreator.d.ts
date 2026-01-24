/**
 * 旋转线条创建器模块
 * 用于创建各种多边形（五边形、六边形、七边形、八边形）的线段集合
 */

import { default as GeometryUtils } from './geometry-utils';

/**
 * 方向枚举类型
 */
type Orientation = GeometryUtils.ORIENTATION.CW | GeometryUtils.ORIENTATION.CCW;

/**
 * 二维向量接口
 */
interface Vector {
  /**
   * 平移向量
   * @param offset 偏移向量
   * @returns 新的向量
   */
  translate(offset: Vector): Vector;
  
  /**
   * 旋转向量
   * @param angle 旋转角度（弧度）
   * @param center 旋转中心点
   * @returns 新的向量
   */
  rotate(angle: number, center: Vector): Vector;
}

/**
 * 线段接口
 */
interface Line {
  start: Vector;
  end: Vector;
}

/**
 * 多边形创建函数类型
 */
type PolygonCreatorFunction = (
  orientation: Orientation,
  size: number,
  center: Vector
) => Line[];

/**
 * 旋转线条创建器类
 * 单例模式，用于创建正多边形的边线集合
 */
export declare class SpinLineCreator {
  /**
   * 获取单例实例
   */
  static get Instance(): SpinLineCreator;

  /**
   * 私有单例实例
   */
  private static instance?: SpinLineCreator;

  /**
   * 多边形创建函数映射表
   * 键为边数（5-8），值为对应的创建函数
   */
  private readonly slines: Record<number, PolygonCreatorFunction>;

  /**
   * 私有构造函数（单例模式）
   */
  private constructor();

  /**
   * 创建指定边数的正多边形线段集合
   * @param sides 多边形边数（5、6、7或8）
   * @param orientation 旋转方向（顺时针或逆时针）
   * @param size 多边形尺寸
   * @param center 多边形中心点
   * @returns 构成多边形的线段数组
   */
  create(
    sides: number,
    orientation: Orientation,
    size: number,
    center: Vector
  ): Line[];

  /**
   * 创建正五边形线段集合
   * @param orientation 旋转方向
   * @param size 外接圆半径的相关尺寸参数
   * @param center 中心点
   * @returns 五条边的线段数组
   */
  createPentagon(
    orientation: Orientation,
    size: number,
    center: Vector
  ): Line[];

  /**
   * 创建正六边形线段集合
   * @param orientation 旋转方向
   * @param size 边长
   * @param center 中心点
   * @returns 六条边的线段数组
   */
  createHexagon(
    orientation: Orientation,
    size: number,
    center: Vector
  ): Line[];

  /**
   * 创建正七边形线段集合
   * @param orientation 旋转方向
   * @param size 外接圆半径的相关尺寸参数
   * @param center 中心点
   * @returns 七条边的线段数组
   */
  createHeptagon(
    orientation: Orientation,
    size: number,
    center: Vector
  ): Line[];

  /**
   * 创建正八边形线段集合
   * @param orientation 旋转方向
   * @param size 边长
   * @param center 中心点
   * @returns 八条边的线段数组
   */
  createOctagon(
    orientation: Orientation,
    size: number,
    center: Vector
  ): Line[];
}