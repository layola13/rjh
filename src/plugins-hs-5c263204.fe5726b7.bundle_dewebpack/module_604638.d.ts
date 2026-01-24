/**
 * CSS Modules 类型声明
 * 该模块导出 CSS 模块的类名映射和样式注入配置
 */

/**
 * CSS 类名映射接口
 * 包含 CSS 模块中定义的所有类名
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式标签转换函数类型
 * 用于转换和插入样式标签到 DOM
 */
export type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * 设置属性函数类型
 * 用于设置样式元素的属性
 */
export type SetAttributesFunction = (styleElement: HTMLStyleElement, attributes?: Record<string, string>) => void;

/**
 * 插入函数类型
 * 用于将样式元素插入到指定位置
 */
export type InsertFunction = (target: string | HTMLElement, styleElement: HTMLStyleElement) => void;

/**
 * DOM API 函数类型
 * 提供 DOM 操作的接口
 */
export type DOMAPIFunction = (styleElement: HTMLStyleElement, options?: unknown) => void;

/**
 * 插入样式元素函数类型
 * 用于创建和插入样式元素
 */
export type InsertStyleElementFunction = (options: StyleLoaderOptions) => HTMLStyleElement;

/**
 * 样式加载器配置选项
 * 配置 CSS 模块的注入行为
 */
export interface StyleLoaderOptions {
  /** 样式标签转换函数 */
  styleTagTransform: StyleTagTransformFunction;
  /** 设置属性函数 */
  setAttributes: SetAttributesFunction;
  /** 插入函数 */
  insert: InsertFunction;
  /** DOM API 函数 */
  domAPI: DOMAPIFunction;
  /** 插入样式元素函数 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS 模块导出的所有成员（除了 default）
 * 可能包含额外的导出变量或函数
 */
export * from './css-module-exports';

/**
 * 默认导出：CSS 类名映射对象
 * 如果 CSS 模块包含 locals，则返回类名映射；否则返回 undefined
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;
export default cssModuleClasses;