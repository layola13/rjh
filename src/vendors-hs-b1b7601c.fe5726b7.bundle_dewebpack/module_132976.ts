import { innerFrom } from './innerFrom';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { operate } from './operate';
import { Observable } from './Observable';
import { ObservableInput, OperatorFunction } from './types';

export function catchError<T, O extends ObservableInput<any>>(
  selector: (error: any, caught: Observable<T>) => O
): OperatorFunction<T, T | ObservedValueOf<O>> {
  return operate((source, subscriber) => {
    let innerSubscription: Subscription | null = null;
    let syncUnsub = false;
    let handledResult: Observable<any>;

    innerSubscription = source.subscribe(
      createOperatorSubscriber(
        subscriber,
        undefined,
        undefined,
        (error: any) => {
          handledResult = innerFrom(
            selector(error, catchError(selector)(source))
          );

          if (innerSubscription) {
            innerSubscription.unsubscribe();
            innerSubscription = null;
            handledResult.subscribe(subscriber);
          } else {
            syncUnsub = true;
          }
        }
      )
    );

    if (syncUnsub) {
      innerSubscription.unsubscribe();
      innerSubscription = null;
      handledResult.subscribe(subscriber);
    }
  });
}

type ObservedValueOf<O> = O extends ObservableInput<infer T> ? T : never;

interface Subscription {
  unsubscribe(): void;
}