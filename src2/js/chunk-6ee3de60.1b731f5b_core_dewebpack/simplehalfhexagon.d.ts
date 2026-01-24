/**
 * 简单半六边形切割线模块
 * 提供创建和操作半六边形形状的功能
 */

import type { Point, Vector, Segment, Matrix } from './geometry-types';
import type { SimpleLine, CutLineType } from './simple-line-types';

/**
 * 半六边形的序列化数据结构
 */
interface SimpleHalfHexagonJSON {
  /** 切割线类型标识 */
  name: CutLineType;
  /** 内边缘索引 */
  innerEdgeIdx?: number;
  /** 线段数据 */
  segments: Segment[];
}

/**
 * 简单半六边形切割线类
 * 继承自 SimpleLine，提供半六边形形状的创建、变换和序列化功能
 */
export declare class SimpleHalfHexagon extends SimpleLine {
  /**
   * 创建半六边形的线段数组
   * @param size - 半六边形的尺寸参数
   * @returns 构成半六边形的线段数组
   */
  static create(size: number): Segment[];

  /**
   * 将相对向量数组连接成线段序列
   * @param vectors - 相对位移向量数组
   * @returns 连接后的线段数组
   */
  static joinRelative(vectors: Vector[]): Segment[];

  /**
   * 从序列化数据反序列化为 SimpleHalfHexagon 实例
   * @param data - 序列化的 JSON 数据
   * @returns 反序列化后的 SimpleHalfHexagon 实例
   */
  static deserialize(data: SimpleHalfHexagonJSON): SimpleHalfHexagon;

  /**
   * 构造函数
   * @param size - 半六边形尺寸（当 segments 为 undefined 时使用）
   * @param segments - 可选的线段数组，若提供则直接使用
   */
  constructor(size: number, segments?: Segment[]);

  /**
   * 内边缘索引（用于标识内部边缘）
   */
  innerEdgeIdx?: number;

  /**
   * 克隆当前半六边形实例
   * @param segments - 新实例使用的线段数组
   * @returns 克隆后的新实例
   */
  protected _clone(segments: Segment[]): SimpleHalfHexagon;

  /**
   * 序列化为 JSON 对象
   * @returns 包含类型和几何数据的 JSON 对象
   */
  toJSON(): SimpleHalfHexagonJSON;

  /**
   * 拖拽顶点进行变形
   * @param vertexIndex - 顶点索引
   * @param displacement - 位移向量
   * @param newPosition - 新的顶点位置
   * @returns 变形后的新 SimpleHalfHexagon 实例
   * @throws 当拖拽方向反向时抛出错误
   */
  dragVertex(
    vertexIndex: number,
    displacement: Vector,
    newPosition: Point
  ): SimpleHalfHexagon;

  /**
   * 缩放半六边形
   * @param scaleFactor - 缩放因子
   * @returns 缩放后的线段数组
   */
  scale(scaleFactor: number): Segment[];

  /**
   * 拖拽圆弧进行变形
   * @param arcIndex - 圆弧索引
   * @param displacement - 位移向量
   * @param newPosition - 新的圆弧位置
   * @returns 变形后的新 SimpleHalfHexagon 实例
   */
  dragArc(
    arcIndex: number,
    displacement: Vector,
    newPosition: Point
  ): SimpleHalfHexagon;
}