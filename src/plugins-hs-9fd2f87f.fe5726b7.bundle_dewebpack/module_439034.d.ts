/**
 * CSS模块加载器类型定义
 * 用于处理CSS模块的动态导入和样式注入
 */

/**
 * CSS模块导出的类名映射
 * 键为CSS类名，值为经过hash处理后的唯一类名
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式标签转换函数类型
 * 用于将CSS内容转换为DOM样式标签
 */
export type StyleTagTransformFunction = (
  css: string,
  styleElement: HTMLStyleElement
) => void;

/**
 * 设置DOM元素属性的函数类型
 */
export type SetAttributesFunction = (
  element: HTMLElement,
  attributes: Record<string, string>
) => void;

/**
 * 插入DOM元素的函数类型
 * @param selector - CSS选择器，指定插入位置的父元素
 * @param element - 要插入的DOM元素
 */
export type InsertFunction = (
  selector: string,
  element: HTMLElement
) => void;

/**
 * DOM API操作函数类型
 * 用于操作DOM元素的通用接口
 */
export type DOMAPIFunction = (
  element: HTMLElement,
  options?: unknown
) => void;

/**
 * 插入样式元素的函数类型
 * 用于创建和插入<style>标签
 */
export type InsertStyleElementFunction = (
  options: StyleLoaderOptions
) => HTMLStyleElement;

/**
 * 样式加载器配置选项
 */
export interface StyleLoaderOptions {
  /** 样式标签转换函数 */
  styleTagTransform: StyleTagTransformFunction;
  /** 设置属性函数 */
  setAttributes: SetAttributesFunction;
  /** DOM元素插入函数 */
  insert: InsertFunction;
  /** DOM API操作函数 */
  domAPI: DOMAPIFunction;
  /** 样式元素插入函数 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS模块对象
 */
export interface CSSModule {
  /** CSS模块导出的类名映射 */
  locals?: CSSModuleClasses;
  /** CSS内容字符串 */
  toString?: () => string;
}

/**
 * 默认导出：CSS模块的类名映射
 * 如果CSS模块包含locals属性则返回类名映射，否则返回undefined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * 重新导出CSS模块的所有命名导出
 * 允许直接导入CSS类名作为命名导出
 */
export * from './css-module-source';