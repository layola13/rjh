/**
 * Popover组件样式模块类型定义
 * 
 * 该模块导出popover弹出框组件的CSS样式
 * 支持多种定位方向、主题风格和交互状态
 */

/**
 * Webpack模块导出函数签名
 * 
 * @param exports - 模块导出对象
 * @param module - 模块元数据对象
 * @param require - 模块加载函数
 */
declare function popoverStyleModule(
  exports: ModuleExports,
  module: WebpackModule,
  require: RequireFunction
): void;

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 导出的CSS模块内容 */
  exports?: unknown;
  /** 模块唯一标识符 */
  id?: string | number;
}

/**
 * Webpack模块元数据接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: unknown;
}

/**
 * 模块加载函数类型
 * 
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块导出内容
 */
type RequireFunction = (moduleId: string | number) => unknown;

/**
 * CSS加载器接口
 * 用于处理CSS模块的推送和管理
 */
interface CSSLoader {
  /**
   * 推送CSS模块到样式系统
   * 
   * @param module - CSS模块数组，格式为 [模块ID, CSS内容]
   */
  push(module: [string | number, string]): void;
}

/**
 * Popover组件CSS类名常量
 */
declare const enum PopoverClassNames {
  /** 弹出框容器 */
  POPOVER_ITEM = 'hs-popover-item',
  
  /** 激活状态 */
  ACTIVE = 'hs-active',
  
  /** 弹出框内容区 */
  POPOVER_CONTEXT = 'hs-popover-context',
  
  /** 指示点 */
  POPOVER_DOT = 'hs-popover-dot',
  
  /** 关闭按钮 */
  POPOVER_REMOVE = 'hs-popover-remove',
  
  /** 重型弹出框（带更多内容） */
  POPOVER_HEAVY = 'hs-popover-heavy',
  
  /** 重型弹出框内容区 */
  POPOVER_CONTEXT_HEAVY = 'hs-popover-context-heavy',
  
  /** 箭头指示器 */
  POPOVER_CARET = 'hs-popover-caret',
  
  /** 深色主题 */
  POPOVER_DARKLY = 'hs-popover-darkly',
  
  /** 按钮容器 */
  POPOVER_BUTTON_CONTAINER = 'hs-popover-button-container',
  
  /** 确认按钮 */
  POPOVER_OK_BUTTON = 'hs-popover-ok-button',
  
  /** 取消按钮 */
  POPOVER_CANCEL_BUTTON = 'hs-popover-cancel-button',
}

/**
 * Popover定位方向类型
 */
type PopoverPosition =
  | 'top'      // 上方居中
  | 'topL'     // 上方左对齐
  | 'topR'     // 上方右对齐
  | 'bottom'   // 下方居中
  | 'bottomL'  // 下方左对齐
  | 'bottomR'  // 下方右对齐
  | 'left'     // 左侧居中
  | 'leftT'    // 左侧上对齐
  | 'leftB'    // 左侧下对齐
  | 'right'    // 右侧居中
  | 'rightT'   // 右侧上对齐
  | 'rightB';  // 右侧下对齐

/**
 * Popover主题颜色类型
 */
type PopoverTheme = 'light' | 'dark';

/**
 * Popover样式配置接口
 */
interface PopoverStyleConfig {
  /** Z-index层级 */
  zIndex?: number;
  
  /** 背景颜色 */
  backgroundColor?: string;
  
  /** 文字颜色 */
  color?: string;
  
  /** 边框圆角 */
  borderRadius?: string;
  
  /** 字体大小 */
  fontSize?: string;
  
  /** 字体粗细 */
  fontWeight?: number;
  
  /** 内边距 */
  padding?: string;
}

export default popoverStyleModule;
export type {
  ModuleExports,
  WebpackModule,
  RequireFunction,
  CSSLoader,
  PopoverPosition,
  PopoverTheme,
  PopoverStyleConfig,
};
export { PopoverClassNames };