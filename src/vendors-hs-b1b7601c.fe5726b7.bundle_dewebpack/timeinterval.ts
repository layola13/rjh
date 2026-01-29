import { asyncScheduler, SchedulerLike } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/createOperatorSubscriber';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

export class TimeInterval<T> {
  constructor(
    public value: T,
    public interval: number
  ) {}
}

export function timeInterval<T>(
  scheduler: SchedulerLike = asyncScheduler
): MonoTypeOperatorFunction<TimeInterval<T>> {
  return operate((source: Observable<T>, subscriber) => {
    let lastTime = scheduler.now();

    source.subscribe(
      createOperatorSubscriber(subscriber, (value: T) => {
        const currentTime = scheduler.now();
        const intervalDuration = currentTime - lastTime;
        lastTime = currentTime;
        subscriber.next(new TimeInterval(value, intervalDuration));
      })
    );
  });
}