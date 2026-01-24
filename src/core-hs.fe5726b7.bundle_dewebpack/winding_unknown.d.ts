/**
 * 多边形缠绕方向和几何计算工具模块
 * 提供多边形方向判断、面积计算、三角化、布尔运算等功能
 */

/** 缠绕方向未知 */
export const WINDING_UNKNOWN = 0;

/** 逆时针缠绕方向 (Counter-Clockwise) */
export const WINDING_CCW = 1;

/** 顺时针缠绕方向 (Clockwise) */
export const WINDING_CW = 2;

/** 缠绕方向类型 */
export type WindingDirection = typeof WINDING_UNKNOWN | typeof WINDING_CCW | typeof WINDING_CW;

/** 2D或3D点坐标 */
export type Point = [number, number] | [number, number, number];

/** 多边形顶点数组 */
export type Polygon = Point[];

/** 边界框 */
export interface Bounds {
  /** 最小X坐标 */
  xMin: number;
  /** 最小Y坐标 */
  yMin: number;
  /** 最大X坐标 */
  xMax: number;
  /** 最大Y坐标 */
  yMax: number;
}

/** 3D向量 */
export type Vector3 = [number, number, number];

/**
 * 计算三点的叉积Z分量，判断转向方向
 * @param p1 - 第一个点
 * @param p2 - 第二个点
 * @param p3 - 第三个点
 * @returns 正值表示逆时针，负值表示顺时针，0表示共线
 */
export function ccw(p1: Point, p2: Point, p3: Point): number;

/**
 * 计算多边形的法向量
 * @param polygon - 多边形顶点数组
 * @param newell - 是否使用Newell方法计算（适用于非平面多边形）
 * @returns 归一化的法向量，计算失败返回null
 */
export function normal(polygon: Polygon, newell?: boolean): Vector3 | null;

/**
 * 计算多边形的有向面积
 * @param polygon - 多边形顶点数组
 * @param normalVector - 可选的预计算法向量
 * @returns 有向面积，逆时针为正，顺时针为负
 */
export function area(polygon: Polygon, normalVector?: Vector3 | null): number;

/**
 * 计算多边形的质心（重心）
 * @param polygon - 多边形顶点数组
 * @returns 质心坐标 [x, y]
 */
export function centroid(polygon: Polygon): [number, number];

/**
 * 判断多边形是否为逆时针方向
 * @param polygon - 多边形顶点数组
 * @param normalVector - 可选的预计算法向量
 * @returns 逆时针返回true，否则返回false
 */
export function is_ccw(polygon: Polygon, normalVector?: Vector3 | null): boolean;

/**
 * 判断多边形是否为顺时针方向
 * @param polygon - 多边形顶点数组
 * @param normalVector - 可选的预计算法向量
 * @returns 顺时针返回true，否则返回false
 */
export function is_cw(polygon: Polygon, normalVector?: Vector3 | null): boolean;

/**
 * 获取多边形的缠绕方向
 * @param polygon - 多边形顶点数组
 * @param normalVector - 可选的预计算法向量
 * @returns 缠绕方向常量：WINDING_CW、WINDING_CCW或WINDING_UNKNOWN
 */
export function winding(polygon: Polygon, normalVector?: Vector3 | null): WindingDirection;

/**
 * 计算多边形的轴对齐边界框
 * @param polygon - 多边形顶点数组
 * @returns 边界框对象
 */
export function bounds(polygon: Polygon): Bounds;

/**
 * 确保多边形为顺时针方向，必要时反转顶点顺序
 * @param polygon - 多边形顶点数组（会原地修改）
 * @param normalVector - 可选的预计算法向量
 * @returns 修改后的多边形（同一引用）
 */
export function ensure_cw(polygon: Polygon, normalVector?: Vector3 | null): Polygon;

/**
 * 确保多边形为逆时针方向，必要时反转顶点顺序
 * @param polygon - 多边形顶点数组（会原地修改）
 * @param normalVector - 可选的预计算法向量
 * @returns 修改后的多边形（同一引用）
 */
export function ensure_ccw(polygon: Polygon, normalVector?: Vector3 | null): Polygon;

/**
 * 多边形三角化（带孔洞支持）
 * @param polygon - 外部多边形顶点数组
 * @param holes - 孔洞多边形数组
 * @returns 三角化后的三角形数组
 */
export function triangulate(polygon: Polygon, holes: Polygon[]): Polygon[];

/**
 * 多边形差集运算（布尔减法）
 * @param polygons - 多边形数组，第一个为被减多边形，其余为减去的多边形
 * @returns 差集运算结果多边形数组
 */
export function subtract(...polygons: Polygon[]): Polygon[];

/**
 * 多边形并集运算
 * @param polygons - 参与并集运算的多边形数组
 * @returns 并集运算结果多边形数组
 */
export function union(...polygons: Polygon[]): Polygon[];

/**
 * 多边形交集运算
 * @param polygon1 - 第一个多边形
 * @param polygon2 - 第二个多边形
 * @returns 交集运算结果多边形数组
 */
export function intersection(polygon1: Polygon, polygon2: Polygon): Polygon[];