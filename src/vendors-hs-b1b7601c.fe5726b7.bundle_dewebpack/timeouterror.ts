export class TimeoutError extends Error {
  public readonly name = 'TimeoutError';
  public readonly info: TimeoutInfo | null;

  constructor(info: TimeoutInfo | null = null) {
    super('Timeout has occurred');
    this.info = info;
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

interface TimeoutInfo {
  meta: unknown;
  lastValue: unknown;
  seen: number;
}

interface TimeoutConfig<T, M = unknown> {
  first?: number | Date;
  each?: number;
  with?: (info: TimeoutInfo) => ObservableInput<T>;
  scheduler?: SchedulerLike;
  meta?: M;
}

type ObservableInput<T> = Observable<T> | Promise<T> | Iterable<T>;

interface SchedulerLike {
  now(): number;
  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription;
}

interface SchedulerAction<T> extends Subscription {
  schedule(state?: T, delay?: number): Subscription;
}

interface Subscription {
  unsubscribe(): void;
  closed: boolean;
}

interface Subscriber<T> {
  next(value: T): void;
  error(err: unknown): void;
  complete(): void;
}

interface Observable<T> {
  subscribe(subscriber: Subscriber<T>): Subscription;
}

type OperatorFunction<T, R> = (source: Observable<T>) => Observable<R>;

function defaultTimeoutHandler(info: TimeoutInfo): never {
  throw new TimeoutError(info);
}

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function timeout<T, M = unknown>(
  config: number | Date | TimeoutConfig<T, M>,
  scheduler?: SchedulerLike
): OperatorFunction<T, T> {
  const normalizedConfig: TimeoutConfig<T, M> = isValidDate(config)
    ? { first: config }
    : typeof config === 'number'
    ? { each: config }
    : config;

  const {
    first = null,
    each = null,
    with: timeoutHandler = defaultTimeoutHandler,
    scheduler: configScheduler = scheduler ?? asyncScheduler,
    meta = null,
  } = normalizedConfig;

  if (first == null && each == null) {
    throw new TypeError('No timeout provided.');
  }

  return operate((source: Observable<T>, subscriber: Subscriber<T>) => {
    let sourceSubscription: Subscription;
    let timeoutSubscription: Subscription | null = null;
    let lastValue: T | null = null;
    let seenCount = 0;

    const scheduleTimeout = (delay: number): void => {
      timeoutSubscription = executeSchedule(
        subscriber,
        configScheduler,
        () => {
          try {
            sourceSubscription.unsubscribe();
            const timeoutObservable = innerFrom(
              timeoutHandler({
                meta: meta as unknown,
                lastValue: lastValue as unknown,
                seen: seenCount,
              })
            );
            timeoutObservable.subscribe(subscriber);
          } catch (error) {
            subscriber.error(error);
          }
        },
        delay
      );
    };

    sourceSubscription = source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          timeoutSubscription?.unsubscribe();
          seenCount++;
          subscriber.next((lastValue = value));
          if (each && each > 0) {
            scheduleTimeout(each);
          }
        },
        undefined,
        undefined,
        () => {
          if (!timeoutSubscription?.closed) {
            timeoutSubscription?.unsubscribe();
          }
          lastValue = null;
        }
      )
    );

    if (!seenCount) {
      const initialDelay =
        first != null
          ? typeof first === 'number'
            ? first
            : +first - configScheduler.now()
          : each!;
      scheduleTimeout(initialDelay);
    }
  });
}

declare const asyncScheduler: SchedulerLike;

declare function operate<T, R>(
  operator: (source: Observable<T>, subscriber: Subscriber<R>) => void
): OperatorFunction<T, R>;

declare function createOperatorSubscriber<T>(
  destination: Subscriber<T>,
  onNext?: (value: T) => void,
  onComplete?: () => void,
  onError?: (err: unknown) => void,
  onFinalize?: () => void
): Subscriber<T>;

declare function executeSchedule(
  subscriber: Subscriber<unknown>,
  scheduler: SchedulerLike,
  work: () => void,
  delay: number
): Subscription;

declare function innerFrom<T>(input: ObservableInput<T>): Observable<T>;