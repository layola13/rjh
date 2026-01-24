/**
 * 排序描述配置的更新处理方法
 * 当排序方向发生变化时触发事件通知父组件
 * 
 * @module module_internalOptions_sortDesc
 * @original_id internalOptions.sortDesc
 */

/**
 * 排序方向值类型（单个或多个列的排序）
 */
export type SortDescValue = boolean | boolean[];

/**
 * 深度相等性比较函数的类型定义
 */
export type DeepEqualFunction = <T>(a: T, b: T) => boolean;

/**
 * Vue 组件的事件发射器类型
 */
export interface VueEmitter {
  /**
   * 发射自定义事件
   * @param event - 事件名称
   * @param payload - 事件携带的数据
   */
  $emit(event: string, ...payload: unknown[]): void;
}

/**
 * 排序描述更新方法的上下文接口
 */
export interface SortDescUpdateContext extends VueEmitter {
  /**
   * 当前组件的排序方向配置
   * - boolean: 单列排序时的方向（true: 降序, false: 升序）
   * - boolean[]: 多列排序时各列的方向数组
   */
  sortDesc: SortDescValue;
}

/**
 * 处理排序方向更新的方法
 * 
 * 功能说明：
 * 1. 比较新旧排序方向值是否相等
 * 2. 如果不相等，则触发 'update:sort-desc' 事件
 * 3. 根据当前 sortDesc 类型决定发射单个值还是数组首元素
 * 
 * @param this - Vue 组件实例上下文，包含 sortDesc 属性和 $emit 方法
 * @param newValue - 新的排序方向值（可以是单个 boolean 或 boolean 数组）
 * @param currentValue - 当前的排序方向值（用于深度比较）
 * 
 * @emits update:sort-desc - 当排序方向改变时发出的事件
 *                           - 如果组件 sortDesc 为数组，则发射数组
 *                           - 如果组件 sortDesc 为 boolean，则发射数组首元素
 * 
 * @example
 *