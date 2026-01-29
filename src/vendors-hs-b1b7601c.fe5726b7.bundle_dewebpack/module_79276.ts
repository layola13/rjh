import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import type { Observable } from './Observable';
import type { OperatorFunction } from './types';

type FindMode = 'value' | 'index';

export function find<T>(
  predicate: (value: T, index: number, source: Observable<T>) => boolean,
  thisArg?: unknown
): OperatorFunction<T, T | undefined> {
  return operate(createFind(predicate, thisArg, 'value'));
}

export function createFind<T>(
  predicate: (value: T, index: number, source: Observable<T>) => boolean,
  thisArg: unknown,
  mode: FindMode
): (source: Observable<T>, subscriber: any) => void {
  const isIndexMode = mode === 'index';
  
  return (source: Observable<T>, subscriber: any): void => {
    let index = 0;
    
    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          const currentIndex = index++;
          
          if (predicate.call(thisArg, value, currentIndex, source)) {
            subscriber.next(isIndexMode ? currentIndex : value);
            subscriber.complete();
          }
        },
        () => {
          subscriber.next(isIndexMode ? -1 : undefined);
          subscriber.complete();
        }
      )
    );
  };
}