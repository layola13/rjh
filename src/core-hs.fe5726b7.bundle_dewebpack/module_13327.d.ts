/**
 * 定义或重新导出对象属性的工具函数
 * 用于在目标对象上定义属性，支持全局导出、可枚举性、可配置性等选项
 * 
 * @module PropertyDefiner
 */

/**
 * 属性定义选项
 */
interface PropertyOptions {
  /** 属性是否可枚举（默认：false） */
  enumerable?: boolean;
  
  /** 属性名称（默认：使用 key 参数） */
  name?: string;
  
  /** 是否作为全局属性定义（默认：false） */
  global?: boolean;
  
  /** 是否允许不安全操作（尝试删除现有属性）（默认：false） */
  unsafe?: boolean;
  
  /** 属性是否不可配置（默认：false） */
  nonConfigurable?: boolean;
  
  /** 属性是否不可写（默认：false） */
  nonWritable?: boolean;
}

/**
 * 检查值是否为可调用函数
 */
declare function isCallable(value: unknown): value is Function;

/**
 * Object.defineProperty 的类型安全包装
 */
declare const defineProperty: {
  f: <T extends object, K extends PropertyKey>(
    target: T,
    key: K,
    descriptor: PropertyDescriptor
  ) => T;
};

/**
 * 为函数设置名称属性
 */
declare function setFunctionName(
  fn: Function,
  name: string,
  options?: PropertyOptions
): void;

/**
 * 定义全局属性
 */
declare function defineGlobalProperty(key: PropertyKey, value: unknown): void;

/**
 * 在目标对象上定义或重新导出属性
 * 
 * @param target - 目标对象
 * @param key - 属性键名
 * @param value - 属性值
 * @param options - 配置选项
 * @returns 返回目标对象
 * 
 * @example
 *