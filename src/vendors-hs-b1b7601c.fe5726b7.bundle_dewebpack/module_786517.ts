import { innerFrom } from './innerFrom';
import { observeOn } from './observeOn';
import { subscribeOn } from './subscribeOn';
import type { Observable } from './Observable';
import type { SchedulerLike } from './types';

export function scheduleObservable<T>(
  observable: Observable<T>,
  scheduler: SchedulerLike
): Observable<T> {
  return innerFrom(observable).pipe(
    subscribeOn(scheduler),
    observeOn(scheduler)
  );
}