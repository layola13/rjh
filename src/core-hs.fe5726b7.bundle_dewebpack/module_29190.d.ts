/**
 * 迭代器遍历工具函数
 * 遍历迭代器并对每个值执行回调，当回调返回非undefined值时立即返回该值
 */

/**
 * 迭代器步进函数类型
 * @template T 迭代器产生的值类型
 */
type IteratorStepFunction<T> = (
  iterator: Iterator<T>,
  context: Iterable<T>
) => IteratorResult<T>;

/**
 * 迭代器回调函数类型
 * @template T 输入值类型
 * @template R 返回值类型
 * @param value 当前迭代的值
 * @returns 返回值，返回undefined时继续迭代，否则停止并返回该值
 */
type IteratorCallback<T, R> = (value: T) => R | undefined;

/**
 * 遍历迭代器并应用回调函数
 * 
 * @template T 迭代器元素类型
 * @template R 回调返回类型
 * @param iterable 可迭代对象
 * @param callback 对每个元素执行的回调函数
 * @param stepFunction 可选的迭代器步进函数，默认使用iterable.next
 * @returns 回调函数首次返回的非undefined值，如果所有元素都返回undefined则返回undefined
 */
declare function iterateUntilResult<T, R>(
  iterable: Iterable<T>,
  callback: IteratorCallback<T, R>,
  stepFunction?: IteratorStepFunction<T>
): R | undefined;

export = iterateUntilResult;