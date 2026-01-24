/**
 * 2D线段几何对象模块
 * 提供二维空间中线段的创建、操作和几何计算功能
 */

import { Curve2d } from './Curve2d';
import { Point2d, IPoint2d } from './Point2d';
import { GeometryObjectType } from './GeometryObjectType';

/**
 * 2D线段接口
 * 定义线段的基本数据结构
 */
export interface ILineSegment2d {
  /** 线段起点 */
  start: IPoint2d;
  /** 线段终点 */
  end: IPoint2d;
}

/**
 * 线段序列化数据接口
 * 用于线段的持久化存储和传输
 */
export interface LineSegment2dDumpData {
  /** 线段数据：[起点, 终点] */
  ln: [IPoint2d, IPoint2d];
  /** 几何对象类型标识 */
  gt: GeometryObjectType.LineSegment2d;
  /** 几何对象类型标识（兼容字段） */
  geoType?: GeometryObjectType.LineSegment2d;
}

/**
 * 离散点选项接口
 */
export interface DiscretePointsOptions {
  // 可扩展的离散化参数
}

/**
 * 坐标点接口
 */
export interface ICoordinate {
  x: number;
  y: number;
}

/**
 * 2D线段类
 * 表示二维平面上由起点和终点定义的线段
 * 继承自Curve2d，实现曲线的各种几何操作
 */
export declare class LineSegment2d extends Curve2d {
  /** 线段起点 */
  start: Point2d;
  
  /** 线段终点 */
  end: Point2d;

  /**
   * 构造函数
   * @param start - 线段起点
   * @param end - 线段终点
   */
  constructor(start: IPoint2d, end: IPoint2d);

  /**
   * 获取几何对象类型
   * @returns 返回LineSegment2d类型标识
   */
  getType(): GeometryObjectType.LineSegment2d;

  /**
   * 从另一个线段复制数据
   * @param other - 源线段对象
   */
  assign(other: ILineSegment2d): void;

  /**
   * 设置线段的起点和终点
   * @param start - 新的起点
   * @param end - 新的终点
   */
  set(start: IPoint2d, end: IPoint2d): void;

  /**
   * 从接口数据创建线段实例（静态工厂方法）
   * @param data - 包含起点和终点的数据对象
   * @returns 新的LineSegment2d实例
   */
  static create(data: ILineSegment2d): LineSegment2d;

  /**
   * 从两个点创建线段实例（静态工厂方法）
   * @param start - 起点
   * @param end - 终点
   * @returns 新的LineSegment2d实例
   */
  static createFormPoints(start: IPoint2d, end: IPoint2d): LineSegment2d;

  /**
   * 序列化线段数据
   * @returns 可序列化的线段数据对象
   */
  dump(): LineSegment2dDumpData;

  /**
   * 克隆当前线段
   * @returns 新的LineSegment2d实例，与当前线段数据相同
   */
  clone(): LineSegment2d;

  /**
   * 获取线段的离散点集合
   * @param options - 离散化选项（可选）
   * @returns 包含起点和终点的坐标数组
   */
  getDiscretePoints(options?: DiscretePointsOptions): ICoordinate[];

  /**
   * 根据参数t获取线段上的点
   * @param t - 参数值，范围[0, 1]，0对应起点，1对应终点
   * @returns 线段上对应参数位置的点
   */
  getPoint(t: number): Point2d;

  /**
   * 判断是否与另一条曲线相同
   * @param other - 待比较的曲线对象
   * @param tolerance - 容差值，默认为HSConstants.Constants.TOLERANCE
   * @returns 如果两条曲线相同返回true，否则返回false
   */
  isSameCurve(other: Curve2d, tolerance?: number): boolean;

  /**
   * 创建子曲线（线段的一部分）
   * @param start - 子曲线起点
   * @param end - 子曲线终点
   * @returns 新的LineSegment2d实例
   */
  createSubCurve(start: IPoint2d, end: IPoint2d): LineSegment2d;

  /**
   * 判断点是否在线段上
   * @param point - 待检测的点
   * @param tolerance - 容差值，默认为HSConstants.Constants.TOLERANCE
   * @returns 如果点在线段上返回true，否则返回false
   */
  isPointOnCurve(point: IPoint2d, tolerance?: number): boolean;

  /**
   * 计算线段与水平线的交点
   * @param y - 水平线的y坐标
   * @returns 交点坐标数组，如果无交点返回空数组
   */
  hLineIntersections(y: number): ICoordinate[];
}

/**
 * 类型守卫：判断对象是否为ILineSegment2d接口
 * @param obj - 待检测的对象
 * @returns 如果对象符合ILineSegment2d接口返回true
 */
export declare function isILineSegment2d(obj: unknown): obj is ILineSegment2d;

/**
 * 类型守卫：判断数据是否为LineSegment2d序列化数据
 * @param data - 待检测的数据对象
 * @returns 如果数据符合LineSegment2dDumpData格式返回true
 */
export declare function isLineSegment2dDumpData(data: unknown): data is LineSegment2dDumpData;