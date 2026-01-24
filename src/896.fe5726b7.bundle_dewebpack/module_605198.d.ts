/**
 * CSS模块加载器类型定义
 * @module CSSModuleLoader
 */

/**
 * Webpack模块上下文
 */
interface WebpackModuleContext {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出对象 */
  exports: any;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
type WebpackRequire = (moduleId: number) => any;

/**
 * CSS加载器push数组项
 */
type CSSLoaderItem = [
  /** 模块ID */
  id: string | number,
  /** CSS内容字符串 */
  content: string
];

/**
 * CSS加载器导出对象
 */
interface CSSLoaderExports {
  /** 
   * 添加CSS模块
   * @param item - CSS加载器项 [模块ID, CSS内容]
   */
  push(item: CSSLoaderItem): void;
}

/**
 * 图片URL处理函数类型
 * @param url - 图片模块ID或路径
 * @returns 处理后的图片URL字符串
 */
type ImageUrlResolver = (url: any) => string;

/**
 * 用户信息菜单CSS模块
 * 
 * 导出的CSS类包括：
 * - .user-info-menu-base: 基础用户信息菜单背景样式
 * - .user-info-menu-high: 高级用户信息菜单背景样式
 * - .user-vip: VIP用户样式（透明背景）
 * - .user-info-float-wrapper: 浮动包装器定位样式
 * - .user-info-float-drag: 可拖拽浮动样式
 * - .update-text: 更新文本缩放样式
 * 
 * @param moduleContext - Webpack模块上下文
 * @param exports - 模块导出对象
 * @param require - Webpack模块加载函数
 */
declare function cssModuleLoader(
  moduleContext: WebpackModuleContext,
  exports: any,
  require: WebpackRequire
): void;

/**
 * 模块依赖ID常量
 */
declare const enum ModuleDependencies {
  /** 图片URL处理器模块ID */
  IMAGE_URL_RESOLVER = 992716,
  /** CSS加载器模块ID */
  CSS_LOADER = 986380,
  /** 基础背景图片模块ID */
  BASE_BACKGROUND_IMAGE = 67711,
  /** 高级背景图片模块ID */
  HIGH_BACKGROUND_IMAGE = 422374
}

export {};