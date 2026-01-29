import { BehaviorSubject } from 'rxjs';
import { ConnectableObservable } from 'rxjs';

export function publishBehavior<T>(initialValue: T) {
  return function <R>(source: any): ConnectableObservable<R> {
    const subject = new BehaviorSubject<T>(initialValue);
    return new ConnectableObservable(source, () => subject);
  };
}