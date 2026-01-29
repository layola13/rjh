import { Observable } from 'rxjs';
import { argsOrArgArray } from 'rxjs/internal/util/argsOrArgArray';
import { OperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { noop } from 'rxjs/internal/util/noop';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';

export function onErrorResumeNext<T>(...sources: Array<Observable<T> | T>): Observable<T> {
  const normalizedSources = argsOrArgArray(sources);
  
  return new Observable<T>((subscriber) => {
    let currentIndex = 0;
    
    const subscribeToNext = (): void => {
      if (currentIndex < normalizedSources.length) {
        let innerObservable: Observable<T>;
        
        try {
          innerObservable = innerFrom(normalizedSources[currentIndex++]);
        } catch (error) {
          subscribeToNext();
          return;
        }
        
        const innerSubscriber = new OperatorSubscriber(
          subscriber,
          undefined,
          noop,
          noop
        );
        
        innerObservable.subscribe(innerSubscriber);
        innerSubscriber.add(subscribeToNext);
      } else {
        subscriber.complete();
      }
    };
    
    subscribeToNext();
  });
}