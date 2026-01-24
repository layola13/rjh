/**
 * 小于等于比较运算符模块
 * 
 * 提供了一个泛型的小于等于比较函数，支持所有实现了比较运算符的类型。
 * 常用于数字、字符串等可比较类型的排序和筛选操作。
 * 
 * @module LessThanOrEqual
 */

/**
 * 比较两个值是否满足小于等于关系
 * 
 * @template T - 可比较的类型，必须支持 <= 运算符
 * @param {T} left - 左操作数
 * @param {T} right - 右操作数
 * @returns {boolean} 如果 left <= right 返回 true，否则返回 false
 * 
 * @example
 *