/**
 * 描述性多边形点集模块
 * 用于处理包含直线段和圆弧的复杂多边形几何
 */

import type Flatten from '@flatten-js/core';

/**
 * 边的类型
 */
type EdgeType = 'segment' | 'arc';

/**
 * 多边形关系数据点
 * 描述多边形顶点及其相邻边的几何关系
 */
interface IPolygonRelationPoint {
  /** 当前顶点在顶点数组中的索引 */
  vertexIndex: number;
  
  /** 顶点坐标 */
  vertex: Flatten.Point;
  
  /** 边的类型：直线段或圆弧 */
  type: EdgeType;
  
  /** 下一个顶点的索引 */
  nextPtIndex: number;
  
  /** 上一个顶点的索引 */
  prevPtIndex: number;
  
  /** 控制点：对于直线段为中点，对于圆弧为圆弧中点 */
  controlPoint: Flatten.Point;
  
  /** 圆弧是否逆时针方向（仅对圆弧有效） */
  ccw: boolean;
}

/**
 * 多边形关系数据点类
 * 内部实现类，用于存储顶点的拓扑关系
 */
declare class PolygonRelationPoint implements IPolygonRelationPoint {
  vertexIndex: number;
  vertex: Flatten.Point;
  type: EdgeType;
  nextPtIndex: number;
  prevPtIndex: number;
  controlPoint: Flatten.Point;
  ccw: boolean;

  constructor();

  /**
   * 克隆当前关系点
   * @returns 新的关系点实例
   */
  clone(): PolygonRelationPoint;
}

/**
 * 描述性多边形点集类
 * 提供多边形顶点和边的描述性表示，支持直线段和圆弧混合的多边形
 */
export declare class DescriptivePolygonPoints {
  /** 原始多边形对象 */
  readonly polygon: Flatten.Polygon;
  
  /** 多边形的顶点数组 */
  vertexes: Flatten.Point[];
  
  /** 顶点关系数据数组，描述每个顶点与相邻边的关系 */
  relationData: PolygonRelationPoint[];

  /**
   * 构造函数
   * @param polygon - Flatten.js多边形对象，边可以是Segment或Arc
   * @throws {Error} 当边数小于3时抛出异常
   * @throws {Error} 当遇到未知边类型时抛出异常
   */
  constructor(polygon: Flatten.Polygon);

  /**
   * 构建多边形的边集合
   * 根据relationData重建Segment和Arc对象数组
   * @returns 边对象数组（Segment或Arc）
   * @throws {Error} 当遇到未知边类型时抛出异常
   */
  buildWinEdges(): Array<Flatten.Segment | Flatten.Arc>;

  /**
   * 沿直线镜像多边形
   * 要求镜像线与多边形恰好有两个交点，且将多边形分为对称的两部分
   * 
   * @param startPoint - 镜像线起点
   * @param endPoint - 镜像线终点
   * @param param3 - 保留参数（未使用）
   * @param param4 - 保留参数（未使用）
   * @throws {Error} 当镜像线与多边形交点数不为2时
   * @throws {Error} 当无法找到起始/结束顶点时
   * @throws {Error} 当多边形不是对称结构时
   */
  lineMirror(
    startPoint: Flatten.Point,
    endPoint: Flatten.Point,
    param3?: boolean,
    param4?: boolean
  ): void;
}