/**
 * 二维特殊点类模块
 * 用于表示草图中的特殊点（如端点、交点、中点等）
 */

import { ExtraordinarySketchBase } from './ExtraordinarySketchBase';
import { ExPointType } from './ExPointType';

/**
 * 点坐标接口
 */
interface PointCoordinates {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 二维特殊点类
 * 继承自草图特殊元素基类，表示二维平面上的特殊点
 */
export declare class ExtraordinaryPoint2d extends ExtraordinarySketchBase {
  /** X坐标私有字段 */
  private _x: number;
  
  /** Y坐标私有字段 */
  private _y: number;
  
  /** 点类型私有字段 */
  private _type: ExPointType;

  /**
   * 构造函数
   * @param parent - 父级对象
   */
  constructor(parent: unknown);

  /**
   * 静态工厂方法：创建特殊点实例
   * @param coordinates - 点的坐标
   * @param type - 点的类型（可选）
   * @param parent - 父级对象
   * @returns 创建的特殊点实例
   */
  static create(
    coordinates: PointCoordinates,
    type: ExPointType | undefined,
    parent: unknown
  ): ExtraordinaryPoint2d;

  /**
   * 获取X坐标
   */
  get x(): number;

  /**
   * 设置X坐标
   * @param value - 新的X坐标值
   */
  setX(value: number): void;

  /**
   * 获取Y坐标
   */
  get y(): number;

  /**
   * 设置Y坐标
   * @param value - 新的Y坐标值
   */
  setY(value: number): void;

  /**
   * 获取点类型
   */
  get type(): ExPointType;

  /**
   * 设置点类型
   * @param value - 新的点类型
   */
  setType(value: ExPointType): void;

  /**
   * 生成点的唯一标识码
   * 基于坐标生成字符串编码（精度：1e-5）
   * @param point - 点坐标对象
   * @returns 格式为 "x-y" 的唯一标识字符串
   * @example "12345-67890"
   */
  static getCode(point: PointCoordinates): string;
}