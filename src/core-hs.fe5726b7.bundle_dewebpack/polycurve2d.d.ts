/**
 * 2D多段曲线模块
 * 提供多段曲线的创建、操作和序列化功能
 */

import type { Point2d } from './Point2d';
import type { LineSegment2d, ILineSegment2d, LineSegment2dDumpData } from './LineSegment2d';
import type { Arc2d, IArc2d, Arc2dDumpData } from './Arc2d';
import type { Circle2d, ICircle2d, Circle2dDumpData } from './Circle2d';
import type { GeometryObjectType } from './GeometryObjectType';

/**
 * 曲线离散化选项
 */
export interface DiscretePointsOptions {
  /** 离散点之间的最大距离 */
  maxDistance?: number;
  /** 离散点的最小数量 */
  minPoints?: number;
  /** 角度容差（弧度） */
  angleTolerance?: number;
}

/**
 * 2D曲线基类序列化数据（联合类型）
 */
export type Curve2dDumpData = LineSegment2dDumpData | Arc2dDumpData | Circle2dDumpData;

/**
 * 2D曲线基类接口（联合类型）
 */
export type ICurve2d = ILineSegment2d | IArc2d | ICircle2d;

/**
 * 2D曲线对象（联合类型）
 */
export type Curve2d = LineSegment2d | Arc2d | Circle2d;

/**
 * PolyCurve2d 序列化数据结构
 */
export interface PolyCurve2dDumpData {
  /** 组成多段曲线的各段曲线数据 */
  curves: Curve2dDumpData[];
  /** 几何对象类型标识 */
  geoType: GeometryObjectType.PolyCurve2d;
}

/**
 * 2D多段曲线类
 * 由多个连续的2D曲线段（线段、圆弧、圆）组成的复合曲线
 */
export declare class PolyCurve2d {
  /**
   * 组成多段曲线的曲线段数组
   */
  curves: Curve2d[];

  /**
   * 构造函数
   * 创建一个空的多段曲线对象
   */
  constructor();

  /**
   * 从另一个多段曲线对象赋值
   * @param source - 源多段曲线对象
   */
  assign(source: PolyCurve2d): void;

  /**
   * 获取几何对象类型
   * @returns 返回 GeometryObjectType.PolyCurve2d
   */
  getType(): GeometryObjectType.PolyCurve2d;

  /**
   * 从序列化数据加载多段曲线
   * @param data - 序列化的多段曲线数据
   */
  load(data: PolyCurve2dDumpData): void;

  /**
   * 将多段曲线序列化为数据对象
   * @returns 序列化后的数据对象
   */
  dump(): PolyCurve2dDumpData;

  /**
   * 克隆当前多段曲线
   * @returns 新的多段曲线对象（深拷贝）
   */
  clone(): PolyCurve2d;

  /**
   * 从点数组创建多段曲线（由直线段连接）
   * @param points - 点数组
   * @param closed - 是否闭合曲线（自动连接首尾点），默认为 true
   */
  setFromPoints(points: Point2d[], closed?: boolean): void;

  /**
   * 设置曲线段数组
   * @param curves - 曲线段数组
   */
  setCurves(curves: Curve2d[]): void;

  /**
   * 判断多段曲线是否闭合
   * @returns 如果首尾点重合或只有一段闭合曲线则返回 true
   */
  isClosed(): boolean;

  /**
   * 获取多段曲线的离散点集
   * 将所有曲线段离散化并合并，去除重复点
   * @param options - 离散化选项
   * @returns 离散点数组
   */
  getDiscretePoints(options?: DiscretePointsOptions): Point2d[];

  /**
   * 判断两个多段曲线是否相同
   * @param other - 另一个多段曲线对象
   * @param tolerance - 容差值，默认使用 HSConstants.Constants.TOLERANCE
   * @returns 如果曲线段数量、类型和几何形状都相同则返回 true
   */
  isSamePolyCurve(other: PolyCurve2d, tolerance?: number): boolean;
}

/**
 * 类型保护：判断是否为 Curve2dDumpData
 * @param data - 待检查的数据
 * @returns 如果是有效的曲线序列化数据则返回 true
 */
export declare function isCurve2dDumpData(data: unknown): data is Curve2dDumpData;

/**
 * 类型保护：判断是否为 PolyCurve2dDumpData
 * @param data - 待检查的数据
 * @returns 如果是有效的多段曲线序列化数据则返回 true
 */
export declare function isPolyCurve2dDumpData(data: unknown): data is PolyCurve2dDumpData;

/**
 * 从序列化数据或接口对象创建 2D 曲线实例
 * 支持线段、圆弧、圆的创建
 * @param data - 曲线序列化数据或接口对象
 * @returns 创建的曲线实例，失败时返回 null
 */
export declare function createCurve2D(data: Curve2dDumpData | ICurve2d): Curve2d | null;