/**
 * 定时器Observable创建函数
 * 根据指定的延迟时间和可选的周期时间创建一个定时器Observable
 */

import { Observable } from 'rxjs';
import { SchedulerLike } from 'rxjs';

/**
 * 定时器配置参数
 */
interface TimerState {
  /** 当前发射的索引值 */
  index: number;
  /** 发射周期(毫秒)，-1表示只发射一次后完成 */
  period: number;
  /** 订阅者实例 */
  subscriber: Subscriber<number>;
}

/**
 * 订阅者接口
 */
interface Subscriber<T> {
  /** 发射下一个值 */
  next(value: T): void;
  /** 订阅是否已关闭 */
  readonly closed: boolean;
  /** 完成订阅 */
  complete(): void;
}

/**
 * 创建一个定时器Observable
 * 
 * @param initialDelay - 初始延迟时间(毫秒)或Date对象，默认为0
 * @param period - 可选的周期时间(毫秒)或调度器，小于1时自动设为1
 * @param scheduler - 可选的调度器，用于控制时间和执行上下文
 * @returns 返回一个Observable，按指定间隔发射递增的数字序列
 * 
 * @example
 * // 延迟1秒后开始，每2秒发射一次
 * timer(1000, 2000).subscribe(x => console.log(x));
 * 
 * @example
 * // 在指定时间点开始发射
 * timer(new Date('2024-01-01'), 1000).subscribe(x => console.log(x));
 * 
 * @example
 * // 仅延迟1秒后发射一次(无周期)
 * timer(1000).subscribe(x => console.log(x));
 */
export declare function timer(
  initialDelay?: number | Date,
  period?: number | SchedulerLike,
  scheduler?: SchedulerLike
): Observable<number>;

/**
 * 调度器工作函数
 * 由调度器周期性调用，负责发射值并决定是否继续或完成
 * 
 * @param this - 调度器上下文
 * @param state - 定时器状态对象
 * @internal
 */
declare function scheduleWork(this: SchedulerLike, state: TimerState): void;