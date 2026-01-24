/**
 * JavaScript 对象原型上的不可枚举属性名称列表
 * 这些属性通常不会在 for...in 循环中被枚举，但它们存在于所有对象上
 * 
 * @module NonEnumerableProperties
 */

/**
 * 包含以下属性名称的数组：
 * - constructor: 创建对象的构造函数
 * - hasOwnProperty: 检查对象是否具有指定的自有属性
 * - isPrototypeOf: 检查对象是否存在于另一个对象的原型链中
 * - propertyIsEnumerable: 检查指定的属性是否可枚举
 * - toLocaleString: 返回对象的本地化字符串表示
 * - toString: 返回对象的字符串表示
 * - valueOf: 返回对象的原始值
 */
declare const nonEnumerableProperties: readonly [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];

export default nonEnumerableProperties;

/**
 * 对象原型属性名称的类型
 */
export type ObjectPrototypeProperty = typeof nonEnumerableProperties[number];