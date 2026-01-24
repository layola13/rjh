/**
 * B3 隐藏工作管道树模块
 * 用于构建和管理隐藏工作管道的树形结构数据
 */

import { B3Entity } from './B3Entity';
import { B3ConcealedWorkTube } from './B3ConcealedWorkTube';

/**
 * BOM3 实体数据接口
 */
export interface Bom3EntityData {
  [key: string]: unknown;
}

/**
 * BOM3 管道树数据结构
 */
export interface Bom3ConcealedWorkTubeTreeData {
  /** 实体数据 */
  entity: Bom3EntityData;
  /** 子管道列表 */
  tubes: Bom3ConcealedWorkTubeData[];
}

/**
 * BOM3 管道数据结构
 */
export interface Bom3ConcealedWorkTubeData {
  [key: string]: unknown;
}

/**
 * 实体接口 - 表示具有子节点的实体对象
 */
export interface IEntity {
  /** 获取子实体列表 */
  getChildren(): IEntity[];
}

/**
 * B3 隐藏工作管道树
 * 继承自 B3Entity，用于处理隐藏工作管道的层级结构
 */
export declare class B3ConcealedWorkTubeTree extends B3Entity {
  /**
   * 构造函数
   * @param context - 上下文对象
   */
  constructor(context?: unknown);

  /**
   * 构建 BOM3 数据结构
   * 将实体及其子管道转换为 BOM3 格式的数据
   * @param entity - 源实体对象
   * @returns BOM3 格式的管道树数据
   */
  buildBom3Data(entity: IEntity): Bom3ConcealedWorkTubeTreeData;
}