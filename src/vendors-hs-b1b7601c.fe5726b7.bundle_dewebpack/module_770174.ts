import { raceInit } from './raceInit';
import { operate } from './operate';
import { identity } from './identity';

export function raceWith<T>(...sources: Array<ObservableInput<T>>): MonoTypeOperatorFunction<T> {
  if (sources.length === 0) {
    return identity;
  }

  return operate((source, subscriber) => {
    raceInit([source, ...sources])(subscriber);
  });
}

interface ObservableInput<T> {
  [Symbol.iterator]?: () => Iterator<T>;
}

interface MonoTypeOperatorFunction<T> {
  (source: Observable<T>): Observable<T>;
}

interface Observable<T> {
  subscribe(subscriber: Subscriber<T>): void;
}

interface Subscriber<T> {
  next(value: T): void;
  error(err: unknown): void;
  complete(): void;
}