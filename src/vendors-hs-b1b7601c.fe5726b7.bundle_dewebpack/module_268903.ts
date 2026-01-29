import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { innerFrom } from './innerFrom';
import { Observable, OperatorFunction, Subscriber, Subscription } from 'rxjs';

export interface ThrottleConfig {
  leading?: boolean;
  trailing?: boolean;
}

/**
 * Throttle operator that emits a value from the source Observable, then ignores 
 * subsequent source values for a duration determined by another Observable.
 * 
 * @param durationSelector Function to generate an Observable that determines the throttle duration
 * @param config Configuration object for leading/trailing behavior
 * @returns Operator function that throttles emissions
 */
export function throttle<T>(
  durationSelector: (value: T) => Observable<unknown>,
  config?: ThrottleConfig
): OperatorFunction<T, T> {
  return operate((source: Observable<T>, subscriber: Subscriber<T>) => {
    const options = config ?? {};
    const leading = options.leading ?? true;
    const trailing = options.trailing !== undefined && options.trailing;

    let hasValue = false;
    let latestValue: T | null = null;
    let throttleSubscription: Subscription | null = null;
    let isComplete = false;

    const handleThrottleComplete = (): void => {
      throttleSubscription?.unsubscribe();
      throttleSubscription = null;
      
      if (trailing) {
        sendLatestValue();
        if (isComplete) {
          subscriber.complete();
        }
      }
    };

    const handleThrottleError = (): void => {
      throttleSubscription = null;
      if (isComplete) {
        subscriber.complete();
      }
    };

    const startThrottle = (value: T): Subscription => {
      return throttleSubscription = innerFrom(durationSelector(value)).subscribe(
        createOperatorSubscriber(
          subscriber,
          handleThrottleComplete,
          handleThrottleError
        )
      );
    };

    const sendLatestValue = (): void => {
      if (hasValue) {
        hasValue = false;
        const valueToEmit = latestValue!;
        latestValue = null;
        subscriber.next(valueToEmit);
        
        if (!isComplete) {
          startThrottle(valueToEmit);
        }
      }
    };

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          hasValue = true;
          latestValue = value;

          if (!throttleSubscription || throttleSubscription.closed) {
            if (leading) {
              sendLatestValue();
            } else {
              startThrottle(value);
            }
          }
        },
        () => {
          isComplete = true;
          if (!(trailing && hasValue && throttleSubscription) || throttleSubscription.closed) {
            subscriber.complete();
          }
        }
      )
    );
  });
}