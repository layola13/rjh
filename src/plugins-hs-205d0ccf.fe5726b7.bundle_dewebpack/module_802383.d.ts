/**
 * CSS模块导出类型定义
 * @module module_802383
 * @description 定义失败卡片相关的样式模块类型
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - 模块加载函数
 */
type WebpackModuleFunction = (
  exports: WebpackModuleExports,
  module: WebpackModule,
  require: WebpackRequireFunction
) => void;

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: WebpackModuleExports;
}

/**
 * Webpack模块导出对象接口
 */
interface WebpackModuleExports {
  /** 添加CSS内容到导出数组 */
  push(content: [string | number, string]): void;
  [key: string]: unknown;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出对象
 */
type WebpackRequireFunction = (moduleId: number) => CssModuleLoader;

/**
 * CSS模块加载器接口
 * @description 用于处理CSS内容的加载器
 */
interface CssModuleLoader {
  /**
   * 创建CSS加载器实例
   * @param sourceMap - 是否生成source map
   * @returns CSS加载器实例
   */
  (sourceMap: boolean): CssModuleLoader;
  
  /**
   * 添加CSS规则到加载器
   * @param rule - CSS规则数组 [模块ID, CSS内容]
   */
  push(rule: [string | number, string]): void;
}

/**
 * 失败卡片样式模块
 * @description 包含失败状态卡片的所有CSS样式定义
 * 
 * 样式包括：
 * - .failed-card: 失败卡片容器样式
 * - .failed-card .card-label: 卡片标签覆盖层
 * - .failed-card .card-label .hs-iconfont-view: 图标样式
 * - .failed-card .hover-mask: 悬停遮罩层
 */
declare const moduleExports: WebpackModuleFunction;

export default moduleExports;

/**
 * CSS类名常量
 * @description 模块中定义的CSS类名
 */
export interface FailedCardStyles {
  /** 失败卡片容器类名 */
  'failed-card': string;
  /** 卡片标签类名 */
  'card-label': string;
  /** 图标视图类名 */
  'hs-iconfont-view': string;
  /** 悬停遮罩类名 */
  'hover-mask': string;
}

/**
 * CSS样式内容
 * @description 模块导出的完整CSS字符串
 */
export type CssContent = string;