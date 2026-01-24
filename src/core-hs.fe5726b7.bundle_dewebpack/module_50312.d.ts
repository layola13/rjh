/**
 * DOM元素创建工具模块
 * 
 * 该模块提供了一个安全的DOM元素创建函数,用于在浏览器环境中创建HTML元素。
 * 在非浏览器环境或不支持document对象的环境中,返回空对象作为降级处理。
 * 
 * @module DOMElementCreator
 */

/**
 * 判断值是否为对象类型
 * @param value - 需要检查的值
 * @returns 如果值是对象类型返回true,否则返回false
 */
declare function isObject(value: unknown): value is object;

/**
 * 全局文档对象接口
 * 表示浏览器环境中的document对象
 */
interface GlobalDocument {
  /**
   * 创建指定标签名的HTML元素
   * @param tagName - HTML标签名称(如'div', 'span', 'a'等)
   * @returns 创建的HTML元素实例
   */
  createElement(tagName: string): HTMLElement;
}

/**
 * 全局对象接口
 * 表示浏览器环境中的全局对象(window)
 */
interface Global {
  /** 文档对象,用于操作DOM */
  document: GlobalDocument;
}

/**
 * 创建DOM元素的工厂函数
 * 
 * 该函数在支持DOM的环境中创建指定标签的HTML元素。
 * 如果当前环境不支持document对象(如Node.js环境),则返回一个空对象。
 * 
 * @param tagName - 要创建的HTML元素标签名
 * @returns 创建的HTML元素或空对象
 * 
 * @example
 *