/**
 * 将对象转换为原始值的类型转换模块
 * 
 * 该模块实现了 JavaScript 的对象到原始值转换算法（ToPrimitive）。
 * 它会尝试调用对象的 toString 或 valueOf 方法来获取原始值。
 * 
 * @module ToPrimitive
 */

/**
 * hint 参数的可能值类型
 */
type ConversionHint = 'string' | 'number' | 'default';

/**
 * 可调用的函数类型
 */
type CallableFunction = (...args: any[]) => any;

/**
 * 尝试将对象转换为原始值
 * 
 * 根据 hint 参数决定调用顺序：
 * - hint 为 'string' 时：优先尝试 toString，其次 valueOf
 * - hint 为其他值时：优先尝试 valueOf，其次 toString
 * 
 * @param input - 需要转换的对象
 * @param hint - 转换提示，指示期望的原始值类型
 * @returns 转换后的原始值
 * @throws {TypeError} 当对象无法转换为原始值时抛出
 * 
 * @example
 *