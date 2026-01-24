/**
 * 多边形分割工具模块
 * 提供多种方式将多边形分割成多个子多边形
 */

import type { Point, Vector, Line, Polygon, Box } from './geometry';
import type { SplitterLine } from './splitter';

/**
 * 分割方向枚举
 */
export type PartitionDirection = 'vertical' | 'horizontal';

/**
 * 线数组元素类型
 * 可以包含1条或2条分割线
 */
export type LineArrayElement = [Line] | [Line, Line];

/**
 * 多边形分割器类
 * 用于将多边形按不同策略分割成多个子多边形
 */
export declare class Partition {
  /**
   * 待分割的多边形
   */
  readonly poly: Polygon;

  /**
   * 分割方向标志
   * true: 垂直方向（竖直分割）
   * false: 水平方向（横向分割）
   */
  readonly vdir: boolean;

  /**
   * 构造函数
   * @param poly - 待分割的多边形对象
   * @param vdir - 分割方向，默认为true（垂直分割）
   */
  constructor(poly: Polygon, vdir?: boolean);

  /**
   * 均匀分割多边形
   * 根据指定数量将多边形均匀分割成多个子多边形
   * 
   * @param count - 分割数量（生成的子多边形数量）
   * @returns 分割后的多边形数组，若count<=1则返回原多边形
   * 
   * @example
   * const partition = new Partition(polygon, true);
   * const parts = partition.run(4); // 垂直分割成4份
   */
  run(count: number): Polygon[];

  /**
   * 使用单条线分割多边形
   * 
   * @param line - 分割线
   * @returns 分割后的两个多边形数组
   * 
   * @example
   * const parts = partition.runTwo(splitLine);
   */
  runTwo(line: Line): [Polygon, Polygon];

  /**
   * 使用多条分割线数组分割多边形
   * 支持复杂的分割模式，每个元素可包含1条或2条线
   * 
   * @param lineArray - 分割线数组，每个元素为包含1或2条线的数组
   * @param leftSide - 多边形相对于分割线的位置标志，默认为true
   * @returns 分割后的多边形数组
   * @throws {Error} 当lineArray为空或元素格式不正确时抛出异常
   * 
   * @remarks
   * - lineArray不能为空
   * - 每个元素必须包含1条或2条线
   * - 只有首尾元素可以包含单条线
   * 
   * @example
   * const lines: LineArrayElement[] = [
   *   [line1, line2],
   *   [line3, line4],
   *   [line5]
   * ];
   * const parts = partition.runByLines(lines, true);
   */
  runByLines(lineArray: LineArrayElement[], leftSide?: boolean): Polygon[];

  /**
   * 判断多边形的某些顶点是否在线的左侧
   * 
   * @param polygon - 待检测的多边形
   * @param line - 参考线
   * @returns 如果多边形至少有一个顶点在线左侧则返回true
   * 
   * @internal
   */
  private polygonSomeLeftToLine(polygon: Polygon, line: Line): boolean;

  /**
   * 使用两条线顺序分割多边形
   * 先用第一条线分割，再用第二条线分割中间部分
   * 
   * @param polygon - 待分割的多边形
   * @param firstLine - 第一条分割线
   * @param secondLine - 第二条分割线
   * @returns 分割出的中间部分多边形
   * 
   * @internal
   */
  private runByTwoLines(
    polygon: Polygon,
    firstLine: Line,
    secondLine: Line
  ): Polygon;
}