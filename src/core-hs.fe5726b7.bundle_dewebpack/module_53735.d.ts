/**
 * Promise 特性检测模块
 * 
 * 检测当前环境对 Promise 的支持情况，包括：
 * - Promise 构造函数的正确性
 * - PromiseRejectionEvent 的可用性
 * - Promise 子类化能力
 */

/**
 * Promise 特性检测结果
 */
export interface PromiseFeatureDetection {
  /**
   * Promise 构造函数是否需要 polyfill
   * 
   * 检测项包括：
   * - Promise 实现是否为原生代码
   * - 是否正确支持 prototype 方法（catch/finally）
   * - 是否正确支持 Symbol.species
   * - 特定版本的兼容性问题
   */
  CONSTRUCTOR: boolean;

  /**
   * 当前环境是否支持 PromiseRejectionEvent
   * 
   * PromiseRejectionEvent 用于捕获未处理的 Promise 拒绝
   * 在浏览器环境中触发 unhandledrejection 和 rejectionhandled 事件
   */
  REJECTION_EVENT: boolean;

  /**
   * Promise 是否支持正确的子类化
   * 
   * 检测通过 Symbol.species 创建的 Promise 子类
   * 是否能正确继承并返回子类实例
   */
  SUBCLASSING: boolean;
}

/**
 * 导出 Promise 特性检测结果
 */
declare const promiseFeatureDetection: PromiseFeatureDetection;

export default promiseFeatureDetection;

export const CONSTRUCTOR: boolean;
export const REJECTION_EVENT: boolean;
export const SUBCLASSING: boolean;