/**
 * 函数组合工具模块
 * 
 * 该模块提供了一个函数组合功能，用于将两个函数串联执行。
 * 输入值先经过第二个函数处理，结果再传递给第一个函数。
 * 
 * @module FunctionComposition
 */

/**
 * 从模块 96346 导入的转换函数类型
 * 将输入值转换为对象形式
 * 
 * @template T - 输入值的类型
 * @param value - 待转换的值
 * @returns 转换后的对象
 */
declare function toObject<T>(value: T): object;

/**
 * 从模块 39943 导入的验证函数类型
 * 验证输入值是否为对象类型，非对象类型抛出错误
 * 
 * @template T - 输入值的类型
 * @param value - 待验证的值
 * @returns 验证通过后的值
 * @throws {TypeError} 当输入值不是对象时抛出类型错误
 */
declare function requireObjectCoercible<T>(value: T): T;

/**
 * 函数组合：先验证对象合法性，再转换为对象
 * 
 * 该函数是一个组合函数，用于安全地将任意值转换为对象：
 * 1. 首先调用 requireObjectCoercible 确保输入值可以被转换为对象（非 null/undefined）
 * 2. 然后调用 toObject 执行实际的对象转换
 * 
 * 典型使用场景：
 * - 在操作对象属性前确保值的有效性
 * - 将原始类型安全地转换为包装对象
 * 
 * @template T - 输入值的类型
 * @param value - 需要转换的值（不能是 null 或 undefined）
 * @returns 转换后的对象形式
 * @throws {TypeError} 当输入值为 null 或 undefined 时抛出错误
 * 
 * @example
 *