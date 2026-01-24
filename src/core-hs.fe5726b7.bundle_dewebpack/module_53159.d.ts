/**
 * 获取对象的所有属性名，包括不可枚举的属性。
 * 对于 Window 对象有特殊处理，避免跨域访问错误。
 */

import type { ClassofRaw } from './classof-raw';
import type { ToIndexedObject } from './to-indexed-object';
import type { GetOwnPropertyNames } from './object-get-own-property-names';
import type { ArraySlice } from './array-slice';

/**
 * Window 对象的属性名缓存
 * 仅在浏览器环境中初始化
 */
type WindowPropertyNames = readonly string[];

/**
 * 获取对象自身的所有属性名（包括不可枚举属性）
 * 
 * @param target - 目标对象
 * @returns 属性名数组
 * 
 * @remarks
 * - 对于 Window 对象使用缓存的属性名列表，避免跨域错误
 * - 其他对象使用标准的 Object.getOwnPropertyNames
 */
export declare function f(target: object): string[];

/**
 * 导出的模块接口
 */
export interface GetOwnPropertyNamesExternalModule {
  /**
   * 获取对象的所有自有属性名（包括不可枚举属性）
   * 
   * @param target - 要检查的对象
   * @returns 属性名字符串数组
   * 
   * @example
   *