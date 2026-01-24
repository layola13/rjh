/**
 * jQuery UI CSS Framework 1.11.4 类型定义
 * @see http://jqueryui.com
 * @license MIT
 * @see http://jquery.org/license
 * @see http://api.jqueryui.com/category/theming/
 */

/**
 * CSS 模块导出接口
 * 该模块导出 jQuery UI 的完整样式表内容
 */
export interface CSSModule {
  /**
   * CSS 模块的唯一标识符
   */
  readonly id: string | number;

  /**
   * 样式表内容数组
   * 第一个元素为 source map 标识（false 表示无 source map）
   * 第二个元素为样式表 ID
   * 第三个元素为 CSS 内容字符串
   */
  readonly content: readonly [boolean, string | number, string];
}

/**
 * Webpack CSS 加载器接口
 */
export interface CSSLoader {
  /**
   * 将 CSS 内容推送到样式表集合
   * @param cssModule - 包含模块 ID 和 CSS 内容的数组
   */
  push(cssModule: readonly [string | number, string]): void;
}

/**
 * 模块导出函数签名
 * @param hasSourceMap - 是否包含 source map
 * @returns CSS 加载器实例
 */
export type CSSLoaderFactory = (hasSourceMap: boolean) => CSSLoader;

/**
 * jQuery UI 主题类名常量
 */
export const enum JQueryUIClasses {
  /** 隐藏元素 */
  HelperHidden = 'ui-helper-hidden',
  
  /** 辅助功能隐藏（屏幕阅读器可访问） */
  HelperHiddenAccessible = 'ui-helper-hidden-accessible',
  
  /** 重置默认样式 */
  HelperReset = 'ui-helper-reset',
  
  /** 清除浮动 */
  HelperClearfix = 'ui-helper-clearfix',
  
  /** IE 修复层 */
  HelperZfix = 'ui-helper-zfix',
  
  /** 前景层（高 z-index） */
  Front = 'ui-front',
  
  /** 禁用状态 */
  StateDisabled = 'ui-state-disabled',
  
  /** 图标基类 */
  Icon = 'ui-icon',
  
  /** 遮罩层 */
  WidgetOverlay = 'ui-widget-overlay',
  
  /** 可拖拽手柄 */
  DraggableHandle = 'ui-draggable-handle',
  
  /** 可调整大小容器 */
  Resizable = 'ui-resizable',
  
  /** 可选择容器 */
  Selectable = 'ui-selectable',
  
  /** 可排序手柄 */
  SortableHandle = 'ui-sortable-handle',
  
  /** 手风琴组件 */
  Accordion = 'ui-accordion',
  
  /** 自动完成组件 */
  Autocomplete = 'ui-autocomplete',
  
  /** 按钮组件 */
  Button = 'ui-button',
  
  /** 日期选择器 */
  Datepicker = 'ui-datepicker',
  
  /** 对话框 */
  Dialog = 'ui-dialog',
  
  /** 菜单 */
  Menu = 'ui-menu',
  
  /** 进度条 */
  Progressbar = 'ui-progressbar',
  
  /** 选择菜单 */
  Selectmenu = 'ui-selectmenu',
  
  /** 滑块 */
  Slider = 'ui-slider',
  
  /** 数字调节器 */
  Spinner = 'ui-spinner',
  
  /** 选项卡 */
  Tabs = 'ui-tabs',
  
  /** 工具提示 */
  Tooltip = 'ui-tooltip'
}

/**
 * 模块导出声明
 * 该模块通过 Webpack 加载器注入 jQuery UI CSS 样式
 */
declare const cssModule: CSSModule;
export default cssModule;