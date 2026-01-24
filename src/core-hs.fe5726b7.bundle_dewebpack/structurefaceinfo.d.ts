/**
 * 结构面信息模块
 * 用于管理和访问建筑结构中面的几何和拓扑信息
 */

import type { FaceInfo } from './FaceInfo';
import type { MathAlg } from './MathAlg';
import type { Entity, Face, Curve, Loop } from './GeometryTypes';

/**
 * 原始面信息数据结构
 */
export interface RawFaceInfo {
  /** 关联的结构体ID列表 */
  linkStructureIds: string[];
  /** 拓扑键值，用于唯一标识面的拓扑关系 */
  topoKey: string;
  /** 面的曲线表示 */
  curve?: Curve;
}

/**
 * 循环信息，描述面边界的拓扑循环
 */
export interface LoopInfo {
  /** 循环中的边集合 */
  edges: Edge[];
  /** 循环类型（外环/内环） */
  type: 'outer' | 'inner';
}

/**
 * 结构面信息类
 * 扩展基础FaceInfo，提供结构相关的几何和拓扑查询功能
 */
export declare class StructureFaceInfo extends FaceInfo {
  private readonly _rawFaceInfo: RawFaceInfo;
  private readonly _loopInfo?: LoopInfo;
  
  /** 面的主要曲线表示 */
  readonly curve?: Curve;

  /**
   * 构造函数
   * @param face - 关联的几何面对象
   * @param rawFaceInfo - 原始面信息数据
   * @param loopInfo - 可选的循环拓扑信息
   */
  constructor(face: Face, rawFaceInfo: RawFaceInfo, loopInfo?: LoopInfo);

  /**
   * 获取与当前面链接的所有结构体
   * 根据曲线重叠关系过滤出真正相关的结构
   * @returns 关联的结构实体数组
   */
  get linkStructures(): Entity[];

  /**
   * 获取拓扑循环中的前一个墙面
   * @returns 前一个墙面信息，如果不存在则返回undefined
   */
  get prev(): StructureFaceInfo | undefined;

  /**
   * 获取拓扑循环中的下一个墙面
   * @returns 下一个墙面信息，如果不存在则返回undefined
   */
  get next(): StructureFaceInfo | undefined;

  /**
   * 获取与当前结构面关联的楼板面
   * @returns 关联的楼板面，如果不存在则返回undefined
   */
  get linkSlabFace(): Face | undefined;

  /**
   * 获取面与水平面相交的所有曲线
   * @returns 相交曲线数组
   */
  get curves(): Curve[];

  /**
   * 内部方法：计算面的曲线表示
   * 对于拓扑分割后的面，计算垂直面的曲线；否则使用原始曲线
   * @private
   * @returns 计算得到的曲线，如果计算失败则返回undefined
   */
  private _getCurve(): Curve | undefined;
}