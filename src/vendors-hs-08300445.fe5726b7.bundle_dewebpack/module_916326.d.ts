/**
 * 帧动画调度器模块
 * 提供基于 requestAnimationFrame 的延迟执行功能
 * @module raf
 */

/**
 * 请求动画帧的ID类型
 */
export type RafId = number;

/**
 * 帧调度回调函数
 */
export type FrameCallback = () => void;

/**
 * 请求动画帧函数类型
 */
export type RequestFrameFunction = (callback: FrameCallback) => number;

/**
 * 取消动画帧函数类型
 */
export type CancelFrameFunction = (id: number) => void;

/**
 * RAF调度器函数接口
 * @param callback - 要执行的回调函数
 * @param delayFrames - 延迟的帧数，默认为1
 * @returns 返回可用于取消的唯一标识符
 */
export interface RafScheduler {
  (callback: FrameCallback, delayFrames?: number): RafId;
  
  /**
   * 取消指定的帧调度
   * @param id - 调度标识符
   * @returns void
   */
  cancel(id: RafId): void;
}

/**
 * 默认的RAF调度器实例
 * 用于在指定帧数后执行回调函数
 */
declare const raf: RafScheduler;

export default raf;