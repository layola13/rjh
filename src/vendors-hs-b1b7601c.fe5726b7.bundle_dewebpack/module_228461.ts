import { Observable } from 'rxjs';
import type { SchedulerLike } from 'rxjs';

type ErrorFactory<T = Error> = T | (() => T);

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function throwError<T = never>(
  errorFactory: ErrorFactory,
  scheduler?: SchedulerLike
): Observable<T> {
  const errorFactoryFn = isFunction(errorFactory)
    ? errorFactory
    : () => errorFactory;

  const executeThrow = (subscriber: { error: (err: unknown) => void }) => {
    return subscriber.error(errorFactoryFn());
  };

  return new Observable<T>(
    scheduler
      ? (subscriber) => scheduler.schedule(executeThrow, 0, subscriber)
      : executeThrow
  );
}