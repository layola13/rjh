/**
 * 三维边界盒（Bounding Box）类型定义
 * 用于表示3D空间中的轴对齐边界盒（AABB - Axis-Aligned Bounding Box）
 * @module BoundingBox
 */

/**
 * 三维边界盒类
 * 通过最小点和最大点坐标定义3D空间中的矩形区域
 */
export default class BoundingBox {
  /**
   * X轴最小坐标
   */
  minX: number;

  /**
   * Y轴最小坐标
   */
  minY: number;

  /**
   * Z轴最小坐标
   */
  minZ: number;

  /**
   * X轴最大坐标
   */
  maxX: number;

  /**
   * Y轴最大坐标
   */
  maxY: number;

  /**
   * Z轴最大坐标
   */
  maxZ: number;

  /**
   * 边界盒的表面积（平方单位）
   */
  surfaceArea: number;

  /**
   * 构造函数
   * @param minX - X轴最小坐标，默认为0
   * @param minY - Y轴最小坐标，默认为0
   * @param minZ - Z轴最小坐标，默认为0
   * @param maxX - X轴最大坐标，默认为0
   * @param maxY - Y轴最大坐标，默认为0
   * @param maxZ - Z轴最大坐标，默认为0
   */
  constructor(
    minX?: number,
    minY?: number,
    minZ?: number,
    maxX?: number,
    maxY?: number,
    maxZ?: number
  );

  /**
   * 计算边界盒的表面积
   * 公式: 2 * (宽*高 + 宽*深 + 高*深)
   * @returns 表面积值
   * @private
   */
  private _calculateSurfaceArea(): number;

  /**
   * 检查当前边界盒是否与另一个边界盒重叠
   * @param other - 要检查的另一个边界盒
   * @param ignoreZ - 是否忽略Z轴检查（仅进行2D重叠检测），默认为false
   * @returns 如果重叠返回true，否则返回false
   */
  overlaps(other: BoundingBox | null | undefined, ignoreZ?: boolean): boolean;

  /**
   * 检查当前边界盒是否完全包含另一个边界盒
   * @param other - 要检查的另一个边界盒
   * @returns 如果完全包含返回true，否则返回false
   */
  contains(other: BoundingBox | null | undefined): boolean;

  /**
   * 合并当前边界盒与另一个边界盒，返回能包含两者的最小边界盒
   * @param other - 要合并的另一个边界盒
   * @returns 合并后的新边界盒，如果other为空则返回当前边界盒
   */
  merge(other: BoundingBox | null | undefined): BoundingBox;

  /**
   * 计算当前边界盒与另一个边界盒的交集
   * @param other - 要求交集的另一个边界盒
   * @returns 交集边界盒，如果other为空则返回当前边界盒
   */
  intersection(other: BoundingBox | null | undefined): BoundingBox;

  /**
   * 获取边界盒在X轴方向的宽度
   * @returns 宽度值（maxX - minX）
   */
  getWidth(): number;

  /**
   * 获取边界盒在Y轴方向的高度
   * @returns 高度值（maxY - minY）
   */
  getHeight(): number;

  /**
   * 获取边界盒在Z轴方向的深度
   * @returns 深度值（maxZ - minZ）
   */
  getDepth(): number;
}