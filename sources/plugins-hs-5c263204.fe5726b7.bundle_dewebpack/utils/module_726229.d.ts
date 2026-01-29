/**
 * Webpack模块导出的CSS样式表类型定义
 * @module StylesheetModule
 * @description 该模块导出一个CSS样式表，包含showGroupListPanel组件的所有样式规则
 */

/**
 * CSS模块加载器函数类型
 * @param sourceMap - 是否生成source map，false表示不生成
 * @returns CSS模块实例，包含push方法用于添加样式内容
 */
type CSSModuleLoader = (sourceMap: boolean) => CSSModule;

/**
 * CSS模块实例接口
 * @description 提供push方法用于注册CSS内容到样式系统
 */
interface CSSModule {
  /**
   * 将CSS样式内容推送到模块系统
   * @param content - 包含模块ID和CSS字符串的元组
   * @returns void
   */
  push(content: [moduleId: string, cssContent: string]): void;
}

/**
 * Webpack模块导出函数签名
 * @param exports - 当前模块的导出对象
 * @param module - 当前模块对象，包含id等元数据
 * @param require - Webpack的require函数，用于加载其他模块
 * @returns void
 * 
 * @description
 * 该模块定义了showGroupListPanel组件的完整样式表，包括：
 * - .selectedItem: 选中项样式（272px宽，30px高，灰色文本）
 * - .grouplistItems: 组列表容器（顶部边距56px）
 * - .favGroup_panel: 收藏组面板（270px宽，带边框和滚动条）
 * - .allGroup: 所有组列表项样式（字体、颜色、输入框、图标等）
 * - 状态类: .editing（编辑中）、.editok（编辑完成）、.redBorder（错误边框）
 * - 显示控制类: .hidden（隐藏）、.show（显示）
 */
type WebpackModuleFactory = (
  exports: Record<string, unknown>,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出内容 */
  exports: Record<string, unknown>;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID（如986380为CSS加载器模块）
 * @returns 加载的模块导出内容
 */
type WebpackRequire = (moduleId: number) => CSSModuleLoader;

/**
 * 样式表内容常量
 * @description showGroupListPanel组件的完整CSS规则集，包含：
 * - 选中项样式定义
 * - 组列表面板布局
 * - 滚动容器样式（最大高度105px）
 * - 添加组功能样式
 * - 列表项交互状态（hover、editing、editok）
 * - 图标和输入框样式
 */
declare const CSS_CONTENT: string;

/**
 * 模块ID常量
 * @description 当前模块的唯一标识符
 */
declare const MODULE_ID: "726229";

/**
 * CSS加载器模块ID
 * @description 引用的CSS加载器模块标识符
 */
declare const CSS_LOADER_MODULE_ID: 986380;

export type { 
  WebpackModuleFactory, 
  WebpackModule, 
  WebpackRequire, 
  CSSModule, 
  CSSModuleLoader 
};
export { CSS_CONTENT, MODULE_ID, CSS_LOADER_MODULE_ID };