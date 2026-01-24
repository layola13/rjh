/**
 * 属性描述符类型
 * 描述对象属性的元数据，包括值、可写性、可枚举性等特性
 */
interface PropertyDescriptor {
  /** 属性的值 */
  value?: unknown;
  /** 属性是否可写 */
  writable?: boolean;
  /** 获取属性值的函数 */
  get?: () => unknown;
  /** 设置属性值的函数 */
  set?: (value: unknown) => void;
  /** 属性是否可枚举 */
  enumerable?: boolean;
  /** 属性是否可配置（可删除或修改） */
  configurable?: boolean;
}

/**
 * 对象工具类型
 */
interface ObjectUtils {
  /**
   * 获取对象的属性描述符
   * @param target - 目标对象
   * @param propertyKey - 属性键名
   * @returns 属性描述符对象，如果属性不存在则返回 undefined
   */
  f(target: object, propertyKey: PropertyKey): PropertyDescriptor | undefined;
}

/**
 * 检查对象是否拥有指定的自有属性（不包括原型链）
 * 
 * @param target - 要检查的目标对象
 * @param propertyKey - 要检查的属性键名
 * @returns 如果对象拥有该自有属性返回 true，否则返回 false
 * 
 * @example
 *