import { innerFrom } from './innerFrom';
import { observeOn } from './observeOn';
import { subscribeOn } from './subscribeOn';
import type { Observable } from './Observable';
import type { SchedulerLike } from './types';

export function schedulePromise<T>(
  input: Promise<T> | PromiseLike<T>,
  scheduler: SchedulerLike
): Observable<T> {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}