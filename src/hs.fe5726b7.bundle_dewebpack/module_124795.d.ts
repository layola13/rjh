/**
 * CSS模块加载器的类型定义
 * 用于描述带有CSS模块的Webpack打包输出
 */

/**
 * CSS模块导出的类名映射
 * 键为原始类名，值为经过哈希处理后的唯一类名
 */
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * CSS模块的默认导出
 * 包含所有导出的CSS类名映射
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * 重导出所有命名导出（如果存在）
 * 通常用于导出CSS模块中定义的特定类名
 */
export * from './styles.module.css';