/**
 * 获取对象指定属性的值
 * @description 从对象中通过属性名访问值，同时可能涉及路径属性的访问
 * @module module_get
 */

/**
 * 泛型对象类型，支持索引签名
 */
interface IndexableObject {
  path?: unknown;
  [key: string]: unknown;
}

/**
 * 获取对象属性值
 * @param target - 目标对象，包含可选的 path 属性
 * @param propertyName - 要访问的属性名
 * @returns 返回指定属性的值，类型为 unknown
 */
declare function get(target: IndexableObject, propertyName: string): unknown;

/**
 * 泛型版本：获取对象属性值（类型安全）
 * @template T - 对象类型
 * @template K - 对象键的类型
 * @param target - 目标对象
 * @param propertyName - 要访问的属性名
 * @returns 返回指定属性的值
 */
declare function get<T extends Record<string, unknown>, K extends keyof T>(
  target: T,
  propertyName: K
): T[K];

export default get;
export { get, IndexableObject };