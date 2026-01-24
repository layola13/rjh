/**
 * CSS模块加载器的类型定义
 * 用于Webpack环境中加载和处理CSS模块
 */

/**
 * CSS模块的样式类名映射
 * 键为源代码中的类名，值为经过CSS Modules处理后的唯一类名
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式加载器配置选项
 */
export interface StyleLoaderOptions {
  /**
   * 样式标签转换函数
   * 用于将CSS内容转换为DOM样式标签
   */
  styleTagTransform: () => void;

  /**
   * 设置样式元素属性的函数
   */
  setAttributes: () => void;

  /**
   * 插入样式元素到DOM的函数
   * @param target - 插入目标位置，如 "head"
   */
  insert: (target: string) => void;

  /**
   * DOM操作API接口
   */
  domAPI: () => void;

  /**
   * 插入样式元素的具体实现函数
   */
  insertStyleElement: () => void;
}

/**
 * CSS模块的默认导出
 * 包含经过处理的类名映射对象
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * 从CSS模块中重新导出的所有命名导出
 * 排除default导出
 */
export * from './css-module-source';