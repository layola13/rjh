/**
 * CSS模块导出的类型定义
 * 
 * 该模块为webpack打包的CSS样式表，包含反馈(feedback)模态框相关的样式定义
 * 
 * @module FeedbackModalStyles
 */

/**
 * Webpack模块导出函数类型
 * 
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param webpackRequire - webpack内部的require函数
 */
declare function module_238695(
  exports: WebpackModuleExports,
  require: WebpackRequire,
  webpackRequire: WebpackRequireFunction
): void;

/**
 * Webpack模块导出对象接口
 */
interface WebpackModuleExports {
  /** 模块ID */
  id: string | number;
  /** 模块导出内容 */
  exports: unknown;
}

/**
 * Webpack require函数类型
 */
interface WebpackRequire {
  /**
   * 加载指定ID的模块
   * @param moduleId - 模块ID
   * @returns 模块导出内容
   */
  (moduleId: number): unknown;
}

/**
 * Webpack内部require函数类型
 */
interface WebpackRequireFunction {
  /**
   * 加载指定ID的模块
   * @param moduleId - 模块ID
   * @returns 模块导出内容
   */
  (moduleId: number): CSSLoaderExport;
}

/**
 * CSS加载器导出接口
 * 
 * 由webpack的css-loader生成，用于处理CSS模块
 */
interface CSSLoaderExport {
  /**
   * 推送CSS内容到导出数组
   * 
   * @param content - CSS内容数组，包含模块ID和CSS字符串
   */
  push(content: [string | number, string]): void;
}

/**
 * 反馈模态框样式类名命名空间
 * 
 * 该模块定义了以下主要样式：
 * 
 * - `.homestyler-modal.feedback-modal-small` - 小尺寸反馈模态框（宽度600px）
 * - `.homestyler-modal.feedback-modal-black` - 黑色主题反馈模态框
 * - `.feedbackNotification` - 反馈通知组件（宽度298px）
 * 
 * 包含的子样式：
 * - 复选框和单选框布局（每行3列）
 * - 按钮样式（高度36px，内边距40px）
 * - 滚动条样式（宽度5px，半透明白色）
 * - 空状态样式
 * - 通知图标和文本布局
 */
declare namespace FeedbackModalStyles {
  /** 模态框容器类名 */
  const MODAL_CONTAINER: 'homestyler-ui-components.homestyler-modal-container';
  
  /** 小尺寸反馈模态框类名 */
  const FEEDBACK_MODAL_SMALL: 'feedback-modal-small';
  
  /** 黑色主题反馈模态框类名 */
  const FEEDBACK_MODAL_BLACK: 'feedback-modal-black';
  
  /** 反馈通知类名 */
  const FEEDBACK_NOTIFICATION: 'feedbackNotification';
  
  /** 模态框宽度（小尺寸） */
  const MODAL_WIDTH_SMALL: 600;
  
  /** 通知宽度 */
  const NOTIFICATION_WIDTH: 298;
  
  /** 按钮高度 */
  const BUTTON_HEIGHT: 36;
  
  /** 滚动条宽度 */
  const SCROLLBAR_WIDTH: 5;
}

export = module_238695;