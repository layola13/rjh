/**
 * 类定义辅助工具 - 用于定义类的属性和方法
 * 这是一个Babel辅助函数，用于在ES5环境中创建ES6类
 * 
 * @deprecated 在现代TypeScript项目中应直接使用原生class语法
 */

/**
 * 属性描述符接口
 */
interface PropertyDescriptor {
  /** 属性键名 */
  key: PropertyKey;
  /** 属性值 */
  value?: unknown;
  /** getter函数 */
  get?(): unknown;
  /** setter函数 */
  set?(value: unknown): void;
  /** 是否可枚举 */
  enumerable?: boolean;
  /** 是否可配置 */
  configurable?: boolean;
  /** 是否可写 */
  writable?: boolean;
}

/**
 * 构造函数类型
 */
type Constructor<T = unknown> = new (...args: unknown[]) => T;

/**
 * 将属性描述符数组应用到目标对象上
 * 
 * @param target - 目标对象（类的原型或构造函数本身）
 * @param descriptors - 属性描述符数组
 */
declare function defineProperties(
  target: object,
  descriptors: PropertyDescriptor[]
): void;

/**
 * 创建类定义的辅助函数
 * 用于定义类的实例方法、静态方法，并将原型设置为不可写
 * 
 * @param constructor - 类的构造函数
 * @param protoProps - 原型（实例）方法的属性描述符数组
 * @param staticProps - 静态方法的属性描述符数组
 * @returns 返回传入的构造函数
 * 
 * @example
 *