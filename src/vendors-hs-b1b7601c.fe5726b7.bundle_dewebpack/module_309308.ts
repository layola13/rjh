import { innerFrom } from './innerFrom';
import { Subject } from './Subject';
import { SafeSubscriber } from './SafeSubscriber';
import { operate } from './operate';

interface ShareConfig<T> {
  connector?: () => Subject<T>;
  resetOnError?: boolean;
  resetOnComplete?: boolean;
  resetOnRefCountZero?: boolean;
}

function scheduleReset(
  resetFn: () => void,
  condition: boolean | unknown,
  ...args: unknown[]
): void {
  if (condition === true) {
    resetFn();
  } else if (condition !== false) {
    const subscriber = new SafeSubscriber({
      next: () => {
        subscriber.unsubscribe();
        resetFn();
      }
    });
    innerFrom((condition as Function)(...args)).subscribe(subscriber);
  }
}

export function share<T>(config: ShareConfig<T> = {}) {
  const {
    connector = () => new Subject<T>(),
    resetOnError = true,
    resetOnComplete = true,
    resetOnRefCountZero = true
  } = config;

  return (source: Observable<T>) => {
    let sourceSubscription: SafeSubscriber<T> | undefined;
    let resetSubscription: Subscription | undefined;
    let sharedSubject: Subject<T> | undefined;
    let refCount = 0;
    let hasError = false;
    let hasCompleted = false;

    const unsubscribeReset = () => {
      resetSubscription?.unsubscribe();
      resetSubscription = undefined;
    };

    const reset = () => {
      unsubscribeReset();
      sourceSubscription = sharedSubject = undefined;
      hasError = hasCompleted = false;
    };

    const resetAndUnsubscribe = () => {
      const subscription = sourceSubscription;
      reset();
      subscription?.unsubscribe();
    };

    return operate((sourceObservable, subscriber) => {
      refCount++;
      
      if (!hasCompleted && !hasError) {
        unsubscribeReset();
      }

      const subject = sharedSubject = sharedSubject ?? connector();

      subscriber.add(() => {
        if (--refCount === 0 && !hasCompleted && !hasError) {
          resetSubscription = scheduleReset(
            resetAndUnsubscribe,
            resetOnRefCountZero
          );
        }
      });

      subject.subscribe(subscriber);

      if (!sourceSubscription && refCount > 0) {
        sourceSubscription = new SafeSubscriber({
          next: (value) => subject.next(value),
          error: (err) => {
            hasError = true;
            unsubscribeReset();
            resetSubscription = scheduleReset(reset, resetOnError, err);
            subject.error(err);
          },
          complete: () => {
            hasCompleted = true;
            unsubscribeReset();
            resetSubscription = scheduleReset(reset, resetOnComplete);
            subject.complete();
          }
        });
        innerFrom(sourceObservable).subscribe(sourceSubscription);
      }
    })(source);
  };
}