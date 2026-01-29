import { Observable } from 'rxjs';
import { argsArgArrayOrObject } from 'rxjs/internal/util/argsArgArrayOrObject';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { popResultSelector } from 'rxjs/internal/util/args';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { mapOneOrManyArgs } from 'rxjs/internal/util/mapOneOrManyArgs';
import { createObject } from 'rxjs/internal/util/createObject';

/**
 * Combines multiple observables and emits an array of their last emitted values when all complete.
 * 
 * @param sources - Observable sources or a dictionary of observables
 * @returns An observable that emits an array or object of the last values from each source
 */
export function forkJoin(...sources: unknown[]): Observable<unknown> {
  const resultSelector = popResultSelector(sources);
  const { args: observableSources, keys } = argsArgArrayOrObject(sources);
  
  const resultObservable = new Observable((subscriber) => {
    const sourceCount = observableSources.length;
    
    if (!sourceCount) {
      subscriber.complete();
      return;
    }
    
    const values = new Array(sourceCount);
    let remainingCompletions = sourceCount;
    let remainingFirstValues = sourceCount;
    
    for (let index = 0; index < sourceCount; index++) {
      let hasValue = false;
      
      innerFrom(observableSources[index]).subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            if (!hasValue) {
              hasValue = true;
              remainingFirstValues--;
            }
            values[index] = value;
          },
          () => {
            remainingCompletions--;
            
            if (remainingCompletions === 0 || !hasValue) {
              if (remainingFirstValues === 0) {
                subscriber.next(keys ? createObject(keys, values) : values);
              }
              subscriber.complete();
            }
          }
        )
      );
    }
  });
  
  return resultSelector 
    ? resultObservable.pipe(mapOneOrManyArgs(resultSelector)) 
    : resultObservable;
}