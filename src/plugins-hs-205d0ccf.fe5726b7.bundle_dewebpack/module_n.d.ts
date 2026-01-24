/**
 * 迭代器结果类型
 * 表示迭代过程中返回的值和完成状态
 * 
 * @template T - 迭代元素的类型
 */
interface IteratorResult<T> {
  /** 是否已完成迭代 */
  done: boolean;
  /** 当前迭代的值（仅在 done 为 false 时有效） */
  value?: T;
}

/**
 * 创建数组迭代器的next方法
 * 
 * 该函数返回一个闭包，用于遍历数组元素
 * 每次调用返回的函数时，会返回下一个元素，直到数组末尾
 * 
 * @template T - 数组元素的类型
 * @param {T[]} elements - 要迭代的数组
 * @param {number} currentIndex - 当前迭代位置的索引（通过闭包维护）
 * @returns {() => IteratorResult<T>} 返回一个next函数，用于获取下一个迭代结果
 * 
 * @example
 *