/**
 * 为构造函数添加 Symbol.species 访问器的工具模块
 * 
 * 该模块用于确保构造函数正确实现 Symbol.species 属性，
 * 使得派生类可以正确地创建父类的实例。
 */

/**
 * 获取全局对象上指定属性的函数类型
 */
type GetBuiltIn = (name: string) => any;

/**
 * 定义对象属性的函数类型
 */
type DefineProperty = (
  target: object,
  propertyKey: PropertyKey,
  attributes: PropertyDescriptor
) => void;

/**
 * 获取内置 Symbol 的函数类型
 */
type GetWellKnownSymbol = (name: string) => symbol;

/**
 * 检测描述符支持的函数类型
 */
type DescriptorsSupported = boolean;

/**
 * 为构造函数添加 Symbol.species 支持
 * 
 * @description
 * 在支持属性描述符的环境中，为指定的构造函数添加 Symbol.species getter。
 * Symbol.species 允许子类覆盖构造函数的默认行为，控制创建派生对象时使用的构造函数。
 * 
 * @remarks
 * - 仅在支持描述符的环境中生效
 * - 仅当构造函数尚未定义 Symbol.species 时才添加
 * - getter 返回 this，允许子类自定义返回的构造函数
 * 
 * @param constructorName - 需要添加 Symbol.species 的构造函数名称（如 'Array'、'RegExp'）
 * 
 * @example
 *