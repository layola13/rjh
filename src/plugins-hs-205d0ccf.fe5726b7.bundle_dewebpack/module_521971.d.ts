/**
 * CSS模块导出类型定义
 * Module: module_521971
 * Original ID: 521971
 * 
 * 该模块导出状态栏浮动组件的CSS样式
 */

/**
 * Webpack CSS加载器导出的样式数组项
 * [moduleId, cssContent, sourceMap?]
 */
type CSSModuleExport = [string, string, unknown?];

/**
 * CSS加载器函数类型
 * @param sourceMap - 是否包含源映射
 * @returns CSS模块导出对象，包含push方法用于添加样式
 */
type CSSLoaderFunction = (sourceMap: boolean) => {
  push: (item: CSSModuleExport) => void;
};

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
 * @returns 加载的模块导出内容
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * 状态栏浮动组件样式类名
 */
export interface StatusBarFloatRightStyles {
  /** 状态栏右侧浮动容器主类名 */
  'statusbar-float-right': string;
  /** 状态栏新功能提示点类名 */
  'statusbar-new-func-dot': string;
}

/**
 * 模块工厂函数
 * @param moduleExports - Webpack模块导出对象
 * @param _exports - 未使用的导出参数（保留用于兼容）
 * @param webpackRequire - Webpack内部require函数
 */
declare function moduleFactory(
  moduleExports: WebpackModuleExports,
  _exports: unknown,
  webpackRequire: WebpackRequire
): void;

export default moduleFactory;