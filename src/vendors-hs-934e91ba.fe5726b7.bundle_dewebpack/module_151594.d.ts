/**
 * 复制对象属性的工具函数
 * 
 * 此函数将源对象的属性复制到目标对象。
 * 结合了基础复制功能（module 524104）和属性键获取功能（module 189611）。
 * 
 * @module CopyObject
 */

/**
 * 将源对象的所有自有属性复制到目标对象
 * 
 * @template T - 源对象类型
 * @template U - 目标对象类型
 * 
 * @param source - 源对象，从该对象复制属性
 * @param target - 目标对象，属性将被复制到此对象
 * 
 * @returns 返回修改后的目标对象，包含从源对象复制的所有属性
 * 
 * @example
 *