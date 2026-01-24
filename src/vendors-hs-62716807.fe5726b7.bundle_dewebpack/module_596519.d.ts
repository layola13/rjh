/**
 * 使用 requestAnimationFrame 节流函数调用
 * 确保函数在同一动画帧内只执行一次，提升性能
 */

/**
 * 节流函数返回类型，包含取消方法
 */
export interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  /**
   * 取消待执行的节流调用
   */
  cancel: () => void;
}

/**
 * 使用 requestAnimationFrame 对函数进行节流处理
 * 
 * @template T - 原始函数类型
 * @param fn - 需要节流的函数
 * @returns 经过节流处理的函数，包含 cancel 方法用于取消待执行的调用
 * 
 * @example
 *