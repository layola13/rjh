/**
 * CSS模块导出的类型定义
 * 该模块处理样式表的动态加载和类名映射
 */

/**
 * CSS模块的类名映射接口
 * 键为CSS类名，值为经过处理后的实际类名（通常包含hash）
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式标签转换函数类型
 * 用于将CSS内容插入到DOM中
 */
export type StyleTagTransformFn = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * 设置DOM元素属性的函数类型
 */
export type SetAttributesFn = (element: HTMLElement, attributes: Record<string, string>) => void;

/**
 * 样式插入函数类型
 * @param target - 插入目标选择器（如 "head" 或 "body"）
 * @param options - 插入选项配置
 */
export type InsertFn = (target: string, options?: InsertOptions) => HTMLElement;

/**
 * 插入选项配置接口
 */
export interface InsertOptions {
  attributes?: Record<string, string>;
  insert?: string | HTMLElement;
}

/**
 * DOM API函数类型
 * 用于操作样式元素的底层API
 */
export type DOMAPIFn = (styleElement: HTMLStyleElement, options: DOMAPIOptions) => void;

/**
 * DOM API选项接口
 */
export interface DOMAPIOptions {
  singleton?: boolean;
  [key: string]: unknown;
}

/**
 * 插入样式元素函数类型
 */
export type InsertStyleElementFn = (options: StyleElementOptions) => HTMLStyleElement;

/**
 * 样式元素选项接口
 */
export interface StyleElementOptions {
  attributes?: Record<string, string>;
  [key: string]: unknown;
}

/**
 * 样式加载器配置接口
 * 定义了注入CSS到页面所需的所有工具函数
 */
export interface StyleLoaderOptions {
  /** 样式标签转换函数 */
  styleTagTransform: StyleTagTransformFn;
  /** 设置元素属性函数 */
  setAttributes: SetAttributesFn;
  /** 样式插入函数 */
  insert: InsertFn;
  /** DOM操作API */
  domAPI: DOMAPIFn;
  /** 插入样式元素函数 */
  insertStyleElement: InsertStyleElementFn;
}

/**
 * CSS模块对象接口
 * 包含原始CSS内容和类名映射
 */
export interface CSSModule {
  /** CSS源代码内容 */
  toString(): string;
  /** 局部作用域的类名映射 */
  locals?: CSSModuleClasses;
  [key: string]: unknown;
}

/**
 * 默认导出：CSS模块的类名映射
 * 如果CSS模块包含局部作用域的类名，则返回映射对象；否则返回undefined
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;