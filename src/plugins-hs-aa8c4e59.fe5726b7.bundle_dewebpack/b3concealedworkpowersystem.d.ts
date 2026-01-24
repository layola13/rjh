/**
 * B3隐蔽工程电源系统模块
 * 用于处理隐蔽工程中的电源系统数据转换和BOM3数据构建
 */

import { B3Entity } from './B3Entity';
import { B3ConcealedWorkCircuit } from './B3ConcealedWorkCircuit';
import { turnEntityToBom3Entity } from './entityUtils';

/**
 * BOM3电源系统数据结构
 */
export interface Bom3PowerSystemData {
  /** 实体信息 */
  entity: Bom3Entity;
  /** 电路列表 */
  circuits: Bom3CircuitData[];
}

/**
 * BOM3实体数据结构
 */
export interface Bom3Entity {
  [key: string]: unknown;
}

/**
 * BOM3电路数据结构
 */
export interface Bom3CircuitData {
  [key: string]: unknown;
}

/**
 * 实体接口，定义实体对象的基本方法
 */
export interface IEntity {
  /** 获取子实体列表 */
  getChildren(): IEntity[];
  [key: string]: unknown;
}

/**
 * 上下文接口
 */
export interface IContext {
  [key: string]: unknown;
}

/**
 * B3隐蔽工程电源系统类
 * 继承自B3Entity，用于构建隐蔽工程电源系统的BOM3数据
 */
export declare class B3ConcealedWorkPowerSystem extends B3Entity {
  /**
   * 构造函数
   * @param context - 上下文对象
   */
  constructor(context: IContext);

  /**
   * 构建BOM3数据
   * 将实体及其子电路转换为BOM3格式的数据结构
   * @param entity - 待转换的实体对象
   * @returns BOM3电源系统数据对象，包含实体信息和电路列表
   */
  buildBom3Data(entity: IEntity): Bom3PowerSystemData;

  /** 上下文对象 */
  protected context: IContext;
}