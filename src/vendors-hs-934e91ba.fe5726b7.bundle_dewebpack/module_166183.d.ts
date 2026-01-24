/**
 * 通用匹配器工厂函数类型定义
 * 
 * 该模块创建一个属性匹配器函数，用于比较对象属性值与给定值是否匹配。
 * 支持两种模式：
 * 1. 快速路径：当键是字符串且值是原始类型时，返回优化的匹配器
 * 2. 通用路径：返回一个闭包函数，用于延迟获取和比较对象属性
 */

/**
 * 基础比较函数类型
 * @param value - 目标比较值
 * @param other - 要比较的值
 * @param bitmask - 比较选项的位掩码（通常为3表示深度比较）
 * @returns 如果值匹配返回 true，否则返回 false
 */
type BaseIsEqualFunction = (value: unknown, other: unknown, bitmask: number) => boolean;

/**
 * 获取对象属性值的函数类型
 * @param object - 源对象
 * @param path - 属性路径（字符串或字符串数组）
 * @returns 属性值，如果不存在则返回 undefined
 */
type GetFunction = <T = unknown>(object: unknown, path: PropertyPath) => T | undefined;

/**
 * 检查对象是否具有指定路径属性的函数类型
 * @param object - 要检查的对象
 * @param path - 属性路径
 * @returns 如果对象具有该路径的属性返回 true，否则返回 false
 */
type HasPathFunction = (object: unknown, path: PropertyPath) => boolean;

/**
 * 判断值是否为字符串键的函数类型
 * @param value - 要检查的值
 * @returns 如果是有效的字符串键返回 true，否则返回 false
 */
type IsKeyFunction = (value: unknown) => value is string | number;

/**
 * 判断值是否为严格可比较值的函数类型（原始类型或特殊对象）
 * @param value - 要检查的值
 * @returns 如果是可以严格比较的值返回 true，否则返回 false
 */
type IsStrictComparableFunction = (value: unknown) => boolean;

/**
 * 创建优化匹配器的函数类型
 * @param key - 属性键名
 * @param value - 要匹配的值
 * @returns 优化的匹配器函数
 */
type MatcherCastorFunction = (key: PropertyKey, value: unknown) => Matcher;

/**
 * 将路径转换为属性键的函数类型
 * @param path - 属性路径
 * @returns 规范化的属性键
 */
type ToKeyFunction = (path: PropertyPath) => PropertyKey;

/**
 * 属性路径类型
 */
type PropertyPath = string | number | symbol | ReadonlyArray<string | number | symbol>;

/**
 * 匹配器函数类型
 * @param object - 要检查的对象
 * @returns 如果对象匹配条件返回 true，否则返回 false
 */
type Matcher = (object: unknown) => boolean;

/**
 * 属性匹配器工厂函数
 * 
 * 根据给定的路径和值创建一个匹配器函数。该函数会智能选择最优的匹配策略：
 * - 如果路径是简单键且值是可严格比较的，使用快速匹配器
 * - 否则，使用通用匹配器进行深度比较
 * 
 * @param path - 要匹配的属性路径（可以是字符串、数组等）
 * @param value - 要匹配的目标值
 * @returns 匹配器函数，接受一个对象并返回是否匹配
 * 
 * @example
 *