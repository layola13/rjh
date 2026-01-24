/**
 * Webpack模块导出的CSS样式定义
 * 用于3D性能监控面板的样式配置
 * @module Performance3DStyles
 */

/**
 * Webpack模块加载器函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - 模块加载函数
 */
export type WebpackModuleLoader = (
  exports: WebpackExports,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack导出对象接口
 */
export interface WebpackExports {
  /** 模块的默认导出 */
  default?: unknown;
  /** 其他命名导出 */
  [key: string]: unknown;
}

/**
 * Webpack模块对象接口
 */
export interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: WebpackExports;
  /** 模块是否已加载 */
  loaded?: boolean;
}

/**
 * Webpack require函数签名
 * @param moduleId - 要加载的模块ID
 * @returns 模块的导出对象
 */
export type WebpackRequire = (moduleId: string | number) => unknown;

/**
 * CSS加载器返回值接口
 * 用于处理CSS模块的加载和注入
 */
export interface CSSLoaderExport {
  /**
   * 添加CSS规则到样式表
   * @param rule - CSS规则数组 [moduleId, cssContent, sourceMap?]
   */
  push(rule: [string | number, string, string?]): void;
  
  /** 转换为字符串形式的CSS */
  toString(): string;
  
  /** CSS模块的其他属性 */
  [key: string]: unknown;
}

/**
 * CSS加载器工厂函数签名
 * @param sourceMap - 是否启用source map
 * @returns CSS加载器实例
 */
export type CSSLoaderFactory = (sourceMap: boolean) => CSSLoaderExport;

/**
 * 3D性能监控面板的CSS样式模块
 * 包含以下主要样式：
 * - #performance3dContainer: 主容器样式
 * - #performanceBoard: 性能面板
 * - #arrow: 箭头指示器
 * - .tip-container: 提示框容器
 * - .level-tip-container: 级别提示框
 * - .widget-tip-container: 组件提示框
 */
export const cssContent: string;

/**
 * 模块导出函数
 * 将CSS内容推送到样式加载器
 */
export default function (
  exports: WebpackExports,
  module: WebpackModule,
  require: WebpackRequire
): void;