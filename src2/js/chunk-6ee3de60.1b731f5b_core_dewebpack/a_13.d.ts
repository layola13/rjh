/**
 * RxJS配置模块
 * 用于控制全局错误处理行为和Promise实现
 */

/**
 * RxJS全局配置对象
 * 控制Observable的错误处理策略和Promise polyfill
 */
export interface Config {
  /**
   * 自定义Promise实现
   * 允许使用非原生Promise（如Bluebird、Q等）
   * @default undefined - 使用原生Promise
   */
  Promise: PromiseConstructorLike | undefined;

  /**
   * 设置是否启用已废弃的同步错误处理模式
   * 
   * @deprecated 此特性已废弃，将在未来版本中移除
   * @param value - true启用同步错误抛出，false使用异步错误处理
   * 
   * @remarks
   * 启用时会在设置点捕获堆栈跟踪以辅助调试
   * 同步模式下错误会立即抛出，可能影响性能
   * 
   * @example
   *