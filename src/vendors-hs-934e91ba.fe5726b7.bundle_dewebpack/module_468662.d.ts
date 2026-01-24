/**
 * WeakMap类型定义模块
 * 
 * 该模块从lodash工具库中导入并重新导出原生JavaScript的WeakMap构造函数。
 * WeakMap是ES6引入的一种特殊的Map数据结构，它的键必须是对象，并且是弱引用的。
 * 
 * @module module_468662
 */

/**
 * WeakMap构造函数接口
 * 
 * WeakMap对象是一组键/值对的集合，其中的键是弱引用的对象，值可以是任意类型。
 * 键必须是对象，原始数据类型不能作为键。
 * 
 * 特性：
 * - 键是弱引用：当键对象没有其他引用时，会被垃圾回收
 * - 不可枚举：无法获取所有键的列表
 * - 键必须是对象类型
 * 
 * @template K - 键的类型，必须是对象类型（extends object）
 * @template V - 值的类型，可以是任意类型
 */
interface WeakMapConstructor {
  /**
   * WeakMap构造函数原型
   */
  readonly prototype: WeakMap<object, unknown>;

  /**
   * 创建一个新的WeakMap实例
   * 
   * @template K - 键的类型
   * @template V - 值的类型
   * @param entries - 可选的初始键值对数组
   * @returns 新创建的WeakMap实例
   */
  new <K extends object = object, V = unknown>(entries?: readonly (readonly [K, V])[] | null): WeakMap<K, V>;
}

/**
 * 导出的WeakMap构造函数
 * 
 * 这是从lodash内部工具函数中获取的原生WeakMap构造函数引用。
 * 如果环境不支持WeakMap，lodash会提供一个polyfill或返回undefined。
 * 
 * @type {WeakMapConstructor | undefined}
 */
declare const weakMapExport: WeakMapConstructor | undefined;

export = weakMapExport;