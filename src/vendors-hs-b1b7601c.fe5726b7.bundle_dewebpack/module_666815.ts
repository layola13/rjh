import { Subject, Observable, Subscription, ObservableInput, OperatorFunction } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { noop } from 'rxjs/internal/util/noop';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';

export function window<T>(windowBoundaries: ObservableInput<unknown>): OperatorFunction<T, Observable<T>> {
  return operate((source: Observable<T>, subscriber: Subscription & { next: (value: Observable<T>) => void; error: (err: unknown) => void; complete: () => void }) => {
    let currentWindow: Subject<T> | null = new Subject<T>();
    subscriber.next(currentWindow.asObservable());

    const handleError = (err: unknown): void => {
      currentWindow?.error(err);
      subscriber.error(err);
    };

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          currentWindow?.next(value);
        },
        () => {
          currentWindow?.complete();
          subscriber.complete();
        },
        handleError
      )
    );

    innerFrom(windowBoundaries).subscribe(
      createOperatorSubscriber(
        subscriber,
        () => {
          currentWindow?.complete();
          currentWindow = new Subject<T>();
          subscriber.next(currentWindow.asObservable());
        },
        noop,
        handleError
      )
    );

    return (): void => {
      currentWindow?.unsubscribe();
      currentWindow = null;
    };
  });
}