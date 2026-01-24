/**
 * 获取对象的所有属性名，包括特殊处理 Window 对象的情况
 * 
 * 当对象是 Window 对象时，会安全地尝试获取其属性名，
 * 失败时返回预缓存的 Window 对象属性名列表。
 * 对于普通对象，使用标准的 Object.getOwnPropertyNames 方法。
 * 
 * @module GetOwnPropertyNamesExtended
 */

/**
 * 将值转换为对象的函数类型
 * 对应导入的 "36c3" 模块
 */
type ToObjectFunction = (value: unknown) => object;

/**
 * 获取对象自有属性名的函数类型
 * 对应导入的 "6abf" 模块的 f 方法
 */
type GetOwnPropertyNamesFunction = (obj: object) => string[];

/**
 * 扩展的获取属性名函数类型
 * 提供了对 Window 对象的特殊处理
 */
export type GetOwnPropertyNamesExtendedFunction = (target: unknown) => string[];

/**
 * 模块导出接口
 */
export interface GetOwnPropertyNamesExtendedModule {
  /**
   * 获取对象的所有自有属性名
   * 
   * @param target - 要获取属性名的目标对象
   * @returns 属性名数组
   * 
   * @remarks
   * - 对于 Window 对象，会尝试安全获取属性名，失败时返回缓存的属性名列表
   * - 对于普通对象，使用标准的 Object.getOwnPropertyNames
   */
  f: GetOwnPropertyNamesExtendedFunction;
}

/**
 * 默认导出：扩展的获取属性名模块
 */
declare const module: GetOwnPropertyNamesExtendedModule;
export default module;