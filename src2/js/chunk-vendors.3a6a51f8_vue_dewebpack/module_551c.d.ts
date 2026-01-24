/**
 * Promise Polyfill Module
 * 
 * A complete ES6 Promise implementation polyfill with support for:
 * - Promise constructor with executor function
 * - then/catch chaining
 * - Promise.resolve/reject static methods
 * - Promise.all/race static methods
 * - Unhandled rejection tracking
 */

/**
 * Executor function type for Promise constructor
 * @template T - The type of value the promise will resolve to
 */
type PromiseExecutor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: unknown) => void
) => void;

/**
 * Callback for promise fulfillment
 * @template T - The type of the fulfilled value
 * @template TResult - The type of the return value
 */
type OnFulfilled<T, TResult = T> = 
  | ((value: T) => TResult | PromiseLike<TResult>)
  | null
  | undefined;

/**
 * Callback for promise rejection
 * @template TResult - The type of the return value
 */
type OnRejected<TResult = never> = 
  | ((reason: unknown) => TResult | PromiseLike<TResult>)
  | null
  | undefined;

/**
 * Internal promise state
 */
declare enum PromiseState {
  /** Promise is pending */
  Pending = 0,
  /** Promise is fulfilled */
  Fulfilled = 1,
  /** Promise is rejected */
  Rejected = 2
}

/**
 * Internal reaction object stored in promise
 * @internal
 */
interface PromiseReaction<T = unknown> {
  /** Success handler */
  ok: OnFulfilled<T, unknown> | true;
  /** Failure handler */
  fail: OnRejected<unknown>;
  /** Resolver for chained promise */
  resolve: (value: unknown) => void;
  /** Rejector for chained promise */
  reject: (reason: unknown) => void;
  /** Domain for Node.js domain support */
  domain?: unknown;
  /** The promise returned by then() */
  promise: Promise<unknown>;
}

/**
 * Internal promise capability object
 * @template T - The type of value the promise will resolve to
 */
interface PromiseCapability<T> {
  /** The promise instance */
  promise: Promise<T>;
  /** Resolve function */
  resolve: (value: T | PromiseLike<T>) => void;
  /** Reject function */
  reject: (reason?: unknown) => void;
}

/**
 * Internal promise implementation details
 * @internal
 */
interface PromiseInternals<T> {
  /** Reaction handlers queue */
  _c: PromiseReaction[];
  /** Secondary reactions array */
  _a?: PromiseReaction[];
  /** Current state (0=pending, 1=fulfilled, 2=rejected) */
  _s: PromiseState;
  /** Flag indicating promise is done */
  _d: boolean;
  /** The settled value or rejection reason */
  _v?: T | unknown;
  /** Handled state (0=unhandled, 1=handled, 2=rejection handled) */
  _h: 0 | 1 | 2;
  /** Flag for notification in progress */
  _n: boolean;
  /** Wrapped promise reference for recursive resolution */
  _w?: PromiseInternals<T>;
}

/**
 * ES6 Promise constructor interface
 */
interface PromiseConstructor {
  /**
   * Creates a new Promise
   * @param executor - Function that receives resolve and reject callbacks
   */
  new <T>(executor: PromiseExecutor<T>): Promise<T>;

  /**
   * The prototype of Promise instances
   */
  readonly prototype: Promise<unknown>;

  /**
   * Creates a promise that resolves with the given value
   * @param value - Value to resolve with, or a promise/thenable to adopt
   * @returns A resolved promise
   */
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
  resolve(): Promise<void>;

  /**
   * Creates a promise that is rejected with the given reason
   * @param reason - The rejection reason
   * @returns A rejected promise
   */
  reject<T = never>(reason?: unknown): Promise<T>;

  /**
   * Creates a promise that resolves when all input promises resolve
   * @param values - Array of values or promises
   * @returns Promise that resolves to array of resolved values
   */
  all<T extends readonly unknown[] | []>(
    values: T
  ): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

  /**
   * Creates a promise that settles when the first input promise settles
   * @param values - Array of values or promises
   * @returns Promise that resolves/rejects with the first settled value
   */
  race<T extends readonly unknown[] | []>(
    values: T
  ): Promise<Awaited<T[number]>>;
}

/**
 * ES6 Promise interface
 * @template T - The type of value the promise will resolve to
 */
interface Promise<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the promise
   * @param onfulfilled - Callback invoked when promise is fulfilled
   * @param onrejected - Callback invoked when promise is rejected
   * @returns A new promise for chaining
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: OnFulfilled<T, TResult1>,
    onrejected?: OnRejected<TResult2>
  ): Promise<TResult1 | TResult2>;

  /**
   * Attaches a callback for only the rejection of the promise
   * @param onrejected - Callback invoked when promise is rejected
   * @returns A new promise for chaining
   */
  catch<TResult = never>(
    onrejected?: OnRejected<TResult>
  ): Promise<T | TResult>;
}

/**
 * Global Promise constructor
 */
declare const Promise: PromiseConstructor;

/**
 * Node.js process unhandled rejection event
 */
interface UnhandledRejectionEvent {
  /** The rejected promise */
  promise: Promise<unknown>;
  /** The rejection reason */
  reason: unknown;
}

/**
 * Augment global scope with Promise
 */
declare global {
  /**
   * Promise constructor available globally
   */
  const Promise: PromiseConstructor;

  interface Window {
    /** Promise constructor in browser environments */
    Promise: PromiseConstructor;
    /** Handler for unhandled promise rejections */
    onunhandledrejection?: ((event: UnhandledRejectionEvent) => void) | null;
    /** Handler for handled rejections */
    onrejectionhandled?: ((event: UnhandledRejectionEvent) => void) | null;
  }
}

export { Promise, PromiseConstructor };