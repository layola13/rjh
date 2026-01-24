/**
 * CSS Modules 样式加载器模块
 * 
 * 该模块处理 CSS-in-JS 的加载和注入，使用 style-loader 相关工具
 * 将样式动态插入到 DOM 中，并导出 CSS Modules 的类名映射
 */

/**
 * 样式注入配置选项
 * 用于配置如何将 CSS 注入到页面中
 */
export interface StyleLoaderOptions {
  /** 样式标签转换函数 - 处理样式内容的转换 */
  styleTagTransform: StyleTagTransformFunction;
  
  /** 设置样式元素属性的函数 */
  setAttributes: SetAttributesFunction;
  
  /** 插入样式到 DOM 的函数 */
  insert: InsertFunction;
  
  /** DOM 操作 API */
  domAPI: DOMAPIFunction;
  
  /** 插入样式元素的函数 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * 样式标签转换函数类型
 * @param css - 原始 CSS 字符串
 * @param styleElement - 目标 style 元素
 */
export type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * 设置元素属性函数类型
 * @param element - 要设置属性的 DOM 元素
 * @param options - 属性配置对象
 */
export type SetAttributesFunction = (element: HTMLElement, options?: Record<string, string>) => void;

/**
 * 插入元素到 DOM 函数类型
 * @param target - 目标容器（如 "head" 或具体元素）
 * @param element - 要插入的元素
 */
export type InsertFunction = (target: string | HTMLElement, element: HTMLElement) => void;

/**
 * DOM API 操作函数类型
 * @param options - DOM 操作配置
 * @returns 返回样式更新/移除的控制函数
 */
export type DOMAPIFunction = (options?: unknown) => StyleUpdateAPI;

/**
 * 样式更新 API 接口
 */
export interface StyleUpdateAPI {
  /** 更新样式内容 */
  update?: (css: string) => void;
  
  /** 移除样式 */
  remove?: () => void;
}

/**
 * 插入样式元素函数类型
 * @param element - 样式元素
 */
export type InsertStyleElementFunction = (element: HTMLStyleElement) => void;

/**
 * CSS Modules 类名映射类型
 * 键为源代码中的类名，值为生成的唯一类名（带哈希）
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式模块导出对象
 * 包含类名映射和可能的其他元数据
 */
export interface StyleModule {
  /** CSS Modules 生成的类名映射 */
  locals?: CSSModuleClasses;
  
  /** 样式内容或其他导出 */
  [key: string]: unknown;
}

/**
 * 默认导出：CSS Modules 的类名映射
 * 
 * @remarks
 * - 如果样式模块包含 locals 属性，返回类名映射对象
 * - 否则返回 undefined
 * 
 * @example
 *