import { Rect } from './Rect';

/**
 * 表示一个二维点的坐标
 */
export interface Point {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * BrepBound 类 - 表示边界矩形框（Boundary Representation Bound）
 * 继承自 Rect 类，提供边界框的创建、验证、扩展等操作
 * 
 * @extends Rect
 */
export class BrepBound extends Rect {
  /**
   * 构造函数
   * 
   * @param left - 左边界坐标，默认为 Infinity
   * @param top - 上边界坐标，默认为 Infinity
   * @param width - 宽度，默认为 0
   * @param height - 高度，默认为 0
   */
  constructor(left?: number, top?: number, width?: number, height?: number);

  /**
   * 获取边界框的中心点坐标
   * 
   * @returns 包含 x 和 y 坐标的点对象
   */
  center(): Point;

  /**
   * 获取边界框的最小点（左上角）
   * 
   * @returns 左上角点坐标
   */
  getMin(): Point;

  /**
   * 获取边界框的最大点（右下角）
   * 
   * @returns 右下角点坐标
   */
  getMax(): Point;

  /**
   * 验证边界框是否有效
   * 
   * @param strictPositive - 是否严格要求宽高大于0，默认为 false（允许宽高等于0）
   * @returns 如果边界框有效则返回 true，否则返回 false
   */
  isValid(strictPositive?: boolean): boolean;

  /**
   * 扩展边界框的边距
   * 
   * @param marginX - X方向的边距（左右各扩展该值）
   * @param marginY - Y方向的边距（上下各扩展该值）
   * @returns 返回一个新的扩展后的 BrepBound 实例
   */
  expandMargin(marginX: number, marginY: number): BrepBound;

  /**
   * 重置边界框到初始状态
   * 将 left 和 top 设为 Infinity，width 和 height 设为 0
   */
  reset(): void;

  /**
   * 复制另一个边界框的属性
   * 
   * @param source - 源边界框对象
   */
  copy(source: BrepBound): void;

  /**
   * 设置边界框的位置和尺寸
   * 
   * @param left - 左边界坐标
   * @param top - 上边界坐标
   * @param width - 宽度
   * @param height - 高度
   */
  set(left: number, top: number, width: number, height: number): void;

  /**
   * 将一个点添加到边界框中，自动扩展边界以包含该点
   * 
   * @param point - 要添加的点坐标
   */
  appendPoint(point: Point | null | undefined): void;

  /**
   * 将另一个边界框添加到当前边界框中，自动扩展以包含整个边界框
   * 
   * @param bound - 要添加的边界框
   */
  appendBound(bound: BrepBound): void;

  /**
   * 静态方法：验证给定对象是否是有效的 BrepBound 实例
   * 
   * @param bound - 要验证的对象
   * @param strictPositive - 是否严格要求宽高大于0，默认为 false
   * @returns 如果是有效的 BrepBound 实例则返回 true，否则返回 false
   */
  static isValidBound(bound: unknown, strictPositive?: boolean): bound is BrepBound;

  /**
   * 静态方法：从点数组创建边界框
   * 
   * @param points - 点坐标数组
   * @returns 包含所有点的最小边界框
   */
  static createFromPoints(points: Point[]): BrepBound;
}