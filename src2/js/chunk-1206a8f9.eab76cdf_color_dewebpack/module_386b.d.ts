/**
 * HTML标签创建辅助函数类型定义
 * 用于向String.prototype添加HTML标签包装方法（如anchor、bold、link等）
 * @module StringHTMLMethods
 */

/**
 * 创建HTML标签包装字符串的函数
 * @param value - 要包装的字符串内容
 * @param tag - HTML标签名称（如'a', 'b', 'i'等）
 * @param attribute - 可选的HTML属性名（如'name', 'href'等）
 * @param attributeValue - 属性对应的值
 * @returns 完整的HTML标签字符串
 * @example
 * createHTMLTag('text', 'a', 'href', 'url') // '<a href="url">text</a>'
 */
declare function createHTMLTag(
  value: unknown,
  tag: string,
  attribute: string,
  attributeValue: unknown
): string;

/**
 * 字符串HTML方法工厂函数
 * 用于创建并导出String原型方法，如anchor()、bold()、link()等
 * @param methodName - 要添加到String.prototype的方法名
 * @param tagBuilder - 构建HTML标签的函数，接收createHTMLTag函数作为参数
 * @example
 * export default function('bold', (create) => function() {
 *   return create(this, 'b', '', '');
 * });
 */
declare function stringHTMLMethodExporter(
  methodName: string,
  tagBuilder: (createTag: typeof createHTMLTag) => Function
): void;

export default stringHTMLMethodExporter;

/**
 * @internal
 * 内部使用的类型定义
 */
interface StringMethodDescriptor {
  /** String原型方法名 */
  [methodName: string]: Function;
}

/**
 * @internal
 * 导出选项标志（来自依赖模块5ca1）
 */
interface ExportFlags {
  /** Prototype方法 */
  P: number;
  /** 强制导出标志（用于修复浏览器bug） */
  F: number;
}