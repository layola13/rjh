/**
 * CSS 模块加载器的类型定义
 * 用于导出 CSS Modules 的类名映射和副作用注入逻辑
 */

/**
 * CSS Modules 的类名映射对象
 * 键为源CSS中的类名，值为经过hash处理后的唯一类名
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * 样式标签转换函数类型
 * 用于在DOM中插入或更新style标签
 */
export type StyleTagTransform = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * DOM API操作函数类型
 * 提供跨浏览器的样式操作接口
 */
export type DOMApi = (element: HTMLElement, options?: Record<string, unknown>) => void;

/**
 * 样式元素插入函数类型
 * @param target - 目标DOM节点选择器（如 "head"）
 * @param options - 插入选项配置
 */
export type InsertStyleFunction = (target: string, options?: Record<string, unknown>) => void;

/**
 * 设置元素属性函数类型
 * 用于为style标签设置nonce、data-*等属性
 */
export type SetAttributesFunction = (element: HTMLElement, attributes?: Record<string, string>) => void;

/**
 * 创建样式元素函数类型
 * 返回一个新的style或link元素
 */
export type InsertStyleElement = () => HTMLStyleElement | HTMLLinkElement;

/**
 * 样式加载器配置选项
 */
export interface StyleLoaderOptions {
  /** 样式标签转换处理器 */
  readonly styleTagTransform: StyleTagTransform;
  
  /** 元素属性设置器 */
  readonly setAttributes: SetAttributesFunction;
  
  /** 样式插入函数 */
  readonly insert: InsertStyleFunction;
  
  /** DOM操作API */
  readonly domAPI: DOMApi;
  
  /** 样式元素创建器 */
  readonly insertStyleElement: InsertStyleElement;
}

/**
 * CSS模块的默认导出
 * 包含经过处理的类名映射对象
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;