import { executeSchedule } from './executeSchedule';
import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import type { SchedulerLike } from './types/SchedulerLike';
import type { MonoTypeOperatorFunction } from './types/MonoTypeOperatorFunction';

/**
 * Delays the emission of items from the source Observable by a given timeout or until a given Date.
 * @param scheduler The scheduler to use for managing the timers that handle the time-shift for each item.
 * @param delay The delay duration in milliseconds (default: 0).
 * @returns A function that returns an Observable that delays the emissions of the source Observable.
 */
export function observeOn<T>(
  scheduler: SchedulerLike,
  delay: number = 0
): MonoTypeOperatorFunction<T> {
  return operate((source, subscriber) => {
    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          return executeSchedule(
            subscriber,
            scheduler,
            () => {
              return subscriber.next(value);
            },
            delay
          );
        },
        () => {
          return executeSchedule(
            subscriber,
            scheduler,
            () => {
              return subscriber.complete();
            },
            delay
          );
        },
        (error: unknown) => {
          return executeSchedule(
            subscriber,
            scheduler,
            () => {
              return subscriber.error(error);
            },
            delay
          );
        }
      )
    );
  });
}