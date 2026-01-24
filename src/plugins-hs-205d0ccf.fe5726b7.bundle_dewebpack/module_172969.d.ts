/**
 * CSS模块导出类型定义
 * Module: module_172969
 * Original ID: 172969
 */

/**
 * Webpack样式加载器函数类型
 * @param sourceMap - 是否启用源映射
 * @returns 样式加载器实例
 */
type StyleLoaderFunction = (sourceMap: boolean) => StyleLoader;

/**
 * 样式加载器接口
 */
interface StyleLoader {
  /**
   * 推送CSS模块到加载队列
   * @param module - CSS模块元组 [模块ID, CSS内容, 源映射(可选)]
   */
  push(module: [string, string, string?]): void;
}

/**
 * Webpack模块导出对象
 */
interface ModuleExports {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出内容 */
  exports: StyleLoader;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
type WebpackRequire = (moduleId: number) => StyleLoaderFunction;

/**
 * CSS样式内容常量
 * 包含相机根容器和暗色主题工具提示样式
 */
declare const CSS_CONTENT: string;

/**
 * 模块工厂函数
 * @param module - Webpack模块导出对象
 * @param exports - 模块导出内容(未使用)
 * @param require - Webpack require函数用于加载依赖
 */
declare function moduleFactory(
  module: ModuleExports,
  exports: unknown,
  require: WebpackRequire
): void;

export { moduleFactory as default, CSS_CONTENT, ModuleExports, StyleLoader };