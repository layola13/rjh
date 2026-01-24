/**
 * 获取懒加载搜索实例
 * 
 * @remarks
 * 此方法返回当前实例的 lazySearch 属性，通常用于延迟初始化搜索功能
 * 
 * @returns 懒加载搜索实例
 * 
 * @module module_get
 * @originalId get
 */
declare function get<T = unknown>(): T;

/**
 * 如果这是类方法，则类型定义应为：
 */
declare class SearchModule<T = unknown> {
  /**
   * 懒加载搜索实例
   */
  private lazySearch: T;

  /**
   * 获取懒加载搜索实例
   * 
   * @returns 当前的懒加载搜索实例
   */
  get(): T;
}

export { get, SearchModule };