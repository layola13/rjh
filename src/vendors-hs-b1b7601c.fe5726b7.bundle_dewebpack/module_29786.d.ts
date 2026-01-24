/**
 * RxJS mergeScan operator type definitions
 * Applies an accumulator function over the source Observable where the accumulator function itself returns an Observable,
 * then each intermediate Observable returned is merged into the output Observable.
 */

/**
 * Accumulator function type for mergeScan operator
 * @template T - The type of items emitted by the source Observable
 * @template R - The type of the accumulated value
 * @param acc - The accumulated value
 * @param value - The current value from the source Observable
 * @param index - The index of the current value
 * @returns An Observable of the accumulated result
 */
type MergeScanAccumulator<T, R> = (
  acc: R,
  value: T,
  index: number
) => Observable<R>;

/**
 * Applies an accumulator function over the source Observable where the accumulator 
 * function itself returns an Observable, then each intermediate Observable returned 
 * is merged into the output Observable.
 *
 * @template T - The type of items emitted by the source Observable
 * @template R - The type of the accumulated value
 * @param accumulator - The accumulator function called on each source value
 * @param seed - The initial accumulation value
 * @param concurrent - Maximum number of input Observables being subscribed to concurrently (default: Infinity)
 * @returns A function that returns an Observable of the accumulated values
 */
export declare function mergeScan<T, R>(
  accumulator: MergeScanAccumulator<T, R>,
  seed: R,
  concurrent?: number
): OperatorFunction<T, R>;

/**
 * Operator function type that transforms an Observable
 * @template T - Input Observable type
 * @template R - Output Observable type
 */
type OperatorFunction<T, R> = (source: Observable<T>) => Observable<R>;

/**
 * Observable interface (minimal definition for context)
 */
interface Observable<T> {
  subscribe(observer: Partial<Observer<T>>): Subscription;
}

/**
 * Observer interface (minimal definition for context)
 */
interface Observer<T> {
  next(value: T): void;
  error(err: unknown): void;
  complete(): void;
}

/**
 * Subscription interface (minimal definition for context)
 */
interface Subscription {
  unsubscribe(): void;
}