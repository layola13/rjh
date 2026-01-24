/**
 * Webpack CSS module loader export
 * @module CSSModuleExport
 * @description 该模块导出CSS样式字符串，用于动态注入样式表
 */

/**
 * CSS模块导出函数类型
 * @param sourceMap - 是否包含source map信息
 * @returns CSS加载器实例，提供push方法用于注册样式
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * CSS加载器接口
 * @description 负责管理和注入CSS样式到文档中
 */
interface CSSLoader {
  /**
   * 注册CSS模块
   * @param moduleInfo - 包含模块ID和CSS内容的元组
   */
  push(moduleInfo: [moduleId: string, cssContent: string]): void;
}

/**
 * Webpack模块导出对象
 */
interface WebpackModuleExports {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出内容 */
  exports: unknown;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出的内容
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

/**
 * 周期项样式模块
 * @description 定义了教学周期列表项的样式，支持亮色/暗色主题
 * 
 * @remarks
 * 该模块包含以下样式组件：
 * - `.period-item-wrapper .period-name`: 周期名称容器
 * - `.period-name .new-span`: "新"标签样式
 * - `.period-more`: "更多"按钮样式
 * - `.teaching-light`: 亮色主题变体
 * - `.teaching-black`: 暗色主题变体
 * 
 * @param exports - Webpack模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack模块加载函数
 */
declare module 'module_771859' {
  /**
   * 模块导出函数
   * @param exports - 模块导出对象
   * @param module - 当前模块引用
   * @param require - 模块加载器函数
   */
  export default function(
    exports: WebpackModuleExports,
    module: WebpackModuleExports,
    require: WebpackRequire
  ): void;
}

/**
 * CSS样式内容常量
 * @description 包含周期项组件的完整样式定义
 */
declare const CSS_CONTENT: string;

/**
 * 模块ID常量
 * @description 原始Webpack模块标识符
 */
declare const MODULE_ID = 771859;

/**
 * CSS加载器模块ID
 * @description 用于加载CSS的工具模块ID
 */
declare const CSS_LOADER_MODULE_ID = 986380;