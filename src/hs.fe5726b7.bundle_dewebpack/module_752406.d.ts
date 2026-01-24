/**
 * CSS模块加载器的类型定义
 * 该模块处理CSS模块的加载、样式注入和类名导出
 */

/**
 * CSS模块导出的类名映射接口
 * 键为源CSS类名，值为经过处理后的唯一类名
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式标签转换函数类型
 * 用于处理和转换样式内容后再注入到DOM中
 */
export type StyleTagTransformFunction = (
  css: string,
  styleElement: HTMLStyleElement
) => void;

/**
 * 设置HTML元素属性的函数类型
 * 用于为注入的style标签设置自定义属性（如nonce、data-*等）
 */
export type SetAttributesFunction = (
  element: HTMLElement,
  attributes?: Record<string, string>
) => void;

/**
 * 样式插入函数类型
 * 负责将style元素插入到指定的DOM位置
 * @param insertTarget - 插入目标选择器或元素（如"head"）
 * @param styleElement - 要插入的样式元素
 */
export type InsertFunction = (
  insertTarget: string | HTMLElement,
  styleElement: HTMLStyleElement
) => void;

/**
 * DOM操作API函数类型
 * 提供底层的DOM更新、移除等操作
 */
export type DOMAPIFunction = (
  styleElement: HTMLStyleElement,
  options?: unknown
) => void;

/**
 * 样式元素创建函数类型
 * 负责创建并返回一个新的style元素
 */
export type InsertStyleElementFunction = (
  options?: unknown
) => HTMLStyleElement;

/**
 * 样式加载器选项配置接口
 * 包含所有处理CSS模块所需的工具函数
 */
export interface StyleLoaderOptions {
  /** 样式标签转换器 */
  styleTagTransform: StyleTagTransformFunction;
  
  /** 属性设置器 */
  setAttributes: SetAttributesFunction;
  
  /** 样式插入器 */
  insert: InsertFunction;
  
  /** DOM操作API */
  domAPI: DOMAPIFunction;
  
  /** 样式元素创建器 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS模块对象接口
 * 包含模块的原始内容和导出的类名映射
 */
export interface CSSModule {
  /** CSS模块导出的类名映射（可选） */
  locals?: CSSModuleClasses;
  
  /** CSS内容（可选） */
  toString?: () => string;
  
  /** 其他可能的属性 */
  [key: string]: unknown;
}

/**
 * 默认导出：CSS模块的类名映射
 * 如果模块包含locals则返回类名映射对象，否则返回undefined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * 重导出CSS模块的所有命名导出
 * 这允许直接导入具体的类名，例如：
 * import { myClassName } from './styles.module.css';
 */
export * from './css-module-exports';