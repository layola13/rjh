/**
 * 将类数组对象转换为可索引的对象
 * 
 * 此模块用于处理字符串等类数组对象，确保它们可以被正确地枚举和索引。
 * 在某些旧版JavaScript引擎中，字符串的属性（如索引）不可枚举，
 * 因此需要将字符串显式拆分为数组。
 * 
 * @module IndexedObject
 */

/**
 * 获取对象的内部 [[Class]] 类型标签
 * 
 * @param value - 要检查的值
 * @returns 类型字符串，如 "String"、"Array"、"Object" 等
 */
declare function classof(value: unknown): string;

/**
 * 将值转换为可索引的对象
 * 
 * 如果原生 Object 支持字符串属性枚举（通过检查 "z"[0] 是否可枚举），
 * 则直接使用 Object() 包装；否则，如果值是字符串类型，
 * 则将其拆分为字符数组以确保索引可访问。
 * 
 * @param value - 要转换的值
 * @returns 可索引的对象或字符数组
 * 
 * @example
 *