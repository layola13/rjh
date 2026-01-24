/**
 * 倾斜六边形多边形模块
 * 提供创建和操作带有倾斜边的六边形多边形的功能
 */

import type { Point, Vector, Segment, Box, Line } from './geometry-types';
import type { WinPolygon, PolygonEdge } from './WinPolygon';
import type { EventBus, EventType } from './events';

/**
 * 六边形多边形的控制信息
 */
interface PolygonControlInfo {
  /** 边的索引 */
  idx: number;
  /** 是否显示尺寸标注 */
  dimShow: boolean;
  /** 是否为弧形 */
  arc?: boolean;
  /** 是否为端点 */
  endpoint?: boolean;
}

/**
 * 序列化的JSON数据结构
 */
interface AngledHexagon2JSON {
  /** 多边形类型 */
  type: string;
  /** 中心点 */
  cpt: any;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 剩余宽度 */
  rw: number;
  /** 剩余高度 */
  rh: number;
  /** 左侧弧高 */
  la: number;
  /** 右侧弧高 */
  ra: number;
  /** 是否相切 */
  it: boolean;
}

/**
 * 倾斜框架设置事件
 */
declare class AngledFrame2Settings {
  constructor(context: any, view: any);
}

/**
 * 视图上下文接口
 */
interface ViewContext {
  view: {
    eventBus: EventBus;
  };
}

/**
 * 倾斜六边形多边形类
 * 
 * 该类表示一个带有倾斜边的六边形多边形，具有以下特征：
 * - 可控制的宽度和高度
 * - 可调整的倾斜边（左右两侧）
 * - 支持相切模式，自动计算弧高
 * - 支持拖拽编辑边和顶点
 * 
 * @extends WinPolygon
 */
export declare class AngledHexagon2Poly extends WinPolygon {
  /**
   * 中心点坐标
   */
  readonly cpt: Point;

  /**
   * 六边形宽度
   */
  readonly width: number;

  /**
   * 六边形高度
   */
  readonly height: number;

  /**
   * 剩余高度（倾斜边底部高度）
   */
  readonly remainingHeight: number;

  /**
   * 剩余宽度（倾斜边侧面宽度）
   */
  readonly remainingWidth: number;

  /**
   * 左侧弧形高度
   */
  leftArcHeight: number;

  /**
   * 右侧弧形高度
   */
  rightArcHeight: number;

  /**
   * 是否为相切模式
   * 在相切模式下，剩余宽度和高度会自动保持一致
   */
  readonly isTangency: boolean;

  /**
   * 构造函数
   * 
   * @param centerPoint - 中心点坐标
   * @param width - 宽度（默认: 2400）
   * @param height - 高度（默认: 1920）
   * @param remainingHeight - 剩余高度（默认: 600）
   * @param remainingWidth - 剩余宽度（默认: 600）
   * @param leftArcHeight - 左侧弧高（默认: 600 - 300 * √2）
   * @param rightArcHeight - 右侧弧高（默认: 600 - 300 * √2）
   * @param isTangency - 是否相切（默认: true）
   * @param edges - 预定义的边集合（可选）
   */
  constructor(
    centerPoint: Point,
    width: number,
    height: number,
    remainingHeight: number,
    remainingWidth: number,
    leftArcHeight: number,
    rightArcHeight: number,
    isTangency?: boolean,
    edges?: PolygonEdge[]
  );

  /**
   * 静态工厂方法：创建倾斜六边形多边形
   * 
   * @param centerPoint - 中心点（默认: Point(0, 0)）
   * @param width - 宽度（默认: 2400）
   * @param height - 高度（默认: 1920）
   * @param remainingHeight - 剩余高度（默认: 600）
   * @param remainingWidth - 剩余宽度（默认: 600）
   * @param leftArcHeight - 左侧弧高（默认: 自动计算）
   * @param rightArcHeight - 右侧弧高（默认: 自动计算）
   * @param isTangency - 是否相切（默认: true）
   * @returns 新创建的 WinPolygon 实例
   */
  static create(
    centerPoint?: Point,
    width?: number,
    height?: number,
    remainingHeight?: number,
    remainingWidth?: number,
    leftArcHeight?: number,
    rightArcHeight?: number,
    isTangency?: boolean
  ): WinPolygon;

  /**
   * 控制尺寸标注标志
   * @returns 总是返回 true，表示支持尺寸控制
   */
  get controlDimFlag(): boolean;

  /**
   * 序列化为JSON对象
   * @returns 包含所有属性的JSON对象
   */
  toJSON(): AngledHexagon2JSON;

  /**
   * 平移多边形
   * 
   * @param vector - 平移向量
   * @returns 平移后的当前实例（支持链式调用）
   */
  translate(vector: Vector): this;

  /**
   * 拖拽编辑边
   * 
   * 根据边的索引不同，执行不同的编辑操作：
   * - 索引 1: 调整高度，重新计算边的交点
   * - 索引 4: 调整高度并平移相关边
   * - 索引 0/2: 调整宽度，并在相切模式下同步调整剩余宽高
   * 
   * @param edgeIndex - 边的索引（0-5）
   * @param dragVector - 拖拽向量
   * @returns 新的 AngledHexagon2Poly 实例
   */
  dragEdge(edgeIndex: number, dragVector: Vector): AngledHexagon2Poly;

  /**
   * 编辑尺寸
   * 
   * @param index - 编辑点索引
   * @param point - 编辑点坐标
   * @param vector - 编辑向量
   * @returns 编辑后的新实例或当前实例
   */
  editDim(index: number, point: Point, vector: Vector): AngledHexagon2Poly | this;

  /**
   * 编辑弧形尺寸（当前未实现）
   * 
   * @param index - 弧的索引
   * @param value - 新的弧高值
   */
  editArcDim(index: number, value: number): void;

  /**
   * 编辑弦长尺寸
   * 
   * @param index - 弦的索引
   * @param value - 新的弦长值
   * @returns 当前实例
   */
  editChordDim(index: number, value: number): this;

  /**
   * 拖拽顶点（当前未实现）
   * 
   * @returns 当前实例
   */
  dragVertex(): this;

  /**
   * 克隆当前多边形
   * @returns 新的 AngledHexagon2Poly 实例
   * @private
   */
  _clone(): AngledHexagon2Poly;

  /**
   * 初始化多边形控制点
   * 设置6个控制点的属性（非弧形，但为端点）
   * @private
   */
  initPoly(): void;

  /**
   * 触发框架配置事件
   * 在视图的事件总线上发出 angled_frame2_settings 事件
   * 
   * @param context - 视图上下文
   */
  raiseFrameEvent(context: ViewContext): void;

  /**
   * 使用新的边集合克隆多边形
   * 会根据边[3]和边[5]重新计算弧高
   * 
   * @param edges - 新的边集合
   * @returns 克隆的多边形实例
   */
  cloneWith(edges: PolygonEdge[]): WinPolygon;

  /**
   * 初始化尺寸标注信息
   * 设置边[3]和边[5]不显示尺寸标注
   * 
   * @returns 尺寸信息映射对象
   */
  initDimInfo(): Record<number, PolygonControlInfo>;
}