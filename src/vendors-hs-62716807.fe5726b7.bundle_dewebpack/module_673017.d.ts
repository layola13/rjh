/**
 * 检测当前 JavaScript 环境是否支持 Symbol.toStringTag 特性
 * 
 * Symbol.toStringTag 是 ES2015 引入的内置 Symbol，
 * 用于自定义对象的 Object.prototype.toString() 返回值。
 * 
 * 测试原理：
 * 1. 创建一个对象并设置其 [Symbol.toStringTag] 属性为 "z"
 * 2. 使用 String() 将对象转换为字符串
 * 3. 如果结果为 "[object z]"，说明环境支持此特性
 * 
 * @module SymbolToStringTagSupport
 * @example
 * // 在支持 Symbol.toStringTag 的环境中
 * const obj = {};
 * obj[Symbol.toStringTag] = "CustomType";
 * String(obj); // "[object CustomType]"
 */
declare const supportsSymbolToStringTag: boolean;

export = supportsSymbolToStringTag;