/**
 * CSS模块加载器的类型定义
 * 用于处理CSS模块的样式注入和类名映射
 */

/**
 * CSS模块的类名映射对象
 * 键为原始类名，值为经过处理的唯一类名
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * 样式标签转换函数类型
 * 用于在DOM中插入或更新style标签
 */
export type StyleTagTransformFunction = (
  css: string,
  styleElement: HTMLStyleElement
) => void;

/**
 * 设置元素属性的函数类型
 * 用于为style元素设置自定义属性
 */
export type SetAttributesFunction = (
  element: HTMLElement,
  attributes?: Record<string, string>
) => void;

/**
 * DOM插入函数类型
 * 用于将style元素插入到指定的DOM位置
 */
export type InsertFunction = (element: HTMLElement) => void;

/**
 * DOM API函数类型
 * 用于创建和操作DOM元素
 */
export type DOMAPIFunction = (
  options: StyleLoaderOptions
) => {
  update: (obj: CSSModule) => void;
  remove: () => void;
};

/**
 * 插入样式元素的函数类型
 */
export type InsertStyleElementFunction = (options: StyleLoaderOptions) => HTMLElement;

/**
 * 样式加载器配置选项
 */
export interface StyleLoaderOptions {
  /** 样式标签转换函数 */
  styleTagTransform: StyleTagTransformFunction;
  /** 设置属性函数 */
  setAttributes: SetAttributesFunction;
  /** 插入函数 */
  insert: InsertFunction;
  /** DOM API函数 */
  domAPI: DOMAPIFunction;
  /** 插入样式元素函数 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS模块对象
 */
export interface CSSModule {
  /** CSS源代码 */
  css?: string;
  /** 源映射 */
  sourceMap?: unknown;
  /** 类名映射 */
  locals?: CSSModuleLocals;
}

/**
 * 导出的CSS模块类名映射
 * 如果CSS模块包含locals则返回类名映射对象，否则返回undefined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;