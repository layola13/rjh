/**
 * Module: DeleteVertexRequest
 * Original ID: 850023
 * Exports: DeleteVertexRequest
 */

import { StateRequest } from './StateRequest';
import { Line2d, Arc2d, Loop } from './GeometryTypes';
import { HSCore } from './HSCore';

/**
 * 表示草图中的点（顶点）
 */
export interface Point2d {
  x: number;
  y: number;
  equals(other: Point2d): boolean;
}

/**
 * 表示草图中的边
 */
export interface Edge {
  curve: Curve2d;
  isBackground?: boolean;
}

/**
 * 表示草图中的曲线基类
 */
export interface Curve2d {
  from: Point2d;
  to: Point2d;
  containsPoint(point: Point2d): boolean;
  getStartPt(): Point2d;
  getEndPt(): Point2d;
  reversed(): Curve2d;
  isClosed?(): boolean;
}

/**
 * 表示共边（有向边）
 */
export interface CoEdge {
  edge: Edge;
  isRev: boolean;
  toMathCurve(): Curve2d;
}

/**
 * 表示线环（由共边组成的闭合环）
 */
export interface Wire {
  coedges: CoEdge[];
}

/**
 * 表示面及其线环的关系
 */
export interface FaceWireRelation {
  face: Face;
  wire: Wire;
  isOuter: boolean;
}

/**
 * 表示草图中的面
 */
export interface Face {
  topos: string[];
  isOuter?: boolean;
}

/**
 * 表示草图
 */
export interface Sketch2d {
  background: {
    regions: BackgroundRegion[];
  };
}

/**
 * 表示背景区域
 */
export interface BackgroundRegion {
  outer: Curve2d[];
  holes: Curve2d[][];
}

/**
 * 表示区域配置（用于创建新区域）
 */
export interface RegionConfig {
  outer: Array<{ curve: Curve2d }>;
  holes: Curve2d[][];
  topo?: string;
}

/**
 * 表示多边形工具的布尔运算结果节点
 */
export interface PolygonBoolResult {
  root: {
    holes: CoEdge[][];
  };
}

/**
 * 表示多边形工具的布尔运算选项
 */
export interface PolygonBoolOptions {
  clean?: number;
  scaleFix?: number;
}

/**
 * 表示草图2D构建器
 */
export interface Sketch2dBuilder {
  getSketch(): Sketch2d;
  removeFaces(faces: Face[]): void;
  changeBackground(background: typeof HSCore.Model.ExtraordinaryBackground): void;
  addRegions(regions: RegionConfig[]): void;
  updateAppendix(): void;
  updateSketch2d(): void;
}

/**
 * 删除顶点请求类
 * 用于处理外部区域绘制中删除顶点的操作
 */
export declare class DeleteVertexRequest extends StateRequest {
  private sketch2dBuilder: Sketch2dBuilder;
  private vertex: Point2d;

  /**
   * 构造函数
   * @param sketch2dBuilder - 草图2D构建器实例
   * @param vertex - 要删除的顶点
   */
  constructor(sketch2dBuilder: Sketch2dBuilder, vertex: Point2d);

  /**
   * 提交操作时执行
   * 处理删除顶点后的面、洞和背景更新
   */
  onCommit(): void;

  /**
   * 处理与删除顶点相关的洞
   * @param edges - 连接到该顶点的边集合
   * @param sketch - 当前草图
   * @param facesToRemove - 需要移除的面集合（输出参数）
   * @param regionsToAdd - 需要添加的区域集合（输出参数）
   */
  private _handleHoles(
    edges: Edge[],
    sketch: Sketch2d,
    facesToRemove: Set<Face>,
    regionsToAdd: RegionConfig[]
  ): void;

  /**
   * 处理背景区域中的顶点删除
   * @param edges - 连接到该顶点的边集合
   * @param sketch - 当前草图
   * @param newBackgroundLoops - 新的背景线环集合（输出参数）
   */
  private _handleBackground(
    edges: Edge[],
    sketch: Sketch2d,
    newBackgroundLoops: Loop[]
  ): void;

  /**
   * 简化无效的线环
   * @param loop - 需要简化的线环
   * @returns 简化后的曲线数组集合
   */
  private _simplifyLoop(loop: Loop): Curve2d[][];

  /**
   * 撤销操作时执行
   */
  onUndo(): void;

  /**
   * 重做操作时执行
   */
  onRedo(): void;

  /**
   * 是否可以进行事务字段操作
   * @returns 始终返回 true
   */
  canTransactField(): boolean;

  /**
   * 获取操作描述
   * @returns 操作的中文描述
   */
  getDescription(): string;

  /**
   * 获取操作分类
   * @returns 日志分组类型（外部区域绘制）
   */
  getCategory(): string;
}