import { Direction } from './Direction';
import { WinPolygon, PolygonCreator, PolyType } from './Polygon';
import { Vector } from './Vector';
import { Edge } from './Edge';

/**
 * 空心多边形类
 * 用于表示带有中空区域的多边形窗户或门框
 * 继承自 WinPolygon
 */
export declare class HollowPoly extends WinPolygon {
  /**
   * 中心点坐标
   */
  cpt: Vector;

  /**
   * 多边形朝向方向
   */
  direction: Direction;

  /**
   * 多边形宽度
   */
  width: number;

  /**
   * 多边形高度
   */
  height: number;

  /**
   * 构造函数
   * @param cpt - 中心点坐标
   * @param direction - 朝向方向，默认为 Direction.Up
   * @param width - 宽度，默认为 2400
   * @param height - 高度，默认为 1600
   * @param edges - 边集合数组
   */
  constructor(
    cpt: Vector,
    direction?: Direction,
    width?: number,
    height?: number,
    edges?: Edge[]
  );

  /**
   * 获取切割角的数量
   * @returns 始终返回 1
   */
  get cutAnglesCount(): number;

  /**
   * 获取控制尺寸标志
   * @returns 始终返回 true
   */
  get controlDimFlag(): boolean;

  /**
   * 获取空心区域到外边缘的距离
   * @returns 第8条边的长度
   */
  get hollowDistance(): number;

  /**
   * 获取空心区域中心到外边缘的距离
   * @returns 空心距离加上空心尺寸的一半
   */
  get hollowCenterDistance(): number;

  /**
   * 获取空心区域的尺寸
   * @returns 第6条边的长度
   */
  get hollowSize(): number;

  /**
   * 获取底部尺寸
   * @returns 第2条边的长度
   */
  get bottomSize(): number;

  /**
   * 移动空心区域
   * @param distance - 移动距离
   * @param target - 目标多边形对象，默认为当前对象
   * @returns 移动后的多边形对象
   */
  moveHollow(distance: number, target?: HollowPoly): HollowPoly;

  /**
   * 创建空心多边形的边集合
   * @param center - 中心点坐标
   * @param direction - 朝向方向
   * @param width - 宽度
   * @param height - 高度
   * @returns 创建的边集合数组
   */
  static create(
    center: Vector,
    direction: Direction,
    width: number,
    height: number
  ): Edge[];

  /**
   * 将多边形序列化为JSON对象
   * @returns JSON对象表示
   */
  toJSON(): {
    type: PolyType;
    cpt: any;
    [key: string]: any;
  };

  /**
   * 平移多边形
   * @param offset - 平移向量
   * @returns 平移后的当前对象
   */
  translate(offset: Vector): this;

  /**
   * 旋转多边形
   * @param angle - 旋转角度
   * @param center - 旋转中心点
   * @returns 旋转后的当前对象
   */
  rotate(angle: number, center: Vector): this;

  /**
   * 编辑多边形尺寸
   * @param edgeIndex - 要编辑的边索引
   * @param scale - 缩放比例
   * @param direction - 编辑方向向量
   * @returns 编辑后的新 HollowPoly 实例
   */
  editDim(edgeIndex: number, scale: number, direction: Vector): HollowPoly;

  /**
   * 克隆多边形（内部方法）
   * @returns 克隆的新实例
   * @private
   */
  _clone(): HollowPoly;
}