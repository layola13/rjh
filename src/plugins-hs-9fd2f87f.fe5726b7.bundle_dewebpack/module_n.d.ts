/**
 * 数组迭代器的 next 方法
 * 用于遍历数组元素，符合 ES6 Iterator 协议
 * 
 * @template T 数组元素的类型
 * @param array 要迭代的数组
 * @param currentIndex 当前迭代位置的索引
 * @returns 迭代器结果对象，包含 done 和 value 属性
 */
declare function arrayIteratorNext<T>(
  array: readonly T[],
  currentIndex: number
): IteratorResult<T>;

/**
 * 迭代器结果接口（已完成状态）
 */
interface IteratorDoneResult {
  /** 标识迭代已完成 */
  done: true;
  /** 完成时无值 */
  value?: undefined;
}

/**
 * 迭代器结果接口（未完成状态）
 * @template T 迭代元素的类型
 */
interface IteratorYieldResult<T> {
  /** 标识迭代未完成 */
  done: false;
  /** 当前迭代的值 */
  value: T;
}

/**
 * 迭代器结果联合类型
 * @template T 迭代元素的类型
 */
type IteratorResult<T> = IteratorDoneResult | IteratorYieldResult<T>;