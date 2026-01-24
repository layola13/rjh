/**
 * 数组切片复制工具函数类型定义
 * 
 * 从数组中复制指定数量的元素到新数组
 * 通常用于 Babel/TypeScript 编译辅助函数（类似 _arrayLikeToArray）
 * 
 * @module ArraySliceCopy
 */

/**
 * 将类数组对象或数组复制到新数组中
 * 
 * @template T - 数组元素类型
 * @param source - 源数组或类数组对象
 * @param length - 要复制的元素数量。如果为 null/undefined 或超过源数组长度，则复制整个数组
 * @returns 包含复制元素的新数组
 * 
 * @example
 *