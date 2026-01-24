/**
 * RxJS map operator module
 * Applies a projection function to each value emitted by the source Observable
 */

/**
 * Project function type that transforms source values
 * @template T - The type of the source value
 * @template R - The type of the result value
 */
type ProjectFunction<T, R> = (value: T, index: number) => R;

/**
 * Map operator that applies a projection function to each value emitted by the source Observable
 * @template T - The type of the source Observable values
 * @template R - The type of the projected result values
 * @param project - The function to apply to each value emitted by the source Observable
 * @param thisArg - Optional context object to use as `this` when executing the project function
 * @returns An operator function that returns an Observable that emits the projected values
 * @throws {TypeError} If the project argument is not a function
 */
export function map<T, R>(
  project: ProjectFunction<T, R>,
  thisArg?: any
): (source: Observable<T>) => Observable<R>;

/**
 * Internal operator class that implements the map transformation logic
 * @template T - The type of the source values
 * @template R - The type of the projected values
 */
declare class MapOperator<T, R> {
  constructor(project: ProjectFunction<T, R>, thisArg?: any);
  
  /**
   * The projection function to apply to each value
   */
  readonly project: ProjectFunction<T, R>;
  
  /**
   * Optional context object for the projection function
   */
  readonly thisArg?: any;
  
  /**
   * Applies the operator to a source Observable
   * @param subscriber - The destination subscriber
   * @param source - The source Observable
   */
  call(subscriber: Subscriber<R>, source: Observable<T>): Subscription;
}

/**
 * Internal subscriber that performs the actual mapping transformation
 * @template T - The type of the source values
 * @template R - The type of the projected values
 */
declare class MapSubscriber<T, R> extends Subscriber<T> {
  constructor(
    destination: Subscriber<R>,
    project: ProjectFunction<T, R>,
    thisArg?: any
  );
  
  /**
   * The projection function to apply to each value
   */
  readonly project: ProjectFunction<T, R>;
  
  /**
   * Counter tracking the number of values processed
   */
  private count: number;
  
  /**
   * Context object for the projection function
   */
  readonly thisArg: any;
  
  /**
   * Handles incoming values from the source Observable
   * Applies the projection function and emits the result
   * @param value - The value emitted by the source Observable
   */
  protected _next(value: T): void;
}

/**
 * Base Observable interface
 * @template T - The type of values emitted by the Observable
 */
interface Observable<T> {
  /**
   * Applies an operator to the Observable
   * @template R - The type of values emitted by the result Observable
   * @param operator - The operator to apply
   */
  lift<R>(operator: MapOperator<T, R>): Observable<R>;
}

/**
 * Base Subscriber interface
 * @template T - The type of values the Subscriber can receive
 */
interface Subscriber<T> {
  /**
   * Receives the next value from the Observable
   * @param value - The emitted value
   */
  next(value: T): void;
  
  /**
   * Receives an error from the Observable
   * @param error - The error that occurred
   */
  error(error: any): void;
  
  /**
   * Signals that the Observable has completed
   */
  complete(): void;
}

/**
 * Subscription interface representing a disposable resource
 */
interface Subscription {
  /**
   * Disposes the resources held by the subscription
   */
  unsubscribe(): void;
}