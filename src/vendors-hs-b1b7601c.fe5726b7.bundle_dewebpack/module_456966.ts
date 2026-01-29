import { operate } from './operate';

export function subscribeOn<T>(
  scheduler: SchedulerLike,
  delay: number = 0
): MonoTypeOperatorFunction<T> {
  return operate((source, subscriber) => {
    subscriber.add(
      scheduler.schedule(() => {
        return source.subscribe(subscriber);
      }, delay)
    );
  });
}

interface SchedulerLike {
  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription;
}

interface SchedulerAction<T> extends Subscription {
  schedule(state?: T, delay?: number): Subscription;
}

interface Subscription {
  unsubscribe(): void;
  readonly closed: boolean;
}

interface MonoTypeOperatorFunction<T> {
  (source: Observable<T>): Observable<T>;
}

interface Observable<T> {
  subscribe(subscriber: Subscriber<T>): Subscription;
}

interface Subscriber<T> {
  add(teardown: Subscription): void;
}