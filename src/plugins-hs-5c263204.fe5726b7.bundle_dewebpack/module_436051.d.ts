/**
 * Webpack样式加载器模块的类型定义
 * 
 * 此模块导出CSS样式，用于反馈对话框组件的样式定义
 * 
 * @module FeedbackDialogStyles
 */

/**
 * Webpack模块导出函数类型
 * 
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数，用于加载其他模块
 */
declare function styleLoader(
  exports: WebpackModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack模块导出对象
 */
interface WebpackModuleExports {
  /** 模块ID */
  id: string | number;
  /** 导出内容 */
  exports?: unknown;
}

/**
 * Webpack模块对象
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: unknown;
}

/**
 * Webpack require函数类型
 * 
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
interface WebpackRequire {
  (moduleId: number): CssLoader;
}

/**
 * CSS加载器返回类型
 * 包含push方法用于添加CSS规则
 */
interface CssLoader {
  /**
   * 添加CSS样式规则
   * 
   * @param useSourseMap - 是否使用源映射
   * @returns CSS加载器实例，支持链式调用
   */
  (useSourceMap: boolean): CssLoaderInstance;
}

/**
 * CSS加载器实例
 */
interface CssLoaderInstance {
  /**
   * 推送CSS样式数组到加载器
   * 
   * @param styles - CSS样式数组，包含模块ID、CSS内容和可选的源映射
   */
  push(styles: [string | number, string, string]): void;
}

/**
 * 反馈对话框CSS样式内容
 * 
 * 样式规则：
 * - .feedbackdialog .popupwindows: 最小宽度640px，z-index为10521
 * - .feedbackdialog .popupoverlay: z-index为10520（重要）
 */
declare const feedbackDialogStyles: string;

export { styleLoader as default, feedbackDialogStyles };