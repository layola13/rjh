/**
 * CSS样式模块加载器
 * 用于动态注入和管理CSS样式到页面的<head>标签中
 */

/**
 * 样式标签转换函数
 * 负责将CSS内容转换并注入到style标签中
 */
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * DOM API函数
 * 提供DOM操作的底层接口
 */
type DomAPIFunction = () => {
  insert: (styleElement: HTMLStyleElement) => void;
  remove: (styleElement: HTMLStyleElement) => void;
};

/**
 * 插入函数
 * 将样式元素插入到指定的DOM位置
 * @param position - 插入位置选择器（如 "head"）
 */
type InsertFunction = (position: string) => (styleElement: HTMLStyleElement) => void;

/**
 * 设置属性函数
 * 为样式元素设置自定义属性
 */
type SetAttributesFunction = () => (styleElement: HTMLStyleElement, attributes?: Record<string, string>) => void;

/**
 * 插入样式元素函数
 * 创建并返回新的style元素
 */
type InsertStyleElementFunction = () => (options: StyleOptions) => HTMLStyleElement;

/**
 * 样式配置选项
 */
interface StyleOptions {
  /** 样式标签转换处理函数 */
  styleTagTransform: ReturnType<StyleTagTransformFunction>;
  /** 设置元素属性的函数 */
  setAttributes: ReturnType<SetAttributesFunction>;
  /** 插入位置的函数（已绑定到"head"） */
  insert: (styleElement: HTMLStyleElement) => void;
  /** DOM操作API */
  domAPI: ReturnType<DomAPIFunction>;
  /** 创建样式元素的函数 */
  insertStyleElement: ReturnType<InsertStyleElementFunction>;
}

/**
 * CSS模块导出对象
 */
interface CSSModuleExports {
  /** CSS类名映射（CSS Modules生成的局部作用域类名） */
  locals?: Record<string, string>;
  /** 其他可能的导出属性 */
  [key: string]: unknown;
}

/**
 * 样式加载器模块
 * 导出CSS模块的局部类名映射，如果不存在则返回undefined
 */
declare const styleModule: CSSModuleExports['locals'] | undefined;

export default styleModule;

/**
 * 重新导出CSS模块中的所有命名导出（排除default）
 */
export * from './css-module';