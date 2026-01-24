/**
 * KFC4 多边形类型声明
 * 用于表示KFC4特定形状的多边形，包含9条边和特殊的控制点配置
 */

import { Point, Segment, Box, Vector, Line } from '@flatten-js/core';
import { WinPolygon, PolyType } from './WinPolygon';
import { Kfc4Frametify } from './Kfc4Frametify';
import { EventType, FrameSettings } from './EventTypes';
import { DockType } from './DockTypes';

/**
 * 控制点配置接口
 * 定义控制点是否为弧形端点和是否可编辑
 */
interface ControlPointConfig {
  /** 是否为弧形控制点 */
  arc: boolean;
  /** 是否为端点 */
  endpoint: boolean;
}

/**
 * 帧事件接口
 */
interface FrameEvent {
  view: {
    eventBus: {
      emit(event: { type: EventType; payload: FrameSettings }): void;
    };
  };
}

/**
 * 连接条配置接口
 */
interface CCBarConfig {
  /** 连接数量 */
  connectCount: number;
  /** 停靠数量 */
  dockCount: number;
  /** 端点停靠配置 */
  epDock: {
    stDock: { type: DockType };
    etDock: { type: DockType };
  };
}

/**
 * KFC4多边形类
 * 继承自WinPolygon，实现特定的KFC4形状多边形
 * 包含9条边：外部矩形边和内部凹陷区域边
 */
export declare class Kfc4Polygon extends WinPolygon {
  /**
   * 控制点配置映射表
   * 存储每个控制点的弧形和端点属性
   */
  protected ctlRobs: Map<number, ControlPointConfig>;

  /**
   * 内部索引映射表
   * 将内部边索引映射到外部边索引
   */
  protected imIdx: Map<number, number>;

  /**
   * 构造函数
   * @param edges - 边数组，如果未提供则使用默认初始化
   */
  constructor(edges?: Segment[]);

  /**
   * 控制尺寸标志
   * 指示该多边形是否支持尺寸控制
   */
  get controlDimFlag(): boolean;

  /**
   * 多边形面积
   * 返回包围盒面积
   */
  get area(): number;

  /**
   * 多边形边界
   * 返回包含该多边形的最小包围盒多边形
   */
  get boundary(): WinPolygon;

  /**
   * 可作为多边的边索引数组
   * 返回可以配置为多重连接条的边索引
   */
  get asMulEdgeIndexes(): number[];

  /**
   * 初始化KFC4多边形的边
   * @param center - 中心点位置，默认为原点
   * @param totalWidth - 总宽度，默认3000
   * @param innerWidth - 内部凹陷宽度，默认500
   * @param innerHeight - 内部凹陷高度，默认800
   * @param innerOffsetY - 内部凹陷Y轴偏移，默认300
   * @returns 初始化后的边数组
   */
  static initEdges(
    center?: Point,
    totalWidth?: number,
    innerWidth?: number,
    innerHeight?: number,
    innerOffsetY?: number
  ): Segment[];

  /**
   * 转换为JSON对象
   * @returns 包含多边形类型和数据的JSON对象
   */
  toJSON(): {
    type: PolyType;
    [key: string]: unknown;
  };

  /**
   * 克隆多边形
   * @returns 新的Kfc4Polygon实例
   */
  protected _clone(): Kfc4Polygon;

  /**
   * 初始化多边形控制点配置
   * 设置9个控制点的弧形和端点属性
   * 以及内部索引映射关系
   */
  protected initPoly(): void;

  /**
   * 框架化处理
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   * @returns 框架化结果对象
   */
  frametify(param1: unknown, param2: unknown): Kfc4Frametify;

  /**
   * 从内部索引获取外部索引
   * @param innerIndex - 内部边索引
   * @returns 对应的外部边索引，如果不存在返回undefined
   */
  idxFromInner(innerIndex: number): number | undefined;

  /**
   * 拖拽边
   * @param edgeIndex - 边索引（0-8）
   * @param offset - 偏移向量
   * @param referencePoint - 参考点，默认为原点
   * @returns 更新后的多边形实例
   */
  dragEdge(edgeIndex: number, offset: Vector, referencePoint?: Point): Kfc4Polygon;

  /**
   * 包装边数组为新的多边形实例
   * @param edges - 边数组
   * @returns 新的Kfc4Polygon实例
   */
  protected wrapEdges(edges: Segment[]): Kfc4Polygon;

  /**
   * 拖拽顶点
   * @param vertexIndex - 顶点索引
   * @param offset - 偏移向量
   * @returns 当前实例（未实现实际操作）
   */
  dragVertex(vertexIndex: number, offset: Vector): this;

  /**
   * 编辑尺寸
   * @param dimensionIndex - 尺寸索引（0-3）
   * @param param2 - 第二个参数（未使用）
   * @param offset - 偏移向量
   * @returns 更新后的多边形实例
   */
  editDim(dimensionIndex: number, param2: unknown, offset: Vector): Kfc4Polygon;

  /**
   * 触发框架事件
   * @param event - 框架事件对象
   */
  raiseFrameEvent(event: FrameEvent): void;

  /**
   * 修复框架连接条
   * 设置特定边的连接数和停靠数
   * @param edges - 包含CCBarConfig的边数组
   */
  fixFrameCCBars(edges: CCBarConfig[]): void;

  /**
   * 转换为多重连接条
   * @param ccBar - 连接条配置对象
   */
  protected toMulCCBar(ccBar: CCBarConfig): void;
}