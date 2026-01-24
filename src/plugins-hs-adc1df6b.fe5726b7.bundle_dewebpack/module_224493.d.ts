/**
 * CSS模块类型定义
 * 用于描述CSS模块的导出接口和样式加载配置
 */

/**
 * CSS模块的本地类名映射
 * 键为CSS类名，值为经过模块化处理后的实际类名
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式插入配置选项
 */
export interface StyleInsertOptions {
  /** 样式标签转换函数 */
  styleTagTransform?: StyleTagTransformFunction;
  /** 设置样式标签属性的函数 */
  setAttributes?: SetAttributesFunction;
  /** 样式插入函数 */
  insert?: InsertFunction;
  /** DOM操作API */
  domAPI?: DOMAPIFunction;
  /** 插入样式元素的函数 */
  insertStyleElement?: InsertStyleElementFunction;
}

/**
 * 样式标签转换函数类型
 */
export type StyleTagTransformFunction = () => void;

/**
 * 设置元素属性函数类型
 */
export type SetAttributesFunction = () => void;

/**
 * 样式插入函数类型
 * @param target - 插入目标位置（如 "head" 或具体元素）
 */
export type InsertFunction = (target: string) => void;

/**
 * DOM API操作函数类型
 */
export type DOMAPIFunction = () => void;

/**
 * 插入样式元素函数类型
 */
export type InsertStyleElementFunction = () => void;

/**
 * CSS模块默认导出
 * 包含本地类名映射的对象，若无本地类名则为undefined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;