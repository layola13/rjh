/**
 * Promise 特性检测模块
 * 
 * 用于检测当前环境中 Promise 实现的兼容性和特性支持情况。
 * 包括构造函数、拒绝事件、子类化等关键特性的检测。
 */

/**
 * Promise 特性检测结果
 */
export interface PromiseFeatureDetection {
  /**
   * 指示 Promise 构造函数是否需要 polyfill
   * 
   * 检测内容：
   * - Promise 实现是否为原生代码
   * - 版本兼容性（如 v8 引擎版本 66 的已知问题）
   * - catch/finally 方法是否存在
   * - Promise 基本功能是否正常工作
   */
  CONSTRUCTOR: boolean;

  /**
   * 指示当前环境是否支持 PromiseRejectionEvent
   * 
   * PromiseRejectionEvent 用于处理未捕获的 Promise 拒绝，
   * 在浏览器环境中通过 unhandledrejection 和 rejectionhandled 事件暴露
   */
  REJECTION_EVENT: boolean;

  /**
   * 指示 Promise 是否支持正确的子类化（subclassing）
   * 
   * 检测 Promise.prototype[Symbol.species] 是否按规范工作，
   * 确保派生类的 then/catch 方法返回正确的构造函数实例
   */
  SUBCLASSING: boolean;
}

declare const promiseDetection: PromiseFeatureDetection;

export default promiseDetection;