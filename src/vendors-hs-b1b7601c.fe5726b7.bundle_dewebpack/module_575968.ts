export interface GenerateOptions<T, S> {
  initialState: S;
  condition: (state: S) => boolean;
  iterate: (state: S) => S;
  resultSelector?: (state: S) => T;
  scheduler?: Scheduler;
}

interface Scheduler {
  schedule<T>(work: () => T): void;
}

interface Observable<T> {
  subscribe(observer: Observer<T>): Subscription;
}

interface Observer<T> {
  next(value: T): void;
  error(error: unknown): void;
  complete(): void;
}

interface Subscription {
  unsubscribe(): void;
}

function identity<T>(value: T): T {
  return value;
}

function isScheduler(value: unknown): value is Scheduler {
  return value != null && typeof (value as Scheduler).schedule === 'function';
}

function defer<T>(observableFactory: () => Observable<T>): Observable<T> {
  return {
    subscribe(observer: Observer<T>): Subscription {
      const observable = observableFactory();
      return observable.subscribe(observer);
    }
  };
}

function scheduleIterable<T>(
  iterable: Iterable<T>,
  scheduler: Scheduler
): Observable<T> {
  return {
    subscribe(observer: Observer<T>): Subscription {
      scheduler.schedule(() => {
        try {
          for (const value of iterable) {
            observer.next(value);
          }
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      });
      return { unsubscribe: () => {} };
    }
  };
}

export function generate<T, S>(options: GenerateOptions<T, S>): Observable<T>;
export function generate<T, S>(
  initialState: S,
  condition: (state: S) => boolean,
  iterate: (state: S) => S,
  resultSelector?: (state: S) => T,
  scheduler?: Scheduler
): Observable<T>;
export function generate<T, S>(
  initialStateOrOptions: S | GenerateOptions<T, S>,
  condition?: (state: S) => boolean,
  iterate?: (state: S) => S,
  resultSelector?: (state: S) => T,
  scheduler?: Scheduler
): Observable<T> {
  let state: S;
  let conditionFn: (state: S) => boolean;
  let iterateFn: (state: S) => S;
  let resultSelectorFn: (state: S) => T;
  let schedulerInstance: Scheduler | undefined;

  if (arguments.length === 1) {
    const options = initialStateOrOptions as GenerateOptions<T, S>;
    state = options.initialState;
    conditionFn = options.condition;
    iterateFn = options.iterate;
    resultSelectorFn = options.resultSelector ?? (identity as (state: S) => T);
    schedulerInstance = options.scheduler;
  } else {
    state = initialStateOrOptions as S;
    conditionFn = condition!;
    iterateFn = iterate!;

    if (!resultSelector || isScheduler(resultSelector)) {
      resultSelectorFn = identity as (state: S) => T;
      schedulerInstance = resultSelector as Scheduler | undefined;
    } else {
      resultSelectorFn = resultSelector;
      schedulerInstance = scheduler;
    }
  }

  function* generatorFunction(): Generator<T, void, unknown> {
    let currentState = state;
    while (conditionFn && conditionFn(currentState)) {
      yield resultSelectorFn(currentState);
      currentState = iterateFn(currentState);
    }
  }

  return defer(
    schedulerInstance
      ? () => scheduleIterable(generatorFunction(), schedulerInstance!)
      : generatorFunction
  );
}