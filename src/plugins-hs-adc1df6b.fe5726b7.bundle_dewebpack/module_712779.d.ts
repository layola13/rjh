/**
 * CSS模块加载器类型定义
 * 用于描述Webpack CSS模块的导出类型
 */

/**
 * CSS模块的类名映射接口
 * 键为CSS类名，值为处理后的类名字符串
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 默认导出：CSS模块的本地类名映射
 * 当CSS模块存在locals属性时返回类名映射，否则返回undefined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * 重新导出所有非default的命名导出
 * 通常包含CSS模块中定义的类名
 */
export * from './styles.module.css';