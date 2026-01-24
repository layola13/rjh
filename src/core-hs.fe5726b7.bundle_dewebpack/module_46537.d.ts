/**
 * Promise Polyfill Module
 * Provides a complete Promise implementation with polyfill capabilities
 */

/**
 * Internal state of a Promise instance
 */
interface PromiseState<T = any> {
  /** Promise type identifier */
  type: string;
  /** Whether the promise has been settled */
  done: boolean;
  /** Whether reactions have been notified */
  notified: boolean;
  /** Parent promise reference */
  parent: boolean;
  /** Queue of reaction handlers */
  reactions: ReactionQueue;
  /** Rejection state: false (none), 1 (handled), 2 (unhandled) */
  rejection: false | 1 | 2;
  /** Promise state: 0 (pending), 1 (fulfilled), 2 (rejected) */
  state: 0 | 1 | 2;
  /** The settled value or reason */
  value: T | undefined;
}

/**
 * Reaction handler for promise resolution/rejection
 */
interface PromiseReaction<T = any, R = any> {
  /** Success handler */
  ok: ((value: T) => R) | boolean;
  /** Failure handler */
  fail: ((reason: any) => R) | false;
  /** Resolution callback */
  resolve: (value: R) => void;
  /** Rejection callback */
  reject: (reason: any) => void;
  /** Associated promise */
  promise: Promise<R>;
  /** Domain context (Node.js) */
  domain?: any;
}

/**
 * Queue for storing promise reactions
 */
interface ReactionQueue {
  /** Add a reaction to the queue */
  add(reaction: PromiseReaction): void;
  /** Get next reaction from the queue */
  get(): PromiseReaction | undefined;
}

/**
 * Promise capability object for creating externally resolvable promises
 */
interface PromiseCapability<T = any> {
  /** The promise instance */
  promise: Promise<T>;
  /** Function to resolve the promise */
  resolve: (value: T | PromiseLike<T>) => void;
  /** Function to reject the promise */
  reject: (reason?: any) => void;
}

/**
 * Promise rejection event
 */
interface PromiseRejectionEvent {
  /** The rejected promise */
  promise: Promise<any>;
  /** The rejection reason */
  reason: any;
}

/**
 * Checks if a value is a thenable (has a callable then method)
 * @param value - Value to check
 * @returns The then function if thenable, otherwise false
 */
declare function isThenable(value: any): false | ((
  onFulfilled?: (value: any) => any,
  onRejected?: (reason: any) => any
) => any);

/**
 * Executes a promise reaction handler
 * @param reaction - The reaction to execute
 * @param state - Current promise state
 */
declare function executeReaction(
  reaction: PromiseReaction,
  state: PromiseState
): void;

/**
 * Notifies all reactions in the promise's reaction queue
 * @param state - Promise state
 * @param isRejection - Whether this is a rejection notification
 */
declare function notifyReactions(
  state: PromiseState,
  isRejection: boolean
): void;

/**
 * Dispatches unhandled rejection event
 * @param eventName - Event name ('unhandledrejection' or 'rejectionhandled')
 * @param promise - The promise instance
 * @param reason - Rejection reason
 */
declare function dispatchRejectionEvent(
  eventName: string,
  promise: Promise<any>,
  reason: any
): void;

/**
 * Schedules unhandled rejection detection
 * @param state - Promise state to check
 */
declare function scheduleUnhandledRejectionCheck(state: PromiseState): void;

/**
 * Checks if a promise has unhandled rejection
 * @param state - Promise state
 * @returns True if rejection is unhandled
 */
declare function hasUnhandledRejection(state: PromiseState): boolean;

/**
 * Dispatches rejection handled event
 * @param state - Promise state
 */
declare function notifyRejectionHandled(state: PromiseState): void;

/**
 * Creates a bound rejection handler
 * @param handler - The handler function
 * @param state - Promise state
 * @param originalState - Original state for chained operations
 */
declare function createReactionHandler(
  handler: (state: PromiseState, value: any, originalState?: PromiseState) => void,
  state: PromiseState,
  originalState?: PromiseState
): (value: any) => void;

/**
 * Rejects a promise
 * @param state - Promise state
 * @param reason - Rejection reason
 * @param originalState - Original state for chained operations
 */
declare function rejectPromise(
  state: PromiseState,
  reason: any,
  originalState?: PromiseState
): void;

/**
 * Resolves a promise
 * @param state - Promise state
 * @param value - Resolution value
 * @param originalState - Original state for chained operations
 */
declare function resolvePromise(
  state: PromiseState,
  value: any,
  originalState?: PromiseState
): void;

/**
 * Creates a new promise capability
 * @param PromiseConstructor - Promise constructor to use
 * @returns Promise capability object
 */
declare function createPromiseCapability<T>(
  PromiseConstructor: PromiseConstructor
): PromiseCapability<T>;

/**
 * Configuration for promise polyfill features
 */
interface PromisePolyfillConfig {
  /** Whether the Promise constructor is polyfilled */
  CONSTRUCTOR: boolean;
  /** Whether rejection events are supported */
  REJECTION_EVENT: boolean;
  /** Whether promise subclassing is supported */
  SUBCLASSING: boolean;
}

/**
 * Promise polyfill configuration
 */
declare const PromisePolyfillConfig: PromisePolyfillConfig;

/**
 * Exports the polyfilled Promise constructor
 */
export { Promise };
export type { PromiseState, PromiseReaction, PromiseCapability, PromiseRejectionEvent };