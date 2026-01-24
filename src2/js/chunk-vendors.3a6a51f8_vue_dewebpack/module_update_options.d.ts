/**
 * 更新选项模块
 * @module update:options
 * @description 比较新旧选项对象，如果不同则触发更新事件
 */

/**
 * 深度比较工具函数类型定义
 */
interface DeepEqualUtil {
  /**
   * 深度比较两个值是否相等
   * @param value1 - 第一个比较值
   * @param value2 - 第二个比较值
   * @returns 如果两个值深度相等返回true，否则返回false
   */
  deepEqual(value1: unknown, value2: unknown): boolean;
}

/**
 * 事件发射器接口
 */
interface EventEmitter {
  /**
   * 触发事件
   * @param eventName - 事件名称
   * @param payload - 事件负载数据
   */
  $emit(eventName: string, payload: unknown): void;
}

/**
 * 选项更新函数
 * @description 比较新旧选项，如果发生变化则通过事件发射器触发update:options事件
 * @param newOptions - 新的选项对象
 * @param oldOptions - 旧的选项对象
 * @returns 如果选项不相等且成功触发事件返回事件发射结果，否则返回false
 * 
 * @example
 *