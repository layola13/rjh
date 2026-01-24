/**
 * 错误处理模块
 * 
 * 该模块用于处理应用程序的错误回调逻辑。
 * 当错误处理器返回 false 时，会触发特定的停止操作。
 * 
 * @module module_onError
 * @originalId onError
 */

/**
 * 错误处理器函数类型
 * 
 * @returns 布尔值表示是否继续执行：
 *   - true: 继续正常执行
 *   - false: 停止执行并触发错误处理流程
 *   - undefined: 视为未定义情况，按 false 处理
 */
type ErrorHandler = () => boolean | void;

/**
 * 停止执行函数类型
 * 
 * @param shouldStop - 是否应该停止执行的标志
 */
type StopFunction = (shouldStop: boolean) => void;

/**
 * 错误处理配置接口
 */
interface ErrorConfig {
  /**
   * 错误处理回调函数
   * 可选，如果未提供则默认为 undefined
   */
  onError?: ErrorHandler;
}

/**
 * 执行错误处理逻辑
 * 
 * 该函数检查错误处理器的返回值，如果返回值严格等于 false，
 * 则调用停止函数 S 并传入 false 参数。
 * 
 * @param config - 包含 onError 回调的配置对象
 * @param stopFn - 停止执行的函数
 * 
 * @example
 *