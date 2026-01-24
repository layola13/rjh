/**
 * 表示三角剖分中的一个三角形
 * Triangle class for Delaunay triangulation (poly2tri)
 */
declare class Triangle {
  /**
   * 三角形的三个顶点
   * The three vertices of the triangle
   */
  private points_: [Point, Point, Point];

  /**
   * 三角形的三个相邻三角形（每条边对应一个邻居）
   * The three neighboring triangles (one per edge)
   */
  private neighbors_: [Triangle | null, Triangle | null, Triangle | null];

  /**
   * 标记三角形是否在多边形内部
   * Flag indicating if the triangle is inside the polygon
   */
  private interior_: boolean;

  /**
   * 标记每条边是否为约束边
   * Flags indicating which edges are constrained
   */
  private constrained_edge: [boolean, boolean, boolean];

  /**
   * 标记每条边是否为Delaunay边
   * Flags indicating which edges are Delaunay edges
   */
  private delaunay_edge: [boolean, boolean, boolean];

  /**
   * 构造一个三角形
   * @param pointA - 第一个顶点
   * @param pointB - 第二个顶点
   * @param pointC - 第三个顶点
   */
  constructor(pointA: Point, pointB: Point, pointC: Point);

  /**
   * 返回三角形的字符串表示
   * @returns 格式化的三角形字符串
   */
  toString(): string;

  /**
   * 获取指定索引的顶点
   * @param index - 顶点索引 (0, 1, 或 2)
   * @returns 对应的顶点
   */
  getPoint(index: number): Point;
  GetPoint(index: number): Point; // 别名

  /**
   * 获取所有顶点
   * @returns 包含三个顶点的数组
   */
  getPoints(): [Point, Point, Point];

  /**
   * 获取指定索引的相邻三角形
   * @param index - 邻居索引 (0, 1, 或 2)
   * @returns 相邻三角形或null
   */
  getNeighbor(index: number): Triangle | null;

  /**
   * 检查三角形是否包含指定顶点
   * @param point - 要检查的顶点
   * @returns 如果包含返回true
   */
  containsPoint(point: Point): boolean;

  /**
   * 检查三角形是否包含指定边
   * @param edge - 要检查的边
   * @returns 如果包含返回true
   */
  containsEdge(edge: Edge): boolean;

  /**
   * 检查三角形是否同时包含两个顶点
   * @param pointA - 第一个顶点
   * @param pointB - 第二个顶点
   * @returns 如果同时包含返回true
   */
  containsPoints(pointA: Point, pointB: Point): boolean;

  /**
   * 检查三角形是否在多边形内部
   * @returns 如果在内部返回true
   */
  isInterior(): boolean;

  /**
   * 设置三角形的内部标记
   * @param isInterior - 是否在内部
   * @returns 当前三角形实例（支持链式调用）
   */
  setInterior(isInterior: boolean): this;

  /**
   * 标记相邻三角形的指针关系
   * @param pointA - 共享边的第一个顶点
   * @param pointB - 共享边的第二个顶点
   * @param neighbor - 相邻的三角形
   */
  markNeighborPointers(pointA: Point, pointB: Point, neighbor: Triangle): void;

  /**
   * 标记相邻三角形（自动确定共享边）
   * @param neighbor - 相邻的三角形
   */
  markNeighbor(neighbor: Triangle): void;

  /**
   * 清除所有相邻三角形的引用
   */
  clearNeighbors(): void;

  /**
   * 清除所有Delaunay边标记
   */
  clearDelaunayEdges(): void;

  /**
   * 获取指定顶点的顺时针方向下一个顶点
   * @param point - 参考顶点
   * @returns 顺时针方向的下一个顶点
   */
  pointCW(point: Point): Point | null;

  /**
   * 获取指定顶点的逆时针方向下一个顶点
   * @param point - 参考顶点
   * @returns 逆时针方向的下一个顶点
   */
  pointCCW(point: Point): Point | null;

  /**
   * 获取指定顶点的顺时针方向相邻三角形
   * @param point - 参考顶点
   * @returns 顺时针方向的相邻三角形
   */
  neighborCW(point: Point): Triangle | null;

  /**
   * 获取指定顶点的逆时针方向相邻三角形
   * @param point - 参考顶点
   * @returns 逆时针方向的相邻三角形
   */
  neighborCCW(point: Point): Triangle | null;

  /**
   * 获取指定顶点顺时针方向的约束边状态
   * @param point - 参考顶点
   * @returns 该边是否为约束边
   */
  getConstrainedEdgeCW(point: Point): boolean;

  /**
   * 获取指定顶点逆时针方向的约束边状态
   * @param point - 参考顶点
   * @returns 该边是否为约束边
   */
  getConstrainedEdgeCCW(point: Point): boolean;

  /**
   * 获取指定顶点对面的约束边状态
   * @param point - 参考顶点
   * @returns 对面的边是否为约束边
   */
  getConstrainedEdgeAcross(point: Point): boolean;

  /**
   * 设置指定顶点顺时针方向的约束边状态
   * @param point - 参考顶点
   * @param isConstrained - 是否为约束边
   */
  setConstrainedEdgeCW(point: Point, isConstrained: boolean): void;

  /**
   * 设置指定顶点逆时针方向的约束边状态
   * @param point - 参考顶点
   * @param isConstrained - 是否为约束边
   */
  setConstrainedEdgeCCW(point: Point, isConstrained: boolean): void;

  /**
   * 获取指定顶点顺时针方向的Delaunay边状态
   * @param point - 参考顶点
   * @returns 该边是否为Delaunay边
   */
  getDelaunayEdgeCW(point: Point): boolean;

  /**
   * 获取指定顶点逆时针方向的Delaunay边状态
   * @param point - 参考顶点
   * @returns 该边是否为Delaunay边
   */
  getDelaunayEdgeCCW(point: Point): boolean;

  /**
   * 设置指定顶点顺时针方向的Delaunay边状态
   * @param point - 参考顶点
   * @param isDelaunay - 是否为Delaunay边
   */
  setDelaunayEdgeCW(point: Point, isDelaunay: boolean): void;

  /**
   * 设置指定顶点逆时针方向的Delaunay边状态
   * @param point - 参考顶点
   * @param isDelaunay - 是否为Delaunay边
   */
  setDelaunayEdgeCCW(point: Point, isDelaunay: boolean): void;

  /**
   * 获取指定顶点对面的相邻三角形
   * @param point - 参考顶点
   * @returns 对面的相邻三角形
   */
  neighborAcross(point: Point): Triangle | null;

  /**
   * 获取相对于另一个三角形和共享顶点的对立顶点
   * @param triangle - 相邻三角形
   * @param point - 共享顶点
   * @returns 对立的顶点
   */
  oppositePoint(triangle: Triangle, point: Point): Point;

  /**
   * 合法化三角形（边翻转操作中使用）
   * @param originalPoint - 原始顶点
   * @param newPoint - 新顶点
   */
  legalize(originalPoint: Point, newPoint: Point): void;

  /**
   * 获取指定顶点的索引
   * @param point - 要查找的顶点
   * @returns 顶点索引 (0, 1, 或 2)
   * @throws 如果顶点不在三角形中
   */
  index(point: Point): number;

  /**
   * 获取由两个顶点确定的边的索引
   * @param pointA - 第一个顶点
   * @param pointB - 第二个顶点
   * @returns 边的索引 (0, 1, 2) 或 -1（如果边不存在）
   */
  edgeIndex(pointA: Point, pointB: Point): number;

  /**
   * 通过索引标记约束边
   * @param index - 边索引 (0, 1, 或 2)
   */
  markConstrainedEdgeByIndex(index: number): void;

  /**
   * 通过边对象标记约束边
   * @param edge - 边对象
   */
  markConstrainedEdgeByEdge(edge: Edge): void;

  /**
   * 通过两个顶点标记约束边
   * @param pointA - 第一个顶点
   * @param pointB - 第二个顶点
   */
  markConstrainedEdgeByPoints(pointA: Point, pointB: Point): void;
}

/**
 * 表示二维空间中的一个点
 * Represents a point in 2D space
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 表示由两个顶点定义的边
 * Represents an edge defined by two points
 */
interface Edge {
  /** 边的起点 */
  p: Point;
  /** 边的终点 */
  q: Point;
}

export = Triangle;