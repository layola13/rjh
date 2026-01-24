/**
 * String.prototype.startsWith 的 Polyfill 模块
 * 
 * 为不支持原生 startsWith 方法的环境提供兼容实现。
 * 检查字符串是否以指定的子字符串开头。
 * 
 * @module StringStartsWith
 */

/**
 * startsWith 方法的配置选项
 */
interface StartsWithOptions {
  /** 搜索起始位置，默认为 0 */
  position?: number;
}

/**
 * String 原型扩展声明
 */
declare global {
  interface String {
    /**
     * 判断字符串是否以指定的子字符串开头
     * 
     * @param searchString - 要搜索的子字符串
     * @param position - 可选的起始位置，默认为 0
     * @returns 如果字符串以 searchString 开头则返回 true，否则返回 false
     * 
     * @example
     *