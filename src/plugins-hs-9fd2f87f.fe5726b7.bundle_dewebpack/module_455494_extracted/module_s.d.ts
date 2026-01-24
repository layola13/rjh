/**
 * Module: module_s
 * 
 * 该模块包含一个高阶函数，用于在指定上下文中调用回调函数。
 * 
 * @remarks
 * 此声明基于部分代码片段重构，实际实现可能需要根据完整源码调整。
 */

/**
 * 回调函数类型定义
 * 
 * @param args - 回调函数接受的参数
 * @returns 回调执行结果
 */
type CallbackFunction = (...args: unknown[]) => unknown;

/**
 * 在指定上下文中执行回调函数
 * 
 * @param callback - 要执行的回调函数
 * @param context - 函数执行的上下文对象（this 指向）
 * @returns 回调函数的执行结果
 * 
 * @example
 *