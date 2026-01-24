/**
 * 从对象中获取指定键的值
 * @module module_get
 * @description 提供安全的对象属性访问功能
 */

/**
 * 从目标对象中获取指定键对应的值
 * @template T - 目标对象类型
 * @template K - 对象键类型
 * @param target - 目标对象
 * @param key - 要获取的属性键
 * @returns 指定键对应的值
 */
export declare function get<T extends object, K extends keyof T>(
  target: T,
  key: K
): T[K];

export default get;