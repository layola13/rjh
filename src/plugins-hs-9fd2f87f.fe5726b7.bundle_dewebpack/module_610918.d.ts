/**
 * CSS模块加载器类型定义
 * 
 * 该模块用于在Webpack构建过程中加载和处理CSS样式文件。
 * 包含视图切换组件的样式定义，支持立方体切换按钮的常规和悬停状态。
 * 
 * @module CSSModuleLoader
 */

/**
 * Webpack模块导出函数类型
 * 
 * @param exports - 模块导出对象，用于存储模块的公共接口
 * @param module - 当前模块的引用对象
 * @param require - Webpack的模块加载函数
 */
declare function loadCSSModule(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * CSS模块导出接口
 * 
 * 定义了CSS加载器模块的导出结构
 */
interface CSSModuleExports {
  /**
   * CSS内容数组，包含模块ID和样式字符串
   */
  push(content: [string, string]): void;
}

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /**
   * 模块的唯一标识符
   */
  id: string;

  /**
   * 模块导出的内容
   */
  exports: CSSModuleExports;
}

/**
 * Webpack require函数类型
 * 
 * @param moduleId - 要加载的模块ID
 * @returns 返回CSS加载器实例
 */
type WebpackRequire = (moduleId: number) => CSSLoader;

/**
 * CSS加载器接口
 * 
 * 负责处理CSS文件的加载逻辑
 * 
 * @param sourceMap - 是否生成source map，false表示不生成
 * @returns 返回CSS加载器实例
 */
interface CSSLoader {
  (sourceMap: boolean): CSSModuleExports;
}

/**
 * DIY视图切换容器样式类名
 */
declare const DIY_VIEW_SWITCH_CONTAINER = "diy-viewswitch-container";

/**
 * 立方体切换按钮样式类名
 */
declare const CUBE_SWITCH = "cube-switch";

/**
 * 悬停状态立方体切换按钮样式类名
 */
declare const HOVER_CUBE_SWITCH = "hover-cube-switch";

/**
 * 悬停图片样式类名
 */
declare const HOVER_IMAGE = "hover-img";

/**
 * 样式规则常量定义
 */
declare const enum StyleConstants {
  /** 切换按钮宽度 */
  SWITCH_WIDTH = 20,
  
  /** 切换按钮高度 */
  SWITCH_HEIGHT = 20,
  
  /** 图标宽度 */
  ICON_WIDTH = 14,
  
  /** 图标高度 */
  ICON_HEIGHT = 14,
  
  /** 图标边距 */
  ICON_MARGIN = 3,
  
  /** 默认透明度 */
  DEFAULT_OPACITY = 0.5,
  
  /** 悬停状态透明度 */
  HOVER_OPACITY = 1,
  
  /** 圆角半径 */
  BORDER_RADIUS = 2
}

export { loadCSSModule as default };