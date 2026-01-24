/**
 * Group-By 内部选项监听器模块
 * 
 * 该模块用于监听和处理组件的 groupBy 属性变化。
 * 当 groupBy 值发生变化时，会触发相应的更新事件。
 * 
 * @module module_internalOptions_groupBy
 * @originalId internalOptions.groupBy
 */

/**
 * 深度比较工具函数类型
 * 用于比较两个值是否深度相等
 */
interface DeepEqualUtil {
  deepEqual<T>(value1: T, value2: T): boolean;
}

/**
 * Vue 组件实例类型
 * 包含必要的事件发射和属性访问能力
 */
interface VueComponentInstance {
  /**
   * 发射组件事件
   * @param eventName - 事件名称
   * @param payload - 事件负载数据
   */
  $emit(eventName: string, payload: unknown): void;
  
  /**
   * 当前组件的 groupBy 属性
   * 可以是单个值或值的数组
   */
  groupBy: string | string[] | number | number[];
}

/**
 * Group-By 属性变化监听器
 * 
 * 该函数作为 Vue watcher 监听 groupBy 属性的变化。
 * 当新旧值不相等时，会发射 'update:group-by' 事件。
 * 
 * @remarks
 * - 如果 groupBy 是数组，则发射整个新数组
 * - 如果 groupBy 不是数组，则发射新数组的第一个元素
 * - 使用深度比较避免不必要的更新
 * 
 * @param this - Vue 组件实例上下文
 * @param newValue - groupBy 的新值（可以是数组或单个值）
 * @param oldValue - groupBy 的旧值（可以是数组或单个值）
 * 
 * @example
 *