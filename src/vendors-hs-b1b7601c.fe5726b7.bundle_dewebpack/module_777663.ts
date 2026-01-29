import { Subject } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/createOperatorSubscriber';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { Observable, ObservableInput, OperatorFunction } from 'rxjs';

/**
 * Creates windows of values from the source observable, where each window is emitted
 * when the provided closing notifier emits.
 * 
 * @param closingSelector - A function that returns an observable that signals when to close the current window
 * @returns An operator function that transforms the source observable into an observable of windowed observables
 */
export function windowWhen<T>(
  closingSelector: () => ObservableInput<unknown>
): OperatorFunction<T, Observable<T>> {
  return operate((source, subscriber) => {
    let window: Subject<T> | null;
    let closingSubscriber: ReturnType<typeof createOperatorSubscriber> | null;

    const handleError = (error: unknown): void => {
      if (window) {
        window.error(error);
      }
      subscriber.error(error);
    };

    const openWindow = (): void => {
      closingSubscriber?.unsubscribe();
      window?.complete();

      window = new Subject<T>();
      subscriber.next(window.asObservable());

      let closingNotifier: Observable<unknown>;
      try {
        closingNotifier = innerFrom(closingSelector());
      } catch (error) {
        handleError(error);
        return;
      }

      closingNotifier.subscribe(
        closingSubscriber = createOperatorSubscriber(
          subscriber,
          openWindow,
          openWindow,
          handleError
        )
      );
    };

    openWindow();

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => window?.next(value),
        () => {
          window?.complete();
          subscriber.complete();
        },
        handleError,
        () => {
          closingSubscriber?.unsubscribe();
          window = null;
        }
      )
    );
  });
}