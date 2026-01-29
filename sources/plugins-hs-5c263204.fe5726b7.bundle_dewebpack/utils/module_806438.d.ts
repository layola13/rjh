/**
 * CSS模块加载器类型定义
 * 此模块负责处理CSS样式的动态加载和注入
 * @module CSSStyleLoader
 */

/**
 * 样式加载器配置选项
 */
export interface StyleLoaderOptions {
  /**
   * 样式标签转换函数
   * 用于转换和处理样式内容
   */
  styleTagTransform: () => void;

  /**
   * 设置DOM元素属性的函数
   */
  setAttributes: () => void;

  /**
   * 插入函数，指定样式插入位置
   * @param target - 目标元素选择器，默认为 "head"
   */
  insert: (target: string) => void;

  /**
   * DOM API 操作接口
   */
  domAPI: () => void;

  /**
   * 插入样式元素的函数
   */
  insertStyleElement: () => void;
}

/**
 * CSS模块导出的本地类名映射
 * 键为CSS类名，值为经过处理后的实际类名
 */
export type CSSModuleLocals = Record<string, string> | undefined;

/**
 * 默认导出：CSS模块的本地类名映射
 * 当CSS模块存在且包含locals属性时返回locals，否则返回undefined
 */
declare const cssModuleExports: CSSModuleLocals;

export default cssModuleExports;

/**
 * 从依赖模块重新导出的所有命名导出
 * 排除了 "default" 导出
 */
export * from './css-module-source';