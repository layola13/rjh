/**
 * CSS模块类型定义
 * 用于导出CSS模块的类名映射和样式注入功能
 */

/**
 * CSS类名映射接口
 * 定义CSS模块中的类名到编译后类名的映射关系
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * 样式注入配置接口
 * 配置样式如何被注入到DOM中
 */
export interface StyleInjectionOptions {
  /**
   * 样式标签转换函数
   * 用于处理样式内容的转换逻辑
   */
  styleTagTransform: () => void;
  
  /**
   * 设置DOM元素属性的函数
   * 用于为注入的style标签设置自定义属性
   */
  setAttributes: () => void;
  
  /**
   * 插入函数
   * 指定样式标签插入到哪个DOM元素中
   * @param target - 目标元素选择器，如 "head"
   */
  insert: (target: string) => void;
  
  /**
   * DOM API函数
   * 提供操作DOM的底层API
   */
  domAPI: () => void;
  
  /**
   * 插入样式元素的函数
   * 创建并插入style元素到文档中
   */
  insertStyleElement: () => void;
}

/**
 * CSS模块导出接口
 * 包含locals属性的CSS模块对象
 */
export interface CSSModule {
  /**
   * CSS类名映射对象
   * 将源代码中的类名映射到编译后的唯一类名
   */
  locals?: CSSModuleClasses;
}

/**
 * 默认导出
 * CSS模块的类名映射对象，如果不存在则为undefined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * 重新导出CSS模块的所有命名导出
 * 允许通过命名导入访问各个类名
 */
export * from './css-module-source';