import { asyncScheduler } from './asyncScheduler';
import { timer } from './timer';

export function interval(period: number = 0, scheduler: SchedulerLike = asyncScheduler): Observable<number> {
  if (period < 0) {
    period = 0;
  }
  return timer(period, period, scheduler);
}

interface SchedulerLike {
  now(): number;
  schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription;
}

interface SchedulerAction<T> {
  schedule(state?: T, delay?: number): Subscription;
}

interface Subscription {
  unsubscribe(): void;
  readonly closed: boolean;
}

interface Observable<T> {
  subscribe(observer?: Partial<Observer<T>>): Subscription;
}

interface Observer<T> {
  next: (value: T) => void;
  error: (err: unknown) => void;
  complete: () => void;
}