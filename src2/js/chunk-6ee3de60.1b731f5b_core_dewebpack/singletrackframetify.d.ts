/**
 * SingleTrackFrametify - 单轨框架化处理类
 * 用于将多边形转换为带框架结构的形状，支持隐藏边和内部偏移
 */

import { Frametify } from './Frametify';
import { Direction, EdgeFinder } from './Direction';
import { WinPolygon } from './WinPolygon';
import { Dock, PolyId, EdgeJointWay } from './Dock';

/**
 * 边缘对象接口
 */
export interface Edge {
  /**
   * 克隆边缘对象
   */
  clone(): Edge;
  
  /**
   * 平移边缘
   * @param dx - X轴偏移量
   * @param dy - Y轴偏移量
   */
  translate(dx: number, dy: number): Edge;
}

/**
 * 多边形接口
 */
export interface Polygon {
  /** 多边形的边缘数组 */
  edges: Edge[];
  
  /** 隐藏的方向数组 */
  hidden: Direction[];
  
  /** 拉伸高度映射表 */
  pullingHeight: Map<Direction, number>;
  
  /**
   * 生成平行多边形
   * @param offsets - 各方向的偏移量数组
   * @param inner - 是否为内部偏移
   */
  parallelPoly(offsets: number[], inner: boolean): { edges: Edge[] };
}

/**
 * 条形多边形接口
 */
export interface BarPolygon {
  /** 是否为虚拟条 */
  virtual: boolean;
}

/**
 * 单轨框架化类
 * 继承自Frametify，专门处理单轨道框架结构的生成
 */
export declare class SingleTrackFrametify extends Frametify {
  /** 待处理的多边形 */
  protected poly: Polygon;
  
  /** 内部边缘数组 */
  protected innerEdges: Edge[];
  
  /** 外部路径数组 */
  protected outsidePath: Edge[];

  /**
   * 构造函数
   * @param polygon - 需要进行框架化处理的多边形
   */
  constructor(polygon: Polygon);

  /**
   * 生成内部多边形
   * @param offsets - 各方向的偏移量数组 [左, 下, 右, 上]
   * @returns 生成的内部多边形数组
   */
  innerPolygons(offsets: number[]): WinPolygon[];

  /**
   * 扩展内部多边形
   * @param edges - 边缘数组
   * @param direction - 扩展方向
   * @param offset - 偏移量
   * @returns 扩展后的边缘数组
   */
  protected expendInnerPoly(edges: Edge[], direction: Direction, offset: number): Edge[];

  /**
   * 生成条形多边形（框架条）
   * @param offsets - 偏移量数组
   * @param jointWays - 边缘连接方式数组
   * @returns 生成的条形多边形数组
   */
  barPolygons(offsets: number[], jointWays: EdgeJointWay[]): BarPolygon[];

  /**
   * 创建条形结构
   * @param outerEdges - 外部边缘数组
   * @param innerEdges - 内部边缘数组
   * @param jointWays - 连接方式数组
   * @returns 条形多边形数组
   * @protected
   */
  protected createBar(outerEdges: Edge[], innerEdges: Edge[], jointWays: EdgeJointWay[]): BarPolygon[];
}

/**
 * 方向枚举
 */
export enum Direction {
  Left = 'Left',
  Down = 'Down',
  Right = 'Right',
  Up = 'Up'
}

/**
 * 边缘连接方式枚举
 */
export enum EdgeJointWay {
  /** 水平连接 */
  Horizontal = 'Horizontal',
  
  /** 垂直连接 */
  Vertical = 'Vertical'
}

/**
 * Dock类型声明
 */
export declare class Dock {
  /**
   * 创建框架Dock
   * @param polyId - 多边形ID
   */
  static Frame(polyId: PolyId): Dock;
  
  /**
   * 创建空Dock
   */
  static None(): Dock;
}

/**
 * 多边形ID类
 */
export declare class PolyId {
  /**
   * 构造函数
   * @param index - 索引值
   */
  constructor(index: number);
}

/**
 * Frametify基类
 */
export declare class Frametify {
  /**
   * 计算边缘交点
   * @param edges - 边缘数组
   * @param index - 边缘索引
   */
  static edgeIntersection(edges: Edge[], index: number): void;
  
  /**
   * 构造函数
   * @param polygon - 多边形对象
   */
  constructor(polygon: Polygon);
}