import { Subscriber, SafeSubscriber } from './Subscriber';
import { isSubscription, Subscription } from './Subscription';
import { observable as observableSymbol } from './symbol/observable';
import { pipeFromArray } from './util/pipe';
import { config } from './config';
import { isFunction } from './util/isFunction';
import { errorContext } from './util/errorContext';

type TeardownLogic = Subscription | (() => void) | void;

interface Observer<T> {
  next: (value: T) => void;
  error: (err: unknown) => void;
  complete: () => void;
}

type PartialObserver<T> = Partial<Observer<T>>;

type SubscriberFunction<T> = (
  this: Observable<T>,
  subscriber: Subscriber<T>
) => TeardownLogic;

interface PromiseConstructorLike {
  new <T>(
    executor: (
      resolve: (value: T) => void,
      reject: (reason?: unknown) => void
    ) => void
  ): PromiseLike<T>;
}

interface Operator<T, R> {
  call(subscriber: Subscriber<R>, source: Observable<T>): TeardownLogic;
}

interface OperatorFunction<T, R> {
  (source: Observable<T>): Observable<R>;
}

type UnaryFunction<T, R> = (source: T) => R;

export class Observable<T> {
  source?: Observable<unknown>;
  operator?: Operator<unknown, T>;
  protected _subscribe?: SubscriberFunction<T>;

  constructor(subscribe?: SubscriberFunction<T>) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  lift<R>(operator: Operator<T, R>): Observable<R> {
    const observable = new Observable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  subscribe(observer?: PartialObserver<T>): Subscription;
  subscribe(
    next?: (value: T) => void,
    error?: (error: unknown) => void,
    complete?: () => void
  ): Subscription;
  subscribe(
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: unknown) => void,
    complete?: () => void
  ): Subscription {
    const subscriber = isObserver(observerOrNext)
      ? observerOrNext
      : new SafeSubscriber(observerOrNext, error, complete);

    errorContext(() => {
      const { operator, source } = this;
      subscriber.add(
        operator
          ? operator.call(subscriber, source!)
          : source
          ? this._subscribe!(subscriber)
          : this._trySubscribe(subscriber)
      );
    });

    return subscriber;
  }

  protected _trySubscribe(subscriber: Subscriber<T>): TeardownLogic {
    try {
      return this._subscribe!(subscriber);
    } catch (err) {
      subscriber.error(err);
    }
  }

  forEach(
    next: (value: T) => void,
    promiseCtor?: PromiseConstructorLike
  ): Promise<void> {
    return new (getPromiseConstructor(promiseCtor))(
      (resolve, reject) => {
        const subscriber = new SafeSubscriber<T>({
          next: (value: T) => {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve,
        });
        this.subscribe(subscriber);
      }
    );
  }

  [observableSymbol](): this {
    return this;
  }

  pipe(): Observable<T>;
  pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
  pipe<A, B>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>
  ): Observable<B>;
  pipe<A, B, C>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>
  ): Observable<C>;
  pipe<A, B, C, D>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>
  ): Observable<D>;
  pipe<A, B, C, D, E>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>
  ): Observable<E>;
  pipe(...operations: OperatorFunction<unknown, unknown>[]): Observable<unknown>;
  pipe(
    ...operations: Array<UnaryFunction<unknown, unknown>>
  ): Observable<unknown> {
    return pipeFromArray(operations)(this);
  }

  toPromise(promiseCtor?: PromiseConstructorLike): Promise<T | undefined> {
    return new (getPromiseConstructor(promiseCtor))(
      (resolve, reject) => {
        let lastValue: T | undefined;
        this.subscribe(
          (value: T) => {
            lastValue = value;
          },
          (err: unknown) => {
            reject(err);
          },
          () => {
            resolve(lastValue);
          }
        );
      }
    );
  }

  static create<T>(subscribe?: SubscriberFunction<T>): Observable<T> {
    return new Observable(subscribe);
  }
}

function getPromiseConstructor(
  promiseCtor?: PromiseConstructorLike
): PromiseConstructorLike {
  return promiseCtor ?? config.Promise ?? Promise;
}

function isObserver<T>(
  value: unknown
): value is Subscriber<T> | (Observer<T> & Subscription) {
  return (
    (value instanceof Subscriber ||
      (isObserverLike(value) && isSubscription(value))) as boolean
  );
}

function isObserverLike<T>(value: unknown): value is Observer<T> {
  return (
    value &&
    isFunction((value as Observer<T>).next) &&
    isFunction((value as Observer<T>).error) &&
    isFunction((value as Observer<T>).complete)
  );
}