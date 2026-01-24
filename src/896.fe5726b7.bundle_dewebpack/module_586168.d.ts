/**
 * CSS模块加载器类型定义
 * 描述Webpack CSS模块加载后的导出类型
 */

/**
 * CSS模块的类名映射对象
 * 键为CSS类名，值为经过处理后的实际类名（通常包含哈希值）
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS模块默认导出
 * 如果CSS模块包含locals（类名映射），则返回该映射对象
 * 否则返回undefined
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * 重新导出CSS模块中的所有命名导出
 * 通常用于导出CSS变量或其他非默认导出内容
 */
export * from './css-module-source';