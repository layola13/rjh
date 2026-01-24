/**
 * Promise.reject 静态方法的类型声明
 * 
 * 该模块为 Promise 对象添加静态方法 reject，用于创建一个被拒绝的 Promise 实例。
 * 这是一个 polyfill 实现，用于确保在不支持该特性的环境中也能使用。
 * 
 * @module PromiseReject
 */

/**
 * Promise 构造函数配置选项
 */
interface PromiseCapability<T = any> {
  /** Promise 实例 */
  promise: Promise<T>;
  /** 解决 Promise 的函数 */
  resolve: (value: T | PromiseLike<T>) => void;
  /** 拒绝 Promise 的函数 */
  reject: (reason?: any) => void;
}

/**
 * Promise 能力工厂函数
 */
interface PromiseCapabilityFactory {
  /**
   * 创建一个新的 Promise 能力对象
   * 
   * @param constructor - Promise 构造函数
   * @returns Promise 能力对象，包含 promise 实例及其 resolve/reject 方法
   */
  f<T = any>(constructor: PromiseConstructor | PromiseConstructorLike): PromiseCapability<T>;
}

/**
 * Promise 构造函数的类型（用于支持自定义 Promise 实现）
 */
interface PromiseConstructorLike {
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
}

/**
 * Promise 静态方法扩展
 */
declare global {
  interface PromiseConstructor {
    /**
     * 创建一个新的被拒绝的 Promise 对象
     * 
     * @template T - Promise 的值类型（通常在 reject 场景下不使用）
     * @param reason - 拒绝的原因，可以是任意类型的值（通常是 Error 对象）
     * @returns 一个状态为 rejected 的 Promise 实例
     * 
     * @example
     *