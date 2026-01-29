import { asyncScheduler } from './asyncScheduler';
import { delayWhen } from './delayWhen';
import { timer } from './timer';
import type { SchedulerLike } from './types/SchedulerLike';
import type { MonoTypeOperatorFunction } from './types/MonoTypeOperatorFunction';

/**
 * Delays the emission of items from the source Observable by a given timeout.
 * 
 * @param dueTime - The delay duration in milliseconds.
 * @param scheduler - The scheduler to use for managing timers. Defaults to asyncScheduler.
 * @returns An operator function that delays emissions.
 */
export function delay<T>(
  dueTime: number,
  scheduler: SchedulerLike = asyncScheduler
): MonoTypeOperatorFunction<T> {
  const timerObservable = timer(dueTime, scheduler);
  return delayWhen(() => timerObservable);
}