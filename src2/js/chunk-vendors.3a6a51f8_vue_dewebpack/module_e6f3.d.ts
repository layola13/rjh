/**
 * 对象键枚举工具
 * 
 * 获取对象的可枚举属性键，排除内部原型键，并确保包含指定的强制键。
 * 用于实现符合规范的对象键枚举行为（Object.keys、Object.getOwnPropertyNames等）。
 * 
 * @module ObjectKeysEnumerator
 */

/**
 * 检查对象是否拥有指定属性的函数类型
 */
type HasOwnProperty = (target: object, propertyKey: string) => boolean;

/**
 * 将对象转换为索引对象的函数类型
 */
type ToIndexedObject = (value: unknown) => Record<string, unknown>;

/**
 * 在数组中查找元素索引的函数类型（返回布尔值表示是否存在）
 */
type ArrayIncludes = (array: unknown[], searchElement: unknown) => boolean;

/**
 * 获取共享键名的函数类型
 */
type GetSharedKey = (keyName: string) => string;

/**
 * 枚举对象的属性键
 * 
 * 此函数实现了对象键的枚举逻辑，包括：
 * 1. 遍历对象自身的可枚举属性
 * 2. 排除特定的内部键（如IE_PROTO）
 * 3. 确保包含强制键列表中的所有键
 * 
 * @param target - 要枚举属性的目标对象
 * @param forcedKeys - 必须包含的属性键数组（即使不可枚举也要包含）
 * @returns 属性键名称的数组
 * 
 * @example
 *