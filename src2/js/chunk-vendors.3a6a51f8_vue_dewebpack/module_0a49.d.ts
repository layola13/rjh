/**
 * 创建数组迭代方法的工厂函数
 * 
 * 根据不同的迭代模式（map、filter、some、every、find、findIndex）生成对应的迭代器函数
 * 
 * @module ArrayIterationFactory
 */

/**
 * 上下文绑定函数类型
 * 将函数绑定到指定的上下文和参数长度
 */
type ContextBinder = (fn: Function, context: any, argCount: number) => Function;

/**
 * 对象转数组函数类型
 * 将类数组对象转换为真实数组
 */
type ToIndexedObject = (obj: any) => any[];

/**
 * 对象转基础类型函数类型
 * 将对象转换为其基础类型表示
 */
type ToObject = (value: any) => object;

/**
 * 获取长度函数类型
 * 获取对象的length属性（整数）
 */
type ToLength = (value: any) => number;

/**
 * 数组构造器类型
 * 用于创建指定长度的新数组
 */
type ArraySpeciesCreate = (original: any, length: number) => any[];

/**
 * 迭代回调函数类型
 * @template T - 数组元素类型
 * @param element - 当前元素
 * @param index - 当前索引
 * @param array - 原始数组
 * @returns 回调处理结果
 */
type IterationCallback<T, R> = (element: T, index: number, array: T[]) => R;

/**
 * 迭代模式枚举
 */
const enum IterationMode {
  /** 模式1: Array.prototype.map - 映射每个元素 */
  MAP = 1,
  /** 模式2: Array.prototype.filter - 过滤元素 */
  FILTER = 2,
  /** 模式3: Array.prototype.some - 检查是否存在满足条件的元素 */
  SOME = 3,
  /** 模式4: Array.prototype.every - 检查是否所有元素都满足条件 */
  EVERY = 4,
  /** 模式5: Array.prototype.find - 查找第一个满足条件的元素 */
  FIND = 5,
  /** 模式6: Array.prototype.findIndex - 查找第一个满足条件的元素索引 */
  FIND_INDEX = 6
}

/**
 * 数组迭代方法工厂函数
 * 
 * @param mode - 迭代模式（1-6对应不同的数组方法）
 * @param arraySpeciesCreate - 可选的数组构造函数，用于创建结果数组
 * @returns 返回配置好的迭代器函数
 * 
 * @example
 * // 创建map方法
 * const mapIterator = createArrayIterator(1);
 * const result = mapIterator([1, 2, 3], x => x * 2);
 * 
 * @example
 * // 创建filter方法
 * const filterIterator = createArrayIterator(2);
 * const result = filterIterator([1, 2, 3, 4], x => x > 2);
 */
declare function createArrayIterator(
  mode: IterationMode,
  arraySpeciesCreate?: ArraySpeciesCreate
): <T, R = any>(
  target: ArrayLike<T>,
  callback: IterationCallback<T, R>,
  thisArg?: any
) => T[] | R[] | T | R | boolean | number | undefined;

/**
 * 依赖模块声明
 */
declare module '9b43' {
  export default function asBind(fn: Function, context: any, argCount: number): Function;
}

declare module '626a' {
  export default function toIndexedObject(obj: any): any[];
}

declare module '4bf8' {
  export default function toObject(value: any): object;
}

declare module '9def' {
  export default function toLength(value: any): number;
}

declare module 'cd1c' {
  export default function arraySpeciesCreate(original: any, length: number): any[];
}

export = createArrayIterator;