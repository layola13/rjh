/**
 * CSS模块加载器的类型定义
 * 用于描述CSS Modules导出的类名映射对象
 */

/**
 * CSS模块导出的类名映射类型
 * 键为CSS中定义的类名，值为经过处理后的实际类名（通常包含hash）
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * CSS模块的默认导出
 * 如果CSS模块包含locals（类名映射），则返回该映射对象；否则返回undefined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * 重新导出所有非default的命名导出
 * 允许直接导入特定的类名，例如: import { className } from './styles.css'
 */
export * from './styles';