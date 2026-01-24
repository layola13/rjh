/**
 * 对象属性枚举工具
 * 
 * 该模块提供了一个函数，用于获取对象的可枚举属性键，同时过滤掉特定的内部属性（如 IE_PROTO），
 * 并可选地包含指定的额外属性键。
 * 
 * @module ObjectKeysEnumerator
 */

/**
 * 检查对象是否拥有指定属性的函数类型
 * 
 * @param obj - 要检查的对象
 * @param key - 属性键名
 * @returns 如果对象拥有该属性则返回 true
 */
type HasOwnProperty = (obj: object, key: string | symbol) => boolean;

/**
 * 将对象转换为索引对象的函数类型
 * 
 * @param value - 要转换的值
 * @returns 转换后的索引对象
 */
type ToIndexedObject = (value: unknown) => Record<string, unknown>;

/**
 * 在数组中查找元素索引的函数类型
 * 
 * @param array - 要搜索的数组
 * @param element - 要查找的元素
 * @returns 元素的索引，未找到则返回 -1
 */
type IndexOf = (array: readonly unknown[], element: unknown) => number;

/**
 * 获取共享键名的函数类型
 * 
 * @param key - 键名标识符
 * @returns 共享的键名字符串
 */
type GetSharedKey = (key: string) => string;

/**
 * 枚举对象的属性键
 * 
 * 该函数返回对象的可枚举属性键数组，同时：
 * 1. 过滤掉内部使用的 IE_PROTO 属性
 * 2. 可选地包含额外指定的属性键（即使它们不可枚举）
 * 
 * @param target - 要枚举属性的目标对象
 * @param additionalKeys - 需要额外包含的属性键数组
 * @returns 包含所有符合条件的属性键的数组
 * 
 * @example
 *