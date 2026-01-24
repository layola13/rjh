/**
 * RxJS map operator module
 * Transforms each value emitted by the source Observable by applying a projection function
 */

/**
 * Project function type that transforms input values to output values
 * @template T - Input value type
 * @template R - Output value type
 */
type ProjectFunction<T, R> = (value: T, index: number) => R;

/**
 * Applies a given project function to each value emitted by the source Observable,
 * and emits the resulting values as an Observable.
 * 
 * @template T - The type of items emitted by the source Observable
 * @template R - The type of items emitted by the resulting Observable
 * @param project - The function to apply to each value emitted by the source Observable
 * @param thisArg - An optional argument to define what `this` will be in the project function
 * @returns A function that returns an Observable that emits the values from the source Observable transformed by the given project function
 * @throws {TypeError} If the project argument is not a function
 */
export function map<T, R>(
  project: ProjectFunction<T, R>,
  thisArg?: unknown
): (source: Observable<T>) => Observable<R> {
  return (source: Observable<T>): Observable<R> => {
    if (typeof project !== "function") {
      throw new TypeError(
        "argument is not a function. Are you looking for `mapTo()`?"
      );
    }
    return source.lift(new MapOperator<T, R>(project, thisArg));
  };
}

/**
 * Operator class that implements the map transformation logic
 * @template T - Input value type
 * @template R - Output value type
 */
class MapOperator<T, R> implements Operator<T, R> {
  constructor(
    public readonly project: ProjectFunction<T, R>,
    public readonly thisArg?: unknown
  ) {}

  /**
   * Subscribes to the source Observable with a MapSubscriber
   * @param subscriber - The subscriber that will receive the transformed values
   * @param source - The source Observable to subscribe to
   * @returns Subscription to the source Observable
   */
  call(subscriber: Subscriber<R>, source: Observable<T>): Subscription {
    return source.subscribe(
      new MapSubscriber<T, R>(subscriber, this.project, this.thisArg)
    );
  }
}

/**
 * Subscriber that applies the projection function to each emitted value
 * @template T - Input value type
 * @template R - Output value type
 */
class MapSubscriber<T, R> extends Subscriber<T> {
  private count: number = 0;
  private readonly thisArg: unknown;

  constructor(
    destination: Subscriber<R>,
    private readonly project: ProjectFunction<T, R>,
    thisArg?: unknown
  ) {
    super(destination);
    this.thisArg = thisArg ?? this;
  }

  /**
   * Handles incoming values by applying the projection function
   * @param value - The value emitted by the source Observable
   */
  protected _next(value: T): void {
    let result: R;
    try {
      result = this.project.call(this.thisArg, value, this.count++);
    } catch (error) {
      this.destination.error(error);
      return;
    }
    this.destination.next(result);
  }
}

/**
 * Base Observable interface
 * @template T - The type of items emitted by the Observable
 */
interface Observable<T> {
  lift<R>(operator: Operator<T, R>): Observable<R>;
  subscribe(subscriber: Subscriber<T>): Subscription;
}

/**
 * Operator interface for implementing custom operators
 * @template T - Input type
 * @template R - Output type
 */
interface Operator<T, R> {
  call(subscriber: Subscriber<R>, source: Observable<T>): Subscription;
}

/**
 * Subscriber interface for receiving Observable notifications
 * @template T - The type of items the Subscriber can receive
 */
interface Subscriber<T> {
  next(value: T): void;
  error(error: unknown): void;
  complete(): void;
}

/**
 * Subscription interface representing a disposable resource
 */
interface Subscription {
  unsubscribe(): void;
}