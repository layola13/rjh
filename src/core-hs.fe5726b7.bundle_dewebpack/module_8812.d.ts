/**
 * 获取对象原型的跨浏览器兼容实现
 * 
 * 该模块提供了一个polyfill函数，用于获取对象的原型。
 * 在支持原生方法的环境中使用 Object.getPrototypeOf，
 * 否则通过 IE_PROTO 特殊属性或构造函数原型链来获取。
 * 
 * @module ObjectGetPrototypeOf
 */

/**
 * 检查对象是否拥有指定的自有属性
 * @param target - 目标对象
 * @param property - 属性名
 * @returns 如果对象拥有该属性则返回 true
 */
declare function hasOwnProperty(target: object, property: PropertyKey): boolean;

/**
 * 检查值是否为可调用的函数
 * @param value - 要检查的值
 * @returns 如果值是函数则返回 true
 */
declare function isCallable(value: unknown): value is Function;

/**
 * 将值转换为对象
 * @param value - 要转换的值
 * @returns 转换后的对象
 * @throws 如果值为 null 或 undefined 则抛出 TypeError
 */
declare function toObject(value: unknown): object;

/**
 * 获取共享的 IE_PROTO 键
 * @param key - 键名
 * @returns 共享的键值
 */
declare function getSharedKey(key: string): symbol | string;

/**
 * 标识当前环境是否支持原生的标准方法
 */
declare const isNativeSupported: boolean;

/**
 * 获取对象的原型
 * 
 * 该函数是 Object.getPrototypeOf 的 polyfill 实现。
 * 优先使用以下策略获取原型：
 * 1. 检查对象的 IE_PROTO 特殊属性（用于旧版 IE 兼容）
 * 2. 通过构造函数的 prototype 属性获取
 * 3. 检查对象是否继承自 Object.prototype
 * 
 * @param target - 要获取原型的对象
 * @returns 对象的原型，如果无法确定则返回 null
 * 
 * @example
 *