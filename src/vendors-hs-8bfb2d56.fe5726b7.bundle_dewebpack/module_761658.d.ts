/**
 * CSS Modules类型声明
 * 该模块导出CSS样式类名的类型定义
 */

/**
 * CSS模块的局部类名映射
 * 键为CSS类名，值为经过处理后的唯一类名字符串
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式注入配置选项
 */
export interface StyleInjectionOptions {
  /**
   * 样式标签转换函数
   * 用于处理样式内容的转换逻辑
   */
  styleTagTransform: () => void;

  /**
   * 设置DOM属性的函数
   * 用于为注入的style标签设置自定义属性
   */
  setAttributes: () => void;

  /**
   * 插入函数
   * 指定样式标签插入的DOM位置（如"head"）
   */
  insert: (target: string) => void;

  /**
   * DOM操作API
   * 提供底层DOM操作接口
   */
  domAPI: () => void;

  /**
   * 插入样式元素的函数
   * 负责创建并插入style元素到DOM
   */
  insertStyleElement: () => void;
}

/**
 * CSS模块导出
 * 包含局部类名映射，如果模块存在则返回类名对象，否则返回undefined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * 从CSS模块重新导出的所有命名导出
 * 允许直接导入特定的类名
 */
export * from './style-loader-module';