/**
 * 迭代器类型定义
 * @module module_hasNext
 */

/**
 * 数组迭代器接口
 * @template T 数组元素类型
 */
export interface ArrayIterator<T> {
  /**
   * 当前迭代位置索引
   */
  cur: number;

  /**
   * 被迭代的数组
   */
  arr: T[];

  /**
   * 检查是否还有下一个元素
   * @returns 如果当前位置小于数组长度则返回 true，否则返回 false
   */
  hasNext(): boolean;
}