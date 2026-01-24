/**
 * 对象属性转换为数组的工具函数
 * 
 * @description
 * 该模块组合了两个底层函数：
 * 1. 首先通过 RequireObjectCoercible 确保输入值可以被转换为对象
 * 2. 然后通过 IndexedObject 将处理后的对象转换为索引对象（类数组结构）
 * 
 * @remarks
 * - 此函数常用于将类数组对象或字符串转换为可索引的对象形式
 * - 依赖于 ECMAScript 规范中的 RequireObjectCoercible 抽象操作
 * - 模块ID: 36c3
 * - 依赖模块: 335c (IndexedObject), 25eb (RequireObjectCoercible)
 */

/**
 * 将输入值转换为索引对象
 * 
 * @template T - 输入值类型
 * @param value - 需要转换的输入值（通常为字符串、数组或类数组对象）
 * @returns 转换后的索引对象，可通过数字索引访问元素
 * 
 * @throws {TypeError} 当输入值为 null 或 undefined 时抛出类型错误
 * 
 * @example
 *