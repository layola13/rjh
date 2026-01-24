/**
 * 当前项模块
 * 
 * 该模块用于处理和管理当前活动项的状态更新。
 * 当调用该函数时，会同时更新内部状态并触发事件通知。
 * 
 * @module CurrentItems
 * @originalId current-items
 */

/**
 * 表示单个项的数据结构
 */
export interface CurrentItem {
  /** 项的唯一标识符 */
  id: string | number;
  /** 项的名称或标题 */
  name?: string;
  /** 其他可能的属性 */
  [key: string]: unknown;
}

/**
 * 包含事件发射功能的上下文对象接口
 */
export interface EventEmitter {
  /** 内部存储的当前项列表 */
  internalCurrentItems?: CurrentItem[];
  
  /**
   * 触发事件并通知所有订阅者
   * @param eventName - 事件名称
   * @param payload - 事件携带的数据
   */
  $emit(eventName: string, payload: unknown): void;
}

/**
 * 更新当前项列表的处理函数
 * 
 * 该函数执行两个操作：
 * 1. 将新的项列表存储到上下文的 internalCurrentItems 属性中
 * 2. 触发 "current-items" 事件，通知订阅者项列表已更新
 * 
 * @param this - 事件发射器上下文对象
 * @param items - 新的当前项数组
 * 
 * @example
 *