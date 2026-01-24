/**
 * 检查对象是否在指定的路径上有属性（包括继承的属性）
 * 
 * 此函数遍历给定路径的每个部分，检查对象在该路径上是否存在属性。
 * 它还会验证路径的最后一部分是否为有效的数组索引（如果对象是数组或类数组对象）。
 * 
 * @template T - 要检查的对象类型
 * @param object - 要查询的对象
 * @param path - 要检查的路径（可以是字符串数组或点/括号表示法的字符串）
 * @param hasFunc - 用于检查属性是否存在的函数（通常是 `in` 操作符或 `hasOwnProperty`）
 * @returns 如果路径存在则返回 `true`，否则返回 `false`
 * 
 * @example
 * const obj = { a: { b: { c: 3 } } };
 * hasPath(obj, ['a', 'b', 'c'], (obj, key) => key in obj); // true
 * hasPath(obj, ['a', 'b', 'd'], (obj, key) => key in obj); // false
 * 
 * @example
 * const arr = [1, 2, 3];
 * hasPath(arr, ['0'], (obj, key) => key in obj); // true
 * hasPath(arr, ['length'], (obj, key) => key in obj); // true
 */
declare function hasPath<T = unknown>(
  object: T,
  path: string | ReadonlyArray<string | number>,
  hasFunc: (obj: unknown, key: string | number) => boolean
): boolean;

export = hasPath;