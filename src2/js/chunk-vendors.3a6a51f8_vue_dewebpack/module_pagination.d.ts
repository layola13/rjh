/**
 * 分页模块类型定义
 * @module module_pagination
 * @originalId pagination
 */

/**
 * 分页数据接口
 */
export interface PaginationData {
  /** 当前页码 */
  currentPage: number;
  /** 每页显示数量 */
  pageSize: number;
  /** 总记录数 */
  total?: number;
  /** 总页数 */
  totalPages?: number;
}

/**
 * 事件发射器接口
 */
export interface EventEmitter {
  $emit(event: string, ...args: unknown[]): void;
}

/**
 * 深度比较新旧分页数据，如果不相等则触发分页事件
 * @param newPagination - 新的分页数据
 * @param oldPagination - 旧的分页数据
 * @param emitter - 事件发射器实例
 * @returns 如果数据不同且成功触发事件返回 true，否则返回 false
 */
export declare function handlePaginationChange(
  newPagination: PaginationData,
  oldPagination: PaginationData,
  emitter: EventEmitter
): boolean;

/**
 * 深度相等性检查工具类型
 */
export declare namespace DeepEqual {
  /**
   * 深度比较两个值是否相等
   * @param value1 - 第一个值
   * @param value2 - 第二个值
   * @returns 如果两个值深度相等返回 true，否则返回 false
   */
  function deepEqual<T>(value1: T, value2: T): boolean;
}