import { Observable } from 'rxjs';
import { SchedulerLike } from 'rxjs';

/**
 * 创建一个定时发射数值序列的Observable
 * 
 * @param dueTime - 首次发射前的延迟时间（毫秒）或绝对时间点，默认为0
 * @param periodOrScheduler - 发射间隔周期（毫秒）或调度器。如果是数字且<1则设为1，-1表示只发射一次
 * @param scheduler - 用于调度发射的调度器，默认为async调度器
 * @returns 返回一个Observable，按指定间隔发射递增的数字序列（从0开始）
 * 
 * @example
 * // 立即开始，每1000ms发射一次
 * interval(0, 1000)
 * 
 * // 延迟2000ms后开始，每500ms发射一次
 * interval(2000, 500)
 * 
 * // 使用自定义调度器
 * interval(0, 1000, customScheduler)
 */
export declare function interval(
  dueTime?: number | Date,
  periodOrScheduler?: number | SchedulerLike,
  scheduler?: SchedulerLike
): Observable<number>;

/**
 * 调度器状态接口，用于内部递归调度
 */
interface IntervalState {
  /** 当前发射的索引值 */
  index: number;
  /** 发射周期（毫秒），-1表示单次发射 */
  period: number;
  /** 订阅者实例 */
  subscriber: import('rxjs').Subscriber<number>;
}

/**
 * 内部调度函数，递归执行发射逻辑
 * 
 * @param state - 包含索引、周期和订阅者的状态对象
 * @internal
 */
declare function scheduleInterval(this: SchedulerLike['schedule'], state: IntervalState): void;