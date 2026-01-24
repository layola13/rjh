/**
 * CSS模块导出类型定义
 * 该模块导出视图下拉组件的CSS样式
 * @module ViewDropdownStyles
 */

/**
 * Webpack模块参数类型
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出对象 */
  exports: CSSModuleExports;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出的内容
 */
type WebpackRequire = (moduleId: number) => unknown;

/**
 * CSS模块导出接口
 */
interface CSSModuleExports {
  /**
   * 添加CSS规则到样式表
   * @param rule - CSS规则数组 [模块ID, CSS内容, sourceMap等]
   */
  push(rule: [string | number, string, ...unknown[]]): void;
}

/**
 * CSS加载器辅助函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块导出对象
 */
type CSSLoaderHelper = (sourceMap: boolean) => CSSModuleExports;

/**
 * 图片资源加载器函数类型
 * @param resource - 资源模块引用
 * @returns 处理后的资源URL字符串
 */
type ResourceLoader = (resource: unknown) => string;

/**
 * 视图下拉组件样式模块
 * 
 * 包含的CSS类：
 * - `.viewdrop`: 下拉容器（相对定位）
 * - `.viewdrop .hide`: 隐藏状态
 * - `.viewdiv`: 视图容器
 * - `.viewdiv .viewbutton`: 按钮样式
 * - `.viewdiv .viewp`: 段落样式
 * - `.viewdiv .viewp .viewspan`: 内联文本
 * - `.viewdiv .viewp .viewright`: 右侧区域
 * - `.viewdiv .viewp .viewright .viewcaret`: 下拉箭头
 * - `.viewul`: 下拉列表容器（绝对定位）
 * - `.viewul .viewli`: 列表项
 * - `.viewul .viewli:hover`: 列表项悬停状态
 * - `.viewul .viewli .viewsel`: 选中标记图标
 * 
 * @param module - Webpack模块对象
 * @param exports - 模块导出对象
 * @param require - Webpack require函数
 */
declare function viewDropdownStylesModule(
  module: WebpackModule,
  exports: unknown,
  require: WebpackRequire
): void;

/**
 * 模块依赖引用
 */
declare const CSS_LOADER_MODULE_ID = 992716;
declare const SOURCE_MAP_HELPER_MODULE_ID = 986380;
declare const CHECK_ICON_RESOURCE_MODULE_ID = 505693;

export default viewDropdownStylesModule;
export type {
  WebpackModule,
  WebpackRequire,
  CSSModuleExports,
  CSSLoaderHelper,
  ResourceLoader
};