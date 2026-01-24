/**
 * 获取对象的可枚举属性键集合，排除隐藏属性并合并额外键
 * 
 * @description
 * 该函数实现了对象属性键的收集逻辑，主要用于：
 * 1. 遍历对象自身的可枚举属性，排除内部隐藏属性
 * 2. 额外检查指定的键列表，确保它们也被包含（如果存在于对象中）
 * 3. 避免重复添加已存在的键
 * 
 * @module ObjectKeys
 */

/**
 * 获取绑定的数组方法（用于确保正确的 this 绑定）
 */
import type { BoundFunction } from './utils';

/**
 * 检查对象是否拥有指定属性
 */
import type { HasOwnProperty } from './object-utils';

/**
 * 将对象转换为索引对象（类数组对象）
 */
import type { ToIndexedObject } from './to-indexed-object';

/**
 * 数组 indexOf 方法的类型安全版本
 */
import type { IndexOf } from './array-methods';

/**
 * 内部隐藏属性集合（需要排除的属性名）
 */
import type { HiddenKeys } from './hidden-keys';

/**
 * 索引对象类型（可以通过字符串键访问的对象）
 */
interface IndexedObject {
  [key: string]: unknown;
}

/**
 * 获取对象的所有可枚举属性键，排除隐藏属性并合并指定的额外键
 * 
 * @param target - 目标对象，将从中提取属性键
 * @param additionalKeys - 额外需要检查的键列表（通常是不可枚举但需要包含的属性名）
 * @returns 包含所有符合条件的属性键的数组
 * 
 * @example
 *