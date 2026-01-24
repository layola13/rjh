/**
 * Promise.try 静态方法的类型声明
 * 用于同步执行函数并将结果包装为 Promise
 * @module PromiseTryPolyfill
 */

/**
 * Promise.try 方法的参数类型
 * @template T - 函数返回值类型
 */
type PromiseTryCallback<T> = () => T | PromiseLike<T>;

/**
 * Promise 执行结果的内部表示
 * @template T - 结果值类型
 */
interface PromiseExecutionResult<T> {
  /** 是否发生错误 */
  e: boolean;
  /** 结果值或错误对象 */
  v: T | Error;
}

/**
 * Promise 延迟对象接口
 * @template T - Promise 解析值类型
 */
interface PromiseDeferred<T> {
  /** Promise 实例 */
  promise: Promise<T>;
  /** 解析函数 */
  resolve: (value: T | PromiseLike<T>) => void;
  /** 拒绝函数 */
  reject: (reason?: any) => void;
}

declare global {
  interface PromiseConstructor {
    /**
     * 同步执行给定函数并返回 Promise
     * - 如果函数成功执行，返回 resolved Promise
     * - 如果函数抛出异常，返回 rejected Promise
     * 
     * @template T - 函数返回值类型
     * @param callback - 要执行的回调函数
     * @returns 包装了执行结果的 Promise
     * 
     * @example
     *