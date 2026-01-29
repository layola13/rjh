import { AsyncSubject } from 'rxjs';
import { ConnectableObservable } from 'rxjs/internal/observable/ConnectableObservable';
import type { Observable, ObservableInput, OperatorFunction } from 'rxjs';

/**
 * Returns a connectable observable that uses an AsyncSubject to emit the last value
 * emitted by the source observable after it completes.
 */
export function publishLast<T>(): OperatorFunction<T, T> {
  return (source: Observable<T>): ConnectableObservable<T> => {
    const subject = new AsyncSubject<T>();
    return new ConnectableObservable(source, () => subject);
  };
}