import { Observable } from 'rxjs';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { EMPTY } from 'rxjs';

export function using<T, R>(
  resourceFactory: () => T & { unsubscribe?: () => void },
  observableFactory: (resource: T) => Observable<R> | null | undefined
): Observable<R> {
  return new Observable<R>((subscriber) => {
    const resource = resourceFactory();
    const observableResult = observableFactory(resource);
    
    const sourceObservable = observableResult ? innerFrom(observableResult) : EMPTY;
    sourceObservable.subscribe(subscriber);
    
    return () => {
      if (resource && resource.unsubscribe) {
        resource.unsubscribe();
      }
    };
  });
}