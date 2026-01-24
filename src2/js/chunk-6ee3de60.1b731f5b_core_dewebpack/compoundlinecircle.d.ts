/**
 * 模块：复合线圆形切割工具
 * 提供基于圆形的多边形复合线生成和操作功能
 */

import { Point, Vector, Line } from './geometry';
import { CompoundLine, CutLineType } from './CompoundLine';
import { CirclePoly, PolyParser } from './polygon';

/**
 * 复合线圆形类的JSON序列化格式
 */
export interface CompoundLineCircleJSON {
  /** 切割线类型标识 */
  name: CutLineType.compoundLineCircle;
  /** 圆形半径 */
  radius: number;
  /** 多边形边数 (2-12) */
  side: number;
  /** 线段集合 */
  slines: Array<{
    pt: { x: number; y: number };
    direction: { x: number; y: number };
  }>;
  /** 内部多边形数据 */
  polygon: unknown;
  /** 内部边缘索引 */
  innerEdgeIdx?: number;
}

/**
 * 创建复合线的返回结果
 */
interface CompoundCreationResult {
  /** 线段数组 */
  slines: Line[];
  /** 内部多边形 */
  innerPoly: CirclePoly;
}

/**
 * 复合线圆形类
 * 继承自CompoundLine，提供圆形多边形的复合线功能
 * 支持2-12边形的生成和操作
 */
export declare class CompoundLineCircle extends CompoundLine {
  /**
   * 多边形边数 (私有字段)
   * @private
   */
  private _side: number;

  /**
   * 圆形半径
   */
  radius: number;

  /**
   * 构造函数
   * @param slines - 线段数组
   * @param innerPoly - 内部圆形多边形
   */
  constructor(slines: Line[], innerPoly: CirclePoly);

  /**
   * 获取多边形边数
   */
  get side(): number;

  /**
   * 设置多边形边数
   * 设置新值时会触发重新创建
   * @param value - 边数 (2-12)
   */
  set side(value: number);

  /**
   * 根据当前参数重新创建复合线
   * 使用内部多边形的中心点、半径和边数生成新的线段集合
   */
  create(): void;

  /**
   * 静态工厂方法：创建复合线圆形
   * @param radius - 圆形半径
   * @param side - 多边形边数 (必须在2-12之间)
   * @param center - 中心点坐标，默认为原点
   * @returns 新创建的CompoundLineCircle实例
   * @throws {Error} 当side < 2或side > 12时抛出异常
   */
  static createCompound(
    radius: number,
    side: number,
    center?: Point
  ): CompoundLineCircle & CompoundCreationResult;

  /**
   * 克隆当前实例
   * @returns 深拷贝的新实例，包含所有属性
   */
  clone(): CompoundLineCircle;

  /**
   * 拖拽内部边缘进行缩放
   * @param dragStart - 拖拽起始点
   * @param dragCurrent - 当前拖拽点
   * @param dragOffset - 拖拽偏移量
   * @param constraint - 约束条件
   * @returns 如果拖拽导致超出边界返回原实例，否则返回缩放后的新实例
   */
  dragInnerEdge(
    dragStart: Point,
    dragCurrent: Point,
    dragOffset: Vector,
    constraint?: unknown
  ): CompoundLineCircle;

  /**
   * 序列化为JSON对象
   * @returns JSON格式的对象表示
   */
  toJSON(): CompoundLineCircleJSON;

  /**
   * 从JSON数据反序列化
   * @param json - 序列化的JSON对象
   * @returns 反序列化后的CompoundLineCircle实例
   */
  static deserialize(json: CompoundLineCircleJSON): CompoundLineCircle;
}

export default CompoundLineCircle;