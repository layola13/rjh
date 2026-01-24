/**
 * 二维圆类型定义模块
 * 提供用于表示和操作二维平面中圆形的类型定义
 * @module ExtraordinaryCircle2d
 */

import type { Arc2d } from './Arc2d';
import type { ExtraordinaryCurve2d } from './ExtraordinaryCurve2d';
import type { ExtraordinaryPoint2d } from './ExtraordinaryPoint2d';

/**
 * 二维圆类
 * 继承自ExtraordinaryCurve2d，表示二维平面中的圆形
 * 支持顺时针和逆时针方向定义
 */
export declare class ExtraordinaryCircle2d extends ExtraordinaryCurve2d {
  /**
   * 圆心坐标
   * @private
   */
  private _center: ExtraordinaryPoint2d;

  /**
   * 圆的半径
   * @private
   */
  private _radius: number;

  /**
   * 是否为逆时针方向
   * true表示逆时针(CCW - Counter-Clockwise)，false表示顺时针
   * @private
   */
  private _isCCW: boolean;

  /**
   * 构造函数
   * @param radius - 圆的半径
   * @param isCCW - 是否为逆时针方向
   * @param center - 圆心坐标，默认为原点
   */
  constructor(radius: number, isCCW: boolean, center?: ExtraordinaryPoint2d);

  /**
   * 静态工厂方法，创建圆实例
   * @param center - 圆心坐标
   * @param radius - 圆的半径
   * @param isCCW - 是否为逆时针方向
   * @returns 新创建的圆实例
   */
  static create(
    center: ExtraordinaryPoint2d,
    radius: number,
    isCCW: boolean
  ): ExtraordinaryCircle2d;

  /**
   * 获取圆的方向
   * @returns 如果为逆时针返回true，否则返回false
   */
  get isCCW(): boolean;

  /**
   * 设置圆的方向
   * @param isCCW - 是否为逆时针方向
   */
  setCCW(isCCW: boolean): void;

  /**
   * 获取圆的半径
   * @returns 半径值
   */
  get radius(): number;

  /**
   * 设置圆的半径
   * @param radius - 新的半径值
   */
  setRadius(radius: number): void;

  /**
   * 获取圆心坐标
   * @returns 圆心点对象
   */
  get center(): ExtraordinaryPoint2d;

  /**
   * 设置圆心坐标
   * @param center - 新的圆心点对象
   */
  setCenter(center: ExtraordinaryPoint2d): void;

  /**
   * 将圆转换为数学曲线表示
   * 通过起始角度0和结束角度2π创建完整的圆弧
   * @returns 转换后的Arc2d数学曲线对象
   */
  toMathCurve(): Arc2d;
}