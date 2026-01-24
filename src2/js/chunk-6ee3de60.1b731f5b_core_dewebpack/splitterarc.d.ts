import { Arc, Line, Vector } from '@flatten-js/core';
import { Splitter, PointCut, ShapeElement } from './types';

/**
 * 弧形分割器
 * 用于处理圆弧形状的分割操作，继承自基础分割器类
 */
export class SplitterArc extends Splitter {
  /** 待分割的多边形对象 */
  protected poly: any;
  
  /** 分割线对象 */
  protected splitLine: any;

  /**
   * 创建弧形分割器实例
   * @param poly - 待分割的多边形对象
   * @param splitLine - 用于分割的线对象
   */
  constructor(poly: any, splitLine: any);

  /**
   * 生成竖梃线（窗框分隔条）
   * 根据给定的圆弧和偏移量，生成内外两条平行的圆弧
   * @param arc - 原始圆弧对象
   * @param offset - 偏移距离
   * @returns 返回包含两条圆弧的数组：[内圆弧, 外圆弧]
   */
  genMullionLine(arc: Arc, offset: number): [Arc, Arc];

  /**
   * 分割边缘
   * 使用分割线对多边形的边缘进行切割
   * @param geometry - 几何图形对象
   * @param splitLine - 分割线对象
   */
  splitEdges(geometry: any, splitLine: any): void;

  /**
   * 对边缘进行排序
   * 根据边缘到分割线的距离进行排序
   * @param edge - 需要排序的边缘对象
   */
  sortEdges(edge: { start: any; end: any }): void;

  /**
   * 创建分割后的形状元素对象
   * @param startEdge - 起始边缘对象
   * @param endEdge - 结束边缘对象
   * @param arc - 圆弧对象
   * @returns 返回新创建的形状元素
   */
  createObj(
    startEdge: { value: { start: any } }, 
    endEdge: { value: { start: any } }, 
    arc: Arc
  ): ShapeElement;
}