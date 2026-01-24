/**
 * 从对象中获取指定路径或属性的值
 * @module module_get
 * @description 用于安全地访问对象的嵌套属性或通过键名获取值
 */

/**
 * 从目标对象中获取指定属性的值
 * @template T - 目标对象的类型
 * @template K - 属性键的类型
 * @param target - 要访问的目标对象
 * @param key - 要获取的属性键名
 * @returns 返回指定属性的值，如果不存在则返回 undefined
 */
export declare function get<T extends object, K extends keyof T>(
  target: T,
  key: K
): T[K];

/**
 * 对象路径访问选项
 */
export interface GetOptions {
  /** 对象路径，如 'a.b.c' */
  path?: string;
  /** 默认值，当路径不存在时返回 */
  defaultValue?: unknown;
}

/**
 * 通过路径字符串获取对象深层嵌套的值
 * @param target - 目标对象
 * @param path - 点分隔的路径字符串（如 'user.profile.name'）
 * @param defaultValue - 当路径不存在时返回的默认值
 * @returns 路径对应的值或默认值
 */
export declare function getByPath<T = unknown>(
  target: object,
  path: string,
  defaultValue?: T
): T | undefined;