/**
 * CSS 模块样式加载器的类型定义
 * 用于处理 CSS Modules 的导入和样式注入
 */

/**
 * CSS Modules 的类名映射接口
 * 将 CSS 类名映射到生成的哈希类名
 */
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * 样式标签转换函数类型
 * 负责将 CSS 内容转换并插入到 DOM 中
 */
export type StyleTagTransformFunction = (
  css: string,
  styleElement: HTMLStyleElement
) => void;

/**
 * 设置元素属性的函数类型
 * 用于为 style 标签设置自定义属性（如 nonce、data-* 等）
 */
export type SetAttributesFunction = (element: HTMLElement) => void;

/**
 * DOM 插入函数类型
 * 定义将 style 元素插入到指定位置的逻辑
 */
export type InsertFunction = (element: HTMLElement) => void;

/**
 * DOM API 接口
 * 提供操作 style 元素的底层方法
 */
export interface DOMApi {
  (options: StyleOptions): StyleInstance;
}

/**
 * 创建样式元素的函数类型
 */
export type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * 样式加载选项配置
 */
export interface StyleOptions {
  /** 样式标签转换处理器 */
  styleTagTransform: StyleTagTransformFunction;
  /** 设置元素属性的处理器 */
  setAttributes: SetAttributesFunction;
  /** 插入位置处理器 */
  insert: InsertFunction;
  /** DOM 操作 API */
  domAPI: DOMApi;
  /** 创建样式元素的工厂函数 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * 样式实例接口
 * 表示已注入 DOM 的样式对象
 */
export interface StyleInstance {
  /** 更新样式内容 */
  update: (newContent: string) => void;
  /** 移除样式 */
  remove: () => void;
}

/**
 * CSS Modules 导出的默认对象
 * 包含类名映射（如果使用了 CSS Modules）
 * 
 * @example
 *