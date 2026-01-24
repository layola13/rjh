/**
 * CSS模块导出类型定义
 * 
 * 此模块包含用于收藏夹输入组件的样式定义。
 * 支持多种状态（成功、失败）和尺寸变体（默认、小尺寸）。
 * 
 * @module FavoriteInputStyles
 */

/**
 * Webpack CSS加载器推送函数参数类型
 */
interface CSSLoaderPushArgument {
  /** 模块唯一标识符 */
  id: string;
  /** CSS内容字符串 */
  content: string;
}

/**
 * Webpack CSS加载器返回类型
 */
interface CSSLoader {
  /**
   * 向CSS模块集合推送新的样式规则
   * 
   * @param args - 包含模块ID和CSS内容的元组
   * @returns void
   */
  push(args: [string, string]): void;
}

/**
 * Webpack模块导出对象
 */
interface ModuleExports {
  /** 导出的CSS加载器实例 */
  exports: CSSLoader;
  /** 当前模块ID */
  id: string;
}

/**
 * Webpack require函数类型
 * 
 * @param moduleId - 要加载的模块ID
 * @returns CSS加载器工厂函数
 */
type WebpackRequire = (moduleId: number) => (sourceMap: boolean) => CSSLoader;

/**
 * 模块工厂函数类型定义
 * 
 * @param moduleExports - Webpack模块导出对象
 * @param module - 模块元数据对象
 * @param require - Webpack模块加载函数
 * @returns void
 */
declare function moduleFactory(
  moduleExports: ModuleExports,
  module: unknown,
  require: WebpackRequire
): void;

/**
 * CSS类名映射接口
 * 
 * 定义了组件中使用的所有CSS类名
 */
export interface FavoriteInputStyleClasses {
  /** 输入框容器根元素 */
  'input-body': string;
  /** 收藏夹输入框元素 */
  'favorite-input': string;
  /** 图标包装器容器 */
  'iconWrapper': string;
  /** 图标元素 */
  'icon': string;
  /** 清除按钮图标 */
  'icon-clear': string;
  /** 错误提示文本 */
  'error-tips': string;
  /** 成功状态修饰符 */
  'success': string;
  /** 失败状态修饰符 */
  'failed': string;
  /** 小尺寸修饰符 */
  'small': string;
}

/**
 * 组件状态类型
 */
export type InputState = 'success' | 'failed' | 'default';

/**
 * 组件尺寸类型
 */
export type InputSize = 'default' | 'small';

/**
 * 样式主题配置接口
 */
export interface FavoriteInputTheme {
  /** 主文本颜色 */
  textColor: string;
  /** 主品牌色 */
  primaryColor: string;
  /** 主品牌色悬停状态 */
  primaryHoverColor: string;
  /** 错误状态颜色 */
  errorColor: string;
  /** 边框颜色 */
  borderColor: string;
  /** 占位符颜色 */
  placeholderColor: string;
  /** 背景颜色（聚焦状态） */
  focusBackgroundColor: string;
  /** 清除按钮背景色 */
  clearButtonBackground: string;
}

export default moduleFactory;