/**
 * CSS模块导出类型定义
 * 包含位置提示框(tooltip)相关的CSS样式
 * @module PositionTooltipStyles
 */

/**
 * Webpack CSS加载器模块函数类型
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param moduleId - 当前模块的唯一标识符
 */
export type WebpackCSSModule = (
  exports: CSSModuleExports,
  require: WebpackRequire,
  moduleId: number
) => void;

/**
 * CSS模块导出接口
 */
export interface CSSModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  
  /** 导出的CSS内容数组 */
  exports: CSSExport[];
  
  /**
   * 推送CSS规则到导出数组
   * @param rule - CSS规则数组 [moduleId, cssContent, sourceMap?]
   */
  push(rule: CSSRule): void;
}

/**
 * CSS规则类型
 * [模块ID, CSS内容字符串, 可选的source map]
 */
export type CSSRule = [string | number, string, string?];

/**
 * CSS导出内容类型
 */
export type CSSExport = string | [string, string];

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块导出对象
 */
export type WebpackRequire = (moduleId: number) => unknown;

/**
 * 位置提示框CSS类名映射
 */
export interface PositionTooltipClasses {
  /** 提示框容器包装器类名 */
  'position-tooltip-wrapper': string;
  
  /** 提示框显示状态类名 */
  'show': string;
  
  /** 提示框箭头指示器类名 */
  'position-tooltip-arrow': string;
}

/**
 * CSS样式规则内容
 * 包含以下样式定义：
 * - .position-tooltip-wrapper: 提示框容器，绝对定位，初始缩放0.1，透明度0
 * - .position-tooltip-wrapper.show: 显示状态，缩放至1
 * - .position-tooltip-wrapper .position-tooltip-arrow: 箭头元素，45度旋转，渐变背景
 */
export const CSS_CONTENT: string;

/**
 * 模块默认导出
 * 包含CSS内容和类名映射
 */
export default PositionTooltipClasses;