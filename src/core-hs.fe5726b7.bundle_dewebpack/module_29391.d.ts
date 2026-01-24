/**
 * Promise 类型定义模块
 * 
 * 该模块从依赖模块 (ID: 81482) 导出 Promise 构造函数。
 * 通常用于在构建环境中提供标准化的 Promise 实现。
 * 
 * @module module_29391
 * @originalId 29391
 */

/**
 * Promise 构造函数类型
 * 表示 ECMAScript Promise 对象
 */
export type PromiseConstructor = PromiseConstructorLike;

/**
 * 导出标准的 Promise 构造函数
 * 
 * @remarks
 * 该导出提供了对全局 Promise 构造函数的引用，
 * 用于创建和管理异步操作。
 */
export const Promise: PromiseConstructor;

/**
 * Promise 构造函数接口
 */
interface PromiseConstructorLike {
  /**
   * 创建新的 Promise 实例
   * 
   * @template T - Promise 成功时解析的值类型
   * @param executor - 执行器函数，接收 resolve 和 reject 回调
   * @returns 新的 Promise 实例
   */
  new <T>(executor: (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: unknown) => void
  ) => void): Promise<T>;

  /**
   * 创建已成功解析的 Promise
   * 
   * @template T - 解析值类型
   * @param value - 要解析的值
   * @returns 已解析的 Promise
   */
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
  resolve(): Promise<void>;

  /**
   * 创建已拒绝的 Promise
   * 
   * @template T - Promise 类型（通常为 never）
   * @param reason - 拒绝原因
   * @returns 已拒绝的 Promise
   */
  reject<T = never>(reason?: unknown): Promise<T>;

  /**
   * 等待所有 Promise 完成
   * 
   * @template T - Promise 数组中各项的解析类型元组
   * @param values - Promise 或值的可迭代对象
   * @returns 包含所有解析值的 Promise
   */
  all<T extends readonly unknown[] | []>(values: T): Promise<{
    -readonly [P in keyof T]: Awaited<T[P]>
  }>;

  /**
   * 等待任一 Promise 完成
   * 
   * @template T - Promise 数组中各项的解析类型联合
   * @param values - Promise 或值的可迭代对象
   * @returns 第一个解析的 Promise 的值
   */
  race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>;

  /**
   * 等待所有 Promise 完成（无论成功或失败）
   * 
   * @template T - Promise 数组中各项的结果类型元组
   * @param values - Promise 或值的可迭代对象
   * @returns 包含所有结果状态的 Promise
   */
  allSettled<T extends readonly unknown[] | []>(values: T): Promise<{
    -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>>
  }>;

  /**
   * 等待任一 Promise 成功
   * 
   * @template T - Promise 数组中各项的解析类型联合
   * @param values - Promise 或值的可迭代对象
   * @returns 第一个成功的 Promise 的值，或所有失败时拒绝
   */
  any<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>;
}

/**
 * Promise 完成结果类型（成功或失败）
 */
type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

/**
 * Promise 成功结果
 */
interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

/**
 * Promise 失败结果
 */
interface PromiseRejectedResult {
  status: 'rejected';
  reason: unknown;
}

export default Promise;