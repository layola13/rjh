/**
 * CSS模块加载器函数的类型定义
 * 用于在Webpack环境中加载CSS样式表
 */

/**
 * CSS加载器API接口
 * 定义了CSS模块系统所需的核心方法
 */
interface CSSLoaderAPI {
  /**
   * 推送CSS规则到样式表
   * @param rule - 包含模块ID和CSS内容的数组，格式为 [moduleId, cssContent, sourceMap?]
   */
  push(rule: [string | number, string, string?]): void;
}

/**
 * Webpack模块导出对象接口
 */
interface WebpackModuleExports {
  /** 模块导出对象 */
  exports: CSSLoaderAPI;
  /** 模块唯一标识符 */
  id: string | number;
}

/**
 * Webpack require函数接口
 * 用于动态加载其他模块
 */
interface WebpackRequire {
  /**
   * 加载指定模块
   * @param moduleId - 要加载的模块ID
   * @returns CSS加载器API实例
   */
  (moduleId: number): (sourceMap: boolean) => CSSLoaderAPI;
}

/**
 * CSS模块加载器函数
 * 
 * 此模块包含图片面板组件的样式定义，包括：
 * - 固定定位的根容器样式
 * - 浮动面板样式（白色背景、阴影、圆角）
 * - 面板头部样式（标题、按钮）
 * - 面板内容区域样式（Canvas容器）
 * - 小模式视图样式（400px高度，260x300px画布）
 * - 选择器容器样式
 * 
 * @param e - Webpack模块导出对象
 * @param t - 模块依赖（未使用）
 * @param n - Webpack require函数，用于加载CSS加载器
 */
declare function loadImagePanelStyles(
  e: WebpackModuleExports,
  t: unknown,
  n: WebpackRequire
): void;

/**
 * 图片面板CSS类名常量
 */
declare namespace ImagePanelStyles {
  /** 面板根容器类名 */
  const ROOT: '.image-panel-root';
  
  /** 面板主容器类名 */
  const PANEL: '.image-panel';
  
  /** 面板头部类名 */
  const HEADER: '.image-panel-header';
  
  /** 面板标题类名 */
  const TITLE: '.image-panel-title';
  
  /** 面板按钮类名 */
  const BUTTON: '.image-panel-button';
  
  /** 按钮文本类名 */
  const BUTTON_TEXT: '.image-panel-button-text';
  
  /** 面板内容区域类名 */
  const CONTENT: '.image-panel-content';
  
  /** Canvas容器类名 */
  const CANVAS_CONTAINER: '.image-panel-canvas-container';
  
  /** 小模式根容器类名 */
  const SMALL_MODE_ROOT: '.image-panel-small-mode-root';
  
  /** 大模式切换按钮类名 */
  const LARGE_MODE_BUTTON: '.image-panel-large-mode-button';
  
  /** 选择器容器类名 */
  const PICK_CONTAINER: '.image-panel-pick-container';
}

export { loadImagePanelStyles, ImagePanelStyles };