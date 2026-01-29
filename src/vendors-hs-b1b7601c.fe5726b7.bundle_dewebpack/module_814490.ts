import { scheduleObservable } from './scheduleObservable';
import { schedulePromise } from './schedulePromise';
import { scheduleArray } from './scheduleArray';
import { scheduleIterable } from './scheduleIterable';
import { scheduleAsyncIterable } from './scheduleAsyncIterable';
import { isInteropObservable } from './isInteropObservable';
import { isPromise } from './isPromise';
import { isArrayLike } from './isArrayLike';
import { isIterable } from './isIterable';
import { isAsyncIterable } from './isAsyncIterable';
import { createInvalidObservableTypeError } from './createInvalidObservableTypeError';
import { isReadableStreamLike } from './isReadableStreamLike';
import { scheduleReadableStreamLike } from './scheduleReadableStreamLike';

export type SchedulerLike = {
  schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription;
};

export type SchedulerAction<T> = {
  schedule(state?: T, delay?: number): Subscription;
};

export type Subscription = {
  unsubscribe(): void;
  closed: boolean;
};

export type ObservableInput<T> = 
  | InteropObservable<T>
  | ArrayLike<T>
  | Promise<T>
  | AsyncIterable<T>
  | Iterable<T>
  | ReadableStreamLike<T>;

export type InteropObservable<T> = {
  [Symbol.observable]: () => Subscribable<T>;
};

export type Subscribable<T> = {
  subscribe(observer: Observer<T>): Subscription;
};

export type Observer<T> = {
  next: (value: T) => void;
  error: (err: unknown) => void;
  complete: () => void;
};

export type ArrayLike<T> = {
  readonly length: number;
  readonly [n: number]: T;
};

export type ReadableStreamLike<T> = {
  getReader(): ReadableStreamDefaultReader<T>;
};

export type ReadableStreamDefaultReader<T> = {
  read(): Promise<ReadableStreamReadResult<T>>;
  releaseLock(): void;
};

export type ReadableStreamReadResult<T> = 
  | { done: false; value: T }
  | { done: true; value?: undefined };

export function scheduled<T>(input: ObservableInput<T>, scheduler: SchedulerLike): Subscribable<T> {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  
  throw createInvalidObservableTypeError(input);
}