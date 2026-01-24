/**
 * Module: module_get
 * 
 * 获取对象属性的访问器函数
 * 
 * @description
 * 此模块提供了一个通用的属性访问函数，用于从对象中安全地获取指定键的值。
 * 原始模块ID: get
 */

/**
 * 从目标对象中获取指定键的值
 * 
 * @template T - 目标对象的类型
 * @template K - 对象键的类型，必须是T的键之一
 * 
 * @param target - 要访问的目标对象
 * @param key - 要获取的属性键
 * 
 * @returns 返回目标对象中指定键对应的值
 * 
 * @example
 *