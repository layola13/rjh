/**
 * 迭代器键类型：表示迭代器的三种访问模式
 */
type IteratorKind = 'keys' | 'values' | 'entries';

/**
 * 迭代器方法集合接口
 * 定义了迭代器对象的三种标准迭代方法
 */
interface IteratorMethods<T> {
  /** 返回键的迭代器 */
  keys: () => Iterator<PropertyKey>;
  /** 返回值的迭代器 */
  values: () => Iterator<T>;
  /** 返回键值对的迭代器 */
  entries: () => Iterator<[PropertyKey, T]>;
}

/**
 * 定义迭代器选项配置
 */
interface DefineIteratorOptions {
  /** 迭代器方法名称（如 'keys', 'values', 'entries'） */
  name?: IteratorKind;
}

/**
 * 定义迭代器工厂函数
 * 
 * 为给定的构造函数添加标准的迭代器方法（keys、values、entries）。
 * 这是一个高阶函数，用于在原型上定义符合 ECMAScript 迭代器协议的方法。
 * 
 * @template T - 被迭代的元素类型
 * @template TConstructor - 目标构造函数类型
 * 
 * @param Constructor - 需要添加迭代器的构造函数
 * @param constructorName - 构造函数的名称（用于调试和类型标识）
 * @param IteratorConstructor - 自定义迭代器构造函数，实现具体的迭代逻辑
 * @param defaultIteratorKind - 默认迭代器的类型（'keys' | 'values' | 'entries'）
 * @param iteratorKind - 当前要定义的迭代器类型
 * @param isKeyOnly - 是否仅迭代键（true 表示返回键的迭代器）
 * @param shouldForceDefine - 是否强制定义迭代器方法（忽略现有定义）
 * 
 * @returns 返回包含所有迭代器方法的对象
 * 
 * @remarks
 * - 自动处理 Safari 的迭代器兼容性问题
 * - 支持自定义迭代器名称
 * - 自动设置 Symbol.iterator
 * - 兼容 ES5 和 ES6+ 环境
 * 
 * @example
 *