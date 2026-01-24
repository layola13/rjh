import { WinPolygon, PolygonCreator } from './polygon';
import { Frametify } from './frametify';
import { EdgeJointWay } from './edge-joint';
import Segment from './segment';

/**
 * 耳型窗框架化处理类（类型2）
 * 用于将耳型窗多边形转换为框架结构，处理内部多边形和条形框架的生成
 */
export declare class Ear2Frametify extends Frametify {
  /**
   * 当前处理的多边形对象
   */
  poly: WinPolygon;

  /**
   * 内部多边形数组缓存
   * @private
   */
  private _innerPolygons: WinPolygon[];

  /**
   * 构造函数
   * @param polygon - 需要框架化的窗多边形
   */
  constructor(polygon: WinPolygon);

  /**
   * 生成内部多边形集合
   * 根据输入的边距数组，生成三个内部多边形并设置其位置属性
   * @param margins - 各边的边距数组
   * @returns 包含三个内部多边形的数组 [inner0, inner1, inner2]
   */
  innerPolygons(margins: number[]): WinPolygon[];

  /**
   * 生成条形框架多边形
   * 基于外部边缘和内部多边形边缘创建框架条
   * @param margins - 各边的边距数组
   * @param jointWays - 边缘连接方式数组
   * @returns 框架条的边缘数组
   */
  barPolygons(margins: number[], jointWays: EdgeJointWay[]): Segment[];

  /**
   * 生成第一个内部多边形（索引0）
   * 基于原始多边形的特定边缘点创建
   * @param margins - 各边的边距数组
   * @returns 第一个内部多边形
   */
  inner0Polygon(margins: number[]): WinPolygon;

  /**
   * 生成第二个内部多边形（索引1）
   * 基于原始多边形的特定边缘点创建
   * @param margins - 各边的边距数组
   * @returns 第二个内部多边形
   */
  inner1Polygon(margins: number[]): WinPolygon;

  /**
   * 生成第三个内部多边形（索引2）
   * 基于原始多边形的特定边缘点创建
   * @param margins - 各边的边距数组
   * @returns 第三个内部多边形
   */
  inner2Polygon(margins: number[]): WinPolygon;

  /**
   * 查找内部多边形
   * 根据给定的多边形和边距计算平行边缘并生成新的内部多边形
   * @param polygon - 基准多边形
   * @param margins - 各边的边距数组
   * @returns 计算后的内部多边形
   */
  findInnerPoly(polygon: WinPolygon, margins: number[]): WinPolygon;
}