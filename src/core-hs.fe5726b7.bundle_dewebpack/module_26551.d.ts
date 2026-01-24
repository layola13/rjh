/**
 * Array.prototype.reverse polyfill 模块
 * 
 * 此模块为 Array.prototype.reverse 方法提供了一个修复实现，
 * 确保在某些边缘情况下（如稀疏数组）的正确行为。
 * 
 * @module ArrayReversePolyfill
 */

/**
 * 检查给定对象是否为数组（包括类数组对象）
 * 
 * @param target - 需要检查的目标对象
 * @returns 如果是数组或类数组对象则返回 true
 */
declare function isArray(target: unknown): target is ArrayLike<unknown>;

/**
 * 原生数组 reverse 方法的引用
 * 
 * @param array - 要反转的数组
 * @returns 反转后的数组
 */
declare function nativeReverse<T>(array: T[]): T[];

/**
 * Array 原型扩展接口
 */
declare global {
  interface Array<T> {
    /**
     * 反转数组中元素的顺序
     * 
     * 此实现修复了原生 reverse 方法在某些环境下的问题：
     * - 确保稀疏数组正确处理
     * - 在反转前规范化数组长度
     * - 处理类数组对象
     * 
     * @returns 反转后的数组（原地修改）
     * 
     * @example
     *