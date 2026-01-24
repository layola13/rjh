/**
 * 定时器 ID 到 RAF 句柄的映射表
 * @internal
 */
interface TimerIdMap {
  [timerId: number]: number;
}

/**
 * 重复执行函数的选项配置
 */
interface RepeatOptions {
  /**
   * 执行次数，默认为 1
   * @default 1
   */
  count?: number;
}

/**
 * requestAnimationFrame 重复执行工具函数
 * 
 * 基于 requestAnimationFrame 实现的函数重复执行器，支持指定执行次数和取消功能。
 * 适用于需要在浏览器动画帧中执行的重复任务。
 * 
 * @param callback - 需要重复执行的回调函数
 * @param count - 执行次数，默认为 1。每次 RAF 触发时递减，直到 0 时执行回调并停止
 * @returns 定时器 ID，可用于 cancel 方法取消执行
 * 
 * @example
 *