/**
 * CSS模块导出的类型定义
 * 该模块导出反馈对话框相关的CSS样式
 * @module FeedbackDialogStyles
 */

/**
 * Webpack模块加载器函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块导出对象
 */
type WebpackRequire = (moduleId: number) => any;

/**
 * CSS模块导出对象接口
 */
interface CSSModuleExports {
  /**
   * 将CSS规则推入样式数组
   * @param rule - CSS规则数组 [模块ID, CSS内容, 源映射?]
   */
  push(rule: [string, string, string?]): void;
}

/**
 * 反馈对话框CSS类名映射接口
 */
interface FeedbackDialogStyles {
  /** 反馈对话框容器包装器类名 */
  'feedback-dialog-wrapper': string;
  
  /** 反馈对话框标题类名 */
  'feedback-dialog-title': string;
  
  /** 反馈对话框按钮容器类名 */
  'feedback-dialog-btn': string;
  
  /** 不满意图标类名 */
  'not-satisfied-icon': string;
  
  /** 满意图标类名 */
  'satisfied-icon': string;
  
  /** 关闭按钮类名 */
  'close-btn': string;
}

/**
 * Webpack模块工厂函数
 * @param exports - 当前模块的导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数，用于加载其他模块
 */
declare function feedbackDialogStylesModule(
  exports: Record<string, any>,
  module: { id: string; exports: any },
  require: WebpackRequire
): void;

/**
 * 模块依赖项
 */
declare const dependencies: {
  /** 图像加载器模块ID: 992716 */
  readonly imageLoader: 992716;
  
  /** CSS加载器工厂模块ID: 986380 */
  readonly cssLoaderFactory: 986380;
  
  /** 不满意图标（默认状态）资源ID: 595012 */
  readonly notSatisfiedIconDefault: 595012;
  
  /** 满意图标（默认状态）资源ID: 588447 */
  readonly satisfiedIconDefault: 588447;
  
  /** 不满意图标（悬停状态）资源ID: 194992 */
  readonly notSatisfiedIconHover: 194992;
  
  /** 满意图标（悬停状态）资源ID: 941349 */
  readonly satisfiedIconHover: 941349;
};

export type { 
  FeedbackDialogStyles, 
  CSSModuleExports, 
  WebpackRequire 
};
export { feedbackDialogStylesModule, dependencies };