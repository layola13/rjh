/**
 * Frametify模块 - 用于创建框架和内部多边形的工具类
 * 支持处理包含线段和圆弧的复杂多边形，生成框架条和内部多边形
 */

import Flatten from '@flatten-js/core';
import { WinPolygon } from './WinPolygon';
import { EdgeJointWay, Dock, PolyId, Utils } from './types';
import { ArcUtils } from './ArcUtils';

/**
 * 框架化结果接口
 */
export interface FrametifyResult {
  /** 框架条多边形数组 */
  barPolys: WinPolygon[];
  /** 内部多边形数组 */
  innerPolys: WinPolygon[];
}

/**
 * 边方向检测结果接口
 */
export interface EdgeDirection {
  /** 第一边的方向 (horizontal/vertical) */
  fst: 'h' | 'v' | '';
  /** 第二边的方向 (horizontal/vertical) */
  scd: 'h' | 'v' | '';
}

/**
 * Frametify类 - 多边形框架化处理器
 * 将多边形转换为框架结构，生成框架条和内部空腔
 */
export declare class Frametify {
  /** 输入的原始多边形 */
  private poly: WinPolygon;
  
  /** 内部多边形集合 */
  private innerPolys: WinPolygon[];
  
  /** 框架条多边形集合 */
  private barPolys: WinPolygon[];

  /**
   * 构造函数
   * @param polygon - 待处理的多边形
   */
  constructor(polygon: WinPolygon);

  /**
   * 执行框架化操作
   * @param offsets - 偏移距离数组，每条边对应一个偏移值
   * @param jointWays - 边连接方式数组，定义相邻边的连接策略
   * @returns 包含框架条和内部多边形的结果对象
   */
  run(offsets: number[], jointWays: EdgeJointWay[]): FrametifyResult;

  /**
   * 生成内部多边形
   * @param offsets - 偏移距离数组
   * @returns 内部多边形数组
   */
  private innerPolygons(offsets: number[]): WinPolygon[];

  /**
   * 生成框架条多边形
   * @param offsets - 偏移距离数组
   * @param jointWays - 边连接方式数组
   * @returns 框架条多边形数组
   */
  private barPolygons(offsets: number[], jointWays: EdgeJointWay[]): WinPolygon[];

  /**
   * 创建默认框架条（不使用特殊连接方式）
   * @param outerEdges - 外部边数组
   * @param innerEdges - 内部边数组
   * @returns 框架条多边形数组
   */
  private createDefaultBar(
    outerEdges: Array<Flatten.Segment | Flatten.Arc>,
    innerEdges: Array<Flatten.Segment | Flatten.Arc>
  ): WinPolygon[];

  /**
   * 创建圆环框架（用于圆形多边形）
   * @param circle - 圆形信息
   * @param offset - 偏移距离
   * @returns 包含单个圆环的数组
   */
  private createRing(circle: Flatten.Circle, offset: number): WinPolygon[];

  /**
   * 检查两条边的水平/垂直方向关系
   * @param edge1 - 第一条边
   * @param edge2 - 第二条边
   * @returns 边方向信息对象
   */
  private checkHv(
    edge1: Flatten.Segment | Flatten.Arc,
    edge2: Flatten.Segment | Flatten.Arc
  ): EdgeDirection;

  /**
   * 修正空心框架的水平/垂直方向
   * @param direction - 方向对象
   * @param shouldFix - 是否需要修正
   */
  private fixHvForHollowFrame(direction: EdgeDirection, shouldFix: boolean): void;

  /**
   * 检查两条边是否朝向相反
   * @param edge1 - 第一条边
   * @param edge2 - 第二条边
   * @returns 是否朝向相反
   */
  private oppositeToward(
    edge1: Flatten.Segment | Flatten.Arc,
    edge2: Flatten.Segment | Flatten.Arc
  ): boolean;

  /**
   * 创建框架条（支持多种连接方式）
   * @param outerEdges - 外部边数组
   * @param innerEdges - 内部边数组
   * @param jointWays - 边连接方式数组
   * @returns 框架条多边形数组
   */
  private createBar(
    outerEdges: Array<Flatten.Segment | Flatten.Arc>,
    innerEdges: Array<Flatten.Segment | Flatten.Arc>,
    jointWays: EdgeJointWay[]
  ): WinPolygon[];

  /**
   * 验证边连接方式是否有效
   * @param jointWay - 连接方式
   * @param currentEdge - 当前边
   * @param previousEdge - 前一条边
   * @returns 是否无效
   */
  private invalidEjw(
    jointWay: EdgeJointWay,
    currentEdge: Flatten.Segment | Flatten.Arc,
    previousEdge: Flatten.Segment | Flatten.Arc
  ): boolean;

  /**
   * 检查边是否与圆弧相切
   * @param edge1 - 第一条边
   * @param edge2 - 第二条边
   * @returns 是否相切
   */
  private isTangentToArc(
    edge1: Flatten.Segment | Flatten.Arc,
    edge2: Flatten.Segment | Flatten.Arc
  ): boolean;

  /**
   * 检查并修正小圆弧
   * @param outerEdges - 外部边数组
   * @param innerEdges - 内部边数组
   * @returns 修正后的内部边数组
   */
  static checkSmallArc(
    outerEdges: Array<Flatten.Segment | Flatten.Arc>,
    innerEdges: Array<Flatten.Segment | Flatten.Arc>
  ): Array<Flatten.Segment | Flatten.Arc>;

  /**
   * 查找偏移多边形
   * @param polygon - 原始多边形
   * @param offsets - 偏移距离数组
   * @param isInward - 是否向内偏移
   * @returns 偏移后的多边形
   */
  static findPoly(
    polygon: WinPolygon,
    offsets: number[],
    isInward: boolean
  ): WinPolygon;

  /**
   * 查找平行边（静态方法，公开接口）
   * @param edges - 边数组
   * @param offsets - 偏移距离数组
   * @param isInward - 是否向内偏移
   * @param orientation - 多边形方向（顺时针/逆时针）
   * @param isClosed - 是否闭合
   * @returns 平行边数组
   */
  static findParallelEdges(
    edges: Array<Flatten.Segment | Flatten.Arc>,
    offsets: number[],
    isInward: boolean,
    orientation?: Flatten.ORIENTATION,
    isClosed?: boolean
  ): Array<Flatten.Segment | Flatten.Arc>;

  /**
   * 查找平行边（内部实现）
   * @param edges - 边数组
   * @param offsets - 偏移距离数组
   * @param isInward - 是否向内偏移
   * @param orientation - 多边形方向
   * @param isClosed - 是否闭合
   * @returns 平行边数组
   */
  private static _findParallelEdges(
    edges: Array<Flatten.Segment | Flatten.Arc>,
    offsets: number[],
    isInward: boolean,
    orientation: Flatten.ORIENTATION,
    isClosed: boolean
  ): Array<Flatten.Segment | Flatten.Arc>;

  /**
   * 计算相邻边的交点并更新边的端点
   * @param edges - 边数组（会被修改）
   * @param index - 当前边的索引
   */
  private static edgeIntersection(
    edges: Array<Flatten.Segment | Flatten.Arc>,
    index: number
  ): void;
}