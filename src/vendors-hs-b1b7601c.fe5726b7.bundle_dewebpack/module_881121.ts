import { Observable } from 'rxjs';
import { argsArgArrayOrObject } from 'rxjs/internal/util/argsArgArrayOrObject';
import { from } from 'rxjs';
import { identity } from 'rxjs/internal/util/identity';
import { mapOneOrManyArgs } from 'rxjs/internal/operators/mapOneOrManyArgs';
import { popScheduler, popResultSelector } from 'rxjs/internal/util/args';
import { createObject } from 'rxjs/internal/util/createObject';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { executeSchedule } from 'rxjs/internal/util/executeSchedule';

export type CombineLatestProjector<T, R> = (...values: T[]) => R;

export interface CombineLatestInitOptions<T, R> {
  scheduler?: SchedulerLike;
  project?: CombineLatestProjector<T, R>;
}

/**
 * Combines multiple observables to create an observable whose values are calculated 
 * from the latest values of each of its input observables.
 * 
 * @param sources - Array of source observables to combine
 * @param scheduler - Optional scheduler to coordinate subscriptions
 * @param project - Optional projection function to transform combined values
 * @returns An observable that emits arrays of the latest values from all sources
 */
export function combineLatestInit<T, R = T[]>(
  sources: ObservableInput<T>[],
  scheduler?: SchedulerLike,
  project: CombineLatestProjector<T, R> = identity as any
): (subscriber: Subscriber<R>) => void {
  return (subscriber: Subscriber<R>) => {
    maybeSchedule(
      scheduler,
      () => {
        const sourceCount = sources.length;
        const values: T[] = new Array(sourceCount);
        let activeSubscriptions = sourceCount;
        let remainingFirstValues = sourceCount;

        const subscribeToSource = (sourceIndex: number): void => {
          maybeSchedule(
            scheduler,
            () => {
              const source = from(sources[sourceIndex], scheduler);
              let hasEmitted = false;

              source.subscribe(
                createOperatorSubscriber(
                  subscriber,
                  (value: T) => {
                    values[sourceIndex] = value;
                    if (!hasEmitted) {
                      hasEmitted = true;
                      remainingFirstValues--;
                    }
                    if (remainingFirstValues === 0) {
                      subscriber.next(project(values.slice() as any) as R);
                    }
                  },
                  () => {
                    activeSubscriptions--;
                    if (activeSubscriptions === 0) {
                      subscriber.complete();
                    }
                  }
                )
              );
            },
            subscriber
          );
        };

        for (let index = 0; index < sourceCount; index++) {
          subscribeToSource(index);
        }
      },
      subscriber
    );
  };
}

/**
 * Executes a function immediately or schedules it based on the provided scheduler.
 * 
 * @param scheduler - Optional scheduler for deferred execution
 * @param work - Function to execute
 * @param subscription - Subscription context for scheduled work
 */
function maybeSchedule(
  scheduler: SchedulerLike | undefined,
  work: () => void,
  subscription: Subscription
): void {
  if (scheduler) {
    executeSchedule(subscription, scheduler, work);
  } else {
    work();
  }
}

/**
 * Combines multiple observables into a single observable that emits arrays of values.
 * 
 * @param args - Variable arguments containing observables, optional scheduler, and optional result selector
 * @returns Observable that emits combined values from all input observables
 */
export function combineLatest<T, R>(...args: any[]): Observable<R> {
  const scheduler = popScheduler(args);
  const resultSelector = popResultSelector(args);
  const { args: observableInputs, keys } = argsArgArrayOrObject(args);

  if (observableInputs.length === 0) {
    return from([], scheduler) as Observable<R>;
  }

  const result = new Observable<any>(
    combineLatestInit(
      observableInputs,
      scheduler,
      keys
        ? (values: any[]) => createObject(keys, values)
        : identity
    )
  );

  return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
}

export { combineLatestInit as combineLatestInit };
export { combineLatest as combineLatest };