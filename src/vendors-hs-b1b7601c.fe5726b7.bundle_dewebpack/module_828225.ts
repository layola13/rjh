import { operate } from './internal/operators/operate';
import { createOperatorSubscriber } from './internal/operators/createOperatorSubscriber';
import { identity } from './internal/util/identity';
import { timer } from './internal/observable/timer';
import { innerFrom } from './internal/observable/innerFrom';
import { MonoTypeOperatorFunction, ObservableInput } from './types';

interface RetryConfig {
  count?: number;
  delay?: number | ((error: any, retryCount: number) => ObservableInput<any>);
  resetOnSuccess?: boolean;
}

export function retry<T>(count: number): MonoTypeOperatorFunction<T>;
export function retry<T>(config: RetryConfig): MonoTypeOperatorFunction<T>;
export function retry<T>(configOrCount: number | RetryConfig = Infinity): MonoTypeOperatorFunction<T> {
  const config: RetryConfig = 
    configOrCount && typeof configOrCount === 'object' 
      ? configOrCount 
      : { count: configOrCount };

  const maxRetries = config.count ?? Infinity;
  const delay = config.delay;
  const resetOnSuccess = config.resetOnSuccess ?? false;

  if (maxRetries <= 0) {
    return identity;
  }

  return operate((source, subscriber) => {
    let innerSubscription: any = null;
    let retryCount = 0;

    const subscribeToSource = (): void => {
      let isComplete = false;

      innerSubscription = source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value: T) => {
            if (resetOnSuccess) {
              retryCount = 0;
            }
            subscriber.next(value);
          },
          undefined,
          (error: any) => {
            if (retryCount++ < maxRetries) {
              const resubscribe = (): void => {
                if (innerSubscription) {
                  innerSubscription.unsubscribe();
                  innerSubscription = null;
                  subscribeToSource();
                } else {
                  isComplete = true;
                }
              };

              if (delay != null) {
                const delayObservable = 
                  typeof delay === 'number' 
                    ? timer(delay) 
                    : innerFrom(delay(error, retryCount));

                const delaySubscriber = createOperatorSubscriber(
                  subscriber,
                  () => {
                    delaySubscriber.unsubscribe();
                    resubscribe();
                  },
                  () => {
                    subscriber.complete();
                  }
                );

                delayObservable.subscribe(delaySubscriber);
              } else {
                resubscribe();
              }
            } else {
              subscriber.error(error);
            }
          }
        )
      );

      if (isComplete) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
        subscribeToSource();
      }
    };

    subscribeToSource();
  });
}