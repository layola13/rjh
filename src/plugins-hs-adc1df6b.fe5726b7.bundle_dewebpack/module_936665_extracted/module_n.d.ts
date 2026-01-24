/**
 * 迭代器结果接口
 * @template T 迭代器返回值的类型
 */
interface IteratorResult<T> {
  /** 迭代是否已完成 */
  done: boolean;
  /** 当前迭代的值（当done为false时存在） */
  value?: T;
}

/**
 * 数组迭代器的next方法
 * @template T 数组元素类型
 * @param elements 要迭代的数组
 * @param index 当前迭代索引
 * @returns 返回迭代器结果，包含done状态和value值
 * 
 * @example
 *