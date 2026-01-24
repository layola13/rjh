/**
 * Module Set - 集合操作模块
 * 提供数据集合的创建、添加、删除等操作
 */
declare module 'module_set' {
  /**
   * 创建或操作集合
   * @template T - 集合中元素的类型
   */
  export function set<T>(key: string, value: T): void;
  export function set<T>(data: Record<string, T>): void;
  export function set<T>(key: string, value?: T): void;
}

/**
 * Module Get - 数据获取模块
 * 提供数据的读取和查询功能
 */
declare module 'module_get' {
  /**
   * 获取指定键的值
   * @template T - 返回值的类型
   * @param key - 要获取的键名
   * @returns 对应的值，如果不存在则返回 undefined
   */
  export function get<T = unknown>(key: string): T | undefined;
  
  /**
   * 获取所有数据
   * @template T - 数据对象的类型
   * @returns 包含所有键值对的对象
   */
  export function getAll<T = Record<string, unknown>>(): T;
}

/**
 * Webpack Bundle 主入口
 * 重新导出所有子模块的功能
 */
declare module 'webpack-bundle' {
  export * from 'module_set';
  export * from 'module_get';
}