import { innerFrom } from './innerFrom';
import { Subject } from './Subject';
import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { Observable } from './Observable';
import { MonoTypeOperatorFunction, ObservableInput, OperatorFunction } from './types';

export function retryWhen<T>(
  notifier: (errors: Observable<unknown>) => ObservableInput<unknown>
): MonoTypeOperatorFunction<T> {
  return operate((source: Observable<T>, subscriber) => {
    let innerSubscription: any;
    let errorSubject: Subject<unknown> | undefined;
    let shouldRetry = false;

    const subscribeToSource = (): void => {
      innerSubscription = source.subscribe(
        createOperatorSubscriber(
          subscriber,
          undefined,
          undefined,
          (error: unknown) => {
            if (!errorSubject) {
              errorSubject = new Subject<unknown>();
              innerFrom(notifier(errorSubject)).subscribe(
                createOperatorSubscriber(subscriber, () => {
                  return innerSubscription ? subscribeToSource() : (shouldRetry = true);
                })
              );
            }
            if (errorSubject) {
              errorSubject.next(error);
            }
          }
        )
      );

      if (shouldRetry) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
        shouldRetry = false;
        subscribeToSource();
      }
    };

    subscribeToSource();
  });
}