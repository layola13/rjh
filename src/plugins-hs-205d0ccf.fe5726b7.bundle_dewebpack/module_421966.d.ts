/**
 * Webpack CSS模块类型定义
 * 该模块导出CSS样式表，包含用户引导组件的样式定义
 * @module UserGuideCSSModule
 */

/**
 * CSS加载器导出接口
 * 表示webpack css-loader的标准输出格式
 */
interface CSSLoaderExport {
  /**
   * CSS内容数组
   * 格式: [moduleId, cssContent, sourceMap?]
   */
  push(entry: [string, string, string?]): void;
  toString(): string;
  i(modules: any[], mediaQuery?: string): void;
}

/**
 * Webpack模块上下文
 * 用于require/import其他模块
 */
interface WebpackRequire {
  /**
   * 加载指定模块
   * @param moduleId - 模块ID
   * @returns 模块导出对象
   */
  (moduleId: number): any;
}

/**
 * Webpack模块导出对象
 */
interface WebpackModuleExports {
  /**
   * 模块默认导出或命名导出
   */
  exports?: any;
  
  /**
   * 模块唯一标识符
   */
  id?: string;
}

/**
 * 用户引导组件CSS模块工厂函数
 * 
 * 该模块定义了用户引导UI组件的完整样式系统，包括：
 * - 基础布局样式（padding、margin）
 * - 引导项容器样式（尺寸、圆角、背景）
 * - 文本样式（字体、倾斜效果）
 * - 图标定位与交互动画
 * - 浅色/深色主题适配
 * 
 * @param moduleExports - Webpack模块导出对象
 * @param __unused_webpack_module - 未使用的模块引用（webpack内部）
 * @param webpackRequire - Webpack模块加载函数
 * 
 * @example
 * // 生成的CSS类名：
 * // .user-guide - 容器
 * // .user-guide-item - 引导项
 * // .teaching-light - 浅色主题
 * // .teaching-black - 深色主题
 */
declare function userGuideCSSModuleFactory(
  moduleExports: WebpackModuleExports,
  __unused_webpack_module: any,
  webpackRequire: WebpackRequire
): void;

/**
 * CSS样式表内容导出
 * 包含用户引导组件的所有样式规则
 */
export type UserGuideStyles = CSSLoaderExport;

/**
 * 模块ID常量
 */
export const MODULE_ID = 421966;

/**
 * 依赖模块ID映射
 */
export const DEPENDENCIES = {
  /** URL/资源加载器模块 */
  URL_LOADER: 992716,
  /** CSS加载器工厂模块 */
  CSS_LOADER_FACTORY: 986380,
  /** 背景图片资源模块 */
  BACKGROUND_IMAGE: 651055
} as const;

export default userGuideCSSModuleFactory;