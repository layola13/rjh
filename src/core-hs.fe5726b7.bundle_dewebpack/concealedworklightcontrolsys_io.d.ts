/**
 * Module: ConcealedWorkLightControlSys_IO
 * 
 * 隐蔽工程灯光控制系统模块，提供灯光逻辑的管理和持久化功能。
 * 
 * @module ConcealedWorkLightControlSys_IO
 * @exports ConcealedWorkLightControlSys - 灯光控制系统实体类
 * @exports ConcealedWorkLightControlSys_IO - 灯光控制系统IO序列化类
 */

import { Entity } from './Entity';
import { ConcealedWorkLightLogic } from './ConcealedWorkLightLogic';
import { ConcealedWorkCompEntity_IO, ConcealedWorkCompEntity } from './ConcealedWorkCompEntity';

/**
 * 序列化上下文接口
 */
interface SerializationContext {
  [key: string]: unknown;
}

/**
 * 灯光控制系统IO类
 * 
 * 负责灯光控制系统的序列化和反序列化操作
 * 
 * @extends ConcealedWorkCompEntity_IO
 */
export class ConcealedWorkLightControlSys_IO extends ConcealedWorkCompEntity_IO {
  /**
   * 获取单例实例
   * 
   * @returns IO实例
   */
  static instance(): ConcealedWorkLightControlSys_IO;

  /**
   * 序列化对象到目标
   * 
   * @param target - 序列化目标对象
   * @param context - 序列化上下文（未使用）
   * @param includeChildren - 是否包含子对象，默认true
   * @param options - 额外的序列化选项
   * @returns 序列化后的结果
   */
  dump(
    target: unknown,
    context?: unknown,
    includeChildren?: boolean,
    options?: SerializationContext
  ): unknown;

  /**
   * 从源数据加载对象
   * 
   * @param source - 源数据
   * @param target - 目标对象
   * @param context - 加载上下文
   */
  load(source: unknown, target: unknown, context: unknown): void;
}

/**
 * 灯光控制系统实体类
 * 
 * 管理隐蔽工程中的灯光逻辑实体，支持添加、删除和查询灯光逻辑。
 * 
 * @extends ConcealedWorkCompEntity
 */
export class ConcealedWorkLightControlSys extends ConcealedWorkCompEntity {
  /**
   * 父级实体映射
   * @private
   */
  private _parents: Record<string, unknown>;

  /**
   * 子级实体映射
   * @private
   */
  private _children: Record<string, ConcealedWorkLightLogic | unknown>;

  /**
   * 获取IO序列化实例
   * 
   * @returns 对应的IO实例
   */
  getIO(): ConcealedWorkLightControlSys_IO;

  /**
   * 获取所有关联的隐蔽工程对象
   * 
   * @returns 隐蔽工程对象数组
   */
  get cworks(): unknown[];

  /**
   * 获取所有灯光逻辑实体
   * 
   * @returns 灯光逻辑实体数组
   */
  get lightLogics(): ConcealedWorkLightLogic[];

  /**
   * 从所有父级中移除自身
   * 
   * 遍历所有父级对象，从中移除当前实体的引用
   */
  removeSelf(): void;

  /**
   * 添加灯光逻辑实体
   * 
   * @param lightLogic - 要添加的灯光逻辑实体
   */
  addLightLogic(lightLogic: ConcealedWorkLightLogic): void;

  /**
   * 移除灯光逻辑实体
   * 
   * @param lightLogic - 要移除的灯光逻辑实体
   */
  removeLightLogic(lightLogic: ConcealedWorkLightLogic): void;

  /**
   * 获取指定的灯光逻辑实体
   * 
   * @param identifier - 灯光逻辑的标识符
   * @returns 对应的灯光逻辑实体，如果不存在则返回undefined
   */
  getLightLogic(identifier: string | number): ConcealedWorkLightLogic | undefined;

  /**
   * 添加隐蔽工程实体（受保护方法）
   * 
   * @protected
   * @param collection - 实体集合
   * @param entity - 要添加的实体
   */
  protected _addCWEntity(collection: unknown[], entity: unknown): void;

  /**
   * 移除隐蔽工程实体（受保护方法）
   * 
   * @protected
   * @param collection - 实体集合
   * @param entity - 要移除的实体
   */
  protected _removeCWEntity(collection: unknown[], entity: unknown): void;

  /**
   * 获取隐蔽工程实体（受保护方法）
   * 
   * @protected
   * @param collection - 实体集合
   * @param identifier - 实体标识符
   * @returns 对应的实体
   */
  protected _getCWEntity(collection: unknown[], identifier: string | number): unknown;
}

/**
 * 全局常量声明
 */
declare const HSConstants: {
  ModelClass: {
    ConcealedWorkLightControlSys: string;
  };
};

// 注册实体类到全局Entity系统
Entity.registerClass(
  HSConstants.ModelClass.ConcealedWorkLightControlSys,
  ConcealedWorkLightControlSys
);