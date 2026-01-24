/**
 * 多边形几何计算工具库
 * 提供多边形法线计算、面积计算、点包含检测、边界框计算等功能
 */

import * as THREE from 'three';

/**
 * 表示2D点的接口
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 表示3D点的接口
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 扩展的THREE.Plane，包含额外的射线方向信息
 */
export interface ExtendedPlane extends THREE.Plane {
  /** X轴射线方向 */
  xRay?: THREE.Vector3;
}

/**
 * 边界框的范围信息
 */
export interface BoundingBoxSquare {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
  minZ: number;
  maxZ: number;
}

/**
 * 2D边界框信息
 */
export interface BoundingBox2D {
  /** 边界框范围 */
  square: BoundingBoxSquare;
  /** 中心点 */
  center: Point2D;
  /** 面积 */
  area: number;
  /** 左上角点 */
  lefttop: Point2D;
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
}

/**
 * 3D边界框信息
 */
export interface BoundingBox3D {
  /** 边界框范围 */
  square: BoundingBoxSquare;
  /** 中心点 */
  center: Point3D;
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
  /** Z方向尺寸 */
  ZSize: number;
}

/**
 * Clipper库中的点格式
 */
export interface ClipperPoint {
  X: number;
  Y: number;
}

/**
 * 圆形路径生成结果
 */
export interface CirclePathResult {
  /** 路径点集合 */
  points: THREE.Vector3[];
  /** 平滑数据 */
  smoothDatas?: THREE.Vector3[][];
}

/**
 * 圆角路径生成结果
 */
export interface FilletPathResult {
  /** 路径点集合 */
  points: THREE.Vector3[];
}

/**
 * 获取多边形的法向量
 * @param polygon - 多边形顶点数组
 * @returns 法向量，如果无法计算则返回undefined
 */
export function getPolygonNormal(polygon: THREE.Vector3[]): THREE.Vector3 | undefined;

/**
 * 从多边形获取平面
 * @param polygon - 多边形顶点数组
 * @param checkCounterClockwise - 是否检查逆时针方向，默认true
 * @returns 扩展的平面对象，如果无法计算则返回undefined
 */
export function getPlaneFromPolygon(
  polygon: THREE.Vector3[],
  checkCounterClockwise?: boolean
): ExtendedPlane | undefined;

/**
 * 从多边形中获取三个合格的非共线点
 * @param polygon - 多边形顶点数组
 * @returns 三个点的数组，如果找不到则返回undefined
 * @internal
 */
export function _getThreeQualifiedPoints(
  polygon: THREE.Vector3[]
): [THREE.Vector3, THREE.Vector3, THREE.Vector3] | undefined;

/**
 * 计算2D多边形的有向面积（使用鞋带公式）
 * @param polygon - 2D多边形顶点数组
 * @returns 面积值，逆时针为正，顺时针为负
 */
export function getArea(polygon: Point2D[]): number;

/**
 * 判断多边形顶点是否按逆时针排列
 * @param polygon - 2D多边形顶点数组
 * @returns 逆时针返回true，否则返回false
 */
export function isCounterClockwise(polygon: Point2D[]): boolean;

/**
 * 判断点是否在多边形内部（使用射线投射算法）
 * @param point - 待检测的点
 * @param polygon - 多边形顶点数组
 * @param tolerance - 容差值
 * @returns 1表示内部，0表示外部，-1表示在边界上
 */
export function pointInPolygon(
  point: Point2D,
  polygon: Point2D[],
  tolerance?: number
): 0 | 1 | -1;

/**
 * 查找多边形上距离给定点最近的点
 * @param point - 参考点
 * @param polygon - 多边形顶点数组
 * @returns 最近的点
 */
export function closestPointToPolygon(
  point: THREE.Vector3 | Point3D,
  polygon: (THREE.Vector3 | Point3D)[]
): THREE.Vector3 | undefined;

/**
 * 计算2D多边形的轴对齐边界框
 * @param polygon - 2D多边形顶点数组
 * @returns 边界框信息，如果多边形无效则返回undefined
 */
export function getPolygonBoundingBox(polygon: Point2D[]): BoundingBox2D | undefined;

/**
 * 简化多边形（使用Clipper库）
 * @param polygons - 多边形数组的数组
 * @returns 简化后的多边形数组
 */
export function SimplifyPolygons(polygons: Point2D[][]): Point2D[][];

/**
 * 计算3D多边形的轴对齐边界框
 * @param polygon - 3D多边形顶点数组
 * @returns 边界框信息，如果多边形无效则返回undefined
 */
export function getPolygonBoundingBox3d(polygon: Point3D[]): BoundingBox3D | undefined;

/**
 * 将3D路径投影到2D平面
 * @param plane - 扩展的平面对象
 * @param paths - 3D路径数组
 * @returns 投影后的2D路径数组
 */
export function projection2DPaths(
  plane: ExtendedPlane,
  paths: THREE.Vector3[][]
): THREE.Vector3[][];

/**
 * 判断射线是否与多边形相交
 * @param ray - 射线
 * @param polygon - 多边形顶点数组
 * @returns 相交返回true，否则返回false
 */
export function isRayIntersectPolygon(ray: THREE.Ray, polygon: THREE.Vector3[]): boolean;

/**
 * 判断一个2D多边形是否完全包含在另一个2D多边形内
 * @param innerPolygon - 内部多边形
 * @param outerPolygon - 外部多边形
 * @returns 完全包含返回true，否则返回false
 */
export function isPolygon2DInPolygon2D(
  innerPolygon: Point2D[],
  outerPolygon: Point2D[]
): boolean;

/**
 * 创建椭圆路径
 * @param center - 椭圆中心点
 * @param plane - 椭圆所在平面
 * @param semiMajorAxis - 半长轴
 * @param semiMinorAxis - 半短轴
 * @param segments - 分段数，默认16
 * @returns 圆形路径结果
 */
export function createCirclePath(
  center: THREE.Vector3,
  plane: ExtendedPlane,
  semiMajorAxis: number,
  semiMinorAxis: number,
  segments?: number
): CirclePathResult;

/**
 * 判断点是否在2D多边形内（射线投射法）
 * @param point - 待检测的点
 * @param polygon - 多边形顶点数组
 * @returns 在内部返回true，否则返回false
 */
export function isPointInPolygon2D(point: Point2D, polygon: Point2D[]): boolean;

/**
 * 从3D路径生成圆角路径
 * @param path - 3D路径顶点数组
 * @param plane - 路径所在平面
 * @param filletRadius - 圆角半径
 * @returns 圆角路径结果
 */
export function getFilletPathFromPath3d(
  path: THREE.Vector3[],
  plane?: ExtendedPlane,
  filletRadius?: number
): FilletPathResult;