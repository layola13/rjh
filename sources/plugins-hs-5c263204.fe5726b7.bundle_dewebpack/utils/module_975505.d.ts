/**
 * CSS 样式模块类型定义
 * 
 * 这个模块处理 CSS 样式的动态注入和管理，使用 style-loader 相关工具链
 */

/**
 * CSS 模块的 locals 对象类型
 * 包含 CSS Modules 导出的类名映射
 */
export type CSSModuleLocals = Record<string, string> | undefined;

/**
 * 样式标签转换函数类型
 * 负责将样式内容转换并插入到页面中
 */
export type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * DOM API 函数类型
 * 提供操作 DOM 的基础方法
 */
export type DOMAPIFunction = (styleElement: HTMLStyleElement, options?: unknown) => void;

/**
 * 插入函数类型
 * 指定样式元素的插入位置（例如 "head"）
 */
export type InsertFunction = (target: string) => (element: HTMLElement) => void;

/**
 * 设置属性函数类型
 * 为样式元素设置自定义属性
 */
export type SetAttributesFunction = (element: HTMLElement, attributes?: Record<string, string>) => void;

/**
 * 插入样式元素函数类型
 * 创建并插入样式元素到文档中
 */
export type InsertStyleElementFunction = (options: StyleLoaderOptions) => HTMLStyleElement;

/**
 * style-loader 配置选项接口
 */
export interface StyleLoaderOptions {
  /**
   * 样式标签转换函数
   * 用于处理和转换样式内容
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * 设置属性函数
   * 为生成的 style 标签设置属性（如 nonce、data-* 等）
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * 插入函数
   * 定义样式元素插入到 DOM 的位置和方式
   */
  insert: InsertFunction;
  
  /**
   * DOM API 函数
   * 提供操作 DOM 的接口
   */
  domAPI: DOMAPIFunction;
  
  /**
   * 插入样式元素函数
   * 实际执行样式元素创建和插入的函数
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS 模块导出接口
 * 包含样式字符串和 CSS Modules 的类名映射
 */
export interface CSSModuleExports {
  /**
   * 原始 CSS 样式字符串数组
   * 格式: [[moduleId, cssContent, mediaQuery, ...]]
   */
  default?: Array<[string, string, string?]>;
  
  /**
   * CSS Modules 的类名映射
   * 将源代码中的类名映射到生成的唯一类名
   */
  locals?: CSSModuleLocals;
}

/**
 * 默认导出
 * CSS Modules 的 locals 对象，包含类名映射
 * 如果不是 CSS Modules 则为 undefined
 */
declare const cssModuleLocals: CSSModuleLocals;

export default cssModuleLocals;

/**
 * 从其他 CSS 模块重导出的内容
 * 这里导出了源 CSS 模块的所有命名导出（除了 default）
 */
export * from './internal-css-module';