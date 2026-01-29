import { Subject } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { Observable, OperatorFunction } from 'rxjs';

/**
 * Counts the number of emissions and creates windows based on count intervals.
 * 
 * @param windowSize - The maximum size of each window
 * @param startWindowEvery - The interval at which to start new windows (defaults to windowSize)
 * @returns An operator function that transforms the source observable
 */
export function windowCount<T>(
  windowSize: number,
  startWindowEvery: number = 0
): OperatorFunction<T, Observable<T>> {
  const startInterval = startWindowEvery > 0 ? startWindowEvery : windowSize;

  return operate((source: Observable<T>, subscriber) => {
    const windows: Subject<T>[] = [new Subject<T>()];
    let count = 0;

    subscriber.next(windows[0].asObservable());

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          for (const window of windows) {
            window.next(value);
          }

          const windowsToClose = count - windowSize + 1;
          if (windowsToClose >= 0 && windowsToClose % startInterval === 0) {
            windows.shift()?.complete();
          }

          ++count;
          if (count % startInterval === 0) {
            const newWindow = new Subject<T>();
            windows.push(newWindow);
            subscriber.next(newWindow.asObservable());
          }
        },
        () => {
          while (windows.length > 0) {
            windows.shift()?.complete();
          }
          subscriber.complete();
        },
        (error: unknown) => {
          while (windows.length > 0) {
            windows.shift()?.error(error);
          }
          subscriber.error(error);
        },
        () => {
          windows.length = 0;
        }
      )
    );
  });
}