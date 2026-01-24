/**
 * 交互式模型基类
 * 提供实体的标志位管理、状态变更通知等核心功能
 * @module InteractiveModel
 */

/**
 * 实体事件选项接口
 */
export interface EntityEventOptions {
  [key: string]: unknown;
}

/**
 * 实体事件接口
 */
export interface EntityEvent {
  /** 事件类型 */
  type: HSCore.Model.EntityEventType;
  /** 事件选项 */
  options?: EntityEventOptions;
}

/**
 * 标志变更事件接口
 */
export interface FlagChangedEvent extends EntityEventOptions {
  /** 变更的标志位 */
  flag: number;
}

/**
 * 交互式模型类
 * 管理实体的唯一标识、标志位状态，并提供变更通知机制
 */
export declare class InteractiveModel {
  /**
   * 实体唯一标识符
   * @private
   */
  private _id: string;

  /**
   * 持久化标志位
   * @private
   */
  private _flag: number;

  /**
   * 临时标志位
   * @private
   */
  private _tempFlag: number;

  /**
   * 标志位变更信号
   * 当标志位状态改变时触发
   */
  readonly signalFlagChanged: HSCore.Util.Signal<FlagChangedEvent>;

  /**
   * 脏数据信号
   * 当实体数据需要更新时触发
   */
  readonly signalDirty: HSCore.Util.Signal<EntityEvent>;

  /**
   * 构造函数
   * @param id - 可选的初始ID，留空则自动生成
   */
  constructor(id?: string);

  /**
   * 获取实体ID
   * @readonly
   */
  get id(): string;

  /**
   * 生成新的临时ID
   * 使用HSCore的ID生成器创建唯一标识符
   */
  generateId(): void;

  /**
   * 标记实体为脏数据状态
   * @param event - 实体事件对象，默认为Display类型事件
   * @param options - 附加的事件选项
   */
  dirty(event?: EntityEvent, options?: EntityEventOptions): void;

  /**
   * 检查实体是否可编辑
   * @returns 当实体未被冻结时返回true
   */
  canEdit(): boolean;

  /**
   * 检查实体是否可选中
   * @returns 当实体未被移除且可选中时返回true
   */
  canSelect(): boolean;

  /**
   * 检查指定标志位是否开启
   * @param flag - 要检查的标志位
   * @param includeTemp - 是否同时检查临时标志位，默认为true
   * @returns 标志位开启时返回true
   */
  isFlagOn(flag: number, includeTemp?: boolean): boolean;

  /**
   * 检查指定标志位是否关闭
   * @param flag - 要检查的标志位
   * @param includeTemp - 是否同时检查临时标志位，默认为true
   * @returns 标志位关闭时返回true
   */
  isFlagOff(flag: number, includeTemp?: boolean): boolean;

  /**
   * 开启指定标志位
   * @param flag - 要开启的标志位
   * @param isTemp - 是否设置为临时标志，默认为false
   * @param options - 附加的事件选项
   */
  setFlagOn(flag: number, isTemp?: boolean, options?: EntityEventOptions): void;

  /**
   * 关闭指定标志位
   * @param flag - 要关闭的标志位
   * @param isTemp - 是否设置为临时标志，默认为false
   * @param options - 附加的事件选项
   */
  setFlagOff(flag: number, isTemp?: boolean, options?: EntityEventOptions): void;

  /**
   * 销毁实体
   * 释放所有信号监听器和资源
   */
  destroy(): void;
}