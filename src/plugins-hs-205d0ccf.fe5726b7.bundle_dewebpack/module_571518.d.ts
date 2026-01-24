/**
 * CSS模块导出类型定义
 * 该模块为教学分页组件提供样式定义，支持明暗两种主题
 * @module TeachingPaginationStyles
 */

/**
 * Webpack模块加载器参数
 */
interface WebpackModuleParams {
  /** 模块导出对象 */
  exports: ModuleExports;
  /** 模块标识符 */
  id: string | number;
}

/**
 * 模块导出接口
 */
interface ModuleExports {
  /** CSS加载器推送方法 */
  push: (data: [string | number, string]) => void;
}

/**
 * CSS加载器工厂函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => {
  push: (data: [string | number, string]) => void;
};

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

/**
 * 教学分页样式模块加载函数
 * 
 * 该模块提供以下功能：
 * - 基础分页组件样式（固定高度22px，居中布局）
 * - 明亮主题（teaching-light）：浅色背景配色方案
 * - 暗黑主题（teaching-black）：深色背景配色方案
 * - 自定义输入框、图标、分页符样式
 * 
 * @param exports - 模块导出对象
 * @param moduleId - 当前模块唯一标识符
 * @param require - Webpack模块加载函数
 * 
 * @example
 * // Webpack会自动调用此函数加载样式
 * // 使用方式：在组件中import样式文件
 * import './teaching-pagination.css';
 */
declare function loadTeachingPaginationStyles(
  exports: WebpackModuleParams,
  moduleId: string | number,
  require: WebpackRequire
): void;

/**
 * CSS样式内容（已压缩格式）
 * 
 * 主要样式类：
 * - `.teaching-pagination` - 分页容器基础样式
 * - `.teaching-pagination.teaching-light` - 明亮主题变体
 * - `.teaching-pagination.teaching-black` - 暗黑主题变体
 * 
 * 颜色规范：
 * - Light主题：文字#60646f，边框#c3c6d1，输入框文字#33353b
 * - Black主题：文字#cccccd，边框rgba(234,236,241,0.2)，输入框文字#fff
 */
declare const cssContent: string;

export { loadTeachingPaginationStyles, WebpackModuleParams, ModuleExports, CSSLoaderFactory, WebpackRequire, cssContent };