/**
 * 属性描述符接口
 */
interface PropertyDescriptor {
  /** 属性值 */
  value?: any;
  /** 可写性 */
  writable?: boolean;
  /** 可枚举性 */
  enumerable?: boolean;
  /** 可配置性 */
  configurable?: boolean;
  /** Getter函数 */
  get?(): any;
  /** Setter函数 */
  set?(value: any): void;
}

/**
 * Object.defineProperty的封装接口
 */
interface ObjectDefineProperty {
  /**
   * 在对象上定义新属性或修改现有属性
   * @param target - 目标对象
   * @param propertyKey - 属性键名
   * @param descriptor - 属性描述符
   * @returns 修改后的对象
   */
  f<T extends object>(
    target: T,
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ): T;
}

/**
 * 创建属性描述符的工具函数
 * @param bitmap - 位图标志（1表示可枚举）
 * @param value - 属性值
 * @returns 属性描述符对象
 */
declare function createPropertyDescriptor(
  bitmap: number,
  value: any
): PropertyDescriptor;

/**
 * 隐藏属性设置函数
 * 
 * 根据环境是否支持Object.defineProperty，选择不同的属性设置策略：
 * - 支持时：使用Object.defineProperty设置不可枚举属性
 * - 不支持时：降级为直接赋值
 * 
 * @param target - 目标对象
 * @param propertyKey - 属性键名
 * @param value - 属性值
 * @returns 修改后的目标对象
 * 
 * @example
 *