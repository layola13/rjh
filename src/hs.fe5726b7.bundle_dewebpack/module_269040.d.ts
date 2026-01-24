/**
 * CSS模块加载器类型定义
 * 该模块用于处理CSS模块的加载和样式注入
 */

/**
 * 样式加载器配置选项
 */
interface StyleLoaderOptions {
  /** 样式标签转换函数 */
  styleTagTransform: StyleTagTransformFunction;
  
  /** 设置DOM元素属性的函数 */
  setAttributes: SetAttributesFunction;
  
  /** 将样式插入到指定位置的函数 */
  insert: InsertFunction;
  
  /** DOM操作API */
  domAPI: DOMAPIFunction;
  
  /** 插入样式元素的函数 */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * 样式标签转换函数类型
 */
type StyleTagTransformFunction = () => void;

/**
 * 设置元素属性函数类型
 */
type SetAttributesFunction = () => void;

/**
 * 样式插入函数类型
 * @param target - 插入目标位置（如 "head"）
 */
type InsertFunction = (target: string) => void;

/**
 * DOM API函数类型
 */
type DOMAPIFunction = () => void;

/**
 * 插入样式元素函数类型
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS模块的locals对象类型
 * 包含CSS类名映射
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS模块对象类型
 */
interface CSSModule {
  /** CSS类名映射对象 */
  locals?: CSSModuleLocals;
}

/**
 * 模块默认导出
 * CSS模块的locals对象，如果不存在则返回undefined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * 重新导出CSS模块中的所有命名导出
 */
export * from './style-module';