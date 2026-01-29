import { MutableRefObject } from 'react';

/**
 * 取消回调函数的信息接口
 */
export interface CancelableCallbackInfo {
  /**
   * 检查当前回调是否已被取消
   * @returns 如果回调已被取消返回true，否则返回false
   */
  isCanceled: () => boolean;
}

/**
 * 可取消的回调函数类型
 * @param info - 包含取消状态检查方法的对象
 */
export type CancelableCallback = (info: CancelableCallbackInfo) => void;

/**
 * RAF取消函数类型（通常来自requestAnimationFrame的返回值）
 */
export type RafCancelToken = number | null;

/**
 * 执行带延迟的requestAnimationFrame回调
 * @param callback - 要执行的回调函数
 * @param delay - 延迟的帧数，默认为2帧
 */
export type RafFunction = (callback: CancelableCallback, delay?: number) => void;

/**
 * 取消当前待执行的requestAnimationFrame
 */
export type CancelFunction = () => void;

/**
 * useRafState hook的返回值类型
 * @returns [raf, cancel] - raf函数用于调度回调，cancel函数用于取消
 */
export type UseRafStateReturn = [RafFunction, CancelFunction];

/**
 * 自定义Hook：管理requestAnimationFrame的调度和取消
 * 
 * 该Hook返回两个函数：
 * 1. raf - 用于调度一个延迟指定帧数后执行的回调
 * 2. cancel - 用于取消当前待执行的回调
 * 
 * 回调函数会接收一个对象，包含isCanceled方法用于检查是否被取消
 * 
 * @example
 *