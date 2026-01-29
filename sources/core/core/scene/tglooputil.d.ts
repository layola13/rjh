/**
 * TgLoopUtil - 提供循环(Loop)对象的创建和更新工具方法
 * 
 * 该工具类用于处理几何循环结构，支持通过曲线集合创建新循环或更新现有循环
 */

import { Loop } from './Loop';
import { Vector3 } from './Vector3';

/**
 * 曲线接口 - 表示几何曲线对象
 */
export interface Curve {
  /**
   * 获取曲线起始点
   */
  getStartPt(): Point3D;
  
  /**
   * 返回该曲线的反向版本
   */
  reversed(): Curve;
}

/**
 * 三维点接口
 */
export interface Point3D {
  x: number;
  y: number;
  z?: number;
}

/**
 * 顶点接口 - 表示循环中的顶点
 */
export interface Vertex {
  /**
   * 设置顶点坐标
   */
  set(x: number, y: number, z: number): void;
}

/**
 * 边接口 - 表示循环的边
 */
export interface Edge {
  /** 边关联的曲线 */
  curve: Curve;
}

/**
 * 共边接口 - 表示拓扑边及其方向
 */
export interface CoEdge {
  /** 关联的边对象 */
  edge: Edge;
  /** 边是否反向 */
  reversed: boolean;
}

/**
 * 循环接口 - 表示由曲线构成的闭合循环
 */
export interface Loop {
  /**
   * 获取循环的所有共边
   */
  getCoEdges(): CoEdge[];
  
  /**
   * 获取循环的所有顶点
   */
  getLoopVertices(): Vertex[];
}

/**
 * TgLoopUtil 工具类
 * 
 * 提供几何循环的创建和更新功能
 */
export declare class TgLoopUtil {
  /**
   * 根据曲线集合创建或更新循环
   * 
   * @param existingLoop - 现有的循环对象，如果为null则创建新循环
   * @param curves - 用于构建循环的曲线数组
   * @param forceCreate - 是否强制创建新循环，默认为true
   * 
   * @returns 创建或更新后的循环对象
   * 
   * @remarks
   * - 当forceCreate为true时，总是创建新循环
   * - 当forceCreate为false且existingLoop存在时：
   *   - 如果现有循环的边数与曲线数量匹配，则更新现有循环
   *   - 自动计算顶点偏移量以保持拓扑一致性
   *   - 更新顶点坐标和边的曲线数据
   * - 否则创建新循环
   */
  static createOrUpdateLoopByCurves(
    existingLoop: Loop | null,
    curves: Curve[],
    forceCreate?: boolean
  ): Loop;
}