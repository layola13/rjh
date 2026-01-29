/**
 * CSS模块导出类型定义
 * @module CSSModuleExports
 * @description 定义CSS样式模块的导出结构，包含样式字符串数组和模块标识符
 */

/**
 * CSS加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块实例
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModule;

/**
 * CSS模块接口
 * @description 表示一个CSS模块实例，包含push方法用于添加样式规则
 */
interface CSSModule {
  /**
   * 添加CSS样式规则
   * @param rule - CSS规则元组 [模块ID, CSS内容字符串, 可选的source map]
   */
  push(rule: [string, string, string?]): void;
}

/**
 * Webpack模块导出参数接口
 */
interface WebpackModuleParams {
  /** 模块导出对象 */
  exports: CSSModule;
  /** 模块唯一标识符 */
  id: string;
}

/**
 * CSS样式内容常量
 * @description 包含guide-global组件的完整样式定义
 */
declare const CSS_CONTENT: string;

/**
 * 模块工厂函数类型定义
 * @param moduleExports - Webpack模块导出对象
 * @param moduleId - 当前模块ID
 * @param require - Webpack require函数，用于加载依赖模块
 */
declare function moduleFactory(
  moduleExports: WebpackModuleParams,
  moduleId: string,
  require: (id: number) => CSSLoaderFunction
): void;

/**
 * 样式规则接口
 * @description 描述单个CSS规则的结构
 */
interface StyleRule {
  /** 模块标识符 */
  readonly moduleId: string;
  /** CSS内容字符串 */
  readonly content: string;
  /** 可选的source map */
  readonly sourceMap?: string;
}

/**
 * 导出的样式模块
 * @description 通过CSS加载器(模块986380)处理后推送样式规则
 * @example
 *