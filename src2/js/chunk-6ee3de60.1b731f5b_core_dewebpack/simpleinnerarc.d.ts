/**
 * 简单内弧线模块
 * 用于创建和操作包含弧线的切割线几何图形
 */

import { Point, Segment, Vector, Matrix } from './geometry-types';
import { ArcUtils } from './arc-utils';
import { Utils } from './utils';
import { SimpleLine, CutLineType } from './simple-line';

/**
 * 简单内弧线类
 * 继承自SimpleLine，提供创建和操作内弧线的功能
 */
export declare class SimpleInnerArc extends SimpleLine {
  /**
   * 构造函数
   * @param width - 弧线的宽度
   * @param segments - 可选的线段数组，如果不提供则根据width创建默认线段
   */
  constructor(width: number, segments?: Segment[]);

  /**
   * 静态工厂方法：根据给定宽度创建内弧线的线段数组
   * @param width - 弧线的宽度
   * @returns 包含三个线段的数组：两条直线段和一条弧线段
   */
  static create(width: number): Segment[];

  /**
   * 从JSON数据反序列化创建SimpleInnerArc实例
   * @param data - 序列化的JSON对象
   * @returns 反序列化后的SimpleInnerArc实例
   */
  static deserialize(data: SerializedSimpleInnerArc): SimpleInnerArc;

  /**
   * 克隆当前实例
   * @param segments - 新实例使用的线段数组
   * @returns 克隆的SimpleInnerArc实例
   */
  protected _clone(segments: Segment[]): SimpleInnerArc;

  /**
   * 将实例序列化为JSON对象
   * @returns 包含类型标识和线段数据的JSON对象
   */
  toJSON(): SerializedSimpleInnerArc;

  /**
   * 拖动顶点以调整弧线
   * @param vertexIndex - 顶点索引（当为1时表示拖动弧线中点）
   * @param offset - 拖动的偏移向量
   * @param targetPoint - 目标位置点
   * @returns 新的SimpleInnerArc实例
   * @throws 当拖动方向与预期相反时抛出错误
   */
  dragVertex(vertexIndex: number, offset: Vector, targetPoint: Point): SimpleInnerArc;

  /**
   * 按比例缩放弧线
   * @param scale - 缩放比例
   * @returns 缩放后的线段数组
   */
  scale(scale: number): Segment[];

  /**
   * 拖动弧线段
   * @param arcIndex - 弧线段索引
   * @param offset - 拖动偏移向量
   * @param targetPoint - 目标位置点
   * @returns 新的SimpleInnerArc实例
   */
  dragArc(arcIndex: number, offset: Vector, targetPoint: Point): SimpleInnerArc;

  /**
   * 获取或设置弧线的宽度
   * 宽度定义为第一条线段起点到第三条线段终点的距离
   */
  get width(): number;
  set width(value: number);

  /**
   * 获取或设置弧线的高度
   * 高度定义为弧线中点到其弦的垂直距离
   */
  get height(): number;
  set height(value: number);

  /**
   * 内边缘索引（继承自SimpleLine）
   */
  innerEdgeIdx?: number;
}

/**
 * 序列化的SimpleInnerArc数据结构
 */
export interface SerializedSimpleInnerArc {
  /** 类型标识 */
  name: CutLineType.simpleInnerArc;
  /** 线段数据 */
  segments: unknown[];
  /** 内边缘索引 */
  innerEdgeIdx?: number;
}