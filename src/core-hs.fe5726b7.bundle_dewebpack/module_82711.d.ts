/**
 * 获取对象的size属性值的辅助函数
 * 
 * 该模块提供了一个获取器函数,用于安全地访问对象的size属性。
 * 首先尝试通过原型链上的getter方法获取,如果不存在则直接访问属性。
 * 
 * @module SizeGetter
 */

/**
 * 表示具有size属性的对象接口
 */
interface Sizeable {
  /**
   * 对象的大小属性
   */
  size: number;
}

/**
 * 原型对象接口,包含可能的getter方法
 */
interface ProtoObject {
  proto: Record<string, unknown>;
}

/**
 * 从原型对象中获取指定属性的getter函数
 * 
 * @param proto - 原型对象
 * @param propertyName - 属性名称
 * @param accessorType - 访问器类型 ("get" 或 "set")
 * @returns getter函数或undefined
 */
declare function getPrototypeAccessor(
  proto: Record<string, unknown>,
  propertyName: string,
  accessorType: 'get' | 'set'
): ((obj: Sizeable) => number) | undefined;

/**
 * 获取对象的size属性值
 * 
 * 优先使用原型链上定义的size属性的getter方法,
 * 如果不存在则回退到直接访问对象的size属性。
 * 
 * @param target - 目标对象
 * @returns 对象的size值
 * 
 * @example
 *