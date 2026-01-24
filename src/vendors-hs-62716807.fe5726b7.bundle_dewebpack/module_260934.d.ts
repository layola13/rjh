/**
 * 获取对象属性描述符的 setter 函数
 * @param obj - 目标对象
 * @param prop - 属性名
 * @param method - 方法类型('set' 或 'get')
 * @returns setter/getter 函数
 */
declare type GetPropertyDescriptor = (
  obj: object,
  prop: PropertyKey,
  method: 'set' | 'get'
) => ((target: any, value: any) => void) | undefined;

/**
 * 验证目标对象是否为有效对象
 * @param target - 待验证的目标对象
 * @throws 如果目标不是有效对象则抛出错误
 */
declare type RequireObjectCoercible = (target: any) => void;

/**
 * 验证原型对象是否有效(必须是对象或null)
 * @param proto - 原型对象
 * @throws 如果原型不是对象或null则抛出错误
 */
declare type IsObjectOrNull = (proto: any) => void;

/**
 * 设置对象的原型
 * 
 * 该函数提供了跨环境的原型设置能力:
 * - 优先使用原生的 Object.setPrototypeOf
 * - 如果环境支持 __proto__,则使用基于描述符的方式
 * - 如果都不支持,返回 undefined
 * 
 * @param target - 要设置原型的目标对象
 * @param proto - 新的原型对象(必须是对象或null)
 * @returns 设置原型后的目标对象
 * 
 * @example
 *