/**
 * CSS模块加载器类型定义
 * 用于Webpack CSS Modules的类型声明
 */

/**
 * CSS模块导出的类名映射
 * 键为CSS类名，值为经过hash处理后的实际类名
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * 默认导出：CSS模块的类名映射对象
 * 如果CSS模块存在locals属性则返回该对象，否则返回undefined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * 重新导出CSS模块中的所有命名导出
 * 排除default导出
 */
export * from './style-module';