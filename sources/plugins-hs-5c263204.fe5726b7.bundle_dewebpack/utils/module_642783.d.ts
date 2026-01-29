/**
 * CSS 样式模块的类型定义
 * 用于反馈列表模态框的样式导出
 * 
 * @module FeedbackListModalStyles
 * @description 该模块导出了反馈列表模态框组件的CSS样式内容，
 * 包含了模态框容器、列表项、分页等UI元素的样式定义
 */

/**
 * CSS 模块加载器返回值类型
 * @description 表示通过 css-loader 处理后的模块导出结构
 */
interface CSSModuleExports {
  /**
   * CSS 内容数组
   * @description 包含模块ID和CSS字符串的元组数组
   */
  push(entry: [moduleId: string, cssContent: string]): void;
}

/**
 * Webpack 模块上下文参数
 */
interface WebpackModuleParams {
  /** 当前模块的导出对象 */
  exports: {
    /** 模块ID，用于CSS模块标识 */
    id: string;
  };
  /** 模块对象本身 */
  module: unknown;
  /** Webpack require 函数，用于加载其他模块 */
  require: (moduleId: number) => CSSModuleExports | ((sourceMap: boolean) => CSSModuleExports);
}

/**
 * CSS 样式内容常量
 * @description 反馈列表模态框的完整CSS样式定义
 */
declare const FEEDBACK_LIST_MODAL_STYLES: string;

/**
 * 模块导出函数类型
 * @description 该模块通过 css-loader (模块ID: 986380) 处理CSS内容并导出
 * 
 * @param exports - 模块导出对象
 * @param module - 模块对象
 * @param require - Webpack require函数
 * 
 * @example
 *