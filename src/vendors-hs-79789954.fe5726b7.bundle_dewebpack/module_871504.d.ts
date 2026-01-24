/**
 * 三维空间点接口
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 二维平面点接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 距离计算函数类型
 */
type DistanceFunction<T> = (point1: T, point2: T) => number;

/**
 * 空间索引构造器类型（从模块553516导入）
 */
declare class SpatialIndex<T> {
  constructor(
    points: T[],
    distanceFunction: DistanceFunction<T>,
    dimensions: string[]
  );
}

/**
 * 距离计算工具模块
 * 提供2D和3D空间中点之间的距离计算以及空间索引创建功能
 */
declare const DistanceUtils: {
  /**
   * 计算两个三维点之间的距离平方
   * @param point1 - 第一个三维点
   * @param point2 - 第二个三维点
   * @returns 距离的平方值
   */
  distance3dSqaure(point1: Point3D, point2: Point3D): number;

  /**
   * 计算两个三维点之间的欧几里得距离
   * @param point1 - 第一个三维点
   * @param point2 - 第二个三维点
   * @returns 欧几里得距离
   */
  distance3d(point1: Point3D, point2: Point3D): number;

  /**
   * 计算两个二维点之间的距离平方
   * @param point1 - 第一个二维点
   * @param point2 - 第二个二维点
   * @returns 距离的平方值
   */
  distance2dSqaure(point1: Point2D, point2: Point2D): number;

  /**
   * 计算两个二维点之间的欧几里得距离
   * @param point1 - 第一个二维点
   * @param point2 - 第二个二维点
   * @returns 欧几里得距离
   */
  distance2d(point1: Point2D, point2: Point2D): number;

  /**
   * 为三维顶点数组创建空间索引
   * @param vertices - 三维顶点数组
   * @param distanceFunction - 可选的自定义距离计算函数，默认使用distance3d
   * @returns 三维空间索引实例
   */
  createFor3dVertices(
    vertices: Point3D[],
    distanceFunction?: DistanceFunction<Point3D>
  ): SpatialIndex<Point3D>;

  /**
   * 为二维顶点数组创建空间索引
   * @param vertices - 二维顶点数组
   * @param distanceFunction - 可选的自定义距离计算函数，默认使用distance2d
   * @returns 二维空间索引实例
   */
  createFor2dVertices(
    vertices: Point2D[],
    distanceFunction?: DistanceFunction<Point2D>
  ): SpatialIndex<Point2D>;
};

export = DistanceUtils;