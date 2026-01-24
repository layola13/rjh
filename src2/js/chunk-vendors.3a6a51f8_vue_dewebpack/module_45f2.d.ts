/**
 * 属性描述符配置接口
 * 用于定义对象属性的特性
 */
interface PropertyDescriptor {
  /** 属性是否可配置（可删除或修改特性） */
  configurable: boolean;
  /** 属性的值 */
  value: string;
}

/**
 * Object.defineProperty 的函数签名
 */
interface DefinePropertyFunction {
  (target: object, propertyKey: PropertyKey, descriptor: PropertyDescriptor): object;
}

/**
 * Object.prototype.hasOwnProperty 的函数签名
 */
interface HasOwnPropertyFunction {
  (target: object, propertyKey: PropertyKey): boolean;
}

/**
 * Symbol.toStringTag 获取函数
 */
interface GetWellKnownSymbolFunction {
  (name: 'toStringTag'): symbol;
}

/**
 * 为对象或原型设置自定义的 toStringTag 属性
 * 
 * 该函数用于定义对象的 `Symbol.toStringTag` 属性，
 * 使 `Object.prototype.toString.call()` 返回自定义的类型字符串
 * 
 * @param target - 目标对象或构造函数
 * @param tag - 要设置的标签字符串（如 'MyClass'）
 * @param usePrototype - 是否在原型上设置（默认 false 表示直接在对象上设置）
 * 
 * @example
 *