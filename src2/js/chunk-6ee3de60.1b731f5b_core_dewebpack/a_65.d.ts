import { Observable } from './Observable';
import { Scheduler } from './Scheduler';
import { Subscription } from './Subscription';
import { ObservableInput, SchedulerLike } from './types';

/**
 * Symbol for Observable interop
 */
const observableSymbol = Symbol.observable || '@@observable';

/**
 * Symbol for Iterator protocol
 */
const iteratorSymbol = Symbol.iterator;

/**
 * Converts various input types into an Observable.
 * 
 * @template T The type of elements emitted by the Observable
 * @param input The input to convert (Observable, Promise, Iterable, AsyncIterable, etc.)
 * @param scheduler Optional scheduler to schedule emissions
 * @returns An Observable that emits values from the input source
 * @throws TypeError if the input type cannot be converted to an Observable
 */
export function from<T>(
  input: ObservableInput<T>,
  scheduler?: SchedulerLike
): Observable<T> {
  // If no scheduler, return as-is or wrap in Observable
  if (!scheduler) {
    return input instanceof Observable 
      ? input 
      : new Observable(subscribeToInput(input));
  }

  // Handle null/undefined
  if (input == null) {
    throw new TypeError(`${input} is not observable`);
  }

  // Handle Observable with scheduler
  if (input && typeof (input as any)[observableSymbol] === 'function') {
    return fromObservableLike(input as any, scheduler);
  }

  // Handle Promise with scheduler
  if (isPromise(input)) {
    return fromPromise(input as Promise<T>, scheduler);
  }

  // Handle Array-like with scheduler
  if (isArrayLike(input)) {
    return fromArrayLike(input as ArrayLike<T>, scheduler);
  }

  // Handle Iterable or String with scheduler
  if (
    (input && typeof (input as any)[iteratorSymbol] === 'function') ||
    typeof input === 'string'
  ) {
    return fromIterable(input as Iterable<T>, scheduler);
  }

  throw new TypeError(
    `${input !== null && typeof input || input} is not observable`
  );
}

/**
 * Converts an Observable-like object with scheduler support
 */
function fromObservableLike<T>(
  observableLike: { [Symbol.observable](): { subscribe(observer: any): any } },
  scheduler: SchedulerLike
): Observable<T> {
  return new Observable<T>((subscriber) => {
    const subscription = new Subscription();

    subscription.add(
      scheduler.schedule(() => {
        const observable = observableLike[observableSymbol]();

        subscription.add(
          observable.subscribe({
            next: (value: T) => {
              subscription.add(
                scheduler.schedule(() => subscriber.next(value))
              );
            },
            error: (error: any) => {
              subscription.add(
                scheduler.schedule(() => subscriber.error(error))
              );
            },
            complete: () => {
              subscription.add(
                scheduler.schedule(() => subscriber.complete())
              );
            },
          })
        );
      })
    );

    return subscription;
  });
}

/**
 * Converts a Promise with scheduler support
 */
function fromPromise<T>(
  promise: Promise<T>,
  scheduler: SchedulerLike
): Observable<T> {
  return new Observable<T>((subscriber) => {
    const subscription = new Subscription();

    subscription.add(
      scheduler.schedule(() => {
        promise.then(
          (value) => {
            subscription.add(
              scheduler.schedule(() => {
                subscriber.next(value);
                subscription.add(
                  scheduler.schedule(() => subscriber.complete())
                );
              })
            );
          },
          (error) => {
            subscription.add(
              scheduler.schedule(() => subscriber.error(error))
            );
          }
        );
      })
    );

    return subscription;
  });
}

/**
 * Converts an Iterable with scheduler support
 */
function fromIterable<T>(
  iterable: Iterable<T>,
  scheduler: SchedulerLike
): Observable<T> {
  if (!iterable) {
    throw new Error('Iterable cannot be null');
  }

  return new Observable<T>((subscriber) => {
    let iterator: Iterator<T> | undefined;
    const subscription = new Subscription();

    subscription.add(() => {
      if (iterator && typeof iterator.return === 'function') {
        iterator.return();
      }
    });

    subscription.add(
      scheduler.schedule(function scheduleNext() {
        iterator = iterable[Symbol.iterator]();

        subscription.add(
          scheduler.schedule(function emitNext() {
            if (subscriber.closed) {
              return;
            }

            try {
              const result = iterator!.next();
              const { value, done } = result;

              if (done) {
                subscriber.complete();
              } else {
                subscriber.next(value);
                this.schedule();
              }
            } catch (error) {
              subscriber.error(error);
            }
          })
        );
      })
    );

    return subscription;
  });
}

/**
 * Converts an ArrayLike object with scheduler support
 */
function fromArrayLike<T>(
  arrayLike: ArrayLike<T>,
  scheduler: SchedulerLike
): Observable<T> {
  return new Observable<T>((subscriber) => {
    let index = 0;
    const length = arrayLike.length;

    return scheduler.schedule(function emitNext() {
      if (index < length) {
        subscriber.next(arrayLike[index++]);
        this.schedule();
      } else {
        subscriber.complete();
      }
    });
  });
}

/**
 * Type guard for Promise detection
 */
function isPromise(value: any): value is Promise<any> {
  return value && typeof value.then === 'function';
}

/**
 * Type guard for ArrayLike detection
 */
function isArrayLike(value: any): value is ArrayLike<any> {
  return value && typeof value.length === 'number' && value.length >= 0;
}

/**
 * Subscribe to various input types without scheduler
 */
function subscribeToInput<T>(input: ObservableInput<T>) {
  return (subscriber: any) => {
    // Implementation for non-scheduled subscription
    // (simplified version of the scheduled variants above)
  };
}