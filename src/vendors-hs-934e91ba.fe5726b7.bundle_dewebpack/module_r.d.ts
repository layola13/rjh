/**
 * 引用计数管理模块
 * @module module_r
 */

/**
 * 引用计数项的数据结构
 */
interface RefCountItem {
  /** 当前引用计数 */
  refcount: number;
  [key: string]: unknown;
}

/**
 * 全局引用计数表（需确认实际变量名和作用域）
 */
declare const ht: RefCountItem[];

/**
 * 增加指定索引项的引用计数
 * @param index - 引用表中的索引位置（必须 > 4 才会执行操作）
 * @remarks
 * - 仅当 index > 4 时才会增加引用计数
 * - 假设索引 0-4 为保留位置或特殊用途
 */
declare function incrementRefCount(index: number): void;

export { incrementRefCount, RefCountItem };