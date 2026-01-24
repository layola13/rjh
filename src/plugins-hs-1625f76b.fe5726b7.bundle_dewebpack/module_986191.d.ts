/**
 * CSS模块加载器类型定义
 * 用于描述Webpack CSS模块的导出结构
 */

/**
 * CSS模块的类名映射接口
 * 键为CSS类名，值为经过处理后的实际类名（通常包含hash）
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式注入配置接口
 * 定义如何将CSS插入到DOM中的配置选项
 */
export interface StyleLoaderOptions {
  /** 样式标签转换函数 */
  styleTagTransform: StyleTagTransformFunction;
  /** 设置DOM属性的函数 */
  setAttributes: SetAttributesFunction;
  /** 插入DOM的函数 */
  insert: InsertFunction;
  /** DOM操作API */
  domAPI: DOMAPIFunction;
  /** 插入样式元素的函数 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * 样式标签转换函数类型
 * 用于转换样式内容
 */
export type StyleTagTransformFunction = () => (css: string, style: HTMLStyleElement) => void;

/**
 * 设置属性函数类型
 * 用于为样式元素设置自定义属性
 */
export type SetAttributesFunction = () => (element: HTMLElement) => void;

/**
 * 插入函数类型
 * 用于将样式元素插入到指定位置
 * @param target - 插入目标位置（如 "head"）
 * @param element - 要插入的样式元素
 */
export type InsertFunction = (target: string, element: HTMLElement) => void;

/**
 * DOM API函数类型
 * 提供DOM操作的抽象接口
 */
export type DOMAPIFunction = () => {
  update: (obj: StyleObject) => void;
  remove: () => void;
};

/**
 * 插入样式元素函数类型
 * 创建并返回样式元素
 */
export type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * 样式对象接口
 * 包含样式的源内容和相关元数据
 */
export interface StyleObject {
  css: string;
  media?: string;
  sourceMap?: unknown;
}

/**
 * CSS模块默认导出
 * 包含CSS类名映射，如果模块定义了locals则返回映射对象，否则返回undefined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;