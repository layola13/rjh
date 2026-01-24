/**
 * Module: SplitterLine
 * 用于分割多边形的线条分割器模块
 */

import type { Line, Segment, Vector, Point } from './geometry';
import type { Splitter, PointCut, ShapeElement } from './splitter';
import type { Utils } from './utils';

/**
 * 多边形线条分割器类
 * 继承自基础 Splitter 类，专门用于通过线条分割多边形
 */
export declare class SplitterLine extends Splitter {
  /**
   * 被分割的多边形对象
   */
  readonly poly: Polygon;

  /**
   * 用于分割的线条对象
   */
  readonly splitLine: Line;

  /**
   * 分割后的多边形集合
   */
  protected splitPoly: Polygon[];

  /**
   * 位于分割线上的边集合
   */
  protected edgesOnLine: EdgeElement[];

  /**
   * 构造函数
   * @param poly - 待分割的多边形
   * @param splitLine - 用于分割的线条
   */
  constructor(poly: Polygon, splitLine: Line);

  /**
   * 生成竖梃线（平行于给定线的两条偏移线）
   * @param line - 基准线对象，包含点和法向量
   * @param offset - 偏移距离
   * @returns 返回两条偏移后的线条数组
   */
  genMullionLine(line: LineWithNormal, offset: number): [Line, Line];

  /**
   * 过滤有效的交点
   * 移除与现有边重合的点，避免冗余分割
   * @param points - 候选交点数组
   * @param edge - 当前处理的边对象
   * @returns 过滤后的有效点数组
   */
  filterValidPts(points: Point[], edge: Edge): Point[];

  /**
   * 分割边集合
   * 使用交点将多边形的边进行分割
   * @param edge - 待分割的边
   * @param line - 分割线
   */
  splitEdges(edge: Edge, line: Line): void;

  /**
   * 对边进行排序
   * 根据边相对于线条的位置进行排序
   * @param line - 参考线条
   */
  sortEdges(line: LineWithNormal): void;

  /**
   * 创建形状元素对象
   * @param startEdge - 起始边元素
   * @param endEdge - 结束边元素
   * @param line - 参考线条
   * @returns 新创建的形状元素
   */
  createObj(startEdge: EdgeElement, endEdge: EdgeElement, line: Line): ShapeElement;
}

/**
 * 带法向量的线条接口
 */
interface LineWithNormal {
  /** 线上的点 */
  pt: Point;
  /** 法向量 */
  norm: Vector;
}

/**
 * 多边形接口
 */
interface Polygon {
  /** 多边形的边集合 */
  edges: Edge[];
  /**
   * 计算与线条的交点
   * @param line - 参考线条
   * @returns 交点数组
   */
  intersect(line: Line): Point[];
}

/**
 * 边对象接口
 */
interface Edge {
  /** 边的起点 */
  start: Point;
  /** 边的终点 */
  end: Point;
}

/**
 * 边元素接口（包含值的包装对象）
 */
interface EdgeElement {
  /** 边的实际值（线段） */
  value: Segment;
}