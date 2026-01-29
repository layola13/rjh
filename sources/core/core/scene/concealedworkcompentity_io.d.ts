/**
 * 隐蔽工程组件实体模块
 * 提供带组件系统的实体类及其序列化/反序列化功能
 * 
 * @module ConcealedWorkCompEntity_IO
 * @originalId 86829
 */

import { EntityField } from './decorators';
import { Entity, Entity_IO } from './Entity';
import { ComponentLoaderManager } from './ComponentLoaderManager';

/**
 * 组件接口
 * 定义组件的基本结构
 */
export interface IComponent {
  /** 组件类型标识 */
  type: string;
  
  /** 组件所属的引用对象 */
  referObject?: ConcealedWorkCompEntity;
  
  /** 序列化组件数据 */
  dump(): Record<string, unknown>;
}

/**
 * 序列化后的实体数据结构
 */
export interface SerializedEntityData {
  /** 组件数据数组 */
  comps?: Array<Record<string, unknown>>;
  
  [key: string]: unknown;
}

/**
 * 隐蔽工程组件实体的IO处理器
 * 负责实体及其组件的序列化和反序列化
 */
export declare class ConcealedWorkCompEntity_IO extends Entity_IO {
  /**
   * 序列化实体数据
   * 
   * @param entity - 要序列化的实体对象
   * @param context - 序列化上下文
   * @param includeDefaults - 是否包含默认值
   * @param options - 额外的序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: ConcealedWorkCompEntity,
    context?: unknown,
    includeDefaults?: boolean,
    options?: Record<string, unknown>
  ): [SerializedEntityData, ...unknown[]];

  /**
   * 反序列化实体数据
   * 
   * @param entity - 目标实体对象
   * @param data - 序列化的数据
   * @param context - 反序列化上下文
   */
  load(
    entity: ConcealedWorkCompEntity,
    data: SerializedEntityData,
    context?: unknown
  ): void;

  /**
   * 获取单例实例
   */
  static instance(): ConcealedWorkCompEntity_IO;
}

/**
 * 隐蔽工程组件实体类
 * 支持动态添加/移除组件的实体基类
 */
export declare class ConcealedWorkCompEntity extends Entity {
  /**
   * 实体的组件集合
   * 使用Map存储，key为组件类型，value为组件实例
   */
  @EntityField()
  components?: Map<string, IComponent>;

  /**
   * 获取实体的IO处理器
   * 
   * @returns IO处理器实例
   */
  getIO(): ConcealedWorkCompEntity_IO;

  /**
   * 添加组件到实体
   * 如果该类型组件已存在，则不会重复添加
   * 
   * @param component - 要添加的组件
   * @returns 添加的组件实例
   */
  addComponent<T extends IComponent>(component: T): T;

  /**
   * 移除指定类型的组件
   * 
   * @param componentType - 要移除的组件类型
   */
  removeComponent(componentType: string): void;

  /**
   * 获取指定类型的组件
   * 
   * @param componentType - 组件类型
   * @returns 组件实例，不存在则返回undefined
   */
  getComponent<T extends IComponent = IComponent>(componentType: string): T | undefined;

  /**
   * 添加隐蔽工程子实体
   * 
   * @param entityList - 现有实体列表
   * @param entities - 要添加的单个或多个实体
   * @protected
   */
  protected _addCWEntity(
    entityList: ConcealedWorkCompEntity[],
    entities: ConcealedWorkCompEntity | ConcealedWorkCompEntity[]
  ): void;

  /**
   * 移除隐蔽工程子实体
   * 
   * @param entityList - 现有实体列表
   * @param entities - 要移除的实体或实体ID
   * @protected
   */
  protected _removeCWEntity(
    entityList: ConcealedWorkCompEntity[],
    entities: ConcealedWorkCompEntity | string | Array<ConcealedWorkCompEntity | string>
  ): void;

  /**
   * 根据ID获取隐蔽工程子实体
   * 
   * @param entityList - 实体列表
   * @param entityId - 实体ID
   * @returns 找到的实体，不存在则返回undefined
   * @protected
   */
  protected _getCWEntity(
    entityList: ConcealedWorkCompEntity[],
    entityId: string
  ): ConcealedWorkCompEntity | undefined;
}

/**
 * 全局常量命名空间（外部定义）
 */
declare global {
  namespace HSConstants {
    enum ModelClass {
      ConcealedWorkCompEntity = 'ConcealedWorkCompEntity'
    }
  }
}