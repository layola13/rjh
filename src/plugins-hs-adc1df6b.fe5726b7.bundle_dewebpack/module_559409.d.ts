/**
 * CSS模块加载器的类型定义
 * 用于Webpack CSS Modules的样式导出
 */

/**
 * CSS模块导出的类名映射
 * 键为源代码中的类名，值为经过hash处理后的实际类名
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * 默认导出：CSS模块的类名映射对象
 * 如果模块包含locals（类名映射），则返回该映射，否则返回undefined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * 重新导出所有命名导出（排除default）
 * 通常用于导出CSS模块的特定类名
 */
export * from './original-css-module';