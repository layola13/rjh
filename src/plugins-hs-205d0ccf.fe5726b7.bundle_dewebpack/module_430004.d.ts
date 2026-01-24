/**
 * CSS模块加载器类型定义
 * 用于处理CSS模块的样式注入和局部作用域类名
 */

/**
 * CSS模块导出的类名映射
 * 键为源代码中的类名，值为经过处理的唯一类名
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * 样式标签转换函数
 * 负责将CSS内容插入到DOM中的style标签
 */
export type StyleTagTransformFunction = (
  css: string,
  styleElement: HTMLStyleElement
) => void;

/**
 * 设置DOM元素属性的函数
 * 用于为注入的style标签设置自定义属性（如nonce、data-*等）
 */
export type SetAttributesFunction = (styleElement: HTMLStyleElement) => void;

/**
 * DOM插入函数
 * 指定将style标签插入到DOM的位置
 * @param selector - CSS选择器，指定插入位置的父元素
 * @param styleElement - 要插入的style元素
 */
export type InsertFunction = (
  selector: string,
  styleElement: HTMLStyleElement
) => void;

/**
 * DOM API函数
 * 提供创建和操作style元素的底层API
 */
export type DomAPIFunction = (
  options: unknown
) => {
  update: (content: string) => void;
  remove: () => void;
};

/**
 * 插入样式元素的函数
 * 创建并返回一个新的style元素
 */
export type InsertStyleElementFunction = (options: unknown) => HTMLStyleElement;

/**
 * 样式加载器配置选项
 * 定义了CSS模块加载和注入的完整配置
 */
export interface StyleLoaderOptions {
  /** 样式标签转换函数 */
  styleTagTransform: StyleTagTransformFunction;
  /** 设置属性函数 */
  setAttributes: SetAttributesFunction;
  /** DOM插入函数 */
  insert: InsertFunction;
  /** DOM操作API */
  domAPI: DomAPIFunction;
  /** 插入样式元素函数 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS模块对象
 * 包含样式内容和局部作用域类名映射
 */
export interface CSSModule {
  /** CSS源代码内容 */
  toString(): string;
  /** 局部作用域类名映射表 */
  locals?: CSSModuleLocals;
  [key: string]: unknown;
}

/**
 * 默认导出：CSS模块的类名映射
 * 如果CSS模块包含局部作用域类名，返回映射对象；否则返回undefined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * 重导出CSS模块的所有命名导出
 * （除了default之外的所有导出项）
 */
export * from './module_627787';