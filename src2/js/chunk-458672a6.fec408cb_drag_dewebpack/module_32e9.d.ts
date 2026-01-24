/**
 * 对象属性定义工具模块
 * 
 * 提供跨环境的属性定义功能，根据环境支持情况选择合适的实现方式
 */

/**
 * 属性描述符接口
 * 用于定义对象属性的特性
 */
interface PropertyDescriptor {
  /** 属性值 */
  value: unknown;
  /** 属性是否可写 */
  writable?: boolean;
  /** 属性是否可枚举 */
  enumerable?: boolean;
  /** 属性是否可配置 */
  configurable?: boolean;
}

/**
 * Object.defineProperty 的类型定义
 */
interface ObjectDefineProperty {
  /**
   * 在对象上定义新属性或修改现有属性
   * 
   * @param target - 目标对象
   * @param propertyKey - 属性名
   * @param descriptor - 属性描述符
   * @returns 修改后的目标对象
   */
  f<T extends object>(target: T, propertyKey: PropertyKey, descriptor: PropertyDescriptor): T;
}

/**
 * 创建属性描述符的工具函数类型
 * 
 * @param flags - 标志位（1表示默认可写可配置）
 * @param value - 属性值
 * @returns 属性描述符对象
 */
type CreatePropertyDescriptor = (flags: number, value: unknown) => PropertyDescriptor;

/**
 * 定义属性的函数类型（ES5+环境）
 * 使用 Object.defineProperty 定义属性
 * 
 * @param target - 目标对象
 * @param propertyKey - 属性名
 * @param value - 属性值
 * @returns 修改后的目标对象
 */
type DefinePropertyModern = <T extends object>(
  target: T,
  propertyKey: PropertyKey,
  value: unknown
) => T;

/**
 * 定义属性的函数类型（传统环境）
 * 直接通过赋值方式定义属性
 * 
 * @param target - 目标对象
 * @param propertyKey - 属性名
 * @param value - 属性值
 * @returns 修改后的目标对象
 */
type DefinePropertyLegacy = <T extends object>(
  target: T,
  propertyKey: PropertyKey,
  value: unknown
) => T;

/**
 * 导出的属性定义函数类型
 * 根据环境自动选择现代或传统实现
 */
export type DefineProperty = DefinePropertyModern | DefinePropertyLegacy;

/**
 * 模块导出
 * 
 * 如果环境支持 Object.defineProperty (ES5+)，使用标准API定义属性；
 * 否则回退到直接赋值方式
 * 
 * @example
 *