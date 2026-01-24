/**
 * 迭代器类型声明
 * 用于按顺序访问数组元素
 * @module module_next
 */

/**
 * 数组迭代器接口
 * @template T 数组元素类型
 */
export interface ArrayIterator<T> {
  /**
   * 当前数组存储
   */
  arr: T[];
  
  /**
   * 当前迭代位置索引
   */
  cur: number;
  
  /**
   * 获取下一个元素并推进迭代器
   * @returns 当前位置的元素，如果超出范围则返回 undefined
   */
  next(): T | undefined;
}

/**
 * 数组迭代器类
 * @template T 数组元素类型
 */
export declare class Iterator<T> implements ArrayIterator<T> {
  arr: T[];
  cur: number;
  
  /**
   * 构造函数
   * @param arr - 要迭代的数组
   * @param cur - 起始索引位置，默认为 0
   */
  constructor(arr: T[], cur?: number);
  
  /**
   * 获取下一个元素并推进迭代器
   * @returns 当前位置的元素，如果超出范围则返回 undefined
   */
  next(): T | undefined;
}