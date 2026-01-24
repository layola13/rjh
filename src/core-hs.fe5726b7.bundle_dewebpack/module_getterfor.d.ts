/**
 * 内部状态存储接口
 * 用于存储对象的私有数据
 * @template TType - 状态类型标识符
 */
interface InternalState<TType extends string = string> {
  /** 状态类型标识 */
  type: TType;
  /** 可选的附加数据 */
  [key: string]: unknown;
}

/**
 * 类型检查错误类
 * 当接收者类型不匹配时抛出
 */
declare class TypeError extends Error {
  constructor(message: string);
}

/**
 * 检查值是否为对象类型
 * @param value - 待检查的值
 * @returns 如果是对象返回true，否则返回false
 */
declare function isObject(value: unknown): value is object;

/**
 * 获取对象的内部状态
 * @template T - 内部状态的泛型类型
 * @param target - 目标对象
 * @returns 内部状态对象，如果不存在则返回undefined
 */
declare function getInternalState<T extends InternalState>(
  target: object
): T | undefined;

/**
 * 创建类型安全的内部状态获取器
 * 
 * 该工厂函数为特定类型创建一个getter函数，用于从对象中提取和验证内部状态。
 * 如果目标对象不是预期类型，将抛出TypeError异常。
 * 
 * @template TType - 预期的状态类型标识符（字符串字面量类型）
 * @template TState - 内部状态的完整类型结构
 * 
 * @param expectedType - 预期的状态类型标识符，用于验证对象类型
 * 
 * @returns 返回一个getter函数，该函数接受目标对象并返回其内部状态
 * 
 * @throws {TypeError} 当传入的对象不是对象类型或类型标识不匹配时抛出
 * 
 * @example
 *