/**
 * CSS模块加载器类型定义
 * 用于处理CSS模块的样式注入和本地类名映射
 */

/**
 * CSS模块配置选项
 * 定义样式注入和DOM操作的各种策略
 */
interface CSSModuleOptions {
  /** 样式标签转换函数，用于处理样式内容的插入方式 */
  styleTagTransform: StyleTagTransformFunction;
  
  /** 设置样式元素属性的函数 */
  setAttributes: SetAttributesFunction;
  
  /** 样式元素插入函数，指定插入到DOM的位置 */
  insert: InsertFunction;
  
  /** DOM API操作接口，用于创建和操作样式元素 */
  domAPI: DOMAPIFunction;
  
  /** 插入样式元素的具体实现函数 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * 样式标签转换函数类型
 * 将CSS内容转换为适合注入的格式
 */
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * 设置属性函数类型
 * 为样式元素设置必要的HTML属性
 */
type SetAttributesFunction = () => (styleElement: HTMLStyleElement) => void;

/**
 * 插入函数类型
 * 定义样式元素插入到DOM的具体位置和方式
 * @param selector - CSS选择器，指定插入位置（如 "head"）
 * @param options - 可选的插入配置
 */
type InsertFunction = (selector: string, options?: InsertOptions) => (styleElement: HTMLStyleElement) => void;

/**
 * 插入选项接口
 */
interface InsertOptions {
  /** 插入位置的附加配置 */
  [key: string]: unknown;
}

/**
 * DOM API函数类型
 * 提供样式元素的创建和更新接口
 */
type DOMAPIFunction = () => {
  update: (obj: CSSModule) => void;
  remove: () => void;
};

/**
 * 插入样式元素函数类型
 * 执行实际的样式元素插入操作
 */
type InsertStyleElementFunction = () => (styleElement: HTMLStyleElement) => void;

/**
 * CSS模块对象
 * 包含CSS内容、源映射等信息
 */
interface CSSModule {
  /** CSS内容 */
  css: string;
  
  /** 源映射（可选） */
  sourceMap?: string | object;
  
  /** 其他元数据 */
  [key: string]: unknown;
}

/**
 * CSS模块的本地类名映射
 * 键为源代码中的类名，值为编译后的实际类名
 */
interface CSSModuleLocals {
  readonly [className: string]: string;
}

/**
 * CSS模块导出对象
 * 可能包含locals属性和其他工具函数
 */
interface CSSModuleExport {
  /** 本地类名映射表 */
  locals?: CSSModuleLocals;
  
  /** 其他导出的工具函数或属性 */
  [key: string]: unknown;
}

/**
 * 默认导出：CSS模块的本地类名映射
 * 如果CSS模块包含类名映射则返回该映射，否则返回undefined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * 重新导出所有非默认导出
 * 包含CSS模块可能提供的其他工具函数
 */
export * from './css-module-utilities';