/**
 * Module: module_LE (Less than or Equal threshold checker)
 * Original ID: LE
 * 
 * 提供数值差值比较功能，用于判断两个数值的差值是否小于给定阈值
 */

/**
 * 阈值常量
 * 用于与两数之差进行比较
 * @internal
 */
declare const THRESHOLD: number;

/**
 * 判断两个数值的差值是否小于阈值
 * 
 * @param leftValue - 被减数（左操作数）
 * @param rightValue - 减数（右操作数）
 * @returns 如果 (leftValue - rightValue) < THRESHOLD 则返回 true，否则返回 false
 * 
 * @example
 *