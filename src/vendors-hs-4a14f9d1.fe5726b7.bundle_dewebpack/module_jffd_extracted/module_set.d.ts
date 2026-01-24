/**
 * Module: module_set
 * Original ID: set
 * 
 * Set操作的类型声明
 */

/**
 * 全局计数器接口，用于生成唯一ID
 */
interface GlobalCounter {
  count: number;
}

/**
 * 可标识对象接口 - 具有唯一ID的对象
 */
interface Identifiable {
  __id__?: number;
}

/**
 * 存储结构接口 - 内部哈希表
 */
interface StorageHash<T> {
  [key: number]: T;
  __keys__: {
    [key: number]: Identifiable;
  };
}

/**
 * Set集合类 - 使用对象ID作为键的集合实现
 * @template T - 存储的值类型
 */
declare class ModuleSet<T> {
  /**
   * 内部哈希存储
   */
  private h: StorageHash<T>;

  /**
   * 添加或更新集合中的元素
   * @param key - 可标识的键对象，会自动分配唯一ID
   * @param value - 要存储的值
   * @returns void
   */
  set(key: Identifiable, value: T): void;
}

/**
 * 全局计数器对象
 */
declare const p: GlobalCounter;

export { ModuleSet, Identifiable, StorageHash, GlobalCounter };