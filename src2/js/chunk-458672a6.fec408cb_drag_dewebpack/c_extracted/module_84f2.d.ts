/**
 * 空模块导出
 * 该模块不包含任何导出内容，可能用作占位符或被其他模块动态填充
 * 
 * @module EmptyModule
 */

/**
 * 空对象类型定义
 * 表示一个不包含任何属性的对象
 */
export type EmptyExport = Record<string, never>;

/**
 * 默认导出一个空对象
 */
declare const emptyModule: EmptyExport;

export default emptyModule;