/**
 * 依赖模块c532的转换函数接口
 * Transformer function type from dependency module c532
 */
type TransformerFunction<T, C> = (value: T, config: C) => T;

/**
 * 遍历执行器接口
 * Iteration executor that applies transformers sequentially
 */
interface ForEachExecutor {
  <T, C>(
    transformers: TransformerFunction<T, C>[],
    callback: (transformer: TransformerFunction<T, C>) => void
  ): void;
}

/**
 * 应用转换管道
 * Applies a sequence of transformation functions to a value
 * 
 * @template T - 被转换值的类型 / Type of the value being transformed
 * @template C - 配置对象的类型 / Type of the configuration object
 * 
 * @param value - 初始输入值 / Initial input value
 * @param config - 传递给每个转换函数的配置对象 / Configuration object passed to each transformer
 * @param transformers - 要应用的转换函数数组 / Array of transformer functions to apply
 * 
 * @returns 经过所有转换函数处理后的最终值 / Final value after all transformations
 * 
 * @example
 * const result = applyTransforms(
 *   initialValue,
 *   config,
 *   [transform1, transform2, transform3]
 * );
 */
declare function applyTransforms<T, C>(
  value: T,
  config: C,
  transformers: TransformerFunction<T, C>[]
): T;

export = applyTransforms;