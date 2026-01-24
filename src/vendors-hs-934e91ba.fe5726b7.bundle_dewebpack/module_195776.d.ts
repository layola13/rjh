/**
 * 空间索引网格系统，用于快速查找二维空间中的点
 * 通过将空间划分为单元格网格来优化范围查询性能
 */

/**
 * 二维坐标点类型 [x, y]
 */
export type Point = [number, number];

/**
 * 边界框类型 [minX, minY, maxX, maxY]
 */
export type BoundingBox = [number, number, number, number];

/**
 * 单元格坐标类型
 */
export type CellCoordinate = number;

/**
 * 空间网格索引类
 * 将点集合组织到网格单元中以实现高效的空间查询
 */
export declare class SpatialGrid {
  /**
   * 二维网格数组，存储每个单元格中的点
   * @private
   */
  private _cells: Point[][][];

  /**
   * 单元格大小
   * @private
   */
  private _cellSize: number;

  /**
   * 单元格大小的倒数，用于优化除法运算
   * @private
   */
  private _reverseCellSize: number;

  /**
   * 创建空间网格索引
   * @param points - 要索引的点数组
   * @param cellSize - 单元格的大小（空间单位）
   */
  constructor(points: Point[], cellSize: number);

  /**
   * 获取指定单元格中的所有点
   * @param cellX - 单元格X坐标
   * @param cellY - 单元格Y坐标
   * @returns 该单元格中的点数组，如果单元格为空则返回空数组
   */
  cellPoints(cellX: CellCoordinate, cellY: CellCoordinate): Point[];

  /**
   * 获取边界框范围内的所有点
   * @param bbox - 边界框 [minX, minY, maxX, maxY]
   * @returns 范围内的所有点数组
   */
  rangePoints(bbox: BoundingBox): Point[];

  /**
   * 从网格中移除指定点
   * @param point - 要移除的点
   * @returns 移除点后该单元格剩余的点数组
   */
  removePoint(point: Point): Point[];

  /**
   * Math.trunc的polyfill实现
   * 截断数字的小数部分
   * @param value - 要截断的数值
   * @returns 截断后的整数部分
   */
  trunc(value: number): number;

  /**
   * 将空间坐标转换为单元格编号
   * @param coordinate - 空间坐标值
   * @returns 对应的单元格编号
   */
  coordToCellNum(coordinate: number): CellCoordinate;

  /**
   * 扩展边界框
   * @param bbox - 原始边界框
   * @param buffer - 扩展的单元格数量
   * @returns 扩展后的边界框
   */
  extendBbox(bbox: BoundingBox, buffer: number): BoundingBox;
}

/**
 * 创建空间网格索引的工厂函数
 * @param points - 要索引的点数组
 * @param cellSize - 单元格大小
 * @returns 空间网格索引实例
 */
export default function createSpatialGrid(
  points: Point[],
  cellSize: number
): SpatialGrid;