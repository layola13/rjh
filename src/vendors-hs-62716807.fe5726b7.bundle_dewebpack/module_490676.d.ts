/**
 * 为构造函数添加 Symbol.species 支持
 * 
 * Symbol.species 是一个内置 symbol,允许子类在创建派生对象时覆盖默认的构造函数。
 * 此函数用于为指定的构造函数定义 species 访问器属性,使其返回自身。
 * 
 * @module DefineSpecies
 */

/**
 * 获取全局对象上指定属性的引用
 * @param propertyName - 要获取的全局属性名称
 * @returns 全局对象上的属性值
 */
declare function getBuiltin(propertyName: string): any;

/**
 * 在对象上定义属性
 * @param target - 目标对象
 * @param propertyKey - 属性键名
 * @param descriptor - 属性描述符
 */
declare function defineProperty(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void;

/**
 * 获取指定的 well-known symbol
 * @param symbolName - symbol 名称(如 'species', 'iterator' 等)
 * @returns 对应的 symbol 值
 */
declare function getWellKnownSymbol(symbolName: string): symbol;

/**
 * 检查描述符功能是否可用
 * 用于确定当前环境是否支持 Object.defineProperty 等特性
 */
declare const descriptorsSupported: boolean;

/**
 * 为构造函数定义 Symbol.species 访问器
 * 
 * 此函数在支持属性描述符的环境中,为指定构造函数的原型添加 Symbol.species getter。
 * getter 返回构造函数自身(this),允许派生类在创建实例时使用正确的构造函数。
 * 
 * @param constructorName - 构造函数的名称(如 'Array', 'Map', 'Set' 等)
 * 
 * @example
 *