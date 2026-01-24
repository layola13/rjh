/**
 * 2D草图装饰器模块
 * 提供对2D草图的高级操作功能，包括面的曲线/点提取和位置更新
 */

import { CircleArc2d } from './CircleArc2d';
import { Circle2d } from './Circle2d';

/**
 * 2D点坐标接口
 */
interface Point2d {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** 父级元素集合 */
  parents?: Record<string, Curve2d>;
  /**
   * 设置点的坐标
   * @param x - 新的X坐标
   * @param y - 新的Y坐标
   */
  set(x: number, y: number): void;
}

/**
 * 2D曲线基础接口
 */
interface Curve2d {
  /** 起点 */
  from?: Point2d;
  /** 终点 */
  to?: Point2d;
  /** 圆心坐标（仅圆形和圆弧） */
  center?: { x: number; y: number };
}

/**
 * 2D面接口
 */
interface Face2d {
  /**
   * 获取面的所有曲线
   * @returns 曲线数组
   */
  getAllCurves(): Curve2d[];
  
  /**
   * 获取面的所有点
   * @returns 点数组
   */
  getAllPoints(): Point2d[];
}

/**
 * 2D草图接口
 */
interface Sketch2d {
  // 草图的基础属性和方法
}

/**
 * 2D草图装饰器类
 * 提供对2D草图几何元素的批量操作和变换功能
 */
export declare class Sketch2dDecorator {
  /** 内部草图实例 */
  private readonly _sketch2d: Sketch2d;

  /**
   * 构造函数
   * @param sketch2d - 要装饰的2D草图对象
   */
  constructor(sketch2d: Sketch2d);

  /**
   * 从多个面中提取所有唯一的曲线
   * @param faces - 2D面数组
   * @returns 去重后的曲线数组
   */
  getFace2dsCurves(faces: Face2d[]): Curve2d[];

  /**
   * 从多个面中提取所有唯一的点
   * @param faces - 2D面数组
   * @returns 去重后的点数组
   */
  getFace2dsPoints(faces: Face2d[]): Point2d[];

  /**
   * 更新多个面的位置（平移变换）
   * 该方法会：
   * 1. 更新所有点的坐标
   * 2. 更新圆形和圆弧的圆心坐标
   * 3. 重新计算受影响的圆弧的矢高和几何信息
   * 
   * @param faces - 需要移动的2D面数组
   * @param deltaX - X方向的偏移量
   * @param deltaY - Y方向的偏移量
   */
  updateFace2dsPosition(faces: Face2d[], deltaX: number, deltaY: number): void;
}