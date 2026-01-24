/**
 * 排序方式更新模块
 * @module update:sort-by
 * 
 * 触发排序方式更新事件的处理函数
 */

/**
 * 排序字段类型
 * 常见的排序字段标识符
 */
type SortByValue = string | number | null | undefined;

/**
 * 事件发射器接口
 * 定义了 $emit 方法的基本结构
 */
interface EventEmitter {
  /**
   * 发射自定义事件
   * @param eventName - 事件名称
   * @param payload - 事件负载数据
   */
  $emit(eventName: string, payload: unknown): void;
}

/**
 * 更新排序方式
 * 
 * @param sortBy - 新的排序依据值
 * @param emitter - 事件发射器实例（通常是 Vue 组件实例）
 * @returns 无返回值
 * 
 * @example
 *