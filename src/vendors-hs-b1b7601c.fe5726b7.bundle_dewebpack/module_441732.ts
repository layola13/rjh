import { EMPTY } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/createOperatorSubscriber';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

/**
 * Emits only the first `count` values emitted by the source Observable.
 * 
 * @param count The maximum number of values to emit
 * @returns An operator function that returns an Observable that emits only the first `count` values
 */
export function take<T>(count: number): MonoTypeOperatorFunction<T> {
  if (count <= 0) {
    return (): Observable<T> => EMPTY;
  }

  return operate((source: Observable<T>, subscriber) => {
    let seen = 0;
    
    source.subscribe(
      createOperatorSubscriber(subscriber, (value: T) => {
        seen++;
        
        if (seen <= count) {
          subscriber.next(value);
          
          if (count <= seen) {
            subscriber.complete();
          }
        }
      })
    );
  });
}