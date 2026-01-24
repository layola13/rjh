/**
 * 从对象中选取指定的键值对
 * 
 * @description
 * 此函数接受一个对象和一个键数组，返回一个新对象，该对象仅包含指定键的属性。
 * 它是一个高阶函数，依赖于外部的迭代工具函数来遍历键数组。
 * 
 * @template TObject - 源对象的类型
 * @template TKey - 键的类型，必须是 TObject 的键
 * 
 * @param source - 源对象，从中选取属性
 * @param keys - 要选取的键数组
 * @returns 包含选定键值对的新对象
 * 
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, ['a', 'c']);
 * // result: { a: 1, c: 3 }
 */
declare function pick<
  TObject extends Record<string, unknown>,
  TKey extends keyof TObject
>(
  source: TObject,
  keys: readonly TKey[]
): Pick<TObject, TKey>;

export = pick;