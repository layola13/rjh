/**
 * 更新排序方式的事件处理函数
 * @module module_update_sort_by
 * @original-id update:sort-by
 */

/**
 * 排序字段类型
 * 定义可用的排序字段
 */
type SortByValue = string | number | null | undefined;

/**
 * 事件发射器接口
 * 通常由 Vue 组件实例实现
 */
interface EventEmitter {
  /**
   * 发射自定义事件
   * @param event - 事件名称
   * @param payload - 事件负载数据
   */
  $emit(event: string, payload?: unknown): void;
}

/**
 * 发射 update:sort-by 事件以更新排序字段
 * 
 * @param this - 事件发射器上下文（通常是 Vue 组件实例）
 * @param sortBy - 新的排序字段值
 * @returns void
 * 
 * @example
 *