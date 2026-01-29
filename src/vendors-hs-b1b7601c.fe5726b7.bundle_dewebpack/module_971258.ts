import { Observable } from 'rxjs';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { argsOrArgArray } from 'rxjs/internal/util/argsOrArgArray';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { ObservableInput, OperatorFunction } from 'rxjs';

/**
 * Creates an observable that mirrors the first source observable to emit an item.
 * @param sources - Array of observable inputs to race
 * @returns Observable that emits values from the first source to emit
 */
export function race<T>(...sources: ObservableInput<T>[]): Observable<T> {
  const normalizedSources = argsOrArgArray(sources);
  
  if (normalizedSources.length === 1) {
    return innerFrom(normalizedSources[0]);
  }
  
  return new Observable(raceInit(normalizedSources));
}

/**
 * Initializes the race logic for multiple observables.
 * @param sources - Array of observable inputs
 * @returns Subscriber function that implements race semantics
 */
export function raceInit<T>(sources: ObservableInput<T>[]): (subscriber: any) => void {
  return (subscriber) => {
    let subscriptions: any[] | null = [];
    
    for (let index = 0; index < sources.length && subscriptions && !subscriber.closed; index++) {
      subscriptions.push(
        innerFrom(sources[index]).subscribe(
          createOperatorSubscriber(subscriber, (value: T) => {
            if (subscriptions) {
              for (let i = 0; i < subscriptions.length; i++) {
                if (i !== index) {
                  subscriptions[i].unsubscribe();
                }
              }
              subscriptions = null;
            }
            subscriber.next(value);
          })
        )
      );
    }
  };
}