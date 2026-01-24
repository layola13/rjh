import type { Point, Vector, Segment, Box, Line } from './geometry';
import type { WinPolygon, PolygonCreator, PolyType } from './polygon';
import type { EventBus, EventType } from './events';

/**
 * 圆角矩形多边形配置选项
 */
export interface RoundedRectanglePolygonOptions {
  /** 中心点 */
  cpt: Point;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 圆角半径 */
  borderRadius: number;
  /** 是否相切 */
  isTangency: boolean;
  /** 边集合 */
  edges?: Segment[];
}

/**
 * 控制点配置
 */
export interface ControlRobConfig {
  /** 是否为圆弧控制点 */
  arc: boolean;
  /** 是否为端点 */
  endpoint: boolean;
}

/**
 * 尺寸信息
 */
export interface DimensionInfo {
  /** 索引 */
  idx: number;
  /** 是否显示尺寸 */
  dimShow: boolean;
}

/**
 * JSON序列化格式
 */
export interface RoundedRectanglePolygonJSON {
  /** 多边形类型 */
  type: PolyType;
  /** 中心点 */
  cpt: unknown;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 圆角半径 */
  br: number;
  /** 是否相切 */
  it: boolean;
  [key: string]: unknown;
}

/**
 * 框架事件参数
 */
export interface FrameEventContext {
  /** 视图对象 */
  view: {
    /** 事件总线 */
    eventBus: EventBus;
  };
}

/**
 * 圆角矩形多边形类
 * 
 * 继承自 WinPolygon，提供圆角矩形的创建、编辑和操作功能。
 * 支持拖拽边缘、顶点编辑、尺寸控制等交互功能。
 */
export declare class RoundedRectanglePolygon extends WinPolygon {
  /** 中心点坐标 */
  cpt: Point;
  
  /** 矩形宽度 */
  width: number;
  
  /** 矩形高度 */
  height: number;
  
  /** 圆角半径 */
  borderRadius: number;
  
  /** 是否相切模式 */
  isTangency: boolean;
  
  /** 控制点配置集合 */
  ctlRobs: Map<number, ControlRobConfig>;

  /**
   * 构造函数
   * @param cpt - 中心点
   * @param width - 宽度
   * @param height - 高度
   * @param borderRadius - 圆角半径
   * @param isTangency - 是否相切，默认为 true
   * @param edges - 边集合，若未提供则自动创建
   */
  constructor(
    cpt: Point,
    width: number,
    height: number,
    borderRadius: number,
    isTangency?: boolean,
    edges?: Segment[]
  );

  /**
   * 静态工厂方法：创建圆角矩形多边形
   * @param center - 中心点，默认为原点
   * @param width - 宽度，默认为 2400
   * @param height - 高度，默认为 1920
   * @param borderRadius - 圆角半径，默认为 600
   * @returns 创建的圆角矩形多边形实例
   */
  static create(
    center?: Point,
    width?: number,
    height?: number,
    borderRadius?: number
  ): RoundedRectanglePolygon;

  /**
   * 控制尺寸标志
   * @returns 始终返回 true，表示支持尺寸控制
   */
  get controlDimFlag(): boolean;

  /**
   * 序列化为 JSON 对象
   * @returns JSON 表示
   */
  toJSON(): RoundedRectanglePolygonJSON;

  /**
   * 平移多边形
   * @param vector - 平移向量
   * @returns 当前实例（支持链式调用）
   */
  translate(vector: Vector): this;

  /**
   * 拖拽边缘
   * @param edgeIndex - 边的索引（0-7）
   * @param dragVector - 拖拽向量
   * @returns 更新后的多边形实例
   */
  dragEdge(edgeIndex: number, dragVector: Vector): RoundedRectanglePolygon;

  /**
   * 编辑尺寸
   * @param edgeIndex - 边索引
   * @param param - 参数（具体用途待确认）
   * @param vector - 编辑向量
   * @returns 更新后的多边形实例
   */
  editDim(edgeIndex: number, param: unknown, vector: Vector): RoundedRectanglePolygon;

  /**
   * 编辑圆弧尺寸
   * @param arcIndex - 圆弧索引
   * @param value - 新值
   */
  editArcDim(arcIndex: number, value: unknown): void;

  /**
   * 编辑弦长尺寸
   * @param chordIndex - 弦索引
   * @param value - 新值
   * @returns 当前实例
   */
  editChordDim(chordIndex: number, value: unknown): this;

  /**
   * 拖拽顶点
   * @returns 当前实例（圆角矩形不支持顶点拖拽）
   */
  dragVertex(): this;

  /**
   * 克隆多边形
   * @returns 新的多边形实例
   * @internal
   */
  _clone(): RoundedRectanglePolygon;

  /**
   * 初始化多边形控制点配置
   * 设置 8 个边的控制属性
   */
  initPoly(): void;

  /**
   * 触发框架设置事件
   * @param context - 事件上下文
   */
  raiseFrameEvent(context: FrameEventContext): void;

  /**
   * 初始化尺寸信息
   * @returns 尺寸信息映射表（索引 1, 3, 5, 7 的尺寸被隐藏）
   */
  initDimInfo(): Record<number, DimensionInfo>;
}