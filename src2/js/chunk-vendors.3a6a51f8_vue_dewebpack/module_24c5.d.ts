/**
 * Promise Polyfill - ES6 Promise Implementation
 * Module ID: 24c5
 * 
 * This module provides a complete Promise/A+ compliant implementation
 * for environments that don't natively support Promises.
 */

/**
 * Represents the state of a Promise
 */
type PromiseState = 0 | 1 | 2; // 0: pending, 1: fulfilled, 2: rejected

/**
 * Internal handler state
 */
type HandlerState = 0 | 1 | 2; // 0: not handled, 1: handled, 2: handled with rejection tracking

/**
 * Thenable interface - any object with a `then` method
 */
interface Thenable<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): PromiseLike<TResult1 | TResult2>;
}

/**
 * Internal promise resolution handler
 */
interface PromiseHandler<T, TResult1, TResult2> {
  /** Success callback function */
  ok: ((value: T) => TResult1 | PromiseLike<TResult1>) | boolean;
  
  /** Failure callback function */
  fail: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | false;
  
  /** Resolver function for the resulting promise */
  resolve: (value: TResult1 | PromiseLike<TResult1>) => void;
  
  /** Rejector function for the resulting promise */
  reject: (reason: unknown) => void;
  
  /** The promise returned by the then() call */
  promise: Promise<TResult1 | TResult2>;
  
  /** Domain context for Node.js environments */
  domain?: NodeDomain;
}

/**
 * Node.js domain interface (for domain-aware promise execution)
 */
interface NodeDomain {
  enter(): void;
  exit(): void;
}

/**
 * Internal promise state structure
 */
interface InternalPromiseState<T> {
  /** Array of registered handlers */
  _c: Array<PromiseHandler<T, unknown, unknown>>;
  
  /** Array of handlers (alternate storage) */
  _a: Array<PromiseHandler<T, unknown, unknown>> | undefined;
  
  /** Current promise state: 0=pending, 1=fulfilled, 2=rejected */
  _s: PromiseState;
  
  /** Flag indicating if promise is finalized */
  _d: boolean;
  
  /** The resolved/rejected value */
  _v: T | unknown;
  
  /** Handler state for rejection tracking */
  _h: HandlerState;
  
  /** Flag indicating if notification is in progress */
  _n: boolean;
  
  /** Reference to wrapped promise (for internal use) */
  _w?: InternalPromiseState<T>;
}

/**
 * Internal deferred structure used for promise construction
 */
interface PromiseDeferred<T> {
  /** The promise instance */
  promise: Promise<T>;
  
  /** Function to resolve the promise */
  resolve: (value: T | PromiseLike<T>) => void;
  
  /** Function to reject the promise */
  reject: (reason: unknown) => void;
}

/**
 * Promise constructor function factory
 * Creates a new promise capability for the given constructor
 * 
 * @param constructor - The Promise constructor to use
 * @returns A deferred object with promise, resolve, and reject
 */
declare function newPromiseCapability<T>(
  constructor: PromiseConstructor
): PromiseDeferred<T>;

/**
 * Internal promise resolution function
 * Resolves a promise with the given value, handling thenables and chaining
 * 
 * @param this - The internal promise state
 * @param value - The value to resolve with
 */
declare function promiseResolve<T>(
  this: InternalPromiseState<T> & { _d: boolean; _w?: InternalPromiseState<T> },
  value: T | PromiseLike<T>
): void;

/**
 * Internal promise rejection function
 * Rejects a promise with the given reason
 * 
 * @param this - The internal promise state
 * @param reason - The rejection reason
 */
declare function promiseReject<T>(
  this: InternalPromiseState<T> & { _d: boolean; _w?: InternalPromiseState<T> },
  reason: unknown
): void;

/**
 * Notifies all registered handlers of promise settlement
 * 
 * @param promise - The internal promise state
 * @param isReject - Whether this is a rejection notification
 */
declare function notifyPromise<T>(
  promise: InternalPromiseState<T>,
  isReject: boolean
): void;

/**
 * Checks if a value is thenable (has a callable `then` method)
 * 
 * @param value - The value to check
 * @returns The `then` function if thenable, false otherwise
 */
declare function isThenable<T>(
  value: unknown
): ((
  onfulfilled: (value: T) => unknown,
  onrejected: (reason: unknown) => unknown
) => unknown) | false;

/**
 * Checks if a promise has unhandled rejection
 * 
 * @param promise - The internal promise state
 * @returns True if rejection is unhandled
 */
declare function isUnhandledRejection<T>(promise: InternalPromiseState<T>): boolean;

/**
 * Global Promise constructor
 * 
 * Creates a new Promise that is resolved or rejected by the executor function
 * 
 * @param executor - Function that receives resolve and reject callbacks
 */
declare global {
  interface PromiseConstructor {
    /**
     * Creates a new Promise
     * 
     * @param executor - A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used to resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(
      executor: (
        resolve: (value: T | PromiseLike<T>) => void,
        reject: (reason?: unknown) => void
      ) => void
    ): Promise<T>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * 
     * @param values - An iterable of Promises
     * @returns A new Promise
     */
    all<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * 
     * @param values - An iterable of Promises
     * @returns A new Promise
     */
    race<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>>;

    /**
     * Creates a new rejected promise for the provided reason.
     * 
     * @param reason - The reason the promise was rejected
     * @returns A new rejected Promise
     */
    reject<T = never>(reason?: unknown): Promise<T>;

    /**
     * Creates a new resolved promise.
     * 
     * @param value - The value to resolve with. Can be a promise or any value.
     * @returns A resolved Promise
     */
    resolve<T>(value: T | PromiseLike<T>): Promise<Awaited<T>>;
    resolve(): Promise<void>;
  }

  interface Promise<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * 
     * @param onfulfilled - The callback to execute when the Promise is resolved
     * @param onrejected - The callback to execute when the Promise is rejected
     * @returns A Promise for the completion of which ever callback is executed
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
    ): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * 
     * @param onrejected - The callback to execute when the Promise is rejected
     * @returns A Promise for the completion of the callback
     */
    catch<TResult = never>(
      onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null
    ): Promise<T | TResult>;
  }
}

/**
 * Node.js process object interface (for environment detection)
 */
interface NodeProcess {
  /** Process version information */
  versions?: {
    node?: string;
    v8?: string;
  };
  
  /** Current domain */
  domain?: NodeDomain;
  
  /**
   * Emit an event
   * @param event - Event name
   * @param args - Event arguments
   */
  emit(event: string, ...args: unknown[]): boolean;
}

/**
 * Window/Global object extensions for promise events
 */
interface WindowEventHandlers {
  /**
   * Handler for unhandled promise rejections
   * @param event - The rejection event details
   */
  onunhandledrejection?: ((event: {
    promise: Promise<unknown>;
    reason: unknown;
  }) => void) | null;

  /**
   * Handler for when a rejected promise is later handled
   * @param event - The handled rejection event details
   */
  onrejectionhandled?: ((event: {
    promise: Promise<unknown>;
    reason: unknown;
  }) => void) | null;
}

/**
 * Module constants
 */
declare const PROMISE_MODULE_NAME = "Promise";
declare const CHROME_66_VERSION_CHECK = "Chrome/66";
declare const V8_66_VERSION_CHECK = "6.6";

export type {
  PromiseState,
  HandlerState,
  Thenable,
  PromiseHandler,
  NodeDomain,
  InternalPromiseState,
  PromiseDeferred,
  NodeProcess,
  WindowEventHandlers
};

export {
  newPromiseCapability,
  promiseResolve,
  promiseReject,
  notifyPromise,
  isThenable,
  isUnhandledRejection
};