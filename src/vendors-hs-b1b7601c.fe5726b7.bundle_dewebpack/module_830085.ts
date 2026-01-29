import { Observable } from 'rxjs';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { Subject } from 'rxjs/internal/Subject';
import { operate } from 'rxjs/internal/util/operate';
import { OperatorSubscriber, createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { ObservableInput, OperatorFunction } from 'rxjs/internal/types';

export interface GroupByOptions<K, T, R> {
  element?: (value: T) => R;
  duration?: (grouped: GroupedObservable<K, R>) => ObservableInput<unknown>;
  connector?: () => Subject<R>;
}

export interface GroupedObservable<K, T> extends Observable<T> {
  key: K;
}

export function groupBy<T, K, R = T>(
  keySelector: (value: T) => K,
  elementOrOptions?: ((value: T) => R) | GroupByOptions<K, T, R>,
  duration?: (grouped: GroupedObservable<K, R>) => ObservableInput<unknown>,
  connector?: () => Subject<R>
): OperatorFunction<T, GroupedObservable<K, R>> {
  return operate((source, subscriber) => {
    let elementSelector: ((value: T) => R) | undefined;

    if (elementOrOptions && typeof elementOrOptions !== 'function') {
      duration = elementOrOptions.duration;
      elementSelector = elementOrOptions.element;
      connector = elementOrOptions.connector;
    } else {
      elementSelector = elementOrOptions as ((value: T) => R) | undefined;
    }

    const groups = new Map<K, Subject<R>>();

    const notifyAll = (callback: (observer: typeof subscriber) => void): void => {
      groups.forEach(callback);
      callback(subscriber);
    };

    const handleError = (error: unknown): void => {
      notifyAll((observer) => observer.error(error));
    };

    let activeGroupCount = 0;
    let isComplete = false;

    const operatorSubscriber = new OperatorSubscriber(
      subscriber,
      (value: T) => {
        try {
          const key = keySelector(value);
          let group = groups.get(key);

          if (!group) {
            group = connector ? connector() : new Subject<R>();
            groups.set(key, group);

            const groupedObservable = new Observable<R>((observer) => {
              activeGroupCount++;
              const subscription = group!.subscribe(observer);
              return () => {
                subscription.unsubscribe();
                activeGroupCount--;
                if (activeGroupCount === 0 && isComplete) {
                  operatorSubscriber.unsubscribe();
                }
              };
            }) as GroupedObservable<K, R>;

            groupedObservable.key = key;

            subscriber.next(groupedObservable);

            if (duration) {
              const durationSubscriber = createOperatorSubscriber(
                group,
                () => {
                  group!.complete();
                  durationSubscriber?.unsubscribe();
                },
                undefined,
                undefined,
                () => groups.delete(key)
              );

              operatorSubscriber.add(
                innerFrom(duration(groupedObservable)).subscribe(durationSubscriber)
              );
            }
          }

          const element = elementSelector ? elementSelector(value) : (value as unknown as R);
          group.next(element);
        } catch (error) {
          handleError(error);
        }
      },
      () => {
        notifyAll((observer) => observer.complete());
      },
      handleError,
      () => groups.clear(),
      () => {
        isComplete = true;
        return activeGroupCount === 0;
      }
    );

    source.subscribe(operatorSubscriber);
  });
}