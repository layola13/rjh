import type { Point, Vector } from './geometry';
import type { WinPolygon, Edge } from './polygon';

/**
 * 平行四边形多边形类型枚举
 */
export enum PolyType {
  parallelogram = 'parallelogram'
}

/**
 * 平行四边形多边形类
 * 继承自 WinPolygon，提供平行四边形的创建、变换和操作功能
 */
export class ParallelogramPoly extends WinPolygon {
  /**
   * 平行四边形的中心点
   */
  cpt: Point;

  /**
   * 平行四边形的宽度
   */
  width: number;

  /**
   * 构造函数
   * @param cpt - 平行四边形的中心点
   * @param width - 平行四边形的宽度
   * @param edges - 边集合，如果未提供则通过 create 方法生成
   */
  constructor(cpt: Point, width: number, edges?: Edge[]);

  /**
   * 创建平行四边形的边集合
   * @param centerPoint - 中心点
   * @param width - 宽度（同时用作高度）
   * @returns 平行四边形的边集合
   */
  static create(centerPoint: Point, width: number): Edge[];

  /**
   * 缩放平行四边形
   * @param scaleFactor - 缩放因子
   * @returns 缩放后的平行四边形实例
   */
  scale(scaleFactor: number): this;

  /**
   * 克隆平行四边形
   * @returns 新的平行四边形实例
   * @internal
   */
  _clone(): ParallelogramPoly;

  /**
   * 序列化为 JSON 对象
   * @returns JSON 表示形式
   */
  toJSON(): {
    type: PolyType.parallelogram;
    cpt: ReturnType<Point['toJSON']>;
    width: number;
    [key: string]: unknown;
  };

  /**
   * 平移平行四边形
   * @param offset - 平移向量
   * @returns 平移后的实例
   */
  translate(offset: Vector): this;

  /**
   * 旋转平行四边形
   * @param angle - 旋转角度（弧度）
   * @param center - 旋转中心点
   * @returns 旋转后的实例
   */
  rotate(angle: number, center: Point): this;

  /**
   * 拖拽边
   * @param edgeIndex - 边的索引
   * @param dragVector - 拖拽向量
   * @param resultPoint - 可选的结果点，默认为原点
   * @returns 新的平行四边形实例
   */
  dragEdge(edgeIndex: number, dragVector: Vector, resultPoint?: Point): ParallelogramPoly;

  /**
   * 拖拽顶点
   * @param vertexIndex - 顶点索引 (0-3)
   * @param dragVector - 拖拽向量
   * @param snapMode - 捕捉模式
   * @param resultPoint - 可选的结果点，默认为原点
   * @returns 新的平行四边形实例
   */
  dragVertex(
    vertexIndex: number,
    dragVector: Vector,
    snapMode: unknown,
    resultPoint?: Point
  ): ParallelogramPoly;

  /**
   * 拖拽圆弧
   * @param arcIndex - 圆弧索引 (0-3)
   * @param dragAmount - 拖拽量
   * @returns 新的平行四边形实例
   */
  dragArc(arcIndex: number, dragAmount: number): ParallelogramPoly;
}