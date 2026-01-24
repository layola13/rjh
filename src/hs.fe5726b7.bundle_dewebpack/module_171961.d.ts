/**
 * CSS模块导出类型定义
 * 
 * 该模块用于加载并注入CSS样式到页面中。
 * 主要包含展开/收起按钮的样式定义。
 * 
 * @module CSSModuleLoader
 */

/**
 * Webpack模块导出函数类型
 * 
 * @param exports - 模块导出对象
 * @param require - Webpack require函数
 * @param moduleFactory - 模块工厂函数（通常是css-loader）
 */
declare function loadCSSModule(
  exports: WebpackModuleExports,
  require: WebpackRequire,
  moduleFactory: CSSLoaderFactory
): void;

/**
 * Webpack模块导出对象
 */
interface WebpackModuleExports {
  /** 模块ID */
  id: string | number;
  /** 模块导出内容 */
  exports: unknown;
}

/**
 * Webpack require函数
 */
interface WebpackRequire {
  /**
   * 加载指定模块
   * @param moduleId - 模块ID
   * @returns 模块导出内容
   */
  (moduleId: number): CSSLoader;
}

/**
 * CSS加载器工厂函数
 */
interface CSSLoaderFactory {
  /**
   * 创建CSS加载器实例
   * @param sourceMap - 是否启用source map
   * @returns CSS加载器实例
   */
  (sourceMap: boolean): CSSLoader;
}

/**
 * CSS加载器实例
 */
interface CSSLoader {
  /**
   * 添加CSS内容到加载队列
   * 
   * @param entry - CSS模块条目
   * @param entry[0] - 模块ID
   * @param entry[1] - CSS样式内容
   * @param entry[2] - 可选的媒体查询条件
   */
  push(entry: [string | number, string, string?]): void;
}

/**
 * CSS样式内容
 * 
 * 包含以下样式类：
 * - `.hsw-expandbtn`: 展开/收起按钮基础样式
 * - `.hsw-expandbtn svg`: SVG图标容器样式
 * - `.hsw-expandbtn svg .selected`: 选中状态图标（默认隐藏）
 * - `.hsw-expandbtn svg .normal`: 正常状态图标（默认显示）
 * - `.hsw-expandbtn.expand svg .selected`: 展开时选中状态图标（显示）
 * - `.hsw-expandbtn.expand svg .normal`: 展开时正常状态图标（隐藏）
 */
declare const cssContent: string;

export default loadCSSModule;
export type { WebpackModuleExports, WebpackRequire, CSSLoaderFactory, CSSLoader };