/**
 * Iterator.prototype.reduce() 方法的类型定义
 * 
 * 对迭代器中的所有元素执行归约操作，将其组合成单个值。
 * 该方法类似于 Array.prototype.reduce()，但适用于迭代器。
 */

/**
 * 归约函数的类型定义
 * @template TAccumulator 累加器的类型
 * @template TValue 迭代器元素的类型
 */
type ReducerFunction<TAccumulator, TValue> = (
  /** 当前累加值 */
  accumulator: TAccumulator,
  /** 当前迭代元素的值 */
  currentValue: TValue,
  /** 当前元素的索引位置 */
  index: number
) => TAccumulator;

/**
 * 迭代器归约方法的配置选项
 */
interface IteratorReduceOptions {
  /** 是否作为记录类型处理 */
  readonly IS_RECORD: true;
}

declare global {
  interface Iterator<T> {
    /**
     * 对迭代器中的每个元素执行归约函数，生成单个累加值
     * 
     * @template TAccumulator 累加器的类型
     * @param reducerFn 归约函数，接收累加器、当前值和索引，返回新的累加器值
     * @param initialValue 初始累加值（可选）。如果不提供且迭代器为空，将抛出 TypeError
     * @returns 最终归约后的累加值
     * 
     * @throws {TypeError} 当迭代器为空且未提供初始值时抛出错误
     * 
     * @example
     * const iterator = [1, 2, 3, 4].values();
     * const sum = iterator.reduce((acc, val) => acc + val, 0);
     * console.log(sum); // 输出: 10
     * 
     * @example
     * const iterator = [1, 2, 3].values();
     * const product = iterator.reduce((acc, val) => acc * val);
     * console.log(product); // 输出: 6
     */
    reduce<TAccumulator>(
      reducerFn: ReducerFunction<TAccumulator, T>,
      initialValue: TAccumulator
    ): TAccumulator;

    /**
     * 对迭代器中的每个元素执行归约函数（无初始值重载）
     * 
     * @param reducerFn 归约函数
     * @returns 最终归约后的值
     * @throws {TypeError} 当迭代器为空时抛出 "Reduce of empty iterator with no initial value"
     */
    reduce(reducerFn: ReducerFunction<T, T>): T;
  }
}

export {};