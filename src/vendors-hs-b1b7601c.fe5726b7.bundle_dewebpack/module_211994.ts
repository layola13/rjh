import { Subject } from 'rxjs';
import { asyncScheduler } from 'rxjs';
import { Subscription } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { arrRemove } from 'rxjs/internal/util/arrRemove';
import { popScheduler } from 'rxjs/internal/util/args';
import { executeSchedule } from 'rxjs/internal/util/executeSchedule';
import { Observable, SchedulerLike, OperatorFunction, ObservedValueOf } from 'rxjs';

interface WindowTimeContext<T> {
  window: Subject<T>;
  subs: Subscription;
  seen: number;
}

export function windowTime<T>(
  windowTimeSpan: number,
  windowCreationInterval?: number | null,
  maxWindowSize?: number,
  scheduler?: SchedulerLike
): OperatorFunction<T, Observable<T>>;

export function windowTime<T>(
  windowTimeSpan: number,
  ...args: unknown[]
): OperatorFunction<T, Observable<T>> {
  const scheduler = popScheduler(args) ?? asyncScheduler;
  const windowCreationInterval = args[0] ?? null;
  const maxWindowSize = (args[1] as number) || Infinity;

  return operate((source, subscriber) => {
    let windowContexts: WindowTimeContext<T>[] | null = [];
    let restartOnClose = false;

    const closeWindow = (context: WindowTimeContext<T>): void => {
      const { window, subs } = context;
      window.complete();
      subs.unsubscribe();
      arrRemove(windowContexts!, context);
      if (restartOnClose) {
        startWindow();
      }
    };

    const startWindow = (): void => {
      if (windowContexts) {
        const windowSubscription = new Subscription();
        subscriber.add(windowSubscription);
        const window = new Subject<T>();
        const context: WindowTimeContext<T> = {
          window,
          subs: windowSubscription,
          seen: 0
        };
        windowContexts.push(context);
        subscriber.next(window.asObservable());
        executeSchedule(
          windowSubscription,
          scheduler,
          () => closeWindow(context),
          windowTimeSpan
        );
      }
    };

    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
      executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
    } else {
      restartOnClose = true;
    }

    startWindow();

    const notifyAllWindows = (callback: (context: WindowTimeContext<T>) => void): void => {
      windowContexts!.slice().forEach(callback);
    };

    const finalizeAll = (callback: (subject: Subject<T>) => void): void => {
      notifyAllWindows((context) => {
        callback(context.window);
      });
      callback(subscriber as any);
      subscriber.unsubscribe();
    };

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          notifyAllWindows((context) => {
            context.window.next(value);
            if (maxWindowSize <= ++context.seen) {
              closeWindow(context);
            }
          });
        },
        () => {
          finalizeAll((window) => {
            window.complete();
          });
        },
        (error: any) => {
          finalizeAll((window) => {
            window.error(error);
          });
        }
      )
    );

    return () => {
      windowContexts = null;
    };
  });
}