/**
 * CSS模块加载器的类型定义
 * 用于导出CSS样式字符串数组
 * @module CSSModuleLoader
 */

/**
 * Webpack CSS加载器模块导出函数
 * @param exports - 模块导出对象
 * @param require - 模块require函数
 * @param cssLoaderAPI - CSS加载器API函数
 */
export default function (
  exports: CSSModuleExports,
  require: RequireFunction,
  cssLoaderAPI: CSSLoaderAPIFunction
): void;

/**
 * CSS模块导出对象接口
 */
interface CSSModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  
  /** 
   * CSS加载器返回的对象，包含push方法用于添加CSS内容
   */
  exports: CSSLoader;
}

/**
 * CSS加载器接口
 */
interface CSSLoader {
  /**
   * 添加CSS内容到加载器
   * @param entry - CSS条目数组，格式为 [模块ID, CSS内容字符串, source map标识]
   */
  push(entry: [string | number, string, string?]): void;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
type RequireFunction = (moduleId: number) => unknown;

/**
 * CSS加载器API函数类型
 * @param sourceMap - 是否启用source map
 * @returns CSS加载器实例
 */
type CSSLoaderAPIFunction = (sourceMap: boolean) => CSSLoader;

/**
 * CSS类名映射（如果使用CSS Modules）
 */
export interface PropertyBarMultiselectButtonStyles {
  /** 多选按钮容器的根类名 */
  'property-bar-multiselectbutton': string;
  
  /** 多选按钮组件类名 */
  'property-bar-multiselectbutton-button': string;
  
  /** 下拉按钮左侧区域类名 */
  'dropdownBtnLeft': string;
}