import { EMPTY } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

/**
 * Emits only the last `count` values emitted by the source Observable.
 * 
 * @param count The maximum number of values to emit from the end of the sequence.
 * @returns A function that returns an Observable that emits at most the last `count` values.
 */
export function takeLast<T>(count: number): MonoTypeOperatorFunction<T> {
  if (count <= 0) {
    return (): Observable<T> => EMPTY;
  }

  return operate((source: Observable<T>, subscriber) => {
    let buffer: T[] = [];

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          buffer.push(value);
          if (count < buffer.length) {
            buffer.shift();
          }
        },
        () => {
          for (const value of buffer) {
            subscriber.next(value);
          }
          subscriber.complete();
        },
        undefined,
        () => {
          buffer = null!;
        }
      )
    );
  });
}