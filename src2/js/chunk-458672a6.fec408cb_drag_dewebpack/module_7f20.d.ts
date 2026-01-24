/**
 * 为对象设置 toStringTag 符号属性
 * 
 * 该模块用于在对象或其原型上定义 Symbol.toStringTag 属性，
 * 用于自定义 Object.prototype.toString.call() 的返回值
 * 
 * @module SetToStringTag
 * @dependencies
 *   - Object.defineProperty wrapper (86cc)
 *   - hasOwnProperty utility (69a8)  
 *   - Well-known symbols registry (2b4c)
 */

/**
 * 为指定对象设置 toStringTag 属性
 * 
 * @param target - 目标对象或构造函数
 * @param tag - 要设置的标签字符串值
 * @param usePrototype - 是否直接在目标对象上设置（true）还是在其原型上设置（false，默认）
 * 
 * @example
 *