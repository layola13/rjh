import { async } from './async';
import { isValidDate } from './isValidDate';
import { timeout } from './timeout';

export function timeoutWith<T, R>(
  due: number | Date,
  switchTo: Observable<R>,
  scheduler?: SchedulerLike
): OperatorFunction<T, T | R> {
  const timeoutScheduler = scheduler ?? async;
  
  let firstTimeout: Date | undefined;
  let eachTimeout: number | undefined;
  
  if (isValidDate(due)) {
    firstTimeout = due as Date;
  } else if (typeof due === 'number') {
    eachTimeout = due;
  }
  
  if (!switchTo) {
    throw new TypeError('No observable provided to switch to');
  }
  
  const switchToFactory = (): Observable<R> => switchTo;
  
  if (firstTimeout === undefined && eachTimeout === undefined) {
    throw new TypeError('No timeout provided.');
  }
  
  return timeout<T, R>({
    first: firstTimeout,
    each: eachTimeout,
    scheduler: timeoutScheduler,
    with: switchToFactory
  });
}

interface Observable<T> {
  subscribe(observer: Observer<T>): Subscription;
}

interface Observer<T> {
  next(value: T): void;
  error(err: unknown): void;
  complete(): void;
}

interface Subscription {
  unsubscribe(): void;
}

interface SchedulerLike {
  now(): number;
  schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription;
}

interface SchedulerAction<T> extends Subscription {
  schedule(state?: T, delay?: number): Subscription;
}

type OperatorFunction<T, R> = (source: Observable<T>) => Observable<R>;