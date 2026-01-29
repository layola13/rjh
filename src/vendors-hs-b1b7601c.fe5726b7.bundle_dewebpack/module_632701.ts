import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';

export function map<T, R>(
  project: (value: T, index: number) => R,
  thisArg?: unknown
): (source: Observable<T>) => Observable<R> {
  return operate((source, subscriber) => {
    let index = 0;
    source.subscribe(
      createOperatorSubscriber(subscriber, (value: T) => {
        subscriber.next(project.call(thisArg, value, index++));
      })
    );
  });
}

interface Observable<T> {
  subscribe(observer: Partial<Observer<T>>): Subscription;
}

interface Observer<T> {
  next: (value: T) => void;
  error: (err: unknown) => void;
  complete: () => void;
}

interface Subscription {
  unsubscribe(): void;
}