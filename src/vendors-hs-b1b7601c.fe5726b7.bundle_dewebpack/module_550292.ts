import { innerFrom } from './innerFrom';
import { Subject } from './Subject';
import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { Observable } from './Observable';
import { Subscription } from './Subscription';
import { OperatorFunction } from './types';

export function repeatWhen<T>(
  notifier: (notifications: Observable<void>) => Observable<unknown>
): OperatorFunction<T, T> {
  return operate((source: Observable<T>, subscriber) => {
    let innerSubscription: Subscription | null = null;
    let notificationSubject: Subject<void> | undefined;
    let shouldRepeat = false;
    let notifierComplete = false;
    let sourceComplete = false;

    const checkComplete = (): boolean => {
      if (sourceComplete && notifierComplete) {
        subscriber.complete();
        return true;
      }
      return false;
    };

    const subscribeToSource = (): void => {
      sourceComplete = false;
      innerSubscription = source.subscribe(
        createOperatorSubscriber(
          subscriber,
          undefined,
          () => {
            sourceComplete = true;
            if (!checkComplete()) {
              if (!notificationSubject) {
                notificationSubject = new Subject<void>();
                innerFrom(notifier(notificationSubject)).subscribe(
                  createOperatorSubscriber(
                    subscriber,
                    () => {
                      if (innerSubscription) {
                        subscribeToSource();
                      } else {
                        shouldRepeat = true;
                      }
                    },
                    () => {
                      notifierComplete = true;
                      checkComplete();
                    }
                  )
                );
              }
              notificationSubject.next();
            }
          }
        )
      );

      if (shouldRepeat) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
        shouldRepeat = false;
        subscribeToSource();
      }
    };

    subscribeToSource();
  });
}