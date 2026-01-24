/**
 * CSS模块导出的类型定义
 * @module module_282916
 * @description 属性栏复选框组件的样式模块
 */

/**
 * Webpack CSS加载器的导出函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块加载器实例
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModuleExports;

/**
 * CSS模块导出接口
 */
interface CSSModuleExports {
  /**
   * 将CSS内容推送到模块
   * @param entry - CSS模块条目 [模块ID, CSS字符串内容]
   */
  push(entry: [string, string]): void;
}

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
declare function moduleExport(
  exports: { exports: CSSModuleExports },
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack模块对象
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出对象 */
  exports: CSSModuleExports;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * 属性栏复选框样式类名
 */
export interface PropertyBarCheckboxStyles {
  /** 主容器样式类 */
  'property-bar-checkbox': string;
  /** 复选框容器样式类 */
  'property-bar-checkbox-box': string;
}

export default moduleExport;