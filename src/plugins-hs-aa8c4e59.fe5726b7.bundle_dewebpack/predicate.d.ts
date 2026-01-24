/**
 * 谓词模块 - 用于定义和组合条件判断逻辑
 * @module Predicate
 */

/**
 * 谓词基类 - 定义了基本的逻辑组合方法
 * @abstract
 */
export abstract class Predicate<T = unknown> {
  /**
   * 执行谓词判断
   * @param value - 待判断的值
   * @returns 判断结果
   */
  abstract execute(value: T): boolean;

  /**
   * 返回当前谓词的逻辑非
   * @returns 非谓词
   */
  not(): NotPredicate<T>;

  /**
   * 与其他谓词进行逻辑与操作
   * @param predicates - 要组合的谓词列表
   * @returns 与谓词
   */
  and(...predicates: Predicate<T>[]): AndPredicate<T>;

  /**
   * 与其他谓词进行逻辑或操作
   * @param predicates - 要组合的谓词列表
   * @returns 或谓词
   */
  or(...predicates: Predicate<T>[]): OrPredicate<T>;
}

/**
 * 非谓词 - 对源谓词的结果取反
 * @template T - 谓词操作的数据类型
 */
export class NotPredicate<T = unknown> extends Predicate<T> {
  /**
   * 源谓词
   */
  readonly source: Predicate<T>;

  /**
   * 创建非谓词实例
   * @param source - 源谓词
   */
  constructor(source: Predicate<T>);

  /**
   * 执行非逻辑判断
   * @param value - 待判断的值
   * @returns 源谓词结果的逻辑非
   */
  execute(value: T): boolean;
}

/**
 * 与谓词 - 所有源谓词都为真时返回真
 * @template T - 谓词操作的数据类型
 */
export class AndPredicate<T = unknown> extends Predicate<T> {
  /**
   * 源谓词数组
   */
  readonly sources: Predicate<T>[];

  /**
   * 创建与谓词实例
   * @param sources - 源谓词数组
   */
  constructor(sources: Predicate<T>[]);

  /**
   * 执行与逻辑判断
   * @param value - 待判断的值
   * @returns 所有源谓词都为真时返回true
   */
  execute(value: T): boolean;
}

/**
 * 或谓词 - 任一源谓词为真时返回真
 * @template T - 谓词操作的数据类型
 */
export class OrPredicate<T = unknown> extends Predicate<T> {
  /**
   * 源谓词数组
   */
  readonly sources: Predicate<T>[];

  /**
   * 创建或谓词实例
   * @param sources - 源谓词数组
   */
  constructor(sources: Predicate<T>[]);

  /**
   * 执行或逻辑判断
   * @param value - 待判断的值
   * @returns 任一源谓词为真时返回true
   */
  execute(value: T): boolean;
}

/**
 * 表达式谓词 - 使用函数表达式进行判断
 * @template T - 谓词操作的数据类型
 */
export class ExpressionPredicate<T = unknown> extends Predicate<T> {
  /**
   * 判断表达式函数
   */
  readonly expression: (value: T) => boolean;

  /**
   * 创建表达式谓词实例
   * @param expression - 判断函数
   */
  constructor(expression: (value: T) => boolean);

  /**
   * 执行表达式判断
   * @param value - 待判断的值
   * @returns 表达式函数的返回值
   */
  execute(value: T): boolean;
}

/**
 * 创建非谓词的工厂函数
 * @template T - 谓词操作的数据类型
 * @param predicate - 源谓词
 * @returns 非谓词实例
 */
export function not<T>(predicate: Predicate<T>): NotPredicate<T>;

/**
 * 创建与谓词的工厂函数
 * @template T - 谓词操作的数据类型
 * @param predicates - 要组合的谓词列表（至少两个）
 * @returns 与谓词实例
 */
export function and<T>(...predicates: [Predicate<T>, Predicate<T>, ...Predicate<T>[]]): AndPredicate<T>;

/**
 * 创建或谓词的工厂函数
 * @template T - 谓词操作的数据类型
 * @param predicates - 要组合的谓词列表（至少两个）
 * @returns 或谓词实例
 */
export function or<T>(...predicates: [Predicate<T>, Predicate<T>, ...Predicate<T>[]]): OrPredicate<T>;