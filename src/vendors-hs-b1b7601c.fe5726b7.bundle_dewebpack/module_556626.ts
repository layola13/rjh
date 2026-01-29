import { isFunction } from './isFunction';
import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { identity } from './identity';
import { MonoTypeOperatorFunction, Observer, ObservableInput } from './types';

interface TapObserver<T> extends Partial<Observer<T>> {
  subscribe?(): void;
  unsubscribe?(): void;
  finalize?(): void;
}

export function tap<T>(
  observerOrNext?: Partial<TapObserver<T>> | ((value: T) => void) | null,
  error?: ((error: unknown) => void) | null,
  complete?: (() => void) | null
): MonoTypeOperatorFunction<T> {
  const tapObserver: TapObserver<T> | undefined = 
    isFunction(observerOrNext) || error || complete
      ? {
          next: observerOrNext as ((value: T) => void) | undefined,
          error,
          complete
        }
      : observerOrNext;

  if (!tapObserver) {
    return identity;
  }

  return operate((source, subscriber) => {
    tapObserver.subscribe?.call(tapObserver);

    let isUnsubscribed = true;

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          tapObserver.next?.call(tapObserver, value);
          subscriber.next(value);
        },
        () => {
          isUnsubscribed = false;
          tapObserver.complete?.call(tapObserver);
          subscriber.complete();
        },
        (err: unknown) => {
          isUnsubscribed = false;
          tapObserver.error?.call(tapObserver, err);
          subscriber.error(err);
        },
        () => {
          if (isUnsubscribed) {
            tapObserver.unsubscribe?.call(tapObserver);
          }
          tapObserver.finalize?.call(tapObserver);
        }
      )
    );
  });
}