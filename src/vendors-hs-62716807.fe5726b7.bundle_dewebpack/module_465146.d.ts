/**
 * 获取对象原型的工具函数
 * 提供跨环境的 getPrototypeOf 功能
 */

/**
 * 获取指定对象的原型
 * @param obj - 要获取原型的对象
 * @returns 对象的原型，如果不存在则返回 null
 */
declare function getPrototypeOf(obj: unknown): object | null;

export = getPrototypeOf;