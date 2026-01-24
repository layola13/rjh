/**
 * 楼板轮廓边缘分割请求
 * 用于在楼板轮廓的边缘上添加新的顶点，实现边缘分割功能
 */

import { StateRequest } from 'HSCore.Transaction.Common';
import { Vertex } from 'HSCore.Model';
import { Util } from 'HSCore.Util';
import { LogGroupTypes } from 'HSFPConstants';

/**
 * 共边对象接口
 */
export interface ICoedge {
  /** 边缘起点 */
  from: { x: number; y: number };
  /** 边缘终点 */
  to: { x: number; y: number };
  /** 边缘长度 */
  length: number;
  /** 关联的边缘对象 */
  edge: IEdge;
}

/**
 * 边缘对象接口
 */
export interface IEdge {
  // 边缘相关属性和方法
}

/**
 * 图层对象接口
 */
export interface ILayer {
  // 图层相关属性
}

/**
 * 分割结果接口
 */
export interface ISplitResult {
  /** 新创建的顶点 */
  point: Vertex;
  /** 分割后的边缘数组 */
  edges: IEdge[];
}

/**
 * 当前参数接口
 */
export interface ICurrentParams {
  /** 活动区域类型 */
  activeSection: string;
  /** 点击比率统计信息 */
  clicksRatio: {
    /** 操作标识符 */
    id: string;
    /** 操作名称 */
    name: string;
  };
}

/**
 * 楼板轮廓边缘分割请求类
 * 继承自状态请求基类，用于处理楼板边缘的分割操作
 */
export declare class SplitSlabProfileEdgeRequest extends StateRequest {
  /** 要分割的共边对象 */
  coedge: ICoedge;
  
  /** 所属图层 */
  layer: ILayer;
  
  /** 线性插值参数，取值范围 [0, 1] */
  lerp: number;

  /**
   * 构造函数
   * @param coedge - 要分割的共边对象
   * @param layer - 所属图层
   * @param lerp - 线性插值参数，表示分割点在边缘上的相对位置
   */
  constructor(coedge: ICoedge, layer: ILayer, lerp: number);

  /**
   * 根据线性插值数值分割边缘
   * @param lerpValue - 插值参数，取值范围 [0, 1]，表示分割点在边缘上的相对位置
   * @param updateFaces - 是否更新面信息
   * @returns 分割结果，如果分割失败则返回 undefined
   */
  splitByLerpNumber(lerpValue: number, updateFaces: boolean): ISplitResult | undefined;

  /**
   * 提交操作时的回调方法
   * 执行实际的分割操作并更新楼板面
   */
  onCommit(): void;

  /**
   * 判断是否可以处理字段事务
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
   * @returns 日志分组类型
   */
  getCategory(): string;

  /**
   * 获取当前操作参数
   * @returns 包含活动区域和点击统计信息的参数对象
   */
  getCurrentParams(): ICurrentParams;
}