/**
 * CSS模块加载器类型定义
 * 提供样式模块的导入和CSS类名映射
 */

/**
 * CSS模块的类名映射接口
 * 键为源CSS类名，值为经过处理后的唯一类名
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式标签转换函数类型
 * 用于将CSS内容插入到DOM中的style标签
 */
export type StyleTagTransformFunction = (
  css: string,
  styleElement: HTMLStyleElement
) => void;

/**
 * 设置DOM元素属性的函数类型
 * 用于为注入的style元素设置自定义属性
 */
export type SetAttributesFunction = (element: HTMLElement) => void;

/**
 * DOM插入函数类型
 * 负责将style元素插入到指定的DOM位置
 */
export type InsertFunction = (element: HTMLElement) => void;

/**
 * DOM API接口
 * 提供创建和操作style元素的方法
 */
export type DOMAPIFunction = (
  options: unknown
) => {
  update: (obj: unknown) => void;
  remove: () => void;
};

/**
 * 插入样式元素的函数类型
 * 创建并返回一个新的style元素
 */
export type InsertStyleElementFunction = (options: unknown) => HTMLStyleElement;

/**
 * 样式加载器配置接口
 * 包含所有必要的样式注入和处理函数
 */
export interface StyleLoaderOptions {
  /** 样式标签转换处理器 */
  styleTagTransform: StyleTagTransformFunction;
  /** 属性设置器 */
  setAttributes: SetAttributesFunction;
  /** DOM插入器 */
  insert: InsertFunction;
  /** DOM操作API */
  domAPI: DOMAPIFunction;
  /** 样式元素插入器 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * 样式模块对象接口
 * 包含CSS模块的locals属性（类名映射）
 */
export interface StyleModule {
  /** CSS模块的类名映射表 */
  locals?: CSSModuleClasses;
  [key: string]: unknown;
}

/**
 * CSS模块的默认导出
 * 返回经过处理的CSS类名映射对象
 * 如果模块不包含locals，则返回undefined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;