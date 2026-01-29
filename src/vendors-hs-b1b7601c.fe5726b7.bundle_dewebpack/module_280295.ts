import { ReplaySubject } from './ReplaySubject';
import { multicast } from './multicast';
import { isFunction } from './isFunction';
import { Observable } from './Observable';
import { OperatorFunction, SchedulerLike } from './types';

/**
 * Share source and replay specified number of emissions on subscription.
 * 
 * @param bufferSize Maximum element count of the replay buffer.
 * @param windowTime Maximum time length of the replay buffer in milliseconds.
 * @param selectorOrScheduler Selector function or scheduler.
 * @param scheduler Optional scheduler.
 * @returns An operator function that returns a ConnectableObservable.
 */
export function publishReplay<T>(
  bufferSize?: number,
  windowTime?: number,
  selectorOrScheduler?: SchedulerLike | ((source: Observable<T>) => Observable<T>),
  scheduler?: SchedulerLike
): OperatorFunction<T, T> {
  let actualScheduler: SchedulerLike | undefined;
  let selector: ((source: Observable<T>) => Observable<T>) | undefined;

  if (selectorOrScheduler && !isFunction(selectorOrScheduler)) {
    actualScheduler = selectorOrScheduler as SchedulerLike;
  }

  if (isFunction(selectorOrScheduler)) {
    selector = selectorOrScheduler as (source: Observable<T>) => Observable<T>;
  }

  if (scheduler) {
    actualScheduler = scheduler;
  }

  return (source: Observable<T>): Observable<T> => {
    return multicast(
      new ReplaySubject<T>(bufferSize, windowTime, actualScheduler),
      selector
    )(source);
  };
}