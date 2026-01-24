/**
 * CSS模块加载器的类型定义
 * 用于Webpack CSS Modules的样式注入和类名映射
 */

/**
 * CSS Modules导出的类名映射对象
 * 键为源CSS中的类名，值为转换后的唯一类名
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式标签转换函数
 * 将CSS内容转换为<style>标签并插入DOM
 * @param css - CSS内容字符串
 * @param styleElement - 目标style元素
 */
export type StyleTagTransformFunction = (
  css: string,
  styleElement: HTMLStyleElement
) => void;

/**
 * DOM API函数
 * 用于操作样式元素的插入和移除
 * @param options - 样式操作选项
 */
export type DOMAPIFunction = (options: StyleOptions) => {
  update: (obj: StyleOptions) => void;
  remove: () => void;
};

/**
 * 插入函数
 * 将样式元素插入到指定的DOM位置
 * @param element - 要插入的样式元素
 */
export type InsertFunction = (element: HTMLStyleElement) => void;

/**
 * 设置属性函数
 * 为样式元素设置自定义属性
 * @param element - 目标元素
 * @param attributes - 属性对象
 */
export type SetAttributesFunction = (
  element: HTMLElement,
  attributes?: Record<string, string>
) => void;

/**
 * 插入样式元素函数
 * 创建并返回一个新的style元素
 * @param options - 样式选项
 */
export type InsertStyleElementFunction = (
  options: StyleOptions
) => HTMLStyleElement;

/**
 * 样式选项配置
 */
export interface StyleOptions {
  /** CSS内容数组，每项包含[moduleId, css, media?, sourceMap?] */
  css?: Array<[string, string, string?, any?]>;
  /** 样式元素的自定义属性 */
  attributes?: Record<string, string>;
  /** 插入位置选择器 */
  insert?: string | InsertFunction;
}

/**
 * 样式加载器配置对象
 */
export interface StyleLoaderConfig {
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
 * CSS Modules默认导出
 * 包含转换后的CSS类名映射对象
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;