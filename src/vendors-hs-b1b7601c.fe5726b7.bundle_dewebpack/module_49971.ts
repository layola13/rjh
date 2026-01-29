import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { noop } from 'rxjs/internal/util/noop';
import { arrRemove } from 'rxjs/internal/util/arrRemove';
import { Observable, ObservableInput, OperatorFunction } from 'rxjs';

/**
 * Operator that opens and closes windows based on emissions from opening and closing observables.
 * 
 * @param openings - An observable that triggers the opening of a new window
 * @param closingSelector - A function that takes the opening value and returns an observable that signals when to close the window
 * @returns An operator function that returns an observable of windowed observables
 */
export function windowToggle<T, O>(
  openings: ObservableInput<O>,
  closingSelector: (openValue: O) => ObservableInput<unknown>
): OperatorFunction<T, Observable<T>> {
  return operate((source: Observable<T>, subscriber) => {
    const windows: Subject<T>[] = [];

    const handleError = (error: unknown): void => {
      while (windows.length > 0) {
        windows.shift()?.error(error);
      }
      subscriber.error(error);
    };

    innerFrom(openings).subscribe(
      createOperatorSubscriber(
        subscriber,
        (openValue: O) => {
          const window = new Subject<T>();
          windows.push(window);

          const closingSubscription = new Subscription();

          let closingNotifier: Observable<unknown>;
          try {
            closingNotifier = innerFrom(closingSelector(openValue));
          } catch (error) {
            handleError(error);
            return;
          }

          subscriber.next(window.asObservable());

          closingSubscription.add(
            closingNotifier.subscribe(
              createOperatorSubscriber(
                subscriber,
                () => {
                  arrRemove(windows, window);
                  window.complete();
                  closingSubscription.unsubscribe();
                },
                noop,
                handleError
              )
            )
          );
        },
        noop
      )
    );

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          const windowsCopy = windows.slice();
          for (const window of windowsCopy) {
            window.next(value);
          }
        },
        () => {
          while (windows.length > 0) {
            windows.shift()?.complete();
          }
          subscriber.complete();
        },
        handleError,
        () => {
          while (windows.length > 0) {
            windows.shift()?.unsubscribe();
          }
        }
      )
    );
  });
}