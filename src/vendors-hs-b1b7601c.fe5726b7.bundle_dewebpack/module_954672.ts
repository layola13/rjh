import { Observable } from 'rxjs';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { argsOrArgArray } from 'rxjs/internal/util/argsOrArgArray';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { popResultSelector } from 'rxjs/internal/util/args';

type ResultSelector<T, R> = (...values: T[]) => R;

/**
 * Combines multiple observables to create an observable whose values are calculated from the values,
 * in order, of each of its input observables.
 */
export function zip<T extends readonly unknown[], R>(
  ...args: [...sources: any[], resultSelector?: ResultSelector<any, R>]
): Observable<any> {
  const resultSelector = popResultSelector(args);
  const sources = argsOrArgArray(args);

  if (sources.length === 0) {
    return EMPTY;
  }

  return new Observable((subscriber) => {
    let buffers: unknown[][] | null = sources.map(() => []);
    let completed: boolean[] | null = sources.map(() => false);

    subscriber.add(() => {
      buffers = null;
      completed = null;
    });

    for (let sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
      innerFrom(sources[sourceIndex]).subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            if (buffers && completed) {
              buffers[sourceIndex].push(value);

              if (buffers.every((buffer) => buffer.length > 0)) {
                const result = buffers.map((buffer) => buffer.shift());
                
                subscriber.next(
                  resultSelector 
                    ? resultSelector(...result) 
                    : result
                );

                if (buffers.some((buffer, index) => buffer.length === 0 && completed[index])) {
                  subscriber.complete();
                }
              }
            }
          },
          () => {
            if (completed && buffers) {
              completed[sourceIndex] = true;
              if (buffers[sourceIndex].length === 0) {
                subscriber.complete();
              }
            }
          }
        )
      );
    }

    return () => {
      buffers = null;
      completed = null;
    };
  });
}