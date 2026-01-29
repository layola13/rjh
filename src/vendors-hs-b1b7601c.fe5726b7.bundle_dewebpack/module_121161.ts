import { asyncScheduler, SchedulerLike } from 'rxjs';
import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';

/**
 * Emits a notification from the source Observable only after a particular time span has passed without another source emission.
 * 
 * @param dueTime The timeout duration in milliseconds (or the time unit determined by the scheduler's clock) for the window of time required to wait for emission silence before emitting the most recent source value.
 * @param scheduler The scheduler to use for managing the timers that handle the timeout for each value.
 * @returns A function that returns an Observable that delays the emissions of the source Observable by the specified duration.
 */
export function debounceTime<T>(
  dueTime: number,
  scheduler: SchedulerLike = asyncScheduler
): MonoTypeOperatorFunction<T> {
  return operate((source, subscriber) => {
    let activeTask: ReturnType<SchedulerLike['schedule']> | null = null;
    let lastValue: T | null = null;
    let lastTime: number | null = null;

    const emit = (): void => {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;

        const valueToEmit = lastValue;
        lastValue = null;
        subscriber.next(valueToEmit!);
      }
    };

    function emitWhenReady(this: any): void {
      const targetTime = lastTime! + dueTime;
      const currentTime = scheduler.now();

      if (currentTime < targetTime) {
        activeTask = this.schedule(undefined, targetTime - currentTime);
        subscriber.add(activeTask);
        return;
      }

      emit();
    }

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          lastValue = value;
          lastTime = scheduler.now();

          if (!activeTask) {
            activeTask = scheduler.schedule(emitWhenReady, dueTime);
            subscriber.add(activeTask);
          }
        },
        () => {
          emit();
          subscriber.complete();
        },
        undefined,
        () => {
          lastValue = null;
          activeTask = null;
        }
      )
    );
  });
}