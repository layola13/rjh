/**
 * 非常规二维曲线模块
 * 提供特殊的二维曲线实现
 */

import { Line2d } from './Line2d';

/**
 * 二维点坐标接口
 */
interface Point2d {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 非常规二维曲线类
 * 用于表示和处理特殊类型的二维曲线
 */
export declare class ExtraordinaryCurve2d {
  /**
   * 构造函数
   * 创建一个新的非常规二维曲线实例
   */
  constructor();

  /**
   * 转换为数学曲线对象
   * 将当前曲线转换为标准的二维线段表示
   * 默认返回从原点(0,0)到点(1,0)的水平线段
   * 
   * @returns 返回一个Line2d实例，表示转换后的数学曲线
   */
  toMathCurve(): Line2d;
}