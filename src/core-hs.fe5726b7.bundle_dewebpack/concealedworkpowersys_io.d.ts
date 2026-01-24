/**
 * Module: ConcealedWorkPowerSys_IO
 * Original ID: 92255
 * 
 * 隐蔽工程电力系统相关类型定义
 * 包含系统实体及其IO序列化处理
 */

import type { Entity } from './Entity';
import type { ConcealedWorkCircuit } from './ConcealedWorkCircuit';
import type { ConcealedWorkCompEntity, ConcealedWorkCompEntity_IO } from './ConcealedWorkCompEntity';
import type { Content } from './Content';
import type { GBCircuitComp } from './GBCircuitComp';
import type { Document } from './Document';

/**
 * 序列化选项接口
 */
export interface SerializationOptions {
  [key: string]: unknown;
}

/**
 * 序列化数据格式
 */
export interface SerializedData {
  /** 关联关系ID */
  rlt?: string;
  [key: string]: unknown;
}

/**
 * 隐蔽工程电力系统 IO 序列化类
 * 负责 ConcealedWorkPowerSys 实体的序列化和反序列化
 */
export declare class ConcealedWorkPowerSys_IO extends ConcealedWorkCompEntity_IO {
  /**
   * 序列化实体数据
   * @param entity - 要序列化的电力系统实体
   * @param context - 序列化上下文
   * @param includeMetadata - 是否包含元数据
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: ConcealedWorkPowerSys,
    context?: unknown,
    includeMetadata?: boolean,
    options?: SerializationOptions
  ): [SerializedData, ...unknown[]];

  /**
   * 反序列化数据到实体
   * @param entity - 目标电力系统实体
   * @param data - 序列化的数据
   * @param context - 反序列化上下文
   */
  load(
    entity: ConcealedWorkPowerSys,
    data: SerializedData,
    context?: unknown
  ): void;

  /**
   * 获取单例实例
   */
  static instance(): ConcealedWorkPowerSys_IO;
}

/**
 * 隐蔽工程电力系统实体
 * 管理电力系统相关的回路、配电箱等组件关系
 */
export declare class ConcealedWorkPowerSys extends ConcealedWorkCompEntity {
  /**
   * 关联的配电箱实体ID
   */
  relation?: string;

  /**
   * 获取对应的IO序列化处理器
   */
  getIO(): ConcealedWorkPowerSys_IO;

  /**
   * 获取所有关联的隐蔽工程父实体
   */
  get cworks(): Entity[];

  /**
   * 获取关联的配电箱内容实体
   * @returns 配电箱实体，若不存在或类型不匹配则返回 undefined
   */
  get powerBox(): Content | undefined;

  /**
   * 获取所有关联的电路实体（已排序）
   * @returns 电路实体数组，按回路类型和编号排序
   */
  get circuits(): ConcealedWorkCircuit[];

  /**
   * 对电路数组进行排序
   * 排序规则：先按回路类型，再按回路类型编号
   * @param circuits - 要排序的电路数组
   */
  sortCircuits(circuits: ConcealedWorkCircuit[]): void;

  /**
   * 从所有父实体中移除自身
   */
  removeSelf(): void;

  /**
   * 添加电路到系统
   * @param circuit - 要添加的电路实体
   */
  addCircuit(circuit: ConcealedWorkCircuit): void;

  /**
   * 从系统中移除电路
   * @param circuit - 要移除的电路实体
   */
  removeCircuit(circuit: ConcealedWorkCircuit): void;

  /**
   * 根据标识获取电路实体
   * @param identifier - 电路标识
   * @returns 匹配的电路实体或 undefined
   */
  getCircuit(identifier: string | number): ConcealedWorkCircuit | undefined;

  /**
   * 获取文档对象
   */
  get doc(): Document;

  /**
   * 父实体映射表
   * @internal
   */
  protected _parents: Record<string, Entity>;

  /**
   * 子实体映射表
   * @internal
   */
  protected _children: Record<string, Entity>;

  /**
   * 添加隐蔽工程实体（内部方法）
   * @internal
   */
  protected _addCWEntity(collection: Entity[], entity: Entity): void;

  /**
   * 移除隐蔽工程实体（内部方法）
   * @internal
   */
  protected _removeCWEntity(collection: Entity[], entity: Entity): void;

  /**
   * 获取隐蔽工程实体（内部方法）
   * @internal
   */
  protected _getCWEntity(collection: Entity[], identifier: string | number): Entity | undefined;
}