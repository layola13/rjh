/**
 * Module: module_f021
 * Original Module ID: f021
 * 
 * This module appears to be empty or its implementation was removed during bundling.
 * The original Webpack module function signature was: function(module, exports, require)
 */

/**
 * Webpack模块导出类型
 * 由于原始模块为空，具体导出内容未知
 */
export type ModuleExports = unknown;

/**
 * 模块函数类型定义
 * @param module - Webpack模块对象
 * @param exports - 模块导出对象
 * @param require - Webpack require函数
 */
export type WebpackModuleFunction = (
  module: WebpackModule,
  exports: Record<string, unknown>,
  require: WebpackRequire
) => void;

/**
 * Webpack模块对象接口
 */
export interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块是否已加载 */
  loaded: boolean;
  /** 模块导出内容 */
  exports: Record<string, unknown>;
}

/**
 * Webpack require函数接口
 */
export interface WebpackRequire {
  /** 加载指定模块 */
  (moduleId: string | number): unknown;
  /** 模块缓存 */
  c: Record<string | number, WebpackModule>;
  /** 定义导出属性 */
  d: (exports: unknown, name: string, getter: () => unknown) => void;
  /** 标记为ES模块 */
  r: (exports: unknown) => void;
}

declare const moduleF021: WebpackModuleFunction;

export default moduleF021;