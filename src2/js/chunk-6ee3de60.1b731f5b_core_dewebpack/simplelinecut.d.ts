/**
 * 简单线切割模块
 * 用于将多边形沿指定线进行切割和分割操作
 */

import Paper from 'paper';
import { Frametify } from './frametify';
import { SimpleLine, ShapeElement, Splitter, Polygon, PointCut } from './geometry-utils';

/**
 * 简单线切割类
 * 提供多边形的线性切割、平行边查找和分割功能
 */
export declare class SimpleLineCut {
  /**
   * 要切割的多边形
   */
  polygon: Polygon;

  /**
   * 切割线
   */
  sline: SimpleLine;

  /**
   * 分割后的多边形元素集合
   */
  splitPoly: ShapeElement[];

  /**
   * 位于切割线上的边集合
   */
  edgesOnLine: ShapeElement[];

  /**
   * 构造函数
   * @param polygon - 要切割的多边形
   * @param sline - 用于切割的简单线
   */
  constructor(polygon: Polygon, sline: SimpleLine);

  /**
   * 查找与切割线平行的边
   * @param offset - 偏移距离，用于确定平行边的位置
   * @returns 返回两条平行线，分别位于切割线的两侧
   */
  findParallelEdges(offset: number): [SimpleLine, SimpleLine];

  /**
   * 执行切割操作
   * 将多边形沿平行边进行分割，并处理中梃（mullion）区域
   * @param offset - 切割偏移距离
   * @returns 返回切割后的多边形数组
   */
  split(offset: number): Polygon[];

  /**
   * 创建中梃区域
   * 在两条平行线之间创建中梃结构
   * @param polygon - 包含中梃的多边形
   * @param line1 - 第一条平行线
   * @param line2 - 第二条平行线
   * @returns 返回创建的中梃多边形数组
   */
  createMullion(polygon: Polygon, line1: SimpleLine, line2: SimpleLine): Polygon[];

  /**
   * 创建桥接边
   * 在两个形状元素之间创建连接桥
   * @param elements - 形状元素数组
   * @param start - 起始形状元素
   * @param end - 结束形状元素
   */
  createBridge(elements: ShapeElement[], start: ShapeElement, end: ShapeElement): void;

  /**
   * 内部切割方法
   * 使用线段对多边形进行实际切割操作
   * @param polygon - 要切割的多边形
   * @param line - 切割线
   * @returns 返回切割后的多边形数组
   * @private
   */
  _split(polygon: Polygon, line: SimpleLine): Polygon[];

  /**
   * 链接边缘
   * 在交点之间创建边的双向链接
   * @param startPoint - 起始交点
   * @param endPoint - 结束交点
   * @param line - 切割线
   * @returns 返回链接后的多边形数组
   */
  linkEdges(startPoint: Paper.Point, endPoint: Paper.Point, line: SimpleLine): Polygon[];
}

/**
 * 多边形接口
 * 表示一个可被切割的多边形结构
 */
export interface Polygon {
  /**
   * 多边形的边集合
   */
  edges: ShapeElement[];

  /**
   * 多边形标识信息
   */
  polyId: PolyId;

  /**
   * 是否为中梃区域
   */
  IsMullion: boolean;

  /**
   * 关联的切割线
   */
  spLine?: {
    line: SimpleLine;
    innerEdgeIdx?: number;
  };

  /**
   * 判断点是否在多边形内
   * @param point - 要判断的点
   */
  contains(point: Paper.Point): boolean;

  /**
   * 检查并标记是否为中梃
   * @param line - 参考线
   */
  checkMullion(line: SimpleLine | Paper.Segment): void;
}

/**
 * 多边形标识接口
 * 用于追踪多边形的位置和方向信息
 */
export interface PolyId {
  /**
   * 克隆标识
   */
  clone(): PolyId;

  /**
   * 根据边的位置设置方向
   * @param position - 位置信息
   */
  posBySide(position: number): void;
}