/**
 * Module: module_get
 * 从数组或对象中根据索引/键获取值
 * @module get
 */

/**
 * 获取指定索引处的元素
 * @template T - 容器中元素的类型
 * @param container - 数据容器（数组或对象）
 * @param index - 索引或键
 * @returns 指定位置的值
 */
declare function get<T>(container: T[] | Record<string | number, T>, index: string | number): T | undefined;

export default get;