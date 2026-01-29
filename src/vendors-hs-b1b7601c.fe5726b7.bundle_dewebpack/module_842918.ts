import { operate } from './operate';
import { createFind } from './createFind';

export function findIndex<T>(
  predicate: (value: T, index: number) => boolean,
  thisArg?: unknown
): (source: Observable<T>) => Observable<number> {
  return operate(createFind(predicate, thisArg, "index"));
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