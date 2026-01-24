/**
 * 迭代器结果接口
 * 表示迭代器单次迭代的返回值
 * @template T - 迭代元素的类型
 */
interface IteratorResult<T> {
  /** 迭代是否已完成 */
  done: boolean;
  /** 当前迭代的值（当done为false时存在） */
  value?: T;
}

/**
 * 数组迭代器的next方法
 * 返回数组中的下一个元素，如果已到达末尾则标记为完成
 * 
 * @template T - 数组元素的类型
 * @param elements - 要迭代的数组
 * @param currentIndex - 当前迭代索引（会被递增）
 * @returns 迭代器结果对象
 * 
 * @example
 *