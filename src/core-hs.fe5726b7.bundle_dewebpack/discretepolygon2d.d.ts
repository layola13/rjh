/**
 * 2D离散多边形模块
 * 表示带孔洞的2D多边形，外轮廓为逆时针，孔洞为顺时针
 */

import type { IPoint2d, Point2d } from './Point2d';
import type { BoundingBox2D } from './BoundingBox2D';

/**
 * 离散多边形2D数据接口
 */
export interface IDiscretePolygon2dData {
  /** 外轮廓点集 */
  outer: IPoint2d[];
  /** 孔洞点集数组 */
  holes: IPoint2d[][];
}

/**
 * 类型守卫：检查数据是否为有效的离散多边形数据
 * @param data - 待检查的数据
 * @returns 是否为有效的IDiscretePolygon2dData
 */
export function isDiscretePolygon2dData(data: unknown): data is IDiscretePolygon2dData;

/**
 * 类型守卫：检查数据是否为有效的离散多边形数组数据
 * @param data - 待检查的数据
 * @returns 是否为有效的IDiscretePolygon2dData数组
 */
export function isDiscretePolygon2dArrayData(data: unknown): data is IDiscretePolygon2dData[];

/**
 * 离散多边形2D类
 * 表示由外轮廓和可选孔洞组成的2D多边形
 */
export class DiscretePolygon2d {
  /** 外轮廓顶点数组（逆时针） */
  outer: Point2d[];
  
  /** 孔洞顶点数组集合（每个孔洞为顺时针） */
  holes: Point2d[][];

  /**
   * 构造函数
   * @param outer - 外轮廓点集
   * @param holes - 孔洞点集数组，默认为空数组
   */
  constructor(outer: IPoint2d[], holes?: IPoint2d[][]);

  /**
   * 静态工厂方法：创建离散多边形实例
   * @param outer - 外轮廓点集
   * @param holes - 孔洞点集数组，默认为空数组
   * @returns 新的DiscretePolygon2d实例
   */
  static create(outer: IPoint2d[], holes?: IPoint2d[][]): DiscretePolygon2d;

  /**
   * 分配/更新多边形数据
   * @param outer - 外轮廓点集
   * @param holes - 孔洞点集数组，默认为空数组
   */
  assign(outer: IPoint2d[], holes?: IPoint2d[][]): void;

  /**
   * 计算当前多边形的面积（外轮廓面积减去孔洞面积）
   * @returns 多边形面积
   */
  getArea(): number;

  /**
   * 获取当前多边形的边界框
   * @returns 2D边界框
   */
  getBound(): BoundingBox2D;

  /**
   * 判断两个多边形是否相同
   * @param polygon1 - 第一个多边形
   * @param polygon2 - 第二个多边形
   * @returns 是否相同
   */
  static isSamePolygon(polygon1: DiscretePolygon2d, polygon2: DiscretePolygon2d): boolean;

  /**
   * 判断两个多边形数组是否相同（忽略顺序）
   * @param polygons1 - 第一个多边形数组
   * @param polygons2 - 第二个多边形数组
   * @returns 是否相同
   */
  static isSamePolygons(polygons1: DiscretePolygon2d[], polygons2: DiscretePolygon2d[]): boolean;

  /**
   * 计算多个多边形的总面积
   * @param polygons - 多边形数组
   * @returns 总面积（外轮廓面积减去孔洞面积）
   */
  static getArea(polygons: DiscretePolygon2d[]): number;

  /**
   * 获取多个多边形的联合边界框
   * @param polygons - 多边形数组
   * @returns 包含所有多边形的2D边界框
   */
  static getBound(polygons: DiscretePolygon2d[]): BoundingBox2D;

  /**
   * 验证并修正多边形方向
   * 确保外轮廓为逆时针，孔洞为顺时针
   * @param polygons - 待验证的多边形数组（会原地修改）
   */
  static verify(polygons: DiscretePolygon2d[]): void;
}