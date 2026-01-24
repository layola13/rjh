/**
 * Webpack模块定义
 * @module module_87b7
 * @description 原始模块ID: 87b7
 */

/**
 * Webpack模块导出对象
 * 包含模块导出的所有成员
 */
export interface ModuleExports {}

/**
 * Webpack模块对象
 * 用于存储模块的导出内容和元数据
 */
export interface WebpackModule {
  /** 模块导出对象 */
  exports: ModuleExports;
  /** 模块ID */
  id: string;
  /** 模块是否已加载 */
  loaded: boolean;
}

/**
 * Webpack require函数
 * 用于动态加载其他模块
 */
export interface WebpackRequire {
  /**
   * 加载指定模块
   * @param moduleId - 要加载的模块ID
   * @returns 模块的导出对象
   */
  (moduleId: string): unknown;
  
  /** 缓存的模块映射 */
  c: Record<string, WebpackModule>;
  
  /** 模块定义映射 */
  m: Record<string, WebpackModuleFactory>;
}

/**
 * Webpack模块工厂函数
 * @param module - 当前模块对象
 * @param exports - 模块导出对象
 * @param require - webpack require函数
 */
export type WebpackModuleFactory = (
  module: WebpackModule,
  exports: ModuleExports,
  require: WebpackRequire
) => void;

/**
 * 模块87b7的工厂函数
 * 该模块当前没有实现任何功能
 * @param module - 当前模块对象
 * @param exports - 模块导出对象
 * @param require - webpack require函数
 */
declare const moduleFactory: WebpackModuleFactory;

export default moduleFactory;