/**
 * CSS模块加载器类型定义
 * 用于处理CSS模块的样式注入和类名映射
 */

/**
 * 样式插入选项配置
 */
interface StyleLoaderOptions {
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
   * 插入样式到指定位置的函数
   * @param target - 目标DOM节点选择器（如 "head"）
   */
  insert: (target: string) => void;

  /**
   * DOM操作API
   */
  domAPI: () => void;

  /**
   * 插入样式元素的函数
   */
  insertStyleElement: () => void;
}

/**
 * CSS模块导出的类名映射
 * 键为CSS类名，值为经过处理后的唯一类名
 */
type CSSModuleClasses = Record<string, string>;

/**
 * CSS模块默认导出
 * 包含所有CSS类名的映射对象
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * 重导出所有非默认的CSS模块成员
 */
export * from './710749';