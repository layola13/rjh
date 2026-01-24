/**
 * 表示二维空间中的非凡线段（Extraordinary Line）
 * 继承自 ExtraordinaryCurve2d，提供线段的创建、访问和操作功能
 * 
 * @module ExtraordinaryLine2d
 */

import { Line2d } from './math/Line2d';
import { ExtraordinaryCurve2d } from './ExtraordinaryCurve2d';
import { ExtraordinaryPoint2d } from './ExtraordinaryPoint2d';

/**
 * 二维非凡线段类
 * 通过起点和终点定义一条线段
 */
export class ExtraordinaryLine2d extends ExtraordinaryCurve2d {
  /** 线段起点 */
  private _from: ExtraordinaryPoint2d;
  
  /** 线段终点 */
  private _to: ExtraordinaryPoint2d;

  /**
   * 构造函数
   * @param from - 线段起点，如果未提供则创建新的默认点
   * @param to - 线段终点，如果未提供则创建新的默认点
   */
  constructor(from?: ExtraordinaryPoint2d, to?: ExtraordinaryPoint2d) {
    super();
    this._from = from ?? new ExtraordinaryPoint2d();
    this._to = to ?? new ExtraordinaryPoint2d();
  }

  /**
   * 静态工厂方法，创建线段实例
   * @param from - 线段起点
   * @param to - 线段终点
   * @returns 新创建的 ExtraordinaryLine2d 实例
   */
  static create(from: ExtraordinaryPoint2d, to: ExtraordinaryPoint2d): ExtraordinaryLine2d {
    return new ExtraordinaryLine2d(from, to);
  }

  /**
   * 获取线段起点
   * @returns 起点坐标
   */
  get from(): ExtraordinaryPoint2d {
    return this._from;
  }

  /**
   * 获取线段终点
   * @returns 终点坐标
   */
  get to(): ExtraordinaryPoint2d {
    return this._to;
  }

  /**
   * 设置线段起点
   * @param point - 新的起点坐标
   */
  setFrom(point: ExtraordinaryPoint2d): void {
    this._from = point;
  }

  /**
   * 设置线段终点
   * @param point - 新的终点坐标
   */
  setTo(point: ExtraordinaryPoint2d): void {
    this._to = point;
  }

  /**
   * 在指定点处分割线段
   * @param splitPoint - 分割点坐标
   * @returns 包含两条子线段的对象
   */
  split(splitPoint: ExtraordinaryPoint2d): {
    curve1: ExtraordinaryLine2d;
    curve2: ExtraordinaryLine2d;
  } {
    return {
      curve1: ExtraordinaryLine2d.create(this._from, splitPoint),
      curve2: ExtraordinaryLine2d.create(splitPoint, this._to)
    };
  }

  /**
   * 转换为数学库中的 Line2d 对象
   * @returns 对应的数学线段对象
   */
  toMathCurve(): Line2d {
    return new Line2d(this.from, this.to);
  }
}