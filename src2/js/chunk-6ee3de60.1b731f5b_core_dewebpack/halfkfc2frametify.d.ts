/**
 * HalfKfc2Frametify 模块
 * 用于处理半KFC2型窗框的几何变换和多边形生成
 */

import { Segment } from './geometry';
import { Frametify } from './frametify';
import { EdgeJointWay, Dock } from './edge-types';
import { WinPolygon, PolygonCreator } from './polygon';

/**
 * 半KFC2型窗框转换器
 * 继承自 Frametify 基类，用于生成内部多边形和框条多边形
 */
export declare class HalfKfc2Frametify extends Frametify {
  /**
   * 输入的窗框多边形
   */
  readonly poly: WinPolygon;

  /**
   * 缓存的内部多边形数组
   * @private
   */
  private _innerPolygons: WinPolygon[];

  /**
   * 构造函数
   * @param poly - 窗框多边形对象
   */
  constructor(poly: WinPolygon);

  /**
   * 生成内部多边形集合
   * 包含三个内部区域的多边形，分别对应不同的窗格区域
   * @param offsets - 偏移量数组，用于控制内部多边形的尺寸
   * @returns 包含三个内部多边形的数组 [inner0, inner1, inner2]
   */
  innerPolygons(offsets: number[]): [WinPolygon, WinPolygon, WinPolygon];

  /**
   * 生成框条多边形
   * 基于外部边缘和内部多边形边缘创建框条结构
   * @param edgeOffsets - 边缘偏移量数组
   * @param jointWays - 边缘连接方式数组
   * @returns 生成的框条多边形
   */
  barPolygons(edgeOffsets: number[], jointWays: EdgeJointWay[]): WinPolygon;

  /**
   * 生成第0个内部多边形（左下区域）
   * @param offsets - 偏移量数组
   * @returns 第0个内部多边形，其第4条边的停靠设置为None
   */
  inner0Polygon(offsets: number[]): WinPolygon;

  /**
   * 生成第1个内部多边形（上部区域）
   * @param offsets - 偏移量数组
   * @returns 第1个内部多边形
   */
  inner1Polygon(offsets: number[]): WinPolygon;

  /**
   * 生成第2个内部多边形（右下区域）
   * @param offsets - 偏移量数组
   * @returns 第2个内部多边形
   */
  inner2Polygon(offsets: number[]): WinPolygon;

  /**
   * 根据外部多边形和偏移量查找内部多边形
   * @param outerPoly - 外部多边形
   * @param offsets - 偏移量数组
   * @returns 计算得到的内部多边形
   */
  protected findInnerPoly(outerPoly: WinPolygon, offsets: number[]): WinPolygon;
}