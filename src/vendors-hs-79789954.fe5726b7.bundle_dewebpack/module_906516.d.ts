/**
 * 基于 R-tree 的空间索引结构，用于高效的线段查询
 * 通过将线段分割为多个矩形包围盒来支持范围搜索和点查询
 */

/**
 * 二维点坐标
 */
export interface Point {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
}

/**
 * 线段对象，包含起点和终点
 */
export interface LineSegment {
  /** 线段起点 */
  start: Point;
  /** 线段终点 */
  end: Point;
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * 矩形包围盒（AABB）
 */
export interface BoundingBox {
  /** 最小 X 坐标 */
  minX: number;
  /** 最小 Y 坐标 */
  minY: number;
  /** 最大 X 坐标 */
  maxX: number;
  /** 最大 Y 坐标 */
  maxY: number;
}

/**
 * 带对象引用的包围盒，用于 R-tree 内部存储
 */
export interface BoundingBoxWithObject extends BoundingBox {
  /** 关联的原始线段对象 */
  obj: LineSegment;
}

/**
 * 空间索引构建选项
 */
export interface SpatialIndexOptions {
  /**
   * 线段分割数量，将每条线段分割为多少个子矩形
   * @default 4
   */
  splitCount?: number;
}

/**
 * R-tree 实例接口
 */
export interface RTree {
  /** 批量加载数据到 R-tree */
  load(items: BoundingBoxWithObject[]): void;
  /** 在指定范围内搜索 */
  search(bbox: BoundingBox): BoundingBoxWithObject[];
}

/**
 * 线段空间索引类
 * 使用 R-tree 数据结构实现高效的线段空间查询
 */
export default class SpatialIndex {
  /**
   * R-tree 实例，用于存储和查询空间数据
   */
  private rtree?: RTree;

  /**
   * 索引配置选项
   */
  private option?: SpatialIndexOptions;

  /**
   * 构建空间索引
   * @param lines - 待索引的线段数组
   * @param options - 索引构建选项
   */
  build(lines: LineSegment[], options?: SpatialIndexOptions): void;

  /**
   * 向已构建的索引中插入新线段
   * @param lines - 待插入的线段数组
   * @returns 是否插入成功，若索引未初始化则返回 false
   */
  insert(lines: LineSegment[]): boolean;

  /**
   * 在指定点周围搜索线段
   * @param point - 查询中心点
   * @param radius - 搜索半径
   * @returns 查询范围内的线段数组
   */
  searchAtPoint(point: Point, radius: number): LineSegment[];

  /**
   * 在指定矩形范围内搜索线段
   * @param bbox - 查询的矩形包围盒
   * @returns 查询范围内的线段数组（已去重）
   */
  searchInRange(bbox: BoundingBox): LineSegment[];

  /**
   * 计算两点之间的欧几里得距离
   * @param p1 - 第一个点
   * @param p2 - 第二个点
   * @returns 两点间的距离
   * @private
   */
  private _calcLength(p1: Point, p2: Point): number;

  /**
   * 将线段分割为多个矩形包围盒
   * @param line - 待分割的线段
   * @param splitCount - 分割数量
   * @returns 包围盒数组
   * @private
   */
  private _breakLineToRects(
    line: LineSegment,
    splitCount: number
  ): BoundingBoxWithObject[];
}