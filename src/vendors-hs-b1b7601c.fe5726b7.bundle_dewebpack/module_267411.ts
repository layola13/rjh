import { Observable } from './Observable';
import { isArrayLike } from './isArrayLike';
import { isPromise } from './isPromise';
import { isInteropObservable } from './isInteropObservable';
import { isAsyncIterable } from './isAsyncIterable';
import { createInvalidObservableTypeError } from './createInvalidObservableTypeError';
import { isIterable } from './isIterable';
import { isReadableStreamLike, readableStreamLikeToAsyncGenerator } from './readableStreamLike';
import { isFunction } from './isFunction';
import { reportUnhandledError } from './reportUnhandledError';
import { observable as observableSymbol } from './symbol';

export function innerFrom<T>(input: any): Observable<T> {
  if (input instanceof Observable) {
    return input;
  }
  
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable<T>(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike<T>(input);
    }
    if (isPromise(input)) {
      return fromPromise<T>(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable<T>(input);
    }
    if (isIterable(input)) {
      return fromIterable<T>(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike<T>(input);
    }
  }
  
  throw createInvalidObservableTypeError(input);
}

export function fromInteropObservable<T>(observable: any): Observable<T> {
  return new Observable<T>((subscriber) => {
    const obs = observable[observableSymbol]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError('Provided object does not correctly implement Symbol.observable');
  });
}

export function fromArrayLike<T>(arrayLike: ArrayLike<T>): Observable<T> {
  return new Observable<T>((subscriber) => {
    for (let index = 0; index < arrayLike.length && !subscriber.closed; index++) {
      subscriber.next(arrayLike[index]);
    }
    subscriber.complete();
  });
}

export function fromPromise<T>(promise: PromiseLike<T>): Observable<T> {
  return new Observable<T>((subscriber) => {
    promise.then(
      (value) => {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      },
      (error) => subscriber.error(error)
    ).then(null, reportUnhandledError);
  });
}

export function fromIterable<T>(iterable: Iterable<T>): Observable<T> {
  return new Observable<T>((subscriber) => {
    for (const value of iterable) {
      subscriber.next(value);
      if (subscriber.closed) {
        return;
      }
    }
    subscriber.complete();
  });
}

export function fromAsyncIterable<T>(asyncIterable: AsyncIterable<T>): Observable<T> {
  return new Observable<T>((subscriber) => {
    consumeAsyncIterable(asyncIterable, subscriber).catch((error) => subscriber.error(error));
  });
}

async function consumeAsyncIterable<T>(asyncIterable: AsyncIterable<T>, subscriber: any): Promise<void> {
  for await (const value of asyncIterable) {
    subscriber.next(value);
    if (subscriber.closed) {
      return;
    }
  }
  subscriber.complete();
}

export function fromReadableStreamLike<T>(readableStream: any): Observable<T> {
  return fromAsyncIterable<T>(readableStreamLikeToAsyncGenerator(readableStream));
}