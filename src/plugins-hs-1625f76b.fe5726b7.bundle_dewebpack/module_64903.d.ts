/**
 * CSS 模块导出的类型定义
 * 该模块包含佣金切换组件的样式定义
 */

/**
 * CSS 类名映射接口
 * 定义了所有可用的 CSS 类名
 */
export interface CommissionToggleStyles {
  /** 佣金切换容器的根元素样式 */
  'toggle-commission-container': string;
  
  /** 佣金切换栏的样式 */
  'toggle-commission-bar': string;
  
  /** 佣金栏包装器样式 */
  'cm-bar-wrapper': string;
  
  /** 佣金栏图标样式 */
  'cm-bar-icon': string;
  
  /** 佣金栏消息文本样式 */
  'cm-bar-msg': string;
  
  /** 佣金栏工具提示样式 */
  'cm-bar-tooltip': string;
  
  /** 工具提示中的链接样式 */
  'cm-bar-tooltip-link': string;
  
  /** 佣金下载模态框包装器样式 */
  'commission-download-modal-wrapper': string;
  
  /** 网格查看器产品下载副标题样式 */
  'grid-viewer-product-download-sub-title': string;
  
  /** 佣金栏模态框样式 */
  'commission-bar-modal': string;
  
  /** Homestyler 模态框内容包装器样式 */
  'homestyler-modal-content-wrapper-content': string;
  
  /** Homestyler UI 组件通用样式 */
  'homestyler-ui-components': string;
  
  /** Homestyler 弹出框项样式 */
  'homestyler-popover-item': string;
  
  /** 佣金栏新版工具提示样式 */
  'commission-bar-new-tooltip': string;
  
  /** 工具提示区域样式 */
  'tool-tip-area': string;
  
  /** 工具提示标题包装器样式 */
  'tool-tip-title-wrapper': string;
  
  /** 工具提示标题样式 */
  'tool-tip-title': string;
  
  /** Homestyler 弹出框箭头样式 */
  'homestyler-popover-caret': string;
  
  /** Homestyler 弹出框内容样式 */
  'homestyler-popover-content': string;
}

/**
 * Webpack 模块加载器参数接口
 */
export interface WebpackModuleParams {
  /** 模块导出对象 */
  exports: {
    /** 模块 ID */
    id: string | number;
  };
  
  /** 模块对象本身 */
  module: unknown;
  
  /** Webpack require 函数 */
  __webpack_require__: (moduleId: string | number) => unknown;
}

/**
 * CSS 加载器推送数组类型
 * [模块ID, CSS内容字符串]
 */
export type CSSLoaderPushArray = [string | number, string];

/**
 * CSS 加载器函数类型
 */
export interface CSSLoader {
  /**
   * 推送 CSS 内容到加载器
   * @param content - CSS 内容数组
   */
  push(content: CSSLoaderPushArray): void;
}

/**
 * 模块工厂函数类型定义
 * @param module - 模块导出对象
 * @param exports - 导出对象
 * @param require - Webpack require 函数
 */
export type ModuleFactory = (
  module: WebpackModuleParams['module'],
  exports: WebpackModuleParams['exports'],
  require: WebpackModuleParams['__webpack_require__']
) => void;

/**
 * 默认导出：CSS 样式类名映射
 */
declare const styles: CommissionToggleStyles;
export default styles;