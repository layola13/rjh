/**
 * 不可枚举的对象原型方法列表
 * 
 * 这些是 Object.prototype 上的标准方法，在某些 JavaScript 引擎中
 * 可能不会被 for...in 循环或 Object.keys() 枚举出来。
 * 
 * @remarks
 * 这个列表通常用于：
 * - 深拷贝/合并对象时需要特殊处理这些方法
 * - 遍历对象属性时需要检查这些保留名称
 * - polyfill 实现中确保原型链方法的正确性
 * 
 * @module NonEnumerableProperties
 */

/**
 * JavaScript 对象原型上的不可枚举方法名称数组
 */
declare const nonEnumerableProperties: readonly [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

export default nonEnumerableProperties;

/**
 * 不可枚举属性名称的联合类型
 */
export type NonEnumerablePropertyName =
  | 'constructor'
  | 'hasOwnProperty'
  | 'isPrototypeOf'
  | 'propertyIsEnumerable'
  | 'toLocaleString'
  | 'toString'
  | 'valueOf';