/**
 * EarFrametify 模块类型定义
 * 提供耳朵形状框架化处理功能
 */

import { Frametify } from './Frametify';
import { WinPolygon, PolygonCreator, PolyId } from './polygon';
import { EdgeJointWay, Dock, Segment } from './edge';

/**
 * 耳朵形状框架化处理类
 * 继承自 Frametify，专门处理耳朵形状的多边形框架化
 */
export declare class EarFrametify extends Frametify {
  /**
   * 原始多边形对象
   */
  readonly poly: WinPolygon;

  /**
   * 内部多边形缓存数组
   * @private
   */
  private _innerPolygons: WinPolygon[];

  /**
   * 构造函数
   * @param poly - 待处理的窗口多边形对象
   */
  constructor(poly: WinPolygon);

  /**
   * 生成内部多边形集合
   * @param offsets - 偏移量数组，用于计算内部多边形边界
   * @returns 返回包含两个内部多边形的数组 [inner0, inner1]
   */
  innerPolygons(offsets: number[]): [WinPolygon, WinPolygon];

  /**
   * 生成第一个内部多边形（区域0）
   * 基于原始多边形的边 0 和边 2 构建
   * @param offsets - 偏移量数组
   * @returns 第一个内部多边形对象
   */
  inner0Polygon(offsets: number[]): WinPolygon;

  /**
   * 生成第二个内部多边形（区域1）
   * 基于原始多边形的边 4、5 和边 0 构建
   * @param offsets - 偏移量数组
   * @returns 第二个内部多边形对象
   */
  inner1Polygon(offsets: number[]): WinPolygon;

  /**
   * 查找平行内部多边形
   * @param polygon - 基准多边形
   * @param offsets - 各边的偏移距离数组
   * @returns 计算得到的内部多边形
   */
  findInnerPoly(polygon: WinPolygon, offsets: number[]): WinPolygon;

  /**
   * 生成框架条多边形集合
   * @param innerOffsets - 内部偏移量数组
   * @param jointWays - 边连接方式数组，指定各边的连接策略
   * @returns 框架条边数组（第7条边和可能的第2条边会被标记为虚拟边）
   */
  barPolygons(innerOffsets: number[], jointWays: EdgeJointWay[]): Segment[];

  /**
   * 静态方法：查找平行边集合
   * @param edges - 源边数组
   * @param offsets - 偏移量数组
   * @param inward - 是否向内偏移
   * @param orientation - 多边形方向
   * @param parallel - 是否保持平行
   * @returns 处理后的边数组
   * @static
   * @inherited
   */
  static findParallelEdges(
    edges: Segment[],
    offsets: number[],
    inward: boolean,
    orientation: number,
    parallel: boolean
  ): Segment[];
}