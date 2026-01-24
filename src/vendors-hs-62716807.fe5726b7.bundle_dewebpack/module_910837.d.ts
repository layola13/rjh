/**
 * CSS模块加载器的类型定义
 * 用于Webpack环境下CSS Modules的样式注入和类名映射
 */

/**
 * CSS模块的本地类名映射
 * 键为CSS类名，值为经过处理后的唯一类名
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
 * DOM API接口
 * 提供操作DOM样式元素的方法
 */
export interface DOMApi {
  (options: StyleOptions): void;
}

/**
 * 样式插入函数
 * 将样式元素插入到指定的DOM位置
 */
export type InsertFunction = (element: HTMLStyleElement) => void;

/**
 * 设置属性函数
 * 为样式元素设置自定义属性
 */
export type SetAttributesFunction = (
  element: HTMLStyleElement,
  attributes?: Record<string, string>
) => void;

/**
 * 插入样式元素函数
 * 创建并返回样式元素
 */
export type InsertStyleElementFunction = (options: StyleOptions) => HTMLStyleElement;

/**
 * 样式选项配置
 */
export interface StyleOptions {
  /** 样式标签转换函数 */
  styleTagTransform?: StyleTagTransformFunction;
  /** 设置属性函数 */
  setAttributes?: SetAttributesFunction;
  /** 插入函数 */
  insert?: InsertFunction;
  /** DOM API */
  domAPI?: DOMApi;
  /** 插入样式元素函数 */
  insertStyleElement?: InsertStyleElementFunction;
}

/**
 * CSS模块导出内容
 */
export interface CSSModuleExports {
  /** CSS内容数组 */
  content?: Array<[string, string, string]>;
  /** 本地类名映射 */
  locals?: CSSModuleLocals;
  /** 其他元数据 */
  [key: string]: unknown;
}

/**
 * CSS Modules的默认导出
 * 包含所有CSS类名到处理后类名的映射
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * 从CSS模块中重新导出的所有命名导出
 * 每个导出对应原始CSS模块中的一个类名或变量
 */
export * from './styles';