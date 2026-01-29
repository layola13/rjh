import { isFunction } from './utils';

export function isScheduler(value: unknown): value is Scheduler {
  return value != null && isFunction((value as Scheduler).schedule);
}

interface Scheduler {
  schedule: (...args: unknown[]) => unknown;
}