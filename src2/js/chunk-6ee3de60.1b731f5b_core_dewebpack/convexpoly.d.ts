import { Vector } from './Vector';
import { Direction } from './Direction';
import { WinPolygon, PolygonCreator, PolyType } from './Polygon';
import { Edge } from './Edge';

/**
 * 凸多边形类
 * 用于创建和管理具有凸出部分的多边形形状
 */
export declare class ConvexPoly extends WinPolygon {
  /**
   * 中心点
   */
  cpt: Vector;

  /**
   * 方向
   */
  direction: Direction;

  /**
   * 宽度
   */
  width: number;

  /**
   * 高度
   */
  height: number;

  /**
   * 构造函数
   * @param cpt - 中心点坐标
   * @param direction - 凸出方向，默认为向上
   * @param width - 多边形宽度，默认为2400
   * @param height - 多边形高度，默认为1600
   * @param edges - 边缘数组，如果未提供则自动创建
   */
  constructor(
    cpt: Vector,
    direction?: Direction,
    width?: number,
    height?: number,
    edges?: Edge[]
  );

  /**
   * 创建凸多边形的边缘
   * @param center - 中心点坐标
   * @param direction - 凸出方向
   * @param width - 宽度
   * @param height - 高度
   * @returns 边缘数组
   */
  static create(
    center: Vector,
    direction: Direction,
    width: number,
    height: number
  ): Edge[];

  /**
   * 获取切角数量
   * @returns 固定返回2
   */
  get cutAnglesCount(): number;

  /**
   * 序列化为JSON对象
   * @returns JSON表示
   */
  toJSON(): {
    type: PolyType;
    cpt: ReturnType<Vector['toJSON']>;
    [key: string]: unknown;
  };

  /**
   * 平移多边形
   * @param offset - 偏移向量
   * @returns 当前实例（支持链式调用）
   */
  translate(offset: Vector): this;

  /**
   * 旋转多边形
   * @param angle - 旋转角度
   * @param pivot - 旋转中心点
   * @returns 当前实例（支持链式调用）
   */
  rotate(angle: number, pivot: Vector): this;

  /**
   * 克隆多边形
   * @returns 新的ConvexPoly实例
   * @internal
   */
  protected _clone(): ConvexPoly;
}