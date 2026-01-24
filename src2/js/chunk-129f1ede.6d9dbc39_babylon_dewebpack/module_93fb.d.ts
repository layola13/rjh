/**
 * Webpack 模块定义
 * @module module_93fb
 * @description 原始模块 ID: 93fb
 */

/**
 * Webpack 模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require 函数，用于导入其他模块
 */
type WebpackModuleFunction = (
  exports: Record<string, unknown>,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack 模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  /** 模块是否已加载 */
  loaded: boolean;
  /** 模块导出内容 */
  exports: Record<string, unknown>;
}

/**
 * Webpack require 函数接口
 */
interface WebpackRequire {
  /** 
   * 加载指定模块
   * @param moduleId - 要加载的模块 ID
   * @returns 模块导出内容
   */
  (moduleId: string): unknown;
  
  /** 缓存的模块对象 */
  c?: Record<string, WebpackModule>;
}

/**
 * 模块 93fb 的导出函数
 * 当前为空实现，具体功能需要根据实际代码补充
 */
declare const module_93fb: WebpackModuleFunction;

export default module_93fb;