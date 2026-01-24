/**
 * 函数组合工具模块
 * 提供函数管道（pipe）和数组管道功能，用于将多个函数按顺序组合执行
 */

/**
 * 单元函数（恒等函数）类型
 * 接受一个值并原样返回该值
 */
export type IdentityFunction = <T>(value: T) => T;

/**
 * 一元函数类型
 * 接受一个参数并返回转换后的结果
 */
export type UnaryFunction<T, R> = (source: T) => R;

/**
 * 从函数数组创建管道
 * 将多个函数按顺序组合，前一个函数的输出作为后一个函数的输入
 * 
 * @template T - 输入值的类型
 * @template R - 最终输出值的类型
 * @param fns - 要组合的函数数组
 * @returns 如果数组为空，返回恒等函数；如果只有一个函数，直接返回该函数；否则返回组合后的函数
 * 
 * @example
 *