/**
 * CSS模块加载器的类型定义
 * 该模块处理CSS模块的加载和样式注入
 */

/**
 * CSS模块导出的类名映射
 * 键为CSS中定义的类名，值为经过hash处理后的唯一类名
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * 样式标签转换函数类型
 * 用于将CSS内容转换为<style>标签并插入到DOM中
 */
export type StyleTagTransformFunction = (
  css: string,
  styleElement: HTMLStyleElement
) => void;

/**
 * 设置DOM元素属性的函数类型
 * 用于为<style>标签添加自定义属性（如nonce、data-*等）
 */
export type SetAttributesFunction = (element: HTMLElement) => void;

/**
 * DOM插入函数类型
 * 用于将<style>元素插入到文档的指定位置
 * @param element - 要插入的样式元素
 */
export type InsertFunction = (element: HTMLStyleElement) => void;

/**
 * DOM API函数类型
 * 提供更新和移除样式的方法
 */
export interface DOMAPIFunction {
  (options: StyleOptions): {
    update: (obj: StyleOptions) => void;
    remove: () => void;
  };
}

/**
 * 创建样式元素的函数类型
 */
export type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * 样式选项配置
 */
export interface StyleOptions {
  css: string;
  media?: string;
  sourceMap?: string | object;
}

/**
 * 样式加载器配置对象
 * 包含处理CSS模块所需的各种工具函数
 */
export interface StyleLoaderOptions {
  /** 样式标签转换函数 */
  styleTagTransform: StyleTagTransformFunction;
  /** 设置元素属性函数 */
  setAttributes: SetAttributesFunction;
  /** DOM插入函数 */
  insert: InsertFunction;
  /** DOM操作API */
  domAPI: DOMAPIFunction;
  /** 创建样式元素函数 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS模块的默认导出
 * 如果CSS文件启用了CSS Modules，则返回类名映射对象
 * 否则返回undefined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;