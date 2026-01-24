/**
 * Module Set - 设置值的模块
 * @module module_set
 */
declare module 'module_set' {
  /**
   * 设置指定键的值
   * @param key - 键名
   * @param value - 要设置的值
   * @returns 是否设置成功
   */
  export function set<T = unknown>(key: string, value: T): boolean;
}

/**
 * Module Get - 获取值的模块
 * @module module_get
 */
declare module 'module_get' {
  /**
   * 获取指定键的值
   * @param key - 键名
   * @returns 返回对应的值，如果不存在则返回 undefined
   */
  export function get<T = unknown>(key: string): T | undefined;
  
  /**
   * 获取指定键的值，带默认值
   * @param key - 键名
   * @param defaultValue - 默认值
   * @returns 返回对应的值，如果不存在则返回默认值
   */
  export function get<T>(key: string, defaultValue: T): T;
}

/**
 * Module Value - 值处理模块
 * @module module_value
 */
declare module 'module_value' {
  /**
   * 获取或处理值
   * @param input - 输入值
   * @returns 处理后的值
   */
  export function value<T = unknown>(input: T): T;
}

/**
 * 主入口 - 重新导出所有模块
 */
export { set } from 'module_set';
export { get } from 'module_get';
export { value } from 'module_value';