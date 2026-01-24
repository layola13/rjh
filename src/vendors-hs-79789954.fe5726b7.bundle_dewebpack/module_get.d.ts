/**
 * 从对象中根据键获取值的泛型函数
 * 
 * @template T - 目标对象的类型
 * @template K - 对象键的类型
 * @param target - 要访问的目标对象
 * @param key - 要获取的属性键
 * @returns 对应键的值
 * 
 * @example
 * const obj = { foo: 'bar', count: 42 };
 * const value = moduleGet(obj, 'foo'); // 返回 'bar'
 */
export declare function moduleGet<T extends Record<PropertyKey, unknown>, K extends keyof T>(
  target: T,
  key: K
): T[K];

/**
 * 简化版本：从任意对象获取属性
 * 
 * @param target - 目标对象
 * @param key - 属性键（字符串、数字或符号）
 * @returns 属性值，类型为 unknown
 */
export declare function moduleGet(
  target: Record<PropertyKey, unknown>,
  key: PropertyKey
): unknown;