/**
 * 引用计数管理模块
 * 用于管理对象的引用计数，当索引大于4时增加引用计数
 * 
 * @module module_q
 */

/**
 * 引用计数项接口
 */
interface RefCountItem {
  /** 引用计数器 */
  refcount: number;
}

/**
 * 全局引用计数表
 * 存储所有需要引用计数管理的对象
 */
declare const Qt: RefCountItem[];

/**
 * 增加引用计数
 * 当索引大于4时，将对应项的引用计数加1
 * 
 * @param index - 要增加引用计数的对象索引
 * @returns void
 */
declare function incrementRefCount(index: number): void;