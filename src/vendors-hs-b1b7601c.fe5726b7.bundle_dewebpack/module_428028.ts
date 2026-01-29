import { Subject } from 'rxjs';
import { multicast } from 'rxjs/operators';
import { connect } from 'rxjs/operators';
import type { Observable, MonoTypeOperatorFunction, ObservableInput, SubjectLike } from 'rxjs';

/**
 * Publishes an Observable, making it multicast through a Subject.
 * 
 * @template T The type of values emitted by the source Observable
 * @param selector Optional selector function or Subject to use for multicasting
 * @returns A function that transforms an Observable into a multicast Observable
 */
export function publish<T>(
  selector?: ((source: Observable<T>) => ObservableInput<T>) | SubjectLike<T>
): MonoTypeOperatorFunction<T> {
  if (selector) {
    return (source: Observable<T>) => connect(selector)(source);
  }
  
  return (source: Observable<T>) => multicast(new Subject<T>())(source);
}