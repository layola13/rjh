/**
 * DOM元素创建工具模块
 * 提供跨环境安全的DOM元素创建功能
 */

/**
 * 检查值是否为对象类型
 * @param value - 要检查的值
 * @returns 如果值是对象则返回true，否则返回false
 */
declare function isObject(value: unknown): value is object;

/**
 * 全局document对象引用
 */
declare const document: Document | undefined;

/**
 * 创建DOM元素的工厂函数
 * 在支持DOM的环境中创建真实元素，否则返回空对象
 * 
 * @param tagName - HTML标签名称（如'div', 'span'等）
 * @returns 创建的DOM元素或空对象
 * 
 * @example
 *